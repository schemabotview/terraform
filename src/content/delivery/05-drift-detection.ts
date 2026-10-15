import type { Section } from '../types'

export const driftDetection: Section = {
  id: 'drift-detection',
  title: 'Drift detection and scheduled review',
  scene: 'drift-detection',
  focus: 'results',
  slide: `## Scheduled drift detection

A nightly job plans every environment and never applies. Its exit codes say what it found.

### Exit codes with -detailed-exitcode
- \`0\` nothing to do, \`2\` changes found, \`1\` error
- A normal plan's \`2\` mixes two things: drift and unapplied merges
- \`-refresh-only\` isolates drift; run both

### Here
- Staging: no drift, but a merge never applied
- Prod: a file edited by hand, so drift

### Running it
- Daily is common; hourly for critical systems
- Plan-only role, and \`-lock=false\` so it blocks no one

### Reconcile on purpose
- Drift goes to the owner: keep the change, or revert it
- Pending changes go back through review and apply`,
  narration:
    "Drift happens between applies, so the only way to notice it promptly is to look on a schedule. A nightly job plans each environment and never applies anything. The useful flag is dash detailed exit code. With it, plan exits with zero when there is nothing to do, two when it found changes, and one when something went wrong, which is easy for a scheduler to act on. But a normal plan's two mixes together two very different situations, and this chapter's environments show both. Staging has no drift at all. It has a merged change that nobody applied. Production has real drift: someone edited the file by hand. Both return two. A refresh-only plan separates them, because it only compares state with reality and ignores the configuration, so the script runs both and reports two numbers. Staging: drift zero, pending two. Production: drift two. Each signal should go to someone. Drift goes to the owner, who decides, as chapter four described, whether the manual change should stay or be reverted. Pending changes go back through the normal path of review and controlled apply.",
}
