/**
 * Post-build verification of the emitted artifacts against the facts the DSH
 * Loader and client module system read before serving the plugin.
 *
 * The checks live in one module so the build gate and the artifact tests run the
 * same assertions: a bundle that registers under the wrong id, a manifest that
 * names a file the build did not write, or a declaration path with no file
 * behind it fails here instead of at a user's first `dsh` start.
 *
 * @module dsh-team-model-routing/build/verify
 */

import { existsSync } from 'node:fs'
import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { PROJECT_ROOT, packageName, readManifest, wrapFactory } from './shared.mjs'

/** Resolve a manifest-relative path inside the project. */
function projectFile(relative) {
  return join(PROJECT_ROOT, relative)
}

/**
 * Every path a package `exports`/`main` entry names must exist. The former
 * `types` entries pointed at `lib/types/**`, which this project never emits, so
 * an editor resolving `dsh-team-model-routing` got a broken reference.
 * @param manifest - parsed `package.json`.
 * @returns violations; empty when every declared target exists.
 */
function declaredTargets(manifest) {
  const declared = []
  if (typeof manifest.main === 'string') declared.push(manifest.main)
  for (const [subpath, target] of Object.entries(manifest.exports ?? {})) {
    if (typeof target === 'string') declared.push(target)
    else if (target !== null && typeof target === 'object') {
      for (const [condition, value] of Object.entries(target)) declared.push(`${subpath}:${condition} -> ${value}`)
    }
  }
  const violations = []
  for (const entry of declared) {
    const [label, path] = entry.includes(' -> ') ? entry.split(' -> ') : [entry, entry]
    if (path.includes('*')) continue
    if (!existsSync(projectFile(path))) violations.push(`package.json exports ${label} names missing ${path}`)
  }
  return violations
}

/**
 * Assert the emitted pair and the manifest that points at it.
 *
 * @param id - package name the manifest declares.
 * @returns human-readable checks that passed.
 * @throws {Error} naming the artifact and the fact that failed.
 */
export async function verifyArtifacts(id) {
  const manifest = readManifest()
  const checks = []

  const declared = declaredTargets(manifest)
  if (declared.length > 0) throw new Error(`build: ${declared.join('; ')}`)
  checks.push('every declared export names an emitted file')

  const hostEntry = projectFile(manifest.main ?? 'lib/index.js')
  await access(hostEntry)
  const hostSource = await readFile(hostEntry, 'utf8')
  // The Loader imports the Host half as an ESM plugin module.
  if (!/\bexport\s*\{/.test(hostSource) && !/\bexport\s+(?:function|const|class|default)\b/.test(hostSource)) {
    throw new Error(`build: ${manifest.main} has no ESM exports; the Loader expects a plugin module`)
  }
  checks.push(`${manifest.main}: ESM plugin module`)

  const clientExport = manifest.exports?.['./client']
  if (typeof clientExport !== 'string') {
    throw new Error('build: package.json exports["./client"] must be a string naming the browser bundle')
  }
  const clientSource = await readFile(projectFile(clientExport), 'utf8')
  // The registration statement must open the script: the shell executes a
  // bundle once and learns what to materialize only from this call.
  const preamble = wrapFactory(id, '').split('\n')[0]
  if (!clientSource.startsWith(preamble)) {
    throw new Error(
      `build: ${clientExport} does not open with the lazy-CJS registration for "${id}"; `
      + 'the client module system only materializes bundles that call '
      + '__ModuleLoader__.load({ id, factory }) at the top level',
    )
  }
  if (!clientSource.trimEnd().endsWith('return module.exports; } });')) {
    throw new Error(`build: ${clientExport} does not close the factory; the shell reads the exports it returns`)
  }
  checks.push(`${clientExport}: __ModuleLoader__.load factory for ${id}`)

  const clientDeclaration = manifest.dsh?.client
  if (clientDeclaration?.platform !== 'web') {
    throw new Error('build: package.json dsh.client.platform must be "web" for the browser half to be scanned')
  }
  if (manifest.dsh?.bundle?.patch === undefined) {
    throw new Error('build: package.json dsh.bundle.patch must name the patch that inserts the Loader row')
  }
  if (!existsSync(projectFile(manifest.dsh.bundle.patch))) {
    throw new Error(`build: dsh.bundle.patch names missing ${manifest.dsh.bundle.patch}`)
  }
  checks.push(`dsh.bundle.patch ${manifest.dsh.bundle.patch}, dsh.client.platform ${clientDeclaration.platform}`)

  const patch = await readFile(projectFile(manifest.dsh.bundle.patch), 'utf8')
  const rows = [...patch.matchAll(/^\s*-\s+id:\s*(\S+)\s*$/gm)].map(match => match[1])
  if (rows.length !== 1) {
    throw new Error(`build: ${manifest.dsh.bundle.patch} must insert exactly one Loader row, found ${rows.length}`)
  }
  // The row id is the Settings namespace the panel addresses; the module it
  // mounts is this package's bare specifier, which is what the client module
  // system attaches the browser half to.
  const specs = [...patch.matchAll(/^\s+name:\s*(\S+)\s*$/gm)].map(match => match[1])
  if (specs.length !== 1 || specs[0] !== packageName()) {
    throw new Error(
      `build: ${manifest.dsh.bundle.patch} must mount this package as "${packageName()}", found ${specs.join(', ') || 'none'}`,
    )
  }
  checks.push(`${manifest.dsh.bundle.patch}: row ${rows[0]} mounts ${specs[0]}`)

  return checks
}
