/**
 * Build-tooling tests: the parts of `build/` whose bugs are silent.
 *
 * `PROJECT_ROOT` is the one under scrutiny. The compiler reads it from
 * `import.meta.url`, and `URL#pathname` percent-encodes anything outside
 * RFC 3986's path set, so a checkout in a directory with a space used to yield
 * `/…/my%20checkout/`, a path `readFileSync` cannot open. These tests pin the
 * decode by loading `build/shared.mjs` from a copy placed in such a directory.
 *
 * @module dsh-team-model-routing/build/tooling.test
 */

import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))

/**
 * Copy `build/shared.mjs` into a synthetic project whose directory name holds a
 * space and a percent sign, then read the manifest through it.
 * @returns the root the module computed, its manifest read, and the directory.
 */
async function rootUnderSuffixedDirectory() {
  // A space is what `URL#pathname` rewrites to `%20`; a literal `%25` inside the
  // name catches a decode applied twice.
  const prefix = ['dsh-tmr', 'space', '%25', ''].join(' ')
  const dir = mkdtempSync(join(tmpdir(), prefix))
  const realDir = realpathSync(dir)
  try {
    const build = join(dir, 'build')
    mkdirSync(build)
    cpSync(join(projectRoot, 'build/shared.mjs'), join(build, 'shared.mjs'))
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'probe', version: '0.0.0' }))
    const module = await import(`${pathToFileURL(join(build, 'shared.mjs')).href}?probe=${Date.now()}`)
    return { root: module.PROJECT_ROOT, manifest: module.readManifest(), realDir }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

test('PROJECT_ROOT decodes a path containing spaces and percent signs', async () => {
  const { root, manifest, realDir } = await rootUnderSuffixedDirectory()
  assert.ok(!root.includes('%20'), `PROJECT_ROOT must not keep URL escapes: ${root}`)
  assert.ok(root.includes(' '), 'the space survives decoding')
  // macOS reports `/var/...` while the URL carries `/private/var/...`; the
  // harness already resolved the latter, so compare decoded absolute paths.
  assert.equal(root.replace(/[/\\]$/, ''), realDir)
  assert.deepEqual(manifest, { name: 'probe', version: '0.0.0' })
})

test('the package resolves its own root from the script location, not the working directory', () => {
  // A caller may run `node build/build.mjs` from anywhere; every emitted path is
  // absolute and derived from the module URL, and never from `process.cwd()`.
  const shared = readFileSync(join(projectRoot, 'build/shared.mjs'), 'utf8')
  assert.match(shared, /PROJECT_ROOT = fileURLToPath\(new URL\('\.\.', import\.meta\.url\)\)/)
  assert.doesNotMatch(shared, /import\.meta\.url\)\.pathname/)
  for (const module of ['build.mjs', 'client.mjs', 'host.mjs', 'css-modules.mjs', 'verify.mjs']) {
    assert.doesNotMatch(readFileSync(join(projectRoot, 'build', module), 'utf8'), /process\.cwd\(\)/)
  }
})
