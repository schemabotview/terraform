import type { Section } from '../types'

export const interruptedApply: Section = {
  id: 'interrupted-apply',
  title: 'Interrupted and partial applies',
  scene: 'interrupted-apply',
  focus: 'state',
  slide: `## Interrupted applies

Ctrl-C asks Terraform to stop **gracefully**. It finishes recording what it can, then halts. The real world may be halfway through something.

### What happened here
- \`web\` was created and recorded
- The migration was killed six seconds into twenty
- \`api\` was never started

### Observe first
- \`state list\`, the real objects, then a fresh \`plan\`
- The plan proposes replacing the **tainted** migration

### What only you can answer
- Did the half-run migration change anything?
- Is it safe to run again? Only if it is idempotent
- A second Ctrl-C kills Terraform: avoid it

### Reconcile
- Finish or undo by hand, then plan to confirm
- Write down what happened for the next person`,
  narration:
    "Chapter three showed an apply that failed. This is an apply that was interrupted, by someone pressing control C in the middle of a twenty-second database migration. Terraform does not just stop. It says interrupt received, asks you to wait, and shuts down gracefully, finishing what it can record. The web config file had already been created, and it is in state. The migration was killed six seconds in. The API file was never started. Recovery begins with observation, not action. List what state recorded, look at the real objects, and make a fresh plan. Here the plan proposes creating the API file and replacing the migration, which is marked tainted because it did not finish. But notice what the plan cannot tell you. A migration that was killed halfway may already have changed the database schema, or part of it. Running it again is only safe if it is written to be idempotent, so that a second run finishes the work instead of failing or doing it twice. That is a question about your system, not about Terraform. One more thing: a second control C kills Terraform outright, without recording anything. Avoid it.",
}
