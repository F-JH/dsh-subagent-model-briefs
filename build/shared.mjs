/**
 * Build constants and manifest reads shared by both compile faces.
 *
 * The browser bundle must satisfy the DSH client module system's lazy-CJS
 * factory format: one classic script that registers a factory under the package
 * name. `packages/client/tsdown.client.ts` in the DSH repository produces that
 * wrapper with a tsdown `banner` and `footer`; this project reproduces the same
 * wrapper with esbuild so it builds without the repository.
 *
 * @module dsh-subagent-model-briefs/build/shared
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Directory holding this build entry point, and therefore this project.
 *
 * `URL#pathname` is not a file path: it percent-encodes spaces (`%20`), `#`, and
 * `?`, and keeps the leading slash of a Windows drive path. A checkout under a
 * directory with a space therefore produced a path that does not exist, and
 * the manifest read failed with `ENOENT` on the encoded name. `fileURLToPath`
 * decodes the URL into the platform's path syntax instead.
 */
export const PROJECT_ROOT = fileURLToPath(new URL('..', import.meta.url))

/**
 * The package manifest, read once from {@link PROJECT_ROOT}.
 * @returns parsed `package.json`.
 */
export function readManifest() {
  return JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf8'))
}

/**
 * Package name. It is also the client module id the browser registers and the
 * Loader row id the patch inserts, which is why it is read rather than restated
 * here: a rename in `package.json` must not leave three spellings behind.
 * @returns the manifest's `name` field.
 * @throws {Error} when the manifest declares no string `name`.
 */
export function packageName() {
  const { name } = readManifest()
  if (typeof name !== 'string' || name === '') {
    throw new Error('build: package.json declares no string "name"')
  }
  return name
}

/**
 * Browser module requests answered by the shell's module table.
 *
 * This is `PLATFORM_MODULES` from the DSH client shell plus the static library
 * subpaths a React component needs. Every entry must stay an `import` in the
 * bundle: the factory's `require` resolves it against the frozen module table,
 * and inlining any of them would hand the plugin a second copy of a library the
 * shell already holds (React hooks stop matching across the two copies).
 */
export const EXTERNAL_MODULES = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  'zod',
  '@tanstack/react-virtual',
  '@deepseek-ai/dsh-client-store',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-dockkit',
]

/**
 * Prefix of every harness package the running installation must own. A bundled
 * copy of one is a second `Service` class, a second projection registry, and a
 * second Cordis instance, so both faces keep them external.
 */
export const HARNESS_PREFIX = '@deepseek-ai/'

/**
 * Third-party libraries with shared runtime identity: their objects are handed
 * to framework code (`z.object`, schema identity checks), so the installation's
 * pinned copy must be the one the plugin calls.
 */
export const SHARED_THIRD_PARTY = ['zod']

/**
 * Emit the lazy-CJS registration wrapper around an esbuild CJS bundle.
 *
 * The shell executes a plugin bundle only to register its factory; the factory
 * runs once, at materialization. `module`/`exports` are declared inside the
 * factory so esbuild's CJS interop lands in a per-bundle scope rather than a
 * page global.
 * @param id - package name this bundle registers.
 * @param body - the CJS bundle as a JavaScript expression sequence.
 * @returns the classic script source the client module system serves.
 */
export function wrapFactory(id, body) {
  return [
    `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {`,
    'var module = { exports: {} }; var exports = module.exports;',
    body,
    'return module.exports; } });',
    '',
  ].join('\n')
}
