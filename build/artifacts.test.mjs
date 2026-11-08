/**
 * Build-artifact contract tests.
 *
 * They run against the built `lib/` output, so they need no compiler and no
 * network: `npm run build && npm test`. They assert the facts the DSH Loader
 * and client module system read before serving the plugin, and they execute the
 * browser bundle through a stub module table so a bundle that registers under
 * the wrong id, requires a specifier the shell cannot answer, or throws on
 * materialization fails here rather than in a user's browser.
 *
 * @module dsh-team-model-routing/build/artifacts.test
 */

import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import { verifyArtifacts } from './verify.mjs'

const root = new URL('..', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
const id = manifest.name

/** @returns the built browser bundle source. */
function clientSource() {
  return readFileSync(new URL(manifest.exports['./client'].replace(/^\.\//, ''), root), 'utf8')
}

/** Stand-in for the shell's React seed: the entry reads only these hooks at materialization. */
function reactStub() {
  return {
    createElement: () => null,
    useState: () => [undefined, () => {}],
    useId: () => 'id',
    useEffect: () => {},
    useMemo: factory => factory(),
    useCallback: callback => callback,
    useRef: value => ({ current: value }),
  }
}

/**
 * Run the bundle in a stub document and return its registration plus the
 * specifiers its factory requested during materialization.
 */
function materialize() {
  const registrations = new Map()
  const injected = []
  const context = {
    window: { __ModuleLoader__: { load: registration => registrations.set(registration.id, registration) } },
    document: {
      querySelector: () => undefined,
      createElement: () => ({ dataset: {}, textContent: '' }),
      head: { appendChild: element => injected.push(element) },
    },
    console,
  }
  vm.createContext(context)
  vm.runInContext(clientSource(), context)

  const required = new Set()
  const require = (specifier) => {
    required.add(specifier)
    if (specifier === 'react') return reactStub()
    if (specifier === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null, Fragment: 'Fragment' }
    // Other table entries are unused until apply() runs; a stub object satisfies
    // the factory's top-level reads so the require list is what is under test.
    return new Proxy({}, { get: () => () => undefined })
  }
  require.async = async () => { throw new Error('no package-local chunks are emitted') }
  require.asset = reference => reference

  const registration = registrations.get(id)
  assert.ok(registration !== undefined, `the bundle registers ${id}`)
  const exports = registration.factory(require)
  return { exports, required, injected, registrations }
}

test('manifest declares what the Loader and client scan read', () => {
  assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml')
  assert.equal(manifest.dsh.client.platform, 'web')
  assert.equal(manifest.engines.dsh, '>=0.2.2-alpha.3 <0.3.0-0')
  // engines.dsh decides compatibility alone, so the peers stay on the exact
  // version they were verified at instead of restating the range.
  assert.equal(manifest.peerDependencies['@deepseek-ai/dsh-tool-subagent'], '0.2.2-alpha.3')
  assert.equal(manifest.peerDependencies['@deepseek-ai/dsh-experimental-agent-team'], undefined)
  assert.equal(manifest.license, 'MIT')
  assert.equal(manifest.exports['./client'], './lib/client.js')
  assert.equal(manifest.main, 'lib/index.js')
  // Declarations are not emitted by this build, so naming one would ship a
  // broken reference to every consumer's editor.
  assert.equal(manifest.types, undefined)
  assert.equal(typeof manifest.exports['.'], 'string')
  // A workspace protocol would make the package installable only inside the
  // DSH checkout, which is exactly what an independent release must not need.
  for (const section of ['dependencies', 'peerDependencies', 'devDependencies']) {
    for (const [name, range] of Object.entries(manifest[section] ?? {})) {
      assert.ok(!String(range).startsWith('workspace:'), `${section}.${name} uses ${range}`)
    }
  }
})

test('the patch inserts the one row the browser half attaches to', () => {
  const patch = readFileSync(new URL('cordis.patch.yml', root), 'utf8')
  const rows = [...patch.matchAll(/^\s*-\s+id:\s*(\S+)\s*$/gm)].map(match => match[1])
  assert.deepEqual(rows, ['team-model-routing-settings'], 'exactly one row, the settings namespace id')
  // The bare package specifier is what the client module system attaches the
  // browser half to; a subpath export there would never carry one.
  const names = [...patch.matchAll(/^\s+name:\s*(\S+)\s*$/gm)].map(match => match[1])
  assert.deepEqual(names, [id])
})

test('every declared export resolves to an emitted file', async () => {
  const targets = [manifest.main, manifest.exports['./client'], manifest.exports['.']]
  for (const target of targets) {
    assert.ok(existsSync(new URL(target.replace(/^\.\//, ''), root)), `${target} exists`)
  }
  // The same verification the build gate runs, so a green test implies a green build.
  assert.ok((await verifyArtifacts(id)).length > 0)
})

test('the browser bundle registers a lazy-CJS factory under the package name', () => {
  const source = clientSource()
  assert.ok(source.startsWith('window.__ModuleLoader__.load({'), 'the script registers before it does anything else')
  assert.ok(source.includes(`id: ${JSON.stringify(id)}`), 'the registration id is the package name')
  const registrations = new Map()
  const context = {
    window: { __ModuleLoader__: { load: registration => registrations.set(registration.id, registration) } },
    document: { querySelector: () => null, createElement: () => ({ dataset: {}, textContent: '' }), head: { appendChild: () => {} } },
    console,
  }
  vm.createContext(context)
  vm.runInContext(source, context)
  assert.deepEqual([...registrations.keys()], [id], 'exactly one registration, keyed by the package name')
  const registration = registrations.get(id)
  assert.equal(typeof registration.factory, 'function')
  assert.equal(registration.chunk, undefined, 'the entry registration carries no chunk name')
})

test('materialization requires only specifiers the shell module table answers', () => {
  const { exports, required, injected } = materialize()
  assert.equal(typeof exports.apply, 'function')
  assert.equal(typeof exports.inject, 'object')
  assert.equal(exports.NS, 'teamModelRouting')
  for (const specifier of required) {
    assert.ok(
      ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-store', '@deepseek-ai/dsh-client-ui-primitives'].includes(specifier),
      `${specifier} must be resolved by the shell module table`,
    )
  }
  assert.equal(injected.length, 1, 'the component stylesheet is injected once')
  assert.equal(injected[0].dataset.plugin, id)
})

test('the Host entry is an importable ESM plugin module', async (t) => {
  const hostEntry = new URL(manifest.main, root)
  if (!existsSync(hostEntry)) {
    t.skip(`${manifest.main} is missing; run \`npm run build\``)
    return
  }
  let module
  try {
    module = await import(hostEntry.href)
  } catch (error) {
    // The Host half keeps every `@deepseek-ai/*` package external so it shares
    // the installation's instances. Without an installed dependency tree those
    // imports cannot resolve, which is an environment fact rather than an
    // artifact defect: report it as such instead of failing the suite.
    if (error?.code === 'ERR_MODULE_NOT_FOUND' && /@deepseek-ai\//.test(String(error.message))) {
      t.skip('dependencies are not installed; run `npm install` to import the Host entry')
      return
    }
    throw error
  }
  // The entry is a function plugin: named `name`, `inject`, `Config`, and
  // `apply`, and no default export (mixing the forms makes the Loader drop the
  // namespace). `name` is the Settings namespace the panel addresses.
  assert.equal(module.default, undefined)
  assert.equal(module.name, 'team-model-routing-settings')
  assert.equal(typeof module.apply, 'function')
  assert.ok(module.inject.includes('subagentModelSelection'), 'activation waits for the official authorization owner')
  assert.equal(typeof module.Config, 'function')
})
