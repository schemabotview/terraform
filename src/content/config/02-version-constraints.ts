import type { Section } from '../types'

export const versionConstraints: Section = {
  id: 'version-constraints',
  title: 'Version requirements',
  scene: 'version-constraints',
  focus: 'operators',
  slide: `## Version requirements

A configuration states which **Terraform CLI** and which **providers** it was written for. Without them, a fresh \`init\` installs the newest releases.

### Two requirements in versions.tf
- \`required_version\`: which CLI versions may run this configuration
- \`required_providers\`: each provider's **source address** and version range

### Reading a source address
- \`hashicorp/aws\` is short for \`registry.terraform.io/hashicorp/aws\`
- The key \`aws\` is the local name this module uses for it

### Choosing a range
- \`~> 6.0\` accepts any 6.x, never 7.0: major versions can break configuration
- A root module can pin tightly; a shared module states the widest range it supports`,
  narration:
    "A configuration is written against particular versions of Terraform and of its providers, and it should say so. Without version requirements, a fresh init simply installs the newest releases, which is how a configuration that worked last month stops working today. Both requirements live in the terraform block, usually in a file called versions dot t f. required version constrains the Terraform CLI itself. If someone runs the configuration with a version outside the range, Terraform stops before doing anything, which is the error you can see at the bottom left. required providers lists each provider the configuration uses, with its source address and a version range. The source hashicorp slash aws is short for registry dot terraform dot io slash hashicorp slash aws, and the key aws is the local name this configuration uses for it. Now the operators. Equals pins one exact version. Greater-than-or-equal accepts anything newer, including the next major version, which is usually too loose. The pessimistic operator, tilde greater-than, is the common choice. Tilde greater-than six point zero accepts any six point x release and never seven, because major versions are where breaking changes go.",
}
