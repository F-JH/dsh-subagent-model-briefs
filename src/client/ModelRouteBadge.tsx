/**
 * The active model route, shown beside the composer's model selector.
 *
 * Wide composer rows show the complete `provider/model` route as text. A row
 * too narrow to hold its expanded controls reports `data-model-compact` on
 * itself (DSH's own control-row measurement), and the label then collapses to
 * a chip whose bubble opens upward on click and tap.
 */

import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { modelLabelOf } from './model-label.ts'
import type { ModelSelectionView } from './model-selection-view.ts'
import type { ModelNotesLocaleKey } from './locales.ts'
import css from './ModelRouteBadge.module.css'

/** Props of the composer model-route entry: the Session's projection reader and copy. */
export type ModelRouteBadgeProps = PropsRuntime<'conversation.input.right'>
  & PropsLocale<'teamModelRouting'>

/** The Session's `modelSelection` reader, as the renderer binds it. */
type ReadModelSelection = (key: 'modelSelection') => ModelSelectionView | undefined

/** A compact route glyph, distinct from the refresh action's circular arrow. */
function RouteGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3.75" cy="4" r="1.75" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12.25" cy="12" r="1.75" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.75 5.75v3.25a3 3 0 0 0 3 3h5.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/**
 * Render the Session's model route: full text when the composer row has room,
 * otherwise a chip that opens the same text upward on click or tap. Only a
 * subagent Session shows it; a root Session keeps its unmodified composer,
 * because the model selector beside it already names that Session's route.
 * @param props - the Session's lifecycle and projection readers, and copy.
 * @returns the route label, or null for a root Session or before any route is recorded.
 */
export function ModelRouteBadge({ useSession, useProjection, t }: ModelRouteBadgeProps) {
  const subagent = useSession(snapshot => snapshot.subagent)
  // The installed SlotMap carries no projection table; the reader returns this
  // one key's value, which the label narrows itself.
  const read = useProjection as unknown as ReadModelSelection
  const label = modelLabelOf(read('modelSelection'))
  if (subagent === null || label === undefined) return null
  const accessible = t('routeAria', { route: label.route })
  return (
    <Tooltip
      label={label.title}
      side="top"
      align="end"
      portal
      openOnClick
      focusDelayMs={0}
      maxWidth={320}
    >
      <button type="button" className={css.trigger} aria-label={accessible} data-model-route={label.route}>
        <span className={css.glyph} aria-hidden="true"><RouteGlyph /></span>
        <span className={css.text}>{label.route}</span>
      </button>
    </Tooltip>
  )
}
