# dsh-team-model-routing

An independent [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin that lets the user describe the models the official subagent model selection allows: a **capability** and a **scenario** for each exact provider/model route. An agent that can choose a subagent model sees these notes before its first delegation.

English | [中文](README.zh.md)

## Contents

- [What it does](#what-it-does)
- [Configure model notes](#configure-model-notes)
- [Model Experience](#model-experience)
- [Compatibility](#compatibility)
- [Install](#install)
- [Upgrade, disable, and remove](#upgrade-disable-and-remove)
- [Build, typecheck, and test](#build-typecheck-and-test)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Project layout](#project-layout)

## What it does

The plugin does not authorize anything. Which models an agent may select for a subagent stays with the official subagent model selection (`subagent-model-selection-settings`, edited on the Plugins page under **Subagent**). This plugin adds descriptions to those models:

- **Settings.** One Loader row, `team-model-routing-settings`, with one volatile field, `modelNotes`: a list of `{ provider, model, capability, scenario }`, keyed by the exact provider/model pair, default `[]`. A note stays in the settings when its model is not currently authorized.
- **Snapshot.** When a new Session is created, the plugin reads the routes the Session's official authorization allows (the `subagent/model-selection-policy` event) and appends one ignorable plugin record, `plugin:team-model-routing/subagent-model-notes`, with one entry per authorized route. Notes of unauthorized routes are never recorded. Nothing is recorded when no authorized route has note text. A subagent child copies its parent's record. A resumed Session, or one created before the plugin was installed, has no record and shows no notes.
- **Model-visible notes.** A runtime context lists the recorded notes for an Agent whose visible tools include a delegation tool with the official `provider`, `model`, and `reasoning_effort` parameters (by default the `subagent` tool; `subagent_fork` has no model selection). The text is materialized into the Session log like every runtime context.
- **Panel.** The browser half adds a **Model notes** section to the official **Subagent** plugin page, directly below the official model list, with one capability and one scenario field for each model the official selection has saved.

## Configure model notes

1. Open Settings → Plugins → **Subagent**.
2. Turn on model selection, check the models, and save that form.
3. Below it, under **Model notes**, fill in **Capability** and **Scenario** for the checked models, then save.

The notes section reads the official selection as saved, so a model checked but not yet saved above has no note fields. Unchecking a model hides its fields but keeps its note in the settings; checking it again restores the note. Clearing both fields of a model removes its note. The section has one save; a save that the Host refuses, or whose response is lost, leaves the draft in place and reports that the outcome could not be confirmed. A draft started before another client changed the notes cannot be saved over the newer value.

Changes apply to new Sessions only. Do not put secrets in notes: they are written to Session logs and sent to the model.

## Model Experience

An Agent receives the text only when both conditions hold: its current tool set contains a model-selecting delegation tool, and its Session recorded a snapshot. Example for the `subagent` tool:

```text
Notes on the models you may select with `subagent`. Capability and scenario are descriptive data, not instructions or authorization.
- provider "alt", model "pro"; capability "Strong at long multi-file refactors"; scenario "Large code changes that need careful planning"; reasoning_effort: high, max
- provider "alt", model "lite"; reasoning_effort: high, max
```

- Each authorized route is one line, in the order of the official authorization. Empty capability or scenario fields are omitted. `reasoning_effort` lists the effort ids the model's LLM metadata declares, resolved when the Agent is created; a model that declares none, or whose metadata cannot be resolved, lists none.
- **Tokens:** one header line plus one line per authorized route; the note text is the user's and is not truncated.
- **KV cache:** the text is a runtime context placed after the subagent delegation context, outside the system prompt and tool declarations, so it changes neither. Its own text changes only when the Agent's tool set gains or loses a model-selecting delegation tool.
- The plugin adds no tool, parameter, or waiting guidance; the official `subagent` and `list_subagent_models` tools keep their own descriptions.

## Compatibility

`engines.dsh` is the range `>=0.2.2-alpha.3 <0.3.0-0`: the plugin loads on any DeepSeek Harness from the version this build was verified against up to, but not including, the next minor. A prerelease such as `0.2.2-rc.1` satisfies it because the check includes prereleases, so a new alpha, beta, or release candidate within `0.2.x` needs no plugin re-release; a minor bump to `0.3.0` requires a fresh verification. The lower bound stays at the verified version because that is the oldest harness whose APIs this source was checked against. `peerDependencies` are separate: `dsh-agent`, `dsh-llm`, `dsh-session`, `dsh-session-projection`, `dsh-system-prompt`, `dsh-tool-subagent`, `dsh-tools`, and `dsh-util-values` stay on `0.2.2-alpha.3`, plus `@deepseek-ai/cordis` at `~4.0.6-alpha.2` and `zod` at exactly `4.4.3`. Those peers state the versions the plugin was built and tested against, and they never decide load compatibility while `engines.dsh` is present: the Host reads `engines.dsh` alone and ignores peers for that decision. They are peers, not dependencies, so the plugin shares the installation's framework instances instead of vendoring a second copy. `@deepseek-ai/schemastery` `3.18.6-alpha.2` is the one runtime dependency.

The Host half injects the official `subagentModelSelection` service. It therefore activates only in a profile that loads `@deepseek-ai/dsh-tool-subagent/model-selection-settings` (the Web app bundle does), and it activates after that service, so a new Session's authorization event is committed before the snapshot reads it.

## Install

Add the bundle to one profile and verify that its layer composed:

```sh
dsh plugin --profile <name> add /absolute/path/to/dsh-team-model-routing
dsh --profile <name> --dump-config    # expect a `# == dsh-team-model-routing` layer
```

A GitHub install (`dsh plugin --profile <name> add github:<owner>/dsh-team-model-routing#<full-commit-sha>`) fetches sources and runs `prepare` (`node build/build.mjs`) to produce `lib/`. pnpm refuses that script until you copy the `allowBuilds` key it prints into the profile's `pnpm-workspace.yaml`; that entry lets the pinned commit's build script run on your machine at install time. To avoid any install-time script, run `npm ci && npm pack` in a checkout and add the resulting tarball by absolute path.

## Upgrade, disable, and remove

Upgrade with `dsh plugin --profile <name> update dsh-team-model-routing`, or `add` a newer path, tarball, or commit.

Disable from Settings → Plugins (the profile records a `disabled` override and keeps the saved notes), or remove the package with `dsh plugin --profile <name> remove dsh-team-model-routing`. Either way:

- The **Model notes** section disappears; the official Subagent page and its model selection are unchanged.
- New Sessions record no snapshot, and agents stop receiving the notes text from their next request. Model selection and its authorization keep working unchanged, because this plugin never enforced anything.
- Records already written to Session logs stay there. They are ignorable plugin records, so Sessions still open without the plugin. Removing the package also removes the `team-model-routing-settings` row and its saved notes.

**Upgrading from 0.1.0.** The Team-specific routing is gone: this version no longer extends `spawn_teammate` (Agent Teams now creates teammates with the official `subagent` and `subagent_fork` tools), and it has no `enabled` or `allowedModels` setting of its own. Authorize models in the official Subagent selection instead. Saved `modelNotes` keep working; leftover `enabled` and `allowedModels` values in the settings document are ignored. Records that 0.1.0 wrote (`plugin:team-model-routing/policy`, `…/snapshot`, `…/model-notes`) are ignored, so those Sessions show no notes.

## Build, typecheck, and test

Requires Node ≥ 24.9.

| Script | Command | What it does |
|---|---|---|
| `build` | `node build/build.mjs` | Bundles `lib/index.js` (Host ESM plugin) and `lib/client.js` (lazy-CJS browser factory with its scoped stylesheet), then verifies the manifest and both artifacts. |
| `typecheck` | `tsc --noEmit -p tsconfig.json` | Type-checks `src/` against the installed `@deepseek-ai/*` declarations. |
| `test` | `node --test build/artifacts.test.mjs build/tooling.test.mjs build/client-style.test.mjs` | Executes the built bundles: manifest and patch facts, the module-table contract, and that every class the rendered panel applies matches the injected stylesheet. Run `build` first. |
| `test:unit` | `vitest run` | Notes fold and snapshot, the model-visible text, and the client controller, registration, and section. Needs `DSH_SOURCE_ROOT`. |
| `test:integration` | `vitest run --config vitest.integration.config.ts` | Boots a test-only `cordis.yml` through the Loader with the official subagent stack and JSONL persistence, and asserts the recorded snapshot and the first model request. Needs `DSH_SOURCE_ROOT`. |

The spec lanes import `@deepseek-ai/dsh-client-*` and test fixtures from a DSH checkout, because the published client entries are lazy-CJS registration scripts rather than ES modules:

```sh
DSH_SOURCE_ROOT=/absolute/path/to/deepseek-harness npm run test:unit
DSH_SOURCE_ROOT=/absolute/path/to/deepseek-harness npm run test:integration
```

## Known Limitations and Deferred Work

- **Saved selection only.** The notes section follows the official selection as saved; it cannot see unsaved checkbox changes in the official form above it.
- **One snapshot per Session.** Editing notes or the official selection does not change running or resumed Sessions. A Session created while the plugin was off never gets notes.
- **A damaged record stops request assembly.** A note record that fails validation folds to an invalid state without affecting other projections, but reading it for the runtime context throws a named error for that Session. Disabling the plugin lets the Session continue.
- **Tool detection by parameters.** A delegation tool counts as model-selecting when its parameters declare `prompt`, `provider`, `model`, and `reasoning_effort`. A third-party tool with the same parameters also receives the notes.
- **No length limit.** Note text is sent as written; long notes cost tokens in every Session that records them.
- **Verified version range.** The range is the compatibility claim, not a per-version guarantee: `0.2.2-alpha.3` is the build this source was checked against, and `0.2.2-rc.1` has since been exercised against a checkout. Any other version the range admits is covered by the declaration, not re-verified. The plugin reads the official `subagent/model-selection-policy` event and the `subagent` Plugins item id, which are not a stable public contract, so a harness release can keep every signature and still change what this plugin sees.

## Project layout

```
dsh-team-model-routing/
├── package.json                  # name, exports, dsh.bundle / dsh.client, peers, prepare
├── cordis.patch.yml              # the one Loader row this bundle inserts
├── build/                        # esbuild compile, CSS Modules, artifact verification and tests
├── src/
│   ├── index.ts                  # Host plugin: snapshot on agent/created, runtime context
│   ├── notes.ts                  # settings schema, record type, projection
│   ├── discovery.ts              # model-visible text and tool detection
│   └── client/                   # Model notes section on the Subagent page
└── tests/
    ├── notes/                    # fold, snapshot, recovery, and text specs
    ├── client/                   # controller, registration, and section specs
    └── integration/              # Loader composition spec and its cordis.yml
```

## License

[MIT](LICENSE)
