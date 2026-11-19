/**
 * The startup interface check, and the route read it guards.
 *
 * A release that renames or replaces `allowedRoutes` would otherwise leave every
 * Session recording no notes with no diagnostic, so activation must fail instead.
 */

import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { authorizedRoutes, assertSelectionInterface, VERIFIED_DSH_RANGE } from '../../src/index.ts'

const PRO = { provider: 'alt', model: 'pro' }

/** A context whose only provided service is the given selection stand-in. */
function contextWith(selection: unknown): Context {
  return { get: () => selection, logger: { warn: () => {} } } as never as Context
}

describe('assertSelectionInterface', () => {
  it('passes through the routes the setting authorizes', () => {
    expect(assertSelectionInterface(contextWith({ allowedRoutes: () => [PRO] }))).toEqual([PRO])
  })

  it('passes through a disabled setting', () => {
    expect(assertSelectionInterface(contextWith({ allowedRoutes: () => undefined }))).toBeUndefined()
  })

  it('fails activation when the service no longer offers allowedRoutes', () => {
    expect(() => assertSelectionInterface(contextWith({ someOtherMethod: () => [] })))
      .toThrow(/no longer offers allowedRoutes/)
  })

  it('names the verified DSH range in the failure, so the mismatch points at the release', () => {
    expect(() => assertSelectionInterface(contextWith({}))).toThrow(new RegExp(VERIFIED_DSH_RANGE.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  })

  it('fails activation when the routes no longer carry provider and model ids', () => {
    expect(() => assertSelectionInterface(contextWith({ allowedRoutes: () => [{ provider: 'alt' }] })))
      .toThrow(/without provider and model ids/)
  })

  it('treats a rejected route list as the setting data error it is, not an interface change', () => {
    const rejecting = { allowedRoutes: () => { throw new Error('enabled subagent model selection requires at least one allowed model') } }
    expect(assertSelectionInterface(contextWith(rejecting))).toBeUndefined()
  })
})

describe('authorizedRoutes', () => {
  it('reads the authorized routes per call, so a setting edit reaches the next Session', () => {
    let enabled = true
    const ctx = contextWith({ allowedRoutes: () => enabled ? [PRO] : undefined })
    expect(authorizedRoutes(ctx)).toEqual([PRO])
    enabled = false
    expect(authorizedRoutes(ctx)).toEqual([])
  })

  it('reports nothing when the service is missing or lacks the operation', () => {
    expect(authorizedRoutes(contextWith(undefined))).toEqual([])
    expect(authorizedRoutes(contextWith({}))).toEqual([])
  })

  it('contributes no notes rather than failing Session creation when the setting is unusable', () => {
    const rejecting = { allowedRoutes: () => { throw new Error('repeats route') } }
    expect(authorizedRoutes(contextWith(rejecting))).toEqual([])
  })
})
