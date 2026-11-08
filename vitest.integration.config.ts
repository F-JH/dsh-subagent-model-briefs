/**
 * Lane for the plugin's real-composition integration specs.
 *
 * These specs boot a test-only `cordis.yml` through the Loader with real harness
 * packages — the agent loop, JSONL session persistence, the subagent runtime
 * and tools — and they import test fixtures from those packages by
 * repository-relative path (`packages/…/tests/…`). That source tree is
 * not published to npm, so this lane requires the DSH checkout and is therefore
 * a **repository-only** lane, not part of a standalone install's `npm test`.
 *
 * Point `DSH_SOURCE_ROOT` at the checkout root; nothing here guesses a parent
 * directory, because a standalone clone has none of these packages as siblings.
 *
 * @module dsh-team-model-routing/vitest.integration.config
 */

import { existsSync, realpathSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const here = dirname(fileURLToPath(import.meta.url))

const configuredRoot = process.env.DSH_SOURCE_ROOT

if (configuredRoot === undefined || configuredRoot === '' || !existsSync(resolve(configuredRoot, 'tsconfig.base.json'))) {
  throw new Error(
    'vitest.integration.config: set DSH_SOURCE_ROOT to a DeepSeek Harness checkout to run the integration lane '
    + '(its specs import package test fixtures that are not published); the unit lane needs no checkout',
  )
}

const sourceRoot = realpathSync(configuredRoot)
const shared = await import(resolve(sourceRoot, 'vitest.shared.ts'))

export default defineConfig({
  plugins: [
    tsconfigPaths({ root: sourceRoot, projects: [resolve(sourceRoot, 'tsconfig.base.json')] }),
    shared.standardDecoratorPlugin(),
  ],
  test: {
    // The fixtures are addressed by repository-relative path, so the walk-up
    // roots at the checkout rather than at this package.
    root: sourceRoot,
    execArgv: shared.vitestExecArgv,
    include: ['plugins/dsh-team-model-routing/tests/integration/**/*.spec.ts'],
    pool: 'forks',
    logHeapUsage: false,
  },
})
