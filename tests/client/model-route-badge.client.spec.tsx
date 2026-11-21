// @vitest-environment jsdom
/** The composer's model-route label: subagent-only scope, projection mapping, and the compact chip. */

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ModelRouteBadge, type ModelRouteBadgeProps } from '../../src/client/ModelRouteBadge.tsx'
import { modelLabelOf } from '../../src/client/model-label.ts'
import type { ModelSelectionView } from '../../src/client/model-selection-view.ts'
import { en } from '../../src/client/locales.ts'

afterEach(cleanup)

const t = (key: keyof typeof en, params?: Record<string, string>) =>
  en[key].replace('{route}', params?.route ?? '')

const ROUTE = { provider: 'proxy', model: 'codex-gpt-6.2-sol' }

/** A subagent Session's snapshot as far as this label reads it. */
const SUBAGENT = { subagent: { address: { parentSessionId: 'root', childSessionId: 'child', mode: 'continuable' } } }

/**
 * Bind the two readers the renderer supplies for one Session.
 * @param view - the Session's `modelSelection` value.
 * @param subagent - the Session's `subagent` snapshot member; null for a root Session.
 */
function renderBadge(view: ModelSelectionView | undefined, subagent: unknown = SUBAGENT) {
  const useProjection = () => view
  const useSession = (selector: (snapshot: { subagent: unknown }) => unknown) => selector({ subagent })
  const props = { useSession, useProjection, t } as unknown as ModelRouteBadgeProps
  return render(<ModelRouteBadge {...props} />)
}

describe('modelLabelOf', () => {
  it('names the full provider/model route the next request sends', () => {
    expect(modelLabelOf({ lastUsed: ROUTE, next: ROUTE })).toMatchObject({
      route: 'proxy/codex-gpt-6.2-sol',
      model: 'codex-gpt-6.2-sol',
    })
  })

  it('prefers the pending route over the last used one', () => {
    const next = { provider: 'alt', model: 'other' }
    expect(modelLabelOf({ lastUsed: ROUTE, next })?.route).toBe('alt/other')
  })

  it('falls back to the last used route before any new selection', () => {
    expect(modelLabelOf({ lastUsed: ROUTE, next: null })?.route).toBe('proxy/codex-gpt-6.2-sol')
  })

  it('has no label before the Session records a route', () => {
    expect(modelLabelOf(undefined)).toBeUndefined()
    expect(modelLabelOf({ lastUsed: null, next: null })).toBeUndefined()
  })
})

describe('ModelRouteBadge', () => {
  it('renders nothing for a root Session, whose model selector already names the route', () => {
    const { container } = renderBadge({ lastUsed: ROUTE, next: ROUTE }, null)
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing before a route is recorded', () => {
    const { container } = renderBadge(undefined)
    expect(container.innerHTML).toBe('')
  })

  it('shows the complete route in a subagent Session with an accessible name naming it', () => {
    renderBadge({ lastUsed: ROUTE, next: ROUTE })
    expect(screen.getByText('proxy/codex-gpt-6.2-sol')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Current model: proxy/codex-gpt-6.2-sol' })).toBeTruthy()
  })

  it('keeps the glyph and the bubble text that a compact row relies on', () => {
    renderBadge({ lastUsed: ROUTE, next: ROUTE })
    // A narrow composer row sets data-model-compact, which hides only the text
    // span; the button, its glyph, and the bubble text remain.
    const button = screen.getByRole('button', { name: /Current model:/ })
    expect(button.querySelector('svg')).toBeTruthy()
    expect(button.textContent).toBe('proxy/codex-gpt-6.2-sol')
  })
})
