/** Locale bundles for the subagent model notes panel. */

import type { SettingsFormLabels } from '@deepseek-ai/dsh-client-ui-primitives'
// Type-only: the ns → key union merge. `register(NS, { zh, en })` checks both
// dictionaries against it, so a key missing from either is a compile error.
import type {} from '@deepseek-ai/dsh-client-ui-slots'

/** Locale keys the panel renders. */
export type ModelNotesLocaleKey =
  | 'unavailable' | 'readOnly' | 'save' | 'saving' | 'saveFailed'
  | 'sectionTitle' | 'sectionHint' | 'capability' | 'scenario'
  | 'selectionUnavailable' | 'selectionEmpty' | 'conflict'

/** English copy. */
export const en: Record<ModelNotesLocaleKey, string> = {
  unavailable: 'This plugin is not loaded, so it cannot be configured right now.',
  readOnly: 'This deployment stores settings read-only.',
  save: 'Save',
  saving: 'Saving…',
  saveFailed: 'The save could not be confirmed and may have been applied. Your draft is retained; check the current settings before trying again.',
  sectionTitle: 'Model notes',
  sectionHint: 'Describe what each allowed model is good at and when to use it. Agents read these notes for reference when they choose a subagent model. Changes apply to new sessions only.',
  capability: 'Capability',
  scenario: 'Scenario',
  selectionUnavailable: 'Subagent model selection is unavailable, so model notes cannot be edited right now.',
  selectionEmpty: 'Turn on model selection above, check models, and save. Each saved model then gets its note fields here.',
  conflict: 'These notes changed while you were editing. Your draft cannot be saved against the newer values. Leave this page to discard the draft, check the current notes, then edit again.',
}

/** Simplified Chinese copy. */
export const zh: Record<ModelNotesLocaleKey, string> = {
  unavailable: '该插件当前未加载，暂时无法配置。',
  readOnly: '本部署的设置为只读。',
  save: '保存',
  saving: '保存中…',
  saveFailed: '无法确认保存结果，设置可能已经生效。草稿已保留；请先核对当前设置再重试。',
  sectionTitle: '模型说明',
  sectionHint: '为每个已授权的模型填写能力说明和适用场景，供智能体选择子代理模型时参考。更改仅对新会话生效。',
  capability: '能力说明',
  scenario: '适用场景',
  selectionUnavailable: '子代理模型选择当前不可用，暂时无法编辑模型说明',
  selectionEmpty: '在上方开启模型选择、勾选模型并保存后，可在这里为每个已保存的模型填写说明',
  conflict: '编辑期间说明已发生变化，无法基于较新的值保存草稿。请离开此页面放弃草稿，核对当前说明后重新编辑。',
}

/**
 * The form frame's copy, read from this panel's dictionary.
 * @param t - the panel's locale reader.
 * @returns the labels the shared settings form renders.
 */
export function formLabels(t: (key: ModelNotesLocaleKey) => string): SettingsFormLabels {
  return {
    unavailable: t('unavailable'),
    readOnly: t('readOnly'),
    saveFailed: t('saveFailed'),
    save: t('save'),
    saving: t('saving'),
  }
}
