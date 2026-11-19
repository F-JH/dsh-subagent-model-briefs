window.__ModuleLoader__.load({ id: "dsh-subagent-model-briefs", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
/* dsh-subagent-model-briefs v0.1.0 — DSH client bundle (lazy-CJS factory) */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  NS: () => NS,
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/ModelNotesSection.tsx
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/locales.ts
var en = {
  unavailable: "This plugin is not loaded, so it cannot be configured right now.",
  readOnly: "This deployment stores settings read-only.",
  save: "Save",
  saving: "Saving\u2026",
  saveFailed: "The save could not be confirmed and may have been applied. Your draft is retained; check the current settings before trying again.",
  sectionTitle: "Model notes",
  sectionHint: "Describe what each allowed model is good at and when to use it. Agents read these notes for reference when they choose a subagent model. Changes apply to new sessions only.",
  capability: "Capability",
  scenario: "Scenario",
  selectionUnavailable: "Subagent model selection is unavailable, so model notes cannot be edited right now.",
  selectionEmpty: "Turn on model selection above, check models, and save. Each saved model then gets its note fields here.",
  conflict: "These notes changed while you were editing. Your draft cannot be saved against the newer values. Leave this page to discard the draft, check the current notes, then edit again."
};
var zh = {
  unavailable: "\u8BE5\u63D2\u4EF6\u5F53\u524D\u672A\u52A0\u8F7D\uFF0C\u6682\u65F6\u65E0\u6CD5\u914D\u7F6E\u3002",
  readOnly: "\u672C\u90E8\u7F72\u7684\u8BBE\u7F6E\u4E3A\u53EA\u8BFB\u3002",
  save: "\u4FDD\u5B58",
  saving: "\u4FDD\u5B58\u4E2D\u2026",
  saveFailed: "\u65E0\u6CD5\u786E\u8BA4\u4FDD\u5B58\u7ED3\u679C\uFF0C\u8BBE\u7F6E\u53EF\u80FD\u5DF2\u7ECF\u751F\u6548\u3002\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u5148\u6838\u5BF9\u5F53\u524D\u8BBE\u7F6E\u518D\u91CD\u8BD5\u3002",
  sectionTitle: "\u6A21\u578B\u8BF4\u660E",
  sectionHint: "\u4E3A\u6BCF\u4E2A\u5DF2\u6388\u6743\u7684\u6A21\u578B\u586B\u5199\u80FD\u529B\u8BF4\u660E\u548C\u9002\u7528\u573A\u666F\uFF0C\u4F9B\u667A\u80FD\u4F53\u9009\u62E9\u5B50\u4EE3\u7406\u6A21\u578B\u65F6\u53C2\u8003\u3002\u66F4\u6539\u4EC5\u5BF9\u65B0\u4F1A\u8BDD\u751F\u6548\u3002",
  capability: "\u80FD\u529B\u8BF4\u660E",
  scenario: "\u9002\u7528\u573A\u666F",
  selectionUnavailable: "\u5B50\u4EE3\u7406\u6A21\u578B\u9009\u62E9\u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u6682\u65F6\u65E0\u6CD5\u7F16\u8F91\u6A21\u578B\u8BF4\u660E",
  selectionEmpty: "\u5728\u4E0A\u65B9\u5F00\u542F\u6A21\u578B\u9009\u62E9\u3001\u52FE\u9009\u6A21\u578B\u5E76\u4FDD\u5B58\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E3A\u6BCF\u4E2A\u5DF2\u4FDD\u5B58\u7684\u6A21\u578B\u586B\u5199\u8BF4\u660E",
  conflict: "\u7F16\u8F91\u671F\u95F4\u8BF4\u660E\u5DF2\u53D1\u751F\u53D8\u5316\uFF0C\u65E0\u6CD5\u57FA\u4E8E\u8F83\u65B0\u7684\u503C\u4FDD\u5B58\u8349\u7A3F\u3002\u8BF7\u79BB\u5F00\u6B64\u9875\u9762\u653E\u5F03\u8349\u7A3F\uFF0C\u6838\u5BF9\u5F53\u524D\u8BF4\u660E\u540E\u91CD\u65B0\u7F16\u8F91\u3002"
};
function formLabels(t) {
  return {
    unavailable: t("unavailable"),
    readOnly: t("readOnly"),
    saveFailed: t("saveFailed"),
    save: t("save"),
    saving: t("saving")
  };
}

// dsh-css-module:src/client/ModelNotesSection.module.css
var ModelNotesSection_default = { "section": "section_1fcfc967", "intro": "intro_1fcfc967", "heading": "heading_1fcfc967", "hint": "hint_1fcfc967", "conflict": "conflict_1fcfc967", "notes": "notes_1fcfc967", "noteGroup": "noteGroup_1fcfc967", "noteField": "noteField_1fcfc967", "legend": "legend_1fcfc967", "textarea": "textarea_1fcfc967" };

// src/client/ModelNotesSection.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SUBAGENT_ITEM_ID = "subagent";
function ModelNotesSection(props) {
  const { subject } = props;
  if (subject.kind !== "item" || subject.id !== SUBAGENT_ITEM_ID) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelNotesPanel, { props });
}
function ModelNotesPanel({ props }) {
  const state = props.useModelNotes((snapshot) => snapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelNotesFields, { props, state });
}
function ModelNotesFields({ props, state }) {
  const { t } = props;
  const headingId = (0, import_react.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: ModelNotesSection_default.section, "aria-labelledby": headingId, "data-plugin-model-notes": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelNotesSection_default.intro, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: ModelNotesSection_default.heading, id: headingId, children: t("sectionTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: ModelNotesSection_default.hint, children: t("sectionHint") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_dsh_client_ui_primitives.SettingsForm, { labels: formLabels(t), state, onSave: props.save, onDiscard: props.discard, children: [
      !state.selectionAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: ModelNotesSection_default.hint, children: t("selectionUnavailable") }) : state.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: ModelNotesSection_default.hint, children: t("selectionEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelNotesSection_default.notes, children: state.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { className: ModelNotesSection_default.noteGroup, "data-model-note-row": true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { className: ModelNotesSection_default.legend, children: `${row.provider}/${row.model}` }),
        ["capability", "scenario"].map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: ModelNotesSection_default.noteField, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(field) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: ModelNotesSection_default.textarea,
              value: row[field],
              disabled: !state.writable || state.saving,
              onChange: (event) => {
                props.setModelNote(row.key, field, event.currentTarget.value);
              }
            }
          )
        ] }, field))
      ] }, row.key)) }),
      state.conflicted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: ModelNotesSection_default.conflict, role: "status", children: t("conflict") }) : null
    ] })
  ] });
}

// src/client/model-notes-controller.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
var MODEL_NOTES_ENTRY_ID = "team-model-routing-settings";
var SUBAGENT_MODEL_SELECTION_ENTRY_ID = "subagent-model-selection-settings";
function modelNoteKey(route) {
  return `${route.provider}\0${route.model}`;
}
function meaningful(notes) {
  return [...notes].filter((note) => note.capability !== "" || note.scenario !== "").map((note) => ({ provider: note.provider, model: note.model, capability: note.capability, scenario: note.scenario }));
}
function sameNotes(left, right) {
  if (left.length !== right.length) return false;
  const notes = new Map(left.map((note) => [modelNoteKey(note), note]));
  return right.every((note) => {
    const other = notes.get(modelNoteKey(note));
    return other !== void 0 && other.capability === note.capability && other.scenario === note.scenario;
  });
}
var ModelNotesController = class {
  /**
   * @param scope - bound `team-model-routing-settings` configuration form.
   * @param selection - bound official `subagent-model-selection-settings` form, read only.
   */
  constructor(scope, selection) {
    this.scope = scope;
    this.selection = selection;
    this.store = (0, import_dsh_client_store.createSnapshotStore)(this.projection());
    const offScope = scope.subscribe(() => {
      this.onScopeChange();
    });
    const offSelection = selection.subscribe(() => {
      this.publish();
    });
    this.unsubscribe = () => {
      offScope();
      offSelection();
    };
  }
  scope;
  selection;
  draftNotes;
  draftRevision;
  saving = false;
  failed = false;
  outcomeUnknown = false;
  conflicted = false;
  disposed = false;
  saveGeneration = 0;
  store;
  unsubscribe;
  /** Stop observing settings and suppress late write settlements. */
  dispose() {
    this.disposed = true;
    this.saveGeneration += 1;
    this.unsubscribe();
  }
  /**
   * Build the renderer face for this panel.
   * @returns the snapshot and staged panel actions injected into the renderer.
   */
  inject() {
    return {
      hooks: { modelNotes: this.store },
      setModelNote: (key, field, value) => {
        this.setModelNote(key, field, value);
      },
      save: () => {
        void this.save();
      },
      discard: () => {
        this.discard();
      }
    };
  }
  /** Drop the draft and any pending save after the connection to the Host was replaced. */
  resetConnection() {
    if (this.disposed) return;
    this.saveGeneration += 1;
    this.saving = false;
    this.clearDraft();
    this.publish();
  }
  /** Re-derive the draft against a Host revision the mirror just published. */
  onScopeChange() {
    if (this.disposed) return;
    if (!this.saving && this.draftNotes !== void 0 && this.scope.getSnapshot().revision !== this.draftRevision) {
      if (sameNotes(this.currentNotes(), this.desiredNotes())) this.clearDraft();
      else this.conflicted = true;
    }
    this.publish();
  }
  currentNotes() {
    return meaningful(this.scope.getSnapshot().value?.modelNotes ?? []);
  }
  desiredNotes() {
    return this.draftNotes === void 0 ? this.currentNotes() : meaningful(this.draftNotes.values());
  }
  /** Routes the official entry saved as authorized; empty while selection is off or unserved. */
  authorizedRoutes() {
    const snapshot = this.selection.getSnapshot();
    if (snapshot.status !== "ready" || snapshot.value?.enabled !== true) return [];
    return snapshot.value.allowedModels.map((route) => ({ provider: route.provider, model: route.model }));
  }
  writable() {
    const snapshot = this.scope.getSnapshot();
    return !this.disposed && snapshot.status === "ready" && snapshot.writable && !this.saving;
  }
  setModelNote(key, field, value) {
    if (!this.writable()) return;
    const route = this.authorizedRoutes().find((candidate) => modelNoteKey(candidate) === key);
    if (route === void 0) return;
    if (this.draftNotes === void 0) {
      this.draftNotes = new Map(this.currentNotes().map((note2) => [modelNoteKey(note2), note2]));
      this.draftRevision = this.scope.getSnapshot().revision;
    }
    const note = this.draftNotes.get(key) ?? { ...route, capability: "", scenario: "" };
    this.draftNotes.set(key, { ...note, [field]: value });
    if (!this.outcomeUnknown) this.failed = false;
    this.publish();
  }
  clearDraft() {
    this.draftNotes = void 0;
    this.draftRevision = void 0;
    this.failed = false;
    this.outcomeUnknown = false;
    this.conflicted = false;
  }
  discard() {
    if (this.saving) return;
    this.clearDraft();
    this.publish();
  }
  async save() {
    const snapshot = this.scope.getSnapshot();
    const notes = this.desiredNotes();
    if (this.disposed || snapshot.status !== "ready" || !snapshot.writable || this.saving) return;
    if (sameNotes(this.currentNotes(), notes)) return;
    const fence = this.draftRevision;
    if (fence === void 0) return;
    if (snapshot.revision !== fence) {
      this.conflicted = true;
      this.publish();
      return;
    }
    const generation = this.saveGeneration;
    this.saving = true;
    this.failed = false;
    this.conflicted = false;
    this.publish();
    let accepted;
    try {
      accepted = await this.scope.mutate([{ op: "set", path: ["modelNotes"], value: notes }], fence);
    } catch (error) {
      if (generation !== this.saveGeneration || this.disposed) return;
      this.saving = false;
      this.failed = true;
      this.outcomeUnknown = true;
      this.conflicted = this.scope.getSnapshot().revision !== fence;
      this.publish();
      return;
    }
    if (generation !== this.saveGeneration || this.disposed) return;
    const landed = accepted && sameNotes(this.currentNotes(), notes);
    this.saving = false;
    this.failed = !landed;
    if (landed) this.clearDraft();
    this.onScopeChange();
  }
  projection() {
    const snapshot = this.scope.getSnapshot();
    const drafted = this.draftNotes ?? new Map(this.currentNotes().map((note) => [modelNoteKey(note), note]));
    const rows = this.authorizedRoutes().map((route) => {
      const key = modelNoteKey(route);
      const note = drafted.get(key);
      return { ...route, key, capability: note?.capability ?? "", scenario: note?.scenario ?? "" };
    });
    return {
      available: snapshot.status === "ready",
      writable: snapshot.writable,
      dirty: !sameNotes(this.currentNotes(), this.desiredNotes()),
      invalid: false,
      saving: this.saving,
      failed: this.failed,
      selectionAvailable: this.selection.getSnapshot().status === "ready",
      rows,
      conflicted: this.conflicted
    };
  }
  publish() {
    this.store.set(this.projection());
  }
};

// src/client/index.ts
var NS = "teamModelRouting";
var inject = ["slots", "locale", "configForms"];
function apply(ctx) {
  const t = ctx.locale.bind(NS);
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-subagent-model-briefs: dictionaries");
  const notes = new ModelNotesController(
    ctx.configForms.get(MODEL_NOTES_ENTRY_ID),
    ctx.configForms.get(SUBAGENT_MODEL_SELECTION_ENTRY_ID)
  );
  ctx.effect(() => () => {
    notes.dispose();
  }, "dsh-subagent-model-briefs: form subscriptions");
  ctx.effect(
    () => ctx.on("connection/reset", () => {
      notes.resetConnection();
    }),
    "dsh-subagent-model-briefs: connection generation"
  );
  ctx.effect(() => ctx.configForms.whileServed([MODEL_NOTES_ENTRY_ID], () => ctx.slots.inject(
    "plugins.detail.section",
    () => ctx.slots.register({
      name: "plugins.detail.section",
      id: "team-model-routing",
      order: 20,
      label: () => t("sectionTitle"),
      locale: NS,
      inject: () => notes.inject()
    }, ModelNotesSection)
  )), "dsh-subagent-model-briefs: panel");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L01vZGVsTm90ZXNTZWN0aW9uLnRzeCIsICJzcmMvY2xpZW50L2xvY2FsZXMudHMiLCAiZHNoLWNzcy1tb2R1bGU6c3JjL2NsaWVudC9Nb2RlbE5vdGVzU2VjdGlvbi5tb2R1bGUuY3NzIiwgInNyYy9jbGllbnQvbW9kZWwtbm90ZXMtY29udHJvbGxlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBUaGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwsIGJyb3dzZXIgaGFsZi5cbiAqXG4gKiBUaGUgcGFuZWwgcmVnaXN0ZXJzIGludG8gdGhlIFBsdWdpbnMgcGFnZSdzIGBwbHVnaW5zLmRldGFpbC5zZWN0aW9uYCBzbG90XG4gKiBhbmQgcmVuZGVycyBvbmx5IG9uIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwYWdlIChgcGx1Z2lucy5pdGVtYCBpZFxuICogYHN1YmFnZW50YCksIGRpcmVjdGx5IGJlbG93IHRoYXQgcGFnZSdzIG1vZGVsIGF1dGhvcml6YXRpb24uIEl0IGVkaXRzXG4gKiBgbW9kZWxOb3Rlc2AgaW4gdGhpcyBwbHVnaW4ncyBIb3N0IGVudHJ5IHRocm91Z2ggdGhlIHNoYXJlZCBgY29uZmlnRm9ybXNgXG4gKiBzZXJ2aWNlIGFuZCByZWFkcyB0aGUgc2F2ZWQgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiB0aHJvdWdoIHRoZSBzYW1lXG4gKiBzZXJ2aWNlLCB3aXRob3V0IHdyaXRpbmcgaXQuXG4gKlxuICogVGhlIHJlZ2lzdHJhdGlvbiBsaXZlcyB3aXRoIHRoaXMgcGx1Z2luJ3MgZmliZXIsIHNvIHN3aXRjaGluZyB0aGUgcGx1Z2luXG4gKiBvZmYgcmVtb3ZlcyB0aGUgcGFuZWwgYWxvbmcgd2l0aCBldmVyeXRoaW5nIGVsc2UgaXQgY29udHJpYnV0ZWQuXG4gKi9cblxuLy8gVHlwZS1vbmx5OiBwdWxscyB0aGUgbG9jYWxlIHBsdWdpbidzIENvbnRleHQgbWVyZ2UgKGN0eC5sb2NhbGUpLlxuaW1wb3J0IHR5cGUge30gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtbG9jYWxlL2NsaWVudCdcbi8vIFR5cGUtb25seTogdGhlIGN0eC5jb25maWdGb3JtcyBDb250ZXh0IG1lcmdlLiBDcm9zcy1wbHVnaW4gY29sbGFib3JhdGlvblxuLy8gZ29lcyB0aHJvdWdoIHRoZSBzZXJ2aWNlLCBuZXZlciBhIHZhbHVlIGltcG9ydCAoY2xpZW50IGJ1bmRsZSBwdXJpdHkgZ2F0ZSkuXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zZXR0aW5ncy9jbGllbnQnXG4vLyBUeXBlLW9ubHk6IHRoZSBQbHVnaW5zIHBhZ2UncyBTbG90TWFwIG1lcmdlICh0aGUgJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nIGVudHJ5KS5cbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXBsdWdpbi1tYW5hZ2VyL2NsaWVudCdcbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXJlbmRlcmVyL2NsaWVudCdcbmltcG9ydCB0eXBlIHsgQ29udGV4dCBhcyBDbGllbnRDb250ZXh0IH0gZnJvbSAnQGRlZXBzZWVrLWFpL2NvcmRpcydcbmltcG9ydCB7IE1vZGVsTm90ZXNTZWN0aW9uIH0gZnJvbSAnLi9Nb2RlbE5vdGVzU2VjdGlvbi50c3gnXG5pbXBvcnQge1xuICBNT0RFTF9OT1RFU19FTlRSWV9JRCwgTW9kZWxOb3Rlc0NvbnRyb2xsZXIsIFNVQkFHRU5UX01PREVMX1NFTEVDVElPTl9FTlRSWV9JRCxcbn0gZnJvbSAnLi9tb2RlbC1ub3Rlcy1jb250cm9sbGVyLnRzJ1xuaW1wb3J0IHR5cGUgeyBNb2RlbE5vdGVzU2V0dGluZ3MsIFN1YmFnZW50TW9kZWxTZWxlY3Rpb25TZXR0aW5ncyB9IGZyb20gJy4vbW9kZWwtbm90ZXMtY29udHJvbGxlci50cydcbmltcG9ydCB7IGVuLCB6aCwgdHlwZSBNb2RlbE5vdGVzTG9jYWxlS2V5IH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgfSBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLnRzeCdcbmV4cG9ydCB0eXBlIHtcbiAgTW9kZWxOb3RlLCBNb2RlbE5vdGVSb3csIE1vZGVsTm90ZXNGYWNlLCBNb2RlbE5vdGVzU2V0dGluZ3MsIE1vZGVsTm90ZXNTdGF0ZSwgTW9kZWxSb3V0ZSxcbiAgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzLFxufSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNMb2NhbGVLZXkgfSBmcm9tICcuL2xvY2FsZXMudHMnXG5cbmRlY2xhcmUgbW9kdWxlICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zbG90cycge1xuICBpbnRlcmZhY2UgTG9jYWxlTmFtZXNwYWNlTWFwIHtcbiAgICAvKiogU3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwgY29weS4gKi9cbiAgICAndGVhbU1vZGVsUm91dGluZyc6IE1vZGVsTm90ZXNMb2NhbGVLZXlcbiAgfVxufVxuXG4vKiogRGljdGlvbmFyeSBuYW1lc3BhY2Ugb3duZWQgYnkgdGhpcyBwbHVnaW4uICovXG5leHBvcnQgY29uc3QgTlMgPSAndGVhbU1vZGVsUm91dGluZydcblxuLyoqIFJlcXVpcmVkIHNlcnZpY2VzIChjb3JkaXMgZmliZXIgaW5qZWN0KS4gKi9cbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdjb25maWdGb3JtcyddXG5cbi8qKlxuICogTW91bnQgdGhlIG5vdGVzIHBhbmVsIG9uIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwYWdlLlxuICogQHBhcmFtIGN0eCAtIHRoZSBicm93c2VyIHBsdWdpbiBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBDbGllbnRDb250ZXh0KTogdm9pZCB7XG4gIGNvbnN0IHQgPSBjdHgubG9jYWxlLmJpbmQoTlMpXG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LmxvY2FsZS5yZWdpc3RlcihOUywgeyB6aCwgZW4gfSksICdkc2gtc3ViYWdlbnQtbW9kZWwtYnJpZWZzOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBub3RlcyA9IG5ldyBNb2RlbE5vdGVzQ29udHJvbGxlcihcbiAgICBjdHguY29uZmlnRm9ybXMuZ2V0PE1vZGVsTm90ZXNTZXR0aW5ncz4oTU9ERUxfTk9URVNfRU5UUllfSUQpLFxuICAgIGN0eC5jb25maWdGb3Jtcy5nZXQ8U3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzPihTVUJBR0VOVF9NT0RFTF9TRUxFQ1RJT05fRU5UUllfSUQpLFxuICApXG4gIGN0eC5lZmZlY3QoKCkgPT4gKCkgPT4geyBub3Rlcy5kaXNwb3NlKCkgfSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IGZvcm0gc3Vic2NyaXB0aW9ucycpXG4gIGN0eC5lZmZlY3QoXG4gICAgKCkgPT4gY3R4Lm9uKCdjb25uZWN0aW9uL3Jlc2V0JywgKCkgPT4geyBub3Rlcy5yZXNldENvbm5lY3Rpb24oKSB9KSxcbiAgICAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogY29ubmVjdGlvbiBnZW5lcmF0aW9uJyxcbiAgKVxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5jb25maWdGb3Jtcy53aGlsZVNlcnZlZChbTU9ERUxfTk9URVNfRU5UUllfSURdLCAoKSA9PiBjdHguc2xvdHMuaW5qZWN0KFxuICAgICdwbHVnaW5zLmRldGFpbC5zZWN0aW9uJyxcbiAgICAoKSA9PiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nLFxuICAgICAgaWQ6ICd0ZWFtLW1vZGVsLXJvdXRpbmcnLFxuICAgICAgb3JkZXI6IDIwLFxuICAgICAgbGFiZWw6ICgpID0+IHQoJ3NlY3Rpb25UaXRsZScpLFxuICAgICAgbG9jYWxlOiBOUyxcbiAgICAgIGluamVjdDogKCkgPT4gbm90ZXMuaW5qZWN0KCksXG4gICAgfSwgTW9kZWxOb3Rlc1NlY3Rpb24pLFxuICApKSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IHBhbmVsJylcbn1cbiIsICIvKipcbiAqIFRoZSBzdWJhZ2VudCBtb2RlbCBub3RlcyBwYW5lbCwgY29udHJpYnV0ZWQgdG8gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBsdWdpblxuICogcGFnZSBvbiB0aGUgUGx1Z2lucyBwYWdlLCBiZWxvdyB0aGF0IHBhZ2UncyBtb2RlbCBhdXRob3JpemF0aW9uLlxuICovXG5cbmltcG9ydCB7IHVzZUlkIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgdHlwZSB7IEluamVjdEZhY2UsIFByb3BzTG9jYWxlLCBQcm9wc1J1bnRpbWUgfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zbG90cydcbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXBsdWdpbi1tYW5hZ2VyL2NsaWVudCdcbmltcG9ydCB7IFNldHRpbmdzRm9ybSB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXG5pbXBvcnQgeyBmb3JtTGFiZWxzIH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuaW1wb3J0IHR5cGUgeyBNb2RlbE5vdGVzRmFjZSwgTW9kZWxOb3Rlc1N0YXRlIH0gZnJvbSAnLi9tb2RlbC1ub3Rlcy1jb250cm9sbGVyLnRzJ1xuaW1wb3J0IGNzcyBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLm1vZHVsZS5jc3MnXG5cbi8qKiBgcGx1Z2lucy5pdGVtYCBpZCBvZiB0aGUgb2ZmaWNpYWwgU3ViYWdlbnQgc2V0dGluZ3MgcGFnZSB0aGlzIHBhbmVsIGpvaW5zLiAqL1xuZXhwb3J0IGNvbnN0IFNVQkFHRU5UX0lURU1fSUQgPSAnc3ViYWdlbnQnXG5cbi8qKiBGcmFtZXdvcmstZGVyaXZlZCBwcm9wczogdGhlIGRldGFpbCBwYWdlJ3Mgc3ViamVjdCwgdGhpcyBwbHVnaW4ncyBkaWN0aW9uYXJ5LCBhbmQgaXRzIHN0YWdlZCBhY3Rpb25zLiAqL1xuZXhwb3J0IHR5cGUgTW9kZWxOb3Rlc1NlY3Rpb25Qcm9wcyA9IFByb3BzUnVudGltZTwncGx1Z2lucy5kZXRhaWwuc2VjdGlvbic+XG4gICYgUHJvcHNMb2NhbGU8J3RlYW1Nb2RlbFJvdXRpbmcnPlxuICAmIEluamVjdEZhY2U8TW9kZWxOb3Rlc0ZhY2U+XG5cbi8qKlxuICogUmVuZGVyIHRoZSBub3RlcyBwYW5lbCBvbiB0aGUgb2ZmaWNpYWwgU3ViYWdlbnQgcGFnZSwgb3Igbm90aGluZyBmb3IgYW55IG90aGVyIHBhZ2UuXG4gKiBAcGFyYW0gcHJvcHMgLSB0aGUgcGFnZSBzdWJqZWN0LCBsb2NhbGUgY29weSwgdGhlIHN0YWdlZCBwYW5lbCBzbmFwc2hvdCwgYW5kIGl0cyBhY3Rpb25zLlxuICogQHJldHVybnMgdGhlIHN0YWdlZCBub3RlcyBmb3JtLCBvciBudWxsIG9uIGFueSBvdGhlciBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTW9kZWxOb3Rlc1NlY3Rpb24ocHJvcHM6IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMpIHtcbiAgY29uc3QgeyBzdWJqZWN0IH0gPSBwcm9wc1xuICBpZiAoc3ViamVjdC5raW5kICE9PSAnaXRlbScgfHwgc3ViamVjdC5pZCAhPT0gU1VCQUdFTlRfSVRFTV9JRCkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIDxNb2RlbE5vdGVzUGFuZWwgcHJvcHM9e3Byb3BzfSAvPlxufVxuXG4vKiogU3Vic2NyaWJlIG9ubHkgd2hpbGUgdGhlIFN1YmFnZW50IHBhZ2UgaXMgcmVuZGVyZWQuICovXG5mdW5jdGlvbiBNb2RlbE5vdGVzUGFuZWwoeyBwcm9wcyB9OiB7IHJlYWRvbmx5IHByb3BzOiBNb2RlbE5vdGVzU2VjdGlvblByb3BzIH0pIHtcbiAgY29uc3Qgc3RhdGUgPSBwcm9wcy51c2VNb2RlbE5vdGVzKHNuYXBzaG90ID0+IHNuYXBzaG90KVxuICByZXR1cm4gPE1vZGVsTm90ZXNGaWVsZHMgcHJvcHM9e3Byb3BzfSBzdGF0ZT17c3RhdGV9IC8+XG59XG5cbi8qKiBIZWFkaW5nLCBoaW50LCBvbmUgZmllbGRzZXQgcGVyIHNhdmVkIGF1dGhvcml6ZWQgbW9kZWwsIGFuZCB0aGUgZm9ybSdzIHNhdmUuICovXG5mdW5jdGlvbiBNb2RlbE5vdGVzRmllbGRzKHsgcHJvcHMsIHN0YXRlIH06IHtcbiAgcmVhZG9ubHkgcHJvcHM6IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHNcbiAgcmVhZG9ubHkgc3RhdGU6IE1vZGVsTm90ZXNTdGF0ZVxufSkge1xuICBjb25zdCB7IHQgfSA9IHByb3BzXG4gIGNvbnN0IGhlYWRpbmdJZCA9IHVzZUlkKClcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9e2Nzcy5zZWN0aW9ufSBhcmlhLWxhYmVsbGVkYnk9e2hlYWRpbmdJZH0gZGF0YS1wbHVnaW4tbW9kZWwtbm90ZXM+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmludHJvfT5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT17Y3NzLmhlYWRpbmd9IGlkPXtoZWFkaW5nSWR9Pnt0KCdzZWN0aW9uVGl0bGUnKX08L2gzPlxuICAgICAgICA8cCBjbGFzc05hbWU9e2Nzcy5oaW50fT57dCgnc2VjdGlvbkhpbnQnKX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxTZXR0aW5nc0Zvcm0gbGFiZWxzPXtmb3JtTGFiZWxzKHQpfSBzdGF0ZT17c3RhdGV9IG9uU2F2ZT17cHJvcHMuc2F2ZX0gb25EaXNjYXJkPXtwcm9wcy5kaXNjYXJkfT5cbiAgICAgICAgeyFzdGF0ZS5zZWxlY3Rpb25BdmFpbGFibGVcbiAgICAgICAgICA/IDxwIGNsYXNzTmFtZT17Y3NzLmhpbnR9Pnt0KCdzZWxlY3Rpb25VbmF2YWlsYWJsZScpfTwvcD5cbiAgICAgICAgICA6IHN0YXRlLnJvd3MubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT17Y3NzLmhpbnR9Pnt0KCdzZWxlY3Rpb25FbXB0eScpfTwvcD5cbiAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLm5vdGVzfT5cbiAgICAgICAgICAgICAgICB7c3RhdGUucm93cy5tYXAocm93ID0+IChcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBrZXk9e3Jvdy5rZXl9IGNsYXNzTmFtZT17Y3NzLm5vdGVHcm91cH0gZGF0YS1tb2RlbC1ub3RlLXJvdz5cbiAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9e2Nzcy5sZWdlbmR9PntgJHtyb3cucHJvdmlkZXJ9LyR7cm93Lm1vZGVsfWB9PC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgIHsoWydjYXBhYmlsaXR5JywgJ3NjZW5hcmlvJ10gYXMgY29uc3QpLm1hcChmaWVsZCA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGtleT17ZmllbGR9IGNsYXNzTmFtZT17Y3NzLm5vdGVGaWVsZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dChmaWVsZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3NzLnRleHRhcmVhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cm93W2ZpZWxkXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFzdGF0ZS53cml0YWJsZSB8fCBzdGF0ZS5zYXZpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHsgcHJvcHMuc2V0TW9kZWxOb3RlKHJvdy5rZXksIGZpZWxkLCBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAge3N0YXRlLmNvbmZsaWN0ZWQgPyA8cCBjbGFzc05hbWU9e2Nzcy5jb25mbGljdH0gcm9sZT1cInN0YXR1c1wiPnt0KCdjb25mbGljdCcpfTwvcD4gOiBudWxsfVxuICAgICAgPC9TZXR0aW5nc0Zvcm0+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG4iLCAiLyoqIExvY2FsZSBidW5kbGVzIGZvciB0aGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwuICovXG5cbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NGb3JtTGFiZWxzIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktcHJpbWl0aXZlcydcbi8vIFR5cGUtb25seTogdGhlIG5zIFx1MjE5MiBrZXkgdW5pb24gbWVyZ2UuIGByZWdpc3RlcihOUywgeyB6aCwgZW4gfSlgIGNoZWNrcyBib3RoXG4vLyBkaWN0aW9uYXJpZXMgYWdhaW5zdCBpdCwgc28gYSBrZXkgbWlzc2luZyBmcm9tIGVpdGhlciBpcyBhIGNvbXBpbGUgZXJyb3IuXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zbG90cydcblxuLyoqIExvY2FsZSBrZXlzIHRoZSBwYW5lbCByZW5kZXJzLiAqL1xuZXhwb3J0IHR5cGUgTW9kZWxOb3Rlc0xvY2FsZUtleSA9XG4gIHwgJ3VuYXZhaWxhYmxlJyB8ICdyZWFkT25seScgfCAnc2F2ZScgfCAnc2F2aW5nJyB8ICdzYXZlRmFpbGVkJ1xuICB8ICdzZWN0aW9uVGl0bGUnIHwgJ3NlY3Rpb25IaW50JyB8ICdjYXBhYmlsaXR5JyB8ICdzY2VuYXJpbydcbiAgfCAnc2VsZWN0aW9uVW5hdmFpbGFibGUnIHwgJ3NlbGVjdGlvbkVtcHR5JyB8ICdjb25mbGljdCdcblxuLyoqIEVuZ2xpc2ggY29weS4gKi9cbmV4cG9ydCBjb25zdCBlbjogUmVjb3JkPE1vZGVsTm90ZXNMb2NhbGVLZXksIHN0cmluZz4gPSB7XG4gIHVuYXZhaWxhYmxlOiAnVGhpcyBwbHVnaW4gaXMgbm90IGxvYWRlZCwgc28gaXQgY2Fubm90IGJlIGNvbmZpZ3VyZWQgcmlnaHQgbm93LicsXG4gIHJlYWRPbmx5OiAnVGhpcyBkZXBsb3ltZW50IHN0b3JlcyBzZXR0aW5ncyByZWFkLW9ubHkuJyxcbiAgc2F2ZTogJ1NhdmUnLFxuICBzYXZpbmc6ICdTYXZpbmdcdTIwMjYnLFxuICBzYXZlRmFpbGVkOiAnVGhlIHNhdmUgY291bGQgbm90IGJlIGNvbmZpcm1lZCBhbmQgbWF5IGhhdmUgYmVlbiBhcHBsaWVkLiBZb3VyIGRyYWZ0IGlzIHJldGFpbmVkOyBjaGVjayB0aGUgY3VycmVudCBzZXR0aW5ncyBiZWZvcmUgdHJ5aW5nIGFnYWluLicsXG4gIHNlY3Rpb25UaXRsZTogJ01vZGVsIG5vdGVzJyxcbiAgc2VjdGlvbkhpbnQ6ICdEZXNjcmliZSB3aGF0IGVhY2ggYWxsb3dlZCBtb2RlbCBpcyBnb29kIGF0IGFuZCB3aGVuIHRvIHVzZSBpdC4gQWdlbnRzIHJlYWQgdGhlc2Ugbm90ZXMgZm9yIHJlZmVyZW5jZSB3aGVuIHRoZXkgY2hvb3NlIGEgc3ViYWdlbnQgbW9kZWwuIENoYW5nZXMgYXBwbHkgdG8gbmV3IHNlc3Npb25zIG9ubHkuJyxcbiAgY2FwYWJpbGl0eTogJ0NhcGFiaWxpdHknLFxuICBzY2VuYXJpbzogJ1NjZW5hcmlvJyxcbiAgc2VsZWN0aW9uVW5hdmFpbGFibGU6ICdTdWJhZ2VudCBtb2RlbCBzZWxlY3Rpb24gaXMgdW5hdmFpbGFibGUsIHNvIG1vZGVsIG5vdGVzIGNhbm5vdCBiZSBlZGl0ZWQgcmlnaHQgbm93LicsXG4gIHNlbGVjdGlvbkVtcHR5OiAnVHVybiBvbiBtb2RlbCBzZWxlY3Rpb24gYWJvdmUsIGNoZWNrIG1vZGVscywgYW5kIHNhdmUuIEVhY2ggc2F2ZWQgbW9kZWwgdGhlbiBnZXRzIGl0cyBub3RlIGZpZWxkcyBoZXJlLicsXG4gIGNvbmZsaWN0OiAnVGhlc2Ugbm90ZXMgY2hhbmdlZCB3aGlsZSB5b3Ugd2VyZSBlZGl0aW5nLiBZb3VyIGRyYWZ0IGNhbm5vdCBiZSBzYXZlZCBhZ2FpbnN0IHRoZSBuZXdlciB2YWx1ZXMuIExlYXZlIHRoaXMgcGFnZSB0byBkaXNjYXJkIHRoZSBkcmFmdCwgY2hlY2sgdGhlIGN1cnJlbnQgbm90ZXMsIHRoZW4gZWRpdCBhZ2Fpbi4nLFxufVxuXG4vKiogU2ltcGxpZmllZCBDaGluZXNlIGNvcHkuICovXG5leHBvcnQgY29uc3Qgemg6IFJlY29yZDxNb2RlbE5vdGVzTG9jYWxlS2V5LCBzdHJpbmc+ID0ge1xuICB1bmF2YWlsYWJsZTogJ1x1OEJFNVx1NjNEMlx1NEVGNlx1NUY1M1x1NTI0RFx1NjcyQVx1NTJBMFx1OEY3RFx1RkYwQ1x1NjY4Mlx1NjVGNlx1NjVFMFx1NkNENVx1OTE0RFx1N0Y2RVx1MzAwMicsXG4gIHJlYWRPbmx5OiAnXHU2NzJDXHU5MEU4XHU3RjcyXHU3Njg0XHU4QkJFXHU3RjZFXHU0RTNBXHU1M0VBXHU4QkZCXHUzMDAyJyxcbiAgc2F2ZTogJ1x1NEZERFx1NUI1OCcsXG4gIHNhdmluZzogJ1x1NEZERFx1NUI1OFx1NEUyRFx1MjAyNicsXG4gIHNhdmVGYWlsZWQ6ICdcdTY1RTBcdTZDRDVcdTc4NkVcdThCQTRcdTRGRERcdTVCNThcdTdFRDNcdTY3OUNcdUZGMENcdThCQkVcdTdGNkVcdTUzRUZcdTgwRkRcdTVERjJcdTdFQ0ZcdTc1MUZcdTY1NDhcdTMwMDJcdTgzNDlcdTdBM0ZcdTVERjJcdTRGRERcdTc1NTlcdUZGMUJcdThCRjdcdTUxNDhcdTY4MzhcdTVCRjlcdTVGNTNcdTUyNERcdThCQkVcdTdGNkVcdTUxOERcdTkxQ0RcdThCRDVcdTMwMDInLFxuICBzZWN0aW9uVGl0bGU6ICdcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEUnLFxuICBzZWN0aW9uSGludDogJ1x1NEUzQVx1NkJDRlx1NEUyQVx1NURGMlx1NjM4OFx1Njc0M1x1NzY4NFx1NkEyMVx1NTc4Qlx1NTg2Qlx1NTE5OVx1ODBGRFx1NTI5Qlx1OEJGNFx1NjYwRVx1NTQ4Q1x1OTAwMlx1NzUyOFx1NTczQVx1NjY2Rlx1RkYwQ1x1NEY5Qlx1NjY3QVx1ODBGRFx1NEY1M1x1OTAwOVx1NjJFOVx1NUI1MFx1NEVFM1x1NzQwNlx1NkEyMVx1NTc4Qlx1NjVGNlx1NTNDMlx1ODAwM1x1MzAwMlx1NjZGNFx1NjUzOVx1NEVDNVx1NUJGOVx1NjVCMFx1NEYxQVx1OEJERFx1NzUxRlx1NjU0OFx1MzAwMicsXG4gIGNhcGFiaWxpdHk6ICdcdTgwRkRcdTUyOUJcdThCRjRcdTY2MEUnLFxuICBzY2VuYXJpbzogJ1x1OTAwMlx1NzUyOFx1NTczQVx1NjY2RicsXG4gIHNlbGVjdGlvblVuYXZhaWxhYmxlOiAnXHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU5MDA5XHU2MkU5XHU1RjUzXHU1MjREXHU0RTBEXHU1M0VGXHU3NTI4XHVGRjBDXHU2NjgyXHU2NUY2XHU2NUUwXHU2Q0Q1XHU3RjE2XHU4RjkxXHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFJyxcbiAgc2VsZWN0aW9uRW1wdHk6ICdcdTU3MjhcdTRFMEFcdTY1QjlcdTVGMDBcdTU0MkZcdTZBMjFcdTU3OEJcdTkwMDlcdTYyRTlcdTMwMDFcdTUyRkVcdTkwMDlcdTZBMjFcdTU3OEJcdTVFNzZcdTRGRERcdTVCNThcdTU0MEVcdUZGMENcdTUzRUZcdTU3MjhcdThGRDlcdTkxQ0NcdTRFM0FcdTZCQ0ZcdTRFMkFcdTVERjJcdTRGRERcdTVCNThcdTc2ODRcdTZBMjFcdTU3OEJcdTU4NkJcdTUxOTlcdThCRjRcdTY2MEUnLFxuICBjb25mbGljdDogJ1x1N0YxNlx1OEY5MVx1NjcxRlx1OTVGNFx1OEJGNFx1NjYwRVx1NURGMlx1NTNEMVx1NzUxRlx1NTNEOFx1NTMxNlx1RkYwQ1x1NjVFMFx1NkNENVx1NTdGQVx1NEU4RVx1OEY4M1x1NjVCMFx1NzY4NFx1NTAzQ1x1NEZERFx1NUI1OFx1ODM0OVx1N0EzRlx1MzAwMlx1OEJGN1x1NzlCQlx1NUYwMFx1NkI2NFx1OTg3NVx1OTc2Mlx1NjUzRVx1NUYwM1x1ODM0OVx1N0EzRlx1RkYwQ1x1NjgzOFx1NUJGOVx1NUY1M1x1NTI0RFx1OEJGNFx1NjYwRVx1NTQwRVx1OTFDRFx1NjVCMFx1N0YxNlx1OEY5MVx1MzAwMicsXG59XG5cbi8qKlxuICogVGhlIGZvcm0gZnJhbWUncyBjb3B5LCByZWFkIGZyb20gdGhpcyBwYW5lbCdzIGRpY3Rpb25hcnkuXG4gKiBAcGFyYW0gdCAtIHRoZSBwYW5lbCdzIGxvY2FsZSByZWFkZXIuXG4gKiBAcmV0dXJucyB0aGUgbGFiZWxzIHRoZSBzaGFyZWQgc2V0dGluZ3MgZm9ybSByZW5kZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybUxhYmVscyh0OiAoa2V5OiBNb2RlbE5vdGVzTG9jYWxlS2V5KSA9PiBzdHJpbmcpOiBTZXR0aW5nc0Zvcm1MYWJlbHMge1xuICByZXR1cm4ge1xuICAgIHVuYXZhaWxhYmxlOiB0KCd1bmF2YWlsYWJsZScpLFxuICAgIHJlYWRPbmx5OiB0KCdyZWFkT25seScpLFxuICAgIHNhdmVGYWlsZWQ6IHQoJ3NhdmVGYWlsZWQnKSxcbiAgICBzYXZlOiB0KCdzYXZlJyksXG4gICAgc2F2aW5nOiB0KCdzYXZpbmcnKSxcbiAgfVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IHtcInNlY3Rpb25cIjpcInNlY3Rpb25fMWZjZmM5NjdcIixcImludHJvXCI6XCJpbnRyb18xZmNmYzk2N1wiLFwiaGVhZGluZ1wiOlwiaGVhZGluZ18xZmNmYzk2N1wiLFwiaGludFwiOlwiaGludF8xZmNmYzk2N1wiLFwiY29uZmxpY3RcIjpcImNvbmZsaWN0XzFmY2ZjOTY3XCIsXCJub3Rlc1wiOlwibm90ZXNfMWZjZmM5NjdcIixcIm5vdGVHcm91cFwiOlwibm90ZUdyb3VwXzFmY2ZjOTY3XCIsXCJub3RlRmllbGRcIjpcIm5vdGVGaWVsZF8xZmNmYzk2N1wiLFwibGVnZW5kXCI6XCJsZWdlbmRfMWZjZmM5NjdcIixcInRleHRhcmVhXCI6XCJ0ZXh0YXJlYV8xZmNmYzk2N1wifTsiLCAiLyoqXG4gKiBTdGFnZWQgZWRpdG9yIGZvciBzdWJhZ2VudCBtb2RlbCBub3Rlcy5cbiAqXG4gKiBUaGUgcGFuZWwgZWRpdHMgYG1vZGVsTm90ZXNgIGluIHRoaXMgcGx1Z2luJ3MgSG9zdCBlbnRyeSBhbmQgcmVhZHMsIHdpdGhvdXRcbiAqIHdyaXRpbmcsIHRoZSByb3V0ZXMgdGhlIG9mZmljaWFsIHN1YmFnZW50IG1vZGVsIGF1dGhvcml6YXRpb24gc2F2ZWQuIEEgbm90ZVxuICogZmllbGQgaXMgb2ZmZXJlZCBmb3IgZXZlcnkgc2F2ZWQgYXV0aG9yaXplZCByb3V0ZTsgbm90ZXMgb2Ygb3RoZXIgcm91dGVzIHN0YXlcbiAqIGluIHRoZSBkcmFmdCBhbmQgaW4gZXZlcnkgc2F2ZSwgc28gYSByb3V0ZSB0aGUgdXNlciB1bmNoZWNrcyBhbmQgY2hlY2tzIGFnYWluXG4gKiBnZXRzIGl0cyBub3RlIGJhY2suXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlU25hcHNob3RTdG9yZSwgdHlwZSBTbmFwc2hvdFN0b3JlIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtc3RvcmUnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzRm9ybVNjb3BlLCBTZXR0aW5nc0Zvcm1TaGVsbCB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXG5cbi8qKiBIb3N0IGNvbmZpZ3VyYXRpb24gZW50cnkgaWQgdGhpcyBwYW5lbCBlZGl0cy4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9OT1RFU19FTlRSWV9JRCA9ICd0ZWFtLW1vZGVsLXJvdXRpbmctc2V0dGluZ3MnXG5cbi8qKiBPZmZpY2lhbCBIb3N0IGVudHJ5IGhvbGRpbmcgdGhlIHN1YmFnZW50IG1vZGVsIGF1dGhvcml6YXRpb247IHJlYWQgb25seS4gKi9cbmV4cG9ydCBjb25zdCBTVUJBR0VOVF9NT0RFTF9TRUxFQ1RJT05fRU5UUllfSUQgPSAnc3ViYWdlbnQtbW9kZWwtc2VsZWN0aW9uLXNldHRpbmdzJ1xuXG4vKiogT25lIGV4YWN0IHByb3ZpZGVyL21vZGVsIHJvdXRlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbFJvdXRlIHtcbiAgcHJvdmlkZXI6IHN0cmluZ1xuICBtb2RlbDogc3RyaW5nXG59XG5cbi8qKiBFZGl0YWJsZSBub3RlIGZvciBvbmUgZXhhY3Qgcm91dGUuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZSBleHRlbmRzIE1vZGVsUm91dGUge1xuICBjYXBhYmlsaXR5OiBzdHJpbmdcbiAgc2NlbmFyaW86IHN0cmluZ1xufVxuXG4vKiogRmllbGRzIHRoaXMgcGFuZWwgcmVhZHMgYW5kIHdyaXRlcyBpbiBpdHMgb3duIGVudHJ5LiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbE5vdGVzU2V0dGluZ3Mge1xuICAvKiogU2F2ZWQgbm90ZXMsIGluY2x1ZGluZyBub3RlcyBvZiByb3V0ZXMgbm90IGN1cnJlbnRseSBhdXRob3JpemVkLiAqL1xuICBtb2RlbE5vdGVzOiBNb2RlbE5vdGVbXVxufVxuXG4vKiogRmllbGRzIHRoaXMgcGFuZWwgcmVhZHMgZnJvbSB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzIHtcbiAgLyoqIFdoZXRoZXIgbmV3IFNlc3Npb25zIHJlY2VpdmUgZXhwbGljaXQgc3ViYWdlbnQgbW9kZWwgc2VsZWN0aW9uLiAqL1xuICBlbmFibGVkOiBib29sZWFuXG4gIC8qKiBFeGFjdCByb3V0ZXMgbmV3IFNlc3Npb25zIG1heSBzZWxlY3QuICovXG4gIGFsbG93ZWRNb2RlbHM6IE1vZGVsUm91dGVbXVxufVxuXG4vKiogT25lIGF1dGhvcml6ZWQgcm91dGUgd2l0aCBpdHMgZHJhZnQgbm90ZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxOb3RlUm93IGV4dGVuZHMgTW9kZWxOb3RlIHtcbiAgLyoqIFN0YWJsZSBvcGFxdWUgaWRlbnRpdHkgdXNlZCBvbmx5IGZvciBsb29rdXAgYW5kIGFzIHRoZSBSZWFjdCBrZXkuICovXG4gIGtleTogc3RyaW5nXG59XG5cbi8qKiBTdGF0ZSByZW5kZXJlZCBieSB0aGUgbm90ZXMgcGFuZWwuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNTdGF0ZSBleHRlbmRzIFNldHRpbmdzRm9ybVNoZWxsIHtcbiAgLyoqIFdoZXRoZXIgdGhlIG9mZmljaWFsIGF1dGhvcml6YXRpb24gZW50cnkgaXMgc2VydmVkIGFuZCByZWFkLiAqL1xuICBzZWxlY3Rpb25BdmFpbGFibGU6IGJvb2xlYW5cbiAgLyoqIFNhdmVkIGF1dGhvcml6ZWQgcm91dGVzIHdpdGggdGhlaXIgZHJhZnQgbm90ZXMsIGluIGF1dGhvcml6YXRpb24gb3JkZXIuICovXG4gIHJvd3M6IHJlYWRvbmx5IE1vZGVsTm90ZVJvd1tdXG4gIC8qKiBXaGV0aGVyIGEgbmV3ZXIgSG9zdCByZXZpc2lvbiBpbnZhbGlkYXRlZCB0aGUgY3VycmVudCBkcmFmdC4gKi9cbiAgY29uZmxpY3RlZDogYm9vbGVhblxufVxuXG4vKiogUmVnaXN0cmF0aW9uLXNpZGUgZmFjZSBmb3IgdGhlIG5vdGVzIHBhbmVsLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbE5vdGVzRmFjZSB7XG4gIGhvb2tzOiB7XG4gICAgLyoqIFBhbmVsIHNuYXBzaG90IGJvdW5kIGJ5IHRoZSByZW5kZXJlciBhcyB1c2VNb2RlbE5vdGVzLiAqL1xuICAgIG1vZGVsTm90ZXM6IFNuYXBzaG90U3RvcmU8TW9kZWxOb3Rlc1N0YXRlPlxuICB9XG4gIC8qKiBTdGFnZSBvbmUgbm90ZSBmaWVsZCBvZiBhbiBhdXRob3JpemVkIHJvdXRlLiAqL1xuICBzZXRNb2RlbE5vdGU6IChrZXk6IHN0cmluZywgZmllbGQ6ICdjYXBhYmlsaXR5JyB8ICdzY2VuYXJpbycsIHZhbHVlOiBzdHJpbmcpID0+IHZvaWRcbiAgLyoqIFBlcnNpc3QgZXZlcnkgbm90ZSBhcyBvbmUgcmV2aXNpb24tZmVuY2VkIG11dGF0aW9uLiAqL1xuICBzYXZlOiAoKSA9PiB2b2lkXG4gIC8qKiBEcm9wIHRoZSBzdGFnZWQgbm90ZXMuICovXG4gIGRpc2NhcmQ6ICgpID0+IHZvaWRcbn1cblxuLyoqXG4gKiBTdGFibGUgaWRlbnRpdHkgZm9yIG9uZSBleGFjdCByb3V0ZTsgY2FsbGVycyByZXNvbHZlIGl0IGJ5IGxvb2t1cCBhbmQgbmV2ZXIgcGFyc2UgaXQuXG4gKiBAcGFyYW0gcm91dGUgLSBwcm92aWRlci9tb2RlbCByb3V0ZSB0byBpZGVudGlmeS5cbiAqIEByZXR1cm5zIG9wYXF1ZSBrZXkgZm9yIGxvb2t1cCB3aXRoaW4gdGhlIHBhbmVsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kZWxOb3RlS2V5KHJvdXRlOiBNb2RlbFJvdXRlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3JvdXRlLnByb3ZpZGVyfVxcMCR7cm91dGUubW9kZWx9YFxufVxuXG4vKiogRHJvcCBub3RlcyB3aXRob3V0IHRleHQgc28gY2xlYXJpbmcgYm90aCBmaWVsZHMgZXF1YWxzIG5ldmVyIHdyaXRpbmcgdGhlbS4gKi9cbmZ1bmN0aW9uIG1lYW5pbmdmdWwobm90ZXM6IEl0ZXJhYmxlPE1vZGVsTm90ZT4pOiBNb2RlbE5vdGVbXSB7XG4gIHJldHVybiBbLi4ubm90ZXNdXG4gICAgLmZpbHRlcihub3RlID0+IG5vdGUuY2FwYWJpbGl0eSAhPT0gJycgfHwgbm90ZS5zY2VuYXJpbyAhPT0gJycpXG4gICAgLm1hcChub3RlID0+ICh7IHByb3ZpZGVyOiBub3RlLnByb3ZpZGVyLCBtb2RlbDogbm90ZS5tb2RlbCwgY2FwYWJpbGl0eTogbm90ZS5jYXBhYmlsaXR5LCBzY2VuYXJpbzogbm90ZS5zY2VuYXJpbyB9KSlcbn1cblxuLyoqIENvbXBhcmUgbm90ZSBsaXN0cyBhcyBzZXRzIGtleWVkIGJ5IHJvdXRlLiAqL1xuZnVuY3Rpb24gc2FtZU5vdGVzKGxlZnQ6IHJlYWRvbmx5IE1vZGVsTm90ZVtdLCByaWdodDogcmVhZG9ubHkgTW9kZWxOb3RlW10pOiBib29sZWFuIHtcbiAgaWYgKGxlZnQubGVuZ3RoICE9PSByaWdodC5sZW5ndGgpIHJldHVybiBmYWxzZVxuICBjb25zdCBub3RlcyA9IG5ldyBNYXAobGVmdC5tYXAobm90ZSA9PiBbbW9kZWxOb3RlS2V5KG5vdGUpLCBub3RlXSkpXG4gIHJldHVybiByaWdodC5ldmVyeSgobm90ZSkgPT4ge1xuICAgIGNvbnN0IG90aGVyID0gbm90ZXMuZ2V0KG1vZGVsTm90ZUtleShub3RlKSlcbiAgICByZXR1cm4gb3RoZXIgIT09IHVuZGVmaW5lZCAmJiBvdGhlci5jYXBhYmlsaXR5ID09PSBub3RlLmNhcGFiaWxpdHkgJiYgb3RoZXIuc2NlbmFyaW8gPT09IG5vdGUuc2NlbmFyaW9cbiAgfSlcbn1cblxuLyoqIEJyaWRnZXMgdGhpcyBwbHVnaW4ncyBlbnRyeSBhbmQgdGhlIG9mZmljaWFsIGF1dGhvcml6YXRpb24gZW50cnkgb250byBhIHN0YWdlZCBwYW5lbC4gKi9cbmV4cG9ydCBjbGFzcyBNb2RlbE5vdGVzQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZHJhZnROb3RlczogTWFwPHN0cmluZywgTW9kZWxOb3RlPiB8IHVuZGVmaW5lZFxuICBwcml2YXRlIGRyYWZ0UmV2aXNpb246IG51bWJlciB8IHVuZGVmaW5lZFxuICBwcml2YXRlIHNhdmluZyA9IGZhbHNlXG4gIHByaXZhdGUgZmFpbGVkID0gZmFsc2VcbiAgcHJpdmF0ZSBvdXRjb21lVW5rbm93biA9IGZhbHNlXG4gIHByaXZhdGUgY29uZmxpY3RlZCA9IGZhbHNlXG4gIHByaXZhdGUgZGlzcG9zZWQgPSBmYWxzZVxuICBwcml2YXRlIHNhdmVHZW5lcmF0aW9uID0gMFxuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JlOiBTbmFwc2hvdFN0b3JlPE1vZGVsTm90ZXNTdGF0ZT5cbiAgcHJpdmF0ZSByZWFkb25seSB1bnN1YnNjcmliZTogKCkgPT4gdm9pZFxuXG4gIC8qKlxuICAgKiBAcGFyYW0gc2NvcGUgLSBib3VuZCBgdGVhbS1tb2RlbC1yb3V0aW5nLXNldHRpbmdzYCBjb25maWd1cmF0aW9uIGZvcm0uXG4gICAqIEBwYXJhbSBzZWxlY3Rpb24gLSBib3VuZCBvZmZpY2lhbCBgc3ViYWdlbnQtbW9kZWwtc2VsZWN0aW9uLXNldHRpbmdzYCBmb3JtLCByZWFkIG9ubHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNjb3BlOiBTZXR0aW5nc0Zvcm1TY29wZTxNb2RlbE5vdGVzU2V0dGluZ3M+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZXR0aW5nc0Zvcm1TY29wZTxTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3M+LFxuICApIHtcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU25hcHNob3RTdG9yZSh0aGlzLnByb2plY3Rpb24oKSlcbiAgICBjb25zdCBvZmZTY29wZSA9IHNjb3BlLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMub25TY29wZUNoYW5nZSgpIH0pXG4gICAgY29uc3Qgb2ZmU2VsZWN0aW9uID0gc2VsZWN0aW9uLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMucHVibGlzaCgpIH0pXG4gICAgdGhpcy51bnN1YnNjcmliZSA9ICgpID0+IHsgb2ZmU2NvcGUoKTsgb2ZmU2VsZWN0aW9uKCkgfVxuICB9XG5cbiAgLyoqIFN0b3Agb2JzZXJ2aW5nIHNldHRpbmdzIGFuZCBzdXBwcmVzcyBsYXRlIHdyaXRlIHNldHRsZW1lbnRzLiAqL1xuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlXG4gICAgdGhpcy5zYXZlR2VuZXJhdGlvbiArPSAxXG4gICAgdGhpcy51bnN1YnNjcmliZSgpXG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgdGhlIHJlbmRlcmVyIGZhY2UgZm9yIHRoaXMgcGFuZWwuXG4gICAqIEByZXR1cm5zIHRoZSBzbmFwc2hvdCBhbmQgc3RhZ2VkIHBhbmVsIGFjdGlvbnMgaW5qZWN0ZWQgaW50byB0aGUgcmVuZGVyZXIuXG4gICAqL1xuICBpbmplY3QoKTogTW9kZWxOb3Rlc0ZhY2Uge1xuICAgIHJldHVybiB7XG4gICAgICBob29rczogeyBtb2RlbE5vdGVzOiB0aGlzLnN0b3JlIH0sXG4gICAgICBzZXRNb2RlbE5vdGU6IChrZXksIGZpZWxkLCB2YWx1ZSkgPT4geyB0aGlzLnNldE1vZGVsTm90ZShrZXksIGZpZWxkLCB2YWx1ZSkgfSxcbiAgICAgIHNhdmU6ICgpID0+IHsgdm9pZCB0aGlzLnNhdmUoKSB9LFxuICAgICAgZGlzY2FyZDogKCkgPT4geyB0aGlzLmRpc2NhcmQoKSB9LFxuICAgIH1cbiAgfVxuXG4gIC8qKiBEcm9wIHRoZSBkcmFmdCBhbmQgYW55IHBlbmRpbmcgc2F2ZSBhZnRlciB0aGUgY29ubmVjdGlvbiB0byB0aGUgSG9zdCB3YXMgcmVwbGFjZWQuICovXG4gIHJlc2V0Q29ubmVjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgdGhpcy5zYXZlR2VuZXJhdGlvbiArPSAxXG4gICAgdGhpcy5zYXZpbmcgPSBmYWxzZVxuICAgIHRoaXMuY2xlYXJEcmFmdCgpXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgfVxuXG4gIC8qKiBSZS1kZXJpdmUgdGhlIGRyYWZ0IGFnYWluc3QgYSBIb3N0IHJldmlzaW9uIHRoZSBtaXJyb3IganVzdCBwdWJsaXNoZWQuICovXG4gIHByaXZhdGUgb25TY29wZUNoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgaWYgKCF0aGlzLnNhdmluZyAmJiB0aGlzLmRyYWZ0Tm90ZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjb3BlLmdldFNuYXBzaG90KCkucmV2aXNpb24gIT09IHRoaXMuZHJhZnRSZXZpc2lvbikge1xuICAgICAgaWYgKHNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCB0aGlzLmRlc2lyZWROb3RlcygpKSkgdGhpcy5jbGVhckRyYWZ0KClcbiAgICAgIGVsc2UgdGhpcy5jb25mbGljdGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnB1Ymxpc2goKVxuICB9XG5cbiAgcHJpdmF0ZSBjdXJyZW50Tm90ZXMoKTogTW9kZWxOb3RlW10ge1xuICAgIHJldHVybiBtZWFuaW5nZnVsKHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS52YWx1ZT8ubW9kZWxOb3RlcyA/PyBbXSlcbiAgfVxuXG4gIHByaXZhdGUgZGVzaXJlZE5vdGVzKCk6IE1vZGVsTm90ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kcmFmdE5vdGVzID09PSB1bmRlZmluZWQgPyB0aGlzLmN1cnJlbnROb3RlcygpIDogbWVhbmluZ2Z1bCh0aGlzLmRyYWZ0Tm90ZXMudmFsdWVzKCkpXG4gIH1cblxuICAvKiogUm91dGVzIHRoZSBvZmZpY2lhbCBlbnRyeSBzYXZlZCBhcyBhdXRob3JpemVkOyBlbXB0eSB3aGlsZSBzZWxlY3Rpb24gaXMgb2ZmIG9yIHVuc2VydmVkLiAqL1xuICBwcml2YXRlIGF1dGhvcml6ZWRSb3V0ZXMoKTogTW9kZWxSb3V0ZVtdIHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuc2VsZWN0aW9uLmdldFNuYXBzaG90KClcbiAgICBpZiAoc25hcHNob3Quc3RhdHVzICE9PSAncmVhZHknIHx8IHNuYXBzaG90LnZhbHVlPy5lbmFibGVkICE9PSB0cnVlKSByZXR1cm4gW11cbiAgICByZXR1cm4gc25hcHNob3QudmFsdWUuYWxsb3dlZE1vZGVscy5tYXAocm91dGUgPT4gKHsgcHJvdmlkZXI6IHJvdXRlLnByb3ZpZGVyLCBtb2RlbDogcm91dGUubW9kZWwgfSkpXG4gIH1cblxuICBwcml2YXRlIHdyaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy5zY29wZS5nZXRTbmFwc2hvdCgpXG4gICAgcmV0dXJuICF0aGlzLmRpc3Bvc2VkICYmIHNuYXBzaG90LnN0YXR1cyA9PT0gJ3JlYWR5JyAmJiBzbmFwc2hvdC53cml0YWJsZSAmJiAhdGhpcy5zYXZpbmdcbiAgfVxuXG4gIHByaXZhdGUgc2V0TW9kZWxOb3RlKGtleTogc3RyaW5nLCBmaWVsZDogJ2NhcGFiaWxpdHknIHwgJ3NjZW5hcmlvJywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy53cml0YWJsZSgpKSByZXR1cm5cbiAgICBjb25zdCByb3V0ZSA9IHRoaXMuYXV0aG9yaXplZFJvdXRlcygpLmZpbmQoY2FuZGlkYXRlID0+IG1vZGVsTm90ZUtleShjYW5kaWRhdGUpID09PSBrZXkpXG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgIGlmICh0aGlzLmRyYWZ0Tm90ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmFmdE5vdGVzID0gbmV3IE1hcCh0aGlzLmN1cnJlbnROb3RlcygpLm1hcChub3RlID0+IFttb2RlbE5vdGVLZXkobm90ZSksIG5vdGVdKSlcbiAgICAgIHRoaXMuZHJhZnRSZXZpc2lvbiA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS5yZXZpc2lvblxuICAgIH1cbiAgICBjb25zdCBub3RlID0gdGhpcy5kcmFmdE5vdGVzLmdldChrZXkpID8/IHsgLi4ucm91dGUsIGNhcGFiaWxpdHk6ICcnLCBzY2VuYXJpbzogJycgfVxuICAgIHRoaXMuZHJhZnROb3Rlcy5zZXQoa2V5LCB7IC4uLm5vdGUsIFtmaWVsZF06IHZhbHVlIH0pXG4gICAgaWYgKCF0aGlzLm91dGNvbWVVbmtub3duKSB0aGlzLmZhaWxlZCA9IGZhbHNlXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJEcmFmdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWZ0Tm90ZXMgPSB1bmRlZmluZWRcbiAgICB0aGlzLmRyYWZ0UmV2aXNpb24gPSB1bmRlZmluZWRcbiAgICB0aGlzLmZhaWxlZCA9IGZhbHNlXG4gICAgdGhpcy5vdXRjb21lVW5rbm93biA9IGZhbHNlXG4gICAgdGhpcy5jb25mbGljdGVkID0gZmFsc2VcbiAgfVxuXG4gIHByaXZhdGUgZGlzY2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZpbmcpIHJldHVyblxuICAgIHRoaXMuY2xlYXJEcmFmdCgpXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKVxuICAgIGNvbnN0IG5vdGVzID0gdGhpcy5kZXNpcmVkTm90ZXMoKVxuICAgIGlmICh0aGlzLmRpc3Bvc2VkIHx8IHNuYXBzaG90LnN0YXR1cyAhPT0gJ3JlYWR5JyB8fCAhc25hcHNob3Qud3JpdGFibGUgfHwgdGhpcy5zYXZpbmcpIHJldHVyblxuICAgIGlmIChzYW1lTm90ZXModGhpcy5jdXJyZW50Tm90ZXMoKSwgbm90ZXMpKSByZXR1cm5cbiAgICAvLyBBbiB1bnRvdWNoZWQgZm9ybSBoYXMgbm8gZHJhZnQgYW5kIHJldHVybmVkIGFib3ZlOyB0aGUgZmVuY2UgaXMgdGhlXG4gICAgLy8gcmV2aXNpb24gdGhlIGRyYWZ0IHN0YXJ0ZWQgZnJvbSwgc28gYSBzdGFsZSBkcmFmdCBuZXZlciBvdmVyd3JpdGVzIGEgbmV3ZXIgdmFsdWUuXG4gICAgY29uc3QgZmVuY2UgPSB0aGlzLmRyYWZ0UmV2aXNpb25cbiAgICBpZiAoZmVuY2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgaWYgKHNuYXBzaG90LnJldmlzaW9uICE9PSBmZW5jZSkge1xuICAgICAgdGhpcy5jb25mbGljdGVkID0gdHJ1ZVxuICAgICAgdGhpcy5wdWJsaXNoKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBnZW5lcmF0aW9uID0gdGhpcy5zYXZlR2VuZXJhdGlvblxuICAgIHRoaXMuc2F2aW5nID0gdHJ1ZVxuICAgIHRoaXMuZmFpbGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbmZsaWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMucHVibGlzaCgpXG4gICAgbGV0IGFjY2VwdGVkOiBib29sZWFuXG4gICAgdHJ5IHtcbiAgICAgIGFjY2VwdGVkID0gYXdhaXQgdGhpcy5zY29wZS5tdXRhdGUoW3sgb3A6ICdzZXQnLCBwYXRoOiBbJ21vZGVsTm90ZXMnXSwgdmFsdWU6IG5vdGVzIH1dLCBmZW5jZSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgLy8gVGhlIHdyaXRlIG1heSBoYXZlIGxhbmRlZCBhbHRob3VnaCBpdHMgcmVzcG9uc2Ugd2FzIGxvc3Q7IGtlZXAgdGhlIGRyYWZ0IGFuZCByZXBvcnQgYW4gdW5rbm93biBvdXRjb21lLlxuICAgICAgaWYgKGdlbmVyYXRpb24gIT09IHRoaXMuc2F2ZUdlbmVyYXRpb24gfHwgdGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgICB0aGlzLnNhdmluZyA9IGZhbHNlXG4gICAgICB0aGlzLmZhaWxlZCA9IHRydWVcbiAgICAgIHRoaXMub3V0Y29tZVVua25vd24gPSB0cnVlXG4gICAgICB0aGlzLmNvbmZsaWN0ZWQgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KCkucmV2aXNpb24gIT09IGZlbmNlXG4gICAgICB0aGlzLnB1Ymxpc2goKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChnZW5lcmF0aW9uICE9PSB0aGlzLnNhdmVHZW5lcmF0aW9uIHx8IHRoaXMuZGlzcG9zZWQpIHJldHVyblxuICAgIGNvbnN0IGxhbmRlZCA9IGFjY2VwdGVkICYmIHNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCBub3RlcylcbiAgICB0aGlzLnNhdmluZyA9IGZhbHNlXG4gICAgdGhpcy5mYWlsZWQgPSAhbGFuZGVkXG4gICAgaWYgKGxhbmRlZCkgdGhpcy5jbGVhckRyYWZ0KClcbiAgICB0aGlzLm9uU2NvcGVDaGFuZ2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9qZWN0aW9uKCk6IE1vZGVsTm90ZXNTdGF0ZSB7XG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KClcbiAgICBjb25zdCBkcmFmdGVkID0gdGhpcy5kcmFmdE5vdGVzID8/IG5ldyBNYXAodGhpcy5jdXJyZW50Tm90ZXMoKS5tYXAobm90ZSA9PiBbbW9kZWxOb3RlS2V5KG5vdGUpLCBub3RlXSkpXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuYXV0aG9yaXplZFJvdXRlcygpLm1hcCgocm91dGUpOiBNb2RlbE5vdGVSb3cgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gbW9kZWxOb3RlS2V5KHJvdXRlKVxuICAgICAgY29uc3Qgbm90ZSA9IGRyYWZ0ZWQuZ2V0KGtleSlcbiAgICAgIHJldHVybiB7IC4uLnJvdXRlLCBrZXksIGNhcGFiaWxpdHk6IG5vdGU/LmNhcGFiaWxpdHkgPz8gJycsIHNjZW5hcmlvOiBub3RlPy5zY2VuYXJpbyA/PyAnJyB9XG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgYXZhaWxhYmxlOiBzbmFwc2hvdC5zdGF0dXMgPT09ICdyZWFkeScsXG4gICAgICB3cml0YWJsZTogc25hcHNob3Qud3JpdGFibGUsXG4gICAgICBkaXJ0eTogIXNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCB0aGlzLmRlc2lyZWROb3RlcygpKSxcbiAgICAgIGludmFsaWQ6IGZhbHNlLFxuICAgICAgc2F2aW5nOiB0aGlzLnNhdmluZyxcbiAgICAgIGZhaWxlZDogdGhpcy5mYWlsZWQsXG4gICAgICBzZWxlY3Rpb25BdmFpbGFibGU6IHRoaXMuc2VsZWN0aW9uLmdldFNuYXBzaG90KCkuc3RhdHVzID09PSAncmVhZHknLFxuICAgICAgcm93cyxcbiAgICAgIGNvbmZsaWN0ZWQ6IHRoaXMuY29uZmxpY3RlZCxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHB1Ymxpc2goKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZXQodGhpcy5wcm9qZWN0aW9uKCkpXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNLQSxtQkFBc0I7QUFHdEIsc0NBQTZCOzs7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V0FBTztBQUFBLE1BQ0wsV0FBVyxTQUFTLFdBQVc7QUFBQSxNQUMvQixVQUFVLFNBQVM7QUFBQSxNQUNuQixPQUFPLENBQUMsVUFBVSxLQUFLLGFBQWEsR0FBRyxLQUFLLGFBQWEsQ0FBQztBQUFBLE1BQzFELFNBQVM7QUFBQSxNQUNULFFBQVEsS0FBSztBQUFBLE1BQ2IsUUFBUSxLQUFLO0FBQUEsTUFDYixvQkFBb0IsS0FBSyxVQUFVLFlBQVksRUFBRSxXQUFXO0FBQUEsTUFDNUQ7QUFBQSxNQUNBLFlBQVksS0FBSztBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUFBLEVBRVEsVUFBZ0I7QUFDdEIsU0FBSyxNQUFNLElBQUksS0FBSyxXQUFXLENBQUM7QUFBQSxFQUNsQztBQUNGOzs7QUoxT08sSUFBTSxLQUFLO0FBR1gsSUFBTSxTQUFTLENBQUMsU0FBUyxVQUFVLGFBQWE7QUFNaEQsU0FBUyxNQUFNLEtBQTBCO0FBQzlDLFFBQU0sSUFBSSxJQUFJLE9BQU8sS0FBSyxFQUFFO0FBQzVCLE1BQUksT0FBTyxNQUFNLElBQUksT0FBTyxTQUFTLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLHlDQUF5QztBQUMvRixRQUFNLFFBQVEsSUFBSTtBQUFBLElBQ2hCLElBQUksWUFBWSxJQUF3QixvQkFBb0I7QUFBQSxJQUM1RCxJQUFJLFlBQVksSUFBb0MsaUNBQWlDO0FBQUEsRUFDdkY7QUFDQSxNQUFJLE9BQU8sTUFBTSxNQUFNO0FBQUUsVUFBTSxRQUFRO0FBQUEsRUFBRSxHQUFHLCtDQUErQztBQUMzRixNQUFJO0FBQUEsSUFDRixNQUFNLElBQUksR0FBRyxvQkFBb0IsTUFBTTtBQUFFLFlBQU0sZ0JBQWdCO0FBQUEsSUFBRSxDQUFDO0FBQUEsSUFDbEU7QUFBQSxFQUNGO0FBQ0EsTUFBSSxPQUFPLE1BQU0sSUFBSSxZQUFZLFlBQVksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLElBQUksTUFBTTtBQUFBLElBQ25GO0FBQUEsSUFDQSxNQUFNLElBQUksTUFBTSxTQUFTO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTyxNQUFNLEVBQUUsY0FBYztBQUFBLE1BQzdCLFFBQVE7QUFBQSxNQUNSLFFBQVEsTUFBTSxNQUFNLE9BQU87QUFBQSxJQUM3QixHQUFHLGlCQUFpQjtBQUFBLEVBQ3RCLENBQUMsR0FBRyxrQ0FBa0M7QUFDeEM7IiwKICAibmFtZXMiOiBbIm5vdGUiXQp9Cg==

function injectStyle(text) {
  var tagId = "dsh-subagent-model-briefs/client.css";
  if (typeof document === 'undefined') return;
  var type = 'style[data-plugin-css="' + tagId + '"]';
  var existing = document.querySelector(type);
  var tag = existing || document.createElement('style');
  tag.dataset.plugin = "dsh-subagent-model-briefs";
  tag.dataset.pluginCss = tagId;
  tag.textContent = text;
  if (!existing) document.head.appendChild(tag);
}
injectStyle(".section_1fcfc967 {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  min-width: 0;\n}\n.intro_1fcfc967 {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n.heading_1fcfc967 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-primary);\n}\n.hint_1fcfc967,\n.conflict_1fcfc967 {\n  margin: 0;\n  font-size: 12px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n.hint_1fcfc967 {\n  color: var(--dsw-alias-label-secondary);\n}\n.conflict_1fcfc967 {\n  color: var(--dsw-alias-state-error-primary);\n}\n.notes_1fcfc967,\n.noteGroup_1fcfc967,\n.noteField_1fcfc967 {\n  display: grid;\n  gap: 6px;\n  min-width: 0;\n}\n.notes_1fcfc967 {\n  gap: 10px;\n}\n.noteGroup_1fcfc967 {\n  margin: 0;\n  padding: 10px;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-lg);\n}\n.legend_1fcfc967 {\n  padding: 0 4px;\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n  overflow-wrap: anywhere;\n}\n.noteField_1fcfc967 {\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n}\n.textarea_1fcfc967 {\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 52px;\n  padding: 6px;\n  resize: vertical;\n  font: inherit;\n  font-size: 13px;\n  color: var(--dsw-alias-label-primary);\n  background: transparent;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-sm);\n}\n.textarea_1fcfc967:focus-visible {\n  outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\n  outline-offset: 1px;\n}\n.textarea_1fcfc967:disabled {\n  opacity: 0.6;\n}\n");

return module.exports; } });
