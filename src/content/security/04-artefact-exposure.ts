import type { Section } from '../types'

export const artefactExposure: Section = {
  id: 'artefact-exposure',
  title: 'State, saved plans, logs and artefacts',
  scene: 'artefact-exposure',
  focus: 'grep',
  slide: `## Where secrets persist

The same sensitive value, searched for after one saved plan and one apply.

### Found
- **State**: twice, in plain text
- **Plan file**: \`grep\` finds nothing because it is compressed
- But \`terraform show -json\` prints it in full

### Every artefact counts
- State, saved plans and plan JSON all hold secrets
- Debug logs: not here, but providers can log requests
- \`.terraform/\` keeps backend settings you passed

### After apply
- Delete saved plans; keep only the summary
- Rotate any secret that reached a log

### In pipelines
- Keep plans short-lived, in restricted storage
- Never enable \`TF_LOG\` in a shared CI log`,
  narration:
    "So where does a sensitive value actually end up? The scene on the left is the result of searching for one after a single plan with dash out and a single apply. The state contains it twice, in plain text, once in the input and once in the output. The saved plan file looks clean, but only because it is a compressed archive that grep cannot read. Ask Terraform for its JSON form and there is the password. The trace-level debug log from this run did not contain it, but that is a property of this provider and this run, not a guarantee. Providers can and do log request bodies. So treat every artefact as holding the secret. State, saved plans and plan JSON need the protection chapter four described. Pipeline artefacts deserve particular attention, because CI systems keep them, often for weeks, and often with broad read access. Keep saved plans short-lived and in restricted storage, delete them after apply, and never turn on debug logging in a shared CI log. And remember the dot terraform folder keeps backend settings you passed to init, so credentials never belong there either.",
}
