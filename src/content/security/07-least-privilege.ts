import type { Section } from '../types'

export const leastPrivilege: Section = {
  id: 'least-privilege',
  title: 'Least privilege and deployment boundaries',
  scene: 'least-privilege',
  focus: 'policy',
  slide: `## Least privilege

Give each identity only the actions its job needs, on only the resources its environment owns.

### A plan role for staging
- Read the staging state object only
- Take and release its lock: plans write a \`.tflock\` object
- List only the staging prefix

### Boundaries that hold
- One apply role per environment
- Production in its own account, with its own state
- Policies written as code, reviewed like code

### Check it
- Run a plan as the role before trusting it
- Try the other environment: it must fail

### Start narrow, widen on evidence
- Denied actions show up in errors: add them one at a time`,
  narration:
    "Least privilege means each identity gets only the actions its job needs, on only the resources its environment owns. On the left is a policy for a staging plan role, written as a Terraform policy document and rendered as JSON. It can read one object, the staging state. It can list only the staging prefix of the bucket. And there is one statement that is easy to miss: with S3 native locking, even a plan writes and deletes a small lock file, so a role that can only read will fail to take the lock. Granting put and delete on that one lock object, and nothing else, keeps the role honest. The same thinking scales up. Give each environment its own apply role, so a staging pipeline cannot change production. Put production in its own account, with its own state, as chapter four suggested. And keep these policies as code, reviewed like any other change, because a quiet edit to a policy is as significant as an edit to infrastructure. Start narrow. When a permission is genuinely missing, the error names the denied action, and you add exactly that one.",
}
