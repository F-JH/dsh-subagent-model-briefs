#!/usr/bin/env node
/**
 * Build entry point: `npm run build`.
 *
 * Emits both artifacts the DSH Loader and client module system consume —
 * `lib/index.js` (Host plugin) and `lib/client.js` (browser lazy-CJS factory) —
 * then runs {@link verifyArtifacts} against what the runtime reads.
 *
 * `prepare` calls this entry point, which is what makes a GitHub install
 * produce a loadable package. pnpm refuses a git dependency's lifecycle scripts
 * until the installing user allowlists it, so that install announces itself as
 * an approval request rather than running silently; the README's install
 * section owns the exact commands and the permission the approval grants.
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
