/**
 * The subagent model notes panel, browser half.
 *
 * The panel registers into the Plugins page's `plugins.detail.section` slot
 * and renders only on the official Subagent page (`plugins.item` id
 * `subagent`), directly below that page's model authorization. It edits
 * `modelNotes` in this plugin's Host entry through the shared `configForms`
 * service and reads the saved official authorization through the same
 * service, without writing it.
 *
 * The registration lives with this plugin's fiber, so switching the plugin
 * off removes the panel along with everything else it contributed.
 */

// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: the ctx.configForms Context merge. Cross-plugin collaboration
// goes through the service, never a value import (client bundle purity gate).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: the Plugins page's SlotMap merge (the 'plugins.detail.section' entry).
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { ModelNotesSection } from './ModelNotesSection.tsx'
import {
  MODEL_NOTES_ENTRY_ID, ModelNotesController, SUBAGENT_MODEL_SELECTION_ENTRY_ID,
} from './model-notes-controller.ts'
import type { ModelNotesSettings, SubagentModelSelectionSettings } from './model-notes-controller.ts'
import { en, zh, type ModelNotesLocaleKey } from './locales.ts'

export type { ModelNotesSectionProps } from './ModelNotesSection.tsx'
export type {
  ModelNote, ModelNoteRow, ModelNotesFace, ModelNotesSettings, ModelNotesState, ModelRoute,
  SubagentModelSelectionSettings,
} from './model-notes-controller.ts'
export type { ModelNotesLocaleKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Subagent model notes panel copy. */
    'teamModelRouting': ModelNotesLocaleKey
  }
}

/** Dictionary namespace owned by this plugin. */
export const NS = 'teamModelRouting'

/** Required services (cordis fiber inject). */
export const inject = ['slots', 'locale', 'configForms']

/**
 * Mount the notes panel on the official Subagent page.
 * @param ctx - the browser plugin context.
 */
export function apply(ctx: ClientContext): void {
  const t = ctx.locale.bind(NS)
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-subagent-model-briefs: dictionaries')
  const notes = new ModelNotesController(
    ctx.configForms.get<ModelNotesSettings>(MODEL_NOTES_ENTRY_ID),
    ctx.configForms.get<SubagentModelSelectionSettings>(SUBAGENT_MODEL_SELECTION_ENTRY_ID),
  )
  ctx.effect(() => () => { notes.dispose() }, 'dsh-subagent-model-briefs: form subscriptions')
  ctx.effect(
    () => ctx.on('connection/reset', () => { notes.resetConnection() }),
    'dsh-subagent-model-briefs: connection generation',
  )
  ctx.effect(() => ctx.configForms.whileServed([MODEL_NOTES_ENTRY_ID], () => ctx.slots.inject(
    'plugins.detail.section',
    () => ctx.slots.register({
      name: 'plugins.detail.section',
      id: 'team-model-routing',
      order: 20,
      label: () => t('sectionTitle'),
      locale: NS,
      inject: () => notes.inject(),
    }, ModelNotesSection),
  )), 'dsh-subagent-model-briefs: panel')
}
