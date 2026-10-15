import type { Section } from '../types'

export const upgrades: Section = {
  id: 'upgrades',
  title: 'CLI, provider, module and backend upgrades',
  scene: 'upgrades',
  focus: 'order',
  slide: `## Upgrade strategy

Four parts move independently: providers, modules, the CLI and the backend. Upgrade one at a time, with a plan as evidence.

### For each upgrade
- Read the release notes for breaking changes
- Change one version, in staging first
- Expect a plan with **no changes**; investigate anything else

### What was observed here
- \`init -upgrade\` moved random from 3.8.1 to 3.9.1
- State applied by 1.17.0-rc2 was then read by 1.16.6

### What can be one-way
- Providers can upgrade stored resource data
- Pre-releases belong in test environments only

### Keep upgrading
- Small regular steps beat one large jump`,
  narration:
    "A Terraform setup has four parts that each have versions: the providers, the modules, the Terraform CLI and the backend. They move independently, so upgrade them independently, one at a time, with a plan as your evidence. For each upgrade, read the release notes for anything marked as breaking. Change exactly one version, in staging first. Then plan. For a pure upgrade, the plan you hope for is no changes, and anything else needs explaining before it goes further. This course has done two real upgrades. In chapter two, init dash upgrade moved the random provider from three point eight point one to three point nine point one, and the lock file diff showed it. And for this chapter, state applied with a release candidate of Terraform one point seventeen was read back by one point sixteen point six without complaint, because Terraform one point x keeps its state format compatible. Providers are different. A newer provider can upgrade the data it stores for a resource, and an older provider may then refuse to read it, so treat provider upgrades as one-way. Release candidates belong in test environments. And upgrade regularly: many small steps are far easier than one large jump.",
}
