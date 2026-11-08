/**
 * Vitest configuration for this plugin.
 *
 * Two resolution modes, chosen by one environment variable, because the client
 * packages' published entries are **not importable JavaScript**:
 * the `./client` subpath of a DSH client package resolves to `lib/client.js`, which is a
 * lazy-CJS registration script (`window.__ModuleLoader__.load(...)`), not an
 * ES module. Only the DSH source facade — `tsconfig.base.json`'s `paths`, which
 * sends every `@deepseek-ai/*` specifier to that package's `src` entrypoint —
 * gives the specs a module they can import.
 *
 * - `DSH_SOURCE_ROOT=/path/to/deepseek-harness` (required for `tests/**`):
 *   resolve every harness package through that checkout's `tsconfig.base.json`,
 *   exactly as the repository's own lanes do. The plugin's own `src/` still
 *   builds against the installed package *types*, so a checkout is required
 *   only to *execute* the specs.
 * - Unset: the paths-free build and artifact tests (`npm test`) run; the specs
 *   cannot, and this configuration fails with the reason instead of a stack
 *   trace from a bundle that was never importable.
 *
 * `tests/**\/*.spec.tsx` runs under jsdom; every other spec runs under node.
 *
 * React resolves to this package's copies (see the alias below), because the
 * checkout's store holds a second react that the renderer's `use-sync-external-store`
 * shim would otherwise require.
 *
 * @module dsh-team-model-routing/vitest.config
 */

import { existsSync, realpathSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const here = dirname(fileURLToPath(import.meta.url))

/** Checkout whose `tsconfig.base.json` maps harness specifiers to `src/`. */
const configuredRoot = process.env.DSH_SOURCE_ROOT

if (configuredRoot === undefined || configuredRoot === '' || !existsSync(resolve(configuredRoot, 'tsconfig.base.json'))) {
  throw new Error(
    'vitest.config: set DSH_SOURCE_ROOT to a DeepSeek Harness checkout. The specs import '
    + '@deepseek-ai/dsh-client-*/client, whose published entry is a lazy-CJS registration script rather than an '
    + 'ES module, so they run against that checkout\'s src facade. `npm test` (build artifacts and tooling) needs '
    + 'no checkout.',
  )
}

const sourceRoot = realpathSync(configuredRoot)
const shared = await import(resolve(sourceRoot, 'vitest.shared.ts'))

// React is pinned to THIS package's copies, not the checkout's. The renderer's
// published source imports `use-sync-external-store/shim/with-selector`, a CJS
// module whose own `require('react')` Node resolves from the store the *shim*
// lives in — the checkout's store — while `@testing-library/react` and these
// specs resolve react/react-dom from this package's store. Two react copies
// mean the shim reads a null dispatcher (`Cannot read properties of null
// (reading 'useRef')`). Aliasing the shim into this package's store, where it
// requires the same react, keeps one identity for react, jsx-runtime, react-dom
// and the shim.
const requireFromPackage = createRequire(resolve(here, 'package.json'))
const reactAlias = (specifier: string): string => requireFromPackage.resolve(specifier)

export default defineConfig({
  resolve: {
    alias: [
      { find: /^react$/, replacement: reactAlias('react') },
      { find: /^react\/jsx-runtime$/, replacement: reactAlias('react/jsx-runtime') },
      { find: /^react\/jsx-dev-runtime$/, replacement: reactAlias('react/jsx-dev-runtime') },
      { find: /^react-dom$/, replacement: reactAlias('react-dom') },
      { find: /^react-dom\/client$/, replacement: reactAlias('react-dom/client') },
      {
        find: /^use-sync-external-store\/shim\/with-selector$/,
        replacement: reactAlias('use-sync-external-store/shim/with-selector'),
      },
    ],
  },
  plugins: [
    tsconfigPaths({ root: sourceRoot, projects: [resolve(sourceRoot, 'tsconfig.base.json')] }),
    shared.standardDecoratorPlugin(),
  ],
  test: {
    root: here,
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    exclude: ['tests/integration/**'],
    pool: 'forks',
    execArgv: shared.vitestExecArgv,
    environment: 'node',
    environmentMatchGlobs: [['tests/**/*.spec.tsx', 'jsdom']],
    testTimeout: 20_000,
    hookTimeout: 20_000,
  },
})
