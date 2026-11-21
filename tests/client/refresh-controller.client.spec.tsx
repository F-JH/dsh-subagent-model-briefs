// @vitest-environment jsdom
/** Browser refresh controller and the Session-header action. */

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import { RefreshController, REFRESH_API_ROUTE, readRefreshResult } from '../../src/client/refresh-controller.ts'
import { ModelNotesRefreshAction, type ModelNotesRefreshActionProps } from '../../src/client/ModelNotesRefreshAction.tsx'
import { en } from '../../src/client/locales.ts'

afterEach(cleanup)

const SID = 'session-1' as SessionId

describe('readRefreshResult', () => {
  it('distinguishes changed, unchanged, inactive, and failed responses', () => {
    expect(readRefreshResult(true, { ok: true, changed: true })).toEqual({ status: 'updated', message: 'updated' })
    expect(readRefreshResult(true, { ok: true, changed: false })).toEqual({ status: 'unchanged', message: 'unchanged' })
    expect(readRefreshResult(false, { code: 'inactive' })).toEqual({ status: 'inactive', message: 'inactive' })
    expect(readRefreshResult(false, {})).toEqual({ status: 'failed', message: 'failed' })
  })
})

describe('RefreshController', () => {
  it('posts the session id to the authenticated route', async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify({ ok: true, changed: true }), {
      status: 200, headers: { 'content-type': 'application/json' },
    }))
    const result = await new RefreshController(fetcher).refresh(SID)
    expect(result.status).toBe('updated')
    expect(fetcher).toHaveBeenCalledOnce()
    const [path, init] = fetcher.mock.calls[0]!
    expect(path).toBe(REFRESH_API_ROUTE)
    // A served document's <base href="./"> must carry the request beneath the mount that served it.
    expect(path.startsWith('/')).toBe(false)
    expect(init.method).toBe('POST')
    expect(JSON.parse(String(init.body))).toEqual({ sessionId: SID })
  })

  it('survives a transport failure and malformed JSON', async () => {
    const failing = await new RefreshController(() => Promise.reject(new Error('offline'))).refresh(SID)
    expect(failing.status).toBe('failed')
    const bad = await new RefreshController(async () => new Response('not json')).refresh(SID)
    expect(bad.status).toBe('failed')
  })

  it('deduplicates overlapping refreshes for one session', async () => {
    let release = () => {}
    const pending = new Promise<Response>((resolve) => { release = () => resolve(new Response('{}')) })
    const fetcher = vi.fn(() => pending)
    const controller = new RefreshController(fetcher)
    const first = controller.refresh(SID)
    const second = controller.refresh(SID)
    release()
    await Promise.all([first, second])
    expect(fetcher).toHaveBeenCalledOnce()
  })
})

describe('ModelNotesRefreshAction', () => {
  function renderAction(refresh: (id: SessionId) => Promise<{ status: string; message: string }>) {
    const props = {
      sessionId: SID,
      refresh,
      t: (key: keyof typeof en) => en[key],
    } as unknown as ModelNotesRefreshActionProps
    return render(<ModelNotesRefreshAction {...props} />)
  }

  it('renders an icon-only button with an accessible label', () => {
    renderAction(() => Promise.resolve({ status: 'updated', message: 'updated' }))
    expect(screen.getByRole('button', { name: en.refreshLabel })).toBeTruthy()
  })

  it('announces a successful refresh without changing the button label', async () => {
    renderAction(() => Promise.resolve({ status: 'updated', message: 'updated' }))
    fireEvent.click(screen.getByRole('button', { name: en.refreshLabel }))
    await waitFor(() => { expect(screen.getByRole('alert').textContent).toContain(en.refreshUpdated) })
    expect(screen.getByRole('button', { name: en.refreshLabel })).toBeTruthy()
  })
})
