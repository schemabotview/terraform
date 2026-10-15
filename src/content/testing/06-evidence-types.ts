import type { Section } from '../types'

export const evidenceTypes: Section = {
  id: 'evidence-types',
  title: 'Integration, policy, security and health checks',
  scene: 'evidence-types',
  focus: 'matrix',
  slide: `## Choosing evidence

Every check supports some claims and not others. Pick evidence by the **claim** you need to make.

### Inside Terraform
- Syntax and schema: \`fmt\`, \`validate\`
- Contracts: validation rules and conditions
- Plan shape and logic: plan runs and mocks
- Real API acceptance: apply runs, in a test account
- Only apply runs create anything

### Beyond Terraform
- **Policy**: rules checked against the plan, such as no public buckets
- **Security**: scanners for risky settings in configuration
- **Health**: probes and monitoring after deploy

### Order them by cost
- Cheapest on every save; costliest before release
- Record in the review what each check proved`,
  narration:
    "By now there are many kinds of check, and the useful question is not which one is best, but which claim you need to support. The table on the left matches claims to evidence. That the syntax and schema are valid: fmt and validate. That inputs meet the contract: validation rules and conditions. That the plan has the right shape, or that the module's logic holds: plan runs and mocked tests, none of which create anything. That the real API accepts the configuration: only an apply, ideally in a separate test account. Some claims sit outside Terraform entirely. Policy checks evaluate a plan against organisational rules, such as no publicly readable buckets, and chapter nine comes back to how they are enforced. Security scanners look for risky settings in the configuration. And the claim that the system actually works, that users can reach it and it behaves correctly, needs health checks and monitoring against the running system, which no Terraform test can replace. Then order the checks by cost: the cheapest on every save, plan tests and policy on every change, and slow, real apply tests before a release.",
}
