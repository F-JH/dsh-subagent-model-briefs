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

// src/client/ModelNotesRefreshAction.tsx
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// dsh-css-module:src/client/ModelNotesRefreshAction.module.css
var ModelNotesRefreshAction_default = { "trigger": "trigger_b7023581" };

// src/client/ModelNotesRefreshAction.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var MESSAGE_KEYS = {
  idle: "refreshLabel",
  busy: "refreshBusy",
  updated: "refreshUpdated",
  unchanged: "refreshUnchanged",
  failed: "refreshFailed",
  inactive: "refreshInactive"
};
function ModelNotesRefreshAction({ sessionId, refresh, t }) {
  const [notice, setNotice] = (0, import_react.useState)();
  const [busy, setBusy] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setNotice(void 0);
    setBusy(false);
  }, [sessionId]);
  const onRefresh = () => {
    if (busy) return;
    setBusy(true);
    void refresh(sessionId).then((result) => {
      setNotice(result);
      setBusy(false);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: t(busy ? "refreshBusy" : "refreshLabel"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Button,
      {
        size: "sm",
        variant: "ghost",
        className: ModelNotesRefreshAction_default.trigger,
        "aria-label": t("refreshLabel"),
        "aria-busy": busy,
        disabled: busy,
        "data-model-notes-refresh": "",
        onClick: onRefresh,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconRefreshOutlineRegular, { size: 16 })
      }
    ) }),
    notice !== void 0 && notice.status !== "idle" && notice.status !== "busy" && (notice.status === "updated" || notice.status === "unchanged" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Toast,
      {
        text: t(MESSAGE_KEYS[notice.status]),
        tone: "success",
        onDone: () => {
          setNotice(void 0);
        }
      },
      `${String(sessionId)}-${notice.message}-${Date.now()}`
    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Toast,
      {
        text: t(MESSAGE_KEYS[notice.status]),
        onDone: () => {
          setNotice(void 0);
        }
      },
      `${String(sessionId)}-${notice.message}-${Date.now()}`
    ))
  ] });
}

// src/client/ModelRouteBadge.tsx
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/model-label.ts
function modelLabelOf(view) {
  if (view === void 0) return void 0;
  const route = view.next ?? view.lastUsed;
  if (route === null) return void 0;
  return {
    route: `${route.provider}/${route.model}`,
    model: route.model,
    title: `${route.provider}/${route.model}`
  };
}

// dsh-css-module:src/client/ModelRouteBadge.module.css
var ModelRouteBadge_default = { "trigger": "trigger_8b6dc00a", "glyph": "glyph_8b6dc00a", "text": "text_8b6dc00a" };

// src/client/ModelRouteBadge.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function RouteGlyph() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "3.75", cy: "4", r: "1.75", stroke: "currentColor", strokeWidth: "1.3" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "12.25", cy: "12", r: "1.75", stroke: "currentColor", strokeWidth: "1.3" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3.75 5.75v3.25a3 3 0 0 0 3 3h5.5", stroke: "currentColor", strokeWidth: "1.3" })
  ] });
}
function ModelRouteBadge({ useProjection, t }) {
  const read = useProjection;
  const label = modelLabelOf(read("modelSelection"));
  if (label === void 0) return null;
  const accessible = t("routeAria", { route: label.route });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_dsh_client_ui_primitives2.Tooltip,
    {
      label: label.title,
      side: "top",
      align: "end",
      portal: true,
      openOnClick: true,
      focusDelayMs: 0,
      maxWidth: 320,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: ModelRouteBadge_default.trigger, "aria-label": accessible, "data-model-route": label.route, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: ModelRouteBadge_default.glyph, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RouteGlyph, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: ModelRouteBadge_default.text, children: label.route })
      ] })
    }
  );
}

// src/client/ModelNotesSection.tsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/locales.ts
var en = {
  unavailable: "This plugin is not loaded, so it cannot be configured right now.",
  readOnly: "This deployment stores settings read-only.",
  save: "Save",
  saving: "Saving\u2026",
  saveFailed: "The save could not be confirmed and may have been applied. Your draft is retained; check the current settings before trying again.",
  sectionTitle: "Model notes",
  sectionHint: "Describe what each allowed model is good at and when to use it. Agents read these notes for reference when they choose a subagent model. Changes apply to new sessions; refresh an existing session from its header.",
  capability: "Capability",
  scenario: "Scenario",
  selectionUnavailable: "Subagent model selection is unavailable, so model notes cannot be edited right now.",
  selectionEmpty: "Turn on model selection above, check models, and save. Each saved model then gets its note fields here.",
  conflict: "These notes changed while you were editing. Your draft cannot be saved against the newer values. Leave this page to discard the draft, check the current notes, then edit again.",
  refreshLabel: "Refresh subagent model notes for this session",
  refreshBusy: "Refreshing subagent model notes\u2026",
  refreshUpdated: "Subagent model notes updated; the next message will use the new list.",
  refreshUnchanged: "Subagent model notes are already up to date.",
  refreshFailed: "Could not refresh subagent model notes. Try again.",
  refreshInactive: "This session is not active yet. Send a message, then refresh again.",
  routeAria: "Current model: {route}"
};
var zh = {
  unavailable: "\u8BE5\u63D2\u4EF6\u5F53\u524D\u672A\u52A0\u8F7D\uFF0C\u6682\u65F6\u65E0\u6CD5\u914D\u7F6E\u3002",
  readOnly: "\u672C\u90E8\u7F72\u7684\u8BBE\u7F6E\u4E3A\u53EA\u8BFB\u3002",
  save: "\u4FDD\u5B58",
  saving: "\u4FDD\u5B58\u4E2D\u2026",
  saveFailed: "\u65E0\u6CD5\u786E\u8BA4\u4FDD\u5B58\u7ED3\u679C\uFF0C\u8BBE\u7F6E\u53EF\u80FD\u5DF2\u7ECF\u751F\u6548\u3002\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u5148\u6838\u5BF9\u5F53\u524D\u8BBE\u7F6E\u518D\u91CD\u8BD5\u3002",
  sectionTitle: "\u6A21\u578B\u8BF4\u660E",
  sectionHint: "\u4E3A\u6BCF\u4E2A\u5DF2\u6388\u6743\u7684\u6A21\u578B\u586B\u5199\u80FD\u529B\u8BF4\u660E\u548C\u9002\u7528\u573A\u666F\uFF0C\u4F9B\u667A\u80FD\u4F53\u9009\u62E9\u5B50\u4EE3\u7406\u6A21\u578B\u65F6\u53C2\u8003\u3002\u66F4\u6539\u9ED8\u8BA4\u4EC5\u5BF9\u65B0\u4F1A\u8BDD\u751F\u6548\uFF1B\u5DF2\u6709\u4F1A\u8BDD\u53EF\u5728\u4F1A\u8BDD\u5934\u90E8\u624B\u52A8\u5237\u65B0\u3002",
  capability: "\u80FD\u529B\u8BF4\u660E",
  scenario: "\u9002\u7528\u573A\u666F",
  selectionUnavailable: "\u5B50\u4EE3\u7406\u6A21\u578B\u9009\u62E9\u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u6682\u65F6\u65E0\u6CD5\u7F16\u8F91\u6A21\u578B\u8BF4\u660E",
  selectionEmpty: "\u5728\u4E0A\u65B9\u5F00\u542F\u6A21\u578B\u9009\u62E9\u3001\u52FE\u9009\u6A21\u578B\u5E76\u4FDD\u5B58\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E3A\u6BCF\u4E2A\u5DF2\u4FDD\u5B58\u7684\u6A21\u578B\u586B\u5199\u8BF4\u660E",
  conflict: "\u7F16\u8F91\u671F\u95F4\u8BF4\u660E\u5DF2\u53D1\u751F\u53D8\u5316\uFF0C\u65E0\u6CD5\u57FA\u4E8E\u8F83\u65B0\u7684\u503C\u4FDD\u5B58\u8349\u7A3F\u3002\u8BF7\u79BB\u5F00\u6B64\u9875\u9762\u653E\u5F03\u8349\u7A3F\uFF0C\u6838\u5BF9\u5F53\u524D\u8BF4\u660E\u540E\u91CD\u65B0\u7F16\u8F91\u3002",
  refreshLabel: "\u5237\u65B0\u5F53\u524D\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u6A21\u578B\u8BF4\u660E",
  refreshBusy: "\u6B63\u5728\u5237\u65B0\u5B50\u4EE3\u7406\u6A21\u578B\u8BF4\u660E\u2026",
  refreshUpdated: "\u5B50\u4EE3\u7406\u6A21\u578B\u8BF4\u660E\u5DF2\u66F4\u65B0\uFF0C\u4E0B\u4E00\u6761\u6D88\u606F\u5C06\u4F7F\u7528\u65B0\u5217\u8868\u3002",
  refreshUnchanged: "\u5B50\u4EE3\u7406\u6A21\u578B\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002",
  refreshFailed: "\u5237\u65B0\u5B50\u4EE3\u7406\u6A21\u578B\u8BF4\u660E\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  refreshInactive: "\u5F53\u524D\u4F1A\u8BDD\u5C1A\u672A\u6FC0\u6D3B\uFF0C\u8BF7\u5148\u53D1\u9001\u4E00\u6761\u6D88\u606F\u518D\u5237\u65B0\u3002",
  routeAria: "\u5F53\u524D\u6A21\u578B\uFF1A{route}"
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
var import_jsx_runtime3 = require("react/jsx-runtime");
var SUBAGENT_ITEM_ID = "subagent";
function ModelNotesSection(props) {
  const { subject } = props;
  if (subject.kind !== "item" || subject.id !== SUBAGENT_ITEM_ID) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ModelNotesPanel, { props });
}
function ModelNotesPanel({ props }) {
  const state = props.useModelNotes((snapshot) => snapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ModelNotesFields, { props, state });
}
function ModelNotesFields({ props, state }) {
  const { t } = props;
  const headingId = (0, import_react2.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: ModelNotesSection_default.section, "aria-labelledby": headingId, "data-plugin-model-notes": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: ModelNotesSection_default.intro, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: ModelNotesSection_default.heading, id: headingId, children: t("sectionTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: ModelNotesSection_default.hint, children: t("sectionHint") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_dsh_client_ui_primitives3.SettingsForm, { labels: formLabels(t), state, onSave: props.save, onDiscard: props.discard, children: [
      !state.selectionAvailable ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: ModelNotesSection_default.hint, children: t("selectionUnavailable") }) : state.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: ModelNotesSection_default.hint, children: t("selectionEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: ModelNotesSection_default.notes, children: state.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("fieldset", { className: ModelNotesSection_default.noteGroup, "data-model-note-row": true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("legend", { className: ModelNotesSection_default.legend, children: `${row.provider}/${row.model}` }),
        ["capability", "scenario"].map((field) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: ModelNotesSection_default.noteField, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t(field) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      state.conflicted ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: ModelNotesSection_default.conflict, role: "status", children: t("conflict") }) : null
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

// src/client/refresh-controller.ts
var REFRESH_API_PATH = "/api/team-model-routing.refresh";
var REFRESH_API_ROUTE = REFRESH_API_PATH.slice(1);
function readRefreshResult(ok, body) {
  const code = typeof body === "object" && body !== null && !Array.isArray(body) ? body.code : void 0;
  if (ok) {
    const changed = typeof body === "object" && body !== null && !Array.isArray(body) && body.changed === true;
    return changed ? { status: "updated", message: "updated" } : { status: "unchanged", message: "unchanged" };
  }
  return code === "inactive" ? { status: "inactive", message: "inactive" } : { status: "failed", message: "failed" };
}
var RefreshController = class {
  pending = /* @__PURE__ */ new Map();
  fetcher;
  /** @param fetcher - transport; production passes `fetch`, specs pass a stub. */
  constructor(fetcher = (path, init) => fetch(path, init)) {
    this.fetcher = fetcher;
  }
  /**
   * Refresh one Session, deduplicating overlapping requests for the same id.
   * @param sessionId - current Session from the header slot.
   * @returns the settled status and its copy key.
   */
  refresh(sessionId) {
    const running = this.pending.get(sessionId);
    if (running !== void 0) return running;
    const task = this.send(sessionId).finally(() => {
      this.pending.delete(sessionId);
    });
    this.pending.set(sessionId, task);
    return task;
  }
  /** Send one JSON POST to the Host refresh route. */
  async send(sessionId) {
    let response;
    try {
      response = await this.fetcher(REFRESH_API_ROUTE, {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId })
      });
    } catch {
      return { status: "failed", message: "failed" };
    }
    let body;
    try {
      body = await response.json();
    } catch {
      return { status: "failed", message: "failed" };
    }
    return readRefreshResult(response.ok, body);
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
  const refresh = new RefreshController();
  ctx.effect(() => ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
    name: "conversation.session.header.utilities",
    id: "team-model-routing-refresh",
    order: -5,
    locale: NS,
    inject: () => ({ refresh: (id) => refresh.refresh(id) })
  }, ModelNotesRefreshAction)), "dsh-subagent-model-briefs: session refresh");
  ctx.effect(() => ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
    name: "conversation.input.right",
    id: "team-model-routing-route",
    order: -10,
    locale: NS
  }, ModelRouteBadge)), "dsh-subagent-model-briefs: composer model route");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLnRzeCIsICJkc2gtY3NzLW1vZHVsZTpzcmMvY2xpZW50L01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLm1vZHVsZS5jc3MiLCAic3JjL2NsaWVudC9Nb2RlbFJvdXRlQmFkZ2UudHN4IiwgInNyYy9jbGllbnQvbW9kZWwtbGFiZWwudHMiLCAiZHNoLWNzcy1tb2R1bGU6c3JjL2NsaWVudC9Nb2RlbFJvdXRlQmFkZ2UubW9kdWxlLmNzcyIsICJzcmMvY2xpZW50L01vZGVsTm90ZXNTZWN0aW9uLnRzeCIsICJzcmMvY2xpZW50L2xvY2FsZXMudHMiLCAiZHNoLWNzcy1tb2R1bGU6c3JjL2NsaWVudC9Nb2RlbE5vdGVzU2VjdGlvbi5tb2R1bGUuY3NzIiwgInNyYy9jbGllbnQvbW9kZWwtbm90ZXMtY29udHJvbGxlci50cyIsICJzcmMvY2xpZW50L3JlZnJlc2gtY29udHJvbGxlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBUaGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwsIGJyb3dzZXIgaGFsZi5cbiAqXG4gKiBUaGUgcGFuZWwgcmVnaXN0ZXJzIGludG8gdGhlIFBsdWdpbnMgcGFnZSdzIGBwbHVnaW5zLmRldGFpbC5zZWN0aW9uYCBzbG90XG4gKiBhbmQgcmVuZGVycyBvbmx5IG9uIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwYWdlIChgcGx1Z2lucy5pdGVtYCBpZFxuICogYHN1YmFnZW50YCksIGRpcmVjdGx5IGJlbG93IHRoYXQgcGFnZSdzIG1vZGVsIGF1dGhvcml6YXRpb24uIEl0IGVkaXRzXG4gKiBgbW9kZWxOb3Rlc2AgaW4gdGhpcyBwbHVnaW4ncyBIb3N0IGVudHJ5IHRocm91Z2ggdGhlIHNoYXJlZCBgY29uZmlnRm9ybXNgXG4gKiBzZXJ2aWNlIGFuZCByZWFkcyB0aGUgc2F2ZWQgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiB0aHJvdWdoIHRoZSBzYW1lXG4gKiBzZXJ2aWNlLCB3aXRob3V0IHdyaXRpbmcgaXQuXG4gKlxuICogVGhlIHJlZ2lzdHJhdGlvbiBsaXZlcyB3aXRoIHRoaXMgcGx1Z2luJ3MgZmliZXIsIHNvIHN3aXRjaGluZyB0aGUgcGx1Z2luXG4gKiBvZmYgcmVtb3ZlcyB0aGUgcGFuZWwgYWxvbmcgd2l0aCBldmVyeXRoaW5nIGVsc2UgaXQgY29udHJpYnV0ZWQuXG4gKi9cblxuLy8gVHlwZS1vbmx5OiBwdWxscyB0aGUgbG9jYWxlIHBsdWdpbidzIENvbnRleHQgbWVyZ2UgKGN0eC5sb2NhbGUpLlxuaW1wb3J0IHR5cGUge30gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtbG9jYWxlL2NsaWVudCdcbi8vIFR5cGUtb25seTogdGhlIGN0eC5jb25maWdGb3JtcyBDb250ZXh0IG1lcmdlLiBDcm9zcy1wbHVnaW4gY29sbGFib3JhdGlvblxuLy8gZ29lcyB0aHJvdWdoIHRoZSBzZXJ2aWNlLCBuZXZlciBhIHZhbHVlIGltcG9ydCAoY2xpZW50IGJ1bmRsZSBwdXJpdHkgZ2F0ZSkuXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zZXR0aW5ncy9jbGllbnQnXG4vLyBUeXBlLW9ubHk6IHRoZSBQbHVnaW5zIHBhZ2UncyBTbG90TWFwIG1lcmdlICh0aGUgJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nIGVudHJ5KS5cbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXBsdWdpbi1tYW5hZ2VyL2NsaWVudCdcbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXJlbmRlcmVyL2NsaWVudCdcbmltcG9ydCB0eXBlIHsgQ29udGV4dCBhcyBDbGllbnRDb250ZXh0IH0gZnJvbSAnQGRlZXBzZWVrLWFpL2NvcmRpcydcbmltcG9ydCB7IE1vZGVsTm90ZXNSZWZyZXNoQWN0aW9uIH0gZnJvbSAnLi9Nb2RlbE5vdGVzUmVmcmVzaEFjdGlvbi50c3gnXG5pbXBvcnQgeyBNb2RlbFJvdXRlQmFkZ2UgfSBmcm9tICcuL01vZGVsUm91dGVCYWRnZS50c3gnXG5pbXBvcnQgeyBNb2RlbE5vdGVzU2VjdGlvbiB9IGZyb20gJy4vTW9kZWxOb3Rlc1NlY3Rpb24udHN4J1xuaW1wb3J0IHtcbiAgTU9ERUxfTk9URVNfRU5UUllfSUQsIE1vZGVsTm90ZXNDb250cm9sbGVyLCBTVUJBR0VOVF9NT0RFTF9TRUxFQ1RJT05fRU5UUllfSUQsXG59IGZyb20gJy4vbW9kZWwtbm90ZXMtY29udHJvbGxlci50cydcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc1NldHRpbmdzLCBTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3MgfSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5pbXBvcnQgeyBSZWZyZXNoQ29udHJvbGxlciB9IGZyb20gJy4vcmVmcmVzaC1jb250cm9sbGVyLnRzJ1xuaW1wb3J0IHR5cGUgeyBTZXNzaW9uSWQgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmltcG9ydCB7IGVuLCB6aCwgdHlwZSBNb2RlbE5vdGVzTG9jYWxlS2V5IH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNSZWZyZXNoQWN0aW9uUHJvcHMgfSBmcm9tICcuL01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLnRzeCdcbmV4cG9ydCB0eXBlIHsgTW9kZWxSb3V0ZUJhZGdlUHJvcHMgfSBmcm9tICcuL01vZGVsUm91dGVCYWRnZS50c3gnXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgfSBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLnRzeCdcbmV4cG9ydCB0eXBlIHtcbiAgTW9kZWxOb3RlLCBNb2RlbE5vdGVSb3csIE1vZGVsTm90ZXNGYWNlLCBNb2RlbE5vdGVzU2V0dGluZ3MsIE1vZGVsTm90ZXNTdGF0ZSwgTW9kZWxSb3V0ZSxcbiAgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzLFxufSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5leHBvcnQgdHlwZSB7IFJlZnJlc2hSZXN1bHQsIFJlZnJlc2hTdGF0dXMgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmV4cG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0xvY2FsZUtleSB9IGZyb20gJy4vbG9jYWxlcy50cydcblxuZGVjbGFyZSBtb2R1bGUgJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJyB7XG4gIGludGVyZmFjZSBMb2NhbGVOYW1lc3BhY2VNYXAge1xuICAgIC8qKiBTdWJhZ2VudCBtb2RlbCBub3RlcyBwYW5lbCBjb3B5LiAqL1xuICAgICd0ZWFtTW9kZWxSb3V0aW5nJzogTW9kZWxOb3Rlc0xvY2FsZUtleVxuICB9XG59XG5cbi8qKiBEaWN0aW9uYXJ5IG5hbWVzcGFjZSBvd25lZCBieSB0aGlzIHBsdWdpbi4gKi9cbmV4cG9ydCBjb25zdCBOUyA9ICd0ZWFtTW9kZWxSb3V0aW5nJ1xuXG4vKiogUmVxdWlyZWQgc2VydmljZXMgKGNvcmRpcyBmaWJlciBpbmplY3QpLiAqL1xuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnbG9jYWxlJywgJ2NvbmZpZ0Zvcm1zJ11cblxuLyoqXG4gKiBNb3VudCB0aGUgbm90ZXMgcGFuZWwgb24gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBhZ2UuXG4gKiBAcGFyYW0gY3R4IC0gdGhlIGJyb3dzZXIgcGx1Z2luIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShjdHg6IENsaWVudENvbnRleHQpOiB2b2lkIHtcbiAgY29uc3QgdCA9IGN0eC5sb2NhbGUuYmluZChOUylcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoLCBlbiB9KSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IGRpY3Rpb25hcmllcycpXG4gIGNvbnN0IG5vdGVzID0gbmV3IE1vZGVsTm90ZXNDb250cm9sbGVyKFxuICAgIGN0eC5jb25maWdGb3Jtcy5nZXQ8TW9kZWxOb3Rlc1NldHRpbmdzPihNT0RFTF9OT1RFU19FTlRSWV9JRCksXG4gICAgY3R4LmNvbmZpZ0Zvcm1zLmdldDxTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3M+KFNVQkFHRU5UX01PREVMX1NFTEVDVElPTl9FTlRSWV9JRCksXG4gIClcbiAgY3R4LmVmZmVjdCgoKSA9PiAoKSA9PiB7IG5vdGVzLmRpc3Bvc2UoKSB9LCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogZm9ybSBzdWJzY3JpcHRpb25zJylcbiAgY3R4LmVmZmVjdChcbiAgICAoKSA9PiBjdHgub24oJ2Nvbm5lY3Rpb24vcmVzZXQnLCAoKSA9PiB7IG5vdGVzLnJlc2V0Q29ubmVjdGlvbigpIH0pLFxuICAgICdkc2gtc3ViYWdlbnQtbW9kZWwtYnJpZWZzOiBjb25uZWN0aW9uIGdlbmVyYXRpb24nLFxuICApXG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LmNvbmZpZ0Zvcm1zLndoaWxlU2VydmVkKFtNT0RFTF9OT1RFU19FTlRSWV9JRF0sICgpID0+IGN0eC5zbG90cy5pbmplY3QoXG4gICAgJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nLFxuICAgICgpID0+IGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAncGx1Z2lucy5kZXRhaWwuc2VjdGlvbicsXG4gICAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZycsXG4gICAgICBvcmRlcjogMjAsXG4gICAgICBsYWJlbDogKCkgPT4gdCgnc2VjdGlvblRpdGxlJyksXG4gICAgICBsb2NhbGU6IE5TLFxuICAgICAgaW5qZWN0OiAoKSA9PiBub3Rlcy5pbmplY3QoKSxcbiAgICB9LCBNb2RlbE5vdGVzU2VjdGlvbiksXG4gICkpLCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogcGFuZWwnKVxuXG4gIGNvbnN0IHJlZnJlc2ggPSBuZXcgUmVmcmVzaENvbnRyb2xsZXIoKVxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5zbG90cy5pbmplY3QoJ2NvbnZlcnNhdGlvbi5zZXNzaW9uLmhlYWRlci51dGlsaXRpZXMnLCAoKSA9PiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgIG5hbWU6ICdjb252ZXJzYXRpb24uc2Vzc2lvbi5oZWFkZXIudXRpbGl0aWVzJyxcbiAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZy1yZWZyZXNoJyxcbiAgICBvcmRlcjogLTUsXG4gICAgbG9jYWxlOiBOUyxcbiAgICBpbmplY3Q6ICgpID0+ICh7IHJlZnJlc2g6IChpZDogU2Vzc2lvbklkKSA9PiByZWZyZXNoLnJlZnJlc2goaWQpIH0pLFxuICB9LCBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvbikpLCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogc2Vzc2lvbiByZWZyZXNoJylcblxuICAvLyBUaGUgY29tcG9zZXIncyBtb2RlbCByb3V0ZS4gVGhlIHJlbmRlcmVyIGhhbmRzIGVhY2ggc2Vzc2lvbi1zY29wZWQgZW50cnkgYVxuICAvLyBgdXNlUHJvamVjdGlvbmAgcmVhZGVyLCBzbyB0aGUgbGFiZWwgZm9sbG93cyB0aGUgU2Vzc2lvbidzIG93blxuICAvLyBgbW9kZWxTZWxlY3Rpb25gIHByb2plY3Rpb24gd2l0aG91dCByZWFjaGluZyBmb3IgdGhlIHNlc3Npb25zIHNlcnZpY2UuXG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LnNsb3RzLmluamVjdCgnY29udmVyc2F0aW9uLmlucHV0LnJpZ2h0JywgKCkgPT4gY3R4LnNsb3RzLnJlZ2lzdGVyKHtcbiAgICBuYW1lOiAnY29udmVyc2F0aW9uLmlucHV0LnJpZ2h0JyxcbiAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZy1yb3V0ZScsXG4gICAgb3JkZXI6IC0xMCxcbiAgICBsb2NhbGU6IE5TLFxuICB9LCBNb2RlbFJvdXRlQmFkZ2UpKSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IGNvbXBvc2VyIG1vZGVsIHJvdXRlJylcbn1cbiIsICIvKiogU2Vzc2lvbi1oZWFkZXIgYWN0aW9uIHRoYXQgcmVmcmVzaGVzIHRoaXMgU2Vzc2lvbidzIHN1YmFnZW50IG1vZGVsIG5vdGVzLiAqL1xyXG5cclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBCdXR0b24sIEljb25SZWZyZXNoT3V0bGluZVJlZ3VsYXIsIFRvYXN0LCBUb29sdGlwIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktcHJpbWl0aXZlcydcclxuaW1wb3J0IHR5cGUgeyBJbmplY3RGYWNlLCBQcm9wc0xvY2FsZSwgUHJvcHNSdW50aW1lIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2xvdHMnXHJcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0xvY2FsZUtleSB9IGZyb20gJy4vbG9jYWxlcy50cydcclxuaW1wb3J0IHR5cGUgeyBSZWZyZXNoUmVzdWx0LCBTZXNzaW9uSWQgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcclxuaW1wb3J0IGNzcyBmcm9tICcuL01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLm1vZHVsZS5jc3MnXHJcblxyXG4vKiogUHJvcHMgb2YgdGhlIGhlYWRlciB1dGlsaXR5IGVudHJ5LCB3aXRoIHRoZSByZWZyZXNoIGFjdGlvbiBpbmplY3RlZCBieSB0aGUgcGx1Z2luLiAqL1xyXG5leHBvcnQgdHlwZSBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvblByb3BzID0gUHJvcHNSdW50aW1lPCdjb252ZXJzYXRpb24uc2Vzc2lvbi5oZWFkZXIudXRpbGl0aWVzJz5cclxuICAmIFByb3BzTG9jYWxlPCd0ZWFtTW9kZWxSb3V0aW5nJz5cclxuICAmIEluamVjdEZhY2U8eyByZWFkb25seSByZWZyZXNoOiAoaWQ6IFNlc3Npb25JZCkgPT4gUHJvbWlzZTxSZWZyZXNoUmVzdWx0PiB9PlxyXG5cclxuLyoqIENvcHkga2V5cyB0aGUgYnV0dG9uIGFubm91bmNlcyBmb3IgZWFjaCByZWZyZXNoIG91dGNvbWUuICovXHJcbmNvbnN0IE1FU1NBR0VfS0VZUzogUmVjb3JkPFJlZnJlc2hSZXN1bHRbJ3N0YXR1cyddLCBNb2RlbE5vdGVzTG9jYWxlS2V5PiA9IHtcclxuICBpZGxlOiAncmVmcmVzaExhYmVsJyxcclxuICBidXN5OiAncmVmcmVzaEJ1c3knLFxyXG4gIHVwZGF0ZWQ6ICdyZWZyZXNoVXBkYXRlZCcsXHJcbiAgdW5jaGFuZ2VkOiAncmVmcmVzaFVuY2hhbmdlZCcsXHJcbiAgZmFpbGVkOiAncmVmcmVzaEZhaWxlZCcsXHJcbiAgaW5hY3RpdmU6ICdyZWZyZXNoSW5hY3RpdmUnLFxyXG59XHJcblxyXG4vKiogUmVuZGVyIGEgY29tcGFjdCBpY29uIGJ1dHRvbiBtYXRjaGluZyB0aGUgb3RoZXIgU2Vzc2lvbiB1dGlsaXRpZXMuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvbih7IHNlc3Npb25JZCwgcmVmcmVzaCwgdCB9OiBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvblByb3BzKSB7XHJcbiAgY29uc3QgW25vdGljZSwgc2V0Tm90aWNlXSA9IHVzZVN0YXRlPFJlZnJlc2hSZXN1bHQgfCB1bmRlZmluZWQ+KClcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0Tm90aWNlKHVuZGVmaW5lZClcclxuICAgIHNldEJ1c3koZmFsc2UpXHJcbiAgfSwgW3Nlc3Npb25JZF0pXHJcbiAgY29uc3Qgb25SZWZyZXNoID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVyblxyXG4gICAgc2V0QnVzeSh0cnVlKVxyXG4gICAgdm9pZCByZWZyZXNoKHNlc3Npb25JZCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIHNldE5vdGljZShyZXN1bHQpXHJcbiAgICAgIHNldEJ1c3koZmFsc2UpXHJcbiAgICB9KVxyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPFRvb2x0aXAgbGFiZWw9e3QoYnVzeSA/ICdyZWZyZXNoQnVzeScgOiAncmVmcmVzaExhYmVsJyl9IHNpZGU9XCJib3R0b21cIiBkZWxheU1zPXs1MDB9PlxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHNpemU9XCJzbVwiXHJcbiAgICAgICAgICB2YXJpYW50PVwiZ2hvc3RcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjc3MudHJpZ2dlcn1cclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3QoJ3JlZnJlc2hMYWJlbCcpfVxyXG4gICAgICAgICAgYXJpYS1idXN5PXtidXN5fVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2J1c3l9XHJcbiAgICAgICAgICBkYXRhLW1vZGVsLW5vdGVzLXJlZnJlc2g9XCJcIlxyXG4gICAgICAgICAgb25DbGljaz17b25SZWZyZXNofVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxJY29uUmVmcmVzaE91dGxpbmVSZWd1bGFyIHNpemU9ezE2fSAvPlxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L1Rvb2x0aXA+XHJcbiAgICAgIHtub3RpY2UgIT09IHVuZGVmaW5lZCAmJiBub3RpY2Uuc3RhdHVzICE9PSAnaWRsZScgJiYgbm90aWNlLnN0YXR1cyAhPT0gJ2J1c3knICYmIChcclxuICAgICAgICBub3RpY2Uuc3RhdHVzID09PSAndXBkYXRlZCcgfHwgbm90aWNlLnN0YXR1cyA9PT0gJ3VuY2hhbmdlZCdcclxuICAgICAgICAgID8gPFRvYXN0XHJcbiAgICAgICAgICAgIGtleT17YCR7U3RyaW5nKHNlc3Npb25JZCl9LSR7bm90aWNlLm1lc3NhZ2V9LSR7RGF0ZS5ub3coKX1gfVxyXG4gICAgICAgICAgICB0ZXh0PXt0KE1FU1NBR0VfS0VZU1tub3RpY2Uuc3RhdHVzXSl9XHJcbiAgICAgICAgICAgIHRvbmU9XCJzdWNjZXNzXCJcclxuICAgICAgICAgICAgb25Eb25lPXsoKSA9PiB7IHNldE5vdGljZSh1bmRlZmluZWQpIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgOiA8VG9hc3RcclxuICAgICAgICAgICAga2V5PXtgJHtTdHJpbmcoc2Vzc2lvbklkKX0tJHtub3RpY2UubWVzc2FnZX0tJHtEYXRlLm5vdygpfWB9XHJcbiAgICAgICAgICAgIHRleHQ9e3QoTUVTU0FHRV9LRVlTW25vdGljZS5zdGF0dXNdKX1cclxuICAgICAgICAgICAgb25Eb25lPXsoKSA9PiB7IHNldE5vdGljZSh1bmRlZmluZWQpIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC8+XHJcbiAgKVxyXG59XHJcbiIsICJleHBvcnQgZGVmYXVsdCB7XCJ0cmlnZ2VyXCI6XCJ0cmlnZ2VyX2I3MDIzNTgxXCJ9OyIsICIvKipcbiAqIFRoZSBhY3RpdmUgbW9kZWwgcm91dGUsIHNob3duIGJlc2lkZSB0aGUgY29tcG9zZXIncyBtb2RlbCBzZWxlY3Rvci5cbiAqXG4gKiBXaWRlIGNvbXBvc2VyIHJvd3Mgc2hvdyB0aGUgY29tcGxldGUgYHByb3ZpZGVyL21vZGVsYCByb3V0ZSBhcyB0ZXh0LiBBIHJvd1xuICogdG9vIG5hcnJvdyB0byBob2xkIGl0cyBleHBhbmRlZCBjb250cm9scyByZXBvcnRzIGBkYXRhLW1vZGVsLWNvbXBhY3RgIG9uXG4gKiBpdHNlbGYgKERTSCdzIG93biBjb250cm9sLXJvdyBtZWFzdXJlbWVudCksIGFuZCB0aGUgbGFiZWwgdGhlbiBjb2xsYXBzZXMgdG9cbiAqIGEgY2hpcCB3aG9zZSBidWJibGUgb3BlbnMgdXB3YXJkIG9uIGNsaWNrIGFuZCB0YXAuXG4gKi9cblxuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXG5pbXBvcnQgdHlwZSB7IFByb3BzTG9jYWxlLCBQcm9wc1J1bnRpbWUgfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zbG90cydcbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLWNvbnZlcnNhdGlvbi9jbGllbnQnXG5pbXBvcnQgeyBtb2RlbExhYmVsT2YgfSBmcm9tICcuL21vZGVsLWxhYmVsLnRzJ1xuaW1wb3J0IHR5cGUgeyBNb2RlbFNlbGVjdGlvblZpZXcgfSBmcm9tICcuL21vZGVsLXNlbGVjdGlvbi12aWV3LnRzJ1xuaW1wb3J0IHR5cGUgeyBNb2RlbE5vdGVzTG9jYWxlS2V5IH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuaW1wb3J0IGNzcyBmcm9tICcuL01vZGVsUm91dGVCYWRnZS5tb2R1bGUuY3NzJ1xuXG4vKiogUHJvcHMgb2YgdGhlIGNvbXBvc2VyIG1vZGVsLXJvdXRlIGVudHJ5OiB0aGUgU2Vzc2lvbidzIHByb2plY3Rpb24gcmVhZGVyIGFuZCBjb3B5LiAqL1xuZXhwb3J0IHR5cGUgTW9kZWxSb3V0ZUJhZGdlUHJvcHMgPSBQcm9wc1J1bnRpbWU8J2NvbnZlcnNhdGlvbi5pbnB1dC5yaWdodCc+XG4gICYgUHJvcHNMb2NhbGU8J3RlYW1Nb2RlbFJvdXRpbmcnPlxuXG4vKiogVGhlIFNlc3Npb24ncyBgbW9kZWxTZWxlY3Rpb25gIHJlYWRlciwgYXMgdGhlIHJlbmRlcmVyIGJpbmRzIGl0LiAqL1xudHlwZSBSZWFkTW9kZWxTZWxlY3Rpb24gPSAoa2V5OiAnbW9kZWxTZWxlY3Rpb24nKSA9PiBNb2RlbFNlbGVjdGlvblZpZXcgfCB1bmRlZmluZWRcblxuLyoqIEEgY29tcGFjdCByb3V0ZSBnbHlwaCwgZGlzdGluY3QgZnJvbSB0aGUgcmVmcmVzaCBhY3Rpb24ncyBjaXJjdWxhciBhcnJvdy4gKi9cbmZ1bmN0aW9uIFJvdXRlR2x5cGgoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxjaXJjbGUgY3g9XCIzLjc1XCIgY3k9XCI0XCIgcj1cIjEuNzVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuM1wiIC8+XG4gICAgICA8Y2lyY2xlIGN4PVwiMTIuMjVcIiBjeT1cIjEyXCIgcj1cIjEuNzVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuM1wiIC8+XG4gICAgICA8cGF0aCBkPVwiTTMuNzUgNS43NXYzLjI1YTMgMyAwIDAgMCAzIDNoNS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjNcIiAvPlxuICAgIDwvc3ZnPlxuICApXG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBTZXNzaW9uJ3MgbW9kZWwgcm91dGU6IGZ1bGwgdGV4dCB3aGVuIHRoZSBjb21wb3NlciByb3cgaGFzIHJvb20sXG4gKiBvdGhlcndpc2UgYSBjaGlwIHRoYXQgb3BlbnMgdGhlIHNhbWUgdGV4dCB1cHdhcmQgb24gY2xpY2sgb3IgdGFwLlxuICogQHBhcmFtIHByb3BzIC0gdGhlIFNlc3Npb24ncyBwcm9qZWN0aW9uIHJlYWRlciBhbmQgdGhpcyBwbHVnaW4ncyBjb3B5LlxuICogQHJldHVybnMgdGhlIHJvdXRlIGxhYmVsLCBvciBudWxsIGJlZm9yZSB0aGUgU2Vzc2lvbiByZWNvcmRzIGEgcm91dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNb2RlbFJvdXRlQmFkZ2UoeyB1c2VQcm9qZWN0aW9uLCB0IH06IE1vZGVsUm91dGVCYWRnZVByb3BzKSB7XG4gIC8vIFRoZSBpbnN0YWxsZWQgU2xvdE1hcCBjYXJyaWVzIG5vIHByb2plY3Rpb24gdGFibGU7IHRoZSByZWFkZXIgcmV0dXJucyB0aGlzXG4gIC8vIG9uZSBrZXkncyB2YWx1ZSwgd2hpY2ggdGhlIGxhYmVsIG5hcnJvd3MgaXRzZWxmLlxuICBjb25zdCByZWFkID0gdXNlUHJvamVjdGlvbiBhcyB1bmtub3duIGFzIFJlYWRNb2RlbFNlbGVjdGlvblxuICBjb25zdCBsYWJlbCA9IG1vZGVsTGFiZWxPZihyZWFkKCdtb2RlbFNlbGVjdGlvbicpKVxuICBpZiAobGFiZWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgY29uc3QgYWNjZXNzaWJsZSA9IHQoJ3JvdXRlQXJpYScsIHsgcm91dGU6IGxhYmVsLnJvdXRlIH0pXG4gIHJldHVybiAoXG4gICAgPFRvb2x0aXBcbiAgICAgIGxhYmVsPXtsYWJlbC50aXRsZX1cbiAgICAgIHNpZGU9XCJ0b3BcIlxuICAgICAgYWxpZ249XCJlbmRcIlxuICAgICAgcG9ydGFsXG4gICAgICBvcGVuT25DbGlja1xuICAgICAgZm9jdXNEZWxheU1zPXswfVxuICAgICAgbWF4V2lkdGg9ezMyMH1cbiAgICA+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e2Nzcy50cmlnZ2VyfSBhcmlhLWxhYmVsPXthY2Nlc3NpYmxlfSBkYXRhLW1vZGVsLXJvdXRlPXtsYWJlbC5yb3V0ZX0+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3NzLmdseXBofSBhcmlhLWhpZGRlbj1cInRydWVcIj48Um91dGVHbHlwaCAvPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjc3MudGV4dH0+e2xhYmVsLnJvdXRlfTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvVG9vbHRpcD5cbiAgKVxufVxuIiwgIi8qKlxuICogVGhlIGFjdGl2ZSBtb2RlbCBsYWJlbCBzaG93biBiZXNpZGUgdGhlIGNvbXBvc2VyJ3MgbW9kZWwgc2VsZWN0b3IuXG4gKlxuICogVGhlIGxhYmVsIG5hbWVzIHRoZSBleGFjdCByb3V0ZSB0aGUgU2Vzc2lvbiBpcyBydW5uaW5nIG9uLCBzbyBhIHN1YmFnZW50XG4gKiBTZXNzaW9uIHNob3dzIHdoaWNoIG1vZGVsIGl0cyBzdWJhZ2VudCBhY3R1YWxseSB1c2VzLiBJdCBhZGRzIG5vdGhpbmcgb2YgaXRzXG4gKiBvd246IERTSCdzIGBtb2RlbFNlbGVjdGlvbmAgcHJvamVjdGlvbiBhbHJlYWR5IGhvbGRzIHRoZSByb3V0ZS5cbiAqXG4gKiBAbW9kdWxlIGRzaC1zdWJhZ2VudC1tb2RlbC1icmllZnMvY2xpZW50L21vZGVsLWxhYmVsXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBNb2RlbFNlbGVjdGlvblZpZXcgfSBmcm9tICcuL21vZGVsLXNlbGVjdGlvbi12aWV3LnRzJ1xuXG4vKiogT25lIHJlbmRlcmVkIG1vZGVsIGxhYmVsOiB0aGUgZnVsbCByb3V0ZSBwbHVzIHRoZSBjb21wYWN0IGZhbGxiYWNrIG5hbWVzLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbExhYmVsIHtcbiAgLyoqIENvbXBsZXRlIGBwcm92aWRlci9tb2RlbGAgcm91dGUsIHNob3duIHdoZW4gdGhlIGNvbXBvc2VyIHJvdyBoYXMgcm9vbS4gKi9cbiAgcmVhZG9ubHkgcm91dGU6IHN0cmluZ1xuICAvKiogTW9kZWwgaWQgYWxvbmUsIGZvciBzdXJmYWNlcyB0b28gbmFycm93IGZvciB0aGUgcHJvdmlkZXIgcHJlZml4LiAqL1xuICByZWFkb25seSBtb2RlbDogc3RyaW5nXG4gIC8qKiBBY2Nlc3NpYmxlIG5hbWUgYW5kIGJ1YmJsZSB0ZXh0LCB0aGUgc2FtZSBmdWxsIHJvdXRlLiAqL1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nXG59XG5cbi8qKlxuICogQnVpbGQgdGhlIGxhYmVsIGZyb20gdGhlIFNlc3Npb24ncyBtb2RlbC1zZWxlY3Rpb24gcHJvamVjdGlvbi5cbiAqIEBwYXJhbSB2aWV3IC0gYG1vZGVsU2VsZWN0aW9uYCB2YWx1ZSwgb3IgdW5kZWZpbmVkIHdoaWxlIG5vIFNlc3Npb24gb3Igbm8gc2VsZWN0aW9uIGV4aXN0cy5cbiAqIEByZXR1cm5zIHRoZSBsYWJlbCwgb3IgdW5kZWZpbmVkIHdoZW4gdGhlIFNlc3Npb24gcmVjb3JkZWQgbm8gcm91dGUgeWV0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kZWxMYWJlbE9mKHZpZXc6IE1vZGVsU2VsZWN0aW9uVmlldyB8IHVuZGVmaW5lZCk6IE1vZGVsTGFiZWwgfCB1bmRlZmluZWQge1xuICBpZiAodmlldyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gIC8vIGBuZXh0YCBpcyB0aGUgdXBjb21pbmcgcm91dGUgYW5kIGZhbGxzIGJhY2sgdG8gdGhlIGxhc3QgdXNlZCBvbmUsIHNvIGl0IGlzXG4gIC8vIHRoZSByb3V0ZSB0aGUgbmV4dCByZXF1ZXN0IHdpbGwgYWN0dWFsbHkgc2VuZC5cbiAgY29uc3Qgcm91dGUgPSB2aWV3Lm5leHQgPz8gdmlldy5sYXN0VXNlZFxuICBpZiAocm91dGUgPT09IG51bGwpIHJldHVybiB1bmRlZmluZWRcbiAgcmV0dXJuIHtcbiAgICByb3V0ZTogYCR7cm91dGUucHJvdmlkZXJ9LyR7cm91dGUubW9kZWx9YCxcbiAgICBtb2RlbDogcm91dGUubW9kZWwsXG4gICAgdGl0bGU6IGAke3JvdXRlLnByb3ZpZGVyfS8ke3JvdXRlLm1vZGVsfWAsXG4gIH1cbn1cbiIsICJleHBvcnQgZGVmYXVsdCB7XCJ0cmlnZ2VyXCI6XCJ0cmlnZ2VyXzhiNmRjMDBhXCIsXCJnbHlwaFwiOlwiZ2x5cGhfOGI2ZGMwMGFcIixcInRleHRcIjpcInRleHRfOGI2ZGMwMGFcIn07IiwgIi8qKlxyXG4gKiBUaGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwsIGNvbnRyaWJ1dGVkIHRvIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwbHVnaW5cclxuICogcGFnZSBvbiB0aGUgUGx1Z2lucyBwYWdlLCBiZWxvdyB0aGF0IHBhZ2UncyBtb2RlbCBhdXRob3JpemF0aW9uLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IHVzZUlkIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB0eXBlIHsgSW5qZWN0RmFjZSwgUHJvcHNMb2NhbGUsIFByb3BzUnVudGltZSB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJ1xyXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wbHVnaW4tbWFuYWdlci9jbGllbnQnXHJcbmltcG9ydCB7IFNldHRpbmdzRm9ybSB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXHJcbmltcG9ydCB7IGZvcm1MYWJlbHMgfSBmcm9tICcuL2xvY2FsZXMudHMnXHJcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0ZhY2UsIE1vZGVsTm90ZXNTdGF0ZSB9IGZyb20gJy4vbW9kZWwtbm90ZXMtY29udHJvbGxlci50cydcclxuaW1wb3J0IGNzcyBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLm1vZHVsZS5jc3MnXHJcblxyXG4vKiogYHBsdWdpbnMuaXRlbWAgaWQgb2YgdGhlIG9mZmljaWFsIFN1YmFnZW50IHNldHRpbmdzIHBhZ2UgdGhpcyBwYW5lbCBqb2lucy4gKi9cclxuZXhwb3J0IGNvbnN0IFNVQkFHRU5UX0lURU1fSUQgPSAnc3ViYWdlbnQnXHJcblxyXG4vKiogRnJhbWV3b3JrLWRlcml2ZWQgcHJvcHM6IHRoZSBkZXRhaWwgcGFnZSdzIHN1YmplY3QsIHRoaXMgcGx1Z2luJ3MgZGljdGlvbmFyeSwgYW5kIGl0cyBzdGFnZWQgYWN0aW9ucy4gKi9cclxuZXhwb3J0IHR5cGUgTW9kZWxOb3Rlc1NlY3Rpb25Qcm9wcyA9IFByb3BzUnVudGltZTwncGx1Z2lucy5kZXRhaWwuc2VjdGlvbic+XHJcbiAgJiBQcm9wc0xvY2FsZTwndGVhbU1vZGVsUm91dGluZyc+XHJcbiAgJiBJbmplY3RGYWNlPE1vZGVsTm90ZXNGYWNlPlxyXG5cclxuLyoqXHJcbiAqIFJlbmRlciB0aGUgbm90ZXMgcGFuZWwgb24gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBhZ2UsIG9yIG5vdGhpbmcgZm9yIGFueSBvdGhlciBwYWdlLlxyXG4gKiBAcGFyYW0gcHJvcHMgLSB0aGUgcGFnZSBzdWJqZWN0LCBsb2NhbGUgY29weSwgdGhlIHN0YWdlZCBwYW5lbCBzbmFwc2hvdCwgYW5kIGl0cyBhY3Rpb25zLlxyXG4gKiBAcmV0dXJucyB0aGUgc3RhZ2VkIG5vdGVzIGZvcm0sIG9yIG51bGwgb24gYW55IG90aGVyIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTW9kZWxOb3Rlc1NlY3Rpb24ocHJvcHM6IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMpIHtcclxuICBjb25zdCB7IHN1YmplY3QgfSA9IHByb3BzXHJcbiAgaWYgKHN1YmplY3Qua2luZCAhPT0gJ2l0ZW0nIHx8IHN1YmplY3QuaWQgIT09IFNVQkFHRU5UX0lURU1fSUQpIHJldHVybiBudWxsXHJcbiAgcmV0dXJuIDxNb2RlbE5vdGVzUGFuZWwgcHJvcHM9e3Byb3BzfSAvPlxyXG59XHJcblxyXG4vKiogU3Vic2NyaWJlIG9ubHkgd2hpbGUgdGhlIFN1YmFnZW50IHBhZ2UgaXMgcmVuZGVyZWQuICovXHJcbmZ1bmN0aW9uIE1vZGVsTm90ZXNQYW5lbCh7IHByb3BzIH06IHsgcmVhZG9ubHkgcHJvcHM6IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgfSkge1xyXG4gIGNvbnN0IHN0YXRlID0gcHJvcHMudXNlTW9kZWxOb3RlcyhzbmFwc2hvdCA9PiBzbmFwc2hvdClcclxuICByZXR1cm4gPE1vZGVsTm90ZXNGaWVsZHMgcHJvcHM9e3Byb3BzfSBzdGF0ZT17c3RhdGV9IC8+XHJcbn1cclxuXHJcbi8qKiBIZWFkaW5nLCBoaW50LCBvbmUgZmllbGRzZXQgcGVyIHNhdmVkIGF1dGhvcml6ZWQgbW9kZWwsIGFuZCB0aGUgZm9ybSdzIHNhdmUuICovXHJcbmZ1bmN0aW9uIE1vZGVsTm90ZXNGaWVsZHMoeyBwcm9wcywgc3RhdGUgfToge1xyXG4gIHJlYWRvbmx5IHByb3BzOiBNb2RlbE5vdGVzU2VjdGlvblByb3BzXHJcbiAgcmVhZG9ubHkgc3RhdGU6IE1vZGVsTm90ZXNTdGF0ZVxyXG59KSB7XHJcbiAgY29uc3QgeyB0IH0gPSBwcm9wc1xyXG4gIGNvbnN0IGhlYWRpbmdJZCA9IHVzZUlkKClcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtjc3Muc2VjdGlvbn0gYXJpYS1sYWJlbGxlZGJ5PXtoZWFkaW5nSWR9IGRhdGEtcGx1Z2luLW1vZGVsLW5vdGVzPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmludHJvfT5cclxuICAgICAgICA8aDMgY2xhc3NOYW1lPXtjc3MuaGVhZGluZ30gaWQ9e2hlYWRpbmdJZH0+e3QoJ3NlY3Rpb25UaXRsZScpfTwvaDM+XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPXtjc3MuaGludH0+e3QoJ3NlY3Rpb25IaW50Jyl9PC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPFNldHRpbmdzRm9ybSBsYWJlbHM9e2Zvcm1MYWJlbHModCl9IHN0YXRlPXtzdGF0ZX0gb25TYXZlPXtwcm9wcy5zYXZlfSBvbkRpc2NhcmQ9e3Byb3BzLmRpc2NhcmR9PlxyXG4gICAgICAgIHshc3RhdGUuc2VsZWN0aW9uQXZhaWxhYmxlXHJcbiAgICAgICAgICA/IDxwIGNsYXNzTmFtZT17Y3NzLmhpbnR9Pnt0KCdzZWxlY3Rpb25VbmF2YWlsYWJsZScpfTwvcD5cclxuICAgICAgICAgIDogc3RhdGUucm93cy5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9e2Nzcy5oaW50fT57dCgnc2VsZWN0aW9uRW1wdHknKX08L3A+XHJcbiAgICAgICAgICAgIDogKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3Mubm90ZXN9PlxyXG4gICAgICAgICAgICAgICAge3N0YXRlLnJvd3MubWFwKHJvdyA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBrZXk9e3Jvdy5rZXl9IGNsYXNzTmFtZT17Y3NzLm5vdGVHcm91cH0gZGF0YS1tb2RlbC1ub3RlLXJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT17Y3NzLmxlZ2VuZH0+e2Ake3Jvdy5wcm92aWRlcn0vJHtyb3cubW9kZWx9YH08L2xlZ2VuZD5cclxuICAgICAgICAgICAgICAgICAgICB7KFsnY2FwYWJpbGl0eScsICdzY2VuYXJpbyddIGFzIGNvbnN0KS5tYXAoZmllbGQgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGtleT17ZmllbGR9IGNsYXNzTmFtZT17Y3NzLm5vdGVGaWVsZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KGZpZWxkKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3NzLnRleHRhcmVhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtyb3dbZmllbGRdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshc3RhdGUud3JpdGFibGUgfHwgc3RhdGUuc2F2aW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHsgcHJvcHMuc2V0TW9kZWxOb3RlKHJvdy5rZXksIGZpZWxkLCBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIHtzdGF0ZS5jb25mbGljdGVkID8gPHAgY2xhc3NOYW1lPXtjc3MuY29uZmxpY3R9IHJvbGU9XCJzdGF0dXNcIj57dCgnY29uZmxpY3QnKX08L3A+IDogbnVsbH1cclxuICAgICAgPC9TZXR0aW5nc0Zvcm0+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKVxyXG59XHJcbiIsICIvKiogTG9jYWxlIGJ1bmRsZXMgZm9yIHRoZSBzdWJhZ2VudCBtb2RlbCBub3RlcyBwYW5lbC4gKi9cblxuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc0Zvcm1MYWJlbHMgfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wcmltaXRpdmVzJ1xuLy8gVHlwZS1vbmx5OiB0aGUgbnMgXHUyMTkyIGtleSB1bmlvbiBtZXJnZS4gYHJlZ2lzdGVyKE5TLCB7IHpoLCBlbiB9KWAgY2hlY2tzIGJvdGhcbi8vIGRpY3Rpb25hcmllcyBhZ2FpbnN0IGl0LCBzbyBhIGtleSBtaXNzaW5nIGZyb20gZWl0aGVyIGlzIGEgY29tcGlsZSBlcnJvci5cbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJ1xuXG4vKiogTG9jYWxlIGtleXMgdGhlIHBhbmVsIHJlbmRlcnMuICovXG5leHBvcnQgdHlwZSBNb2RlbE5vdGVzTG9jYWxlS2V5ID1cbiAgfCAndW5hdmFpbGFibGUnIHwgJ3JlYWRPbmx5JyB8ICdzYXZlJyB8ICdzYXZpbmcnIHwgJ3NhdmVGYWlsZWQnXG4gIHwgJ3NlY3Rpb25UaXRsZScgfCAnc2VjdGlvbkhpbnQnIHwgJ2NhcGFiaWxpdHknIHwgJ3NjZW5hcmlvJ1xuICB8ICdzZWxlY3Rpb25VbmF2YWlsYWJsZScgfCAnc2VsZWN0aW9uRW1wdHknIHwgJ2NvbmZsaWN0J1xuICB8ICdyZWZyZXNoTGFiZWwnIHwgJ3JlZnJlc2hCdXN5JyB8ICdyZWZyZXNoVXBkYXRlZCcgfCAncmVmcmVzaFVuY2hhbmdlZCcgfCAncmVmcmVzaEZhaWxlZCcgfCAncmVmcmVzaEluYWN0aXZlJ1xuICB8ICdyb3V0ZUFyaWEnXG5cbi8qKiBFbmdsaXNoIGNvcHkuICovXG5leHBvcnQgY29uc3QgZW46IFJlY29yZDxNb2RlbE5vdGVzTG9jYWxlS2V5LCBzdHJpbmc+ID0ge1xuICB1bmF2YWlsYWJsZTogJ1RoaXMgcGx1Z2luIGlzIG5vdCBsb2FkZWQsIHNvIGl0IGNhbm5vdCBiZSBjb25maWd1cmVkIHJpZ2h0IG5vdy4nLFxuICByZWFkT25seTogJ1RoaXMgZGVwbG95bWVudCBzdG9yZXMgc2V0dGluZ3MgcmVhZC1vbmx5LicsXG4gIHNhdmU6ICdTYXZlJyxcbiAgc2F2aW5nOiAnU2F2aW5nXHUyMDI2JyxcbiAgc2F2ZUZhaWxlZDogJ1RoZSBzYXZlIGNvdWxkIG5vdCBiZSBjb25maXJtZWQgYW5kIG1heSBoYXZlIGJlZW4gYXBwbGllZC4gWW91ciBkcmFmdCBpcyByZXRhaW5lZDsgY2hlY2sgdGhlIGN1cnJlbnQgc2V0dGluZ3MgYmVmb3JlIHRyeWluZyBhZ2Fpbi4nLFxuICBzZWN0aW9uVGl0bGU6ICdNb2RlbCBub3RlcycsXG4gIHNlY3Rpb25IaW50OiAnRGVzY3JpYmUgd2hhdCBlYWNoIGFsbG93ZWQgbW9kZWwgaXMgZ29vZCBhdCBhbmQgd2hlbiB0byB1c2UgaXQuIEFnZW50cyByZWFkIHRoZXNlIG5vdGVzIGZvciByZWZlcmVuY2Ugd2hlbiB0aGV5IGNob29zZSBhIHN1YmFnZW50IG1vZGVsLiBDaGFuZ2VzIGFwcGx5IHRvIG5ldyBzZXNzaW9uczsgcmVmcmVzaCBhbiBleGlzdGluZyBzZXNzaW9uIGZyb20gaXRzIGhlYWRlci4nLFxuICBjYXBhYmlsaXR5OiAnQ2FwYWJpbGl0eScsXG4gIHNjZW5hcmlvOiAnU2NlbmFyaW8nLFxuICBzZWxlY3Rpb25VbmF2YWlsYWJsZTogJ1N1YmFnZW50IG1vZGVsIHNlbGVjdGlvbiBpcyB1bmF2YWlsYWJsZSwgc28gbW9kZWwgbm90ZXMgY2Fubm90IGJlIGVkaXRlZCByaWdodCBub3cuJyxcbiAgc2VsZWN0aW9uRW1wdHk6ICdUdXJuIG9uIG1vZGVsIHNlbGVjdGlvbiBhYm92ZSwgY2hlY2sgbW9kZWxzLCBhbmQgc2F2ZS4gRWFjaCBzYXZlZCBtb2RlbCB0aGVuIGdldHMgaXRzIG5vdGUgZmllbGRzIGhlcmUuJyxcbiAgY29uZmxpY3Q6ICdUaGVzZSBub3RlcyBjaGFuZ2VkIHdoaWxlIHlvdSB3ZXJlIGVkaXRpbmcuIFlvdXIgZHJhZnQgY2Fubm90IGJlIHNhdmVkIGFnYWluc3QgdGhlIG5ld2VyIHZhbHVlcy4gTGVhdmUgdGhpcyBwYWdlIHRvIGRpc2NhcmQgdGhlIGRyYWZ0LCBjaGVjayB0aGUgY3VycmVudCBub3RlcywgdGhlbiBlZGl0IGFnYWluLicsXG4gIHJlZnJlc2hMYWJlbDogJ1JlZnJlc2ggc3ViYWdlbnQgbW9kZWwgbm90ZXMgZm9yIHRoaXMgc2Vzc2lvbicsXG4gIHJlZnJlc2hCdXN5OiAnUmVmcmVzaGluZyBzdWJhZ2VudCBtb2RlbCBub3Rlc1x1MjAyNicsXG4gIHJlZnJlc2hVcGRhdGVkOiAnU3ViYWdlbnQgbW9kZWwgbm90ZXMgdXBkYXRlZDsgdGhlIG5leHQgbWVzc2FnZSB3aWxsIHVzZSB0aGUgbmV3IGxpc3QuJyxcbiAgcmVmcmVzaFVuY2hhbmdlZDogJ1N1YmFnZW50IG1vZGVsIG5vdGVzIGFyZSBhbHJlYWR5IHVwIHRvIGRhdGUuJyxcbiAgcmVmcmVzaEZhaWxlZDogJ0NvdWxkIG5vdCByZWZyZXNoIHN1YmFnZW50IG1vZGVsIG5vdGVzLiBUcnkgYWdhaW4uJyxcbiAgcmVmcmVzaEluYWN0aXZlOiAnVGhpcyBzZXNzaW9uIGlzIG5vdCBhY3RpdmUgeWV0LiBTZW5kIGEgbWVzc2FnZSwgdGhlbiByZWZyZXNoIGFnYWluLicsXG4gIHJvdXRlQXJpYTogJ0N1cnJlbnQgbW9kZWw6IHtyb3V0ZX0nLFxufVxuXG4vKiogU2ltcGxpZmllZCBDaGluZXNlIGNvcHkuICovXG5leHBvcnQgY29uc3Qgemg6IFJlY29yZDxNb2RlbE5vdGVzTG9jYWxlS2V5LCBzdHJpbmc+ID0ge1xuICB1bmF2YWlsYWJsZTogJ1x1OEJFNVx1NjNEMlx1NEVGNlx1NUY1M1x1NTI0RFx1NjcyQVx1NTJBMFx1OEY3RFx1RkYwQ1x1NjY4Mlx1NjVGNlx1NjVFMFx1NkNENVx1OTE0RFx1N0Y2RVx1MzAwMicsXG4gIHJlYWRPbmx5OiAnXHU2NzJDXHU5MEU4XHU3RjcyXHU3Njg0XHU4QkJFXHU3RjZFXHU0RTNBXHU1M0VBXHU4QkZCXHUzMDAyJyxcbiAgc2F2ZTogJ1x1NEZERFx1NUI1OCcsXG4gIHNhdmluZzogJ1x1NEZERFx1NUI1OFx1NEUyRFx1MjAyNicsXG4gIHNhdmVGYWlsZWQ6ICdcdTY1RTBcdTZDRDVcdTc4NkVcdThCQTRcdTRGRERcdTVCNThcdTdFRDNcdTY3OUNcdUZGMENcdThCQkVcdTdGNkVcdTUzRUZcdTgwRkRcdTVERjJcdTdFQ0ZcdTc1MUZcdTY1NDhcdTMwMDJcdTgzNDlcdTdBM0ZcdTVERjJcdTRGRERcdTc1NTlcdUZGMUJcdThCRjdcdTUxNDhcdTY4MzhcdTVCRjlcdTVGNTNcdTUyNERcdThCQkVcdTdGNkVcdTUxOERcdTkxQ0RcdThCRDVcdTMwMDInLFxuICBzZWN0aW9uVGl0bGU6ICdcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEUnLFxuICBzZWN0aW9uSGludDogJ1x1NEUzQVx1NkJDRlx1NEUyQVx1NURGMlx1NjM4OFx1Njc0M1x1NzY4NFx1NkEyMVx1NTc4Qlx1NTg2Qlx1NTE5OVx1ODBGRFx1NTI5Qlx1OEJGNFx1NjYwRVx1NTQ4Q1x1OTAwMlx1NzUyOFx1NTczQVx1NjY2Rlx1RkYwQ1x1NEY5Qlx1NjY3QVx1ODBGRFx1NEY1M1x1OTAwOVx1NjJFOVx1NUI1MFx1NEVFM1x1NzQwNlx1NkEyMVx1NTc4Qlx1NjVGNlx1NTNDMlx1ODAwM1x1MzAwMlx1NjZGNFx1NjUzOVx1OUVEOFx1OEJBNFx1NEVDNVx1NUJGOVx1NjVCMFx1NEYxQVx1OEJERFx1NzUxRlx1NjU0OFx1RkYxQlx1NURGMlx1NjcwOVx1NEYxQVx1OEJERFx1NTNFRlx1NTcyOFx1NEYxQVx1OEJERFx1NTkzNFx1OTBFOFx1NjI0Qlx1NTJBOFx1NTIzN1x1NjVCMFx1MzAwMicsXG4gIGNhcGFiaWxpdHk6ICdcdTgwRkRcdTUyOUJcdThCRjRcdTY2MEUnLFxuICBzY2VuYXJpbzogJ1x1OTAwMlx1NzUyOFx1NTczQVx1NjY2RicsXG4gIHNlbGVjdGlvblVuYXZhaWxhYmxlOiAnXHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU5MDA5XHU2MkU5XHU1RjUzXHU1MjREXHU0RTBEXHU1M0VGXHU3NTI4XHVGRjBDXHU2NjgyXHU2NUY2XHU2NUUwXHU2Q0Q1XHU3RjE2XHU4RjkxXHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFJyxcbiAgc2VsZWN0aW9uRW1wdHk6ICdcdTU3MjhcdTRFMEFcdTY1QjlcdTVGMDBcdTU0MkZcdTZBMjFcdTU3OEJcdTkwMDlcdTYyRTlcdTMwMDFcdTUyRkVcdTkwMDlcdTZBMjFcdTU3OEJcdTVFNzZcdTRGRERcdTVCNThcdTU0MEVcdUZGMENcdTUzRUZcdTU3MjhcdThGRDlcdTkxQ0NcdTRFM0FcdTZCQ0ZcdTRFMkFcdTVERjJcdTRGRERcdTVCNThcdTc2ODRcdTZBMjFcdTU3OEJcdTU4NkJcdTUxOTlcdThCRjRcdTY2MEUnLFxuICBjb25mbGljdDogJ1x1N0YxNlx1OEY5MVx1NjcxRlx1OTVGNFx1OEJGNFx1NjYwRVx1NURGMlx1NTNEMVx1NzUxRlx1NTNEOFx1NTMxNlx1RkYwQ1x1NjVFMFx1NkNENVx1NTdGQVx1NEU4RVx1OEY4M1x1NjVCMFx1NzY4NFx1NTAzQ1x1NEZERFx1NUI1OFx1ODM0OVx1N0EzRlx1MzAwMlx1OEJGN1x1NzlCQlx1NUYwMFx1NkI2NFx1OTg3NVx1OTc2Mlx1NjUzRVx1NUYwM1x1ODM0OVx1N0EzRlx1RkYwQ1x1NjgzOFx1NUJGOVx1NUY1M1x1NTI0RFx1OEJGNFx1NjYwRVx1NTQwRVx1OTFDRFx1NjVCMFx1N0YxNlx1OEY5MVx1MzAwMicsXG4gIHJlZnJlc2hMYWJlbDogJ1x1NTIzN1x1NjVCMFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERFx1NzY4NFx1NUI1MFx1NEVFM1x1NzQwNlx1NkEyMVx1NTc4Qlx1OEJGNFx1NjYwRScsXG4gIHJlZnJlc2hCdXN5OiAnXHU2QjYzXHU1NzI4XHU1MjM3XHU2NUIwXHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFXHUyMDI2JyxcbiAgcmVmcmVzaFVwZGF0ZWQ6ICdcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEVcdTVERjJcdTY2RjRcdTY1QjBcdUZGMENcdTRFMEJcdTRFMDBcdTY3NjFcdTZEODhcdTYwNkZcdTVDMDZcdTRGN0ZcdTc1MjhcdTY1QjBcdTUyMTdcdTg4NjhcdTMwMDInLFxuICByZWZyZXNoVW5jaGFuZ2VkOiAnXHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFXHU1REYyXHU2NjJGXHU2NzAwXHU2NUIwXHUzMDAyJyxcbiAgcmVmcmVzaEZhaWxlZDogJ1x1NTIzN1x1NjVCMFx1NUI1MFx1NEVFM1x1NzQwNlx1NkEyMVx1NTc4Qlx1OEJGNFx1NjYwRVx1NTkzMVx1OEQyNVx1RkYwQ1x1OEJGN1x1OTFDRFx1OEJENVx1MzAwMicsXG4gIHJlZnJlc2hJbmFjdGl2ZTogJ1x1NUY1M1x1NTI0RFx1NEYxQVx1OEJERFx1NUMxQVx1NjcyQVx1NkZDMFx1NkQzQlx1RkYwQ1x1OEJGN1x1NTE0OFx1NTNEMVx1OTAwMVx1NEUwMFx1Njc2MVx1NkQ4OFx1NjA2Rlx1NTE4RFx1NTIzN1x1NjVCMFx1MzAwMicsXG4gIHJvdXRlQXJpYTogJ1x1NUY1M1x1NTI0RFx1NkEyMVx1NTc4Qlx1RkYxQXtyb3V0ZX0nLFxufVxuXG4vKipcbiAqIFRoZSBmb3JtIGZyYW1lJ3MgY29weSwgcmVhZCBmcm9tIHRoaXMgcGFuZWwncyBkaWN0aW9uYXJ5LlxuICogQHBhcmFtIHQgLSB0aGUgcGFuZWwncyBsb2NhbGUgcmVhZGVyLlxuICogQHJldHVybnMgdGhlIGxhYmVscyB0aGUgc2hhcmVkIHNldHRpbmdzIGZvcm0gcmVuZGVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1MYWJlbHModDogKGtleTogTW9kZWxOb3Rlc0xvY2FsZUtleSkgPT4gc3RyaW5nKTogU2V0dGluZ3NGb3JtTGFiZWxzIHtcbiAgcmV0dXJuIHtcbiAgICB1bmF2YWlsYWJsZTogdCgndW5hdmFpbGFibGUnKSxcbiAgICByZWFkT25seTogdCgncmVhZE9ubHknKSxcbiAgICBzYXZlRmFpbGVkOiB0KCdzYXZlRmFpbGVkJyksXG4gICAgc2F2ZTogdCgnc2F2ZScpLFxuICAgIHNhdmluZzogdCgnc2F2aW5nJyksXG4gIH1cbn1cbiIsICJleHBvcnQgZGVmYXVsdCB7XCJzZWN0aW9uXCI6XCJzZWN0aW9uXzFmY2ZjOTY3XCIsXCJpbnRyb1wiOlwiaW50cm9fMWZjZmM5NjdcIixcImhlYWRpbmdcIjpcImhlYWRpbmdfMWZjZmM5NjdcIixcImhpbnRcIjpcImhpbnRfMWZjZmM5NjdcIixcImNvbmZsaWN0XCI6XCJjb25mbGljdF8xZmNmYzk2N1wiLFwibm90ZXNcIjpcIm5vdGVzXzFmY2ZjOTY3XCIsXCJub3RlR3JvdXBcIjpcIm5vdGVHcm91cF8xZmNmYzk2N1wiLFwibm90ZUZpZWxkXCI6XCJub3RlRmllbGRfMWZjZmM5NjdcIixcImxlZ2VuZFwiOlwibGVnZW5kXzFmY2ZjOTY3XCIsXCJ0ZXh0YXJlYVwiOlwidGV4dGFyZWFfMWZjZmM5NjdcIn07IiwgIi8qKlxyXG4gKiBTdGFnZWQgZWRpdG9yIGZvciBzdWJhZ2VudCBtb2RlbCBub3Rlcy5cclxuICpcclxuICogVGhlIHBhbmVsIGVkaXRzIGBtb2RlbE5vdGVzYCBpbiB0aGlzIHBsdWdpbidzIEhvc3QgZW50cnkgYW5kIHJlYWRzLCB3aXRob3V0XHJcbiAqIHdyaXRpbmcsIHRoZSByb3V0ZXMgdGhlIG9mZmljaWFsIHN1YmFnZW50IG1vZGVsIGF1dGhvcml6YXRpb24gc2F2ZWQuIEEgbm90ZVxyXG4gKiBmaWVsZCBpcyBvZmZlcmVkIGZvciBldmVyeSBzYXZlZCBhdXRob3JpemVkIHJvdXRlOyBub3RlcyBvZiBvdGhlciByb3V0ZXMgc3RheVxyXG4gKiBpbiB0aGUgZHJhZnQgYW5kIGluIGV2ZXJ5IHNhdmUsIHNvIGEgcm91dGUgdGhlIHVzZXIgdW5jaGVja3MgYW5kIGNoZWNrcyBhZ2FpblxyXG4gKiBnZXRzIGl0cyBub3RlIGJhY2suXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlU25hcHNob3RTdG9yZSwgdHlwZSBTbmFwc2hvdFN0b3JlIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtc3RvcmUnXHJcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NGb3JtU2NvcGUsIFNldHRpbmdzRm9ybVNoZWxsIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktcHJpbWl0aXZlcydcclxuXHJcbi8qKiBIb3N0IGNvbmZpZ3VyYXRpb24gZW50cnkgaWQgdGhpcyBwYW5lbCBlZGl0cy4gKi9cclxuZXhwb3J0IGNvbnN0IE1PREVMX05PVEVTX0VOVFJZX0lEID0gJ3RlYW0tbW9kZWwtcm91dGluZy1zZXR0aW5ncydcclxuXHJcbi8qKiBPZmZpY2lhbCBIb3N0IGVudHJ5IGhvbGRpbmcgdGhlIHN1YmFnZW50IG1vZGVsIGF1dGhvcml6YXRpb247IHJlYWQgb25seS4gKi9cclxuZXhwb3J0IGNvbnN0IFNVQkFHRU5UX01PREVMX1NFTEVDVElPTl9FTlRSWV9JRCA9ICdzdWJhZ2VudC1tb2RlbC1zZWxlY3Rpb24tc2V0dGluZ3MnXHJcblxyXG4vKiogT25lIGV4YWN0IHByb3ZpZGVyL21vZGVsIHJvdXRlLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsUm91dGUge1xyXG4gIHByb3ZpZGVyOiBzdHJpbmdcclxuICBtb2RlbDogc3RyaW5nXHJcbn1cclxuXHJcbi8qKiBFZGl0YWJsZSBub3RlIGZvciBvbmUgZXhhY3Qgcm91dGUuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxOb3RlIGV4dGVuZHMgTW9kZWxSb3V0ZSB7XHJcbiAgY2FwYWJpbGl0eTogc3RyaW5nXHJcbiAgc2NlbmFyaW86IHN0cmluZ1xyXG59XHJcblxyXG4vKiogRmllbGRzIHRoaXMgcGFuZWwgcmVhZHMgYW5kIHdyaXRlcyBpbiBpdHMgb3duIGVudHJ5LiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNTZXR0aW5ncyB7XHJcbiAgLyoqIFNhdmVkIG5vdGVzLCBpbmNsdWRpbmcgbm90ZXMgb2Ygcm91dGVzIG5vdCBjdXJyZW50bHkgYXV0aG9yaXplZC4gKi9cclxuICBtb2RlbE5vdGVzOiBNb2RlbE5vdGVbXVxyXG59XHJcblxyXG4vKiogRmllbGRzIHRoaXMgcGFuZWwgcmVhZHMgZnJvbSB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeS4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3Mge1xyXG4gIC8qKiBXaGV0aGVyIG5ldyBTZXNzaW9ucyByZWNlaXZlIGV4cGxpY2l0IHN1YmFnZW50IG1vZGVsIHNlbGVjdGlvbi4gKi9cclxuICBlbmFibGVkOiBib29sZWFuXHJcbiAgLyoqIEV4YWN0IHJvdXRlcyBuZXcgU2Vzc2lvbnMgbWF5IHNlbGVjdC4gKi9cclxuICBhbGxvd2VkTW9kZWxzOiBNb2RlbFJvdXRlW11cclxufVxyXG5cclxuLyoqIE9uZSBhdXRob3JpemVkIHJvdXRlIHdpdGggaXRzIGRyYWZ0IG5vdGUuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxOb3RlUm93IGV4dGVuZHMgTW9kZWxOb3RlIHtcclxuICAvKiogU3RhYmxlIG9wYXF1ZSBpZGVudGl0eSB1c2VkIG9ubHkgZm9yIGxvb2t1cCBhbmQgYXMgdGhlIFJlYWN0IGtleS4gKi9cclxuICBrZXk6IHN0cmluZ1xyXG59XHJcblxyXG4vKiogU3RhdGUgcmVuZGVyZWQgYnkgdGhlIG5vdGVzIHBhbmVsLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNTdGF0ZSBleHRlbmRzIFNldHRpbmdzRm9ybVNoZWxsIHtcclxuICAvKiogV2hldGhlciB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeSBpcyBzZXJ2ZWQgYW5kIHJlYWQuICovXHJcbiAgc2VsZWN0aW9uQXZhaWxhYmxlOiBib29sZWFuXHJcbiAgLyoqIFNhdmVkIGF1dGhvcml6ZWQgcm91dGVzIHdpdGggdGhlaXIgZHJhZnQgbm90ZXMsIGluIGF1dGhvcml6YXRpb24gb3JkZXIuICovXHJcbiAgcm93czogcmVhZG9ubHkgTW9kZWxOb3RlUm93W11cclxuICAvKiogV2hldGhlciBhIG5ld2VyIEhvc3QgcmV2aXNpb24gaW52YWxpZGF0ZWQgdGhlIGN1cnJlbnQgZHJhZnQuICovXHJcbiAgY29uZmxpY3RlZDogYm9vbGVhblxyXG59XHJcblxyXG4vKiogUmVnaXN0cmF0aW9uLXNpZGUgZmFjZSBmb3IgdGhlIG5vdGVzIHBhbmVsLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNGYWNlIHtcclxuICBob29rczoge1xyXG4gICAgLyoqIFBhbmVsIHNuYXBzaG90IGJvdW5kIGJ5IHRoZSByZW5kZXJlciBhcyB1c2VNb2RlbE5vdGVzLiAqL1xyXG4gICAgbW9kZWxOb3RlczogU25hcHNob3RTdG9yZTxNb2RlbE5vdGVzU3RhdGU+XHJcbiAgfVxyXG4gIC8qKiBTdGFnZSBvbmUgbm90ZSBmaWVsZCBvZiBhbiBhdXRob3JpemVkIHJvdXRlLiAqL1xyXG4gIHNldE1vZGVsTm90ZTogKGtleTogc3RyaW5nLCBmaWVsZDogJ2NhcGFiaWxpdHknIHwgJ3NjZW5hcmlvJywgdmFsdWU6IHN0cmluZykgPT4gdm9pZFxyXG4gIC8qKiBQZXJzaXN0IGV2ZXJ5IG5vdGUgYXMgb25lIHJldmlzaW9uLWZlbmNlZCBtdXRhdGlvbi4gKi9cclxuICBzYXZlOiAoKSA9PiB2b2lkXHJcbiAgLyoqIERyb3AgdGhlIHN0YWdlZCBub3Rlcy4gKi9cclxuICBkaXNjYXJkOiAoKSA9PiB2b2lkXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFibGUgaWRlbnRpdHkgZm9yIG9uZSBleGFjdCByb3V0ZTsgY2FsbGVycyByZXNvbHZlIGl0IGJ5IGxvb2t1cCBhbmQgbmV2ZXIgcGFyc2UgaXQuXHJcbiAqIEBwYXJhbSByb3V0ZSAtIHByb3ZpZGVyL21vZGVsIHJvdXRlIHRvIGlkZW50aWZ5LlxyXG4gKiBAcmV0dXJucyBvcGFxdWUga2V5IGZvciBsb29rdXAgd2l0aGluIHRoZSBwYW5lbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtb2RlbE5vdGVLZXkocm91dGU6IE1vZGVsUm91dGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBgJHtyb3V0ZS5wcm92aWRlcn1cXDAke3JvdXRlLm1vZGVsfWBcclxufVxyXG5cclxuLyoqIERyb3Agbm90ZXMgd2l0aG91dCB0ZXh0IHNvIGNsZWFyaW5nIGJvdGggZmllbGRzIGVxdWFscyBuZXZlciB3cml0aW5nIHRoZW0uICovXHJcbmZ1bmN0aW9uIG1lYW5pbmdmdWwobm90ZXM6IEl0ZXJhYmxlPE1vZGVsTm90ZT4pOiBNb2RlbE5vdGVbXSB7XHJcbiAgcmV0dXJuIFsuLi5ub3Rlc11cclxuICAgIC5maWx0ZXIobm90ZSA9PiBub3RlLmNhcGFiaWxpdHkgIT09ICcnIHx8IG5vdGUuc2NlbmFyaW8gIT09ICcnKVxyXG4gICAgLm1hcChub3RlID0+ICh7IHByb3ZpZGVyOiBub3RlLnByb3ZpZGVyLCBtb2RlbDogbm90ZS5tb2RlbCwgY2FwYWJpbGl0eTogbm90ZS5jYXBhYmlsaXR5LCBzY2VuYXJpbzogbm90ZS5zY2VuYXJpbyB9KSlcclxufVxyXG5cclxuLyoqIENvbXBhcmUgbm90ZSBsaXN0cyBhcyBzZXRzIGtleWVkIGJ5IHJvdXRlLiAqL1xyXG5mdW5jdGlvbiBzYW1lTm90ZXMobGVmdDogcmVhZG9ubHkgTW9kZWxOb3RlW10sIHJpZ2h0OiByZWFkb25seSBNb2RlbE5vdGVbXSk6IGJvb2xlYW4ge1xyXG4gIGlmIChsZWZ0Lmxlbmd0aCAhPT0gcmlnaHQubGVuZ3RoKSByZXR1cm4gZmFsc2VcclxuICBjb25zdCBub3RlcyA9IG5ldyBNYXAobGVmdC5tYXAobm90ZSA9PiBbbW9kZWxOb3RlS2V5KG5vdGUpLCBub3RlXSkpXHJcbiAgcmV0dXJuIHJpZ2h0LmV2ZXJ5KChub3RlKSA9PiB7XHJcbiAgICBjb25zdCBvdGhlciA9IG5vdGVzLmdldChtb2RlbE5vdGVLZXkobm90ZSkpXHJcbiAgICByZXR1cm4gb3RoZXIgIT09IHVuZGVmaW5lZCAmJiBvdGhlci5jYXBhYmlsaXR5ID09PSBub3RlLmNhcGFiaWxpdHkgJiYgb3RoZXIuc2NlbmFyaW8gPT09IG5vdGUuc2NlbmFyaW9cclxuICB9KVxyXG59XHJcblxyXG4vKiogQnJpZGdlcyB0aGlzIHBsdWdpbidzIGVudHJ5IGFuZCB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeSBvbnRvIGEgc3RhZ2VkIHBhbmVsLiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kZWxOb3Rlc0NvbnRyb2xsZXIge1xyXG4gIHByaXZhdGUgZHJhZnROb3RlczogTWFwPHN0cmluZywgTW9kZWxOb3RlPiB8IHVuZGVmaW5lZFxyXG4gIHByaXZhdGUgZHJhZnRSZXZpc2lvbjogbnVtYmVyIHwgdW5kZWZpbmVkXHJcbiAgcHJpdmF0ZSBzYXZpbmcgPSBmYWxzZVxyXG4gIHByaXZhdGUgZmFpbGVkID0gZmFsc2VcclxuICBwcml2YXRlIG91dGNvbWVVbmtub3duID0gZmFsc2VcclxuICBwcml2YXRlIGNvbmZsaWN0ZWQgPSBmYWxzZVxyXG4gIHByaXZhdGUgZGlzcG9zZWQgPSBmYWxzZVxyXG4gIHByaXZhdGUgc2F2ZUdlbmVyYXRpb24gPSAwXHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdG9yZTogU25hcHNob3RTdG9yZTxNb2RlbE5vdGVzU3RhdGU+XHJcbiAgcHJpdmF0ZSByZWFkb25seSB1bnN1YnNjcmliZTogKCkgPT4gdm9pZFxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gc2NvcGUgLSBib3VuZCBgdGVhbS1tb2RlbC1yb3V0aW5nLXNldHRpbmdzYCBjb25maWd1cmF0aW9uIGZvcm0uXHJcbiAgICogQHBhcmFtIHNlbGVjdGlvbiAtIGJvdW5kIG9mZmljaWFsIGBzdWJhZ2VudC1tb2RlbC1zZWxlY3Rpb24tc2V0dGluZ3NgIGZvcm0sIHJlYWQgb25seS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IFNldHRpbmdzRm9ybVNjb3BlPE1vZGVsTm90ZXNTZXR0aW5ncz4sXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdGlvbjogU2V0dGluZ3NGb3JtU2NvcGU8U3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzPixcclxuICApIHtcclxuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTbmFwc2hvdFN0b3JlKHRoaXMucHJvamVjdGlvbigpKVxyXG4gICAgY29uc3Qgb2ZmU2NvcGUgPSBzY29wZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLm9uU2NvcGVDaGFuZ2UoKSB9KVxyXG4gICAgY29uc3Qgb2ZmU2VsZWN0aW9uID0gc2VsZWN0aW9uLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMucHVibGlzaCgpIH0pXHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gKCkgPT4geyBvZmZTY29wZSgpOyBvZmZTZWxlY3Rpb24oKSB9XHJcbiAgfVxyXG5cclxuICAvKiogU3RvcCBvYnNlcnZpbmcgc2V0dGluZ3MgYW5kIHN1cHByZXNzIGxhdGUgd3JpdGUgc2V0dGxlbWVudHMuICovXHJcbiAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlXHJcbiAgICB0aGlzLnNhdmVHZW5lcmF0aW9uICs9IDFcclxuICAgIHRoaXMudW5zdWJzY3JpYmUoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIHJlbmRlcmVyIGZhY2UgZm9yIHRoaXMgcGFuZWwuXHJcbiAgICogQHJldHVybnMgdGhlIHNuYXBzaG90IGFuZCBzdGFnZWQgcGFuZWwgYWN0aW9ucyBpbmplY3RlZCBpbnRvIHRoZSByZW5kZXJlci5cclxuICAgKi9cclxuICBpbmplY3QoKTogTW9kZWxOb3Rlc0ZhY2Uge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaG9va3M6IHsgbW9kZWxOb3RlczogdGhpcy5zdG9yZSB9LFxyXG4gICAgICBzZXRNb2RlbE5vdGU6IChrZXksIGZpZWxkLCB2YWx1ZSkgPT4geyB0aGlzLnNldE1vZGVsTm90ZShrZXksIGZpZWxkLCB2YWx1ZSkgfSxcclxuICAgICAgc2F2ZTogKCkgPT4geyB2b2lkIHRoaXMuc2F2ZSgpIH0sXHJcbiAgICAgIGRpc2NhcmQ6ICgpID0+IHsgdGhpcy5kaXNjYXJkKCkgfSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBEcm9wIHRoZSBkcmFmdCBhbmQgYW55IHBlbmRpbmcgc2F2ZSBhZnRlciB0aGUgY29ubmVjdGlvbiB0byB0aGUgSG9zdCB3YXMgcmVwbGFjZWQuICovXHJcbiAgcmVzZXRDb25uZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzcG9zZWQpIHJldHVyblxyXG4gICAgdGhpcy5zYXZlR2VuZXJhdGlvbiArPSAxXHJcbiAgICB0aGlzLnNhdmluZyA9IGZhbHNlXHJcbiAgICB0aGlzLmNsZWFyRHJhZnQoKVxyXG4gICAgdGhpcy5wdWJsaXNoKClcclxuICB9XHJcblxyXG4gIC8qKiBSZS1kZXJpdmUgdGhlIGRyYWZ0IGFnYWluc3QgYSBIb3N0IHJldmlzaW9uIHRoZSBtaXJyb3IganVzdCBwdWJsaXNoZWQuICovXHJcbiAgcHJpdmF0ZSBvblNjb3BlQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzcG9zZWQpIHJldHVyblxyXG4gICAgaWYgKCF0aGlzLnNhdmluZyAmJiB0aGlzLmRyYWZ0Tm90ZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjb3BlLmdldFNuYXBzaG90KCkucmV2aXNpb24gIT09IHRoaXMuZHJhZnRSZXZpc2lvbikge1xyXG4gICAgICBpZiAoc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIHRoaXMuZGVzaXJlZE5vdGVzKCkpKSB0aGlzLmNsZWFyRHJhZnQoKVxyXG4gICAgICBlbHNlIHRoaXMuY29uZmxpY3RlZCA9IHRydWVcclxuICAgIH1cclxuICAgIHRoaXMucHVibGlzaCgpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGN1cnJlbnROb3RlcygpOiBNb2RlbE5vdGVbXSB7XHJcbiAgICByZXR1cm4gbWVhbmluZ2Z1bCh0aGlzLnNjb3BlLmdldFNuYXBzaG90KCkudmFsdWU/Lm1vZGVsTm90ZXMgPz8gW10pXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlc2lyZWROb3RlcygpOiBNb2RlbE5vdGVbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcmFmdE5vdGVzID09PSB1bmRlZmluZWQgPyB0aGlzLmN1cnJlbnROb3RlcygpIDogbWVhbmluZ2Z1bCh0aGlzLmRyYWZ0Tm90ZXMudmFsdWVzKCkpXHJcbiAgfVxyXG5cclxuICAvKiogUm91dGVzIHRoZSBvZmZpY2lhbCBlbnRyeSBzYXZlZCBhcyBhdXRob3JpemVkOyBlbXB0eSB3aGlsZSBzZWxlY3Rpb24gaXMgb2ZmIG9yIHVuc2VydmVkLiAqL1xyXG4gIHByaXZhdGUgYXV0aG9yaXplZFJvdXRlcygpOiBNb2RlbFJvdXRlW10ge1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLnNlbGVjdGlvbi5nZXRTbmFwc2hvdCgpXHJcbiAgICBpZiAoc25hcHNob3Quc3RhdHVzICE9PSAncmVhZHknIHx8IHNuYXBzaG90LnZhbHVlPy5lbmFibGVkICE9PSB0cnVlKSByZXR1cm4gW11cclxuICAgIHJldHVybiBzbmFwc2hvdC52YWx1ZS5hbGxvd2VkTW9kZWxzLm1hcChyb3V0ZSA9PiAoeyBwcm92aWRlcjogcm91dGUucHJvdmlkZXIsIG1vZGVsOiByb3V0ZS5tb2RlbCB9KSlcclxuICB9XHJcblxyXG4gIHByaXZhdGUgd3JpdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKVxyXG4gICAgcmV0dXJuICF0aGlzLmRpc3Bvc2VkICYmIHNuYXBzaG90LnN0YXR1cyA9PT0gJ3JlYWR5JyAmJiBzbmFwc2hvdC53cml0YWJsZSAmJiAhdGhpcy5zYXZpbmdcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0TW9kZWxOb3RlKGtleTogc3RyaW5nLCBmaWVsZDogJ2NhcGFiaWxpdHknIHwgJ3NjZW5hcmlvJywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLndyaXRhYmxlKCkpIHJldHVyblxyXG4gICAgY29uc3Qgcm91dGUgPSB0aGlzLmF1dGhvcml6ZWRSb3V0ZXMoKS5maW5kKGNhbmRpZGF0ZSA9PiBtb2RlbE5vdGVLZXkoY2FuZGlkYXRlKSA9PT0ga2V5KVxyXG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgaWYgKHRoaXMuZHJhZnROb3RlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZHJhZnROb3RlcyA9IG5ldyBNYXAodGhpcy5jdXJyZW50Tm90ZXMoKS5tYXAobm90ZSA9PiBbbW9kZWxOb3RlS2V5KG5vdGUpLCBub3RlXSkpXHJcbiAgICAgIHRoaXMuZHJhZnRSZXZpc2lvbiA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS5yZXZpc2lvblxyXG4gICAgfVxyXG4gICAgY29uc3Qgbm90ZSA9IHRoaXMuZHJhZnROb3Rlcy5nZXQoa2V5KSA/PyB7IC4uLnJvdXRlLCBjYXBhYmlsaXR5OiAnJywgc2NlbmFyaW86ICcnIH1cclxuICAgIHRoaXMuZHJhZnROb3Rlcy5zZXQoa2V5LCB7IC4uLm5vdGUsIFtmaWVsZF06IHZhbHVlIH0pXHJcbiAgICBpZiAoIXRoaXMub3V0Y29tZVVua25vd24pIHRoaXMuZmFpbGVkID0gZmFsc2VcclxuICAgIHRoaXMucHVibGlzaCgpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyRHJhZnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyYWZ0Tm90ZXMgPSB1bmRlZmluZWRcclxuICAgIHRoaXMuZHJhZnRSZXZpc2lvbiA9IHVuZGVmaW5lZFxyXG4gICAgdGhpcy5mYWlsZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5vdXRjb21lVW5rbm93biA9IGZhbHNlXHJcbiAgICB0aGlzLmNvbmZsaWN0ZWQgPSBmYWxzZVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNjYXJkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2F2aW5nKSByZXR1cm5cclxuICAgIHRoaXMuY2xlYXJEcmFmdCgpXHJcbiAgICB0aGlzLnB1Ymxpc2goKVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBzYXZlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KClcclxuICAgIGNvbnN0IG5vdGVzID0gdGhpcy5kZXNpcmVkTm90ZXMoKVxyXG4gICAgaWYgKHRoaXMuZGlzcG9zZWQgfHwgc25hcHNob3Quc3RhdHVzICE9PSAncmVhZHknIHx8ICFzbmFwc2hvdC53cml0YWJsZSB8fCB0aGlzLnNhdmluZykgcmV0dXJuXHJcbiAgICBpZiAoc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIG5vdGVzKSkgcmV0dXJuXHJcbiAgICAvLyBBbiB1bnRvdWNoZWQgZm9ybSBoYXMgbm8gZHJhZnQgYW5kIHJldHVybmVkIGFib3ZlOyB0aGUgZmVuY2UgaXMgdGhlXHJcbiAgICAvLyByZXZpc2lvbiB0aGUgZHJhZnQgc3RhcnRlZCBmcm9tLCBzbyBhIHN0YWxlIGRyYWZ0IG5ldmVyIG92ZXJ3cml0ZXMgYSBuZXdlciB2YWx1ZS5cclxuICAgIGNvbnN0IGZlbmNlID0gdGhpcy5kcmFmdFJldmlzaW9uXHJcbiAgICBpZiAoZmVuY2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuXHJcbiAgICBpZiAoc25hcHNob3QucmV2aXNpb24gIT09IGZlbmNlKSB7XHJcbiAgICAgIHRoaXMuY29uZmxpY3RlZCA9IHRydWVcclxuICAgICAgdGhpcy5wdWJsaXNoKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBnZW5lcmF0aW9uID0gdGhpcy5zYXZlR2VuZXJhdGlvblxyXG4gICAgdGhpcy5zYXZpbmcgPSB0cnVlXHJcbiAgICB0aGlzLmZhaWxlZCA9IGZhbHNlXHJcbiAgICB0aGlzLmNvbmZsaWN0ZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5wdWJsaXNoKClcclxuICAgIGxldCBhY2NlcHRlZDogYm9vbGVhblxyXG4gICAgdHJ5IHtcclxuICAgICAgYWNjZXB0ZWQgPSBhd2FpdCB0aGlzLnNjb3BlLm11dGF0ZShbeyBvcDogJ3NldCcsIHBhdGg6IFsnbW9kZWxOb3RlcyddLCB2YWx1ZTogbm90ZXMgfV0sIGZlbmNlKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgLy8gVGhlIHdyaXRlIG1heSBoYXZlIGxhbmRlZCBhbHRob3VnaCBpdHMgcmVzcG9uc2Ugd2FzIGxvc3Q7IGtlZXAgdGhlIGRyYWZ0IGFuZCByZXBvcnQgYW4gdW5rbm93biBvdXRjb21lLlxyXG4gICAgICBpZiAoZ2VuZXJhdGlvbiAhPT0gdGhpcy5zYXZlR2VuZXJhdGlvbiB8fCB0aGlzLmRpc3Bvc2VkKSByZXR1cm5cclxuICAgICAgdGhpcy5zYXZpbmcgPSBmYWxzZVxyXG4gICAgICB0aGlzLmZhaWxlZCA9IHRydWVcclxuICAgICAgdGhpcy5vdXRjb21lVW5rbm93biA9IHRydWVcclxuICAgICAgdGhpcy5jb25mbGljdGVkID0gdGhpcy5zY29wZS5nZXRTbmFwc2hvdCgpLnJldmlzaW9uICE9PSBmZW5jZVxyXG4gICAgICB0aGlzLnB1Ymxpc2goKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmIChnZW5lcmF0aW9uICE9PSB0aGlzLnNhdmVHZW5lcmF0aW9uIHx8IHRoaXMuZGlzcG9zZWQpIHJldHVyblxyXG4gICAgY29uc3QgbGFuZGVkID0gYWNjZXB0ZWQgJiYgc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIG5vdGVzKVxyXG4gICAgdGhpcy5zYXZpbmcgPSBmYWxzZVxyXG4gICAgdGhpcy5mYWlsZWQgPSAhbGFuZGVkXHJcbiAgICBpZiAobGFuZGVkKSB0aGlzLmNsZWFyRHJhZnQoKVxyXG4gICAgdGhpcy5vblNjb3BlQ2hhbmdlKClcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJvamVjdGlvbigpOiBNb2RlbE5vdGVzU3RhdGUge1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KClcclxuICAgIGNvbnN0IGRyYWZ0ZWQgPSB0aGlzLmRyYWZ0Tm90ZXMgPz8gbmV3IE1hcCh0aGlzLmN1cnJlbnROb3RlcygpLm1hcChub3RlID0+IFttb2RlbE5vdGVLZXkobm90ZSksIG5vdGVdKSlcclxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLmF1dGhvcml6ZWRSb3V0ZXMoKS5tYXAoKHJvdXRlKTogTW9kZWxOb3RlUm93ID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gbW9kZWxOb3RlS2V5KHJvdXRlKVxyXG4gICAgICBjb25zdCBub3RlID0gZHJhZnRlZC5nZXQoa2V5KVxyXG4gICAgICByZXR1cm4geyAuLi5yb3V0ZSwga2V5LCBjYXBhYmlsaXR5OiBub3RlPy5jYXBhYmlsaXR5ID8/ICcnLCBzY2VuYXJpbzogbm90ZT8uc2NlbmFyaW8gPz8gJycgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF2YWlsYWJsZTogc25hcHNob3Quc3RhdHVzID09PSAncmVhZHknLFxyXG4gICAgICB3cml0YWJsZTogc25hcHNob3Qud3JpdGFibGUsXHJcbiAgICAgIGRpcnR5OiAhc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIHRoaXMuZGVzaXJlZE5vdGVzKCkpLFxyXG4gICAgICBpbnZhbGlkOiBmYWxzZSxcclxuICAgICAgc2F2aW5nOiB0aGlzLnNhdmluZyxcclxuICAgICAgZmFpbGVkOiB0aGlzLmZhaWxlZCxcclxuICAgICAgc2VsZWN0aW9uQXZhaWxhYmxlOiB0aGlzLnNlbGVjdGlvbi5nZXRTbmFwc2hvdCgpLnN0YXR1cyA9PT0gJ3JlYWR5JyxcclxuICAgICAgcm93cyxcclxuICAgICAgY29uZmxpY3RlZDogdGhpcy5jb25mbGljdGVkLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdWJsaXNoKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdG9yZS5zZXQodGhpcy5wcm9qZWN0aW9uKCkpXHJcbiAgfVxyXG59XHJcbiIsICIvKiogQnJvd3NlciBzdGF0ZSBmb3IgdGhlIFNlc3Npb24taGVhZGVyIHN1YmFnZW50LW1vZGVsLW5vdGVzIHJlZnJlc2ggYWN0aW9uLiAqL1xyXG5cclxuaW1wb3J0IHR5cGUgeyBTZXNzaW9uSWQgfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLXNlc3Npb24vdHlwZXMnXHJcblxyXG5leHBvcnQgdHlwZSB7IFNlc3Npb25JZCB9XHJcblxyXG4vKiogUGF0aCBvZiB0aGUgYXV0aGVudGljYXRlZCBIb3N0IGVuZHBvaW50IHRoaXMgY29udHJvbGxlciBjYWxscy4gKi9cclxuZXhwb3J0IGNvbnN0IFJFRlJFU0hfQVBJX1BBVEggPSAnL2FwaS90ZWFtLW1vZGVsLXJvdXRpbmcucmVmcmVzaCdcclxuXHJcbi8qKlxyXG4gKiBCcm93c2VyIGZvcm0gb2Yge0BsaW5rIFJFRlJFU0hfQVBJX1BBVEh9OiB0aGUgc2VydmVkIGRvY3VtZW50J3MgYDxiYXNlIGhyZWY9XCIuL1wiPmBcclxuICogcmVzb2x2ZXMgaXQgYmVuZWF0aCB0aGUgbW91bnQgdGhhdCBzZXJ2ZWQgdGhlIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgUkVGUkVTSF9BUElfUk9VVEUgPSBSRUZSRVNIX0FQSV9QQVRILnNsaWNlKDEpXHJcblxyXG4vKiogV2hhdCB0aGUgcmVmcmVzaCBhY3Rpb24gY3VycmVudGx5IHJlcG9ydHMuICovXHJcbmV4cG9ydCB0eXBlIFJlZnJlc2hTdGF0dXMgPSAnaWRsZScgfCAnYnVzeScgfCAndXBkYXRlZCcgfCAndW5jaGFuZ2VkJyB8ICdmYWlsZWQnIHwgJ2luYWN0aXZlJ1xyXG5cclxuLyoqIE9uZSByZXF1ZXN0IG91dGNvbWUsIHdpdGggdGhlIGNvcHkga2V5IHRoZSBidXR0b24gc2hvdWxkIGFubm91bmNlLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJlZnJlc2hSZXN1bHQge1xyXG4gIHJlYWRvbmx5IHN0YXR1czogUmVmcmVzaFN0YXR1c1xyXG4gIHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZ1xyXG59XHJcblxyXG4vKiogRmV0Y2ggc3Vic3RpdHV0ZSBzbyB0cmFuc3BvcnQgZmFpbHVyZXMgc3RheSB0ZXN0YWJsZSB3aXRob3V0IGEgc2VydmVyLiAqL1xyXG5leHBvcnQgdHlwZSBSZWZyZXNoRmV0Y2ggPSAocGF0aDogc3RyaW5nLCBpbml0OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT5cclxuXHJcbi8qKiBUcmFuc2xhdGUgYSBIb3N0IHJlc3BvbnNlIGludG8gYnV0dG9uIHN0YXRlLiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVhZFJlZnJlc2hSZXN1bHQob2s6IGJvb2xlYW4sIGJvZHk6IHVua25vd24pOiBSZWZyZXNoUmVzdWx0IHtcclxuICBjb25zdCBjb2RlID0gdHlwZW9mIGJvZHkgPT09ICdvYmplY3QnICYmIGJvZHkgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkoYm9keSlcclxuICAgID8gKGJvZHkgYXMgeyBjb2RlPzogdW5rbm93biB9KS5jb2RlXHJcbiAgICA6IHVuZGVmaW5lZFxyXG4gIGlmIChvaykge1xyXG4gICAgY29uc3QgY2hhbmdlZCA9IHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JyAmJiBib2R5ICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KGJvZHkpXHJcbiAgICAgICYmIChib2R5IGFzIHsgY2hhbmdlZD86IHVua25vd24gfSkuY2hhbmdlZCA9PT0gdHJ1ZVxyXG4gICAgcmV0dXJuIGNoYW5nZWRcclxuICAgICAgPyB7IHN0YXR1czogJ3VwZGF0ZWQnLCBtZXNzYWdlOiAndXBkYXRlZCcgfVxyXG4gICAgICA6IHsgc3RhdHVzOiAndW5jaGFuZ2VkJywgbWVzc2FnZTogJ3VuY2hhbmdlZCcgfVxyXG4gIH1cclxuICByZXR1cm4gY29kZSA9PT0gJ2luYWN0aXZlJ1xyXG4gICAgPyB7IHN0YXR1czogJ2luYWN0aXZlJywgbWVzc2FnZTogJ2luYWN0aXZlJyB9XHJcbiAgICA6IHsgc3RhdHVzOiAnZmFpbGVkJywgbWVzc2FnZTogJ2ZhaWxlZCcgfVxyXG59XHJcblxyXG4vKiogT3duIHRoZSBwZXItc2Vzc2lvbiByZWZyZXNoIHJlcXVlc3Qgd2l0aG91dCBvd25pbmcgYSBSZWFjdCBob29rLiAqL1xyXG5leHBvcnQgY2xhc3MgUmVmcmVzaENvbnRyb2xsZXIge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcGVuZGluZyA9IG5ldyBNYXA8U2Vzc2lvbklkLCBQcm9taXNlPFJlZnJlc2hSZXN1bHQ+PigpXHJcbiAgcHJpdmF0ZSByZWFkb25seSBmZXRjaGVyOiBSZWZyZXNoRmV0Y2hcclxuXHJcbiAgLyoqIEBwYXJhbSBmZXRjaGVyIC0gdHJhbnNwb3J0OyBwcm9kdWN0aW9uIHBhc3NlcyBgZmV0Y2hgLCBzcGVjcyBwYXNzIGEgc3R1Yi4gKi9cclxuICBjb25zdHJ1Y3RvcihmZXRjaGVyOiBSZWZyZXNoRmV0Y2ggPSAocGF0aCwgaW5pdCkgPT4gZmV0Y2gocGF0aCwgaW5pdCkpIHtcclxuICAgIHRoaXMuZmV0Y2hlciA9IGZldGNoZXJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZnJlc2ggb25lIFNlc3Npb24sIGRlZHVwbGljYXRpbmcgb3ZlcmxhcHBpbmcgcmVxdWVzdHMgZm9yIHRoZSBzYW1lIGlkLlxyXG4gICAqIEBwYXJhbSBzZXNzaW9uSWQgLSBjdXJyZW50IFNlc3Npb24gZnJvbSB0aGUgaGVhZGVyIHNsb3QuXHJcbiAgICogQHJldHVybnMgdGhlIHNldHRsZWQgc3RhdHVzIGFuZCBpdHMgY29weSBrZXkuXHJcbiAgICovXHJcbiAgcmVmcmVzaChzZXNzaW9uSWQ6IFNlc3Npb25JZCk6IFByb21pc2U8UmVmcmVzaFJlc3VsdD4ge1xyXG4gICAgY29uc3QgcnVubmluZyA9IHRoaXMucGVuZGluZy5nZXQoc2Vzc2lvbklkKVxyXG4gICAgaWYgKHJ1bm5pbmcgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHJ1bm5pbmdcclxuICAgIGNvbnN0IHRhc2sgPSB0aGlzLnNlbmQoc2Vzc2lvbklkKS5maW5hbGx5KCgpID0+IHsgdGhpcy5wZW5kaW5nLmRlbGV0ZShzZXNzaW9uSWQpIH0pXHJcbiAgICB0aGlzLnBlbmRpbmcuc2V0KHNlc3Npb25JZCwgdGFzaylcclxuICAgIHJldHVybiB0YXNrXHJcbiAgfVxyXG5cclxuICAvKiogU2VuZCBvbmUgSlNPTiBQT1NUIHRvIHRoZSBIb3N0IHJlZnJlc2ggcm91dGUuICovXHJcbiAgcHJpdmF0ZSBhc3luYyBzZW5kKHNlc3Npb25JZDogU2Vzc2lvbklkKTogUHJvbWlzZTxSZWZyZXNoUmVzdWx0PiB7XHJcbiAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlXHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hlcihSRUZSRVNIX0FQSV9ST1VURSwge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgc2Vzc2lvbklkIH0pLFxyXG4gICAgICB9KVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJldHVybiB7IHN0YXR1czogJ2ZhaWxlZCcsIG1lc3NhZ2U6ICdmYWlsZWQnIH1cclxuICAgIH1cclxuICAgIGxldCBib2R5OiB1bmtub3duXHJcbiAgICB0cnkge1xyXG4gICAgICBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIHsgc3RhdHVzOiAnZmFpbGVkJywgbWVzc2FnZTogJ2ZhaWxlZCcgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlYWRSZWZyZXNoUmVzdWx0KHJlc3BvbnNlLm9rLCBib2R5KVxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDRUEsbUJBQW9DO0FBQ3BDLHNDQUFrRTs7O0FDSGxFLElBQU8sa0NBQVEsRUFBQyxXQUFVLG1CQUFrQjs7O0FEeUN4QztBQTFCSixJQUFNLGVBQXFFO0FBQUEsRUFDekUsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUNaO0FBR08sU0FBUyx3QkFBd0IsRUFBRSxXQUFXLFNBQVMsRUFBRSxHQUFpQztBQUMvRixRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQW9DO0FBQ2hFLFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx1QkFBUyxLQUFLO0FBQ3RDLDhCQUFVLE1BQU07QUFDZCxjQUFVLE1BQVM7QUFDbkIsWUFBUSxLQUFLO0FBQUEsRUFDZixHQUFHLENBQUMsU0FBUyxDQUFDO0FBQ2QsUUFBTSxZQUFZLE1BQVk7QUFDNUIsUUFBSSxLQUFNO0FBQ1YsWUFBUSxJQUFJO0FBQ1osU0FBSyxRQUFRLFNBQVMsRUFBRSxLQUFLLENBQUMsV0FBVztBQUN2QyxnQkFBVSxNQUFNO0FBQ2hCLGNBQVEsS0FBSztBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxTQUNFLDRFQUNFO0FBQUEsZ0RBQUMsMkNBQVEsT0FBTyxFQUFFLE9BQU8sZ0JBQWdCLGNBQWMsR0FBRyxNQUFLLFVBQVMsU0FBUyxLQUMvRTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBSztBQUFBLFFBQ0wsU0FBUTtBQUFBLFFBQ1IsV0FBVyxnQ0FBSTtBQUFBLFFBQ2YsY0FBWSxFQUFFLGNBQWM7QUFBQSxRQUM1QixhQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUEsUUFDViw0QkFBeUI7QUFBQSxRQUN6QixTQUFTO0FBQUEsUUFFVCxzREFBQyw2REFBMEIsTUFBTSxJQUFJO0FBQUE7QUFBQSxJQUN2QyxHQUNGO0FBQUEsSUFDQyxXQUFXLFVBQWEsT0FBTyxXQUFXLFVBQVUsT0FBTyxXQUFXLFdBQ3JFLE9BQU8sV0FBVyxhQUFhLE9BQU8sV0FBVyxjQUM3QztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBRUQsTUFBTSxFQUFFLGFBQWEsT0FBTyxNQUFNLENBQUM7QUFBQSxRQUNuQyxNQUFLO0FBQUEsUUFDTCxRQUFRLE1BQU07QUFBRSxvQkFBVSxNQUFTO0FBQUEsUUFBRTtBQUFBO0FBQUEsTUFIaEMsR0FBRyxPQUFPLFNBQVMsQ0FBQyxJQUFJLE9BQU8sT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO0FBQUEsSUFJM0QsSUFDRTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBRUQsTUFBTSxFQUFFLGFBQWEsT0FBTyxNQUFNLENBQUM7QUFBQSxRQUNuQyxRQUFRLE1BQU07QUFBRSxvQkFBVSxNQUFTO0FBQUEsUUFBRTtBQUFBO0FBQUEsTUFGaEMsR0FBRyxPQUFPLFNBQVMsQ0FBQyxJQUFJLE9BQU8sT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO0FBQUEsSUFHM0Q7QUFBQSxLQUVOO0FBRUo7OztBRS9EQSxJQUFBQSxtQ0FBd0I7OztBQ2tCakIsU0FBUyxhQUFhLE1BQThEO0FBQ3pGLE1BQUksU0FBUyxPQUFXLFFBQU87QUFHL0IsUUFBTSxRQUFRLEtBQUssUUFBUSxLQUFLO0FBQ2hDLE1BQUksVUFBVSxLQUFNLFFBQU87QUFDM0IsU0FBTztBQUFBLElBQ0wsT0FBTyxHQUFHLE1BQU0sUUFBUSxJQUFJLE1BQU0sS0FBSztBQUFBLElBQ3ZDLE9BQU8sTUFBTTtBQUFBLElBQ2IsT0FBTyxHQUFHLE1BQU0sUUFBUSxJQUFJLE1BQU0sS0FBSztBQUFBLEVBQ3pDO0FBQ0Y7OztBQ3RDQSxJQUFPLDBCQUFRLEVBQUMsV0FBVSxvQkFBbUIsU0FBUSxrQkFBaUIsUUFBTyxnQkFBZTs7O0FGMkJ4RixJQUFBQyxzQkFBQTtBQUZKLFNBQVMsYUFBYTtBQUNwQixTQUNFLDhDQUFDLFNBQUksT0FBTSxNQUFLLFFBQU8sTUFBSyxTQUFRLGFBQVksTUFBSyxRQUFPLGVBQVksUUFDdEU7QUFBQSxpREFBQyxZQUFPLElBQUcsUUFBTyxJQUFHLEtBQUksR0FBRSxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxPQUFNO0FBQUEsSUFDMUUsNkNBQUMsWUFBTyxJQUFHLFNBQVEsSUFBRyxNQUFLLEdBQUUsUUFBTyxRQUFPLGdCQUFlLGFBQVksT0FBTTtBQUFBLElBQzVFLDZDQUFDLFVBQUssR0FBRSxxQ0FBb0MsUUFBTyxnQkFBZSxhQUFZLE9BQU07QUFBQSxLQUN0RjtBQUVKO0FBUU8sU0FBUyxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsR0FBeUI7QUFHMUUsUUFBTSxPQUFPO0FBQ2IsUUFBTSxRQUFRLGFBQWEsS0FBSyxnQkFBZ0IsQ0FBQztBQUNqRCxNQUFJLFVBQVUsT0FBVyxRQUFPO0FBQ2hDLFFBQU0sYUFBYSxFQUFFLGFBQWEsRUFBRSxPQUFPLE1BQU0sTUFBTSxDQUFDO0FBQ3hELFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU8sTUFBTTtBQUFBLE1BQ2IsTUFBSztBQUFBLE1BQ0wsT0FBTTtBQUFBLE1BQ04sUUFBTTtBQUFBLE1BQ04sYUFBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BRVYsd0RBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVyx3QkFBSSxTQUFTLGNBQVksWUFBWSxvQkFBa0IsTUFBTSxPQUM1RjtBQUFBLHFEQUFDLFVBQUssV0FBVyx3QkFBSSxPQUFPLGVBQVksUUFBTyx1REFBQyxjQUFXLEdBQUU7QUFBQSxRQUM3RCw2Q0FBQyxVQUFLLFdBQVcsd0JBQUksTUFBTyxnQkFBTSxPQUFNO0FBQUEsU0FDMUM7QUFBQTtBQUFBLEVBQ0Y7QUFFSjs7O0FHM0RBLElBQUFDLGdCQUFzQjtBQUd0QixJQUFBQyxtQ0FBNkI7OztBQ1F0QixJQUFNLEtBQTBDO0FBQUEsRUFDckQsYUFBYTtBQUFBLEVBQ2IsVUFBVTtBQUFBLEVBQ1YsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLEVBQ1IsWUFBWTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBQ2QsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLEVBQ1Ysc0JBQXNCO0FBQUEsRUFDdEIsZ0JBQWdCO0FBQUEsRUFDaEIsVUFBVTtBQUFBLEVBQ1YsY0FBYztBQUFBLEVBQ2QsYUFBYTtBQUFBLEVBQ2IsZ0JBQWdCO0FBQUEsRUFDaEIsa0JBQWtCO0FBQUEsRUFDbEIsZUFBZTtBQUFBLEVBQ2YsaUJBQWlCO0FBQUEsRUFDakIsV0FBVztBQUNiO0FBR08sSUFBTSxLQUEwQztBQUFBLEVBQ3JELGFBQWE7QUFBQSxFQUNiLFVBQVU7QUFBQSxFQUNWLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFBQSxFQUNSLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLHNCQUFzQjtBQUFBLEVBQ3RCLGdCQUFnQjtBQUFBLEVBQ2hCLFVBQVU7QUFBQSxFQUNWLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLGdCQUFnQjtBQUFBLEVBQ2hCLGtCQUFrQjtBQUFBLEVBQ2xCLGVBQWU7QUFBQSxFQUNmLGlCQUFpQjtBQUFBLEVBQ2pCLFdBQVc7QUFDYjtBQU9PLFNBQVMsV0FBVyxHQUE2RDtBQUN0RixTQUFPO0FBQUEsSUFDTCxhQUFhLEVBQUUsYUFBYTtBQUFBLElBQzVCLFVBQVUsRUFBRSxVQUFVO0FBQUEsSUFDdEIsWUFBWSxFQUFFLFlBQVk7QUFBQSxJQUMxQixNQUFNLEVBQUUsTUFBTTtBQUFBLElBQ2QsUUFBUSxFQUFFLFFBQVE7QUFBQSxFQUNwQjtBQUNGOzs7QUMxRUEsSUFBTyw0QkFBUSxFQUFDLFdBQVUsb0JBQW1CLFNBQVEsa0JBQWlCLFdBQVUsb0JBQW1CLFFBQU8saUJBQWdCLFlBQVcscUJBQW9CLFNBQVEsa0JBQWlCLGFBQVksc0JBQXFCLGFBQVksc0JBQXFCLFVBQVMsbUJBQWtCLFlBQVcsb0JBQW1COzs7QUY2QnBTLElBQUFDLHNCQUFBO0FBZkYsSUFBTSxtQkFBbUI7QUFZekIsU0FBUyxrQkFBa0IsT0FBK0I7QUFDL0QsUUFBTSxFQUFFLFFBQVEsSUFBSTtBQUNwQixNQUFJLFFBQVEsU0FBUyxVQUFVLFFBQVEsT0FBTyxpQkFBa0IsUUFBTztBQUN2RSxTQUFPLDZDQUFDLG1CQUFnQixPQUFjO0FBQ3hDO0FBR0EsU0FBUyxnQkFBZ0IsRUFBRSxNQUFNLEdBQStDO0FBQzlFLFFBQU0sUUFBUSxNQUFNLGNBQWMsY0FBWSxRQUFRO0FBQ3RELFNBQU8sNkNBQUMsb0JBQWlCLE9BQWMsT0FBYztBQUN2RDtBQUdBLFNBQVMsaUJBQWlCLEVBQUUsT0FBTyxNQUFNLEdBR3RDO0FBQ0QsUUFBTSxFQUFFLEVBQUUsSUFBSTtBQUNkLFFBQU0sZ0JBQVkscUJBQU07QUFDeEIsU0FDRSw4Q0FBQyxhQUFRLFdBQVcsMEJBQUksU0FBUyxtQkFBaUIsV0FBVywyQkFBdUIsTUFDbEY7QUFBQSxrREFBQyxTQUFJLFdBQVcsMEJBQUksT0FDbEI7QUFBQSxtREFBQyxRQUFHLFdBQVcsMEJBQUksU0FBUyxJQUFJLFdBQVksWUFBRSxjQUFjLEdBQUU7QUFBQSxNQUM5RCw2Q0FBQyxPQUFFLFdBQVcsMEJBQUksTUFBTyxZQUFFLGFBQWEsR0FBRTtBQUFBLE9BQzVDO0FBQUEsSUFDQSw4Q0FBQyxpREFBYSxRQUFRLFdBQVcsQ0FBQyxHQUFHLE9BQWMsUUFBUSxNQUFNLE1BQU0sV0FBVyxNQUFNLFNBQ3JGO0FBQUEsT0FBQyxNQUFNLHFCQUNKLDZDQUFDLE9BQUUsV0FBVywwQkFBSSxNQUFPLFlBQUUsc0JBQXNCLEdBQUUsSUFDbkQsTUFBTSxLQUFLLFdBQVcsSUFDcEIsNkNBQUMsT0FBRSxXQUFXLDBCQUFJLE1BQU8sWUFBRSxnQkFBZ0IsR0FBRSxJQUU3Qyw2Q0FBQyxTQUFJLFdBQVcsMEJBQUksT0FDakIsZ0JBQU0sS0FBSyxJQUFJLFNBQ2QsOENBQUMsY0FBdUIsV0FBVywwQkFBSSxXQUFXLHVCQUFtQixNQUNuRTtBQUFBLHFEQUFDLFlBQU8sV0FBVywwQkFBSSxRQUFTLGFBQUcsSUFBSSxRQUFRLElBQUksSUFBSSxLQUFLLElBQUc7QUFBQSxRQUM3RCxDQUFDLGNBQWMsVUFBVSxFQUFZLElBQUksV0FDekMsOENBQUMsV0FBa0IsV0FBVywwQkFBSSxXQUNoQztBQUFBLHVEQUFDLFVBQU0sWUFBRSxLQUFLLEdBQUU7QUFBQSxVQUNoQjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVywwQkFBSTtBQUFBLGNBQ2YsT0FBTyxJQUFJLEtBQUs7QUFBQSxjQUNoQixVQUFVLENBQUMsTUFBTSxZQUFZLE1BQU07QUFBQSxjQUNuQyxVQUFVLENBQUMsVUFBVTtBQUFFLHNCQUFNLGFBQWEsSUFBSSxLQUFLLE9BQU8sTUFBTSxjQUFjLEtBQUs7QUFBQSxjQUFFO0FBQUE7QUFBQSxVQUN2RjtBQUFBLGFBUFUsS0FRWixDQUNEO0FBQUEsV0FaWSxJQUFJLEdBYW5CLENBQ0QsR0FDSDtBQUFBLE1BRUwsTUFBTSxhQUFhLDZDQUFDLE9BQUUsV0FBVywwQkFBSSxVQUFVLE1BQUssVUFBVSxZQUFFLFVBQVUsR0FBRSxJQUFPO0FBQUEsT0FDdEY7QUFBQSxLQUNGO0FBRUo7OztBR3RFQSw4QkFBd0Q7QUFJakQsSUFBTSx1QkFBdUI7QUFHN0IsSUFBTSxvQ0FBb0M7QUErRDFDLFNBQVMsYUFBYSxPQUEyQjtBQUN0RCxTQUFPLEdBQUcsTUFBTSxRQUFRLEtBQUssTUFBTSxLQUFLO0FBQzFDO0FBR0EsU0FBUyxXQUFXLE9BQXlDO0FBQzNELFNBQU8sQ0FBQyxHQUFHLEtBQUssRUFDYixPQUFPLFVBQVEsS0FBSyxlQUFlLE1BQU0sS0FBSyxhQUFhLEVBQUUsRUFDN0QsSUFBSSxXQUFTLEVBQUUsVUFBVSxLQUFLLFVBQVUsT0FBTyxLQUFLLE9BQU8sWUFBWSxLQUFLLFlBQVksVUFBVSxLQUFLLFNBQVMsRUFBRTtBQUN2SDtBQUdBLFNBQVMsVUFBVSxNQUE0QixPQUFzQztBQUNuRixNQUFJLEtBQUssV0FBVyxNQUFNLE9BQVEsUUFBTztBQUN6QyxRQUFNLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxVQUFRLENBQUMsYUFBYSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEUsU0FBTyxNQUFNLE1BQU0sQ0FBQyxTQUFTO0FBQzNCLFVBQU0sUUFBUSxNQUFNLElBQUksYUFBYSxJQUFJLENBQUM7QUFDMUMsV0FBTyxVQUFVLFVBQWEsTUFBTSxlQUFlLEtBQUssY0FBYyxNQUFNLGFBQWEsS0FBSztBQUFBLEVBQ2hHLENBQUM7QUFDSDtBQUdPLElBQU0sdUJBQU4sTUFBMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZ0JoQyxZQUNtQixPQUNBLFdBQ2pCO0FBRmlCO0FBQ0E7QUFFakIsU0FBSyxZQUFRLDZDQUFvQixLQUFLLFdBQVcsQ0FBQztBQUNsRCxVQUFNLFdBQVcsTUFBTSxVQUFVLE1BQU07QUFBRSxXQUFLLGNBQWM7QUFBQSxJQUFFLENBQUM7QUFDL0QsVUFBTSxlQUFlLFVBQVUsVUFBVSxNQUFNO0FBQUUsV0FBSyxRQUFRO0FBQUEsSUFBRSxDQUFDO0FBQ2pFLFNBQUssY0FBYyxNQUFNO0FBQUUsZUFBUztBQUFHLG1CQUFhO0FBQUEsSUFBRTtBQUFBLEVBQ3hEO0FBQUEsRUFQbUI7QUFBQSxFQUNBO0FBQUEsRUFqQlg7QUFBQSxFQUNBO0FBQUEsRUFDQSxTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxpQkFBaUI7QUFBQSxFQUNqQixhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxpQkFBaUI7QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFpQmpCLFVBQWdCO0FBQ2QsU0FBSyxXQUFXO0FBQ2hCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssWUFBWTtBQUFBLEVBQ25CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLFNBQXlCO0FBQ3ZCLFdBQU87QUFBQSxNQUNMLE9BQU8sRUFBRSxZQUFZLEtBQUssTUFBTTtBQUFBLE1BQ2hDLGNBQWMsQ0FBQyxLQUFLLE9BQU8sVUFBVTtBQUFFLGFBQUssYUFBYSxLQUFLLE9BQU8sS0FBSztBQUFBLE1BQUU7QUFBQSxNQUM1RSxNQUFNLE1BQU07QUFBRSxhQUFLLEtBQUssS0FBSztBQUFBLE1BQUU7QUFBQSxNQUMvQixTQUFTLE1BQU07QUFBRSxhQUFLLFFBQVE7QUFBQSxNQUFFO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLGtCQUF3QjtBQUN0QixRQUFJLEtBQUssU0FBVTtBQUNuQixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLFNBQVM7QUFDZCxTQUFLLFdBQVc7QUFDaEIsU0FBSyxRQUFRO0FBQUEsRUFDZjtBQUFBO0FBQUEsRUFHUSxnQkFBc0I7QUFDNUIsUUFBSSxLQUFLLFNBQVU7QUFDbkIsUUFBSSxDQUFDLEtBQUssVUFBVSxLQUFLLGVBQWUsVUFBYSxLQUFLLE1BQU0sWUFBWSxFQUFFLGFBQWEsS0FBSyxlQUFlO0FBQzdHLFVBQUksVUFBVSxLQUFLLGFBQWEsR0FBRyxLQUFLLGFBQWEsQ0FBQyxFQUFHLE1BQUssV0FBVztBQUFBLFVBQ3BFLE1BQUssYUFBYTtBQUFBLElBQ3pCO0FBQ0EsU0FBSyxRQUFRO0FBQUEsRUFDZjtBQUFBLEVBRVEsZUFBNEI7QUFDbEMsV0FBTyxXQUFXLEtBQUssTUFBTSxZQUFZLEVBQUUsT0FBTyxjQUFjLENBQUMsQ0FBQztBQUFBLEVBQ3BFO0FBQUEsRUFFUSxlQUE0QjtBQUNsQyxXQUFPLEtBQUssZUFBZSxTQUFZLEtBQUssYUFBYSxJQUFJLFdBQVcsS0FBSyxXQUFXLE9BQU8sQ0FBQztBQUFBLEVBQ2xHO0FBQUE7QUFBQSxFQUdRLG1CQUFpQztBQUN2QyxVQUFNLFdBQVcsS0FBSyxVQUFVLFlBQVk7QUFDNUMsUUFBSSxTQUFTLFdBQVcsV0FBVyxTQUFTLE9BQU8sWUFBWSxLQUFNLFFBQU8sQ0FBQztBQUM3RSxXQUFPLFNBQVMsTUFBTSxjQUFjLElBQUksWUFBVSxFQUFFLFVBQVUsTUFBTSxVQUFVLE9BQU8sTUFBTSxNQUFNLEVBQUU7QUFBQSxFQUNyRztBQUFBLEVBRVEsV0FBb0I7QUFDMUIsVUFBTSxXQUFXLEtBQUssTUFBTSxZQUFZO0FBQ3hDLFdBQU8sQ0FBQyxLQUFLLFlBQVksU0FBUyxXQUFXLFdBQVcsU0FBUyxZQUFZLENBQUMsS0FBSztBQUFBLEVBQ3JGO0FBQUEsRUFFUSxhQUFhLEtBQWEsT0FBa0MsT0FBcUI7QUFDdkYsUUFBSSxDQUFDLEtBQUssU0FBUyxFQUFHO0FBQ3RCLFVBQU0sUUFBUSxLQUFLLGlCQUFpQixFQUFFLEtBQUssZUFBYSxhQUFhLFNBQVMsTUFBTSxHQUFHO0FBQ3ZGLFFBQUksVUFBVSxPQUFXO0FBQ3pCLFFBQUksS0FBSyxlQUFlLFFBQVc7QUFDakMsV0FBSyxhQUFhLElBQUksSUFBSSxLQUFLLGFBQWEsRUFBRSxJQUFJLENBQUFDLFVBQVEsQ0FBQyxhQUFhQSxLQUFJLEdBQUdBLEtBQUksQ0FBQyxDQUFDO0FBQ3JGLFdBQUssZ0JBQWdCLEtBQUssTUFBTSxZQUFZLEVBQUU7QUFBQSxJQUNoRDtBQUNBLFVBQU0sT0FBTyxLQUFLLFdBQVcsSUFBSSxHQUFHLEtBQUssRUFBRSxHQUFHLE9BQU8sWUFBWSxJQUFJLFVBQVUsR0FBRztBQUNsRixTQUFLLFdBQVcsSUFBSSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUNwRCxRQUFJLENBQUMsS0FBSyxlQUFnQixNQUFLLFNBQVM7QUFDeEMsU0FBSyxRQUFRO0FBQUEsRUFDZjtBQUFBLEVBRVEsYUFBbUI7QUFDekIsU0FBSyxhQUFhO0FBQ2xCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssU0FBUztBQUNkLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssYUFBYTtBQUFBLEVBQ3BCO0FBQUEsRUFFUSxVQUFnQjtBQUN0QixRQUFJLEtBQUssT0FBUTtBQUNqQixTQUFLLFdBQVc7QUFDaEIsU0FBSyxRQUFRO0FBQUEsRUFDZjtBQUFBLEVBRUEsTUFBYyxPQUFzQjtBQUNsQyxVQUFNLFdBQVcsS0FBSyxNQUFNLFlBQVk7QUFDeEMsVUFBTSxRQUFRLEtBQUssYUFBYTtBQUNoQyxRQUFJLEtBQUssWUFBWSxTQUFTLFdBQVcsV0FBVyxDQUFDLFNBQVMsWUFBWSxLQUFLLE9BQVE7QUFDdkYsUUFBSSxVQUFVLEtBQUssYUFBYSxHQUFHLEtBQUssRUFBRztBQUczQyxVQUFNLFFBQVEsS0FBSztBQUNuQixRQUFJLFVBQVUsT0FBVztBQUN6QixRQUFJLFNBQVMsYUFBYSxPQUFPO0FBQy9CLFdBQUssYUFBYTtBQUNsQixXQUFLLFFBQVE7QUFDYjtBQUFBLElBQ0Y7QUFDQSxVQUFNLGFBQWEsS0FBSztBQUN4QixTQUFLLFNBQVM7QUFDZCxTQUFLLFNBQVM7QUFDZCxTQUFLLGFBQWE7QUFDbEIsU0FBSyxRQUFRO0FBQ2IsUUFBSTtBQUNKLFFBQUk7QUFDRixpQkFBVyxNQUFNLEtBQUssTUFBTSxPQUFPLENBQUMsRUFBRSxJQUFJLE9BQU8sTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLE1BQU0sQ0FBQyxHQUFHLEtBQUs7QUFBQSxJQUMvRixTQUFTLE9BQWdCO0FBRXZCLFVBQUksZUFBZSxLQUFLLGtCQUFrQixLQUFLLFNBQVU7QUFDekQsV0FBSyxTQUFTO0FBQ2QsV0FBSyxTQUFTO0FBQ2QsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxhQUFhLEtBQUssTUFBTSxZQUFZLEVBQUUsYUFBYTtBQUN4RCxXQUFLLFFBQVE7QUFDYjtBQUFBLElBQ0Y7QUFDQSxRQUFJLGVBQWUsS0FBSyxrQkFBa0IsS0FBSyxTQUFVO0FBQ3pELFVBQU0sU0FBUyxZQUFZLFVBQVUsS0FBSyxhQUFhLEdBQUcsS0FBSztBQUMvRCxTQUFLLFNBQVM7QUFDZCxTQUFLLFNBQVMsQ0FBQztBQUNmLFFBQUksT0FBUSxNQUFLLFdBQVc7QUFDNUIsU0FBSyxjQUFjO0FBQUEsRUFDckI7QUFBQSxFQUVRLGFBQThCO0FBQ3BDLFVBQU0sV0FBVyxLQUFLLE1BQU0sWUFBWTtBQUN4QyxVQUFNLFVBQVUsS0FBSyxjQUFjLElBQUksSUFBSSxLQUFLLGFBQWEsRUFBRSxJQUFJLFVBQVEsQ0FBQyxhQUFhLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN0RyxVQUFNLE9BQU8sS0FBSyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBd0I7QUFDaEUsWUFBTSxNQUFNLGFBQWEsS0FBSztBQUM5QixZQUFNLE9BQU8sUUFBUSxJQUFJLEdBQUc7QUFDNUIsYUFBTyxFQUFFLEdBQUcsT0FBTyxLQUFLLFlBQVksTUFBTSxjQUFjLElBQUksVUFBVSxNQUFNLFlBQVksR0FBRztBQUFBLElBQzdGLENBQUM7QUFDRCxXQUFPO0FBQUEsTUFDTCxXQUFXLFNBQVMsV0FBVztBQUFBLE1BQy9CLFVBQVUsU0FBUztBQUFBLE1BQ25CLE9BQU8sQ0FBQyxVQUFVLEtBQUssYUFBYSxHQUFHLEtBQUssYUFBYSxDQUFDO0FBQUEsTUFDMUQsU0FBUztBQUFBLE1BQ1QsUUFBUSxLQUFLO0FBQUEsTUFDYixRQUFRLEtBQUs7QUFBQSxNQUNiLG9CQUFvQixLQUFLLFVBQVUsWUFBWSxFQUFFLFdBQVc7QUFBQSxNQUM1RDtBQUFBLE1BQ0EsWUFBWSxLQUFLO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQUEsRUFFUSxVQUFnQjtBQUN0QixTQUFLLE1BQU0sSUFBSSxLQUFLLFdBQVcsQ0FBQztBQUFBLEVBQ2xDO0FBQ0Y7OztBQ2hSTyxJQUFNLG1CQUFtQjtBQU16QixJQUFNLG9CQUFvQixpQkFBaUIsTUFBTSxDQUFDO0FBZWxELFNBQVMsa0JBQWtCLElBQWEsTUFBOEI7QUFDM0UsUUFBTSxPQUFPLE9BQU8sU0FBUyxZQUFZLFNBQVMsUUFBUSxDQUFDLE1BQU0sUUFBUSxJQUFJLElBQ3hFLEtBQTRCLE9BQzdCO0FBQ0osTUFBSSxJQUFJO0FBQ04sVUFBTSxVQUFVLE9BQU8sU0FBUyxZQUFZLFNBQVMsUUFBUSxDQUFDLE1BQU0sUUFBUSxJQUFJLEtBQzFFLEtBQStCLFlBQVk7QUFDakQsV0FBTyxVQUNILEVBQUUsUUFBUSxXQUFXLFNBQVMsVUFBVSxJQUN4QyxFQUFFLFFBQVEsYUFBYSxTQUFTLFlBQVk7QUFBQSxFQUNsRDtBQUNBLFNBQU8sU0FBUyxhQUNaLEVBQUUsUUFBUSxZQUFZLFNBQVMsV0FBVyxJQUMxQyxFQUFFLFFBQVEsVUFBVSxTQUFTLFNBQVM7QUFDNUM7QUFHTyxJQUFNLG9CQUFOLE1BQXdCO0FBQUEsRUFDWixVQUFVLG9CQUFJLElBQXVDO0FBQUEsRUFDckQ7QUFBQTtBQUFBLEVBR2pCLFlBQVksVUFBd0IsQ0FBQyxNQUFNLFNBQVMsTUFBTSxNQUFNLElBQUksR0FBRztBQUNyRSxTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLFFBQVEsV0FBOEM7QUFDcEQsVUFBTSxVQUFVLEtBQUssUUFBUSxJQUFJLFNBQVM7QUFDMUMsUUFBSSxZQUFZLE9BQVcsUUFBTztBQUNsQyxVQUFNLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBRSxRQUFRLE1BQU07QUFBRSxXQUFLLFFBQVEsT0FBTyxTQUFTO0FBQUEsSUFBRSxDQUFDO0FBQ2xGLFNBQUssUUFBUSxJQUFJLFdBQVcsSUFBSTtBQUNoQyxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUEsRUFHQSxNQUFjLEtBQUssV0FBOEM7QUFDL0QsUUFBSTtBQUNKLFFBQUk7QUFDRixpQkFBVyxNQUFNLEtBQUssUUFBUSxtQkFBbUI7QUFBQSxRQUMvQyxRQUFRO0FBQUEsUUFDUixhQUFhO0FBQUEsUUFDYixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLFFBQzlDLE1BQU0sS0FBSyxVQUFVLEVBQUUsVUFBVSxDQUFDO0FBQUEsTUFDcEMsQ0FBQztBQUFBLElBQ0gsUUFBUTtBQUNOLGFBQU8sRUFBRSxRQUFRLFVBQVUsU0FBUyxTQUFTO0FBQUEsSUFDL0M7QUFDQSxRQUFJO0FBQ0osUUFBSTtBQUNGLGFBQU8sTUFBTSxTQUFTLEtBQUs7QUFBQSxJQUM3QixRQUFRO0FBQ04sYUFBTyxFQUFFLFFBQVEsVUFBVSxTQUFTLFNBQVM7QUFBQSxJQUMvQztBQUNBLFdBQU8sa0JBQWtCLFNBQVMsSUFBSSxJQUFJO0FBQUEsRUFDNUM7QUFDRjs7O0FWcENPLElBQU0sS0FBSztBQUdYLElBQU0sU0FBUyxDQUFDLFNBQVMsVUFBVSxhQUFhO0FBTWhELFNBQVMsTUFBTSxLQUEwQjtBQUM5QyxRQUFNLElBQUksSUFBSSxPQUFPLEtBQUssRUFBRTtBQUM1QixNQUFJLE9BQU8sTUFBTSxJQUFJLE9BQU8sU0FBUyxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUMsR0FBRyx5Q0FBeUM7QUFDL0YsUUFBTSxRQUFRLElBQUk7QUFBQSxJQUNoQixJQUFJLFlBQVksSUFBd0Isb0JBQW9CO0FBQUEsSUFDNUQsSUFBSSxZQUFZLElBQW9DLGlDQUFpQztBQUFBLEVBQ3ZGO0FBQ0EsTUFBSSxPQUFPLE1BQU0sTUFBTTtBQUFFLFVBQU0sUUFBUTtBQUFBLEVBQUUsR0FBRywrQ0FBK0M7QUFDM0YsTUFBSTtBQUFBLElBQ0YsTUFBTSxJQUFJLEdBQUcsb0JBQW9CLE1BQU07QUFBRSxZQUFNLGdCQUFnQjtBQUFBLElBQUUsQ0FBQztBQUFBLElBQ2xFO0FBQUEsRUFDRjtBQUNBLE1BQUksT0FBTyxNQUFNLElBQUksWUFBWSxZQUFZLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxJQUFJLE1BQU07QUFBQSxJQUNuRjtBQUFBLElBQ0EsTUFBTSxJQUFJLE1BQU0sU0FBUztBQUFBLE1BQ3ZCLE1BQU07QUFBQSxNQUNOLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE9BQU8sTUFBTSxFQUFFLGNBQWM7QUFBQSxNQUM3QixRQUFRO0FBQUEsTUFDUixRQUFRLE1BQU0sTUFBTSxPQUFPO0FBQUEsSUFDN0IsR0FBRyxpQkFBaUI7QUFBQSxFQUN0QixDQUFDLEdBQUcsa0NBQWtDO0FBRXRDLFFBQU0sVUFBVSxJQUFJLGtCQUFrQjtBQUN0QyxNQUFJLE9BQU8sTUFBTSxJQUFJLE1BQU0sT0FBTyx5Q0FBeUMsTUFBTSxJQUFJLE1BQU0sU0FBUztBQUFBLElBQ2xHLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLFFBQVEsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFrQixRQUFRLFFBQVEsRUFBRSxFQUFFO0FBQUEsRUFDbkUsR0FBRyx1QkFBdUIsQ0FBQyxHQUFHLDRDQUE0QztBQUsxRSxNQUFJLE9BQU8sTUFBTSxJQUFJLE1BQU0sT0FBTyw0QkFBNEIsTUFBTSxJQUFJLE1BQU0sU0FBUztBQUFBLElBQ3JGLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWLEdBQUcsZUFBZSxDQUFDLEdBQUcsaURBQWlEO0FBQ3pFOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfZHNoX2NsaWVudF91aV9wcmltaXRpdmVzIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2RzaF9jbGllbnRfdWlfcHJpbWl0aXZlcyIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAibm90ZSJdCn0K

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
injectStyle(".trigger_8b6dc00a {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-width: 0;\n  max-width: 22ch;\n  height: 28px;\n  padding: 0 8px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 16px;\n  cursor: pointer;\n}\n.trigger_8b6dc00a:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n.trigger_8b6dc00a:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary);\n  outline-offset: 1px;\n}\n.glyph_8b6dc00a {\n  display: inline-flex;\n  flex: none;\n  align-items: center;\n}\n.text_8b6dc00a {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n:global([data-model-compact]) .trigger_8b6dc00a {\n  width: 28px;\n  max-width: none;\n  padding: 0;\n  justify-content: center;\n}\n:global([data-model-compact]) .text_8b6dc00a {\n  display: none;\n}\n@container (max-width: 560px) {\n  .trigger_8b6dc00a {\n    max-width: 16ch;\n  }\n}\n\n.trigger_b7023581 {\n  flex: none;\n  width: 28px;\n  padding: 0;\n  color: var(--dsw-alias-label-secondary);\n}\n\n.section_1fcfc967 {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  min-width: 0;\n}\n.intro_1fcfc967 {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n.heading_1fcfc967 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-primary);\n}\n.hint_1fcfc967,\n.conflict_1fcfc967 {\n  margin: 0;\n  font-size: 12px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n.hint_1fcfc967 {\n  color: var(--dsw-alias-label-secondary);\n}\n.conflict_1fcfc967 {\n  color: var(--dsw-alias-state-error-primary);\n}\n.notes_1fcfc967,\n.noteGroup_1fcfc967,\n.noteField_1fcfc967 {\n  display: grid;\n  gap: 6px;\n  min-width: 0;\n}\n.notes_1fcfc967 {\n  gap: 10px;\n}\n.noteGroup_1fcfc967 {\n  margin: 0;\n  padding: 10px;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-lg);\n}\n.legend_1fcfc967 {\n  padding: 0 4px;\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n  overflow-wrap: anywhere;\n}\n.noteField_1fcfc967 {\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n}\n.textarea_1fcfc967 {\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 52px;\n  padding: 6px;\n  resize: vertical;\n  font: inherit;\n  font-size: 13px;\n  color: var(--dsw-alias-label-primary);\n  background: transparent;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-sm);\n}\n.textarea_1fcfc967:focus-visible {\n  outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\n  outline-offset: 1px;\n}\n.textarea_1fcfc967:disabled {\n  opacity: 0.6;\n}\n");

return module.exports; } });
