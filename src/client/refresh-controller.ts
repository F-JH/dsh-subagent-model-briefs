/** Browser state for the Session-header subagent-model-notes refresh action. */

import type { SessionId } from '@deepseek-ai/dsh-session/types'

export type { SessionId }

/** Path of the authenticated Host endpoint this controller calls. */
export const REFRESH_API_PATH = '/api/team-model-routing.refresh'

/**
 * Browser form of {@link REFRESH_API_PATH}: the served document's `<base href="./">`
 * resolves it beneath the mount that served the page.
 */
export const REFRESH_API_ROUTE = REFRESH_API_PATH.slice(1)

/** What the refresh action currently reports. */
export type RefreshStatus = 'idle' | 'busy' | 'updated' | 'unchanged' | 'failed' | 'inactive'

/** One request outcome, with the copy key the button should announce. */
export interface RefreshResult {
  readonly status: RefreshStatus
  readonly message: string
}

/** Fetch substitute so transport failures stay testable without a server. */
export type RefreshFetch = (path: string, init: RequestInit) => Promise<Response>

/** Translate a Host response into button state. */
export function readRefreshResult(ok: boolean, body: unknown): RefreshResult {
  const code = typeof body === 'object' && body !== null && !Array.isArray(body)
    ? (body as { code?: unknown }).code
    : undefined
  if (ok) {
    const changed = typeof body === 'object' && body !== null && !Array.isArray(body)
      && (body as { changed?: unknown }).changed === true
    return changed
      ? { status: 'updated', message: 'updated' }
      : { status: 'unchanged', message: 'unchanged' }
  }
  return code === 'inactive'
    ? { status: 'inactive', message: 'inactive' }
    : { status: 'failed', message: 'failed' }
}

/** Own the per-session refresh request without owning a React hook. */
export class RefreshController {
  private readonly pending = new Map<SessionId, Promise<RefreshResult>>()
  private readonly fetcher: RefreshFetch

  /** @param fetcher - transport; production passes `fetch`, specs pass a stub. */
  constructor(fetcher: RefreshFetch = (path, init) => fetch(path, init)) {
    this.fetcher = fetcher
  }

  /**
   * Refresh one Session, deduplicating overlapping requests for the same id.
   * @param sessionId - current Session from the header slot.
   * @returns the settled status and its copy key.
   */
  refresh(sessionId: SessionId): Promise<RefreshResult> {
    const running = this.pending.get(sessionId)
    if (running !== undefined) return running
    const task = this.send(sessionId).finally(() => { this.pending.delete(sessionId) })
    this.pending.set(sessionId, task)
    return task
  }

  /** Send one JSON POST to the Host refresh route. */
  private async send(sessionId: SessionId): Promise<RefreshResult> {
    let response: Response
    try {
      response = await this.fetcher(REFRESH_API_ROUTE, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
    } catch {
      return { status: 'failed', message: 'failed' }
    }
    let body: unknown
    try {
      body = await response.json()
    } catch {
      return { status: 'failed', message: 'failed' }
    }
    return readRefreshResult(response.ok, body)
  }
}
