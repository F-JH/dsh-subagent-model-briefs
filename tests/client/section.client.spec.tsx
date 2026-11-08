// @vitest-environment jsdom
/** The notes panel as the official Subagent page renders it. */

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { bindSnapshotSelector } from '@deepseek-ai/dsh-client-test-runtime'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { PluginsSubject } from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import { ModelNotesSection, SUBAGENT_ITEM_ID, type ModelNotesSectionProps } from '../../src/client/ModelNotesSection.tsx'
import type { ModelNotesState } from '../../src/client/model-notes-controller.ts'
import { en, zh } from '../../src/client/locales.ts'

afterEach(cleanup)

const t = (key: keyof typeof en) => en[key]
const subagentPage: PluginsSubject = { kind: 'item', id: SUBAGENT_ITEM_ID }

function renderPanel(state: Partial<ModelNotesState> = {}, subject: PluginsSubject = subagentPage) {
  const store = createSnapshotStore<ModelNotesState>({
    available: true, writable: true, dirty: false, invalid: false, saving: false, failed: false,
    selectionAvailable: true,
    rows: [{ provider: 'alt', model: 'pro', key: 'alt\0pro', capability: 'refactors', scenario: '' }],
    conflicted: false,
    ...state,
  })
  const actions = { setModelNote: vi.fn(), save: vi.fn(), discard: vi.fn() }
  const props = { ...actions, subject, t, useModelNotes: bindSnapshotSelector(store) } as ModelNotesSectionProps
  return { ...render(<ModelNotesSection {...props} />), actions, store }
}

describe('ModelNotesSection', () => {
  it('renders nothing on another plugin page', () => {
    const { container } = renderPanel({}, { kind: 'item', id: 'web-search' })
    expect(container.innerHTML).toBe('')
  })

  it('renders one capability and one scenario field per authorized model below its heading', () => {
    renderPanel()
    expect(screen.getByRole('heading', { name: en.sectionTitle })).toBeTruthy()
    expect(screen.getByText(en.sectionHint)).toBeTruthy()
    const group = screen.getByRole('group', { name: 'alt/pro' })
    expect((screen.getByLabelText(en.capability) as HTMLTextAreaElement).value).toBe('refactors')
    expect((screen.getByLabelText(en.scenario) as HTMLTextAreaElement).value).toBe('')
    expect(group.querySelectorAll('textarea')).toHaveLength(2)
  })

  it('stages an edit through the injected action', () => {
    const { actions } = renderPanel()
    fireEvent.change(screen.getByLabelText(en.scenario), { target: { value: 'large changes' } })
    expect(actions.setModelNote).toHaveBeenCalledWith('alt\0pro', 'scenario', 'large changes')
  })

  it('offers one save for the whole panel', () => {
    const { actions } = renderPanel({ dirty: true })
    const saves = screen.getAllByRole('button', { name: en.save })
    expect(saves).toHaveLength(1)
    fireEvent.click(saves[0]!)
    expect(actions.save).toHaveBeenCalledTimes(1)
  })

  it('locks the fields while saving', () => {
    renderPanel({ saving: true, dirty: true })
    expect((screen.getByLabelText(en.capability) as HTMLTextAreaElement).disabled).toBe(true)
  })

  it('explains how to get note fields when no model is authorized', () => {
    renderPanel({ rows: [] })
    expect(screen.getByText(en.selectionEmpty)).toBeTruthy()
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('reports an unavailable official selection', () => {
    renderPanel({ selectionAvailable: false })
    expect(screen.getByText(en.selectionUnavailable)).toBeTruthy()
  })

  it('reports a conflicting revision', () => {
    renderPanel({ conflicted: true })
    expect(screen.getByRole('status').textContent).toBe(en.conflict)
  })

  it('keeps every key in both dictionaries', () => {
    expect(Object.keys(zh).sort()).toEqual(Object.keys(en).sort())
  })
})
