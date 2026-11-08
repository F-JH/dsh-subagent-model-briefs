/** What the browser half registers, when, what resets it, and that it all leaves with the fiber. */

import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it, vi } from 'vitest'
import { resolveSlotLabel } from '@deepseek-ai/dsh-client-ui-slots'
import { SlotRegistry } from '@deepseek-ai/dsh-client-ui-renderer/client'
import { RemoteError, TestRemote } from '@deepseek-ai/dsh-client-test-runtime'
import { LocaleRuntime } from '@deepseek-ai/dsh-client-locale/client'
import { apply as settingsApply, inject as settingsInject } from '@deepseek-ai/dsh-client-ui-settings/client'
import { apply, inject, NS } from '../../src/client/index.ts'
import type { ModelNotesFace } from '../../src/client/index.ts'
import {
  MODEL_NOTES_ENTRY_ID, ModelNotesController, SUBAGENT_MODEL_SELECTION_ENTRY_ID,
} from '../../src/client/model-notes-controller.ts'
import { zh } from '../../src/client/locales.ts'

/** One Host view of a configuration entry. */
function view(ns: string, revision = 0) {
  return { ns, schema: {}, value: {}, applies: 'live', secrets: [], revision }
}

/** @param served - namespaces the Host describes; empty answers a failed read. */
async function bench(served: string[] = [MODEL_NOTES_ENTRY_ID, SUBAGENT_MODEL_SELECTION_ENTRY_ID]) {
  const ctx = new Context()
  await ctx.plugin(SlotRegistry).await()
  const locale = new LocaleRuntime(ctx)
  locale.setLocale('zh')
  ctx.provide('locale', locale)
  const describe = vi.fn(() => Promise.resolve(served.length === 0
    ? { ok: false as const, error: new RemoteError('gateway/internal', 'no provider', {}) }
    : { ok: true as const, value: { writable: true, hasDocument: true, namespaces: served.map(ns => view(ns)) } }))
  const remote = new TestRemote(ctx, { settings: { describe } })
  await ctx.plugin({ inject: [...settingsInject], apply: settingsApply }).await()
  return { ctx, slots: ctx.get('slots') as SlotRegistry, describe, remote }
}

/** The Plugins page's detail-section slot, as its owner declares it. */
function declareDetailSection(slots: SlotRegistry): () => void {
  return slots.register({
    name: 'root',
    children: { 'plugins.detail.section': { kind: 'list', scope: 'root' } },
  } as never, () => null)
}

describe('dsh-team-model-routing apply', () => {
  it('declares the services it uses', () => {
    expect(inject).toEqual(['slots', 'locale', 'configForms'])
  })

  it('registers one detail-section contribution titled in the active locale while the Host serves its entry', async () => {
    const { ctx, slots } = await bench()
    declareDetailSection(slots)

    await ctx.plugin({ inject: [...inject], apply }).await()

    await vi.waitFor(() => { expect(slots.entries('plugins.detail.section')).toHaveLength(1) })
    const entry = slots.entries('plugins.detail.section')[0]!
    expect(entry.options).toMatchObject({ id: 'team-model-routing', order: 20 })
    expect(resolveSlotLabel(entry.options.label)).toBe(zh.sectionTitle)
    expect(entry.locale).toBe(NS)
    const face = entry.inject!.call(undefined)
    expect(Object.keys(face.hooks as ModelNotesFace['hooks'])).toEqual(['modelNotes'])
    expect(typeof (face.save as ModelNotesFace['save'])).toBe('function')
  })

  it('registers nothing when the Host does not serve its entry', async () => {
    const { ctx, slots, describe } = await bench([SUBAGENT_MODEL_SELECTION_ENTRY_ID])
    declareDetailSection(slots)
    await ctx.plugin({ inject: [...inject], apply }).await()

    await vi.waitFor(() => { expect(describe).toHaveBeenCalled() })
    expect(slots.entries('plugins.detail.section')).toHaveLength(0)
  })

  it('resets the draft after a reconnect', async () => {
    const reset = vi.spyOn(ModelNotesController.prototype, 'resetConnection')
    const { ctx, slots } = await bench()
    declareDetailSection(slots)
    await ctx.plugin({ inject: [...inject], apply }).await()
    ctx.emit('connection/reset')
    expect(reset).toHaveBeenCalledTimes(1)
    reset.mockRestore()
  })

  it('removes the panel when the plugin fiber is disposed', async () => {
    const { ctx, slots } = await bench()
    declareDetailSection(slots)
    const fiber = ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    await vi.waitFor(() => { expect(slots.entries('plugins.detail.section')).toHaveLength(1) })

    await fiber.dispose()

    expect(slots.entries('plugins.detail.section')).toHaveLength(0)
  })
})
