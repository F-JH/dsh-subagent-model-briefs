/**
 * Host endpoint that refreshes one live Session's subagent-model-notes snapshot.
 *
 * The browser calls this through the authenticated `/api` fetch channel, so
 * the connection service has already applied its Host/Origin trust fence and
 * browser authentication before this handler runs. The handler itself only
 * accepts a JSON body naming a Session and performs a serialized, single-shot
 * refresh; it never accepts routes, notes, or log positions from the caller.
 *
 * @module dsh-subagent-model-briefs/refresh-api
 */

import type { Session, SessionId } from '@deepseek-ai/dsh-session'
import type { ModelNote, ModelNotesState } from './notes.ts'

/** Absolute path of the exact Fetch route this plugin owns below `/api`. */
export const REFRESH_API_PATH = '/api/team-model-routing.refresh'

/** Operations the refresh endpoint performs, and what it reports. */
export interface RefreshInputs {
  /** Read the live Session bound to a session id; undefined when not live. */
  readonly sessionOf: (id: SessionId) => Session | undefined
  /** Read the latest note projection state for one Session. */
  readonly stateOf: (session: Session) => ModelNotesState
  /** Compute the desired snapshot from the live settings. */
  readonly snapshot: () => readonly ModelNote[] | undefined
  /** Resolve reasoning efforts and publish them with a new record atomically. */
  readonly refresh: (session: Session, models: readonly ModelNote[]) => Promise<void>
}

/** Write one JSON response with no caching. */
function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

/** Read and validate one refresh request body. */
function readSessionId(body: unknown): SessionId | undefined {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return undefined
  const id = (body as { sessionId?: unknown }).sessionId
  if (typeof id !== 'string' || id === '') return undefined
  return id as SessionId
}

/** Whether two note snapshots carry the same routes and note text. */
function sameModels(left: readonly ModelNote[], right: readonly ModelNote[]): boolean {
  if (left.length !== right.length) return false
  const byRoute = new Map(left.map(note => [`${note.provider}\0${note.model}`, note]))
  return right.every(note => {
    const other = byRoute.get(`${note.provider}\0${note.model}`)
    return other !== undefined && other.capability === note.capability && other.scenario === note.scenario
  })
}

/** Minimal shape of the Host fetch registry this route needs. */
export interface RefreshFetchRegistry {
  /** Register one exact route; returns its disposer. */
  register(route: {
    readonly path: string
    readonly methods: readonly string[]
    readonly requestBody: string
    readonly fetch: (request: Request) => Promise<Response>
  }): () => Promise<void>
}

/** Own the refresh route's registration and serialized refreshes. */
export class RefreshApi {
  private readonly pending = new Map<SessionId, Promise<void>>()

  /**
   * @param connection - Host connection service; the plugin reads it optionally.
   * @param inputs - this plugin's refresh operations.
   */
  constructor(
    private readonly fetch: RefreshFetchRegistry,
    private readonly inputs: RefreshInputs,
  ) {}

  /** Register the refresh route on the authenticated `/api` channel. */
  register(): () => Promise<void> {
    const { pending, inputs } = this
    return this.fetch.register({
      path: REFRESH_API_PATH,
      methods: ['POST'],
      requestBody: 'buffered',
      async fetch(request) {
        const type = request.headers.get('content-type') ?? ''
        if (!type.toLowerCase().startsWith('application/json')) {
          return json({ code: 'invalid', message: 'expected application/json' }, 415)
        }
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json({ code: 'invalid', message: 'malformed JSON body' }, 400)
        }
        const id = readSessionId(body)
        if (id === undefined) {
          return json({ code: 'invalid', message: 'sessionId must be a non-empty string' }, 400)
        }
        const session = inputs.sessionOf(id)
        if (session === undefined) {
          return json({ code: 'inactive', message: 'session is not active; send a message first' }, 409)
        }
        const previous = pending.get(id) ?? Promise.resolve()
        let release: () => void = () => {}
        const turn = new Promise<void>((resolve) => { release = resolve })
        pending.set(id, previous.then(() => turn))
        await previous
        try {
          const desired = inputs.snapshot() ?? []
          const current = inputs.stateOf(session)
          if (current.notes.kind === 'recorded' && sameModels(current.notes.models, desired)) {
            return json({ ok: true, changed: false })
          }
          await inputs.refresh(session, desired)
          return json({ ok: true, changed: true })
        } catch (error: unknown) {
          return json({ code: 'failed', message: error instanceof Error ? error.message : String(error) }, 500)
        } finally {
          release()
        }
      },
    })
  }
}
