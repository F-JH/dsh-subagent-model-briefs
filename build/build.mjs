#!/usr/bin/env node
/**
 * Build entry point: `npm run build`.
 *
 * Emits both artifacts the DSH Loader and client module system consume —
 * `lib/index.js` (Host plugin) and `lib/client.js` (browser lazy-CJS factory) —
 * then runs {@link verifyArtifacts} against what the runtime reads.
 *
 * Run this before committing a source change: `lib/` is committed so a git
 * install needs no lifecycle script, and `npm test` fails when the committed
 * artifacts no longer match `src/`. `prepack` calls this entry point too, so a
 * published tarball is always built from the sources it ships with.
 *
 * @module dsh-subagent-model-briefs/build/build
 */

import { buildClient } from './client.mjs'
import { buildHost } from './host.mjs'
import { PROJECT_ROOT, packageName } from './shared.mjs'
import { verifyArtifacts } from './verify.mjs'

async function main() {
  const id = packageName()
  process.stdout.write(`building ${id}\n`)

  const host = await buildHost(['index.ts'])
  for (const artifact of host) {
    process.stdout.write(`  host    ${artifact.path.replace(PROJECT_ROOT, '')} ${artifact.bytes} B\n`)
  }

  const client = await buildClient()
  process.stdout.write(
    `  client  ${client.path.replace(PROJECT_ROOT, '')} ${client.bytes} B${client.stylesheets > 0 ? ' (with stylesheet)' : ''}\n`,
  )

  for (const check of await verifyArtifacts(id)) process.stdout.write(`  ok      ${check}\n`)
  process.stdout.write('build complete\n')
}

await main()
