/** Session-header action that refreshes this Session's subagent model notes. */

import { useEffect, useState } from 'react'
import { Button, IconRefreshOutlineRegular, Toast, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { ModelNotesLocaleKey } from './locales.ts'
import type { RefreshResult, SessionId } from './refresh-controller.ts'
import css from './ModelNotesRefreshAction.module.css'

/** Props of the header utility entry, with the refresh action injected by the plugin. */
export type ModelNotesRefreshActionProps = PropsRuntime<'conversation.session.header.utilities'>
  & PropsLocale<'teamModelRouting'>
  & InjectFace<{ readonly refresh: (id: SessionId) => Promise<RefreshResult> }>

/** Copy keys the button announces for each refresh outcome. */
const MESSAGE_KEYS: Record<RefreshResult['status'], ModelNotesLocaleKey> = {
  idle: 'refreshLabel',
  busy: 'refreshBusy',
  updated: 'refreshUpdated',
  unchanged: 'refreshUnchanged',
  failed: 'refreshFailed',
  inactive: 'refreshInactive',
}

/** Render a compact icon button matching the other Session utilities. */
export function ModelNotesRefreshAction({ sessionId, refresh, t }: ModelNotesRefreshActionProps) {
  const [notice, setNotice] = useState<RefreshResult | undefined>()
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    setNotice(undefined)
    setBusy(false)
  }, [sessionId])
  const onRefresh = (): void => {
    if (busy) return
    setBusy(true)
    void refresh(sessionId).then((result) => {
      setNotice(result)
      setBusy(false)
    })
  }
  return (
    <>
      <Tooltip label={t(busy ? 'refreshBusy' : 'refreshLabel')} side="bottom" delayMs={500}>
        <Button
          size="sm"
          variant="ghost"
          className={css.trigger}
          aria-label={t('refreshLabel')}
          aria-busy={busy}
          disabled={busy}
          data-model-notes-refresh=""
          onClick={onRefresh}
        >
          <IconRefreshOutlineRegular size={16} />
        </Button>
      </Tooltip>
      {notice !== undefined && notice.status !== 'idle' && notice.status !== 'busy' && (
        notice.status === 'updated' || notice.status === 'unchanged'
          ? <Toast
            key={`${String(sessionId)}-${notice.message}-${Date.now()}`}
            text={t(MESSAGE_KEYS[notice.status])}
            tone="success"
            onDone={() => { setNotice(undefined) }}
          />
          : <Toast
            key={`${String(sessionId)}-${notice.message}-${Date.now()}`}
            text={t(MESSAGE_KEYS[notice.status])}
            onDone={() => { setNotice(undefined) }}
          />
      )}
    </>
  )
}
