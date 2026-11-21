/** The refresh endpoint's request shape, serialization, and outcomes. */

import { describe, expect, it, vi } from 'vitest'
import type { SessionId } from '@deepseek-ai/dsh-session'
import { RefreshApi, REFRESH_API_PATH, type RefreshInputs, type RefreshFetchRegistry } from '../../src/refresh-api.ts'
import type { ModelNotesState } from '../../src/notes.ts'

/** A registry stub that owns and returns one route handler. */
function registry(): { api: RefreshFetchRegistry; handler: (request: Request) => Promise<Response> } {
  let handler: ((request: Request) => Promise<Response>) | undefined
  return {
    api: {
      register(route) {
        handler = route.fetch
        return () => Promise.resolve()
      },
    },
    get handler() {
      if (handler === undefined) throw new Error('no route registered')
      return handler
    },
  }
}

/** Valid refresh request for one session. */
function post(id: string): Request {
  return new Request(`http://localhost${REFRESH_API_PATH}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId: id }),
  })
}

/** Inputs whose current snapshot already matches the recorded state. */
function inputs(overrides: Partial<RefreshInputs> = {}): RefreshInputs {
  const state: ModelNotesState = { notes: { kind: 'recorded', models: [] } }
  return {
    sessionOf: () => ({ id: 'session-1' } as never),
    stateOf: () => state,
    snapshot: () => [],
    refresh: () => Promise.resolve(),
    ...overrides,
  }
}

describe('RefreshApi', () => {
  it('registers the exact authenticated API path', async () => {
    const reg = registry()
    const dispose = new RefreshApi(reg.api, inputs()).register()
    expect(typeof reg.handler).toBe('function')
    await dispose()
  })

  it('refuses a non-JSON body and a missing session id', async () => {
    const reg = registry()
    new RefreshApi(reg.api, inputs()).register()
    const wrongType = await reg.handler(new Request(`http://localhost${REFRESH_API_PATH}`, { method: 'POST' }))
    expect(wrongType.status).toBe(415)
    const missing = await reg.handler(new Request(`http://localhost${REFRESH_API_PATH}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
    }))
    expect(missing.status).toBe(400)
  })

  it('reports an inactive session before doing any refresh work', async () => {
    const reg = registry()
    const refresh = vi.fn(() => Promise.resolve())
    new RefreshApi(reg.api, inputs({ sessionOf: () => undefined, refresh })).register()
    const response = await reg.handler(post('session-1'))
    expect(response.status).toBe(409)
    expect(await response.json()).toMatchObject({ code: 'inactive' })
    expect(refresh).not.toHaveBeenCalled()
  })

  it('skips a no-op refresh and reports unchanged', async () => {
    const reg = registry()
    const refresh = vi.fn(() => Promise.resolve())
    new RefreshApi(reg.api, inputs({ refresh })).register()
    const response = await reg.handler(post('session-1'))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, changed: false })
    expect(refresh).not.toHaveBeenCalled()
  })

  it('refreshes when the snapshot differs and reports updated', async () => {
    const reg = registry()
    const refresh = vi.fn(() => Promise.resolve())
    new RefreshApi(reg.api, inputs({
      snapshot: () => [{ provider: 'alt', model: 'pro', capability: 'c', scenario: '' }],
      refresh,
    })).register()
    const response = await reg.handler(post('session-1'))
    expect(await response.json()).toEqual({ ok: true, changed: true })
    expect(refresh).toHaveBeenCalledOnce()
  })

  it('reports a failed refresh without claiming success', async () => {
    const reg = registry()
    new RefreshApi(reg.api, inputs({
      snapshot: () => [{ provider: 'alt', model: 'pro', capability: 'c', scenario: '' }],
      refresh: () => Promise.reject(new Error('append refused')),
    })).register()
    const response = await reg.handler(post('session-1'))
    expect(response.status).toBe(500)
    expect(await response.json()).toMatchObject({ code: 'failed', message: 'append refused' })
  })

  it('serializes overlapping refreshes for the same session', async () => {
    const reg = registry()
    const state: ModelNotesState = { notes: { kind: 'unrecorded' } }
    let release = () => {}
    const started = new Promise<void>((resolve) => { release = resolve })
    const refresh = vi.fn(async () => {
      await started
      state.notes = { kind: 'recorded', models: [{ provider: 'alt', model: 'pro', capability: 'c', scenario: '' }] }
    })
    new RefreshApi(reg.api, inputs({
      stateOf: () => state,
      snapshot: () => [{ provider: 'alt', model: 'pro', capability: 'c', scenario: '' }],
      refresh,
    })).register()
    const first = reg.handler(post('session-1'))
    const second = reg.handler(post('session-1'))
    await vi.waitFor(() => { expect(refresh).toHaveBeenCalledTimes(1) })
    release()
    await Promise.all([first, second])
    expect(refresh).toHaveBeenCalledTimes(1)
  })
})
