/**
 * Model-visible operating guidance for the Team Lead.
 *
 * The guidance is an ordinary scoped runtime context (`systemPrompt.context()`),
 * rendered at each assembly directly after the subagent model notes, so the
 * agent loop records it in the durable request context beside them. It renders
 * only while the root Session's Agent Teams switch is on: a conversation running
 * without Agent Teams never sees it, and it never reaches a teammate.
 *
 * @module dsh-subagent-model-briefs/team-lead
 */

import type { Context } from '@deepseek-ai/cordis'
import type { Agent } from '@deepseek-ai/dsh-agent'
import type { PromptContext } from '@deepseek-ai/dsh-system-prompt'

/** Name of the runtime context this plugin contributes. */
export const TEAM_LEAD_GUIDANCE_CONTEXT = 'team-model-routing:team-lead-guidance'

/**
 * Model-facing operating guidance for the Team Lead: spend the expensive route
 * on orchestration, judge each result once, act only on findings that change
 * what the user receives, and stop instead of re-auditing a finished task.
 */
export const TEAM_LEAD_GUIDANCE = `Team Lead operating guidance. Your steps run on the most expensive model in this team, so spend them on splitting the work, choosing owners, and judging what comes back. Delegate the work itself, including small and mechanical edits, and keep direct tool use to what a decision needs. When nothing remains but waiting for teammates, end the turn.

Judge each result once. Read a teammate's report and decide whether the delivered result satisfies the user's request. Do not repeat the teammate's checks, and do not start a second review pass over work you already accepted.

Weigh every finding before acting on it, and say which kind it is. A blocking finding breaks the stated goal or something the user receives, and it earns one fix. A small finding is style, naming, a hypothetical edge case, an unrelated improvement, or extra hardening: it changes nothing the user receives, so it earns no fix — record it as a known limitation in the final answer, or drop it. Reviewers and teammates report both kinds with equal confidence, so the classification is yours to make, and most findings are small.

Converge. Route a blocking finding's fix to the teammate who already owns that work rather than opening a new one, and give one defect at most one fix round. When the round lands, confirm that defect and stop: do not chain find, then fix, then a fresh review of the fix. If you cannot state what ends this task, end it now.`

/** The one operation this plugin reads from the Agent Teams service. */
interface TeamModeSource {
  /**
   * @param caller - exact live root or descendant.
   * @returns whether that tree's Agent Teams switch is on.
   */
  isEnabled(caller: Agent): boolean
}

/**
 * Whether one Agent's tree runs with Agent Teams on.
 * @param ctx - plugin context, read for the optional Team service.
 * @param agent - the assembling Agent.
 * @returns false when Agent Teams is not mounted, or when the Agent has no live
 *   tree root that owns a selection.
 */
export function teamModeOn(ctx: Context, agent: Agent): boolean {
  const teams: TeamModeSource | undefined = ctx.get('agentTeams')
  if (teams === undefined) return false
  try {
    return teams.isEnabled(agent)
  } catch (error: unknown) {
    // An independently resumed child has no live root owning a Team selection.
    ctx.logger.debug(`team lead guidance: Agent Teams mode of "${agent.id}" is unavailable: ${String(error)}`)
    return false
  }
}

/** Readers one context registration uses at each assembly. */
export interface TeamLeadGuidanceDeps {
  /**
   * Whether one Agent's tree runs with Agent Teams on.
   * @param agent - the assembling Agent.
   * @returns true while that tree's saved Team selection is enabled.
   */
  readonly teamModeOf: (agent: Agent) => boolean
  /** Context order, placed after the subagent model notes. */
  readonly order: number
}

/**
 * Build the runtime context registration.
 * @param deps - Team mode and order readers.
 * @returns the context whose text is empty for a teammate and for a tree whose
 *   Agent Teams switch is off.
 */
export function teamLeadGuidanceContext(deps: TeamLeadGuidanceDeps): PromptContext {
  return {
    name: TEAM_LEAD_GUIDANCE_CONTEXT,
    order: deps.order,
    interpolate: false,
    text: ({ agent }) => {
      // A teammate receives the official team policy instead; this budget belongs to the Lead alone.
      if (agent === undefined || agent.session.header.origin === 'subagent') return ''
      return deps.teamModeOf(agent) ? TEAM_LEAD_GUIDANCE : ''
    },
  }
}
