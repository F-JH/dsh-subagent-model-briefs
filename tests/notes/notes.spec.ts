/** Note snapshot selection, the Session fold, damaged records, and checkpoint recovery. */

import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import SessionProjectionRegistry from '@deepseek-ai/dsh-session-projection'
import { Session, SessionId, SessionLogOffset, appendPluginRecord } from '@deepseek-ai/dsh-session'
import type { SessionEvent } from '@deepseek-ai/dsh-session'
import {
  MODEL_NOTES_RECORD, MODEL_NOTES_SCHEMA, foldModelNotes, modelNotesProjection, parseModelNotes, recordedModelNotes,
  snapshotModelNotes,
} from '../../src/notes.ts'
import type { ModelNotesState } from '../../src/notes.ts'
import { z } from 'zod'

/** Another unit restored from the same log, standing in for the units this plugin does not own. */
const eventCountProjection = {
  key: 'testEventCount',
  stateVersion: 1,
  stateSchema: z.number(),
  init: () => 0,
  apply: (count: number) => count + 1,
}

const PRO = { provider: 'alt', model: 'pro' }
const LITE = { provider: 'alt', model: 'lite' }
const PRO_NOTE = { ...PRO, capability: 'refactors', scenario: 'large changes' }

/** Fold a complete log from the initial state. */
function fold(events: readonly SessionEvent[]): ModelNotesState {
  return events.reduce(foldModelNotes, modelNotesProjection.init())
}

/** A detached Session with the official policy event and the given note record data. */
function sessionWith(policy: readonly { provider: string; model: string }[] | undefined, record?: unknown): Session {
  const session = Session.create(SessionId('notes-fold'))
  if (policy !== undefined) session.append('subagent/model-selection-policy', { allowedModels: [...policy] })
  if (record !== undefined) appendPluginRecord(session, MODEL_NOTES_RECORD, record as never)
  return session
}

describe('snapshotModelNotes', () => {
  it('records one entry per authorized route in authorization order and never an unauthorized route', () => {
    const other = { provider: 'other', model: 'x', capability: 'secret', scenario: 'never' }
    expect(snapshotModelNotes([LITE, PRO], [PRO_NOTE, other])).toEqual([
      { ...LITE, capability: '', scenario: '' },
      PRO_NOTE,
    ])
  })

  it('records nothing when no authorized route has note text', () => {
    expect(snapshotModelNotes([PRO], [{ ...PRO, capability: '', scenario: '' }])).toBeUndefined()
    expect(snapshotModelNotes([], [PRO_NOTE])).toBeUndefined()
  })
})

describe('parseModelNotes and the settings schema', () => {
  it('rejects a repeated route', () => {
    expect(() => parseModelNotes([PRO_NOTE, PRO_NOTE])).toThrow('repeat route "alt/pro"')
  })

  it('defaults to no notes and fills missing note fields', () => {
    expect(MODEL_NOTES_SCHEMA(undefined).modelNotes.get()).toEqual([])
    expect(MODEL_NOTES_SCHEMA({ modelNotes: [PRO] }).modelNotes.get()).toEqual([{ ...PRO, capability: '', scenario: '' }])
  })
})

describe('foldModelNotes', () => {
  it('restores the first official policy and the first note record', () => {
    const session = sessionWith([PRO], { models: [PRO_NOTE] })
    session.append('subagent/model-selection-policy', { allowedModels: [LITE] })
    appendPluginRecord(session, MODEL_NOTES_RECORD, { models: [] })
    expect(fold(session.snapshotEvents())).toEqual({ policy: [PRO], notes: { kind: 'recorded', models: [PRO_NOTE] } })
  })

  it('keeps the state reference for unrelated events', () => {
    const state = modelNotesProjection.init()
    const session = Session.create(SessionId('unrelated'))
    session.append('turn/start', { turn: 1 })
    const [event] = session.snapshotEvents()
    if (event === undefined) throw new Error('expected one event')
    expect(foldModelNotes(state, event)).toBe(state)
  })

  it('leaves a Session without a record unrecorded', () => {
    const session = sessionWith([PRO])
    const state = fold(session.snapshotEvents())
    expect(state.notes).toEqual({ kind: 'unrecorded' })
    expect(recordedModelNotes({ stateOf: () => state }, session)).toBeUndefined()
  })

  it.each([
    ['a missing models field', {}],
    ['a malformed note', { models: [{ provider: 'alt' }] }],
    ['a repeated route', { models: [PRO_NOTE, PRO_NOTE] }],
  ])('folds %s to a serializable invalid state reported only by the reader', (_label, data) => {
    const session = sessionWith([PRO], data)
    const state = fold(session.snapshotEvents())
    expect(state.notes).toEqual({ kind: 'invalid' })
    expect(modelNotesProjection.stateSchema.parse(JSON.parse(JSON.stringify(state)))).toEqual(state)
    expect(() => recordedModelNotes({ stateOf: () => state }, session)).toThrow('invalid subagent model notes record')
  })

  it('treats a malformed official policy as authorizing nothing', () => {
    const session = Session.create(SessionId('bad-policy'))
    session.append('subagent/model-selection-policy', { allowedModels: [{ provider: '' }] } as never)
    expect(fold(session.snapshotEvents()).policy).toEqual([])
  })
})

describe('notes projection recovery', () => {
  it('restores the same state from a checkpoint plus suffix as from a full replay, beside other units', async () => {
    const ctx = new Context()
    try {
      await ctx.plugin(SessionProjectionRegistry)
      const registry = ctx.sessionProjections
      await registry.register(modelNotesProjection)
      const session = sessionWith([PRO, LITE])
      const events = [...session.snapshotEvents()]
      appendPluginRecord(session, MODEL_NOTES_RECORD, { models: [PRO_NOTE] })
      const suffix = session.snapshotEvents().slice(events.length)

      const full = registry.restore({}, session.snapshotEvents(), SessionLogOffset(0), session.header, SessionLogOffset(0))
      const prefix = registry.restore({}, events, SessionLogOffset(0), session.header, SessionLogOffset(0))
      const resumed = registry.restore(prefix.checkpoint, suffix, SessionLogOffset(events.length), session.header, SessionLogOffset(0))
      expect(resumed.checkpoint[modelNotesProjection.key]?.val).toEqual(full.checkpoint[modelNotesProjection.key]?.val)
      expect(full.checkpoint[modelNotesProjection.key]?.val)
        .toEqual({ policy: [PRO, LITE], notes: { kind: 'recorded', models: [PRO_NOTE] } })
    } finally {
      await ctx.fiber.dispose()
    }
  })

  it('restores a damaged record without failing other projection units', async () => {
    const ctx = new Context()
    try {
      await ctx.plugin(SessionProjectionRegistry)
      const registry = ctx.sessionProjections
      await registry.register(modelNotesProjection)
      await registry.register(eventCountProjection)
      const session = sessionWith([PRO], { models: 'damaged' })
      const restored = registry.restore({}, session.snapshotEvents(), SessionLogOffset(0), session.header, SessionLogOffset(0))
      expect(restored.checkpoint[modelNotesProjection.key]?.val).toEqual({ policy: [PRO], notes: { kind: 'invalid' } })
      expect(restored.checkpoint[eventCountProjection.key]?.val).toBe(session.snapshotEvents().length)
    } finally {
      await ctx.fiber.dispose()
    }
  })
})
