import type { Section } from '../types'

export const localsOutputs: Section = {
  id: 'locals-outputs',
  title: 'Locals and outputs',
  scene: 'locals-outputs',
  focus: 'json',
  slide: `## Locals and outputs

A **local** names a derived value once. An **output** exposes a value to whoever runs, or calls, this configuration.

### Locals
- \`local.name_prefix\` is computed from inputs, then reused everywhere
- Locals cannot be set from outside: they are internal
- Use one when an expression repeats, not for every value

### Outputs
- Shown after apply, read later with \`terraform output\`
- In a child module, outputs are its **only** interface to the caller
- A \`description\` documents the contract

### Sensitive outputs
- An output built from a sensitive value must say \`sensitive = true\`
- That only **redacts** the display: \`-json\` and state still hold it`,
  narration:
    "Two more kinds of named value. A local value gives a name to something derived from other values, so it is computed once and reused. Here, name prefix combines the word shop with the environment name, and web names builds one name per instance from it. Locals are internal: nothing outside the configuration can set them, which is exactly what separates them from variables. An output goes the other way. It exposes a value to whoever runs this configuration, printed after apply and readable later with terraform output. In chapter five, when we build modules, outputs become even more important, because they are the only thing a calling configuration can see of a module. So give them descriptions and treat them as a contract. Now look at the password. Because db password comes from a variable marked sensitive, Terraform refuses to output it unless the output is marked sensitive as well, to confirm you meant it. And on the left, terraform output shows it redacted. But redacted is not hidden. terraform output dash json prints the real value, and the state file holds it in plain text. Sensitive controls display, not storage, and we come back to that properly in chapter eight.",
}
