import type { Section } from '../types'

export const boundaries: Section = {
  id: 'boundaries',
  title: 'Multi-account, multi-region and multi-cloud boundaries',
  scene: 'boundaries',
  focus: 'rules',
  slide: `## Accounts, regions and clouds

As systems grow they span regions, accounts and sometimes clouds. Each is a different kind of boundary.

### Regions
- One owner can manage several regions from one state
- Provider aliases, or a per-resource \`region\`

### Accounts
- An account is a security boundary: separate state, separate roles
- Shared services, like DNS, get an account and a state of their own

### Clouds
- Each cloud is a different provider with its own schemas
- Share only published values, never resource definitions

### Portability is a choice
- Write portable interfaces; implementations stay provider-specific`,
  narration:
    "Systems that grow usually stop fitting in one region or one account, and some span more than one cloud. Each of those is a different kind of boundary, and Terraform treats them differently. Regions are the mildest. One team can manage resources in several regions from a single state, using provider aliases from chapter two, or the per-resource region argument that newer AWS providers accept. Accounts are a security boundary, so they deserve separate state and separate roles, exactly as chapter eight described. The staging and production accounts each have their own, and shared services such as DNS or the state buckets themselves get an account and a state of their own too. Clouds are the strongest boundary. Each cloud is a different provider, with different resource types and different schemas, so there is no such thing as a resource definition that simply moves between them. What can cross is published values, such as a network address range or a DNS name. Portability is therefore a design choice, made at the level of module interfaces: a module can offer the same inputs and outputs everywhere, while its implementation stays specific to each provider.",
}
