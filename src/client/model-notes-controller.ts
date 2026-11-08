/**
 * Staged editor for subagent model notes.
 *
 * The panel edits `modelNotes` in this plugin's Host entry and reads, without
 * writing, the routes the official subagent model authorization saved. A note
 * field is offered for every saved authorized route; notes of other routes stay
 * in the draft and in every save, so a route the user unchecks and checks again
 * gets its note back.
 */

import { createSnapshotStore, type SnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { SettingsFormScope, SettingsFormShell } from '@deepseek-ai/dsh-client-ui-primitives'

/** Host configuration entry id this panel edits. */
export const MODEL_NOTES_ENTRY_ID = 'team-model-routing-settings'

/** Official Host entry holding the subagent model authorization; read only. */
export const SUBAGENT_MODEL_SELECTION_ENTRY_ID = 'subagent-model-selection-settings'

/** One exact provider/model route. */
export interface ModelRoute {
  provider: string
  model: string
}

/** Editable note for one exact route. */
export interface ModelNote extends ModelRoute {
  capability: string
  scenario: string
}

/** Fields this panel reads and writes in its own entry. */
export interface ModelNotesSettings {
  /** Saved notes, including notes of routes not currently authorized. */
  modelNotes: ModelNote[]
}

/** Fields this panel reads from the official authorization entry. */
export interface SubagentModelSelectionSettings {
  /** Whether new Sessions receive explicit subagent model selection. */
  enabled: boolean
  /** Exact routes new Sessions may select. */
  allowedModels: ModelRoute[]
}

/** One authorized route with its draft note. */
export interface ModelNoteRow extends ModelNote {
  /** Stable opaque identity used only for lookup and as the React key. */
  key: string
}

/** State rendered by the notes panel. */
export interface ModelNotesState extends SettingsFormShell {
  /** Whether the official authorization entry is served and read. */
  selectionAvailable: boolean
  /** Saved authorized routes with their draft notes, in authorization order. */
  rows: readonly ModelNoteRow[]
  /** Whether a newer Host revision invalidated the current draft. */
  conflicted: boolean
}

/** Registration-side face for the notes panel. */
export interface ModelNotesFace {
  hooks: {
    /** Panel snapshot bound by the renderer as useModelNotes. */
    modelNotes: SnapshotStore<ModelNotesState>
  }
  /** Stage one note field of an authorized route. */
  setModelNote: (key: string, field: 'capability' | 'scenario', value: string) => void
  /** Persist every note as one revision-fenced mutation. */
  save: () => void
  /** Drop the staged notes. */
  discard: () => void
}

/**
 * Stable identity for one exact route; callers resolve it by lookup and never parse it.
 * @param route - provider/model route to identify.
 * @returns opaque key for lookup within the panel.
 */
export function modelNoteKey(route: ModelRoute): string {
  return `${route.provider}\0${route.model}`
}

/** Drop notes without text so clearing both fields equals never writing them. */
function meaningful(notes: Iterable<ModelNote>): ModelNote[] {
  return [...notes]
    .filter(note => note.capability !== '' || note.scenario !== '')
    .map(note => ({ provider: note.provider, model: note.model, capability: note.capability, scenario: note.scenario }))
}

/** Compare note lists as sets keyed by route. */
function sameNotes(left: readonly ModelNote[], right: readonly ModelNote[]): boolean {
  if (left.length !== right.length) return false
  const notes = new Map(left.map(note => [modelNoteKey(note), note]))
  return right.every((note) => {
    const other = notes.get(modelNoteKey(note))
    return other !== undefined && other.capability === note.capability && other.scenario === note.scenario
  })
}

/** Bridges this plugin's entry and the official authorization entry onto a staged panel. */
export class ModelNotesController {
  private draftNotes: Map<string, ModelNote> | undefined
  private draftRevision: number | undefined
  private saving = false
  private failed = false
  private outcomeUnknown = false
  private conflicted = false
  private disposed = false
  private saveGeneration = 0
  private readonly store: SnapshotStore<ModelNotesState>
  private readonly unsubscribe: () => void

  /**
   * @param scope - bound `team-model-routing-settings` configuration form.
   * @param selection - bound official `subagent-model-selection-settings` form, read only.
   */
  constructor(
    private readonly scope: SettingsFormScope<ModelNotesSettings>,
    private readonly selection: SettingsFormScope<SubagentModelSelectionSettings>,
  ) {
    this.store = createSnapshotStore(this.projection())
    const offScope = scope.subscribe(() => { this.onScopeChange() })
    const offSelection = selection.subscribe(() => { this.publish() })
    this.unsubscribe = () => { offScope(); offSelection() }
  }

  /** Stop observing settings and suppress late write settlements. */
  dispose(): void {
    this.disposed = true
    this.saveGeneration += 1
    this.unsubscribe()
  }

  /**
   * Build the renderer face for this panel.
   * @returns the snapshot and staged panel actions injected into the renderer.
   */
  inject(): ModelNotesFace {
    return {
      hooks: { modelNotes: this.store },
      setModelNote: (key, field, value) => { this.setModelNote(key, field, value) },
      save: () => { void this.save() },
      discard: () => { this.discard() },
    }
  }

  /** Drop the draft and any pending save after the connection to the Host was replaced. */
  resetConnection(): void {
    if (this.disposed) return
    this.saveGeneration += 1
    this.saving = false
    this.clearDraft()
    this.publish()
  }

  /** Re-derive the draft against a Host revision the mirror just published. */
  private onScopeChange(): void {
    if (this.disposed) return
    if (!this.saving && this.draftNotes !== undefined && this.scope.getSnapshot().revision !== this.draftRevision) {
      if (sameNotes(this.currentNotes(), this.desiredNotes())) this.clearDraft()
      else this.conflicted = true
    }
    this.publish()
  }

  private currentNotes(): ModelNote[] {
    return meaningful(this.scope.getSnapshot().value?.modelNotes ?? [])
  }

  private desiredNotes(): ModelNote[] {
    return this.draftNotes === undefined ? this.currentNotes() : meaningful(this.draftNotes.values())
  }

  /** Routes the official entry saved as authorized; empty while selection is off or unserved. */
  private authorizedRoutes(): ModelRoute[] {
    const snapshot = this.selection.getSnapshot()
    if (snapshot.status !== 'ready' || snapshot.value?.enabled !== true) return []
    return snapshot.value.allowedModels.map(route => ({ provider: route.provider, model: route.model }))
  }

  private writable(): boolean {
    const snapshot = this.scope.getSnapshot()
    return !this.disposed && snapshot.status === 'ready' && snapshot.writable && !this.saving
  }

  private setModelNote(key: string, field: 'capability' | 'scenario', value: string): void {
    if (!this.writable()) return
    const route = this.authorizedRoutes().find(candidate => modelNoteKey(candidate) === key)
    if (route === undefined) return
    if (this.draftNotes === undefined) {
      this.draftNotes = new Map(this.currentNotes().map(note => [modelNoteKey(note), note]))
      this.draftRevision = this.scope.getSnapshot().revision
    }
    const note = this.draftNotes.get(key) ?? { ...route, capability: '', scenario: '' }
    this.draftNotes.set(key, { ...note, [field]: value })
    if (!this.outcomeUnknown) this.failed = false
    this.publish()
  }

  private clearDraft(): void {
    this.draftNotes = undefined
    this.draftRevision = undefined
    this.failed = false
    this.outcomeUnknown = false
    this.conflicted = false
  }

  private discard(): void {
    if (this.saving) return
    this.clearDraft()
    this.publish()
  }

  private async save(): Promise<void> {
    const snapshot = this.scope.getSnapshot()
    const notes = this.desiredNotes()
    if (this.disposed || snapshot.status !== 'ready' || !snapshot.writable || this.saving) return
    if (sameNotes(this.currentNotes(), notes)) return
    // An untouched form has no draft and returned above; the fence is the
    // revision the draft started from, so a stale draft never overwrites a newer value.
    const fence = this.draftRevision
    if (fence === undefined) return
    if (snapshot.revision !== fence) {
      this.conflicted = true
      this.publish()
      return
    }
    const generation = this.saveGeneration
    this.saving = true
    this.failed = false
    this.conflicted = false
    this.publish()
    let accepted: boolean
    try {
      accepted = await this.scope.mutate([{ op: 'set', path: ['modelNotes'], value: notes }], fence)
    } catch (error: unknown) {
      // The write may have landed although its response was lost; keep the draft and report an unknown outcome.
      if (generation !== this.saveGeneration || this.disposed) return
      this.saving = false
      this.failed = true
      this.outcomeUnknown = true
      this.conflicted = this.scope.getSnapshot().revision !== fence
      this.publish()
      return
    }
    if (generation !== this.saveGeneration || this.disposed) return
    const landed = accepted && sameNotes(this.currentNotes(), notes)
    this.saving = false
    this.failed = !landed
    if (landed) this.clearDraft()
    this.onScopeChange()
  }

  private projection(): ModelNotesState {
    const snapshot = this.scope.getSnapshot()
    const drafted = this.draftNotes ?? new Map(this.currentNotes().map(note => [modelNoteKey(note), note]))
    const rows = this.authorizedRoutes().map((route): ModelNoteRow => {
      const key = modelNoteKey(route)
      const note = drafted.get(key)
      return { ...route, key, capability: note?.capability ?? '', scenario: note?.scenario ?? '' }
    })
    return {
      available: snapshot.status === 'ready',
      writable: snapshot.writable,
      dirty: !sameNotes(this.currentNotes(), this.desiredNotes()),
      invalid: false,
      saving: this.saving,
      failed: this.failed,
      selectionAvailable: this.selection.getSnapshot().status === 'ready',
      rows,
      conflicted: this.conflicted,
    }
  }

  private publish(): void {
    this.store.set(this.projection())
  }
}
