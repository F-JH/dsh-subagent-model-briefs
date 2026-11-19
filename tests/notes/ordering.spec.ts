/**
 * The snapshot reads the live subagent model selection setting, whatever row
 * order mounted this plugin relative to the setting's owner.
 */

import { Context } from '@deepseek-ai/cordis'
import AgentLoop from '@deepseek-ai/dsh-agent-loop'
import { mountAgentLoopTestDependencies } from '@deepseek-ai/dsh-agent-loop-testkit'
import { SessionId, pluginRecordOf } from '@deepseek-ai/dsh-session'
import type { SessionEvent } from '@deepseek-ai/dsh-session'
import SubagentModelSelectionConfig from '@deepseek-ai/dsh-tool-subagent/model-selection-settings'
import { describe, expect, it, onTestFinished } from 'vitest'
import * as notesPlugin from '../../src/index.ts'
import { MODEL_NOTES_RECORD } from '../../src/notes.ts'

const PRO = { provider: 'alt', model: 'pro' }
const NOTE = { ...PRO, capability: 'refactors', scenario: 'large changes' }

/** One Agent's recorded note snapshot, or undefined when the Session recorded none. */
function recordedNotes(events: readonly SessionEvent[]): unknown {
  for (const event of events) {
    const record = pluginRecordOf(event)
    if (record?.type === MODEL_NOTES_RECORD) return record.data
  }
  return undefined
}

describe('activation order', () => {
  it('records the routes the setting allows even when this plugin is mounted first', async () => {
    const ctx = new Context()
    onTestFinished(async () => { await ctx.fiber.dispose() })
    await mountAgentLoopTestDependencies(ctx, { workingDirectory: true })
    await ctx.plugin(AgentLoop, { agents: [] })
    const notes = ctx.plugin(notesPlugin, { modelNotes: [NOTE] })
    await ctx.plugin(SubagentModelSelectionConfig, { enabled: true, allowedModels: [PRO] })
    await notes

    const { agent } = await ctx.agents.create({ sessionId: SessionId('ordering') })
    expect(recordedNotes(agent.session.snapshotEvents())).toEqual({ models: [NOTE] })
  })

  it('records nothing while the setting is disabled', async () => {
    const ctx = new Context()
    onTestFinished(async () => { await ctx.fiber.dispose() })
    await mountAgentLoopTestDependencies(ctx, { workingDirectory: true })
    await ctx.plugin(AgentLoop, { agents: [] })
    await ctx.plugin(SubagentModelSelectionConfig, { enabled: false, allowedModels: [PRO] })
    await ctx.plugin(notesPlugin, { modelNotes: [NOTE] })

    const { agent } = await ctx.agents.create({ sessionId: SessionId('ordering-off') })
    expect(recordedNotes(agent.session.snapshotEvents())).toBeUndefined()
  })
})
