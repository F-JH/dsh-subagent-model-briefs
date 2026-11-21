/**
 * The active model label shown beside the composer's model selector.
 *
 * The label names the exact route the Session is running on, so a subagent
 * Session shows which model its subagent actually uses. It adds nothing of its
 * own: DSH's `modelSelection` projection already holds the route.
 *
 * @module dsh-subagent-model-briefs/client/model-label
 */

import type { ModelSelectionView } from './model-selection-view.ts'

/** One rendered model label: the full route plus the compact fallback names. */
export interface ModelLabel {
  /** Complete `provider/model` route, shown when the composer row has room. */
  readonly route: string
  /** Model id alone, for surfaces too narrow for the provider prefix. */
  readonly model: string
  /** Accessible name and bubble text, the same full route. */
  readonly title: string
}

/**
 * Build the label from the Session's model-selection projection.
 * @param view - `modelSelection` value, or undefined while no Session or no selection exists.
 * @returns the label, or undefined when the Session recorded no route yet.
 */
export function modelLabelOf(view: ModelSelectionView | undefined): ModelLabel | undefined {
  if (view === undefined) return undefined
  // `next` is the upcoming route and falls back to the last used one, so it is
  // the route the next request will actually send.
  const route = view.next ?? view.lastUsed
  if (route === null) return undefined
  return {
    route: `${route.provider}/${route.model}`,
    model: route.model,
    title: `${route.provider}/${route.model}`,
  }
}
