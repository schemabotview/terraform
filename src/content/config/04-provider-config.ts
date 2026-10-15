import type { Section } from '../types'

export const providerConfig: Section = {
  id: 'provider-config',
  title: 'Provider configuration and aliases',
  scene: 'provider-config',
  focus: 'dr',
  slide: `## Provider configuration

A \`provider\` block **configures** a provider: which region, which account, which endpoint. \`required_providers\` only says *which* provider.

### Aliases
- A second block with \`alias = "dr"\` is another configuration of the same provider
- Resources use the default unless their \`provider\` argument names \`aws.dr\`
- Settings may use variables, like \`var.region\`, but only values known before apply
- AWS provider 6 also takes \`region\` per resource; aliases still cover other accounts and credentials

### Credentials stay out of configuration
- Supply them from the environment: a profile, SSO, or a CI identity
- Keys written into a \`.tf\` file end up in Git history
- With no credentials, each provider configuration fails on its own`,
  narration:
    "Declaring a provider and configuring it are two different things. required providers says which provider the configuration needs. A provider block says how to use it: which region, which account, which endpoint. On the left, the first aws block has no alias, so it is the default configuration, using the region from a variable. The second block adds alias equals d r and a different region. That is a second, independent configuration of the same provider plugin. Resources use the default unless they opt in, and the replica bucket does exactly that with provider equals aws dot d r. The plan for this configuration places one bucket in each region. Recent versions of the AWS provider also accept a region argument on individual resources, but aliases remain the general mechanism, because they can also carry different accounts and different credentials. Which brings us to credentials. They do not belong in configuration. Supply them from the environment, through a profile, single sign-on, or the identity of your CI system, because anything written into a dot t f file ends up in Git history. The error at the bottom is what happens with none available: each provider configuration fails separately, here the d r alias.",
}
