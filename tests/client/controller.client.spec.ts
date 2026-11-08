/** Staged notes: authorized rows from the official entry, retained notes, revision fence, and save settlement. */

import { describe, expect, it } from 'vitest'
import { stubConfigForm, type StubConfigForm } from '@deepseek-ai/dsh-client-test-runtime'
import {
  ModelNotesController, modelNoteKey,
  type ModelNotesSettings, type SubagentModelSelectionSettings,
} from '../../src/client/model-notes-controller.ts'

const PRO = { provider: 'alt', model: 'pro' }
const LITE = { provider: 'alt', model: 'lite' }
const PRO_KEY = modelNoteKey(PRO)

/** Make the stub behave like a Host that accepts every write. */
function acceptWrites(host: StubConfigForm<ModelNotesSettings>): void {
  host.mutate.mockImplementation((ops) => {
    const current = host.scope.getSnapshot()
    const value = { ...current.value as ModelNotesSettings }
    for (const op of ops) if (op.op === 'set') Reflect.set(value, op.path[0]!, op.value)
    host.publish({ value, user: value, revision: (current.revision ?? 0) + 1 })
    return Promise.resolve(true)
  })
}

/** Both entries served, with the official selection authorizing the given routes. */
function bench(options: { notes?: ModelNotesSettings['modelNotes']; allowed?: SubagentModelSelectionSettings['allowedModels']; enabled?: boolean } = {}) {
  const host = stubConfigForm<ModelNotesSettings>()
  const selection = stubConfigForm<SubagentModelSelectionSettings>()
  const controller = new ModelNotesController(host.scope, selection.scope)
  host.publish({ status: 'ready', writable: true, revision: 1, value: { modelNotes: options.notes ?? [] }, user: {} })
  selection.publish({
    status: 'ready', writable: true, revision: 1,
    value: { enabled: options.enabled ?? true, allowedModels: options.allowed ?? [PRO] }, user: {},
  })
  const face = controller.inject()
  const state = () => face.hooks.modelNotes.getSnapshot()
  return { host, selection, controller, face, state }
}

describe('ModelNotesController', () => {
  it('offers note fields only for routes the official entry saved as authorized', () => {
    const { state, selection, controller } = bench({
      notes: [{ ...LITE, capability: 'cheap', scenario: 'quick' }],
      allowed: [PRO, LITE],
    })
    expect(state().rows).toEqual([
      { ...PRO, key: PRO_KEY, capability: '', scenario: '' },
      { ...LITE, key: modelNoteKey(LITE), capability: 'cheap', scenario: 'quick' },
    ])
    selection.publish({ value: { enabled: false, allowedModels: [PRO, LITE] } })
    expect(state().rows).toEqual([])
    selection.publish({ status: 'unavailable' })
    expect(state().selectionAvailable).toBe(false)
    controller.dispose()
  })

  it('saves every note, including notes of unauthorized routes, as one revision-fenced mutation', async () => {
    const lite = { ...LITE, capability: 'cheap', scenario: 'quick' }
    const { host, face, state, controller } = bench({ notes: [lite] })
    acceptWrites(host)

    face.setModelNote(PRO_KEY, 'capability', 'refactors')
    expect(state().dirty).toBe(true)
    face.save()
    await Promise.resolve()

    expect(host.mutate).toHaveBeenCalledWith(
      [{ op: 'set', path: ['modelNotes'], value: [lite, { ...PRO, capability: 'refactors', scenario: '' }] }],
      1,
    )
    expect(state()).toMatchObject({ dirty: false, saving: false, failed: false })
    controller.dispose()
  })

  it('restores a saved note when its route is authorized again', () => {
    const pro = { ...PRO, capability: 'refactors', scenario: 'large' }
    const { selection, state, controller } = bench({ notes: [pro] })
    selection.publish({ value: { enabled: true, allowedModels: [LITE] }, revision: 2 })
    expect(state().rows.map(row => row.key)).toEqual([modelNoteKey(LITE)])
    selection.publish({ value: { enabled: true, allowedModels: [LITE, PRO] }, revision: 3 })
    expect(state().rows.find(row => row.key === PRO_KEY)).toMatchObject({ capability: 'refactors', scenario: 'large' })
    controller.dispose()
  })

  it('keeps a drafted note across an unauthorize and reauthorize before saving', () => {
    const { selection, face, state, controller } = bench()
    face.setModelNote(PRO_KEY, 'scenario', 'draft')
    selection.publish({ value: { enabled: true, allowedModels: [] }, revision: 2 })
    expect(state()).toMatchObject({ rows: [], dirty: true })
    selection.publish({ value: { enabled: true, allowedModels: [PRO] }, revision: 3 })
    expect(state().rows[0]).toMatchObject({ scenario: 'draft' })
    controller.dispose()
  })

  it('ignores edits for a route that is not authorized', () => {
    const { face, state, host, controller } = bench()
    face.setModelNote(modelNoteKey(LITE), 'capability', 'x')
    expect(state().dirty).toBe(false)
    face.save()
    expect(host.mutate).not.toHaveBeenCalled()
    controller.dispose()
  })

  it('treats clearing both fields as no note', () => {
    const { face, state, controller } = bench()
    face.setModelNote(PRO_KEY, 'capability', 'x')
    face.setModelNote(PRO_KEY, 'capability', '')
    expect(state().dirty).toBe(false)
    controller.dispose()
  })

  it('refuses to save a draft started on an older revision and reports the conflict', () => {
    const { host, face, state, controller } = bench()
    face.setModelNote(PRO_KEY, 'capability', 'mine')
    host.publish({ value: { modelNotes: [{ ...PRO, capability: 'theirs', scenario: '' }] }, revision: 2 })
    expect(state().conflicted).toBe(true)
    face.save()
    expect(host.mutate).not.toHaveBeenCalled()
    face.discard()
    expect(state()).toMatchObject({ conflicted: false, dirty: false })
    expect(state().rows[0]).toMatchObject({ capability: 'theirs' })
    controller.dispose()
  })

  it('clears the draft when a newer revision already holds the drafted notes', () => {
    const { host, face, state, controller } = bench()
    face.setModelNote(PRO_KEY, 'capability', 'same')
    host.publish({ value: { modelNotes: [{ ...PRO, capability: 'same', scenario: '' }] }, revision: 2 })
    expect(state()).toMatchObject({ conflicted: false, dirty: false })
    controller.dispose()
  })

  it('leaves saving and keeps the draft when the Host refuses the write', async () => {
    const { host, face, state, controller } = bench()
    host.mutate.mockResolvedValue(false)
    face.setModelNote(PRO_KEY, 'capability', 'refused')
    face.save()
    expect(state().saving).toBe(true)
    await Promise.resolve()
    expect(state()).toMatchObject({ saving: false, failed: true, dirty: true })
    controller.dispose()
  })

  it('leaves saving with an unknown outcome when the write rejects and keeps reporting it across edits', async () => {
    const { host, face, state, controller } = bench()
    host.mutate.mockRejectedValue(new Error('connection lost'))
    face.setModelNote(PRO_KEY, 'capability', 'lost')
    face.save()
    await Promise.resolve()
    await Promise.resolve()
    expect(state()).toMatchObject({ saving: false, failed: true, dirty: true, conflicted: false })
    // The outcome stays reported as unknown across further edits.
    face.setModelNote(PRO_KEY, 'scenario', 'more')
    expect(state().failed).toBe(true)
    controller.dispose()
  })

  it('drops the draft and a pending save after a connection reset', async () => {
    const { host, face, state, controller } = bench()
    let settle: (accepted: boolean) => void = () => {}
    host.mutate.mockReturnValue(new Promise<boolean>((resolve) => { settle = resolve }))
    face.setModelNote(PRO_KEY, 'capability', 'pending')
    face.save()
    controller.resetConnection()
    expect(state()).toMatchObject({ saving: false, dirty: false, failed: false })
    settle(true)
    await Promise.resolve()
    expect(state()).toMatchObject({ saving: false, dirty: false })
    controller.dispose()
  })

  it('stays read-only while the entry is not writable', () => {
    const { host, face, state, controller } = bench()
    host.publish({ writable: false })
    face.setModelNote(PRO_KEY, 'capability', 'x')
    expect(state()).toMatchObject({ writable: false, dirty: false })
    controller.dispose()
  })

  it('stops publishing after dispose', () => {
    const { host, selection, controller } = bench()
    controller.dispose()
    expect(host.listenerCount()).toBe(0)
    expect(selection.listenerCount()).toBe(0)
  })
})
