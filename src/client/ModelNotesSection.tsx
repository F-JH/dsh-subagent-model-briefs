/**
 * The subagent model notes panel, contributed to the official Subagent plugin
 * page on the Plugins page, below that page's model authorization.
 */

import { useId } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import { SettingsForm } from '@deepseek-ai/dsh-client-ui-primitives'
import { formLabels } from './locales.ts'
import type { ModelNotesFace, ModelNotesState } from './model-notes-controller.ts'
import css from './ModelNotesSection.module.css'

/** `plugins.item` id of the official Subagent settings page this panel joins. */
export const SUBAGENT_ITEM_ID = 'subagent'

/** Framework-derived props: the detail page's subject, this plugin's dictionary, and its staged actions. */
export type ModelNotesSectionProps = PropsRuntime<'plugins.detail.section'>
  & PropsLocale<'teamModelRouting'>
  & InjectFace<ModelNotesFace>

/**
 * Render the notes panel on the official Subagent page, or nothing for any other page.
 * @param props - the page subject, locale copy, the staged panel snapshot, and its actions.
 * @returns the staged notes form, or null on any other page.
 */
export function ModelNotesSection(props: ModelNotesSectionProps) {
  const { subject } = props
  if (subject.kind !== 'item' || subject.id !== SUBAGENT_ITEM_ID) return null
  return <ModelNotesPanel props={props} />
}

/** Subscribe only while the Subagent page is rendered. */
function ModelNotesPanel({ props }: { readonly props: ModelNotesSectionProps }) {
  const state = props.useModelNotes(snapshot => snapshot)
  return <ModelNotesFields props={props} state={state} />
}

/** Heading, hint, one fieldset per saved authorized model, and the form's save. */
function ModelNotesFields({ props, state }: {
  readonly props: ModelNotesSectionProps
  readonly state: ModelNotesState
}) {
  const { t } = props
  const headingId = useId()
  return (
    <section className={css.section} aria-labelledby={headingId} data-plugin-model-notes>
      <div className={css.intro}>
        <h3 className={css.heading} id={headingId}>{t('sectionTitle')}</h3>
        <p className={css.hint}>{t('sectionHint')}</p>
      </div>
      <SettingsForm labels={formLabels(t)} state={state} onSave={props.save} onDiscard={props.discard}>
        {!state.selectionAvailable
          ? <p className={css.hint}>{t('selectionUnavailable')}</p>
          : state.rows.length === 0
            ? <p className={css.hint}>{t('selectionEmpty')}</p>
            : (
              <div className={css.notes}>
                {state.rows.map(row => (
                  <fieldset key={row.key} className={css.noteGroup} data-model-note-row>
                    <legend className={css.legend}>{`${row.provider}/${row.model}`}</legend>
                    {(['capability', 'scenario'] as const).map(field => (
                      <label key={field} className={css.noteField}>
                        <span>{t(field)}</span>
                        <textarea
                          className={css.textarea}
                          value={row[field]}
                          disabled={!state.writable || state.saving}
                          onChange={(event) => { props.setModelNote(row.key, field, event.currentTarget.value) }}
                        />
                      </label>
                    ))}
                  </fieldset>
                ))}
              </div>
            )}
        {state.conflicted ? <p className={css.conflict} role="status">{t('conflict')}</p> : null}
      </SettingsForm>
    </section>
  )
}
