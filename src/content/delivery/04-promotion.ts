import type { Section } from '../types'

export const promotion: Section = {
  id: 'promotion',
  title: 'Environment promotion and run serialisation',
  scene: 'promotion',
  focus: 'plans',
  slide: `## Environment promotion

A change reaches production by passing through staging first: the same module version, then its own plan and approval.

### Promoting
- Staging applied and observed first
- Prod gets the same change in a later commit
- Each environment plans and approves separately
- Watch staging for a set time before promoting

### One run at a time per state
- CI queues runs per environment, not per branch
- \`-lock-timeout=5m\` waits for a lock instead of failing
- Concurrent merges reach apply one after another

### Promote versions, not copies
- Pin the module version per environment
- A copy-pasted environment drifts from its source
- A rollback is a new change, promoted the same way`,
  narration:
    "Production changes should not be the first time a change has ever been applied anywhere. Promotion means a change passes through staging first, gets applied there, is observed working, and only then moves to production. In this repository that is literally visible. Staging was changed and applied earlier. The promotion commit changes production's value, and both environments are planned. Staging reports no changes, because it already has the new port. Production shows the same change it is about to receive, for its own approval. Promotion also needs ordering. Two merges landing close together must not race to apply the same state, so CI queues runs per environment, not per branch, and each plan and apply waits for the state lock instead of failing immediately, which is what the five-minute lock timeout in the CI script does. Concurrent merges then reach apply one after another, each against the state the previous one left. One design note: promote versions, not copies. Each environment should pin a module version, so moving production forward is a one-line change. Copy-pasted environment directories slowly drift away from each other.",
}
