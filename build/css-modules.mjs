/**
 * esbuild plugin implementing the two source-level features the client half
 * relies on and that esbuild does not provide on its own:
 *
 * - CSS Modules (`*.module.css`). esbuild's own CSS Modules support needs an
 *   output path it owns, which a single-file factory bundle does not have. This
 *   plugin transforms the stylesheet with esbuild's CSS loader, scopes every
 *   class name, and rewrites the JavaScript import into two module exports: the
 *   default class map and the scoped stylesheet text. Only stylesheets the
 *   bundle reaches are emitted.
 * - Stylesheet text (`*.css?inline`), for callers that want the sheet without a
 *   class map.
 *
 * Scoping keeps the local name and adds a stable hash of the stylesheet path:
 * `heading` in `ModelNotesSection.module.css` becomes
 * `heading_<hash>`. Stable means two builds of the same sources agree, and the
 * per-file salt keeps names collision-free across stylesheets.
 *
 * The stylesheet is compiled as a `.css?inline` copy renamed to a neutral
 * extension, because esbuild treats a path ending in `.module.css` as its own
 * CSS Modules format and rewrites every class token to `<basename>_<local>`
 * before this plugin sees the text. That rewrite is invisible in the emitted
 * CSS (it still looks like a class selector) but the JavaScript class map this
 * plugin builds from the same text would then key on the rewritten names, so
 * `css.heading` resolved to `undefined` and the component rendered with no
 * classes while a full stylesheet sat unused in the `<style>` tag. Compiling
 * under `.txt` keeps esbuild in plain CSS mode, leaving this plugin the only
 * party that scopes names and making the map and the selectors agree by
 * construction.
 *
 * @module dsh-subagent-model-briefs/build/css-modules
 */

import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, relative, resolve } from 'node:path'
import { build } from 'esbuild'

const MODULE_SUFFIX = '.module.css'
const INLINE_SUFFIX = '.css?inline'

/**
 * Class-name pattern in a compiled stylesheet. esbuild escapes selectors rather
 * than renaming them, so every class token appears verbatim in the output.
 */
const CLASS_TOKEN = /\.(-?[_a-zA-Z][\w-]*)/g

/**
 * Hash salt for one stylesheet, derived from its path relative to the project.
 * @param file - absolute stylesheet path.
 * @param root - project root the salted path is relative to.
 * @returns eight hexadecimal characters.
 */
function saltFor(file, root) {
  return createHash('sha256').update(relative(root, file).split('\\').join('/')).digest('hex').slice(0, 8)
}

/**
 * Compile one stylesheet with esbuild's CSS loader and scope its class names.
 *
 * The source is read here and handed to esbuild as `stdin` under a neutral
 * extension: esbuild's `.module.css` loader rewrites class tokens itself, and
 * the map below is built from the same text, so the two rewrites would have to
 * agree exactly. Compiling as plain CSS leaves the tokens untouched and lets
 * {@link saltFor} own scoping on both sides.
 * @param file - absolute stylesheet path.
 * @param root - project root, used for the stable salt.
 * @returns the scoped CSS text and its local-name → scoped-name map.
 * @throws {Error} when the stylesheet does not compile.
 */
async function compileStylesheet(file, root) {
  const source = await readFile(file, 'utf8')
  const result = await build({
    stdin: {
      contents: source,
      loader: 'css',
      resolveDir: dirname(file),
      sourcefile: file,
    },
    bundle: false,
    write: false,
    logLevel: 'silent',
  })
  if (result.errors.length > 0) {
    throw new Error(`${file}: ${result.errors.map(error => error.text).join('; ')}`)
  }
  const [output] = result.outputFiles
  if (output === undefined) throw new Error(`${file}: esbuild produced no CSS output`)

  const salt = saltFor(file, root)
  const map = new Map()
  const scoped = output.text.replace(CLASS_TOKEN, (_match, local) => {
    if (!map.has(local)) map.set(local, `${local}_${salt}`)
    return `.${map.get(local)}`
  })
  return { css: scoped, classes: Object.fromEntries(map) }
}

/**
 * @param options - the containing project root (the salt base) and an optional
 *   collector that receives each reachable stylesheet's scoped text once.
 * @returns an esbuild plugin.
 */
export function cssModules({ root, stylesheets }) {
  const compiled = new Map()

  /**
   * Compile one stylesheet once per build.
   *
   * A `*.module.css` import yields the class map as its default export and
   * publishes its scoped text to the collector once; a `*.css?inline` import
   * yields only the text and publishes nothing, so a bundle that reads one
   * stylesheet both ways still injects it a single time.
   * @param file - absolute stylesheet path.
   * @param inline - whether the import asked for stylesheet text.
   * @returns module source text for the resolver.
   */
  async function moduleSource(file, inline) {
    let entry = compiled.get(file)
    if (entry === undefined) {
      entry = await compileStylesheet(file, root)
      compiled.set(file, entry)
      stylesheets?.push(entry.css)
    }
    if (inline) return `export default ${JSON.stringify(entry.css)};`
    return `export default ${JSON.stringify(entry.classes)};`
  }

  return {
    name: 'dsh-css-modules',
    setup(build) {
      build.onResolve({ filter: /\.css(\?inline)?$/ }, (args) => {
        const inline = args.path.endsWith(INLINE_SUFFIX)
        const specifier = inline ? args.path.slice(0, -'?inline'.length) : args.path
        const file = resolve(args.resolveDir, specifier)
        return { path: file, namespace: inline ? 'dsh-css-inline' : 'dsh-css-module' }
      })

      for (const [namespace, inline] of [['dsh-css-module', false], ['dsh-css-inline', true]]) {
        build.onLoad({ filter: /.*/, namespace }, async (args) => ({
          contents: await moduleSource(args.path, inline),
          // The stylesheet rides in the bundle, so its text is already shipped.
          loader: 'js',
          resolveDir: dirname(args.path),
        }))
      }
    },
  }
}
