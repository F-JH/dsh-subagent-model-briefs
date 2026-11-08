/**
 * Browser bundle compiler: `src/client/index.ts` → `lib/client.js`.
 *
 * The output is one self-contained classic script in the DSH client module
 * system's lazy-CJS factory format. Everything except the shell's module-table
 * entries is inlined, because the factory's `require` can answer only those
 * specifiers: any other runtime `require` the table cannot answer throws when
 * the plugin materializes.
 *
 * Three source-level features the shell's own preset provides are reproduced
 * here, since none of them exists in a package built outside the DSH
 * repository:
 *
 * - CSS Modules. See [css-modules.mjs](./css-modules.mjs): each reachable
 *   `*.module.css` compiles to its scoped class map plus the scoped text.
 * - Style injection. The collected text is written into the bundle and applied
 *   once when the factory runs, tagged with the package name so teardown and
 *   rebuilds replace it rather than stack copies.
 * - Sourcemaps. An inline map keeps the served script a single file, which is
 *   what `/plugins/<package>/client.js` must be.
 *
 * @module dsh-subagent-model-briefs/build/client
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { build } from 'esbuild'
import { cssModules } from './css-modules.mjs'
import { EXTERNAL_MODULES, PROJECT_ROOT, packageName, readManifest, wrapFactory } from './shared.mjs'

/** Entry module of the browser half. */
const ENTRY = join(PROJECT_ROOT, 'src/client/index.ts')

/** Emitted bundle, the path `exports["./client"]` names. */
const OUTPUT = join(PROJECT_ROOT, 'lib/client.js')

/**
 * Every module request the shell's table can answer while a plugin factory
 * runs. The factory receives a `require`; anything outside this set and the
 * package's own inlined modules throws `missed the module table`.
 */
const TABLE_ANSWERABLE = new Set(EXTERNAL_MODULES)

/**
 * Compile the browser half.
 *
 * @returns the emitted bundle path, its byte length, and how many stylesheets it carries.
 * @throws {Error} when esbuild reports a compile error or the bundle keeps a
 *   request the shell's module table cannot answer.
 */
export async function buildClient() {
  const id = packageName()
  const manifest = readManifest()
  // `dsh.client.external` adds exact non-baseline module requests. Every one of
  // them must stay external too, or the bundle would inline a module the shell
  // is responsible for sharing — and the table must answer it as well.
  const requested = manifest.dsh?.client?.external ?? []
  const external = [...new Set([...EXTERNAL_MODULES, ...requested])]

  /** Stylesheet text reachable from the entry, in first-import order. */
  const stylesheets = []

  const result = await build({
    entryPoints: [ENTRY],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'browser',
    target: 'es2024',
    // `jsx: 'automatic'` emits `react/jsx-runtime` imports, which the shell's
    // module table seeds; the component module keeps that request.
    jsx: 'automatic',
    jsxImportSource: 'react',
    sourcemap: 'inline',
    sourcesContent: true,
    legalComments: 'none',
    logLevel: 'silent',
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    external,
    plugins: [cssModules({ root: PROJECT_ROOT, stylesheets })],
    banner: { js: `/* ${id} v${manifest.version} — DSH client bundle (lazy-CJS factory) */` },
  })

  if (result.errors.length > 0) {
    throw new Error(`build:client: ${result.errors.map(error => error.text).join('\n')}`)
  }
  for (const warning of result.warnings) {
    process.stderr.write(`build:client: warning: ${warning.text}\n`)
  }

  const [script] = result.outputFiles
  if (script === undefined) throw new Error('build:client: esbuild produced no script output')

  const unresolved = [...new Set([...script.text.matchAll(/\brequire\("([^"]+)"\)/g)].map(match => match[1]))]
    .filter(specifier => !TABLE_ANSWERABLE.has(specifier))
  if (unresolved.length > 0) {
    throw new Error(
      `build:client: the bundle keeps require() calls the shell module table cannot answer: ${unresolved.join(', ')}. `
      + 'Add the specifier to EXTERNAL_MODULES only if the shell seeds it; otherwise let esbuild inline it.',
    )
  }

  const styleTag = stylesheets.length === 0
    ? ''
    : `injectStyle(${JSON.stringify(stylesheets.join('\n'))});\n`

  const body = `${script.text}\n${injectStyleSource(id)}\n${styleTag}`
  const source = wrapFactory(id, body)
  await mkdir(dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, source, 'utf8')
  return { path: OUTPUT, bytes: Buffer.byteLength(source), stylesheets: stylesheets.length }
}

/**
 * Source of the one-time style injector.
 *
 * The injector is idempotent by tag id so a reloaded bundle replaces its own
 * style instead of stacking a second copy. It runs inside the factory, which
 * is the only point at which module side effects belong in this format.
 * @param id - package name tagged onto the `<style>` element.
 * @returns JavaScript source declaring `injectStyle`.
 */
function injectStyleSource(id) {
  const tagId = `${id}/client.css`
  return [
    'function injectStyle(text) {',
    `  var tagId = ${JSON.stringify(tagId)};`,
    '  if (typeof document === \'undefined\') return;',
    '  var type = \'style[data-plugin-css="\' + tagId + \'"]\';',
    '  var existing = document.querySelector(type);',
    '  var tag = existing || document.createElement(\'style\');',
    `  tag.dataset.plugin = ${JSON.stringify(id)};`,
    '  tag.dataset.pluginCss = tagId;',
    '  tag.textContent = text;',
    '  if (!existing) document.head.appendChild(tag);',
    '}',
  ].join('\n')
}
