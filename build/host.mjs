/**
 * Host (Node) bundle compiler: `src/index.ts` → `lib/index.js`.
 *
 * The Host half is an ESM plugin the Loader imports from `lib/index.js`. Its
 * dependencies on DSH stay imports: the harness modules must be the running
 * installation's single instances, so bundling them would create a second copy
 * of the framework. Third-party libraries with no shared runtime identity are
 * inlined, which keeps the installed package free of a runtime dependency tree.
 *
 * No declaration is emitted here. Types are a development concern
 * (`npm run typecheck`); the published Host artifact is JavaScript with an
 * inline map. The package therefore declares no `types` entry: publishing one
 * would name a file this build never writes.
 *
 * @module dsh-subagent-model-briefs/build/host
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { build } from 'esbuild'
import { HARNESS_PREFIX, PROJECT_ROOT, SHARED_THIRD_PARTY, readManifest } from './shared.mjs'

/**
 * Externals of the Host bundle.
 *
 * Every `@deepseek-ai/` specifier stays an import, whether or not this package
 * declares it: these are the running installation's framework and harness
 * modules, whose identity the plugin must share. The `*` pattern also covers
 * subpath entries such as `@deepseek-ai/dsh-session/types`. Only third-party
 * libraries with no shared runtime identity inline.
 * @returns esbuild `external` patterns.
 */
function hostExternals() {
  return [
    HARNESS_PREFIX,
    `${HARNESS_PREFIX}*`,
    ...SHARED_THIRD_PARTY,
    ...SHARED_THIRD_PARTY.map(name => `${name}/*`),
    'node:*',
  ]
}

/**
 * Compile the Host half.
 *
 * @param entries - source entry modules, relative to `src/`; the first is the
 *   package entry, and every one emits `lib/<basename>.js`.
 * @returns the emitted paths.
 * @throws {Error} when esbuild reports a compile error.
 */
export async function buildHost(entries = ['index.ts']) {
  const { version, name } = readManifest()
  const outputs = []
  for (const entry of entries) {
    const source = join(PROJECT_ROOT, 'src', entry)
    const emitted = join(PROJECT_ROOT, 'lib', entry.replace(/\.ts$/, '.js'))
    const result = await build({
      entryPoints: [source],
      bundle: true,
      write: false,
      format: 'esm',
      platform: 'node',
      target: 'node24',
      sourcemap: 'inline',
      sourcesContent: true,
      legalComments: 'none',
      external: hostExternals(),
      logLevel: 'silent',
      banner: { js: `/* ${name} v${version} — Host plugin */` },
    })
    if (result.errors.length > 0) {
      throw new Error(`build:host: ${result.errors.map(error => error.text).join('\n')}`)
    }
    for (const warning of result.warnings) {
      process.stderr.write(`build:host: warning: ${warning.text}\n`)
    }
    const [artifact] = result.outputFiles
    if (artifact === undefined) throw new Error(`build:host: esbuild produced no output for ${entry}`)
    await mkdir(dirname(emitted), { recursive: true })
    await writeFile(emitted, artifact.text, 'utf8')
    outputs.push({ path: emitted, bytes: (await readFile(emitted)).byteLength })
  }
  return outputs
}
