import type { Section } from '../types'

export const partialApply: Section = {
  id: 'partial-apply',
  title: 'Saved plans and partial applies',
  scene: 'partial-apply',
  focus: 'kept',
  slide: `## When apply fails partway

\`apply\` is **not a transaction**. When one operation fails, what already succeeded stays.

### Partway through
- \`web\` and \`db\` were created; \`migrate\` failed
- Nothing rolled back: both files exist, and both are in state
- A failed provisioner leaves its resource **tainted**

### Recovering
- Fix the cause, then plan again from what now exists
- The tainted resource is replaced on the next apply
- Re-running without a fix repeats the failure

### Saved plans protect the review
- \`apply tfplan\` carries out exactly the reviewed plan
- If state changed since, Terraform refuses: the plan is **stale**
- A plan file can hold sensitive values: protect it like state`,
  narration:
    "Let's finish the chapter with the case every plan is silent about: what happens when apply fails partway through. Here the plan was three resources: the web file, the database file, and the migration. Both files were created. Then the migration script failed, and apply stopped with an error. Now the important part. Nothing was rolled back. Terraform apply is not a transaction. The two files exist, they are recorded in state, and they stay. Terraform cannot undo real-world changes in general, so it does not try. The resource that failed is marked tainted, which means the next plan will replace it rather than trust it. So recovery means: understand and fix the cause, then plan again. That new plan starts from what actually exists now, not from what you hoped would exist. Saved plans play a part here too. Applying a saved plan file carries out exactly the actions that were reviewed. But if anything changed the state after the plan was made, including another apply, the saved plan no longer describes reality, and Terraform refuses to apply it, as the card on the right shows. Reviewed intent stays tied to the state it was reviewed against. Chapter four is about protecting that state.",
}
