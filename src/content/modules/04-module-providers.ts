import type { Section } from '../types'

export const moduleProviders: Section = {
  id: 'module-providers',
  title: 'Provider inheritance and explicit passing',
  scene: 'module-providers',
  focus: 'passes',
  slide: `## Providers and modules

A module uses provider **configurations** from its caller. It declares what it needs; the caller decides what to hand over.

### The default case
- A child inherits the caller's default \`aws\` configuration
- Reusable modules contain no \`provider\` blocks
- They state a minimum provider version instead
- And never configure credentials

### Needing more than one
- The module lists extras in \`configuration_aliases\`
- The caller maps them in the \`providers\` argument
- Forget one and Terraform refuses, naming the alias

### Why the caller decides
- Regions, accounts and credentials are deployment choices
- The same module then serves every environment`,
  narration:
    "Modules need providers, and the rule is that the caller supplies them. In the simple case you write nothing at all: a child module automatically uses the caller's default configuration of each provider. That is why reusable modules should not contain provider blocks of their own. A module that hard-codes a region or an account can only ever be used in that region and that account. Sometimes a module genuinely needs more than one configuration, like this bucket module, which creates a primary bucket and a replica somewhere else. It says so in its required providers block, with configuration aliases: it expects a second AWS configuration that it calls aws dot replica. The caller then decides which of its own configurations to hand over, in the providers argument. Here the replica gets the d r alias, in us west two, and the plan places one bucket in each region. Leave that mapping out and Terraform refuses, naming the alias the module expected. Keeping this decision with the caller is the point: regions, accounts and credentials are deployment choices, and the same module code can serve every environment.",
}
