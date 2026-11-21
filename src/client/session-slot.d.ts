/**
 * Session header slot shape used by this plugin's refresh action.
 *
 * The plugin's standalone typecheck resolves an installed `ui-slots` whose
 * SlotMap has not yet merged the Conversation package's declarations. This
 * merge states the one session-scoped list seat the action registers; the
 * shape matches the owner's declaration in the DSH checkout.
 */

export {}

import type { SessionId } from '@deepseek-ai/dsh-session/types'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'conversation.session.header.utilities': {
      kind: 'list'
      scope: 'session'
    }
  }
  interface SessionStandardProps {
    /** Current Session identity supplied by the slot renderer. */
    sessionId: SessionId
  }
}
