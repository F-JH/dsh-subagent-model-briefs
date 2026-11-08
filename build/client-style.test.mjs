/**
 * Verifies the emitted browser bundle's styling against a real DOM.
 *
 * A bundle only styles a panel when two independently produced facts agree: the
 * `<style>` text the factory injects carries scoped class selectors, and the
 * React elements it renders carry `className` values naming those same classes.
 * The existing artifact tests prove the stylesheet is injected and non-empty,
 * which stays true of a bundle whose class map resolves every key to
 * `undefined`; the component then renders classless and the page looks unstyled
 * with a full stylesheet sitting unused in `<head>`. These tests therefore read
 * the rendered DOM and the injected sheet, never a build-time intermediate.
 *
 * `lib/client.js` is executed the way the shell executes it: the script
 * registers a factory, and the factory runs at materialization. React is
 * supplied from `node_modules`, so the component renders for real.
 *
 * @module dsh-team-model-routing/build/client-style.test
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { JSDOM } from 'jsdom'
import { PROJECT_ROOT, packageName } from './shared.mjs'

/** Emitted bundle, as `package.json` points the client module system at it. */
const BUNDLE = join(PROJECT_ROOT, 'lib/client.js')

/**
 * Assert the build produced the bundle these tests execute.
 * @returns the bundle source.
 */
async function bundleSource() {
  try {
    await access(BUNDLE)
  } catch {
    throw new Error(`${BUNDLE} is missing; run \`npm run build\` before \`npm test\``)
  }
  return readFile(BUNDLE, 'utf8')
}

/**
 * Execute the bundle in a DOM realm and run its factory.
 *
 * The bundle is a classic script that calls `window.__ModuleLoader__.load`, so
 * evaluating it in the jsdom realm is what makes its `document` reference the
 * DOM used by these assertions.
 * @returns the factory's exports and the DOM window it wrote into.
 */
async function materialize() {
  const source = await bundleSource()
  // `runScripts: 'outside-only'` gives the window a real global realm, which the
  // bundle needs: it opens with `window.__ModuleLoader__.load(...)`, so the
  // reference must resolve inside the page's realm rather than this module's.
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  })
  const registrations = []
  dom.window.__ModuleLoader__ = {
    /** @param entry - the `{ id, factory }` this bundle registers. */
    load(entry) { registrations.push(entry) },
  }
  dom.window.eval(source)

  assert.equal(registrations.length, 1, 'the bundle registers exactly one factory')
  const [registration] = registrations
  assert.equal(registration.id, packageName())
  assert.equal(
    dom.window.document.head.querySelectorAll('style').length,
    0,
    'registration alone must not touch the DOM; injection belongs to materialization',
  )

  const modules = await moduleTable()
  const exports = registration.factory(specifier => {
    const value = modules.get(specifier)
    assert.ok(value !== undefined, `the shell module table answers require(${JSON.stringify(specifier)})`)
    return value
  })
  return { exports, window: dom.window, document: dom.window.document }
}

/**
 * Modules the shell's table answers while the factory materializes.
 *
 * Only the entries the bundle actually requires are loaded: the component reads
 * React and the JSX runtime, and the primitive the panel composes. Each stays a
 * real module so hooks and component identity behave as they do in the shell.
 * @returns specifier → module namespace.
 */
async function moduleTable() {
  const react = await import('react')
  const jsxRuntime = await import('react/jsx-runtime')
  const reactDom = await import('react-dom')
  const reactDomClient = await import('react-dom/client')
  return new Map([
    ['react', react],
    ['react/jsx-runtime', jsxRuntime],
    ['react-dom', reactDom],
    ['react-dom/client', reactDomClient],
    ["@deepseek-ai/dsh-client-store", stubStore()],
    ['@deepseek-ai/dsh-client-ui-primitives', stubbedPrimitives(react)],
  ])
}

/**
 * Minimal stand-in for the shell's `dsh-client-store` module.
 *
 * The controller uses exactly one export, `createSnapshotStore`, and drives it
 * through `getSnapshot`/`set`/`subscribe`. This reproduces that contract over a
 * plain subscription set, which is what the component's snapshot hook reads.
 * @returns the module namespace the bundle expects.
 */
function stubStore() {
  /**
   * @param init - the initial snapshot.
   * @returns a store with the subset of the real store's API the panel uses.
   */
  function createSnapshotStore(init) {
    let snapshot = init
    const listeners = new Set()
    const notify = () => { for (const listener of listeners) listener() }
    return {
      getSnapshot: () => snapshot,
      /** @param next - the snapshot to publish. */
      set(next) { snapshot = next; notify() },
      /** @param update - a partial snapshot or an updater function. */
      update(update) {
        snapshot = typeof update === 'function' ? update(snapshot) : { ...snapshot, ...update }
        notify()
      },
      /** @param listener - called after every change. */
      subscribe(listener) {
        listeners.add(listener)
        return () => { listeners.delete(listener) }
      },
      /** @param selector - reads a value out of the current snapshot. */
      select: selector => selector(snapshot),
    }
  }
  return { createSnapshotStore }
}

/**
 * Stand-in for `dsh-client-ui-primitives`.
 *
 * The panel renders its one primitive as a real, classless element so the
 * surrounding structure (which carries the stylesheet's class names) is
 * present in the DOM without pulling in the shell's component implementations,
 * whose own styling is not under test here.
 * @param react - the React namespace.
 * @returns the module namespace the bundle expects.
 */
function stubbedPrimitives(react) {
  /**
   * @param props - the form's labels, staged state, and actions.
   * @returns the staged form's children in a plain container.
   */
  function SettingsForm(props) {
    return react.createElement('div', { 'data-stub': 'settings-form' }, props.children)
  }
  return { SettingsForm }
}

/**
 * The scoped class selectors declared by the injected stylesheet.
 * @param document - the DOM the factory wrote into.
 * @returns the declared class names.
 */
function declaredClasses(document) {
  const tags = document.head.querySelectorAll('style')
  assert.equal(tags.length, 1, 'materialization injects exactly one stylesheet')
  const [tag] = tags
  assert.equal(tag.dataset.plugin, packageName(), 'the tag is attributed to this package')
  assert.equal(tag.dataset.pluginCss, `${packageName()}/client.css`)
  return {
    text: tag.textContent,
    classes: new Set([...tag.textContent.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(match => match[1])),
  }
}

/**
 * A snapshot the panel can render from, so every branch that carries a class
 * name is exercised: one model row with both fields, and the conflict notice.
 * @returns the staged state handed to the section component.
 */
function stagedState() {
  return {
    available: true,
    writable: true,
    dirty: true,
    invalid: false,
    saving: false,
    failed: false,
    selectionAvailable: true,
    conflicted: true,
    rows: [{ key: 'alt\0pro', provider: 'alt', model: 'pro', capability: 'refactors', scenario: 'large changes' }],
  }
}

/**
 * Run `apply` against a stub browser context and return the component it
 * registers with the Plugins detail-page slot.
 *
 * The registration is the contract under test rather than an implementation
 * detail: `apply` is the only code the shell calls, so a section that never
 * registers is as unstyled as one whose stylesheet does not match.
 * @param exports - the factory's exports.
 * @returns the registered component.
 */
function registeredSection(exports) {
  let registered
  const noop = () => {}
  /** Records the disposer `ctx.effect` hands back, so teardown stays a no-op. */
  const effect = (fn) => {
    const disposer = fn()
    return typeof disposer === 'function' ? disposer : noop
  }
  const ctx = {
    effect,
    on: () => noop,
    locale: {
      bind: () => key => key,
      register: () => noop,
    },
    configForms: {
      // A `SettingsFormScope` over one served entry; the panel reads it through
      // `getSnapshot()` and subscribes for Host-side revisions.
      get: () => ({
        getSnapshot: () => ({ status: 'ready', writable: true, revision: 0, value: { modelNotes: [] } }),
        subscribe: () => noop,
        mutate: async () => true,
      }),
      whileServed: (_ids, callback) => callback(),
    },
    slots: {
      inject: (_name, callback) => callback(),
      /** @param slot - the slot declaration; `component` is its last argument. */
      register: (slot, component) => { registered = component; return slot },
    },
  }
  exports.apply(ctx)
  return registered
}

test('the injected stylesheet keeps the theme tokens the panel styles against', async () => {
  const { document } = await materialize()
  const { text, classes } = declaredClasses(document)
  assert.ok(classes.size > 0, 'the stylesheet declares class selectors')
  // Light/dark themes resolve these from the shell's token layer; a build that
  // inlined resolved colors instead would lose both themes.
  assert.match(text, /var\(--dsw-alias-[\w-]+\)/, 'selectors reference alias tokens rather than literal colors')
  assert.doesNotMatch(text, /#[0-9a-fA-F]{3,8}\b/, 'no hardcoded hex colors replace tokens')
  // Suffixed selectors must survive scoping: a rule that kept only `.local {`
  // would quietly drop hover, focus, disabled, and sibling state.
  assert.match(
    text,
    /^\.[\w-]+[^\s{,]*[:+>~][^{]*\{/m,
    'a scoped selector keeps its state or combinator suffix',
  )
})

test('every class the rendered panel applies is declared by the injected stylesheet', async () => {
  const { exports, document } = await materialize()
  const { classes } = declaredClasses(document)

  // The section is not an export of its own: `apply` registers it with the
  // `plugins.detail.section` slot, together with the props it needs. Render the
  // component the plugin actually registered, so the test follows the same path
  // the Plugins page does.
  const Section = registeredSection(exports)
  assert.equal(typeof Section, 'function', 'apply registers the section component with the detail-page slot')

  const state = stagedState()
  const props = {
    // The exact page the panel draws on; any other subject renders null.
    subject: { kind: 'item', id: 'subagent' },
    t: key => key,
    useModelNotes: selector => selector(state),
    setModelNote: () => {},
    save: () => {},
    discard: () => {},
  }

  const react = await import('react')
  const container = document.createElement('div')
  document.body.appendChild(container)
  const { createRoot } = await import('react-dom/client')

  // React's DOM renderer is a browser build: it reads `window`, `document`, and
  // `navigator` from the global scope, which a Node test does not provide.
  // Lend it the panel's own window for the length of the render, then restore,
  // so no DOM leaks into the other tests in this file.
  const borrowed = ['window', 'document', 'navigator', 'HTMLElement', 'Node', 'Event', 'MutationObserver']
  const saved = borrowed.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)])
  for (const name of borrowed) {
    const value = name === 'window' ? document.defaultView : document.defaultView[name]
    if (value !== undefined) Object.defineProperty(globalThis, name, { value, configurable: true, writable: true })
  }
  try {
    const root = createRoot(container)
    root.render(react.createElement(Section, props))
    // React's root renders on a microtask.
    await new Promise(resolve => setTimeout(resolve, 0))

    const applied = new Set()
    for (const node of container.querySelectorAll('[class]')) {
      for (const name of node.className.split(/\s+/).filter(Boolean)) applied.add(name)
    }
    assert.ok(applied.size > 0, 'the panel rendered elements carrying class names')

    // The defect this test exists for: a class map that resolves to undefined
    // renders the attribute as "undefined" or drops it, leaving bare, unstyled
    // markup that a "stylesheet is non-empty" assertion would still accept.
    assert.ok(!applied.has('undefined'), 'no className resolved to the string "undefined"')
    const unmatched = [...applied].filter(name => !classes.has(name))
    assert.deepEqual(unmatched, [], 'every applied className has a matching selector in the injected stylesheet')

    // Drift in the other direction is the same defect seen from the CSS side: a
    // declared class nothing applies means the map and the stylesheet disagree.
    const unused = [...classes].filter(name => !applied.has(name))
    assert.deepEqual(unused, [], 'every declared selector is applied by the rendered panel')

    root.unmount()
  } finally {
    for (const [name, descriptor] of saved) {
      if (descriptor === undefined) delete globalThis[name]
      else Object.defineProperty(globalThis, name, descriptor)
    }
  }
})

test('re-materializing replaces the stylesheet instead of stacking copies', async () => {
  const { window, document } = await materialize()
  const firstText = document.head.querySelector('style').textContent

  // A plugin reload re-runs the factory against the same document. The injector
  // keys on its tag id, so the second run must update the existing element: a
  // reload that appended would leave stale rules from the previous build.
  const source = await bundleSource()
  const registrations = []
  window.__ModuleLoader__ = { load: entry => registrations.push(entry) }
  window.eval(source)
  const modules = await moduleTable()
  registrations[0].factory(specifier => modules.get(specifier))

  const tags = document.head.querySelectorAll('style')
  assert.equal(tags.length, 1, 'a reload leaves exactly one stylesheet in the document')
  assert.equal(tags[0].textContent, firstText, 'the surviving stylesheet is the current build')
})
