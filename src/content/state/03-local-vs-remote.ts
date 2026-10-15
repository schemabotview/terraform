import type { Section } from '../types'

export const localVsRemote: Section = {
  id: 'local-vs-remote',
  title: 'Local and remote storage, local and remote execution',
  scene: 'local-vs-remote',
  focus: 'whoami',
  slide: `## Where state lives, where runs happen

A **backend** decides where state is stored. Where plan and apply *run* is a separate decision.

### Local backend
- \`terraform.tfstate\` sits next to the configuration
- Fine for learning; one laptop is one point of loss
- Two people with local state keep two different records

### Remote storage
- The S3 backend keeps state in a bucket, shared and locked
- Lock info says \`Who: root@vm\`: the run is still local

### Remote execution
- HCP Terraform can also **run** plans and applies on its runners
- Remote storage alone moves no execution anywhere
- Credentials live wherever the run happens`,
  narration:
    "Two questions are easy to blur together. Where is the state stored? And where do plan and apply actually run? The backend answers the first one only. With the default local backend, state is a file next to your configuration. That is fine for learning, but the state exists on one disk, and nobody else can safely use it. Move to a remote backend, like S3, and the state becomes an object in a bucket that a team can share and lock. But look at the lock information on the left, captured while an apply was running against that bucket. The path is in the bucket. The who is the machine the command was typed on. The state moved; the execution did not. Plans still run on your laptop, or on a CI runner, with that machine's credentials. Remote execution is a different feature. HCP Terraform, for example, can run plans and applies on its own runners, or it can store state while runs stay local. Keep the two decisions separate, because the second one decides where your cloud credentials have to live.",
}
