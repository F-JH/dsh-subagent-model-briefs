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

// src/client/ModelNotesSection.tsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

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
  refreshInactive: "This session is not active yet. Send a message, then refresh again."
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
  refreshInactive: "\u5F53\u524D\u4F1A\u8BDD\u5C1A\u672A\u6FC0\u6D3B\uFF0C\u8BF7\u5148\u53D1\u9001\u4E00\u6761\u6D88\u606F\u518D\u5237\u65B0\u3002"
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var SUBAGENT_ITEM_ID = "subagent";
function ModelNotesSection(props) {
  const { subject } = props;
  if (subject.kind !== "item" || subject.id !== SUBAGENT_ITEM_ID) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ModelNotesPanel, { props });
}
function ModelNotesPanel({ props }) {
  const state = props.useModelNotes((snapshot) => snapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ModelNotesFields, { props, state });
}
function ModelNotesFields({ props, state }) {
  const { t } = props;
  const headingId = (0, import_react2.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: ModelNotesSection_default.section, "aria-labelledby": headingId, "data-plugin-model-notes": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: ModelNotesSection_default.intro, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: ModelNotesSection_default.heading, id: headingId, children: t("sectionTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: ModelNotesSection_default.hint, children: t("sectionHint") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_dsh_client_ui_primitives2.SettingsForm, { labels: formLabels(t), state, onSave: props.save, onDiscard: props.discard, children: [
      !state.selectionAvailable ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: ModelNotesSection_default.hint, children: t("selectionUnavailable") }) : state.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: ModelNotesSection_default.hint, children: t("selectionEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: ModelNotesSection_default.notes, children: state.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { className: ModelNotesSection_default.noteGroup, "data-model-note-row": true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { className: ModelNotesSection_default.legend, children: `${row.provider}/${row.model}` }),
        ["capability", "scenario"].map((field) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: ModelNotesSection_default.noteField, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t(field) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      state.conflicted ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: ModelNotesSection_default.conflict, role: "status", children: t("conflict") }) : null
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
      response = await this.fetcher(REFRESH_API_PATH, {
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
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLnRzeCIsICJkc2gtY3NzLW1vZHVsZTpzcmMvY2xpZW50L01vZGVsTm90ZXNSZWZyZXNoQWN0aW9uLm1vZHVsZS5jc3MiLCAic3JjL2NsaWVudC9Nb2RlbE5vdGVzU2VjdGlvbi50c3giLCAic3JjL2NsaWVudC9sb2NhbGVzLnRzIiwgImRzaC1jc3MtbW9kdWxlOnNyYy9jbGllbnQvTW9kZWxOb3Rlc1NlY3Rpb24ubW9kdWxlLmNzcyIsICJzcmMvY2xpZW50L21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMiLCAic3JjL2NsaWVudC9yZWZyZXNoLWNvbnRyb2xsZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogVGhlIHN1YmFnZW50IG1vZGVsIG5vdGVzIHBhbmVsLCBicm93c2VyIGhhbGYuXG4gKlxuICogVGhlIHBhbmVsIHJlZ2lzdGVycyBpbnRvIHRoZSBQbHVnaW5zIHBhZ2UncyBgcGx1Z2lucy5kZXRhaWwuc2VjdGlvbmAgc2xvdFxuICogYW5kIHJlbmRlcnMgb25seSBvbiB0aGUgb2ZmaWNpYWwgU3ViYWdlbnQgcGFnZSAoYHBsdWdpbnMuaXRlbWAgaWRcbiAqIGBzdWJhZ2VudGApLCBkaXJlY3RseSBiZWxvdyB0aGF0IHBhZ2UncyBtb2RlbCBhdXRob3JpemF0aW9uLiBJdCBlZGl0c1xuICogYG1vZGVsTm90ZXNgIGluIHRoaXMgcGx1Z2luJ3MgSG9zdCBlbnRyeSB0aHJvdWdoIHRoZSBzaGFyZWQgYGNvbmZpZ0Zvcm1zYFxuICogc2VydmljZSBhbmQgcmVhZHMgdGhlIHNhdmVkIG9mZmljaWFsIGF1dGhvcml6YXRpb24gdGhyb3VnaCB0aGUgc2FtZVxuICogc2VydmljZSwgd2l0aG91dCB3cml0aW5nIGl0LlxuICpcbiAqIFRoZSByZWdpc3RyYXRpb24gbGl2ZXMgd2l0aCB0aGlzIHBsdWdpbidzIGZpYmVyLCBzbyBzd2l0Y2hpbmcgdGhlIHBsdWdpblxuICogb2ZmIHJlbW92ZXMgdGhlIHBhbmVsIGFsb25nIHdpdGggZXZlcnl0aGluZyBlbHNlIGl0IGNvbnRyaWJ1dGVkLlxuICovXG5cbi8vIFR5cGUtb25seTogcHVsbHMgdGhlIGxvY2FsZSBwbHVnaW4ncyBDb250ZXh0IG1lcmdlIChjdHgubG9jYWxlKS5cbmltcG9ydCB0eXBlIHt9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LWxvY2FsZS9jbGllbnQnXG4vLyBUeXBlLW9ubHk6IHRoZSBjdHguY29uZmlnRm9ybXMgQ29udGV4dCBtZXJnZS4gQ3Jvc3MtcGx1Z2luIGNvbGxhYm9yYXRpb25cbi8vIGdvZXMgdGhyb3VnaCB0aGUgc2VydmljZSwgbmV2ZXIgYSB2YWx1ZSBpbXBvcnQgKGNsaWVudCBidW5kbGUgcHVyaXR5IGdhdGUpLlxuaW1wb3J0IHR5cGUge30gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2V0dGluZ3MvY2xpZW50J1xuLy8gVHlwZS1vbmx5OiB0aGUgUGx1Z2lucyBwYWdlJ3MgU2xvdE1hcCBtZXJnZSAodGhlICdwbHVnaW5zLmRldGFpbC5zZWN0aW9uJyBlbnRyeSkuXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wbHVnaW4tbWFuYWdlci9jbGllbnQnXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1yZW5kZXJlci9jbGllbnQnXG5pbXBvcnQgdHlwZSB7IENvbnRleHQgYXMgQ2xpZW50Q29udGV4dCB9IGZyb20gJ0BkZWVwc2Vlay1haS9jb3JkaXMnXG5pbXBvcnQgeyBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvbiB9IGZyb20gJy4vTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb24udHN4J1xuaW1wb3J0IHsgTW9kZWxOb3Rlc1NlY3Rpb24gfSBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLnRzeCdcbmltcG9ydCB7XG4gIE1PREVMX05PVEVTX0VOVFJZX0lELCBNb2RlbE5vdGVzQ29udHJvbGxlciwgU1VCQUdFTlRfTU9ERUxfU0VMRUNUSU9OX0VOVFJZX0lELFxufSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5pbXBvcnQgdHlwZSB7IE1vZGVsTm90ZXNTZXR0aW5ncywgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzIH0gZnJvbSAnLi9tb2RlbC1ub3Rlcy1jb250cm9sbGVyLnRzJ1xuaW1wb3J0IHsgUmVmcmVzaENvbnRyb2xsZXIgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmltcG9ydCB0eXBlIHsgU2Vzc2lvbklkIH0gZnJvbSAnLi9yZWZyZXNoLWNvbnRyb2xsZXIudHMnXG5pbXBvcnQgeyBlbiwgemgsIHR5cGUgTW9kZWxOb3Rlc0xvY2FsZUtleSB9IGZyb20gJy4vbG9jYWxlcy50cydcblxuZXhwb3J0IHR5cGUgeyBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvblByb3BzIH0gZnJvbSAnLi9Nb2RlbE5vdGVzUmVmcmVzaEFjdGlvbi50c3gnXG5leHBvcnQgdHlwZSB7IE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgfSBmcm9tICcuL01vZGVsTm90ZXNTZWN0aW9uLnRzeCdcbmV4cG9ydCB0eXBlIHtcbiAgTW9kZWxOb3RlLCBNb2RlbE5vdGVSb3csIE1vZGVsTm90ZXNGYWNlLCBNb2RlbE5vdGVzU2V0dGluZ3MsIE1vZGVsTm90ZXNTdGF0ZSwgTW9kZWxSb3V0ZSxcbiAgU3ViYWdlbnRNb2RlbFNlbGVjdGlvblNldHRpbmdzLFxufSBmcm9tICcuL21vZGVsLW5vdGVzLWNvbnRyb2xsZXIudHMnXG5leHBvcnQgdHlwZSB7IFJlZnJlc2hSZXN1bHQsIFJlZnJlc2hTdGF0dXMgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmV4cG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0xvY2FsZUtleSB9IGZyb20gJy4vbG9jYWxlcy50cydcblxuZGVjbGFyZSBtb2R1bGUgJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJyB7XG4gIGludGVyZmFjZSBMb2NhbGVOYW1lc3BhY2VNYXAge1xuICAgIC8qKiBTdWJhZ2VudCBtb2RlbCBub3RlcyBwYW5lbCBjb3B5LiAqL1xuICAgICd0ZWFtTW9kZWxSb3V0aW5nJzogTW9kZWxOb3Rlc0xvY2FsZUtleVxuICB9XG59XG5cbi8qKiBEaWN0aW9uYXJ5IG5hbWVzcGFjZSBvd25lZCBieSB0aGlzIHBsdWdpbi4gKi9cbmV4cG9ydCBjb25zdCBOUyA9ICd0ZWFtTW9kZWxSb3V0aW5nJ1xuXG4vKiogUmVxdWlyZWQgc2VydmljZXMgKGNvcmRpcyBmaWJlciBpbmplY3QpLiAqL1xuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnbG9jYWxlJywgJ2NvbmZpZ0Zvcm1zJ11cblxuLyoqXG4gKiBNb3VudCB0aGUgbm90ZXMgcGFuZWwgb24gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBhZ2UuXG4gKiBAcGFyYW0gY3R4IC0gdGhlIGJyb3dzZXIgcGx1Z2luIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShjdHg6IENsaWVudENvbnRleHQpOiB2b2lkIHtcbiAgY29uc3QgdCA9IGN0eC5sb2NhbGUuYmluZChOUylcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoLCBlbiB9KSwgJ2RzaC1zdWJhZ2VudC1tb2RlbC1icmllZnM6IGRpY3Rpb25hcmllcycpXG4gIGNvbnN0IG5vdGVzID0gbmV3IE1vZGVsTm90ZXNDb250cm9sbGVyKFxuICAgIGN0eC5jb25maWdGb3Jtcy5nZXQ8TW9kZWxOb3Rlc1NldHRpbmdzPihNT0RFTF9OT1RFU19FTlRSWV9JRCksXG4gICAgY3R4LmNvbmZpZ0Zvcm1zLmdldDxTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3M+KFNVQkFHRU5UX01PREVMX1NFTEVDVElPTl9FTlRSWV9JRCksXG4gIClcbiAgY3R4LmVmZmVjdCgoKSA9PiAoKSA9PiB7IG5vdGVzLmRpc3Bvc2UoKSB9LCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogZm9ybSBzdWJzY3JpcHRpb25zJylcbiAgY3R4LmVmZmVjdChcbiAgICAoKSA9PiBjdHgub24oJ2Nvbm5lY3Rpb24vcmVzZXQnLCAoKSA9PiB7IG5vdGVzLnJlc2V0Q29ubmVjdGlvbigpIH0pLFxuICAgICdkc2gtc3ViYWdlbnQtbW9kZWwtYnJpZWZzOiBjb25uZWN0aW9uIGdlbmVyYXRpb24nLFxuICApXG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LmNvbmZpZ0Zvcm1zLndoaWxlU2VydmVkKFtNT0RFTF9OT1RFU19FTlRSWV9JRF0sICgpID0+IGN0eC5zbG90cy5pbmplY3QoXG4gICAgJ3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nLFxuICAgICgpID0+IGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAncGx1Z2lucy5kZXRhaWwuc2VjdGlvbicsXG4gICAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZycsXG4gICAgICBvcmRlcjogMjAsXG4gICAgICBsYWJlbDogKCkgPT4gdCgnc2VjdGlvblRpdGxlJyksXG4gICAgICBsb2NhbGU6IE5TLFxuICAgICAgaW5qZWN0OiAoKSA9PiBub3Rlcy5pbmplY3QoKSxcbiAgICB9LCBNb2RlbE5vdGVzU2VjdGlvbiksXG4gICkpLCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogcGFuZWwnKVxuXG4gIGNvbnN0IHJlZnJlc2ggPSBuZXcgUmVmcmVzaENvbnRyb2xsZXIoKVxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5zbG90cy5pbmplY3QoJ2NvbnZlcnNhdGlvbi5zZXNzaW9uLmhlYWRlci51dGlsaXRpZXMnLCAoKSA9PiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgIG5hbWU6ICdjb252ZXJzYXRpb24uc2Vzc2lvbi5oZWFkZXIudXRpbGl0aWVzJyxcbiAgICBpZDogJ3RlYW0tbW9kZWwtcm91dGluZy1yZWZyZXNoJyxcbiAgICBvcmRlcjogLTUsXG4gICAgbG9jYWxlOiBOUyxcbiAgICBpbmplY3Q6ICgpID0+ICh7IHJlZnJlc2g6IChpZDogU2Vzc2lvbklkKSA9PiByZWZyZXNoLnJlZnJlc2goaWQpIH0pLFxuICB9LCBNb2RlbE5vdGVzUmVmcmVzaEFjdGlvbikpLCAnZHNoLXN1YmFnZW50LW1vZGVsLWJyaWVmczogc2Vzc2lvbiByZWZyZXNoJylcbn1cbiIsICIvKiogU2Vzc2lvbi1oZWFkZXIgYWN0aW9uIHRoYXQgcmVmcmVzaGVzIHRoaXMgU2Vzc2lvbidzIHN1YmFnZW50IG1vZGVsIG5vdGVzLiAqL1xuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBCdXR0b24sIEljb25SZWZyZXNoT3V0bGluZVJlZ3VsYXIsIFRvYXN0LCBUb29sdGlwIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktcHJpbWl0aXZlcydcbmltcG9ydCB0eXBlIHsgSW5qZWN0RmFjZSwgUHJvcHNMb2NhbGUsIFByb3BzUnVudGltZSB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXNsb3RzJ1xuaW1wb3J0IHR5cGUgeyBNb2RlbE5vdGVzTG9jYWxlS2V5IH0gZnJvbSAnLi9sb2NhbGVzLnRzJ1xuaW1wb3J0IHR5cGUgeyBSZWZyZXNoUmVzdWx0LCBTZXNzaW9uSWQgfSBmcm9tICcuL3JlZnJlc2gtY29udHJvbGxlci50cydcbmltcG9ydCBjc3MgZnJvbSAnLi9Nb2RlbE5vdGVzUmVmcmVzaEFjdGlvbi5tb2R1bGUuY3NzJ1xuXG4vKiogUHJvcHMgb2YgdGhlIGhlYWRlciB1dGlsaXR5IGVudHJ5LCB3aXRoIHRoZSByZWZyZXNoIGFjdGlvbiBpbmplY3RlZCBieSB0aGUgcGx1Z2luLiAqL1xuZXhwb3J0IHR5cGUgTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb25Qcm9wcyA9IFByb3BzUnVudGltZTwnY29udmVyc2F0aW9uLnNlc3Npb24uaGVhZGVyLnV0aWxpdGllcyc+XG4gICYgUHJvcHNMb2NhbGU8J3RlYW1Nb2RlbFJvdXRpbmcnPlxuICAmIEluamVjdEZhY2U8eyByZWFkb25seSByZWZyZXNoOiAoaWQ6IFNlc3Npb25JZCkgPT4gUHJvbWlzZTxSZWZyZXNoUmVzdWx0PiB9PlxuXG4vKiogQ29weSBrZXlzIHRoZSBidXR0b24gYW5ub3VuY2VzIGZvciBlYWNoIHJlZnJlc2ggb3V0Y29tZS4gKi9cbmNvbnN0IE1FU1NBR0VfS0VZUzogUmVjb3JkPFJlZnJlc2hSZXN1bHRbJ3N0YXR1cyddLCBNb2RlbE5vdGVzTG9jYWxlS2V5PiA9IHtcbiAgaWRsZTogJ3JlZnJlc2hMYWJlbCcsXG4gIGJ1c3k6ICdyZWZyZXNoQnVzeScsXG4gIHVwZGF0ZWQ6ICdyZWZyZXNoVXBkYXRlZCcsXG4gIHVuY2hhbmdlZDogJ3JlZnJlc2hVbmNoYW5nZWQnLFxuICBmYWlsZWQ6ICdyZWZyZXNoRmFpbGVkJyxcbiAgaW5hY3RpdmU6ICdyZWZyZXNoSW5hY3RpdmUnLFxufVxuXG4vKiogUmVuZGVyIGEgY29tcGFjdCBpY29uIGJ1dHRvbiBtYXRjaGluZyB0aGUgb3RoZXIgU2Vzc2lvbiB1dGlsaXRpZXMuICovXG5leHBvcnQgZnVuY3Rpb24gTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb24oeyBzZXNzaW9uSWQsIHJlZnJlc2gsIHQgfTogTW9kZWxOb3Rlc1JlZnJlc2hBY3Rpb25Qcm9wcykge1xuICBjb25zdCBbbm90aWNlLCBzZXROb3RpY2VdID0gdXNlU3RhdGU8UmVmcmVzaFJlc3VsdCB8IHVuZGVmaW5lZD4oKVxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXROb3RpY2UodW5kZWZpbmVkKVxuICAgIHNldEJ1c3koZmFsc2UpXG4gIH0sIFtzZXNzaW9uSWRdKVxuICBjb25zdCBvblJlZnJlc2ggPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVyblxuICAgIHNldEJ1c3kodHJ1ZSlcbiAgICB2b2lkIHJlZnJlc2goc2Vzc2lvbklkKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHNldE5vdGljZShyZXN1bHQpXG4gICAgICBzZXRCdXN5KGZhbHNlKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRvb2x0aXAgbGFiZWw9e3QoYnVzeSA/ICdyZWZyZXNoQnVzeScgOiAncmVmcmVzaExhYmVsJyl9IHNpZGU9XCJib3R0b21cIiBkZWxheU1zPXs1MDB9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICB2YXJpYW50PVwiZ2hvc3RcIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y3NzLnRyaWdnZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17dCgncmVmcmVzaExhYmVsJyl9XG4gICAgICAgICAgYXJpYS1idXN5PXtidXN5fVxuICAgICAgICAgIGRpc2FibGVkPXtidXN5fVxuICAgICAgICAgIGRhdGEtbW9kZWwtbm90ZXMtcmVmcmVzaD1cIlwiXG4gICAgICAgICAgb25DbGljaz17b25SZWZyZXNofVxuICAgICAgICA+XG4gICAgICAgICAgPEljb25SZWZyZXNoT3V0bGluZVJlZ3VsYXIgc2l6ZT17MTZ9IC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Ub29sdGlwPlxuICAgICAge25vdGljZSAhPT0gdW5kZWZpbmVkICYmIG5vdGljZS5zdGF0dXMgIT09ICdpZGxlJyAmJiBub3RpY2Uuc3RhdHVzICE9PSAnYnVzeScgJiYgKFxuICAgICAgICBub3RpY2Uuc3RhdHVzID09PSAndXBkYXRlZCcgfHwgbm90aWNlLnN0YXR1cyA9PT0gJ3VuY2hhbmdlZCdcbiAgICAgICAgICA/IDxUb2FzdFxuICAgICAgICAgICAga2V5PXtgJHtTdHJpbmcoc2Vzc2lvbklkKX0tJHtub3RpY2UubWVzc2FnZX0tJHtEYXRlLm5vdygpfWB9XG4gICAgICAgICAgICB0ZXh0PXt0KE1FU1NBR0VfS0VZU1tub3RpY2Uuc3RhdHVzXSl9XG4gICAgICAgICAgICB0b25lPVwic3VjY2Vzc1wiXG4gICAgICAgICAgICBvbkRvbmU9eygpID0+IHsgc2V0Tm90aWNlKHVuZGVmaW5lZCkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDogPFRvYXN0XG4gICAgICAgICAgICBrZXk9e2Ake1N0cmluZyhzZXNzaW9uSWQpfS0ke25vdGljZS5tZXNzYWdlfS0ke0RhdGUubm93KCl9YH1cbiAgICAgICAgICAgIHRleHQ9e3QoTUVTU0FHRV9LRVlTW25vdGljZS5zdGF0dXNdKX1cbiAgICAgICAgICAgIG9uRG9uZT17KCkgPT4geyBzZXROb3RpY2UodW5kZWZpbmVkKSB9fVxuICAgICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvPlxuICApXG59XG4iLCAiZXhwb3J0IGRlZmF1bHQge1widHJpZ2dlclwiOlwidHJpZ2dlcl9iNzAyMzU4MVwifTsiLCAiLyoqXG4gKiBUaGUgc3ViYWdlbnQgbW9kZWwgbm90ZXMgcGFuZWwsIGNvbnRyaWJ1dGVkIHRvIHRoZSBvZmZpY2lhbCBTdWJhZ2VudCBwbHVnaW5cbiAqIHBhZ2Ugb24gdGhlIFBsdWdpbnMgcGFnZSwgYmVsb3cgdGhhdCBwYWdlJ3MgbW9kZWwgYXV0aG9yaXphdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyB1c2VJZCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHR5cGUgeyBJbmplY3RGYWNlLCBQcm9wc0xvY2FsZSwgUHJvcHNSdW50aW1lIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2xvdHMnXG5pbXBvcnQgdHlwZSB7fSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wbHVnaW4tbWFuYWdlci9jbGllbnQnXG5pbXBvcnQgeyBTZXR0aW5nc0Zvcm0gfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC11aS1wcmltaXRpdmVzJ1xuaW1wb3J0IHsgZm9ybUxhYmVscyB9IGZyb20gJy4vbG9jYWxlcy50cydcbmltcG9ydCB0eXBlIHsgTW9kZWxOb3Rlc0ZhY2UsIE1vZGVsTm90ZXNTdGF0ZSB9IGZyb20gJy4vbW9kZWwtbm90ZXMtY29udHJvbGxlci50cydcbmltcG9ydCBjc3MgZnJvbSAnLi9Nb2RlbE5vdGVzU2VjdGlvbi5tb2R1bGUuY3NzJ1xuXG4vKiogYHBsdWdpbnMuaXRlbWAgaWQgb2YgdGhlIG9mZmljaWFsIFN1YmFnZW50IHNldHRpbmdzIHBhZ2UgdGhpcyBwYW5lbCBqb2lucy4gKi9cbmV4cG9ydCBjb25zdCBTVUJBR0VOVF9JVEVNX0lEID0gJ3N1YmFnZW50J1xuXG4vKiogRnJhbWV3b3JrLWRlcml2ZWQgcHJvcHM6IHRoZSBkZXRhaWwgcGFnZSdzIHN1YmplY3QsIHRoaXMgcGx1Z2luJ3MgZGljdGlvbmFyeSwgYW5kIGl0cyBzdGFnZWQgYWN0aW9ucy4gKi9cbmV4cG9ydCB0eXBlIE1vZGVsTm90ZXNTZWN0aW9uUHJvcHMgPSBQcm9wc1J1bnRpbWU8J3BsdWdpbnMuZGV0YWlsLnNlY3Rpb24nPlxuICAmIFByb3BzTG9jYWxlPCd0ZWFtTW9kZWxSb3V0aW5nJz5cbiAgJiBJbmplY3RGYWNlPE1vZGVsTm90ZXNGYWNlPlxuXG4vKipcbiAqIFJlbmRlciB0aGUgbm90ZXMgcGFuZWwgb24gdGhlIG9mZmljaWFsIFN1YmFnZW50IHBhZ2UsIG9yIG5vdGhpbmcgZm9yIGFueSBvdGhlciBwYWdlLlxuICogQHBhcmFtIHByb3BzIC0gdGhlIHBhZ2Ugc3ViamVjdCwgbG9jYWxlIGNvcHksIHRoZSBzdGFnZWQgcGFuZWwgc25hcHNob3QsIGFuZCBpdHMgYWN0aW9ucy5cbiAqIEByZXR1cm5zIHRoZSBzdGFnZWQgbm90ZXMgZm9ybSwgb3IgbnVsbCBvbiBhbnkgb3RoZXIgcGFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1vZGVsTm90ZXNTZWN0aW9uKHByb3BzOiBNb2RlbE5vdGVzU2VjdGlvblByb3BzKSB7XG4gIGNvbnN0IHsgc3ViamVjdCB9ID0gcHJvcHNcbiAgaWYgKHN1YmplY3Qua2luZCAhPT0gJ2l0ZW0nIHx8IHN1YmplY3QuaWQgIT09IFNVQkFHRU5UX0lURU1fSUQpIHJldHVybiBudWxsXG4gIHJldHVybiA8TW9kZWxOb3Rlc1BhbmVsIHByb3BzPXtwcm9wc30gLz5cbn1cblxuLyoqIFN1YnNjcmliZSBvbmx5IHdoaWxlIHRoZSBTdWJhZ2VudCBwYWdlIGlzIHJlbmRlcmVkLiAqL1xuZnVuY3Rpb24gTW9kZWxOb3Rlc1BhbmVsKHsgcHJvcHMgfTogeyByZWFkb25seSBwcm9wczogTW9kZWxOb3Rlc1NlY3Rpb25Qcm9wcyB9KSB7XG4gIGNvbnN0IHN0YXRlID0gcHJvcHMudXNlTW9kZWxOb3RlcyhzbmFwc2hvdCA9PiBzbmFwc2hvdClcbiAgcmV0dXJuIDxNb2RlbE5vdGVzRmllbGRzIHByb3BzPXtwcm9wc30gc3RhdGU9e3N0YXRlfSAvPlxufVxuXG4vKiogSGVhZGluZywgaGludCwgb25lIGZpZWxkc2V0IHBlciBzYXZlZCBhdXRob3JpemVkIG1vZGVsLCBhbmQgdGhlIGZvcm0ncyBzYXZlLiAqL1xuZnVuY3Rpb24gTW9kZWxOb3Rlc0ZpZWxkcyh7IHByb3BzLCBzdGF0ZSB9OiB7XG4gIHJlYWRvbmx5IHByb3BzOiBNb2RlbE5vdGVzU2VjdGlvblByb3BzXG4gIHJlYWRvbmx5IHN0YXRlOiBNb2RlbE5vdGVzU3RhdGVcbn0pIHtcbiAgY29uc3QgeyB0IH0gPSBwcm9wc1xuICBjb25zdCBoZWFkaW5nSWQgPSB1c2VJZCgpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtjc3Muc2VjdGlvbn0gYXJpYS1sYWJlbGxlZGJ5PXtoZWFkaW5nSWR9IGRhdGEtcGx1Z2luLW1vZGVsLW5vdGVzPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5pbnRyb30+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9e2Nzcy5oZWFkaW5nfSBpZD17aGVhZGluZ0lkfT57dCgnc2VjdGlvblRpdGxlJyl9PC9oMz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPXtjc3MuaGludH0+e3QoJ3NlY3Rpb25IaW50Jyl9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8U2V0dGluZ3NGb3JtIGxhYmVscz17Zm9ybUxhYmVscyh0KX0gc3RhdGU9e3N0YXRlfSBvblNhdmU9e3Byb3BzLnNhdmV9IG9uRGlzY2FyZD17cHJvcHMuZGlzY2FyZH0+XG4gICAgICAgIHshc3RhdGUuc2VsZWN0aW9uQXZhaWxhYmxlXG4gICAgICAgICAgPyA8cCBjbGFzc05hbWU9e2Nzcy5oaW50fT57dCgnc2VsZWN0aW9uVW5hdmFpbGFibGUnKX08L3A+XG4gICAgICAgICAgOiBzdGF0ZS5yb3dzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9e2Nzcy5oaW50fT57dCgnc2VsZWN0aW9uRW1wdHknKX08L3A+XG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5ub3Rlc30+XG4gICAgICAgICAgICAgICAge3N0YXRlLnJvd3MubWFwKHJvdyA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZmllbGRzZXQga2V5PXtyb3cua2V5fSBjbGFzc05hbWU9e2Nzcy5ub3RlR3JvdXB9IGRhdGEtbW9kZWwtbm90ZS1yb3c+XG4gICAgICAgICAgICAgICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPXtjc3MubGVnZW5kfT57YCR7cm93LnByb3ZpZGVyfS8ke3Jvdy5tb2RlbH1gfTwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICB7KFsnY2FwYWJpbGl0eScsICdzY2VuYXJpbyddIGFzIGNvbnN0KS5tYXAoZmllbGQgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBrZXk9e2ZpZWxkfSBjbGFzc05hbWU9e2Nzcy5ub3RlRmllbGR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoZmllbGQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nzcy50ZXh0YXJlYX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Jvd1tmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshc3RhdGUud3JpdGFibGUgfHwgc3RhdGUuc2F2aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7IHByb3BzLnNldE1vZGVsTm90ZShyb3cua2V5LCBmaWVsZCwgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgIHtzdGF0ZS5jb25mbGljdGVkID8gPHAgY2xhc3NOYW1lPXtjc3MuY29uZmxpY3R9IHJvbGU9XCJzdGF0dXNcIj57dCgnY29uZmxpY3QnKX08L3A+IDogbnVsbH1cbiAgICAgIDwvU2V0dGluZ3NGb3JtPlxuICAgIDwvc2VjdGlvbj5cbiAgKVxufVxuIiwgIi8qKiBMb2NhbGUgYnVuZGxlcyBmb3IgdGhlIHN1YmFnZW50IG1vZGVsIG5vdGVzIHBhbmVsLiAqL1xuXG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzRm9ybUxhYmVscyB9IGZyb20gJ0BkZWVwc2Vlay1haS9kc2gtY2xpZW50LXVpLXByaW1pdGl2ZXMnXG4vLyBUeXBlLW9ubHk6IHRoZSBucyBcdTIxOTIga2V5IHVuaW9uIG1lcmdlLiBgcmVnaXN0ZXIoTlMsIHsgemgsIGVuIH0pYCBjaGVja3MgYm90aFxuLy8gZGljdGlvbmFyaWVzIGFnYWluc3QgaXQsIHNvIGEga2V5IG1pc3NpbmcgZnJvbSBlaXRoZXIgaXMgYSBjb21waWxlIGVycm9yLlxuaW1wb3J0IHR5cGUge30gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktc2xvdHMnXG5cbi8qKiBMb2NhbGUga2V5cyB0aGUgcGFuZWwgcmVuZGVycy4gKi9cbmV4cG9ydCB0eXBlIE1vZGVsTm90ZXNMb2NhbGVLZXkgPVxuICB8ICd1bmF2YWlsYWJsZScgfCAncmVhZE9ubHknIHwgJ3NhdmUnIHwgJ3NhdmluZycgfCAnc2F2ZUZhaWxlZCdcbiAgfCAnc2VjdGlvblRpdGxlJyB8ICdzZWN0aW9uSGludCcgfCAnY2FwYWJpbGl0eScgfCAnc2NlbmFyaW8nXG4gIHwgJ3NlbGVjdGlvblVuYXZhaWxhYmxlJyB8ICdzZWxlY3Rpb25FbXB0eScgfCAnY29uZmxpY3QnXG4gIHwgJ3JlZnJlc2hMYWJlbCcgfCAncmVmcmVzaEJ1c3knIHwgJ3JlZnJlc2hVcGRhdGVkJyB8ICdyZWZyZXNoVW5jaGFuZ2VkJyB8ICdyZWZyZXNoRmFpbGVkJyB8ICdyZWZyZXNoSW5hY3RpdmUnXG5cbi8qKiBFbmdsaXNoIGNvcHkuICovXG5leHBvcnQgY29uc3QgZW46IFJlY29yZDxNb2RlbE5vdGVzTG9jYWxlS2V5LCBzdHJpbmc+ID0ge1xuICB1bmF2YWlsYWJsZTogJ1RoaXMgcGx1Z2luIGlzIG5vdCBsb2FkZWQsIHNvIGl0IGNhbm5vdCBiZSBjb25maWd1cmVkIHJpZ2h0IG5vdy4nLFxuICByZWFkT25seTogJ1RoaXMgZGVwbG95bWVudCBzdG9yZXMgc2V0dGluZ3MgcmVhZC1vbmx5LicsXG4gIHNhdmU6ICdTYXZlJyxcbiAgc2F2aW5nOiAnU2F2aW5nXHUyMDI2JyxcbiAgc2F2ZUZhaWxlZDogJ1RoZSBzYXZlIGNvdWxkIG5vdCBiZSBjb25maXJtZWQgYW5kIG1heSBoYXZlIGJlZW4gYXBwbGllZC4gWW91ciBkcmFmdCBpcyByZXRhaW5lZDsgY2hlY2sgdGhlIGN1cnJlbnQgc2V0dGluZ3MgYmVmb3JlIHRyeWluZyBhZ2Fpbi4nLFxuICBzZWN0aW9uVGl0bGU6ICdNb2RlbCBub3RlcycsXG4gIHNlY3Rpb25IaW50OiAnRGVzY3JpYmUgd2hhdCBlYWNoIGFsbG93ZWQgbW9kZWwgaXMgZ29vZCBhdCBhbmQgd2hlbiB0byB1c2UgaXQuIEFnZW50cyByZWFkIHRoZXNlIG5vdGVzIGZvciByZWZlcmVuY2Ugd2hlbiB0aGV5IGNob29zZSBhIHN1YmFnZW50IG1vZGVsLiBDaGFuZ2VzIGFwcGx5IHRvIG5ldyBzZXNzaW9uczsgcmVmcmVzaCBhbiBleGlzdGluZyBzZXNzaW9uIGZyb20gaXRzIGhlYWRlci4nLFxuICBjYXBhYmlsaXR5OiAnQ2FwYWJpbGl0eScsXG4gIHNjZW5hcmlvOiAnU2NlbmFyaW8nLFxuICBzZWxlY3Rpb25VbmF2YWlsYWJsZTogJ1N1YmFnZW50IG1vZGVsIHNlbGVjdGlvbiBpcyB1bmF2YWlsYWJsZSwgc28gbW9kZWwgbm90ZXMgY2Fubm90IGJlIGVkaXRlZCByaWdodCBub3cuJyxcbiAgc2VsZWN0aW9uRW1wdHk6ICdUdXJuIG9uIG1vZGVsIHNlbGVjdGlvbiBhYm92ZSwgY2hlY2sgbW9kZWxzLCBhbmQgc2F2ZS4gRWFjaCBzYXZlZCBtb2RlbCB0aGVuIGdldHMgaXRzIG5vdGUgZmllbGRzIGhlcmUuJyxcbiAgY29uZmxpY3Q6ICdUaGVzZSBub3RlcyBjaGFuZ2VkIHdoaWxlIHlvdSB3ZXJlIGVkaXRpbmcuIFlvdXIgZHJhZnQgY2Fubm90IGJlIHNhdmVkIGFnYWluc3QgdGhlIG5ld2VyIHZhbHVlcy4gTGVhdmUgdGhpcyBwYWdlIHRvIGRpc2NhcmQgdGhlIGRyYWZ0LCBjaGVjayB0aGUgY3VycmVudCBub3RlcywgdGhlbiBlZGl0IGFnYWluLicsXG4gIHJlZnJlc2hMYWJlbDogJ1JlZnJlc2ggc3ViYWdlbnQgbW9kZWwgbm90ZXMgZm9yIHRoaXMgc2Vzc2lvbicsXG4gIHJlZnJlc2hCdXN5OiAnUmVmcmVzaGluZyBzdWJhZ2VudCBtb2RlbCBub3Rlc1x1MjAyNicsXG4gIHJlZnJlc2hVcGRhdGVkOiAnU3ViYWdlbnQgbW9kZWwgbm90ZXMgdXBkYXRlZDsgdGhlIG5leHQgbWVzc2FnZSB3aWxsIHVzZSB0aGUgbmV3IGxpc3QuJyxcbiAgcmVmcmVzaFVuY2hhbmdlZDogJ1N1YmFnZW50IG1vZGVsIG5vdGVzIGFyZSBhbHJlYWR5IHVwIHRvIGRhdGUuJyxcbiAgcmVmcmVzaEZhaWxlZDogJ0NvdWxkIG5vdCByZWZyZXNoIHN1YmFnZW50IG1vZGVsIG5vdGVzLiBUcnkgYWdhaW4uJyxcbiAgcmVmcmVzaEluYWN0aXZlOiAnVGhpcyBzZXNzaW9uIGlzIG5vdCBhY3RpdmUgeWV0LiBTZW5kIGEgbWVzc2FnZSwgdGhlbiByZWZyZXNoIGFnYWluLicsXG59XG5cbi8qKiBTaW1wbGlmaWVkIENoaW5lc2UgY29weS4gKi9cbmV4cG9ydCBjb25zdCB6aDogUmVjb3JkPE1vZGVsTm90ZXNMb2NhbGVLZXksIHN0cmluZz4gPSB7XG4gIHVuYXZhaWxhYmxlOiAnXHU4QkU1XHU2M0QyXHU0RUY2XHU1RjUzXHU1MjREXHU2NzJBXHU1MkEwXHU4RjdEXHVGRjBDXHU2NjgyXHU2NUY2XHU2NUUwXHU2Q0Q1XHU5MTREXHU3RjZFXHUzMDAyJyxcbiAgcmVhZE9ubHk6ICdcdTY3MkNcdTkwRThcdTdGNzJcdTc2ODRcdThCQkVcdTdGNkVcdTRFM0FcdTUzRUFcdThCRkJcdTMwMDInLFxuICBzYXZlOiAnXHU0RkREXHU1QjU4JyxcbiAgc2F2aW5nOiAnXHU0RkREXHU1QjU4XHU0RTJEXHUyMDI2JyxcbiAgc2F2ZUZhaWxlZDogJ1x1NjVFMFx1NkNENVx1Nzg2RVx1OEJBNFx1NEZERFx1NUI1OFx1N0VEM1x1Njc5Q1x1RkYwQ1x1OEJCRVx1N0Y2RVx1NTNFRlx1ODBGRFx1NURGMlx1N0VDRlx1NzUxRlx1NjU0OFx1MzAwMlx1ODM0OVx1N0EzRlx1NURGMlx1NEZERFx1NzU1OVx1RkYxQlx1OEJGN1x1NTE0OFx1NjgzOFx1NUJGOVx1NUY1M1x1NTI0RFx1OEJCRVx1N0Y2RVx1NTE4RFx1OTFDRFx1OEJENVx1MzAwMicsXG4gIHNlY3Rpb25UaXRsZTogJ1x1NkEyMVx1NTc4Qlx1OEJGNFx1NjYwRScsXG4gIHNlY3Rpb25IaW50OiAnXHU0RTNBXHU2QkNGXHU0RTJBXHU1REYyXHU2Mzg4XHU2NzQzXHU3Njg0XHU2QTIxXHU1NzhCXHU1ODZCXHU1MTk5XHU4MEZEXHU1MjlCXHU4QkY0XHU2NjBFXHU1NDhDXHU5MDAyXHU3NTI4XHU1NzNBXHU2NjZGXHVGRjBDXHU0RjlCXHU2NjdBXHU4MEZEXHU0RjUzXHU5MDA5XHU2MkU5XHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU2NUY2XHU1M0MyXHU4MDAzXHUzMDAyXHU2NkY0XHU2NTM5XHU5RUQ4XHU4QkE0XHU0RUM1XHU1QkY5XHU2NUIwXHU0RjFBXHU4QkREXHU3NTFGXHU2NTQ4XHVGRjFCXHU1REYyXHU2NzA5XHU0RjFBXHU4QkREXHU1M0VGXHU1NzI4XHU0RjFBXHU4QkREXHU1OTM0XHU5MEU4XHU2MjRCXHU1MkE4XHU1MjM3XHU2NUIwXHUzMDAyJyxcbiAgY2FwYWJpbGl0eTogJ1x1ODBGRFx1NTI5Qlx1OEJGNFx1NjYwRScsXG4gIHNjZW5hcmlvOiAnXHU5MDAyXHU3NTI4XHU1NzNBXHU2NjZGJyxcbiAgc2VsZWN0aW9uVW5hdmFpbGFibGU6ICdcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdTkwMDlcdTYyRTlcdTVGNTNcdTUyNERcdTRFMERcdTUzRUZcdTc1MjhcdUZGMENcdTY2ODJcdTY1RjZcdTY1RTBcdTZDRDVcdTdGMTZcdThGOTFcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEUnLFxuICBzZWxlY3Rpb25FbXB0eTogJ1x1NTcyOFx1NEUwQVx1NjVCOVx1NUYwMFx1NTQyRlx1NkEyMVx1NTc4Qlx1OTAwOVx1NjJFOVx1MzAwMVx1NTJGRVx1OTAwOVx1NkEyMVx1NTc4Qlx1NUU3Nlx1NEZERFx1NUI1OFx1NTQwRVx1RkYwQ1x1NTNFRlx1NTcyOFx1OEZEOVx1OTFDQ1x1NEUzQVx1NkJDRlx1NEUyQVx1NURGMlx1NEZERFx1NUI1OFx1NzY4NFx1NkEyMVx1NTc4Qlx1NTg2Qlx1NTE5OVx1OEJGNFx1NjYwRScsXG4gIGNvbmZsaWN0OiAnXHU3RjE2XHU4RjkxXHU2NzFGXHU5NUY0XHU4QkY0XHU2NjBFXHU1REYyXHU1M0QxXHU3NTFGXHU1M0Q4XHU1MzE2XHVGRjBDXHU2NUUwXHU2Q0Q1XHU1N0ZBXHU0RThFXHU4RjgzXHU2NUIwXHU3Njg0XHU1MDNDXHU0RkREXHU1QjU4XHU4MzQ5XHU3QTNGXHUzMDAyXHU4QkY3XHU3OUJCXHU1RjAwXHU2QjY0XHU5ODc1XHU5NzYyXHU2NTNFXHU1RjAzXHU4MzQ5XHU3QTNGXHVGRjBDXHU2ODM4XHU1QkY5XHU1RjUzXHU1MjREXHU4QkY0XHU2NjBFXHU1NDBFXHU5MUNEXHU2NUIwXHU3RjE2XHU4RjkxXHUzMDAyJyxcbiAgcmVmcmVzaExhYmVsOiAnXHU1MjM3XHU2NUIwXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREXHU3Njg0XHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFJyxcbiAgcmVmcmVzaEJ1c3k6ICdcdTZCNjNcdTU3MjhcdTUyMzdcdTY1QjBcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEVcdTIwMjYnLFxuICByZWZyZXNoVXBkYXRlZDogJ1x1NUI1MFx1NEVFM1x1NzQwNlx1NkEyMVx1NTc4Qlx1OEJGNFx1NjYwRVx1NURGMlx1NjZGNFx1NjVCMFx1RkYwQ1x1NEUwQlx1NEUwMFx1Njc2MVx1NkQ4OFx1NjA2Rlx1NUMwNlx1NEY3Rlx1NzUyOFx1NjVCMFx1NTIxN1x1ODg2OFx1MzAwMicsXG4gIHJlZnJlc2hVbmNoYW5nZWQ6ICdcdTVCNTBcdTRFRTNcdTc0MDZcdTZBMjFcdTU3OEJcdThCRjRcdTY2MEVcdTVERjJcdTY2MkZcdTY3MDBcdTY1QjBcdTMwMDInLFxuICByZWZyZXNoRmFpbGVkOiAnXHU1MjM3XHU2NUIwXHU1QjUwXHU0RUUzXHU3NDA2XHU2QTIxXHU1NzhCXHU4QkY0XHU2NjBFXHU1OTMxXHU4RDI1XHVGRjBDXHU4QkY3XHU5MUNEXHU4QkQ1XHUzMDAyJyxcbiAgcmVmcmVzaEluYWN0aXZlOiAnXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREXHU1QzFBXHU2NzJBXHU2RkMwXHU2RDNCXHVGRjBDXHU4QkY3XHU1MTQ4XHU1M0QxXHU5MDAxXHU0RTAwXHU2NzYxXHU2RDg4XHU2MDZGXHU1MThEXHU1MjM3XHU2NUIwXHUzMDAyJyxcbn1cblxuLyoqXG4gKiBUaGUgZm9ybSBmcmFtZSdzIGNvcHksIHJlYWQgZnJvbSB0aGlzIHBhbmVsJ3MgZGljdGlvbmFyeS5cbiAqIEBwYXJhbSB0IC0gdGhlIHBhbmVsJ3MgbG9jYWxlIHJlYWRlci5cbiAqIEByZXR1cm5zIHRoZSBsYWJlbHMgdGhlIHNoYXJlZCBzZXR0aW5ncyBmb3JtIHJlbmRlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtTGFiZWxzKHQ6IChrZXk6IE1vZGVsTm90ZXNMb2NhbGVLZXkpID0+IHN0cmluZyk6IFNldHRpbmdzRm9ybUxhYmVscyB7XG4gIHJldHVybiB7XG4gICAgdW5hdmFpbGFibGU6IHQoJ3VuYXZhaWxhYmxlJyksXG4gICAgcmVhZE9ubHk6IHQoJ3JlYWRPbmx5JyksXG4gICAgc2F2ZUZhaWxlZDogdCgnc2F2ZUZhaWxlZCcpLFxuICAgIHNhdmU6IHQoJ3NhdmUnKSxcbiAgICBzYXZpbmc6IHQoJ3NhdmluZycpLFxuICB9XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQge1wic2VjdGlvblwiOlwic2VjdGlvbl8xZmNmYzk2N1wiLFwiaW50cm9cIjpcImludHJvXzFmY2ZjOTY3XCIsXCJoZWFkaW5nXCI6XCJoZWFkaW5nXzFmY2ZjOTY3XCIsXCJoaW50XCI6XCJoaW50XzFmY2ZjOTY3XCIsXCJjb25mbGljdFwiOlwiY29uZmxpY3RfMWZjZmM5NjdcIixcIm5vdGVzXCI6XCJub3Rlc18xZmNmYzk2N1wiLFwibm90ZUdyb3VwXCI6XCJub3RlR3JvdXBfMWZjZmM5NjdcIixcIm5vdGVGaWVsZFwiOlwibm90ZUZpZWxkXzFmY2ZjOTY3XCIsXCJsZWdlbmRcIjpcImxlZ2VuZF8xZmNmYzk2N1wiLFwidGV4dGFyZWFcIjpcInRleHRhcmVhXzFmY2ZjOTY3XCJ9OyIsICIvKipcbiAqIFN0YWdlZCBlZGl0b3IgZm9yIHN1YmFnZW50IG1vZGVsIG5vdGVzLlxuICpcbiAqIFRoZSBwYW5lbCBlZGl0cyBgbW9kZWxOb3Rlc2AgaW4gdGhpcyBwbHVnaW4ncyBIb3N0IGVudHJ5IGFuZCByZWFkcywgd2l0aG91dFxuICogd3JpdGluZywgdGhlIHJvdXRlcyB0aGUgb2ZmaWNpYWwgc3ViYWdlbnQgbW9kZWwgYXV0aG9yaXphdGlvbiBzYXZlZC4gQSBub3RlXG4gKiBmaWVsZCBpcyBvZmZlcmVkIGZvciBldmVyeSBzYXZlZCBhdXRob3JpemVkIHJvdXRlOyBub3RlcyBvZiBvdGhlciByb3V0ZXMgc3RheVxuICogaW4gdGhlIGRyYWZ0IGFuZCBpbiBldmVyeSBzYXZlLCBzbyBhIHJvdXRlIHRoZSB1c2VyIHVuY2hlY2tzIGFuZCBjaGVja3MgYWdhaW5cbiAqIGdldHMgaXRzIG5vdGUgYmFjay5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTbmFwc2hvdFN0b3JlLCB0eXBlIFNuYXBzaG90U3RvcmUgfSBmcm9tICdAZGVlcHNlZWstYWkvZHNoLWNsaWVudC1zdG9yZSdcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3NGb3JtU2NvcGUsIFNldHRpbmdzRm9ybVNoZWxsIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1jbGllbnQtdWktcHJpbWl0aXZlcydcblxuLyoqIEhvc3QgY29uZmlndXJhdGlvbiBlbnRyeSBpZCB0aGlzIHBhbmVsIGVkaXRzLiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX05PVEVTX0VOVFJZX0lEID0gJ3RlYW0tbW9kZWwtcm91dGluZy1zZXR0aW5ncydcblxuLyoqIE9mZmljaWFsIEhvc3QgZW50cnkgaG9sZGluZyB0aGUgc3ViYWdlbnQgbW9kZWwgYXV0aG9yaXphdGlvbjsgcmVhZCBvbmx5LiAqL1xuZXhwb3J0IGNvbnN0IFNVQkFHRU5UX01PREVMX1NFTEVDVElPTl9FTlRSWV9JRCA9ICdzdWJhZ2VudC1tb2RlbC1zZWxlY3Rpb24tc2V0dGluZ3MnXG5cbi8qKiBPbmUgZXhhY3QgcHJvdmlkZXIvbW9kZWwgcm91dGUuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsUm91dGUge1xuICBwcm92aWRlcjogc3RyaW5nXG4gIG1vZGVsOiBzdHJpbmdcbn1cblxuLyoqIEVkaXRhYmxlIG5vdGUgZm9yIG9uZSBleGFjdCByb3V0ZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxOb3RlIGV4dGVuZHMgTW9kZWxSb3V0ZSB7XG4gIGNhcGFiaWxpdHk6IHN0cmluZ1xuICBzY2VuYXJpbzogc3RyaW5nXG59XG5cbi8qKiBGaWVsZHMgdGhpcyBwYW5lbCByZWFkcyBhbmQgd3JpdGVzIGluIGl0cyBvd24gZW50cnkuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNTZXR0aW5ncyB7XG4gIC8qKiBTYXZlZCBub3RlcywgaW5jbHVkaW5nIG5vdGVzIG9mIHJvdXRlcyBub3QgY3VycmVudGx5IGF1dGhvcml6ZWQuICovXG4gIG1vZGVsTm90ZXM6IE1vZGVsTm90ZVtdXG59XG5cbi8qKiBGaWVsZHMgdGhpcyBwYW5lbCByZWFkcyBmcm9tIHRoZSBvZmZpY2lhbCBhdXRob3JpemF0aW9uIGVudHJ5LiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdWJhZ2VudE1vZGVsU2VsZWN0aW9uU2V0dGluZ3Mge1xuICAvKiogV2hldGhlciBuZXcgU2Vzc2lvbnMgcmVjZWl2ZSBleHBsaWNpdCBzdWJhZ2VudCBtb2RlbCBzZWxlY3Rpb24uICovXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbiAgLyoqIEV4YWN0IHJvdXRlcyBuZXcgU2Vzc2lvbnMgbWF5IHNlbGVjdC4gKi9cbiAgYWxsb3dlZE1vZGVsczogTW9kZWxSb3V0ZVtdXG59XG5cbi8qKiBPbmUgYXV0aG9yaXplZCByb3V0ZSB3aXRoIGl0cyBkcmFmdCBub3RlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RlbE5vdGVSb3cgZXh0ZW5kcyBNb2RlbE5vdGUge1xuICAvKiogU3RhYmxlIG9wYXF1ZSBpZGVudGl0eSB1c2VkIG9ubHkgZm9yIGxvb2t1cCBhbmQgYXMgdGhlIFJlYWN0IGtleS4gKi9cbiAga2V5OiBzdHJpbmdcbn1cblxuLyoqIFN0YXRlIHJlbmRlcmVkIGJ5IHRoZSBub3RlcyBwYW5lbC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxOb3Rlc1N0YXRlIGV4dGVuZHMgU2V0dGluZ3NGb3JtU2hlbGwge1xuICAvKiogV2hldGhlciB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeSBpcyBzZXJ2ZWQgYW5kIHJlYWQuICovXG4gIHNlbGVjdGlvbkF2YWlsYWJsZTogYm9vbGVhblxuICAvKiogU2F2ZWQgYXV0aG9yaXplZCByb3V0ZXMgd2l0aCB0aGVpciBkcmFmdCBub3RlcywgaW4gYXV0aG9yaXphdGlvbiBvcmRlci4gKi9cbiAgcm93czogcmVhZG9ubHkgTW9kZWxOb3RlUm93W11cbiAgLyoqIFdoZXRoZXIgYSBuZXdlciBIb3N0IHJldmlzaW9uIGludmFsaWRhdGVkIHRoZSBjdXJyZW50IGRyYWZ0LiAqL1xuICBjb25mbGljdGVkOiBib29sZWFuXG59XG5cbi8qKiBSZWdpc3RyYXRpb24tc2lkZSBmYWNlIGZvciB0aGUgbm90ZXMgcGFuZWwuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTm90ZXNGYWNlIHtcbiAgaG9va3M6IHtcbiAgICAvKiogUGFuZWwgc25hcHNob3QgYm91bmQgYnkgdGhlIHJlbmRlcmVyIGFzIHVzZU1vZGVsTm90ZXMuICovXG4gICAgbW9kZWxOb3RlczogU25hcHNob3RTdG9yZTxNb2RlbE5vdGVzU3RhdGU+XG4gIH1cbiAgLyoqIFN0YWdlIG9uZSBub3RlIGZpZWxkIG9mIGFuIGF1dGhvcml6ZWQgcm91dGUuICovXG4gIHNldE1vZGVsTm90ZTogKGtleTogc3RyaW5nLCBmaWVsZDogJ2NhcGFiaWxpdHknIHwgJ3NjZW5hcmlvJywgdmFsdWU6IHN0cmluZykgPT4gdm9pZFxuICAvKiogUGVyc2lzdCBldmVyeSBub3RlIGFzIG9uZSByZXZpc2lvbi1mZW5jZWQgbXV0YXRpb24uICovXG4gIHNhdmU6ICgpID0+IHZvaWRcbiAgLyoqIERyb3AgdGhlIHN0YWdlZCBub3Rlcy4gKi9cbiAgZGlzY2FyZDogKCkgPT4gdm9pZFxufVxuXG4vKipcbiAqIFN0YWJsZSBpZGVudGl0eSBmb3Igb25lIGV4YWN0IHJvdXRlOyBjYWxsZXJzIHJlc29sdmUgaXQgYnkgbG9va3VwIGFuZCBuZXZlciBwYXJzZSBpdC5cbiAqIEBwYXJhbSByb3V0ZSAtIHByb3ZpZGVyL21vZGVsIHJvdXRlIHRvIGlkZW50aWZ5LlxuICogQHJldHVybnMgb3BhcXVlIGtleSBmb3IgbG9va3VwIHdpdGhpbiB0aGUgcGFuZWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb2RlbE5vdGVLZXkocm91dGU6IE1vZGVsUm91dGUpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7cm91dGUucHJvdmlkZXJ9XFwwJHtyb3V0ZS5tb2RlbH1gXG59XG5cbi8qKiBEcm9wIG5vdGVzIHdpdGhvdXQgdGV4dCBzbyBjbGVhcmluZyBib3RoIGZpZWxkcyBlcXVhbHMgbmV2ZXIgd3JpdGluZyB0aGVtLiAqL1xuZnVuY3Rpb24gbWVhbmluZ2Z1bChub3RlczogSXRlcmFibGU8TW9kZWxOb3RlPik6IE1vZGVsTm90ZVtdIHtcbiAgcmV0dXJuIFsuLi5ub3Rlc11cbiAgICAuZmlsdGVyKG5vdGUgPT4gbm90ZS5jYXBhYmlsaXR5ICE9PSAnJyB8fCBub3RlLnNjZW5hcmlvICE9PSAnJylcbiAgICAubWFwKG5vdGUgPT4gKHsgcHJvdmlkZXI6IG5vdGUucHJvdmlkZXIsIG1vZGVsOiBub3RlLm1vZGVsLCBjYXBhYmlsaXR5OiBub3RlLmNhcGFiaWxpdHksIHNjZW5hcmlvOiBub3RlLnNjZW5hcmlvIH0pKVxufVxuXG4vKiogQ29tcGFyZSBub3RlIGxpc3RzIGFzIHNldHMga2V5ZWQgYnkgcm91dGUuICovXG5mdW5jdGlvbiBzYW1lTm90ZXMobGVmdDogcmVhZG9ubHkgTW9kZWxOb3RlW10sIHJpZ2h0OiByZWFkb25seSBNb2RlbE5vdGVbXSk6IGJvb2xlYW4ge1xuICBpZiAobGVmdC5sZW5ndGggIT09IHJpZ2h0Lmxlbmd0aCkgcmV0dXJuIGZhbHNlXG4gIGNvbnN0IG5vdGVzID0gbmV3IE1hcChsZWZ0Lm1hcChub3RlID0+IFttb2RlbE5vdGVLZXkobm90ZSksIG5vdGVdKSlcbiAgcmV0dXJuIHJpZ2h0LmV2ZXJ5KChub3RlKSA9PiB7XG4gICAgY29uc3Qgb3RoZXIgPSBub3Rlcy5nZXQobW9kZWxOb3RlS2V5KG5vdGUpKVxuICAgIHJldHVybiBvdGhlciAhPT0gdW5kZWZpbmVkICYmIG90aGVyLmNhcGFiaWxpdHkgPT09IG5vdGUuY2FwYWJpbGl0eSAmJiBvdGhlci5zY2VuYXJpbyA9PT0gbm90ZS5zY2VuYXJpb1xuICB9KVxufVxuXG4vKiogQnJpZGdlcyB0aGlzIHBsdWdpbidzIGVudHJ5IGFuZCB0aGUgb2ZmaWNpYWwgYXV0aG9yaXphdGlvbiBlbnRyeSBvbnRvIGEgc3RhZ2VkIHBhbmVsLiAqL1xuZXhwb3J0IGNsYXNzIE1vZGVsTm90ZXNDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBkcmFmdE5vdGVzOiBNYXA8c3RyaW5nLCBNb2RlbE5vdGU+IHwgdW5kZWZpbmVkXG4gIHByaXZhdGUgZHJhZnRSZXZpc2lvbjogbnVtYmVyIHwgdW5kZWZpbmVkXG4gIHByaXZhdGUgc2F2aW5nID0gZmFsc2VcbiAgcHJpdmF0ZSBmYWlsZWQgPSBmYWxzZVxuICBwcml2YXRlIG91dGNvbWVVbmtub3duID0gZmFsc2VcbiAgcHJpdmF0ZSBjb25mbGljdGVkID0gZmFsc2VcbiAgcHJpdmF0ZSBkaXNwb3NlZCA9IGZhbHNlXG4gIHByaXZhdGUgc2F2ZUdlbmVyYXRpb24gPSAwXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RvcmU6IFNuYXBzaG90U3RvcmU8TW9kZWxOb3Rlc1N0YXRlPlxuICBwcml2YXRlIHJlYWRvbmx5IHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkXG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzY29wZSAtIGJvdW5kIGB0ZWFtLW1vZGVsLXJvdXRpbmctc2V0dGluZ3NgIGNvbmZpZ3VyYXRpb24gZm9ybS5cbiAgICogQHBhcmFtIHNlbGVjdGlvbiAtIGJvdW5kIG9mZmljaWFsIGBzdWJhZ2VudC1tb2RlbC1zZWxlY3Rpb24tc2V0dGluZ3NgIGZvcm0sIHJlYWQgb25seS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IFNldHRpbmdzRm9ybVNjb3BlPE1vZGVsTm90ZXNTZXR0aW5ncz4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZWxlY3Rpb246IFNldHRpbmdzRm9ybVNjb3BlPFN1YmFnZW50TW9kZWxTZWxlY3Rpb25TZXR0aW5ncz4sXG4gICkge1xuICAgIHRoaXMuc3RvcmUgPSBjcmVhdGVTbmFwc2hvdFN0b3JlKHRoaXMucHJvamVjdGlvbigpKVxuICAgIGNvbnN0IG9mZlNjb3BlID0gc2NvcGUuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5vblNjb3BlQ2hhbmdlKCkgfSlcbiAgICBjb25zdCBvZmZTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5wdWJsaXNoKCkgfSlcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gKCkgPT4geyBvZmZTY29wZSgpOyBvZmZTZWxlY3Rpb24oKSB9XG4gIH1cblxuICAvKiogU3RvcCBvYnNlcnZpbmcgc2V0dGluZ3MgYW5kIHN1cHByZXNzIGxhdGUgd3JpdGUgc2V0dGxlbWVudHMuICovXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwb3NlZCA9IHRydWVcbiAgICB0aGlzLnNhdmVHZW5lcmF0aW9uICs9IDFcbiAgICB0aGlzLnVuc3Vic2NyaWJlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgcmVuZGVyZXIgZmFjZSBmb3IgdGhpcyBwYW5lbC5cbiAgICogQHJldHVybnMgdGhlIHNuYXBzaG90IGFuZCBzdGFnZWQgcGFuZWwgYWN0aW9ucyBpbmplY3RlZCBpbnRvIHRoZSByZW5kZXJlci5cbiAgICovXG4gIGluamVjdCgpOiBNb2RlbE5vdGVzRmFjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhvb2tzOiB7IG1vZGVsTm90ZXM6IHRoaXMuc3RvcmUgfSxcbiAgICAgIHNldE1vZGVsTm90ZTogKGtleSwgZmllbGQsIHZhbHVlKSA9PiB7IHRoaXMuc2V0TW9kZWxOb3RlKGtleSwgZmllbGQsIHZhbHVlKSB9LFxuICAgICAgc2F2ZTogKCkgPT4geyB2b2lkIHRoaXMuc2F2ZSgpIH0sXG4gICAgICBkaXNjYXJkOiAoKSA9PiB7IHRoaXMuZGlzY2FyZCgpIH0sXG4gICAgfVxuICB9XG5cbiAgLyoqIERyb3AgdGhlIGRyYWZ0IGFuZCBhbnkgcGVuZGluZyBzYXZlIGFmdGVyIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBIb3N0IHdhcyByZXBsYWNlZC4gKi9cbiAgcmVzZXRDb25uZWN0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc3Bvc2VkKSByZXR1cm5cbiAgICB0aGlzLnNhdmVHZW5lcmF0aW9uICs9IDFcbiAgICB0aGlzLnNhdmluZyA9IGZhbHNlXG4gICAgdGhpcy5jbGVhckRyYWZ0KClcbiAgICB0aGlzLnB1Ymxpc2goKVxuICB9XG5cbiAgLyoqIFJlLWRlcml2ZSB0aGUgZHJhZnQgYWdhaW5zdCBhIEhvc3QgcmV2aXNpb24gdGhlIG1pcnJvciBqdXN0IHB1Ymxpc2hlZC4gKi9cbiAgcHJpdmF0ZSBvblNjb3BlQ2hhbmdlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc3Bvc2VkKSByZXR1cm5cbiAgICBpZiAoIXRoaXMuc2F2aW5nICYmIHRoaXMuZHJhZnROb3RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS5yZXZpc2lvbiAhPT0gdGhpcy5kcmFmdFJldmlzaW9uKSB7XG4gICAgICBpZiAoc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIHRoaXMuZGVzaXJlZE5vdGVzKCkpKSB0aGlzLmNsZWFyRHJhZnQoKVxuICAgICAgZWxzZSB0aGlzLmNvbmZsaWN0ZWQgPSB0cnVlXG4gICAgfVxuICAgIHRoaXMucHVibGlzaCgpXG4gIH1cblxuICBwcml2YXRlIGN1cnJlbnROb3RlcygpOiBNb2RlbE5vdGVbXSB7XG4gICAgcmV0dXJuIG1lYW5pbmdmdWwodGhpcy5zY29wZS5nZXRTbmFwc2hvdCgpLnZhbHVlPy5tb2RlbE5vdGVzID8/IFtdKVxuICB9XG5cbiAgcHJpdmF0ZSBkZXNpcmVkTm90ZXMoKTogTW9kZWxOb3RlW10ge1xuICAgIHJldHVybiB0aGlzLmRyYWZ0Tm90ZXMgPT09IHVuZGVmaW5lZCA/IHRoaXMuY3VycmVudE5vdGVzKCkgOiBtZWFuaW5nZnVsKHRoaXMuZHJhZnROb3Rlcy52YWx1ZXMoKSlcbiAgfVxuXG4gIC8qKiBSb3V0ZXMgdGhlIG9mZmljaWFsIGVudHJ5IHNhdmVkIGFzIGF1dGhvcml6ZWQ7IGVtcHR5IHdoaWxlIHNlbGVjdGlvbiBpcyBvZmYgb3IgdW5zZXJ2ZWQuICovXG4gIHByaXZhdGUgYXV0aG9yaXplZFJvdXRlcygpOiBNb2RlbFJvdXRlW10ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy5zZWxlY3Rpb24uZ2V0U25hcHNob3QoKVxuICAgIGlmIChzbmFwc2hvdC5zdGF0dXMgIT09ICdyZWFkeScgfHwgc25hcHNob3QudmFsdWU/LmVuYWJsZWQgIT09IHRydWUpIHJldHVybiBbXVxuICAgIHJldHVybiBzbmFwc2hvdC52YWx1ZS5hbGxvd2VkTW9kZWxzLm1hcChyb3V0ZSA9PiAoeyBwcm92aWRlcjogcm91dGUucHJvdmlkZXIsIG1vZGVsOiByb3V0ZS5tb2RlbCB9KSlcbiAgfVxuXG4gIHByaXZhdGUgd3JpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLnNjb3BlLmdldFNuYXBzaG90KClcbiAgICByZXR1cm4gIXRoaXMuZGlzcG9zZWQgJiYgc25hcHNob3Quc3RhdHVzID09PSAncmVhZHknICYmIHNuYXBzaG90LndyaXRhYmxlICYmICF0aGlzLnNhdmluZ1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRNb2RlbE5vdGUoa2V5OiBzdHJpbmcsIGZpZWxkOiAnY2FwYWJpbGl0eScgfCAnc2NlbmFyaW8nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndyaXRhYmxlKCkpIHJldHVyblxuICAgIGNvbnN0IHJvdXRlID0gdGhpcy5hdXRob3JpemVkUm91dGVzKCkuZmluZChjYW5kaWRhdGUgPT4gbW9kZWxOb3RlS2V5KGNhbmRpZGF0ZSkgPT09IGtleSlcbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgaWYgKHRoaXMuZHJhZnROb3RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRyYWZ0Tm90ZXMgPSBuZXcgTWFwKHRoaXMuY3VycmVudE5vdGVzKCkubWFwKG5vdGUgPT4gW21vZGVsTm90ZUtleShub3RlKSwgbm90ZV0pKVxuICAgICAgdGhpcy5kcmFmdFJldmlzaW9uID0gdGhpcy5zY29wZS5nZXRTbmFwc2hvdCgpLnJldmlzaW9uXG4gICAgfVxuICAgIGNvbnN0IG5vdGUgPSB0aGlzLmRyYWZ0Tm90ZXMuZ2V0KGtleSkgPz8geyAuLi5yb3V0ZSwgY2FwYWJpbGl0eTogJycsIHNjZW5hcmlvOiAnJyB9XG4gICAgdGhpcy5kcmFmdE5vdGVzLnNldChrZXksIHsgLi4ubm90ZSwgW2ZpZWxkXTogdmFsdWUgfSlcbiAgICBpZiAoIXRoaXMub3V0Y29tZVVua25vd24pIHRoaXMuZmFpbGVkID0gZmFsc2VcbiAgICB0aGlzLnB1Ymxpc2goKVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckRyYWZ0KCk6IHZvaWQge1xuICAgIHRoaXMuZHJhZnROb3RlcyA9IHVuZGVmaW5lZFxuICAgIHRoaXMuZHJhZnRSZXZpc2lvbiA9IHVuZGVmaW5lZFxuICAgIHRoaXMuZmFpbGVkID0gZmFsc2VcbiAgICB0aGlzLm91dGNvbWVVbmtub3duID0gZmFsc2VcbiAgICB0aGlzLmNvbmZsaWN0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcHJpdmF0ZSBkaXNjYXJkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNhdmluZykgcmV0dXJuXG4gICAgdGhpcy5jbGVhckRyYWZ0KClcbiAgICB0aGlzLnB1Ymxpc2goKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzYXZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy5zY29wZS5nZXRTbmFwc2hvdCgpXG4gICAgY29uc3Qgbm90ZXMgPSB0aGlzLmRlc2lyZWROb3RlcygpXG4gICAgaWYgKHRoaXMuZGlzcG9zZWQgfHwgc25hcHNob3Quc3RhdHVzICE9PSAncmVhZHknIHx8ICFzbmFwc2hvdC53cml0YWJsZSB8fCB0aGlzLnNhdmluZykgcmV0dXJuXG4gICAgaWYgKHNhbWVOb3Rlcyh0aGlzLmN1cnJlbnROb3RlcygpLCBub3RlcykpIHJldHVyblxuICAgIC8vIEFuIHVudG91Y2hlZCBmb3JtIGhhcyBubyBkcmFmdCBhbmQgcmV0dXJuZWQgYWJvdmU7IHRoZSBmZW5jZSBpcyB0aGVcbiAgICAvLyByZXZpc2lvbiB0aGUgZHJhZnQgc3RhcnRlZCBmcm9tLCBzbyBhIHN0YWxlIGRyYWZ0IG5ldmVyIG92ZXJ3cml0ZXMgYSBuZXdlciB2YWx1ZS5cbiAgICBjb25zdCBmZW5jZSA9IHRoaXMuZHJhZnRSZXZpc2lvblxuICAgIGlmIChmZW5jZSA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBpZiAoc25hcHNob3QucmV2aXNpb24gIT09IGZlbmNlKSB7XG4gICAgICB0aGlzLmNvbmZsaWN0ZWQgPSB0cnVlXG4gICAgICB0aGlzLnB1Ymxpc2goKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGdlbmVyYXRpb24gPSB0aGlzLnNhdmVHZW5lcmF0aW9uXG4gICAgdGhpcy5zYXZpbmcgPSB0cnVlXG4gICAgdGhpcy5mYWlsZWQgPSBmYWxzZVxuICAgIHRoaXMuY29uZmxpY3RlZCA9IGZhbHNlXG4gICAgdGhpcy5wdWJsaXNoKClcbiAgICBsZXQgYWNjZXB0ZWQ6IGJvb2xlYW5cbiAgICB0cnkge1xuICAgICAgYWNjZXB0ZWQgPSBhd2FpdCB0aGlzLnNjb3BlLm11dGF0ZShbeyBvcDogJ3NldCcsIHBhdGg6IFsnbW9kZWxOb3RlcyddLCB2YWx1ZTogbm90ZXMgfV0sIGZlbmNlKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAvLyBUaGUgd3JpdGUgbWF5IGhhdmUgbGFuZGVkIGFsdGhvdWdoIGl0cyByZXNwb25zZSB3YXMgbG9zdDsga2VlcCB0aGUgZHJhZnQgYW5kIHJlcG9ydCBhbiB1bmtub3duIG91dGNvbWUuXG4gICAgICBpZiAoZ2VuZXJhdGlvbiAhPT0gdGhpcy5zYXZlR2VuZXJhdGlvbiB8fCB0aGlzLmRpc3Bvc2VkKSByZXR1cm5cbiAgICAgIHRoaXMuc2F2aW5nID0gZmFsc2VcbiAgICAgIHRoaXMuZmFpbGVkID0gdHJ1ZVxuICAgICAgdGhpcy5vdXRjb21lVW5rbm93biA9IHRydWVcbiAgICAgIHRoaXMuY29uZmxpY3RlZCA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKS5yZXZpc2lvbiAhPT0gZmVuY2VcbiAgICAgIHRoaXMucHVibGlzaCgpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGdlbmVyYXRpb24gIT09IHRoaXMuc2F2ZUdlbmVyYXRpb24gfHwgdGhpcy5kaXNwb3NlZCkgcmV0dXJuXG4gICAgY29uc3QgbGFuZGVkID0gYWNjZXB0ZWQgJiYgc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIG5vdGVzKVxuICAgIHRoaXMuc2F2aW5nID0gZmFsc2VcbiAgICB0aGlzLmZhaWxlZCA9ICFsYW5kZWRcbiAgICBpZiAobGFuZGVkKSB0aGlzLmNsZWFyRHJhZnQoKVxuICAgIHRoaXMub25TY29wZUNoYW5nZSgpXG4gIH1cblxuICBwcml2YXRlIHByb2plY3Rpb24oKTogTW9kZWxOb3Rlc1N0YXRlIHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuc2NvcGUuZ2V0U25hcHNob3QoKVxuICAgIGNvbnN0IGRyYWZ0ZWQgPSB0aGlzLmRyYWZ0Tm90ZXMgPz8gbmV3IE1hcCh0aGlzLmN1cnJlbnROb3RlcygpLm1hcChub3RlID0+IFttb2RlbE5vdGVLZXkobm90ZSksIG5vdGVdKSlcbiAgICBjb25zdCByb3dzID0gdGhpcy5hdXRob3JpemVkUm91dGVzKCkubWFwKChyb3V0ZSk6IE1vZGVsTm90ZVJvdyA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBtb2RlbE5vdGVLZXkocm91dGUpXG4gICAgICBjb25zdCBub3RlID0gZHJhZnRlZC5nZXQoa2V5KVxuICAgICAgcmV0dXJuIHsgLi4ucm91dGUsIGtleSwgY2FwYWJpbGl0eTogbm90ZT8uY2FwYWJpbGl0eSA/PyAnJywgc2NlbmFyaW86IG5vdGU/LnNjZW5hcmlvID8/ICcnIH1cbiAgICB9KVxuICAgIHJldHVybiB7XG4gICAgICBhdmFpbGFibGU6IHNuYXBzaG90LnN0YXR1cyA9PT0gJ3JlYWR5JyxcbiAgICAgIHdyaXRhYmxlOiBzbmFwc2hvdC53cml0YWJsZSxcbiAgICAgIGRpcnR5OiAhc2FtZU5vdGVzKHRoaXMuY3VycmVudE5vdGVzKCksIHRoaXMuZGVzaXJlZE5vdGVzKCkpLFxuICAgICAgaW52YWxpZDogZmFsc2UsXG4gICAgICBzYXZpbmc6IHRoaXMuc2F2aW5nLFxuICAgICAgZmFpbGVkOiB0aGlzLmZhaWxlZCxcbiAgICAgIHNlbGVjdGlvbkF2YWlsYWJsZTogdGhpcy5zZWxlY3Rpb24uZ2V0U25hcHNob3QoKS5zdGF0dXMgPT09ICdyZWFkeScsXG4gICAgICByb3dzLFxuICAgICAgY29uZmxpY3RlZDogdGhpcy5jb25mbGljdGVkLFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHVibGlzaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLnNldCh0aGlzLnByb2plY3Rpb24oKSlcbiAgfVxufVxuIiwgIi8qKiBCcm93c2VyIHN0YXRlIGZvciB0aGUgU2Vzc2lvbi1oZWFkZXIgc3ViYWdlbnQtbW9kZWwtbm90ZXMgcmVmcmVzaCBhY3Rpb24uICovXG5cbmltcG9ydCB0eXBlIHsgU2Vzc2lvbklkIH0gZnJvbSAnQGRlZXBzZWVrLWFpL2RzaC1zZXNzaW9uL3R5cGVzJ1xuXG5leHBvcnQgdHlwZSB7IFNlc3Npb25JZCB9XG5cbi8qKiBQYXRoIG9mIHRoZSBhdXRoZW50aWNhdGVkIEhvc3QgZW5kcG9pbnQgdGhpcyBjb250cm9sbGVyIGNhbGxzLiAqL1xuZXhwb3J0IGNvbnN0IFJFRlJFU0hfQVBJX1BBVEggPSAnL2FwaS90ZWFtLW1vZGVsLXJvdXRpbmcucmVmcmVzaCdcblxuLyoqIFdoYXQgdGhlIHJlZnJlc2ggYWN0aW9uIGN1cnJlbnRseSByZXBvcnRzLiAqL1xuZXhwb3J0IHR5cGUgUmVmcmVzaFN0YXR1cyA9ICdpZGxlJyB8ICdidXN5JyB8ICd1cGRhdGVkJyB8ICd1bmNoYW5nZWQnIHwgJ2ZhaWxlZCcgfCAnaW5hY3RpdmUnXG5cbi8qKiBPbmUgcmVxdWVzdCBvdXRjb21lLCB3aXRoIHRoZSBjb3B5IGtleSB0aGUgYnV0dG9uIHNob3VsZCBhbm5vdW5jZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVmcmVzaFJlc3VsdCB7XG4gIHJlYWRvbmx5IHN0YXR1czogUmVmcmVzaFN0YXR1c1xuICByZWFkb25seSBtZXNzYWdlOiBzdHJpbmdcbn1cblxuLyoqIEZldGNoIHN1YnN0aXR1dGUgc28gdHJhbnNwb3J0IGZhaWx1cmVzIHN0YXkgdGVzdGFibGUgd2l0aG91dCBhIHNlcnZlci4gKi9cbmV4cG9ydCB0eXBlIFJlZnJlc2hGZXRjaCA9IChwYXRoOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFJlc3BvbnNlPlxuXG4vKiogVHJhbnNsYXRlIGEgSG9zdCByZXNwb25zZSBpbnRvIGJ1dHRvbiBzdGF0ZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkUmVmcmVzaFJlc3VsdChvazogYm9vbGVhbiwgYm9keTogdW5rbm93bik6IFJlZnJlc2hSZXN1bHQge1xuICBjb25zdCBjb2RlID0gdHlwZW9mIGJvZHkgPT09ICdvYmplY3QnICYmIGJvZHkgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkoYm9keSlcbiAgICA/IChib2R5IGFzIHsgY29kZT86IHVua25vd24gfSkuY29kZVxuICAgIDogdW5kZWZpbmVkXG4gIGlmIChvaykge1xuICAgIGNvbnN0IGNoYW5nZWQgPSB0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcgJiYgYm9keSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShib2R5KVxuICAgICAgJiYgKGJvZHkgYXMgeyBjaGFuZ2VkPzogdW5rbm93biB9KS5jaGFuZ2VkID09PSB0cnVlXG4gICAgcmV0dXJuIGNoYW5nZWRcbiAgICAgID8geyBzdGF0dXM6ICd1cGRhdGVkJywgbWVzc2FnZTogJ3VwZGF0ZWQnIH1cbiAgICAgIDogeyBzdGF0dXM6ICd1bmNoYW5nZWQnLCBtZXNzYWdlOiAndW5jaGFuZ2VkJyB9XG4gIH1cbiAgcmV0dXJuIGNvZGUgPT09ICdpbmFjdGl2ZSdcbiAgICA/IHsgc3RhdHVzOiAnaW5hY3RpdmUnLCBtZXNzYWdlOiAnaW5hY3RpdmUnIH1cbiAgICA6IHsgc3RhdHVzOiAnZmFpbGVkJywgbWVzc2FnZTogJ2ZhaWxlZCcgfVxufVxuXG4vKiogT3duIHRoZSBwZXItc2Vzc2lvbiByZWZyZXNoIHJlcXVlc3Qgd2l0aG91dCBvd25pbmcgYSBSZWFjdCBob29rLiAqL1xuZXhwb3J0IGNsYXNzIFJlZnJlc2hDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nID0gbmV3IE1hcDxTZXNzaW9uSWQsIFByb21pc2U8UmVmcmVzaFJlc3VsdD4+KClcbiAgcHJpdmF0ZSByZWFkb25seSBmZXRjaGVyOiBSZWZyZXNoRmV0Y2hcblxuICAvKiogQHBhcmFtIGZldGNoZXIgLSB0cmFuc3BvcnQ7IHByb2R1Y3Rpb24gcGFzc2VzIGBmZXRjaGAsIHNwZWNzIHBhc3MgYSBzdHViLiAqL1xuICBjb25zdHJ1Y3RvcihmZXRjaGVyOiBSZWZyZXNoRmV0Y2ggPSAocGF0aCwgaW5pdCkgPT4gZmV0Y2gocGF0aCwgaW5pdCkpIHtcbiAgICB0aGlzLmZldGNoZXIgPSBmZXRjaGVyXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBvbmUgU2Vzc2lvbiwgZGVkdXBsaWNhdGluZyBvdmVybGFwcGluZyByZXF1ZXN0cyBmb3IgdGhlIHNhbWUgaWQuXG4gICAqIEBwYXJhbSBzZXNzaW9uSWQgLSBjdXJyZW50IFNlc3Npb24gZnJvbSB0aGUgaGVhZGVyIHNsb3QuXG4gICAqIEByZXR1cm5zIHRoZSBzZXR0bGVkIHN0YXR1cyBhbmQgaXRzIGNvcHkga2V5LlxuICAgKi9cbiAgcmVmcmVzaChzZXNzaW9uSWQ6IFNlc3Npb25JZCk6IFByb21pc2U8UmVmcmVzaFJlc3VsdD4ge1xuICAgIGNvbnN0IHJ1bm5pbmcgPSB0aGlzLnBlbmRpbmcuZ2V0KHNlc3Npb25JZClcbiAgICBpZiAocnVubmluZyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcnVubmluZ1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLnNlbmQoc2Vzc2lvbklkKS5maW5hbGx5KCgpID0+IHsgdGhpcy5wZW5kaW5nLmRlbGV0ZShzZXNzaW9uSWQpIH0pXG4gICAgdGhpcy5wZW5kaW5nLnNldChzZXNzaW9uSWQsIHRhc2spXG4gICAgcmV0dXJuIHRhc2tcbiAgfVxuXG4gIC8qKiBTZW5kIG9uZSBKU09OIFBPU1QgdG8gdGhlIEhvc3QgcmVmcmVzaCByb3V0ZS4gKi9cbiAgcHJpdmF0ZSBhc3luYyBzZW5kKHNlc3Npb25JZDogU2Vzc2lvbklkKTogUHJvbWlzZTxSZWZyZXNoUmVzdWx0PiB7XG4gICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZVxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hlcihSRUZSRVNIX0FQSV9QQVRILCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgc2Vzc2lvbklkIH0pLFxuICAgICAgfSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiB7IHN0YXR1czogJ2ZhaWxlZCcsIG1lc3NhZ2U6ICdmYWlsZWQnIH1cbiAgICB9XG4gICAgbGV0IGJvZHk6IHVua25vd25cbiAgICB0cnkge1xuICAgICAgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIHsgc3RhdHVzOiAnZmFpbGVkJywgbWVzc2FnZTogJ2ZhaWxlZCcgfVxuICAgIH1cbiAgICByZXR1cm4gcmVhZFJlZnJlc2hSZXN1bHQocmVzcG9uc2Uub2ssIGJvZHkpXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNFQSxtQkFBb0M7QUFDcEMsc0NBQWtFOzs7QUNIbEUsSUFBTyxrQ0FBUSxFQUFDLFdBQVUsbUJBQWtCOzs7QUR5Q3hDO0FBMUJKLElBQU0sZUFBcUU7QUFBQSxFQUN6RSxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixVQUFVO0FBQ1o7QUFHTyxTQUFTLHdCQUF3QixFQUFFLFdBQVcsU0FBUyxFQUFFLEdBQWlDO0FBQy9GLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx1QkFBb0M7QUFDaEUsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHVCQUFTLEtBQUs7QUFDdEMsOEJBQVUsTUFBTTtBQUNkLGNBQVUsTUFBUztBQUNuQixZQUFRLEtBQUs7QUFBQSxFQUNmLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFDZCxRQUFNLFlBQVksTUFBWTtBQUM1QixRQUFJLEtBQU07QUFDVixZQUFRLElBQUk7QUFDWixTQUFLLFFBQVEsU0FBUyxFQUFFLEtBQUssQ0FBQyxXQUFXO0FBQ3ZDLGdCQUFVLE1BQU07QUFDaEIsY0FBUSxLQUFLO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSDtBQUNBLFNBQ0UsNEVBQ0U7QUFBQSxnREFBQywyQ0FBUSxPQUFPLEVBQUUsT0FBTyxnQkFBZ0IsY0FBYyxHQUFHLE1BQUssVUFBUyxTQUFTLEtBQy9FO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxNQUFLO0FBQUEsUUFDTCxTQUFRO0FB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QUFBQSxFQUN2RjtBQUNBLE1BQUksT0FBTyxNQUFNLE1BQU07QUFBRSxVQUFNLFFBQVE7QUFBQSxFQUFFLEdBQUcsK0NBQStDO0FBQzNGLE1BQUk7QUFBQSxJQUNGLE1BQU0sSUFBSSxHQUFHLG9CQUFvQixNQUFNO0FBQUUsWUFBTSxnQkFBZ0I7QUFBQSxJQUFFLENBQUM7QUFBQSxJQUNsRTtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE9BQU8sTUFBTSxJQUFJLFlBQVksWUFBWSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sSUFBSSxNQUFNO0FBQUEsSUFDbkY7QUFBQSxJQUNBLE1BQU0sSUFBSSxNQUFNLFNBQVM7QUFBQSxNQUN2QixNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxPQUFPLE1BQU0sRUFBRSxjQUFjO0FBQUEsTUFDN0IsUUFBUTtBQUFBLE1BQ1IsUUFBUSxNQUFNLE1BQU0sT0FBTztBQUFBLElBQzdCLEdBQUcsaUJBQWlCO0FBQUEsRUFDdEIsQ0FBQyxHQUFHLGtDQUFrQztBQUV0QyxRQUFNLFVBQVUsSUFBSSxrQkFBa0I7QUFDdEMsTUFBSSxPQUFPLE1BQU0sSUFBSSxNQUFNLE9BQU8seUNBQXlDLE1BQU0sSUFBSSxNQUFNLFNBQVM7QUFBQSxJQUNsRyxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixRQUFRLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBa0IsUUFBUSxRQUFRLEVBQUUsRUFBRTtBQUFBLEVBQ25FLEdBQUcsdUJBQXVCLENBQUMsR0FBRyw0Q0FBNEM7QUFDNUU7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZHNoX2NsaWVudF91aV9wcmltaXRpdmVzIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3RlIl0KfQo=

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
injectStyle(".trigger_b7023581 {\n  flex: none;\n  width: 28px;\n  padding: 0;\n  color: var(--dsw-alias-label-secondary);\n}\n\n.section_1fcfc967 {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  min-width: 0;\n}\n.intro_1fcfc967 {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n.heading_1fcfc967 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-primary);\n}\n.hint_1fcfc967,\n.conflict_1fcfc967 {\n  margin: 0;\n  font-size: 12px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n.hint_1fcfc967 {\n  color: var(--dsw-alias-label-secondary);\n}\n.conflict_1fcfc967 {\n  color: var(--dsw-alias-state-error-primary);\n}\n.notes_1fcfc967,\n.noteGroup_1fcfc967,\n.noteField_1fcfc967 {\n  display: grid;\n  gap: 6px;\n  min-width: 0;\n}\n.notes_1fcfc967 {\n  gap: 10px;\n}\n.noteGroup_1fcfc967 {\n  margin: 0;\n  padding: 10px;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-lg);\n}\n.legend_1fcfc967 {\n  padding: 0 4px;\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n  overflow-wrap: anywhere;\n}\n.noteField_1fcfc967 {\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n}\n.textarea_1fcfc967 {\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 52px;\n  padding: 6px;\n  resize: vertical;\n  font: inherit;\n  font-size: 13px;\n  color: var(--dsw-alias-label-primary);\n  background: transparent;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-sm);\n}\n.textarea_1fcfc967:focus-visible {\n  outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));\n  outline-offset: 1px;\n}\n.textarea_1fcfc967:disabled {\n  opacity: 0.6;\n}\n");

return module.exports; } });
