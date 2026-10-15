import type { Section } from '../types'

export const sensitiveValues: Section = {
  id: 'sensitive-values',
  title: 'Sensitive values, redaction and disclosure',
  scene: 'sensitive-values',
  focus: 'plan',
  slide: `## Sensitive values

\`sensitive = true\` changes how Terraform **displays** a value. It does not change where the value is stored.

### What it does
- Plans and output show \`(sensitive value)\`
- Anything derived from it is sensitive too
- Root outputs built from it must say \`sensitive = true\`

### What it does not do
- Encrypt the value, or keep it out of state
- Hide it from \`terraform output -json\` or plan JSON

### Marking values yourself
- \`sensitive()\` marks any expression
- Providers already mark some attributes

### Disclosure is explicit
- \`nonsensitive()\` removes the mark, on purpose
- Review every use: it is how a secret ends up in a log`,
  narration:
    "Chapter two showed a sensitive output being redacted. This chapter is about the limits of that. Marking a variable sensitive changes how Terraform displays it. In the plan on the left, the password appears as sensitive value, while the user name beside it is shown in full. The marking also spreads: anything computed from a sensitive value is treated as sensitive too, and a root output built from one must itself be marked sensitive, or Terraform refuses. What sensitive does not do is just as important. It does not encrypt the value. It does not keep it out of state. And it does not hide it from machine-readable output, such as terraform output dash json or the JSON form of a plan, which tools read for exactly that reason. Removing the marking is deliberately explicit. The nonsensitive function strips it, and the console shows the password in plain text. Sometimes that is legitimate, such as a value that only looks secret. But every use of nonsensitive deserves review, because it is precisely how a secret ends up printed in a CI log.",
}
