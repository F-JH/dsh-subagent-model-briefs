/**
 * Host half of subagent model notes.
 *
 * The user writes a capability and a scenario for exact provider/model routes
 * (`modelNotes`). When a new Session is created, this plugin records the notes
 * of the routes the current subagent model selection setting authorizes, and an
 * Agent whose tools offer explicit subagent model selection sees them as a
 * short runtime context before its first delegation. Authorization itself stays
 * with the official `subagent-model-selection-settings` service; a note never
 * allows a route.
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
import { teamLeadGuidanceContext, teamModeOn } from './team-lead.ts'
import {
  MODEL_NOTES_RECORD, MODEL_NOTES_SCHEMA, modelNotesProjection, parseModelNotes, recordedModelNotes, routeKey,
  snapshotModelNotes,
} from './notes.ts'
import type { ModelNote, ModelNotesConfig, ModelNotesState, ModelRoute } from './notes.ts'

export type { ModelNote, ModelRoute } from './notes.ts'

/** Loader row id; also the settings namespace the Plugins page edits. */
export const name = 'team-model-routing-settings'

/**
 * Required services. `subagentModelSelection` is the official authorization
 * owner, and its setting is read live at each new Session rather than from a
 * policy recorded in the Session log.
 */
export const inject = ['sessionProjections', 'sessions', 'agents', 'llm', 'systemPrompt', 'tools', 'subagentModelSelection']

/** Settings schema: `modelNotes`, keyed by exact provider/model route. */
export const Config = MODEL_NOTES_SCHEMA

/** Host settings of this plugin. */
export type Config = ModelNotesConfig

/**
 * The one operation this plugin reads from the subagent model selection setting.
 */
interface SelectionSource {
  /**
   * Read the routes the setting currently authorizes.
   * @returns a detached route list, or undefined when the setting is disabled.
   */
  allowedRoutes(): readonly ModelRoute[] | undefined
}

/**
 * DSH release range these reads were verified against; mirrors `engines.dsh`.
 *
 * The subagent model selection interface is pre-stable, and a release that
 * renames or replaces `allowedRoutes` would otherwise leave this plugin
 * recording no notes with no diagnostic. {@link assertSelectionInterface} names
 * this range in its failure so the mismatch points at the release.
 */
export const VERIFIED_DSH_RANGE = '>=0.2.2-rc.3 <0.3.0-0'

/**
 * Read the mounted selection service when it exposes the operation this plugin reads.
 * @param ctx - plugin context, read for the official selection service.
 * @returns the service, or undefined when it exposes no `allowedRoutes`.
 */
function selectionSource(ctx: Context): SelectionSource | undefined {
  const selection: SelectionSource | undefined = ctx.get('subagentModelSelection')
  if (selection === undefined) return undefined
  return typeof selection.allowedRoutes === 'function' ? selection : undefined
}

/**
 * Read the routes the setting authorizes, tolerating its own data errors.
 *
 * Runs per new Session, so a setting its owner rejects contributes no notes
 * rather than failing Session creation; that rejection already has a loud path
 * through the delegation that reads the setting directly.
 * @param ctx - plugin context, read for the official selection service.
 * @returns the authorized routes, or an empty list when there are none.
 */
export function authorizedRoutes(ctx: Context): readonly ModelRoute[] {
  const selection = selectionSource(ctx)
  if (selection === undefined) {
    ctx.logger.warn('subagent model notes: ctx.subagentModelSelection exposes no allowedRoutes(), so no notes are recorded')
    return []
  }
  try {
    return selection.allowedRoutes() ?? []
  } catch (error: unknown) {
    ctx.logger.warn(`subagent model notes: the subagent model selection setting is unusable, so no notes are recorded: ${String(error)}`)
    return []
  }
}

/**
 * Assert that the installed DSH still offers the interface this plugin reads.
 *
 * The service is a declared dependency and cannot be absent while this plugin
 * activates, but the method it exposes is not covered by that dependency. A
 * release that renames or replaces it turns every recorded snapshot into
 * silence, so the plugin's activation fails here instead and the mismatch is
 * reported at startup.
 * @param ctx - plugin context carrying the mounted selection service.
 * @returns the route list the setting authorizes now, or undefined when disabled.
 * @throws when the service no longer offers `allowedRoutes`, or returns a route
 *   list this plugin cannot read. A rejected route list is the setting's own
 *   data error and is reported by {@link authorizedRoutes} instead.
 */
export function assertSelectionInterface(ctx: Context): readonly ModelRoute[] | undefined {
  const selection = selectionSource(ctx)
  if (selection === undefined) {
    throw new Error(
      'subagent model notes: ctx.subagentModelSelection no longer offers allowedRoutes(), so no notes can be recorded. '
      + `This plugin is verified against DSH ${VERIFIED_DSH_RANGE}; a newer release changed the subagent model selection interface.`,
    )
  }
  let routes: readonly ModelRoute[] | undefined
  try {
    routes = selection.allowedRoutes()
  } catch (error: unknown) {
    // The setting's own contract reports this to the delegation that reads it.
    ctx.logger.warn(`subagent model notes: the subagent model selection setting is unusable: ${String(error)}`)
    return undefined
  }
  if (routes !== undefined && !routes.every(route => typeof route.provider === 'string' && typeof route.model === 'string')) {
    throw new Error(
      'subagent model notes: ctx.subagentModelSelection.allowedRoutes() returned routes without provider and model ids. '
      + `This plugin is verified against DSH ${VERIFIED_DSH_RANGE}; a newer release changed the subagent model selection interface.`,
    )
  }
  return routes
}

/**
 * Record note snapshots for new Sessions and contribute the notes context.
 * @param ctx - plugin context that owns every registration.
 * @param config - volatile notes configuration.
 * @returns completion once the projection and the context are registered.
 */
export async function apply(ctx: Context, config: ModelNotesConfig): Promise<void> {
  // Fail activation before registering anything when DSH no longer offers the interface this plugin reads.
  assertSelectionInterface(ctx)
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
      models = snapshotModelNotes(authorizedRoutes(ctx), configured)
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
  ctx.systemPrompt.context(teamLeadGuidanceContext({
    order: ctx.systemPrompt.getContextOrder('SUBAGENT_DELEGATION') + 2,
    teamModeOf: agent => teamModeOn(ctx, agent),
  }))
}
