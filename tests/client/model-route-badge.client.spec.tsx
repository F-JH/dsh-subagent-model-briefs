// @vitest-environment jsdom
/** The composer's model-route label: projection mapping, rendering, and the compact chip. */

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

/** Bind a projection reader returning `view`, as the renderer does for one Session. */
function renderBadge(view: ModelSelectionView | undefined) {
  const useProjection = () => view
  const props = { useProjection, t } as unknown as ModelRouteBadgeProps
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
  it('renders nothing before a route is recorded', () => {
    const { container } = renderBadge(undefined)
    expect(container.innerHTML).toBe('')
  })

  it('shows the complete route as text with an accessible name naming it', () => {
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
