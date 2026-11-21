/**
 * The subset of DSH's `modelSelection` projection this plugin reads.
 *
 * Declared here instead of imported: the projection's value type lives in the
 * Host agent package, which a browser bundle must not depend on. The shape
 * matches `modelSelectionProjectionDefinition.wire.view` in DSH.
 *
 * @module dsh-subagent-model-briefs/client/model-selection-view
 */

/** One exact provider/model route with its optional reasoning effort. */
export interface ModelRouteView {
  readonly provider: string
  readonly model: string
  readonly reasoningEffort?: string
}

/** `modelSelection` view value: the last used route and the one the next request sends. */
export interface ModelSelectionView {
  readonly lastUsed: ModelRouteView | null
  readonly next: ModelRouteView | null
}
