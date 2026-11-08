/**
 * Durable subagent model notes: the settings schema, the Session record, and
 * the projection that restores both the record and the official authorization
 * it was filtered by.
 *
 * A note is descriptive data the user writes for one exact provider/model
 * route. A new Session records, once, the notes of the routes its official
 * subagent model authorization (`subagent/model-selection-policy`) allows. The
 * record is an ignorable plugin record, so a Session log stays readable after
 * this plugin is removed, and a Session without the record shows no notes.
 *
 * A malformed record folds to a serializable invalid state, so projection
 * recovery of every other unit continues; {@link recordedModelNotes} reports
 * it to the reading operation.
 *
 * @module dsh-subagent-model-briefs/notes
 */

import type { Volatile } from '@deepseek-ai/cordis'
import { pluginRecordOf } from '@deepseek-ai/dsh-session'
import type { Session, SessionEvent } from '@deepseek-ai/dsh-session'
import type { ProjectionDefinition, ProjectionHandle } from '@deepseek-ai/dsh-session-projection'
import { assertNever } from '@deepseek-ai/dsh-util-values'
import z from '@deepseek-ai/schemastery'
import { z as zod } from 'zod'

/** One exact provider/model route. */
export interface ModelRoute {
  readonly provider: string
  readonly model: string
}

/** Descriptive data for one exact route; never an authorization decision. */
export interface ModelNote extends ModelRoute {
  /** What the model is good at. */
  readonly capability: string
  /** When an agent should choose it. */
  readonly scenario: string
}

declare module '@deepseek-ai/dsh-session/types' {
  interface PluginRecordMap {
    /** Notes of the routes this Session's official subagent model authorization allows, captured at creation. */
    'plugin:team-model-routing/subagent-model-notes': { readonly models: readonly ModelNote[] }
  }
}

/** Plugin record type holding one Session's note snapshot. */
export const MODEL_NOTES_RECORD = 'plugin:team-model-routing/subagent-model-notes'

/** Official Session event recording the routes a Session may select for a child. */
const OFFICIAL_POLICY_EVENT = 'subagent/model-selection-policy'

/** Host settings: notes keyed by exact route, including routes not currently authorized. */
export interface ModelNotesConfig {
  /** Saved notes; a route keeps its note while it is not authorized. */
  modelNotes: Volatile<ModelNote[]>
}

/** Schemastery schema of {@link ModelNotesConfig}; volatile so edits reach new Sessions without a remount. */
export const MODEL_NOTES_SCHEMA = z.object({
  modelNotes: z.array(z.object({
    provider: z.string().min(1).required(),
    model: z.string().min(1).required(),
    capability: z.string().default(''),
    scenario: z.string().default(''),
  })).default([]).volatile(),
})

const routeSchema = zod.object({ provider: zod.string().min(1), model: zod.string().min(1) }).strict()
const noteSchema = zod.object({
  provider: zod.string().min(1),
  model: zod.string().min(1),
  capability: zod.string(),
  scenario: zod.string(),
}).strict()

const stateSchema = zod.object({
  /** Routes of the first official authorization event; null before one is seen. */
  policy: zod.array(routeSchema).nullable(),
  notes: zod.discriminatedUnion('kind', [
    zod.object({ kind: zod.literal('unrecorded') }).strict(),
    zod.object({ kind: zod.literal('recorded'), models: zod.array(noteSchema) }).strict(),
    zod.object({ kind: zod.literal('invalid') }).strict(),
  ]),
}).strict()

/** Folded Session state: the official authorization and this plugin's note snapshot. */
export type ModelNotesState = zod.infer<typeof stateSchema>

/**
 * Stable identity of one route.
 * @param route - exact provider/model route.
 * @returns a key no other provider/model pair shares.
 */
export function routeKey(route: ModelRoute): string {
  return JSON.stringify([route.provider, route.model])
}

/**
 * Validate notes from configuration or a durable record and detach them.
 * @param value - candidate note list.
 * @returns detached notes.
 * @throws when an entry is malformed or a route repeats.
 */
export function parseModelNotes(value: unknown): ModelNote[] {
  const notes = zod.array(noteSchema).parse(value)
  const seen = new Set<string>()
  for (const note of notes) {
    const key = routeKey(note)
    if (seen.has(key)) throw new Error(`subagent model notes repeat route "${note.provider}/${note.model}"`)
    seen.add(key)
  }
  return notes
}

/**
 * Select the notes one Session records.
 *
 * Every authorized route gets one entry in authorization order, with empty
 * fields when the user wrote no note for it. A route without authorization is
 * never recorded, and nothing is recorded when no authorized route has a note.
 * @param routes - routes the Session's official authorization allows.
 * @param notes - the configured notes.
 * @returns the snapshot, or undefined when it would carry no note text.
 */
export function snapshotModelNotes(routes: readonly ModelRoute[], notes: readonly ModelNote[]): ModelNote[] | undefined {
  const byRoute = new Map(notes.map(note => [routeKey(note), note]))
  const models = routes.map(route => {
    const note = byRoute.get(routeKey(route))
    return { provider: route.provider, model: route.model, capability: note?.capability ?? '', scenario: note?.scenario ?? '' }
  })
  return models.some(hasNoteText) ? models : undefined
}

/**
 * Whether a note carries text a model should read.
 * @param note - one recorded note.
 * @returns true when the capability or scenario is non-empty.
 */
export function hasNoteText(note: ModelNote): boolean {
  return note.capability !== '' || note.scenario !== ''
}

/**
 * Fold one committed event.
 * @param state - state covering every earlier event.
 * @param event - the next committed event.
 * @returns the next state, or the same reference for an unrelated event.
 */
export function foldModelNotes(state: ModelNotesState, event: SessionEvent): ModelNotesState {
  const type: string = event.type
  if (type === OFFICIAL_POLICY_EVENT) {
    if (state.policy !== null) return state
    const parsed = zod.object({ allowedModels: zod.array(routeSchema) }).safeParse(event.data)
    // The official projection rejects a malformed policy; here it authorizes nothing.
    return { ...state, policy: parsed.success ? parsed.data.allowedModels : [] }
  }
  if (state.notes.kind !== 'unrecorded') return state
  const record = pluginRecordOf(event)
  if (record?.type !== MODEL_NOTES_RECORD) return state
  try {
    const data = zod.object({ models: zod.unknown() }).strict().parse(record.data)
    return { ...state, notes: { kind: 'recorded', models: parseModelNotes(data.models) } }
  } catch (error: unknown) {
    // Reported by recordedModelNotes to the reading operation, not by projection drive.
    return { ...state, notes: { kind: 'invalid' } }
  }
}

/** Host-only projection unit owned by this plugin. */
export const modelNotesProjection = {
  key: 'teamModelRoutingNotes',
  stateVersion: 4,
  stateSchema,
  init: (): ModelNotesState => ({ policy: null, notes: { kind: 'unrecorded' } }),
  apply: foldModelNotes,
} satisfies ProjectionDefinition<'teamModelRoutingNotes', ModelNotesState>

/**
 * Read the notes one Session recorded.
 * @param handle - registered projection handle.
 * @param session - Session whose snapshot is read.
 * @returns the recorded notes, or undefined when the Session recorded none.
 * @throws when the Session's note record is damaged.
 */
export function recordedModelNotes(
  handle: Pick<ProjectionHandle<ModelNotesState>, 'stateOf'>,
  session: Session,
): readonly ModelNote[] | undefined {
  const { notes } = handle.stateOf(session)
  switch (notes.kind) {
    case 'unrecorded': return undefined
    case 'recorded': return notes.models
    case 'invalid': throw new Error(`invalid subagent model notes record in Session "${session.id}"`)
    default: return assertNever(notes)
  }
}
