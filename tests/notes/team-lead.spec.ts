/** Team Lead operating guidance and the Agents that receive it. */

import { describe, expect, it } from 'vitest'
import type { Agent } from '@deepseek-ai/dsh-agent'
import type { AssembleContext } from '@deepseek-ai/dsh-system-prompt'
import {
  TEAM_LEAD_GUIDANCE, TEAM_LEAD_GUIDANCE_CONTEXT, teamLeadGuidanceContext, teamModeOn,
} from '../../src/team-lead.ts'

/** An Agent whose Session header records the given origin. */
function agent(origin?: 'subagent'): Agent {
  return { session: { id: origin === undefined ? 'lead' : 'child', header: { origin } } } as never as Agent
}

const text = (options: { agent?: Agent; teamMode?: boolean }) => {
  const context = teamLeadGuidanceContext({ order: 122, teamModeOf: () => options.teamMode ?? true })
  expect(context).toMatchObject({ name: TEAM_LEAD_GUIDANCE_CONTEXT, order: 122, interpolate: false })
  const assembly: AssembleContext = options.agent === undefined ? {} : { agent: options.agent }
  return typeof context.text === 'function' ? context.text(assembly) : context.text
}

describe('teamLeadGuidanceContext', () => {
  it('gives the guidance to the root while Agent Teams is on', () => {
    expect(text({ agent: agent(), teamMode: true })).toBe(TEAM_LEAD_GUIDANCE)
  })

  it('gives nothing while Agent Teams is off', () => {
    expect(text({ agent: agent(), teamMode: false })).toBe('')
  })

  it('gives nothing to a teammate', () => {
    expect(text({ agent: agent('subagent'), teamMode: true })).toBe('')
  })

  it('gives nothing outside an Agent', () => {
    expect(text({ teamMode: true })).toBe('')
  })
})

describe('teamModeOn', () => {
  /** Minimal context providing the given Agent Teams stand-in and a silent logger. */
  const contextWith = (teams: unknown) => ({
    get: () => teams,
    logger: { debug: () => {} },
  }) as never as Parameters<typeof teamModeOn>[0]

  it('reads the switch from the Agent Teams service', () => {
    expect(teamModeOn(contextWith({ isEnabled: () => true }), agent())).toBe(true)
    expect(teamModeOn(contextWith({ isEnabled: () => false }), agent())).toBe(false)
  })

  it('reports off when Agent Teams is not mounted', () => {
    expect(teamModeOn(contextWith(undefined), agent())).toBe(false)
  })

  it('reports off when the Agent has no live tree root', () => {
    const unauthorized = { isEnabled: () => { throw new Error('agent has no active runtime owner') } }
    expect(teamModeOn(contextWith(unauthorized), agent())).toBe(false)
  })
})

describe('TEAM_LEAD_GUIDANCE', () => {
  it('states the cost rule, the severity split, and the stopping rule', () => {
    expect(TEAM_LEAD_GUIDANCE).toContain('most expensive model')
    expect(TEAM_LEAD_GUIDANCE).toContain('A blocking finding breaks the stated goal')
    expect(TEAM_LEAD_GUIDANCE).toContain('most findings are small')
    expect(TEAM_LEAD_GUIDANCE).toContain('at most one fix round')
  })
})
