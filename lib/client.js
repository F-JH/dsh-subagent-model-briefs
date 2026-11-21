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
function ModelRouteBadge({ useSession, useProjection, t }) {
  const subagent = useSession((snapshot) => snapshot.subagent);
  const read = useProjection;
  const label = modelLabelOf(read("modelSelection"));
  if (subagent === null || label === void 0) return null;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLnRzeCIsICJkc2gtY3NzLW1vZHVsZTpzcmMvY2xpZW50L01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLm1vZHVsZS5jc3MiLCAic3JjL2NsaWVudC9Nb2RlbFJvdXRlQmFkZ2UudHN4IiwgInNyYy9jbGllbnQvbW9kZWwtbGFiZWwudHMiLCAiZHNoLWNzcy1tb2R1bGU6c3JjL2NsaWVudC9Nb2RlbFJvdXRlQmFkZ2UubW9kdWxlLmNzcyIsICJzcmMvY2xpZW50L01vZGVsTm90ZXNTZWN0aW9uLnRzeCIsICJzcmMvY2xpZW50L2xvY2FsZXMudHMiLCAiZHNoLWNzcy1tb2R1bGU6c3JjL2NsaWVudC9Nb2RlbE5vdGVzU2VjdGlvbi5tb2R1bGUuY3NzIiwgInNyYy9jbGllbnQvbW9kZWwtbm90ZXMtY29udHJvbGxlci50cyIsICJzcmMvY2xpZW50L3JlZnJlc2gtY29udHJvbGxlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBUaGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwsIGJyb3dzZXIgaGFsZi5cbiAqXG4gKiBUaGUgcGFuZWwgcmVnaXN0ZXJzIGludG8gdGhlIFBsdWdpbnMgcGFnZSdzIGBwbHVnaW5zLmRldGFpbC5zZWN0aW9uYCBzbG90XG4gKiBhbmQgcmVuZGVycyBvbmx5IG9uIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwYWdlIChgcGx1Z2lucy5pdGVtYCBpZFxuICogYHN1YmFnZW50YCksIGRpcmVjdGx5IGJlbG93IHRoYXQgcGFnZSdzIG1vZGVsIGF1dGhvcml6YXRpb24uIEl0IGVkaXRzXG4gKiBgbW9kZWxOb3Rlc2AgaW4gdGhpcyBwbHVnaW4ncyBIb3N0IGVudHJ5IHRocm91Z2ggdGhlIHNoYXJlZCBgY29uZmlnRm9ybXNgXG4gKiBzZXJ2aWNlIGFuZCByZWFkcyB0aGUgc2F2ZWQgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiB0aHJvdWdoIHRoZSBzYW1lXG4gKiBzZXJ2aWNlLCB3aXRob3V0IHdyaXRpbmcgaXQuXG4gKlxuICogVGhlIHJlZ2lzdHJhdGlvbiBsaXZlcyB3aXRoIHRoaXMgcGx1Z2luJ3MgZmliZXIsIHNvIHN3aXRjaGluZyB0aGUgcGx1Z2luXG4gKiBvZmYgcmVtb3ZlcyB0aGUgcGFuZWwgYWxvbmcgd2l0aCBldmVyeXRoaW5nIGVsc2UgaXQgY29udHJpYnV0ZWQuXG4gKi9cblxuLy8gVHlwZS1vbmx5OiBwdWxscyB0aGUgbG9jYWxlIHBsdWdpbidzIENvbnRleHQgbWVyZ2UgKGN0eC5sb2NhbGUpLlxuaW1wb3J0IHR5cGUge30gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtbG9jYWxlL2NsaWVudCdcbi8vIFR5cGUtb25seTogdGhlIGN0eC5jb25maWdGb3JtcyBDb250ZXh0IG1lcmdlLiBDcm9zcy1wbHVnaW4gY29sbGFib3JhdGlvblxuLy8gZ29lcyB0aHJvdWdoIHRoZSBzZXJ2aWNlLCBuZXZlciBhIHZhbHVlIGltcG9ydCAoY2xpZW50IGJ1bmRsZSBwdXJpdHkgZ2F0ZSkuXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1zZXR0aW5ncy9jbGllbnQnXG4vLyBUeXBlLW9ubHk6IHRoZSBQbHVnaW5zIHBhZ2UncyBTbG90TWFwIG1lcmdlICh0aGUgJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nIGVudHJ5KS5cbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXBsdWdpbi1tYW5hZ2VyL2NsaWVudCdcbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXJlbmRlcmVyL2NsaWVudCdcbmltcG9ydCB0eXBlIHsgQ29udGV4dCBhcyBDbGllbnRDb250ZXh0IH0gZnJvbSAnQGRlZXBzZWVrLWFpL2NvcmRpcydcbmltcG9ydCB7IE1vZGVsTm90ZXNSZWZyZXNoQWN0aW9uIH0gZnJvbSAnLi9Nb2RlbE5vdGVzUmVmcmVzaEFjdGlvbi50c3gnXG5pbXBvcnQgeyBNb2RlbFJvdXRlQmFkZ2UgfSBmcm9tICcuL01vZGVsUm91dGVCYWRnZS50c3gnXG5pbXBvcnQgeyBNb2RlbE5vdGVzU2VjdGlvbiB9IGZyb20gJy4vTW9kZWxOb3Rlc1NlY3Rpb24udHN4J1xuaW1wb3J0IHtcbiAgTU9ERUxfTk9URVNfRU5UUllfSUQsIE1vZGVsTm90ZXNDb250cm9sbGVyLCBTVUJBR0VOVF9NT0RFTF9TRUxFQ1RJT05fRU5UUllfSUQsXG59IGZyb20gJy4vbW9kZWwtbm90ZXMtY29udHJvbGxlci50cydcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc1NldHRpbmdzLCBTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3MgfSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5pbXBvcnQgeyBSZWZyZXNoQ29udHJvbGxlciB9IGZyb20gJy4vcmVmcmVzaC1jb250cm9sbGVyLnRzJ1xuaW1wb3J0IHR5cGUgeyBTZXNzaW9uSWQgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmltcG9ydCB7IGVuLCB6aCwgdHlwZSBNb2RlbE5vdGVzTG9jYWxlS2V5IH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNSZWZyZXNoQWN0aW9uUHJvcHMgfSBmcm9tICcuL01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLnRzeCdcbmV4cG9ydCB0eXBlIHsgTW9kZWxSb3V0ZUJhZGdlUHJvcHMgfSBmcm9tICcuL01vZGVsUm91dGVCYWRnZS50c3gnXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgfSBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLnRzeCdcbmV4cG9ydCB0eXBlIHtcbiAgTW9kZWxOb3RlLCBNb2RlbE5vdGVSb3csIE1vZGVsTm90ZXNGYWNlLCBNb2RlbE5vdGVzU2V0dGluZ3MsIE1vZGVsTm90ZXNTdGF0ZSwgTW9kZWxSb3V0ZSxcbiAgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzLFxufSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5leHBvcnQgdHlwZSB7IFJlZnJlc2hSZXN1bHQsIFJlZnJlc2hTdGF0dXMgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmV4cG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0xvY2FsZUtleSB9IGZyb20gJy4vbG9jYWxlcy50cydcblxuZGVjbGFyZSBtb2R1bGUgJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJyB7XG4gIGludGVyZmFjZSBMb2NhbGVOYW1lc3BhY2VNYXAge1xuICAgIC8qKiBTdWJhZ2VudCBtb2RlbCBub3RlcyBwYW5lbCBjb3B5LiAqL1xuICAgICd0ZWFtTW9kZWxSb3V0aW5nJzogTW9kZWxOb3Rlc0xvY2FsZUtleVxuICB9XG59XG5cbi8qKiBEaWN0aW9uYXJ5IG5hbWVzcGFjZSBvd25lZCBieSB0aGlzIHBsdWdpbi4gKi9cbmV4cG9ydCBjb25zdCBOUyA9ICd0ZWFtTW9kZWxSb3V0aW5nJ1xuXG4vKiogUmVxdWlyZWQgc2VydmljZXMgKGNvcmRpcyBmaWJlciBpbmplY3QpLiAqL1xuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnbG9jYWxlJywgJ2NvbmZpZ0Zvcm1zJ11cblxuLyoqXG4gKiBNb3VudCB0aGUgbm90ZXMgcGFuZWwgb24gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBhZ2UuXG4gKiBAcGFyYW0gY3R4IC0gdGhlIGJyb3dzZXIgcGx1Z2luIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShjdHg6IENsaWVudENvbnRleHQpOiB2b2lkIHtcbiAgY29uc3QgdCA9IGN0eC5sb2NhbGUuYmluZChOUylcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoLCBlbiB9KSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IGRpY3Rpb25hcmllcycpXG4gIGNvbnN0IG5vdGVzID0gbmV3IE1vZGVsTm90ZXNDb250cm9sbGVyKFxuICAgIGN0eC5jb25maWdGb3Jtcy5nZXQ8TW9kZWxOb3Rlc1NldHRpbmdzPihNT0RFTF9OT1RFU19FTlRSWV9JRCksXG4gICAgY3R4LmNvbmZpZ0Zvcm1zLmdldDxTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3M+KFNVQkFHRU5UX01PREVMX1NFTEVDVElPTl9FTlRSWV9JRCksXG4gIClcbiAgY3R4LmVmZmVjdCgoKSA9PiAoKSA9PiB7IG5vdGVzLmRpc3Bvc2UoKSB9LCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogZm9ybSBzdWJzY3JpcHRpb25zJylcbiAgY3R4LmVmZmVjdChcbiAgICAoKSA9PiBjdHgub24oJ2Nvbm5lY3Rpb24vcmVzZXQnLCAoKSA9PiB7IG5vdGVzLnJlc2V0Q29ubmVjdGlvbigpIH0pLFxuICAgICdkc2gtc3ViYWdlbnQtbW9kZWwtYnJpZWZzOiBjb25uZWN0aW9uIGdlbmVyYXRpb24nLFxuICApXG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LmNvbmZpZ0Zvcm1zLndoaWxlU2VydmVkKFtNT0RFTF9OT1RFU19FTlRSWV9JRF0sICgpID0+IGN0eC5zbG90cy5pbmplY3QoXG4gICAgJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nLFxuICAgICgpID0+IGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAncGx1Z2lucy5kZXRhaWwuc2VjdGlvbicsXG4gICAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZycsXG4gICAgICBvcmRlcjogMjAsXG4gICAgICBsYWJlbDogKCkgPT4gdCgnc2VjdGlvblRpdGxlJyksXG4gICAgICBsb2NhbGU6IE5TLFxuICAgICAgaW5qZWN0OiAoKSA9PiBub3Rlcy5pbmplY3QoKSxcbiAgICB9LCBNb2RlbE5vdGVzU2VjdGlvbiksXG4gICkpLCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogcGFuZWwnKVxuXG4gIGNvbnN0IHJlZnJlc2ggPSBuZXcgUmVmcmVzaENvbnRyb2xsZXIoKVxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5zbG90cy5pbmplY3QoJ2NvbnZlcnNhdGlvbi5zZXNzaW9uLmhlYWRlci51dGlsaXRpZXMnLCAoKSA9PiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgIG5hbWU6ICdjb252ZXJzYXRpb24uc2Vzc2lvbi5oZWFkZXIudXRpbGl0aWVzJyxcbiAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZy1yZWZyZXNoJyxcbiAgICBvcmRlcjogLTUsXG4gICAgbG9jYWxlOiBOUyxcbiAgICBpbmplY3Q6ICgpID0+ICh7IHJlZnJlc2g6IChpZDogU2Vzc2lvbklkKSA9PiByZWZyZXNoLnJlZnJlc2goaWQpIH0pLFxuICB9LCBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvbikpLCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogc2Vzc2lvbiByZWZyZXNoJylcblxuICAvLyBUaGUgY29tcG9zZXIncyBtb2RlbCByb3V0ZS4gVGhlIHJlbmRlcmVyIGhhbmRzIGVhY2ggc2Vzc2lvbi1zY29wZWQgZW50cnkgYVxuICAvLyBgdXNlUHJvamVjdGlvbmAgcmVhZGVyLCBzbyB0aGUgbGFiZWwgZm9sbG93cyB0aGUgU2Vzc2lvbidzIG93blxuICAvLyBgbW9kZWxTZWxlY3Rpb25gIHByb2plY3Rpb24gd2l0aG91dCByZWFjaGluZyBmb3IgdGhlIHNlc3Npb25zIHNlcnZpY2UuXG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LnNsb3RzLmluamVjdCgnY29udmVyc2F0aW9uLmlucHV0LnJpZ2h0JywgKCkgPT4gY3R4LnNsb3RzLnJlZ2lzdGVyKHtcbiAgICBuYW1lOiAnY29udmVyc2F0aW9uLmlucHV0LnJpZ2h0JyxcbiAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZy1yb3V0ZScsXG4gICAgb3JkZXI6IC0xMCxcbiAgICBsb2NhbGU6IE5TLFxuICB9LCBNb2RlbFJvdXRlQmFkZ2UpKSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IGNvbXBvc2VyIG1vZGVsIHJvdXRlJylcbn1cbiIsICIvKiogU2Vzc2lvbi1oZWFkZXIgYWN0aW9uIHRoYXQgcmVmcmVzaGVzIHRoaXMgU2Vzc2lvbidzIHN1YmFnZW50IG1vZGVsIG5vdGVzLiAqL1xuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBCdXR0b24sIEljb25SZWZyZXNoT3V0bGluZVJlZ3VsYXIsIFRvYXN0LCBUb29sdGlwIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktcHJpbWl0aXZlcydcbmltcG9ydCB0eXBlIHsgSW5qZWN0RmFjZSwgUHJvcHNMb2NhbGUsIFByb3BzUnVudGltZSB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJ1xuaW1wb3J0IHR5cGUgeyBNb2RlbE5vdGVzTG9jYWxlS2V5IH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuaW1wb3J0IHR5cGUgeyBSZWZyZXNoUmVzdWx0LCBTZXNzaW9uSWQgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmltcG9ydCBjc3MgZnJvbSAnLi9Nb2RlbE5vdGVzUmVmcmVzaEFjdGlvbi5tb2R1bGUuY3NzJ1xuXG4vKiogUHJvcHMgb2YgdGhlIGhlYWRlciB1dGlsaXR5IGVudHJ5LCB3aXRoIHRoZSByZWZyZXNoIGFjdGlvbiBpbmplY3RlZCBieSB0aGUgcGx1Z2luLiAqL1xuZXhwb3J0IHR5cGUgTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb25Qcm9wcyA9IFByb3BzUnVudGltZTwnY29udmVyc2F0aW9uLnNlc3Npb24uaGVhZGVyLnV0aWxpdGllcyc+XG4gICYgUHJvcHNMb2NhbGU8J3RlYW1Nb2RlbFJvdXRpbmcnPlxuICAmIEluamVjdEZhY2U8eyByZWFkb25seSByZWZyZXNoOiAoaWQ6IFNlc3Npb25JZCkgPT4gUHJvbWlzZTxSZWZyZXNoUmVzdWx0PiB9PlxuXG4vKiogQ29weSBrZXlzIHRoZSBidXR0b24gYW5ub3VuY2VzIGZvciBlYWNoIHJlZnJlc2ggb3V0Y29tZS4gKi9cbmNvbnN0IE1FU1NBR0VfS0VZUzogUmVjb3JkPFJlZnJlc2hSZXN1bHRbJ3N0YXR1cyddLCBNb2RlbE5vdGVzTG9jYWxlS2V5PiA9IHtcbiAgaWRsZTogJ3JlZnJlc2hMYWJlbCcsXG4gIGJ1c3k6ICdyZWZyZXNoQnVzeScsXG4gIHVwZGF0ZWQ6ICdyZWZyZXNoVXBkYXRlZCcsXG4gIHVuY2hhbmdlZDogJ3JlZnJlc2hVbmNoYW5nZWQnLFxuICBmYWlsZWQ6ICdyZWZyZXNoRmFpbGVkJyxcbiAgaW5hY3RpdmU6ICdyZWZyZXNoSW5hY3RpdmUnLFxufVxuXG4vKiogUmVuZGVyIGEgY29tcGFjdCBpY29uIGJ1dHRvbiBtYXRjaGluZyB0aGUgb3RoZXIgU2Vzc2lvbiB1dGlsaXRpZXMuICovXG5leHBvcnQgZnVuY3Rpb24gTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb24oeyBzZXNzaW9uSWQsIHJlZnJlc2gsIHQgfTogTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb25Qcm9wcykge1xuICBjb25zdCBbbm90aWNlLCBzZXROb3RpY2VdID0gdXNlU3RhdGU8UmVmcmVzaFJlc3VsdCB8IHVuZGVmaW5lZD4oKVxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXROb3RpY2UodW5kZWZpbmVkKVxuICAgIHNldEJ1c3koZmFsc2UpXG4gIH0sIFtzZXNzaW9uSWRdKVxuICBjb25zdCBvblJlZnJlc2ggPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVyblxuICAgIHNldEJ1c3kodHJ1ZSlcbiAgICB2b2lkIHJlZnJlc2goc2Vzc2lvbklkKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHNldE5vdGljZShyZXN1bHQpXG4gICAgICBzZXRCdXN5KGZhbHNlKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRvb2x0aXAgbGFiZWw9e3QoYnVzeSA/ICdyZWZyZXNoQnVzeScgOiAncmVmcmVzaExhYmVsJyl9IHNpZGU9XCJib3R0b21cIiBkZWxheU1zPXs1MDB9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICB2YXJpYW50PVwiZ2hvc3RcIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y3NzLnRyaWdnZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17dCgncmVmcmVzaExhYmVsJyl9XG4gICAgICAgICAgYXJpYS1idXN5PXtidXN5fVxuICAgICAgICAgIGRpc2FibGVkPXtidXN5fVxuICAgICAgICAgIGRhdGEtbW9kZWwtbm90ZXMtcmVmcmVzaD1cIlwiXG4gICAgICAgICAgb25DbGljaz17b25SZWZyZXNofVxuICAgICAgICA+XG4gICAgICAgICAgPEljb25SZWZyZXNoT3V0bGluZVJlZ3VsYXIgc2l6ZT17MTZ9IC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Ub29sdGlwPlxuICAgICAge25vdGljZSAhPT0gdW5kZWZpbmVkICYmIG5vdGljZS5zdGF0dXMgIT09ICdpZGxlJyAmJiBub3RpY2Uuc3RhdHVzICE9PSAnYnVzeScgJiYgKFxuICAgICAgICBub3RpY2Uuc3RhdHVzID09PSAndXBkYXRlZCcgfHwgbm90aWNlLnN0YXR1cyA9PT0gJ3VuY2hhbmdlZCdcbiAgICAgICAgICA/IDxUb2FzdFxuICAgICAgICAgICAga2V5PXtgJHtTdHJpbmcoc2Vzc2lvbklkKX0tJHtub3RpY2UubWVzc2FnZX0tJHtEYXRlLm5vdygpfWB9XG4gICAgICAgICAgICB0ZXh0PXt0KE1FU1NBR0VfS0VZU1tub3RpY2Uuc3RhdHVzXSl9XG4gICAgICAgICAgICB0b25lPVwic3VjY2Vzc1wiXG4gICAgICAgICAgICBvbkRvbmU9eygpID0+IHsgc2V0Tm90aWNlKHVuZGVmaW5lZCkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDogPFRvYXN0XG4gICAgICAgICAgICBrZXk9e2Ake1N0cmluZyhzZXNzaW9uSWQpfS0ke25vdGljZS5tZXNzYWdlfS0ke0RhdGUubm93KCl9YH1cbiAgICAgICAgICAgIHRleHQ9e3QoTUVTU0FHRV9LRVlTW25vdGljZS5zdGF0dXNdKX1cbiAgICAgICAgICAgIG9uRG9uZT17KCkgPT4geyBzZXROb3RpY2UodW5kZWZpbmVkKSB9fVxuICAgICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvPlxuICApXG59XG4iLCAiZXhwb3J0IGRlZmF1bHQge1widHJpZ2dlclwiOlwidHJpZ2dlcl9iNzAyMzU4MVwifTsiLCAiLyoqXG4gKiBUaGUgYWN0aXZlIG1vZGVsIHJvdXRlLCBzaG93biBiZXNpZGUgdGhlIGNvbXBvc2VyJ3MgbW9kZWwgc2VsZWN0b3IuXG4gKlxuICogV2lkZSBjb21wb3NlciByb3dzIHNob3cgdGhlIGNvbXBsZXRlIGBwcm92aWRlci9tb2RlbGAgcm91dGUgYXMgdGV4dC4gQSByb3dcbiAqIHRvbyBuYXJyb3cgdG8gaG9sZCBpdHMgZXhwYW5kZWQgY29udHJvbHMgcmVwb3J0cyBgZGF0YS1tb2RlbC1jb21wYWN0YCBvblxuICogaXRzZWxmIChEU0gncyBvd24gY29udHJvbC1yb3cgbWVhc3VyZW1lbnQpLCBhbmQgdGhlIGxhYmVsIHRoZW4gY29sbGFwc2VzIHRvXG4gKiBhIGNoaXAgd2hvc2UgYnViYmxlIG9wZW5zIHVwd2FyZCBvbiBjbGljayBhbmQgdGFwLlxuICovXG5cbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wcmltaXRpdmVzJ1xuaW1wb3J0IHR5cGUgeyBQcm9wc0xvY2FsZSwgUHJvcHNSdW50aW1lIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2xvdHMnXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1jb252ZXJzYXRpb24vY2xpZW50J1xuaW1wb3J0IHsgbW9kZWxMYWJlbE9mIH0gZnJvbSAnLi9tb2RlbC1sYWJlbC50cydcbmltcG9ydCB0eXBlIHsgTW9kZWxTZWxlY3Rpb25WaWV3IH0gZnJvbSAnLi9tb2RlbC1zZWxlY3Rpb24tdmlldy50cydcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0xvY2FsZUtleSB9IGZyb20gJy4vbG9jYWxlcy50cydcbmltcG9ydCBjc3MgZnJvbSAnLi9Nb2RlbFJvdXRlQmFkZ2UubW9kdWxlLmNzcydcblxuLyoqIFByb3BzIG9mIHRoZSBjb21wb3NlciBtb2RlbC1yb3V0ZSBlbnRyeTogdGhlIFNlc3Npb24ncyBwcm9qZWN0aW9uIHJlYWRlciBhbmQgY29weS4gKi9cbmV4cG9ydCB0eXBlIE1vZGVsUm91dGVCYWRnZVByb3BzID0gUHJvcHNSdW50aW1lPCdjb252ZXJzYXRpb24uaW5wdXQucmlnaHQnPlxuICAmIFByb3BzTG9jYWxlPCd0ZWFtTW9kZWxSb3V0aW5nJz5cblxuLyoqIFRoZSBTZXNzaW9uJ3MgYG1vZGVsU2VsZWN0aW9uYCByZWFkZXIsIGFzIHRoZSByZW5kZXJlciBiaW5kcyBpdC4gKi9cbnR5cGUgUmVhZE1vZGVsU2VsZWN0aW9uID0gKGtleTogJ21vZGVsU2VsZWN0aW9uJykgPT4gTW9kZWxTZWxlY3Rpb25WaWV3IHwgdW5kZWZpbmVkXG5cbi8qKiBBIGNvbXBhY3Qgcm91dGUgZ2x5cGgsIGRpc3RpbmN0IGZyb20gdGhlIHJlZnJlc2ggYWN0aW9uJ3MgY2lyY3VsYXIgYXJyb3cuICovXG5mdW5jdGlvbiBSb3V0ZUdseXBoKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmcgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8Y2lyY2xlIGN4PVwiMy43NVwiIGN5PVwiNFwiIHI9XCIxLjc1XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjNcIiAvPlxuICAgICAgPGNpcmNsZSBjeD1cIjEyLjI1XCIgY3k9XCIxMlwiIHI9XCIxLjc1XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjNcIiAvPlxuICAgICAgPHBhdGggZD1cIk0zLjc1IDUuNzV2My4yNWEzIDMgMCAwIDAgMyAzaDUuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS4zXCIgLz5cbiAgICA8L3N2Zz5cbiAgKVxufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgU2Vzc2lvbidzIG1vZGVsIHJvdXRlOiBmdWxsIHRleHQgd2hlbiB0aGUgY29tcG9zZXIgcm93IGhhcyByb29tLFxuICogb3RoZXJ3aXNlIGEgY2hpcCB0aGF0IG9wZW5zIHRoZSBzYW1lIHRleHQgdXB3YXJkIG9uIGNsaWNrIG9yIHRhcC4gT25seSBhXG4gKiBzdWJhZ2VudCBTZXNzaW9uIHNob3dzIGl0OyBhIHJvb3QgU2Vzc2lvbiBrZWVwcyBpdHMgdW5tb2RpZmllZCBjb21wb3NlcixcbiAqIGJlY2F1c2UgdGhlIG1vZGVsIHNlbGVjdG9yIGJlc2lkZSBpdCBhbHJlYWR5IG5hbWVzIHRoYXQgU2Vzc2lvbidzIHJvdXRlLlxuICogQHBhcmFtIHByb3BzIC0gdGhlIFNlc3Npb24ncyBsaWZlY3ljbGUgYW5kIHByb2plY3Rpb24gcmVhZGVycywgYW5kIGNvcHkuXG4gKiBAcmV0dXJucyB0aGUgcm91dGUgbGFiZWwsIG9yIG51bGwgZm9yIGEgcm9vdCBTZXNzaW9uIG9yIGJlZm9yZSBhbnkgcm91dGUgaXMgcmVjb3JkZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNb2RlbFJvdXRlQmFkZ2UoeyB1c2VTZXNzaW9uLCB1c2VQcm9qZWN0aW9uLCB0IH06IE1vZGVsUm91dGVCYWRnZVByb3BzKSB7XG4gIGNvbnN0IHN1YmFnZW50ID0gdXNlU2Vzc2lvbihzbmFwc2hvdCA9PiBzbmFwc2hvdC5zdWJhZ2VudClcbiAgLy8gVGhlIGluc3RhbGxlZCBTbG90TWFwIGNhcnJpZXMgbm8gcHJvamVjdGlvbiB0YWJsZTsgdGhlIHJlYWRlciByZXR1cm5zIHRoaXNcbiAgLy8gb25lIGtleSdzIHZhbHVlLCB3aGljaCB0aGUgbGFiZWwgbmFycm93cyBpdHNlbGYuXG4gIGNvbnN0IHJlYWQgPSB1c2VQcm9qZWN0aW9uIGFzIHVua25vd24gYXMgUmVhZE1vZGVsU2VsZWN0aW9uXG4gIGNvbnN0IGxhYmVsID0gbW9kZWxMYWJlbE9mKHJlYWQoJ21vZGVsU2VsZWN0aW9uJykpXG4gIGlmIChzdWJhZ2VudCA9PT0gbnVsbCB8fCBsYWJlbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuICBjb25zdCBhY2Nlc3NpYmxlID0gdCgncm91dGVBcmlhJywgeyByb3V0ZTogbGFiZWwucm91dGUgfSlcbiAgcmV0dXJuIChcbiAgICA8VG9vbHRpcFxuICAgICAgbGFiZWw9e2xhYmVsLnRpdGxlfVxuICAgICAgc2lkZT1cInRvcFwiXG4gICAgICBhbGlnbj1cImVuZFwiXG4gICAgICBwb3J0YWxcbiAgICAgIG9wZW5PbkNsaWNrXG4gICAgICBmb2N1c0RlbGF5TXM9ezB9XG4gICAgICBtYXhXaWR0aD17MzIwfVxuICAgID5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17Y3NzLnRyaWdnZXJ9IGFyaWEtbGFiZWw9e2FjY2Vzc2libGV9IGRhdGEtbW9kZWwtcm91dGU9e2xhYmVsLnJvdXRlfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjc3MuZ2x5cGh9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxSb3V0ZUdseXBoIC8+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Nzcy50ZXh0fT57bGFiZWwucm91dGV9PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9Ub29sdGlwPlxuICApXG59XG4iLCAiLyoqXG4gKiBUaGUgYWN0aXZlIG1vZGVsIGxhYmVsIHNob3duIGJlc2lkZSB0aGUgY29tcG9zZXIncyBtb2RlbCBzZWxlY3Rvci5cbiAqXG4gKiBUaGUgbGFiZWwgbmFtZXMgdGhlIGV4YWN0IHJvdXRlIHRoZSBTZXNzaW9uIGlzIHJ1bm5pbmcgb24sIHNvIGEgc3ViYWdlbnRcbiAqIFNlc3Npb24gc2hvd3Mgd2hpY2ggbW9kZWwgaXRzIHN1YmFnZW50IGFjdHVhbGx5IHVzZXMuIEl0IGFkZHMgbm90aGluZyBvZiBpdHNcbiAqIG93bjogRFNIJ3MgYG1vZGVsU2VsZWN0aW9uYCBwcm9qZWN0aW9uIGFscmVhZHkgaG9sZHMgdGhlIHJvdXRlLlxuICpcbiAqIEBtb2R1bGUgZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmcy9jbGllbnQvbW9kZWwtbGFiZWxcbiAqL1xuXG5pbXBvcnQgdHlwZSB7IE1vZGVsU2VsZWN0aW9uVmlldyB9IGZyb20gJy4vbW9kZWwtc2VsZWN0aW9uLXZpZXcudHMnXG5cbi8qKiBPbmUgcmVuZGVyZWQgbW9kZWwgbGFiZWw6IHRoZSBmdWxsIHJvdXRlIHBsdXMgdGhlIGNvbXBhY3QgZmFsbGJhY2sgbmFtZXMuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTGFiZWwge1xuICAvKiogQ29tcGxldGUgYHByb3ZpZGVyL21vZGVsYCByb3V0ZSwgc2hvd24gd2hlbiB0aGUgY29tcG9zZXIgcm93IGhhcyByb29tLiAqL1xuICByZWFkb25seSByb3V0ZTogc3RyaW5nXG4gIC8qKiBNb2RlbCBpZCBhbG9uZSwgZm9yIHN1cmZhY2VzIHRvbyBuYXJyb3cgZm9yIHRoZSBwcm92aWRlciBwcmVmaXguICovXG4gIHJlYWRvbmx5IG1vZGVsOiBzdHJpbmdcbiAgLyoqIEFjY2Vzc2libGUgbmFtZSBhbmQgYnViYmxlIHRleHQsIHRoZSBzYW1lIGZ1bGwgcm91dGUuICovXG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmdcbn1cblxuLyoqXG4gKiBCdWlsZCB0aGUgbGFiZWwgZnJvbSB0aGUgU2Vzc2lvbidzIG1vZGVsLXNlbGVjdGlvbiBwcm9qZWN0aW9uLlxuICogQHBhcmFtIHZpZXcgLSBgbW9kZWxTZWxlY3Rpb25gIHZhbHVlLCBvciB1bmRlZmluZWQgd2hpbGUgbm8gU2Vzc2lvbiBvciBubyBzZWxlY3Rpb24gZXhpc3RzLlxuICogQHJldHVybnMgdGhlIGxhYmVsLCBvciB1bmRlZmluZWQgd2hlbiB0aGUgU2Vzc2lvbiByZWNvcmRlZCBubyByb3V0ZSB5ZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb2RlbExhYmVsT2YodmlldzogTW9kZWxTZWxlY3Rpb25WaWV3IHwgdW5kZWZpbmVkKTogTW9kZWxMYWJlbCB8IHVuZGVmaW5lZCB7XG4gIGlmICh2aWV3ID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWRcbiAgLy8gYG5leHRgIGlzIHRoZSB1cGNvbWluZyByb3V0ZSBhbmQgZmFsbHMgYmFjayB0byB0aGUgbGFzdCB1c2VkIG9uZSwgc28gaXQgaXNcbiAgLy8gdGhlIHJvdXRlIHRoZSBuZXh0IHJlcXVlc3Qgd2lsbCBhY3R1YWxseSBzZW5kLlxuICBjb25zdCByb3V0ZSA9IHZpZXcubmV4dCA/PyB2aWV3Lmxhc3RVc2VkXG4gIGlmIChyb3V0ZSA9PT0gbnVsbCkgcmV0dXJuIHVuZGVmaW5lZFxuICByZXR1cm4ge1xuICAgIHJvdXRlOiBgJHtyb3V0ZS5wcm92aWRlcn0vJHtyb3V0ZS5tb2RlbH1gLFxuICAgIG1vZGVsOiByb3V0ZS5tb2RlbCxcbiAgICB0aXRsZTogYCR7cm91dGUucHJvdmlkZXJ9LyR7cm91dGUubW9kZWx9YCxcbiAgfVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IHtcInRyaWdnZXJcIjpcInRyaWdnZXJfOGI2ZGMwMGFcIixcImdseXBoXCI6XCJnbHlwaF84YjZkYzAwYVwiLFwidGV4dFwiOlwidGV4dF84YjZkYzAwYVwifTsiLCAiLyoqXG4gKiBUaGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwsIGNvbnRyaWJ1dGVkIHRvIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwbHVnaW5cbiAqIHBhZ2Ugb24gdGhlIFBsdWdpbnMgcGFnZSwgYmVsb3cgdGhhdCBwYWdlJ3MgbW9kZWwgYXV0aG9yaXphdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyB1c2VJZCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHR5cGUgeyBJbmplY3RGYWNlLCBQcm9wc0xvY2FsZSwgUHJvcHNSdW50aW1lIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2xvdHMnXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wbHVnaW4tbWFuYWdlci9jbGllbnQnXG5pbXBvcnQgeyBTZXR0aW5nc0Zvcm0gfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wcmltaXRpdmVzJ1xuaW1wb3J0IHsgZm9ybUxhYmVscyB9IGZyb20gJy4vbG9jYWxlcy50cydcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0ZhY2UsIE1vZGVsTm90ZXNTdGF0ZSB9IGZyb20gJy4vbW9kZWwtbm90ZXMtY29udHJvbGxlci50cydcbmltcG9ydCBjc3MgZnJvbSAnLi9Nb2RlbE5vdGVzU2VjdGlvbi5tb2R1bGUuY3NzJ1xuXG4vKiogYHBsdWdpbnMuaXRlbWAgaWQgb2YgdGhlIG9mZmljaWFsIFN1YmFnZW50IHNldHRpbmdzIHBhZ2UgdGhpcyBwYW5lbCBqb2lucy4gKi9cbmV4cG9ydCBjb25zdCBTVUJBR0VOVF9JVEVNX0lEID0gJ3N1YmFnZW50J1xuXG4vKiogRnJhbWV3b3JrLWRlcml2ZWQgcHJvcHM6IHRoZSBkZXRhaWwgcGFnZSdzIHN1YmplY3QsIHRoaXMgcGx1Z2luJ3MgZGljdGlvbmFyeSwgYW5kIGl0cyBzdGFnZWQgYWN0aW9ucy4gKi9cbmV4cG9ydCB0eXBlIE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgPSBQcm9wc1J1bnRpbWU8J3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nPlxuICAmIFByb3BzTG9jYWxlPCd0ZWFtTW9kZWxSb3V0aW5nJz5cbiAgJiBJbmplY3RGYWNlPE1vZGVsTm90ZXNGYWNlPlxuXG4vKipcbiAqIFJlbmRlciB0aGUgbm90ZXMgcGFuZWwgb24gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBhZ2UsIG9yIG5vdGhpbmcgZm9yIGFueSBvdGhlciBwYWdlLlxuICogQHBhcmFtIHByb3BzIC0gdGhlIHBhZ2Ugc3ViamVjdCwgbG9jYWxlIGNvcHksIHRoZSBzdGFnZWQgcGFuZWwgc25hcHNob3QsIGFuZCBpdHMgYWN0aW9ucy5cbiAqIEByZXR1cm5zIHRoZSBzdGFnZWQgbm90ZXMgZm9ybSwgb3IgbnVsbCBvbiBhbnkgb3RoZXIgcGFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1vZGVsTm90ZXNTZWN0aW9uKHByb3BzOiBNb2RlbE5vdGVzU2VjdGlvblByb3BzKSB7XG4gIGNvbnN0IHsgc3ViamVjdCB9ID0gcHJvcHNcbiAgaWYgKHN1YmplY3Qua2luZCAhPT0gJ2l0ZW0nIHx8IHN1YmplY3QuaWQgIT09IFNVQkFHRU5UX0lURU1fSUQpIHJldHVybiBudWxsXG4gIHJldHVybiA8TW9kZWxOb3Rlc1BhbmVsIHByb3BzPXtwcm9wc30gLz5cbn1cblxuLyoqIFN1YnNjcmliZSBvbmx5IHdoaWxlIHRoZSBTdWJhZ2VudCBwYWdlIGlzIHJlbmRlcmVkLiAqL1xuZnVuY3Rpb24gTW9kZWxOb3Rlc1BhbmVsKHsgcHJvcHMgfTogeyByZWFkb25seSBwcm9wczogTW9kZWxOb3Rlc1NlY3Rpb25Qcm9wcyB9KSB7XG4gIGNvbnN0IHN0YXRlID0gcHJvcHMudXNlTW9kZWxOb3RlcyhzbmFwc2hvdCA9PiBzbmFwc2hvdClcbiAgcmV0dXJuIDxNb2RlbE5vdGVzRmllbGRzIHByb3BzPXtwcm9wc30gc3RhdGU9e3N0YXRlfSAvPlxufVxuXG4vKiogSGVhZGluZywgaGludCwgb25lIGZpZWxkc2V0IHBlciBzYXZlZCBhdXRob3JpemVkIG1vZGVsLCBhbmQgdGhlIGZvcm0ncyBzYXZlLiAqL1xuZnVuY3Rpb24gTW9kZWxOb3Rlc0ZpZWxkcyh7IHByb3BzLCBzdGF0ZSB9OiB7XG4gIHJlYWRvbmx5IHByb3BzOiBNb2RlbE5vdGVzU2VjdGlvblByb3BzXG4gIHJlYWRvbmx5IHN0YXRlOiBNb2RlbE5vdGVzU3RhdGVcbn0pIHtcbiAgY29uc3QgeyB0IH0gPSBwcm9wc1xuICBjb25zdCBoZWFkaW5nSWQgPSB1c2VJZCgpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtjc3Muc2VjdGlvbn0gYXJpYS1sYWJlbGxlZGJ5PXtoZWFkaW5nSWR9IGRhdGEtcGx1Z2luLW1vZGVsLW5vdGVzPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5pbnRyb30+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9e2Nzcy5oZWFkaW5nfSBpZD17aGVhZGluZ0lkfT57dCgnc2VjdGlvblRpdGxlJyl9PC9oMz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPXtjc3MuaGludH0+e3QoJ3NlY3Rpb25IaW50Jyl9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8U2V0dGluZ3NGb3JtIGxhYmVscz17Zm9ybUxhYmVscyh0KX0gc3RhdGU9e3N0YXRlfSBvblNhdmU9e3Byb3BzLnNhdmV9IG9uRGlzY2FyZD17cHJvcHMuZGlzY2FyZH0+XG4gICAgICAgIHshc3RhdGUuc2VsZWN0aW9uQXZhaWxhYmxlXG4gICAgICAgICAgPyA8cCBjbGFzc05hbWU9e2Nzcy5oaW50fT57dCgnc2VsZWN0aW9uVW5hdmFpbGFibGUnKX08L3A+XG4gICAgICAgICAgOiBzdGF0ZS5yb3dzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9e2Nzcy5oaW50fT57dCgnc2VsZWN0aW9uRW1wdHknKX08L3A+XG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5ub3Rlc30+XG4gICAgICAgICAgICAgICAge3N0YXRlLnJvd3MubWFwKHJvdyA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZmllbGRzZXQga2V5PXtyb3cua2V5fSBjbGFzc05hbWU9e2Nzcy5ub3RlR3JvdXB9IGRhdGEtbW9kZWwtbm90ZS1yb3c+XG4gICAgICAgICAgICAgICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPXtjc3MubGVnZW5kfT57YCR7cm93LnByb3ZpZGVyfS8ke3Jvdy5tb2RlbH1gfTwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICB7KFsnY2FwYWJpbGl0eScsICdzY2VuYXJpbyddIGFzIGNvbnN0KS5tYXAoZmllbGQgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBrZXk9e2ZpZWxkfSBjbGFzc05hbWU9e2Nzcy5ub3RlRmllbGR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoZmllbGQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nzcy50ZXh0YXJlYX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Jvd1tmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshc3RhdGUud3JpdGFibGUgfHwgc3RhdGUuc2F2aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7IHByb3BzLnNldE1vZGVsTm90ZShyb3cua2V5LCBmaWVsZCwgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIHtzdGF0ZS5jb25mbGljdGVkID8gPHAgY2xhc3NOYW1lPXtjc3MuY29uZmxpY3R9IHJvbGU9XCJzdGF0dXNcIj57dCgnY29uZmxpY3QnKX08L3A+IDogbnVsbH1cbiAgICAgIDwvU2V0dGluZ3NGb3JtPlxuICAgIDwvc2VjdGlvbj5cbiAgKVxufVxuIiwgIi8qKiBMb2NhbGUgYnVuZGxlcyBmb3IgdGhlIHN1YmFnZW50IG1vZGVsIG5vdGVzIHBhbmVsLiAqL1xuXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzRm9ybUxhYmVscyB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXG4vLyBUeXBlLW9ubHk6IHRoZSBucyBcdTIxOTIga2V5IHVuaW9uIG1lcmdlLiBgcmVnaXN0ZXIoTlMsIHsgemgsIGVuIH0pYCBjaGVja3MgYm90aFxuLy8gZGljdGlvbmFyaWVzIGFnYWluc3QgaXQsIHNvIGEga2V5IG1pc3NpbmcgZnJvbSBlaXRoZXIgaXMgYSBjb21waWxlIGVycm9yLlxuaW1wb3J0IHR5cGUge30gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2xvdHMnXG5cbi8qKiBMb2NhbGUga2V5cyB0aGUgcGFuZWwgcmVuZGVycy4gKi9cbmV4cG9ydCB0eXBlIE1vZGVsTm90ZXNMb2NhbGVLZXkgPVxuICB8ICd1bmF2YWlsYWJsZScgfCAncmVhZE9ubHknIHwgJ3NhdmUnIHwgJ3NhdmluZycgfCAnc2F2ZUZhaWxlZCdcbiAgfCAnc2VjdGlvblRpdGxlJyB8ICdzZWN0aW9uSGludCcgfCAnY2FwYWJpbGl0eScgfCAnc2NlbmFyaW8nXG4gIHwgJ3NlbGVjdGlvblVuYXZhaWxhYmxlJyB8ICdzZWxlY3Rpb25FbXB0eScgfCAnY29uZmxpY3QnXG4gIHwgJ3JlZnJlc2hMYWJlbCcgfCAncmVmcmVzaEJ1c3knIHwgJ3JlZnJlc2hVcGRhdGVkJyB8ICdyZWZyZXNoVW5jaGFuZ2VkJyB8ICdyZWZyZXNoRmFpbGVkJyB8ICdyZWZyZXNoSW5hY3RpdmUnXG4gIHwgJ3JvdXRlQXJpYSdcblxuLyoqIEVuZ2xpc2ggY29weS4gKi9cbmV4cG9ydCBjb25zdCBlbjogUmVjb3JkPE1vZGVsTm90ZXNMb2NhbGVLZXksIHN0cmluZz4gPSB7XG4gIHVuYXZhaWxhYmxlOiAnVGhpcyBwbHVnaW4gaXMgbm90IGxvYWRlZCwgc28gaXQgY2Fubm90IGJlIGNvbmZpZ3VyZWQgcmlnaHQgbm93LicsXG4gIHJlYWRPbmx5OiAnVGhpcyBkZXBsb3ltZW50IHN0b3JlcyBzZXR0aW5ncyByZWFkLW9ubHkuJyxcbiAgc2F2ZTogJ1NhdmUnLFxuICBzYXZpbmc6ICdTYXZpbmdcdTIwMjYnLFxuICBzYXZlRmFpbGVkOiAnVGhlIHNhdmUgY291bGQgbm90IGJlIGNvbmZpcm1lZCBhbmQgbWF5IGhhdmUgYmVlbiBhcHBsaWVkLiBZb3VyIGRyYWZ0IGlzIHJldGFpbmVkOyBjaGVjayB0aGUgY3VycmVudCBzZXR0aW5ncyBiZWZvcmUgdHJ5aW5nIGFnYWluLicsXG4gIHNlY3Rpb25UaXRsZTogJ01vZGVsIG5vdGVzJyxcbiAgc2VjdGlvbkhpbnQ6ICdEZXNjcmliZSB3aGF0IGVhY2ggYWxsb3dlZCBtb2RlbCBpcyBnb29kIGF0IGFuZCB3aGVuIHRvIHVzZSBpdC4gQWdlbnRzIHJlYWQgdGhlc2Ugbm90ZXMgZm9yIHJlZmVyZW5jZSB3aGVuIHRoZXkgY2hvb3NlIGEgc3ViYWdlbnQgbW9kZWwuIENoYW5nZXMgYXBwbHkgdG8gbmV3IHNlc3Npb25zOyByZWZyZXNoIGFuIGV4aXN0aW5nIHNlc3Npb24gZnJvbSBpdHMgaGVhZGVyLicsXG4gIGNhcGFiaWxpdHk6ICdDYXBhYmlsaXR5JyxcbiAgc2NlbmFyaW86ICdTY2VuYXJpbycsXG4gIHNlbGVjdGlvblVuYXZhaWxhYmxlOiAnU3ViYWdlbnQgbW9kZWwgc2VsZWN0aW9uIGlzIHVuYXZhaWxhYmxlLCBzbyBtb2RlbCBub3RlcyBjYW5ub3QgYmUgZWRpdGVkIHJpZ2h0IG5vdy4nLFxuICBzZWxlY3Rpb25FbXB0eTogJ1R1cm4gb24gbW9kZWwgc2VsZWN0aW9uIGFib3ZlLCBjaGVjayBtb2RlbHMsIGFuZCBzYXZlLiBFYWNoIHNhdmVkIG1vZGVsIHRoZW4gZ2V0cyBpdHMgbm90ZSBmaWVsZHMgaGVyZS4nLFxuICBjb25mbGljdDogJ1RoZXNlIG5vdGVzIGNoYW5nZWQgd2hpbGUgeW91IHdlcmUgZWRpdGluZy4gWW91ciBkcmFmdCBjYW5ub3QgYmUgc2F2ZWQgYWdhaW5zdCB0aGUgbmV3ZXIgdmFsdWVzLiBMZWF2ZSB0aGlzIHBhZ2UgdG8gZGlzY2FyZCB0aGUgZHJhZnQsIGNoZWNrIHRoZSBjdXJyZW50IG5vdGVzLCB0aGVuIGVkaXQgYWdhaW4uJyxcbiAgcmVmcmVzaExhYmVsOiAnUmVmcmVzaCBzdWJhZ2VudCBtb2RlbCBub3RlcyBmb3IgdGhpcyBzZXNzaW9uJyxcbiAgcmVmcmVzaEJ1c3k6ICdSZWZyZXNoaW5nIHN1YmFnZW50IG1vZGVsIG5vdGVzXHUyMDI2JyxcbiAgcmVmcmVzaFVwZGF0ZWQ6ICdTdWJhZ2VudCBtb2RlbCBub3RlcyB1cGRhdGVkOyB0aGUgbmV4dCBtZXNzYWdlIHdpbGwgdXNlIHRoZSBuZXcgbGlzdC4nLFxuICByZWZyZXNoVW5jaGFuZ2VkOiAnU3ViYWdlbnQgbW9kZWwgbm90ZXMgYXJlIGFscmVhZHkgdXAgdG8gZGF0ZS4nLFxuICByZWZyZXNoRmFpbGVkOiAnQ291bGQgbm90IHJlZnJlc2ggc3ViYWdlbnQgbW9kZWwgbm90ZXMuIFRyeSBhZ2Fpbi4nLFxuICByZWZyZXNoSW5hY3RpdmU6ICdUaGlzIHNlc3Npb24gaXMgbm90IGFjdGl2ZSB5ZXQuIFNlbmQgYSBtZXNzYWdlLCB0aGVuIHJlZnJlc2ggYWdhaW4uJyxcbiAgcm91dGVBcmlhOiAnQ3VycmVudCBtb2RlbDoge3JvdXRlfScsXG59XG5cbi8qKiBTaW1wbGlmaWVkIENoaW5lc2UgY29weS4gKi9cbmV4cG9ydCBjb25zdCB6aDogUmVjb3JkPE1vZGVsTm90ZXNMb2NhbGVLZXksIHN0cmluZz4gPSB7XG4gIHVuYXZhaWxhYmxlOiAnXHU4QkU1XHU2M0QyXHU0RUY2XHU1RjUzXHU1MjREXHU2NzJBXHU1MkEwXHU4RjdEXHVGRjBDXHU2NjgyXHU2NUY2XHU2NUUwXHU2Q0Q1XHU5MTREXHU3RjZFXHUzMDAyJyxcbiAgcmVhZE9ubHk6ICdcdTY3MkNcdTkwRThcdTdGNzJcdTc2ODRcdThCQkVcdTdGNkVcdTRFM0FcdTUzRUFcdThCRkJcdTMwMDInLFxuICBzYXZlOiAnXHU0RkREXHU1QjU4JyxcbiAgc2F2aW5nOiAnXHU0RkREXHU1QjU4XHU0RTJEXHUyMDI2JyxcbiAgc2F2ZUZhaWxlZDogJ1x1NjVFMFx1NkNENVx1Nzg2RVx1OEJBNFx1NEZERFx1NUI1OFx1N0VEM1x1Njc5Q1x1RkYwQ1x1OEJCRVx1N0Y2RVx1NTNFRlx1ODBGRFx1NURGMlx1N0VDRlx1NzUxRlx1NjU0OFx1MzAwMlx1ODM0OVx1N0EzRlx1NURGMlx1NEZERFx1NzU1OVx1RkYxQlx1OEJGN1x1NTE0OFx1NjgzOFx1NUJGOVx1NUY1M1x1NTI0RFx1OEJCRVx1N0Y2RVx1NTE4RFx1OTFDRFx1OEJENVx1MzAwMicsXG4gIHNlY3Rpb25UaXRsZTogJ1x1NkEyMVx1NTc4Qlx1OEJGNFx1NjYwRScsXG4gIHNlY3Rpb25IaW50OiAnXHU0RTNBXHU2QkNGXHU0RTJBXHU1REYyXHU2Mzg4XHU2NzQzXHU3Njg0XHU2QTIxXHU1NzhCXHU1ODZCXHU1MTk5XHU4MEZEXHU1MjlCXHU4QkY0XHU2NjBFXHU1NDhDXHU5MDAyXHU3NTI4XHU1NzNBXHU2NjZGXHVGRjBDXHU0RjlCXHU2NjdBXHU4MEZEXHU0RjUzXHU5MDA5XHU2MkU5XHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU2NUY2XHU1M0MyXHU4MDAzXHUzMDAyXHU2NkY0XHU2NTM5XHU5RUQ4XHU4QkE0XHU0RUM1XHU1QkY5XHU2NUIwXHU0RjFBXHU4QkREXHU3NTFGXHU2NTQ4XHVGRjFCXHU1REYyXHU2NzA5XHU0RjFBXHU4QkREXHU1M0VGXHU1NzI4XHU0RjFBXHU4QkREXHU1OTM0XHU5MEU4XHU2MjRCXHU1MkE4XHU1MjM3XHU2NUIwXHUzMDAyJyxcbiAgY2FwYWJpbGl0eTogJ1x1ODBGRFx1NTI5Qlx1OEJGNFx1NjYwRScsXG4gIHNjZW5hcmlvOiAnXHU5MDAyXHU3NTI4XHU1NzNBXHU2NjZGJyxcbiAgc2VsZWN0aW9uVW5hdmFpbGFibGU6ICdcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdTkwMDlcdTYyRTlcdTVGNTNcdTUyNERcdTRFMERcdTUzRUZcdTc1MjhcdUZGMENcdTY2ODJcdTY1RjZcdTY1RTBcdTZDRDVcdTdGMTZcdThGOTFcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEUnLFxuICBzZWxlY3Rpb25FbXB0eTogJ1x1NTcyOFx1NEUwQVx1NjVCOVx1NUYwMFx1NTQyRlx1NkEyMVx1NTc4Qlx1OTAwOVx1NjJFOVx1MzAwMVx1NTJGRVx1OTAwOVx1NkEyMVx1NTc4Qlx1NUU3Nlx1NEZERFx1NUI1OFx1NTQwRVx1RkYwQ1x1NTNFRlx1NTcyOFx1OEZEOVx1OTFDQ1x1NEUzQVx1NkJDRlx1NEUyQVx1NURGMlx1NEZERFx1NUI1OFx1NzY4NFx1NkEyMVx1NTc4Qlx1NTg2Qlx1NTE5OVx1OEJGNFx1NjYwRScsXG4gIGNvbmZsaWN0OiAnXHU3RjE2XHU4RjkxXHU2NzFGXHU5NUY0XHU4QkY0XHU2NjBFXHU1REYyXHU1M0QxXHU3NTFGXHU1M0Q4XHU1MzE2XHVGRjBDXHU2NUUwXHU2Q0Q1XHU1N0ZBXHU0RThFXHU4RjgzXHU2NUIwXHU3Njg0XHU1MDNDXHU0RkREXHU1QjU4XHU4MzQ5XHU3QTNGXHUzMDAyXHU4QkY3XHU3OUJCXHU1RjAwXHU2QjY0XHU5ODc1XHU5NzYyXHU2NTNFXHU1RjAzXHU4MzQ5XHU3QTNGXHVGRjBDXHU2ODM4XHU1QkY5XHU1RjUzXHU1MjREXHU4QkY0XHU2NjBFXHU1NDBFXHU5MUNEXHU2NUIwXHU3RjE2XHU4RjkxXHUzMDAyJyxcbiAgcmVmcmVzaExhYmVsOiAnXHU1MjM3XHU2NUIwXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREXHU3Njg0XHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFJyxcbiAgcmVmcmVzaEJ1c3k6ICdcdTZCNjNcdTU3MjhcdTUyMzdcdTY1QjBcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEVcdTIwMjYnLFxuICByZWZyZXNoVXBkYXRlZDogJ1x1NUI1MFx1NEVFM1x1NzQwNlx1NkEyMVx1NTc4Qlx1OEJGNFx1NjYwRVx1NURGMlx1NjZGNFx1NjVCMFx1RkYwQ1x1NEUwQlx1NEUwMFx1Njc2MVx1NkQ4OFx1NjA2Rlx1NUMwNlx1NEY3Rlx1NzUyOFx1NjVCMFx1NTIxN1x1ODg2OFx1MzAwMicsXG4gIHJlZnJlc2hVbmNoYW5nZWQ6ICdcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEVcdTVERjJcdTY2MkZcdTY3MDBcdTY1QjBcdTMwMDInLFxuICByZWZyZXNoRmFpbGVkOiAnXHU1MjM3XHU2NUIwXHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFXHU1OTMxXHU4RDI1XHVGRjBDXHU4QkY3XHU5MUNEXHU4QkQ1XHUzMDAyJyxcbiAgcmVmcmVzaEluYWN0aXZlOiAnXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREXHU1QzFBXHU2NzJBXHU2RkMwXHU2RDNCXHVGRjBDXHU4QkY3XHU1MTQ4XHU1M0QxXHU5MDAxXHU0RTAwXHU2NzYxXHU2RDg4XHU2MDZGXHU1MThEXHU1MjM3XHU2NUIwXHUzMDAyJyxcbiAgcm91dGVBcmlhOiAnXHU1RjUzXHU1MjREXHU2QTIxXHU1NzhCXHVGRjFBe3JvdXRlfScsXG59XG5cbi8qKlxuICogVGhlIGZvcm0gZnJhbWUncyBjb3B5LCByZWFkIGZyb20gdGhpcyBwYW5lbCdzIGRpY3Rpb25hcnkuXG4gKiBAcGFyYW0gdCAtIHRoZSBwYW5lbCdzIGxvY2FsZSByZWFkZXIuXG4gKiBAcmV0dXJucyB0aGUgbGFiZWxzIHRoZSBzaGFyZWQgc2V0dGluZ3MgZm9ybSByZW5kZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybUxhYmVscyh0OiAoa2V5OiBNb2RlbE5vdGVzTG9jYWxlS2V5KSA9PiBzdHJpbmcpOiBTZXR0aW5nc0Zvcm1MYWJlbHMge1xuICByZXR1cm4ge1xuICAgIHVuYXZhaWxhYmxlOiB0KCd1bmF2YWlsYWJsZScpLFxuICAgIHJlYWRPbmx5OiB0KCdyZWFkT25seScpLFxuICAgIHNhdmVGYWlsZWQ6IHQoJ3NhdmVGYWlsZWQnKSxcbiAgICBzYXZlOiB0KCdzYXZlJyksXG4gICAgc2F2aW5nOiB0KCdzYXZpbmcnKSxcbiAgfVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IHtcInNlY3Rpb25cIjpcInNlY3Rpb25fMWZjZmM5NjdcIixcImludHJvXCI6XCJpbnRyb18xZmNmYzk2N1wiLFwiaGVhZGluZ1wiOlwiaGVhZGluZ18xZmNmYzk2N1wiLFwiaGludFwiOlwiaGludF8xZmNmYzk2N1wiLFwiY29uZmxpY3RcIjpcImNvbmZsaWN0XzFmY2ZjOTY3XCIsXCJub3Rlc1wiOlwibm90ZXNfMWZjZmM5NjdcIixcIm5vdGVHcm91cFwiOlwibm90ZUdyb3VwXzFmY2ZjOTY3XCIsXCJub3RlRmllbGRcIjpcIm5vdGVGaWVsZF8xZmNmYzk2N1wiLFwibGVnZW5kXCI6XCJsZWdlbmRfMWZjZmM5NjdcIixcInRleHRhcmVhXCI6XCJ0ZXh0YXJlYV8xZmNmYzk2N1wifTsiLCAiLyoqXG4gKiBTdGFnZWQgZWRpdG9yIGZvciBzdWJhZ2VudCBtb2RlbCBub3Rlcy5cbiAqXG4gKiBUaGUgcGFuZWwgZWRpdHMgYG1vZGVsTm90ZXNgIGluIHRoaXMgcGx1Z2luJ3MgSG9zdCBlbnRyeSBhbmQgcmVhZHMsIHdpdGhvdXRcbiAqIHdyaXRpbmcsIHRoZSByb3V0ZXMgdGhlIG9mZmljaWFsIHN1YmFnZW50IG1vZGVsIGF1dGhvcml6YXRpb24gc2F2ZWQuIEEgbm90ZVxuICogZmllbGQgaXMgb2ZmZXJlZCBmb3IgZXZlcnkgc2F2ZWQgYXV0aG9yaXplZCByb3V0ZTsgbm90ZXMgb2Ygb3RoZXIgcm91dGVzIHN0YXlcbiAqIGluIHRoZSBkcmFmdCBhbmQgaW4gZXZlcnkgc2F2ZSwgc28gYSByb3V0ZSB0aGUgdXNlciB1bmNoZWNrcyBhbmQgY2hlY2tzIGFnYWluXG4gKiBnZXRzIGl0cyBub3RlIGJhY2suXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlU25hcHNob3RTdG9yZSwgdHlwZSBTbmFwc2hvdFN0b3JlIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtc3RvcmUnXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzRm9ybVNjb3BlLCBTZXR0aW5nc0Zvcm1TaGVsbCB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXG5cbi8qKiBIb3N0IGNvbmZpZ3VyYXRpb24gZW50cnkgaWQgdGhpcyBwYW5lbCBlZGl0cy4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9OT1RFU19FTlRSWV9JRCA9ICd0ZWFtLW1vZGVsLXJvdXRpbmctc2V0dGluZ3MnXG5cbi8qKiBPZmZpY2lhbCBIb3N0IGVudHJ5IGhvbGRpbmcgdGhlIHN1YmFnZW50IG1vZGVsIGF1dGhvcml6YXRpb247IHJlYWQgb25seS4gKi9cbmV4cG9ydCBjb25zdCBTVUJBR0VOVF9NT0RFTF9TRUxFQ1RJT05fRU5UUllfSUQgPSAnc3ViYWdlbnQtbW9kZWwtc2VsZWN0aW9uLXNldHRpbmdzJ1xuXG4vKiogT25lIGV4YWN0IHByb3ZpZGVyL21vZGVsIHJvdXRlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbFJvdXRlIHtcbiAgcHJvdmlkZXI6IHN0cmluZ1xuICBtb2RlbDogc3RyaW5nXG59XG5cbi8qKiBFZGl0YWJsZSBub3RlIGZvciBvbmUgZXhhY3Qgcm91dGUuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZSBleHRlbmRzIE1vZGVsUm91dGUge1xuICBjYXBhYmlsaXR5OiBzdHJpbmdcbiAgc2NlbmFyaW86IHN0cmluZ1xufVxuXG4vKiogRmllbGRzIHRoaXMgcGFuZWwgcmVhZHMgYW5kIHdyaXRlcyBpbiBpdHMgb3duIGVudHJ5LiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbE5vdGVzU2V0dGluZ3Mge1xuICAvKiogU2F2ZWQgbm90ZXMsIGluY2x1ZGluZyBub3RlcyBvZiByb3V0ZXMgbm90IGN1cnJlbnRseSBhdXRob3JpemVkLiAqL1xuICBtb2RlbE5vdGVzOiBNb2RlbE5vdGVbXVxufVxuXG4vKiogRmllbGRzIHRoaXMgcGFuZWwgcmVhZHMgZnJvbSB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzIHtcbiAgLyoqIFdoZXRoZXIgbmV3IFNlc3Npb25zIHJlY2VpdmUgZXhwbGljaXQgc3ViYWdlbnQgbW9kZWwgc2VsZWN0aW9uLiAqL1xuICBlbmFibGVkOiBib29sZWFuXG4gIC8qKiBFeGFjdCByb3V0ZXMgbmV3IFNlc3Npb25zIG1heSBzZWxlY3QuICovXG4gIGFsbG93ZWRNb2RlbHM6IE1vZGVsUm91dGVbXVxufVxuXG4vKiogT25lIGF1dGhvcml6ZWQgcm91dGUgd2l0aCBpdHMgZHJhZnQgbm90ZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxOb3RlUm93IGV4dGVuZHMgTW9kZWxOb3RlIHtcbiAgLyoqIFN0YWJsZSBvcGFxdWUgaWRlbnRpdHkgdXNlZCBvbmx5IGZvciBsb29rdXAgYW5kIGFzIHRoZSBSZWFjdCBrZXkuICovXG4gIGtleTogc3RyaW5nXG59XG5cbi8qKiBTdGF0ZSByZW5kZXJlZCBieSB0aGUgbm90ZXMgcGFuZWwuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNTdGF0ZSBleHRlbmRzIFNldHRpbmdzRm9ybVNoZWxsIHtcbiAgLyoqIFdoZXRoZXIgdGhlIG9mZmljaWFsIGF1dGhvcml6YXRpb24gZW50cnkgaXMgc2VydmVkIGFuZCByZWFkLiAqL1xuICBzZWxlY3Rpb25BdmFpbGFibGU6IGJvb2xlYW5cbiAgLyoqIFNhdmVkIGF1dGhvcml6ZWQgcm91dGVzIHdpdGggdGhlaXIgZHJhZnQgbm90ZXMsIGluIGF1dGhvcml6YXRpb24gb3JkZXIuICovXG4gIHJvd3M6IHJlYWRvbmx5IE1vZGVsTm90ZVJvd1tdXG4gIC8qKiBXaGV0aGVyIGEgbmV3ZXIgSG9zdCByZXZpc2lvbiBpbnZhbGlkYXRlZCB0aGUgY3VycmVudCBkcmFmdC4gKi9cbiAgY29uZmxpY3RlZDogYm9vbGVhblxufVxuXG4vKiogUmVnaXN0cmF0aW9uLXNpZGUgZmFjZSBmb3IgdGhlIG5vdGVzIHBhbmVsLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbE5vdGVzRmFjZSB7XG4gIGhvb2tzOiB7XG4gICAgLyoqIFBhbmVsIHNuYXBzaG90IGJvdW5kIGJ5IHRoZSByZW5kZXJlciBhcyB1c2VNb2RlbE5vdGVzLiAqL1xuICAgIG1vZGVsTm90ZXM6IFNuYXBzaG90U3RvcmU8TW9kZWxOb3Rlc1N0YXRlPlxuICB9XG4gIC8qKiBTdGFnZSBvbmUgbm90ZSBmaWVsZCBvZiBhbiBhdXRob3JpemVkIHJvdXRlLiAqL1xuICBzZXRNb2RlbE5vdGU6IChrZXk6IHN0cmluZywgZmllbGQ6ICdjYXBhYmlsaXR5JyB8ICdzY2VuYXJpbycsIHZhbHVlOiBzdHJpbmcpID0+IHZvaWRcbiAgLyoqIFBlcnNpc3QgZXZlcnkgbm90ZSBhcyBvbmUgcmV2aXNpb24tZmVuY2VkIG11dGF0aW9uLiAqL1xuICBzYXZlOiAoKSA9PiB2b2lkXG4gIC8qKiBEcm9wIHRoZSBzdGFnZWQgbm90ZXMuICovXG4gIGRpc2NhcmQ6ICgpID0+IHZvaWRcbn1cblxuLyoqXG4gKiBTdGFibGUgaWRlbnRpdHkgZm9yIG9uZSBleGFjdCByb3V0ZTsgY2FsbGVycyByZXNvbHZlIGl0IGJ5IGxvb2t1cCBhbmQgbmV2ZXIgcGFyc2UgaXQuXG4gKiBAcGFyYW0gcm91dGUgLSBwcm92aWRlci9tb2RlbCByb3V0ZSB0byBpZGVudGlmeS5cbiAqIEByZXR1cm5zIG9wYXF1ZSBrZXkgZm9yIGxvb2t1cCB3aXRoaW4gdGhlIHBhbmVsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kZWxOb3RlS2V5KHJvdXRlOiBNb2RlbFJvdXRlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3JvdXRlLnByb3ZpZGVyfVxcMCR7cm91dGUubW9kZWx9YFxufVxuXG4vKiogRHJvcCBub3RlcyB3aXRob3V0IHRleHQgc28gY2xlYXJpbmcgYm90aCBmaWVsZHMgZXF1YWxzIG5ldmVyIHdyaXRpbmcgdGhlbS4gKi9cbmZ1bmN0aW9uIG1lYW5pbmdmdWwobm90ZXM6IEl0ZXJhYmxlPE1vZGVsTm90ZT4pOiBNb2RlbE5vdGVbXSB7XG4gIHJldHVybiBbLi4ubm90ZXNdXG4gICAgLmZpbHRlcihub3RlID0+IG5vdGUuY2FwYWJpbGl0eSAhPT0gJycgfHwgbm90ZS5zY2VuYXJpbyAhPT0gJycpXG4gICAgLm1hcChub3RlID0+ICh7IHByb3ZpZGVyOiBub3RlLnByb3ZpZGVyLCBtb2RlbDogbm90ZS5tb2RlbCwgY2FwYWJpbGl0eTogbm90ZS5jYXBhYmlsaXR5LCBzY2VuYXJpbzogbm90ZS5zY2VuYXJpbyB9KSlcbn1cblxuLyoqIENvbXBhcmUgbm90ZSBsaXN0cyBhcyBzZXRzIGtleWVkIGJ5IHJvdXRlLiAqL1xuZnVuY3Rpb24gc2FtZU5vdGVzKGxlZnQ6IHJlYWRvbmx5IE1vZGVsTm90ZVtdLCByaWdodDogcmVhZG9ubHkgTW9kZWxOb3RlW10pOiBib29sZWFuIHtcbiAgaWYgKGxlZnQubGVuZ3RoICE9PSByaWdodC5sZW5ndGgpIHJldHVybiBmYWxzZVxuICBjb25zdCBub3RlcyA9IG5ldyBNYXAobGVmdC5tYXAobm90ZSA9PiBbbW9kZWxOb3RlS2V5KG5vdGUpLCBub3RlXSkpXG4gIHJldHVybiByaWdodC5ldmVyeSgobm90ZSkgPT4ge1xuICAgIGNvbnN0IG90aGVyID0gbm90ZXMuZ2V0KG1vZGVsTm90ZUtleShub3RlKSlcbiAgICByZXR1cm4gb3RoZXIgIT09IHVuZGVmaW5lZCAmJiBvdGhlci5jYXBhYmlsaXR5ID09PSBub3RlLmNhcGFiaWxpdHkgJiYgb3RoZXIuc2NlbmFyaW8gPT09IG5vdGUuc2NlbmFyaW9cbiAgfSlcbn1cblxuLyoqIEJyaWRnZXMgdGhpcyBwbHVnaW4ncyBlbnRyeSBhbmQgdGhlIG9mZmljaWFsIGF1dGhvcml6YXRpb24gZW50cnkgb250byBhIHN0YWdlZCBwYW5lbC4gKi9cbmV4cG9ydCBjbGFzcyBNb2RlbE5vdGVzQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZHJhZnROb3RlczogTWFwPHN0cmluZywgTW9kZWxOb3RlPiB8IHVuZGVmaW5lZFxuICBwcml2YXRlIGRyYWZ0UmV2aXNpb246IG51bWJlciB8IHVuZGVmaW5lZFxuICBwcml2YXRlIHNhdmluZyA9IGZhbHNlXG4gIHByaXZhdGUgZmFpbGVkID0gZmFsc2VcbiAgcHJpdmF0ZSBvdXRjb21lVW5rbm93biA9IGZhbHNlXG4gIHByaXZhdGUgY29uZmxpY3RlZCA9IGZhbHNlXG4gIHByaXZhdGUgZGlzcG9zZWQgPSBmYWxzZVxuICBwcml2YXRlIHNhdmVHZW5lcmF0aW9uID0gMFxuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JlOiBTbmFwc2hvdFN0b3JlPE1vZGVsTm90ZXNTdGF0ZT5cbiAgcHJpdmF0ZSByZWFkb25seSB1bnN1YnNjcmliZTogKCkgPT4gdm9pZFxuXG4gIC8qKlxuICAgKiBAcGFyYW0gc2NvcGUgLSBib3VuZCBgdGVhbS1tb2RlbC1yb3V0aW5nLXNldHRpbmdzYCBjb25maWd1cmF0aW9uIGZvcm0uXG4gICAqIEBwYXJhbSBzZWxlY3Rpb24gLSBib3VuZCBvZmZpY2lhbCBgc3ViYWdlbnQtbW9kZWwtc2VsZWN0aW9uLXNldHRpbmdzYCBmb3JtLCByZWFkIG9ubHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNjb3BlOiBTZXR0aW5nc0Zvcm1TY29wZTxNb2RlbE5vdGVzU2V0dGluZ3M+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZXR0aW5nc0Zvcm1TY29wZTxTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3M+LFxuICApIHtcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU25hcHNob3RTdG9yZSh0aGlzLnByb2plY3Rpb24oKSlcbiAgICBjb25zdCBvZmZTY29wZSA9IHNjb3BlLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMub25TY29wZUNoYW5nZSgpIH0pXG4gICAgY29uc3Qgb2ZmU2VsZWN0aW9uID0gc2VsZWN0aW9uLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMucHVibGlzaCgpIH0pXG4gICAgdGhpcy51bnN1YnNjcmliZSA9ICgpID0+IHsgb2ZmU2NvcGUoKTsgb2ZmU2VsZWN0aW9uKCkgfVxuICB9XG5cbiAgLyoqIFN0b3Agb2JzZXJ2aW5nIHNldHRpbmdzIGFuZCBzdXBwcmVzcyBsYXRlIHdyaXRlIHNldHRsZW1lbnRzLiAqL1xuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlXG4gICAgdGhpcy5zYXZlR2VuZXJhdGlvbiArPSAxXG4gICAgdGhpcy51bnN1YnNjcmliZSgpXG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgdGhlIHJlbmRlcmVyIGZhY2UgZm9yIHRoaXMgcGFuZWwuXG4gICAqIEByZXR1cm5zIHRoZSBzbmFwc2hvdCBhbmQgc3RhZ2VkIHBhbmVsIGFjdGlvbnMgaW5qZWN0ZWQgaW50byB0aGUgcmVuZGVyZXIuXG4gICAqL1xuICBpbmplY3QoKTogTW9kZWxOb3Rlc0ZhY2Uge1xuICAgIHJldHVybiB7XG4gICAgICBob29rczogeyBtb2RlbE5vdGVzOiB0aGlzLnN0b3JlIH0sXG4gICAgICBzZXRNb2RlbE5vdGU6IChrZXksIGZpZWxkLCB2YWx1ZSkgPT4geyB0aGlzLnNldE1vZGVsTm90ZShrZXksIGZpZWxkLCB2YWx1ZSkgfSxcbiAgICAgIHNhdmU6ICgpID0+IHsgdm9pZCB0aGlzLnNhdmUoKSB9LFxuICAgICAgZGlzY2FyZDogKCkgPT4geyB0aGlzLmRpc2NhcmQoKSB9LFxuICAgIH1cbiAgfVxuXG4gIC8qKiBEcm9wIHRoZSBkcmFmdCBhbmQgYW55IHBlbmRpbmcgc2F2ZSBhZnRlciB0aGUgY29ubmVjdGlvbiB0byB0aGUgSG9zdCB3YXMgcmVwbGFjZWQuICovXG4gIHJlc2V0Q29ubmVjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgdGhpcy5zYXZlR2VuZXJhdGlvbiArPSAxXG4gICAgdGhpcy5zYXZpbmcgPSBmYWxzZVxuICAgIHRoaXMuY2xlYXJEcmFmdCgpXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgfVxuXG4gIC8qKiBSZS1kZXJpdmUgdGhlIGRyYWZ0IGFnYWluc3QgYSBIb3N0IHJldmlzaW9uIHRoZSBtaXJyb3IganVzdCBwdWJsaXNoZWQuICovXG4gIHByaXZhdGUgb25TY29wZUNoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgaWYgKCF0aGlzLnNhdmluZyAmJiB0aGlzLmRyYWZ0Tm90ZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjb3BlLmdldFNuYXBzaG90KCkucmV2aXNpb24gIT09IHRoaXMuZHJhZnRSZXZpc2lvbikge1xuICAgICAgaWYgKHNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCB0aGlzLmRlc2lyZWROb3RlcygpKSkgdGhpcy5jbGVhckRyYWZ0KClcbiAgICAgIGVsc2UgdGhpcy5jb25mbGljdGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnB1Ymxpc2goKVxuICB9XG5cbiAgcHJpdmF0ZSBjdXJyZW50Tm90ZXMoKTogTW9kZWxOb3RlW10ge1xuICAgIHJldHVybiBtZWFuaW5nZnVsKHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS52YWx1ZT8ubW9kZWxOb3RlcyA/PyBbXSlcbiAgfVxuXG4gIHByaXZhdGUgZGVzaXJlZE5vdGVzKCk6IE1vZGVsTm90ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kcmFmdE5vdGVzID09PSB1bmRlZmluZWQgPyB0aGlzLmN1cnJlbnROb3RlcygpIDogbWVhbmluZ2Z1bCh0aGlzLmRyYWZ0Tm90ZXMudmFsdWVzKCkpXG4gIH1cblxuICAvKiogUm91dGVzIHRoZSBvZmZpY2lhbCBlbnRyeSBzYXZlZCBhcyBhdXRob3JpemVkOyBlbXB0eSB3aGlsZSBzZWxlY3Rpb24gaXMgb2ZmIG9yIHVuc2VydmVkLiAqL1xuICBwcml2YXRlIGF1dGhvcml6ZWRSb3V0ZXMoKTogTW9kZWxSb3V0ZVtdIHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuc2VsZWN0aW9uLmdldFNuYXBzaG90KClcbiAgICBpZiAoc25hcHNob3Quc3RhdHVzICE9PSAncmVhZHknIHx8IHNuYXBzaG90LnZhbHVlPy5lbmFibGVkICE9PSB0cnVlKSByZXR1cm4gW11cbiAgICByZXR1cm4gc25hcHNob3QudmFsdWUuYWxsb3dlZE1vZGVscy5tYXAocm91dGUgPT4gKHsgcHJvdmlkZXI6IHJvdXRlLnByb3ZpZGVyLCBtb2RlbDogcm91dGUubW9kZWwgfSkpXG4gIH1cblxuICBwcml2YXRlIHdyaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy5zY29wZS5nZXRTbmFwc2hvdCgpXG4gICAgcmV0dXJuICF0aGlzLmRpc3Bvc2VkICYmIHNuYXBzaG90LnN0YXR1cyA9PT0gJ3JlYWR5JyAmJiBzbmFwc2hvdC53cml0YWJsZSAmJiAhdGhpcy5zYXZpbmdcbiAgfVxuXG4gIHByaXZhdGUgc2V0TW9kZWxOb3RlKGtleTogc3RyaW5nLCBmaWVsZDogJ2NhcGFiaWxpdHknIHwgJ3NjZW5hcmlvJywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy53cml0YWJsZSgpKSByZXR1cm5cbiAgICBjb25zdCByb3V0ZSA9IHRoaXMuYXV0aG9yaXplZFJvdXRlcygpLmZpbmQoY2FuZGlkYXRlID0+IG1vZGVsTm90ZUtleShjYW5kaWRhdGUpID09PSBrZXkpXG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgIGlmICh0aGlzLmRyYWZ0Tm90ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmFmdE5vdGVzID0gbmV3IE1hcCh0aGlzLmN1cnJlbnROb3RlcygpLm1hcChub3RlID0+IFttb2RlbE5vdGVLZXkobm90ZSksIG5vdGVdKSlcbiAgICAgIHRoaXMuZHJhZnRSZXZpc2lvbiA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS5yZXZpc2lvblxuICAgIH1cbiAgICBjb25zdCBub3RlID0gdGhpcy5kcmFmdE5vdGVzLmdldChrZXkpID8/IHsgLi4ucm91dGUsIGNhcGFiaWxpdHk6ICcnLCBzY2VuYXJpbzogJycgfVxuICAgIHRoaXMuZHJhZnROb3Rlcy5zZXQoa2V5LCB7IC4uLm5vdGUsIFtmaWVsZF06IHZhbHVlIH0pXG4gICAgaWYgKCF0aGlzLm91dGNvbWVVbmtub3duKSB0aGlzLmZhaWxlZCA9IGZhbHNlXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJEcmFmdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWZ0Tm90ZXMgPSB1bmRlZmluZWRcbiAgICB0aGlzLmRyYWZ0UmV2aXNpb24gPSB1bmRlZmluZWRcbiAgICB0aGlzLmZhaWxlZCA9IGZhbHNlXG4gICAgdGhpcy5vdXRjb21lVW5rbm93biA9IGZhbHNlXG4gICAgdGhpcy5jb25mbGljdGVkID0gZmFsc2VcbiAgfVxuXG4gIHByaXZhdGUgZGlzY2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZpbmcpIHJldHVyblxuICAgIHRoaXMuY2xlYXJEcmFmdCgpXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKVxuICAgIGNvbnN0IG5vdGVzID0gdGhpcy5kZXNpcmVkTm90ZXMoKVxuICAgIGlmICh0aGlzLmRpc3Bvc2VkIHx8IHNuYXBzaG90LnN0YXR1cyAhPT0gJ3JlYWR5JyB8fCAhc25hcHNob3Qud3JpdGFibGUgfHwgdGhpcy5zYXZpbmcpIHJldHVyblxuICAgIGlmIChzYW1lTm90ZXModGhpcy5jdXJyZW50Tm90ZXMoKSwgbm90ZXMpKSByZXR1cm5cbiAgICAvLyBBbiB1bnRvdWNoZWQgZm9ybSBoYXMgbm8gZHJhZnQgYW5kIHJldHVybmVkIGFib3ZlOyB0aGUgZmVuY2UgaXMgdGhlXG4gICAgLy8gcmV2aXNpb24gdGhlIGRyYWZ0IHN0YXJ0ZWQgZnJvbSwgc28gYSBzdGFsZSBkcmFmdCBuZXZlciBvdmVyd3JpdGVzIGEgbmV3ZXIgdmFsdWUuXG4gICAgY29uc3QgZmVuY2UgPSB0aGlzLmRyYWZ0UmV2aXNpb25cbiAgICBpZiAoZmVuY2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgaWYgKHNuYXBzaG90LnJldmlzaW9uICE9PSBmZW5jZSkge1xuICAgICAgdGhpcy5jb25mbGljdGVkID0gdHJ1ZVxuICAgICAgdGhpcy5wdWJsaXNoKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBnZW5lcmF0aW9uID0gdGhpcy5zYXZlR2VuZXJhdGlvblxuICAgIHRoaXMuc2F2aW5nID0gdHJ1ZVxuICAgIHRoaXMuZmFpbGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbmZsaWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMucHVibGlzaCgpXG4gICAgbGV0IGFjY2VwdGVkOiBib29sZWFuXG4gICAgdHJ5IHtcbiAgICAgIGFjY2VwdGVkID0gYXdhaXQgdGhpcy5zY29wZS5tdXRhdGUoW3sgb3A6ICdzZXQnLCBwYXRoOiBbJ21vZGVsTm90ZXMnXSwgdmFsdWU6IG5vdGVzIH1dLCBmZW5jZSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgLy8gVGhlIHdyaXRlIG1heSBoYXZlIGxhbmRlZCBhbHRob3VnaCBpdHMgcmVzcG9uc2Ugd2FzIGxvc3Q7IGtlZXAgdGhlIGRyYWZ0IGFuZCByZXBvcnQgYW4gdW5rbm93biBvdXRjb21lLlxuICAgICAgaWYgKGdlbmVyYXRpb24gIT09IHRoaXMuc2F2ZUdlbmVyYXRpb24gfHwgdGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgICB0aGlzLnNhdmluZyA9IGZhbHNlXG4gICAgICB0aGlzLmZhaWxlZCA9IHRydWVcbiAgICAgIHRoaXMub3V0Y29tZVVua25vd24gPSB0cnVlXG4gICAgICB0aGlzLmNvbmZsaWN0ZWQgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KCkucmV2aXNpb24gIT09IGZlbmNlXG4gICAgICB0aGlzLnB1Ymxpc2goKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChnZW5lcmF0aW9uICE9PSB0aGlzLnNhdmVHZW5lcmF0aW9uIHx8IHRoaXMuZGlzcG9zZWQpIHJldHVyblxuICAgIGNvbnN0IGxhbmRlZCA9IGFjY2VwdGVkICYmIHNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCBub3RlcylcbiAgICB0aGlzLnNhdmluZyA9IGZhbHNlXG4gICAgdGhpcy5mYWlsZWQgPSAhbGFuZGVkXG4gICAgaWYgKGxhbmRlZCkgdGhpcy5jbGVhckRyYWZ0KClcbiAgICB0aGlzLm9uU2NvcGVDaGFuZ2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9qZWN0aW9uKCk6IE1vZGVsTm90ZXNTdGF0ZSB7XG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KClcbiAgICBjb25zdCBkcmFmdGVkID0gdGhpcy5kcmFmdE5vdGVzID8/IG5ldyBNYXAodGhpcy5jdXJyZW50Tm90ZXMoKS5tYXAobm90ZSA9PiBbbW9kZWxOb3RlS2V5KG5vdGUpLCBub3RlXSkpXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuYXV0aG9yaXplZFJvdXRlcygpLm1hcCgocm91dGUpOiBNb2RlbE5vdGVSb3cgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gbW9kZWxOb3RlS2V5KHJvdXRlKVxuICAgICAgY29uc3Qgbm90ZSA9IGRyYWZ0ZWQuZ2V0KGtleSlcbiAgICAgIHJldHVybiB7IC4uLnJvdXRlLCBrZXksIGNhcGFiaWxpdHk6IG5vdGU/LmNhcGFiaWxpdHkgPz8gJycsIHNjZW5hcmlvOiBub3RlPy5zY2VuYXJpbyA/PyAnJyB9XG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgYXZhaWxhYmxlOiBzbmFwc2hvdC5zdGF0dXMgPT09ICdyZWFkeScsXG4gICAgICB3cml0YWJsZTogc25hcHNob3Qud3JpdGFibGUsXG4gICAgICBkaXJ0eTogIXNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCB0aGlzLmRlc2lyZWROb3RlcygpKSxcbiAgICAgIGludmFsaWQ6IGZhbHNlLFxuICAgICAgc2F2aW5nOiB0aGlzLnNhdmluZyxcbiAgICAgIGZhaWxlZDogdGhpcy5mYWlsZWQsXG4gICAgICBzZWxlY3Rpb25BdmFpbGFibGU6IHRoaXMuc2VsZWN0aW9uLmdldFNuYXBzaG90KCkuc3RhdHVzID09PSAncmVhZHknLFxuICAgICAgcm93cyxcbiAgICAgIGNvbmZsaWN0ZWQ6IHRoaXMuY29uZmxpY3RlZCxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHB1Ymxpc2goKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZXQodGhpcy5wcm9qZWN0aW9uKCkpXG4gIH1cbn1cbiIsICIvKiogQnJvd3NlciBzdGF0ZSBmb3IgdGhlIFNlc3Npb24taGVhZGVyIHN1YmFnZW50LW1vZGVsLW5vdGVzIHJlZnJlc2ggYWN0aW9uLiAqL1xuXG5pbXBvcnQgdHlwZSB7IFNlc3Npb25JZCB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtc2Vzc2lvbi90eXBlcydcblxuZXhwb3J0IHR5cGUgeyBTZXNzaW9uSWQgfVxuXG4vKiogUGF0aCBvZiB0aGUgYXV0aGVudGljYXRlZCBIb3N0IGVuZHBvaW50IHRoaXMgY29udHJvbGxlciBjYWxscy4gKi9cbmV4cG9ydCBjb25zdCBSRUZSRVNIX0FQSV9QQVRIID0gJy9hcGkvdGVhbS1tb2RlbC1yb3V0aW5nLnJlZnJlc2gnXG5cbi8qKlxuICogQnJvd3NlciBmb3JtIG9mIHtAbGluayBSRUZSRVNIX0FQSV9QQVRIfTogdGhlIHNlcnZlZCBkb2N1bWVudCdzIGA8YmFzZSBocmVmPVwiLi9cIj5gXG4gKiByZXNvbHZlcyBpdCBiZW5lYXRoIHRoZSBtb3VudCB0aGF0IHNlcnZlZCB0aGUgcGFnZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFJFRlJFU0hfQVBJX1JPVVRFID0gUkVGUkVTSF9BUElfUEFUSC5zbGljZSgxKVxuXG4vKiogV2hhdCB0aGUgcmVmcmVzaCBhY3Rpb24gY3VycmVudGx5IHJlcG9ydHMuICovXG5leHBvcnQgdHlwZSBSZWZyZXNoU3RhdHVzID0gJ2lkbGUnIHwgJ2J1c3knIHwgJ3VwZGF0ZWQnIHwgJ3VuY2hhbmdlZCcgfCAnZmFpbGVkJyB8ICdpbmFjdGl2ZSdcblxuLyoqIE9uZSByZXF1ZXN0IG91dGNvbWUsIHdpdGggdGhlIGNvcHkga2V5IHRoZSBidXR0b24gc2hvdWxkIGFubm91bmNlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWZyZXNoUmVzdWx0IHtcbiAgcmVhZG9ubHkgc3RhdHVzOiBSZWZyZXNoU3RhdHVzXG4gIHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZ1xufVxuXG4vKiogRmV0Y2ggc3Vic3RpdHV0ZSBzbyB0cmFuc3BvcnQgZmFpbHVyZXMgc3RheSB0ZXN0YWJsZSB3aXRob3V0IGEgc2VydmVyLiAqL1xuZXhwb3J0IHR5cGUgUmVmcmVzaEZldGNoID0gKHBhdGg6IHN0cmluZywgaW5pdDogUmVxdWVzdEluaXQpID0+IFByb21pc2U8UmVzcG9uc2U+XG5cbi8qKiBUcmFuc2xhdGUgYSBIb3N0IHJlc3BvbnNlIGludG8gYnV0dG9uIHN0YXRlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRSZWZyZXNoUmVzdWx0KG9rOiBib29sZWFuLCBib2R5OiB1bmtub3duKTogUmVmcmVzaFJlc3VsdCB7XG4gIGNvbnN0IGNvZGUgPSB0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcgJiYgYm9keSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShib2R5KVxuICAgID8gKGJvZHkgYXMgeyBjb2RlPzogdW5rbm93biB9KS5jb2RlXG4gICAgOiB1bmRlZmluZWRcbiAgaWYgKG9rKSB7XG4gICAgY29uc3QgY2hhbmdlZCA9IHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JyAmJiBib2R5ICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KGJvZHkpXG4gICAgICAmJiAoYm9keSBhcyB7IGNoYW5nZWQ/OiB1bmtub3duIH0pLmNoYW5nZWQgPT09IHRydWVcbiAgICByZXR1cm4gY2hhbmdlZFxuICAgICAgPyB7IHN0YXR1czogJ3VwZGF0ZWQnLCBtZXNzYWdlOiAndXBkYXRlZCcgfVxuICAgICAgOiB7IHN0YXR1czogJ3VuY2hhbmdlZCcsIG1lc3NhZ2U6ICd1bmNoYW5nZWQnIH1cbiAgfVxuICByZXR1cm4gY29kZSA9PT0gJ2luYWN0aXZlJ1xuICAgID8geyBzdGF0dXM6ICdpbmFjdGl2ZScsIG1lc3NhZ2U6ICdpbmFjdGl2ZScgfVxuICAgIDogeyBzdGF0dXM6ICdmYWlsZWQnLCBtZXNzYWdlOiAnZmFpbGVkJyB9XG59XG5cbi8qKiBPd24gdGhlIHBlci1zZXNzaW9uIHJlZnJlc2ggcmVxdWVzdCB3aXRob3V0IG93bmluZyBhIFJlYWN0IGhvb2suICovXG5leHBvcnQgY2xhc3MgUmVmcmVzaENvbnRyb2xsZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IHBlbmRpbmcgPSBuZXcgTWFwPFNlc3Npb25JZCwgUHJvbWlzZTxSZWZyZXNoUmVzdWx0Pj4oKVxuICBwcml2YXRlIHJlYWRvbmx5IGZldGNoZXI6IFJlZnJlc2hGZXRjaFxuXG4gIC8qKiBAcGFyYW0gZmV0Y2hlciAtIHRyYW5zcG9ydDsgcHJvZHVjdGlvbiBwYXNzZXMgYGZldGNoYCwgc3BlY3MgcGFzcyBhIHN0dWIuICovXG4gIGNvbnN0cnVjdG9yKGZldGNoZXI6IFJlZnJlc2hGZXRjaCA9IChwYXRoLCBpbml0KSA9PiBmZXRjaChwYXRoLCBpbml0KSkge1xuICAgIHRoaXMuZmV0Y2hlciA9IGZldGNoZXJcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIG9uZSBTZXNzaW9uLCBkZWR1cGxpY2F0aW5nIG92ZXJsYXBwaW5nIHJlcXVlc3RzIGZvciB0aGUgc2FtZSBpZC5cbiAgICogQHBhcmFtIHNlc3Npb25JZCAtIGN1cnJlbnQgU2Vzc2lvbiBmcm9tIHRoZSBoZWFkZXIgc2xvdC5cbiAgICogQHJldHVybnMgdGhlIHNldHRsZWQgc3RhdHVzIGFuZCBpdHMgY29weSBrZXkuXG4gICAqL1xuICByZWZyZXNoKHNlc3Npb25JZDogU2Vzc2lvbklkKTogUHJvbWlzZTxSZWZyZXNoUmVzdWx0PiB7XG4gICAgY29uc3QgcnVubmluZyA9IHRoaXMucGVuZGluZy5nZXQoc2Vzc2lvbklkKVxuICAgIGlmIChydW5uaW5nICE9PSB1bmRlZmluZWQpIHJldHVybiBydW5uaW5nXG4gICAgY29uc3QgdGFzayA9IHRoaXMuc2VuZChzZXNzaW9uSWQpLmZpbmFsbHkoKCkgPT4geyB0aGlzLnBlbmRpbmcuZGVsZXRlKHNlc3Npb25JZCkgfSlcbiAgICB0aGlzLnBlbmRpbmcuc2V0KHNlc3Npb25JZCwgdGFzaylcbiAgICByZXR1cm4gdGFza1xuICB9XG5cbiAgLyoqIFNlbmQgb25lIEpTT04gUE9TVCB0byB0aGUgSG9zdCByZWZyZXNoIHJvdXRlLiAqL1xuICBwcml2YXRlIGFzeW5jIHNlbmQoc2Vzc2lvbklkOiBTZXNzaW9uSWQpOiBQcm9taXNlPFJlZnJlc2hSZXN1bHQ+IHtcbiAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaGVyKFJFRlJFU0hfQVBJX1JPVVRFLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgc2Vzc2lvbklkIH0pLFxuICAgICAgfSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiB7IHN0YXR1czogJ2ZhaWxlZCcsIG1lc3NhZ2U6ICdmYWlsZWQnIH1cbiAgICB9XG4gICAgbGV0IGJvZHk6IHVua25vd25cbiAgICB0cnkge1xuICAgICAgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIHsgc3RhdHVzOiAnZmFpbGVkJywgbWVzc2FnZTogJ2ZhaWxlZCcgfVxuICAgIH1cbiAgICByZXR1cm4gcmVhZFJlZnJlc2hSZXN1bHQocmVzcG9uc2Uub2ssIGJvZHkpXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNFQSxtQkFBb0M7QUFDcEMsc0NBQWtFOzs7QUNIbEUsSUFBTyxrQ0FBUSxFQUFDLFdBQVUsbUJBQWtC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RixRQUFNLFFBQVEsSUFBSTtBQUFBLElBQ2hCLElBQUksWUFBWSxJQUF3QixvQkFBb0I7QUFBQSxJQUM1RCxJQUFJLFlBQVksSUFBb0MsaUNBQWlDO0FBQUEsRUFDdkY7QUFDQSxNQUFJLE9BQU8sTUFBTSxNQUFNO0FBQUUsVUFBTSxRQUFRO0FBQUEsRUFBRSxHQUFHLCtDQUErQztBQUMzRixNQUFJO0FBQUEsSUFDRixNQUFNLElBQUksR0FBRyxvQkFBb0IsTUFBTTtBQUFFLFlBQU0sZ0JBQWdCO0FBQUEsSUFBRSxDQUFDO0FBQUEsSUFDbEU7QUFBQSxFQUNGO0FBQ0EsTUFBSSxPQUFPLE1BQU0sSUFBSSxZQUFZLFlBQVksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLElBQUksTUFBTTtBQUFBLElBQ25GO0FBQUEsSUFDQSxNQUFNLElBQUksTUFBTSxTQUFTO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTyxNQUFNLEVBQUUsY0FBYztBQUFBLE1BQzdCLFFBQVE7QUFBQSxNQUNSLFFBQVEsTUFBTSxNQUFNLE9BQU87QUFBQSxJQUM3QixHQUFHLGlCQUFpQjtBQUFBLEVBQ3RCLENBQUMsR0FBRyxrQ0FBa0M7QUFFdEMsUUFBTSxVQUFVLElBQUksa0JBQWtCO0FBQ3RDLE1BQUksT0FBTyxNQUFNLElBQUksTUFBTSxPQUFPLHlDQUF5QyxNQUFNLElBQUksTUFBTSxTQUFTO0FBQUEsSUFDbEcsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsUUFBUSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQWtCLFFBQVEsUUFBUSxFQUFFLEVBQUU7QUFBQSxFQUNuRSxHQUFHLHVCQUF1QixDQUFDLEdBQUcsNENBQTRDO0FBSzFFLE1BQUksT0FBTyxNQUFNLElBQUksTUFBTSxPQUFPLDRCQUE0QixNQUFNLElBQUksTUFBTSxTQUFTO0FBQUEsSUFDckYsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1YsR0FBRyxlQUFlLENBQUMsR0FBRyxpREFBaUQ7QUFDekU7IiwKICAibmFtZXMiOiBbImltcG9ydF9kc2hfY2xpZW50X3VpX3ByaW1pdGl2ZXMiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZHNoX2NsaWVudF91aV9wcmltaXRpdmVzIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3RlIl0KfQo=

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
