/** The snapshot reads the official authorization even when this plugin is mounted first. */

import { Context } from '@deepseek-ai/cordis'
import AgentLoop from '@deepseek-ai/dsh-agent-loop'
import { mountAgentLoopTestDependencies } from '@deepseek-ai/dsh-agent-loop-testkit'
import { SessionId, pluginRecordOf } from '@deepseek-ai/dsh-session'
import SubagentModelSelectionConfig from '@deepseek-ai/dsh-tool-subagent/model-selection-settings'
import { describe, expect, it, onTestFinished } from 'vitest'
import * as notesPlugin from '../../src/index.ts'
import { MODEL_NOTES_RECORD } from '../../src/notes.ts'

const PRO = { provider: 'alt', model: 'pro' }
const NOTE = { ...PRO, capability: 'refactors', scenario: 'large changes' }

describe('activation order', () => {
  it('waits for the official authorization owner, so its policy event precedes the snapshot', async () => {
    const ctx = new Context()
    onTestFinished(async () => { await ctx.fiber.dispose() })
    await mountAgentLoopTestDependencies(ctx, { workingDirectory: true })
    await ctx.plugin(AgentLoop, { agents: [] })
    const notes = ctx.plugin(notesPlugin, { modelNotes: [NOTE] })
    await ctx.plugin(SubagentModelSelectionConfig, { enabled: true, allowedModels: [PRO] })
    await notes

    const { agent } = await ctx.agents.create({ sessionId: SessionId('ordering') })

    const events = agent.session.snapshotEvents()
    const policy = events.findIndex(event => event.type === 'subagent/model-selection-policy')
    const record = events.findIndex(event => pluginRecordOf(event)?.type === MODEL_NOTES_RECORD)
    expect(policy).toBeGreaterThanOrEqual(0)
    expect(record).toBeGreaterThan(policy)
    expect(events[record]?.data).toEqual({ models: [NOTE] })
  })
})
