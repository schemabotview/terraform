import type { Section } from '../types'

export const auditProvenance: Section = {
  id: 'audit-provenance',
  title: 'Audit evidence, provenance and module distribution',
  scene: 'audit-provenance',
  focus: 'record',
  slide: `## Audit evidence and provenance

Months later, someone will ask what changed, who approved it and how it was built. Record the answers at apply time.

### A record per apply
- **Who**: the approver and the identity that ran it
- **What**: the commit and a hash of the applied plan
- **With what**: CLI and provider versions
- **Result**: the apply log and outputs

### Store it apart
- Away from the pipeline that wrote it
- Without secrets: summaries, not plan files
- Linked to the pull request that approved it
- Kept as long as the systems they describe

### Distributing modules
- Tag releases; callers pin the tag
- A changelog says what each version changes`,
  narration:
    "Sooner or later someone will ask about a change that happened months ago. What exactly changed? Who approved it? Which code and which tools produced it? The answers are cheap to record at apply time and nearly impossible to reconstruct later. On the left is a provenance record for the production apply in this chapter, assembled from real commands: the Git commit, the Terraform version, the provider version from the lock file, a hash of the exact plan file that was applied, and a summary of the actions in it. Add who approved and which identity ran it, plus the apply log and outputs, and you can answer the auditor's questions. Store these records somewhere the pipeline itself cannot rewrite, so the evidence survives even if the pipeline is compromised. And keep secrets out of them: store summaries and hashes, not the plan files themselves, which as chapter eight showed contain secret values. Distributing modules belongs to the same story. Tag each release, have callers pin the tag, and keep a changelog that says what each version changes, so an upgrade can be reviewed as carefully as any other change.",
}
