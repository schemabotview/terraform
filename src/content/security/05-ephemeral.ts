import type { Section } from '../types'

export const ephemeral: Section = {
  id: 'ephemeral',
  title: 'Ephemeral values and write-only arguments',
  scene: 'ephemeral',
  focus: 'refused',
  slide: `## Ephemeral values

An **ephemeral** value exists only while Terraform runs. It is never written to state or to a plan file.

### Where it can come from
- \`ephemeral = true\` on a variable
- \`ephemeral\` resources, such as a generated password
- Ephemeral outputs pass them between modules

### Where it can go
- Provider and provisioner settings, other ephemeral values
- **Write-only** arguments, like \`password_wo\`
- Not ordinary resource arguments: Terraform refuses

### The costs
- Supply the variable again at apply
- Changes need a version bump: \`password_wo_version\`
- Write-only needs provider support, resource by resource`,
  narration:
    "Sensitive values are hidden from display but stored. Ephemeral values are the other approach: they exist only while Terraform is running and are never written to state or to a plan file. A value becomes ephemeral in two ways. A variable can be declared ephemeral, and providers offer ephemeral resources, such as a random password generated fresh on every run. Then there are rules about where an ephemeral value may go. Provider configuration and provisioners are allowed, and on the left a migration provisioner uses the password, after which the state and the plan contain no trace of it. An ordinary resource argument is not allowed, because its value must be stored, and Terraform refuses with the error you can see. For resources, providers add write-only arguments. A database's password write-only argument accepts an ephemeral value, sends it to the API and never stores it. The plan simply says write-only attribute. There are costs. An ephemeral variable set at plan must be supplied again at apply. Terraform cannot see a write-only value change, so you bump a version number to rotate it. And write-only arguments exist only where a provider has added them.",
}
