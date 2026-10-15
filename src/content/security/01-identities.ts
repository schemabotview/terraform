import type { Section } from '../types'

export const identities: Section = {
  id: 'identities',
  title: 'Human, automation, provider and backend identities',
  scene: 'identities',
  focus: 'matrix',
  slide: `## Four identities

One apply involves several identities. Each needs its own permissions, and most need far less than they usually get.

### Who is acting
- **People** write and review; day to day they should not apply
- The **CI runner** runs plan and apply on their behalf
- The **provider** credentials call the cloud API
- The **backend** credentials read and write state

### Separate them
- Plan jobs: read state, take the lock, change nothing
- Apply jobs: write one environment's state and infrastructure
- Backend access can differ from infrastructure access
- Name roles after the job, not the person

### People still need a way in
- A **break-glass** role: rare, logged and reviewed`,
  narration:
    "Security in Terraform starts with a simple question: who is acting? In one apply there are usually four identities. People write code and review plans. A CI runner actually executes plan and apply on their behalf. The provider uses credentials to call the cloud API, and the backend uses credentials to read and write state. These are often the same set of all-powerful keys, and they should not be. The table on the left is a reasonable starting point. A person, day to day, can read plans but does not apply directly. A CI job that only plans can read state and take the lock, but changes nothing. A CI job that applies can write state and change infrastructure, for one environment only. Notice that the backend and the infrastructure can use different credentials entirely, so the identity that writes state need not be the identity that can delete databases. And people still need a way in for emergencies. That is a break-glass role: used rarely, logged every time, and reviewed afterwards, rather than everyday administrator access that nobody remembers having.",
}
