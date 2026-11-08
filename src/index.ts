/**
 * Host half of subagent model notes.
 *
 * The user writes a capability and a scenario for exact provider/model routes
 * (`modelNotes`). When a new Session is created, this plugin records the notes
 * of the routes the Session's official subagent model authorization allows,
 * and an Agent whose tools offer explicit subagent model selection sees them as
 * a short runtime context before its first delegation. Authorization itself
 * stays with the official `subagent-model-selection-settings` service; a note
 * never allows a route.
 *
 * @module dsh-subagent-model-briefs
 */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-agent'
import type {} from '@deepseek-ai/dsh-llm'
import type {} from '@deepseek-ai/dsh-system-prompt'
import type {} from '@deepseek-ai/dsh-tools'
import { appendPluginRecord } from '@deepseek-ai/dsh-session'
import type { Session } from '@deepseek-ai/dsh-session'
import type { ProjectionHandle } from '@deepseek-ai/dsh-session-projection'
import { modelNotesContext } from './discovery.ts'
import type { ModelNoteLine } from './discovery.ts'
import {
  MODEL_NOTES_RECORD, MODEL_NOTES_SCHEMA, modelNotesProjection, parseModelNotes, recordedModelNotes, routeKey,
  snapshotModelNotes,
} from './notes.ts'
import type { ModelNote, ModelNotesConfig, ModelNotesState } from './notes.ts'

export type { ModelNote, ModelRoute } from './notes.ts'

/** Loader row id; also the settings namespace the Plugins page edits. */
export const name = 'team-model-routing-settings'

/**
 * Required services. `subagentModelSelection` is the official authorization
 * owner: injecting it activates this plugin after that service registered its
 * own `agent/created` listener, so a new Session's authorization event is
 * committed before this plugin reads it.
 */
export const inject = ['sessionProjections', 'sessions', 'agents', 'llm', 'systemPrompt', 'tools', 'subagentModelSelection']

/** Settings schema: `modelNotes`, keyed by exact provider/model route. */
export const Config = MODEL_NOTES_SCHEMA

/** Host settings of this plugin. */
export type Config = ModelNotesConfig

/**
 * Record note snapshots for new Sessions and contribute the notes context.
 * @param ctx - plugin context that owns every registration.
 * @param config - volatile notes configuration.
 * @returns completion once the projection and the context are registered.
 */
export async function apply(ctx: Context, config: ModelNotesConfig): Promise<void> {
  const ready = ctx.sessionProjections.register(modelNotesProjection)
  /** Reasoning effort ids each Session's recorded routes declare, keyed by {@link routeKey}; entries end with their Session. */
  const efforts = new WeakMap<Session, ReadonlyMap<string, readonly string[]>>()

  /**
   * Append the creation-time snapshot of a fresh Session.
   *
   * A Session with earlier history (resumed, or created before this plugin)
   * records nothing and therefore shows no notes. A subagent child copies its
   * parent's snapshot, because its official authorization is the parent's.
   */
  const record = (session: Session, handle: ProjectionHandle<ModelNotesState>): void => {
    if (session.firstLiveSeq !== 0) return
    const state = handle.stateOf(session)
    if (state.notes.kind !== 'unrecorded') return
    const parentId = session.header.origin === 'subagent' ? session.header.parentSession : undefined
    let models: readonly ModelNote[] | undefined
    if (parentId !== undefined) {
      const parent = ctx.sessions.get(parentId)
      const notes = parent === undefined ? undefined : handle.stateOf(parent).notes
      models = notes?.kind === 'recorded' ? notes.models : undefined
    } else {
      const configured = parseModelNotes(config.modelNotes.get().map(note => ({
        provider: note.provider, model: note.model, capability: note.capability, scenario: note.scenario,
      })))
      models = snapshotModelNotes(state.policy ?? [], configured)
    }
    if (models !== undefined) appendPluginRecord(session, MODEL_NOTES_RECORD, { models })
  }

  /**
   * Resolve the declared reasoning efforts of every recorded route before the
   * Agent's first request, because the context text is rendered synchronously.
   */
  const loadEfforts = async (
    session: Session,
    handle: ProjectionHandle<ModelNotesState>,
    signal: AbortSignal | undefined,
  ): Promise<void> => {
    const { notes } = handle.stateOf(session)
    if (notes.kind !== 'recorded') return
    const declared = new Map<string, readonly string[]>()
    await Promise.all(notes.models.map(async (note) => {
      let ids: readonly string[] | undefined
      try {
        ids = (await ctx.llm.resolveModelInfo(note.provider, note.model, signal)).reasoning?.efforts.map(effort => effort.id)
      } catch (error: unknown) {
        if (signal?.aborted === true) throw error
        // The route is listed without effort values; delegation still validates any requested effort.
        ctx.logger.warn(`subagent model notes: reasoning efforts of "${note.provider}/${note.model}" are unavailable: ${String(error)}`)
        return
      }
      if (ids !== undefined) declared.set(routeKey(note), ids)
    }))
    ctx.fiber.assertActive()
    efforts.set(session, declared)
  }

  ctx.on('agent/created', async ({ agent, signal }) => {
    const handle = await ready
    ctx.fiber.assertActive()
    record(agent.session, handle)
    await loadEfforts(agent.session, handle, signal)
  })
  const handle = await ready
  ctx.fiber.assertActive()
  await Promise.all(ctx.agents.list().map(agent => loadEfforts(agent.session, handle, undefined)))
  ctx.fiber.assertActive()

  ctx.systemPrompt.context(modelNotesContext({
    order: ctx.systemPrompt.getContextOrder('SUBAGENT_DELEGATION') + 1,
    visibleTools: context => ctx.tools.definitions(context.scope, context.toolSet),
    notesOf: (session): readonly ModelNoteLine[] | undefined => {
      const models = recordedModelNotes(handle, session)
      if (models === undefined) return undefined
      const declared = efforts.get(session)
      return models.map((note) => {
        const reasoningEfforts = declared?.get(routeKey(note))
        return reasoningEfforts === undefined ? note : { ...note, reasoningEfforts }
      })
    },
  }))
}
