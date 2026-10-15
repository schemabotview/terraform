import type { Section } from '../types'

export const federation: Section = {
  id: 'federation',
  title: 'Short-lived credentials and federation',
  scene: 'federation',
  focus: 'provider',
  slide: `## Federation, not stored keys

Long-lived access keys in a CI secret leak, get copied and never expire. **Federation** swaps a per-run identity token for short-lived credentials.

### How the exchange works
- The CI system signs a token naming the repository and branch
- The cloud's **trust policy** accepts only that repository and branch
- STS issues credentials that expire within the hour

### In configuration
- \`assume_role_with_web_identity\` in the provider block
- No secret is stored in the repository or the CI settings

### Checking it
- Credentials exist only for the job's duration
- Audit logs name the session behind each call

### The trust policy is the boundary
- Too broad, and any branch, or any fork, can apply`,
  narration:
    "The classic way to give CI access to a cloud is to create access keys and paste them into the CI system's secret settings. Those keys never expire, they get copied into other jobs, and when they leak, they keep working until someone notices. Federation removes them. Modern CI systems can issue a signed identity token for each run, stating which repository and which branch the job comes from. The cloud account has a trust policy that accepts tokens only from that repository and that branch, and in exchange it issues temporary credentials that expire, here within an hour. In Terraform, the AWS provider does the exchange itself, with an assume role with web identity block naming the role, the token file and a session name. The configuration on the left validates against the real provider, and notice what it does not contain: any secret at all. The weak point moves to the trust policy, so write it carefully. If it accepts any branch, or tokens from forks of the repository, then anyone who can push a branch can apply to your infrastructure.",
}
