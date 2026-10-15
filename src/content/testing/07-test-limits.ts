import type { Section } from '../types'

export const testLimits: Section = {
  id: 'test-limits',
  title: 'Evidence limits, isolation and cleanup',
  scene: 'test-limits',
  focus: 'teardown',
  slide: `## The limits of test evidence

A passing test proves what it asserted, in the conditions it ran in. Nothing more.

### Cleanup can fail
- Here every run passed and the file still **failed**
- Teardown left \`terraform_data.queue\` behind
- Terraform names what to clean up by hand

### Apply tests are real
- Real objects, in a real account, costing real money
- Run them in an **isolated** account, never production
- Leftovers need a sweeper job or a manual check

### Keep tests honest
- Assert on outcomes, not on copies of the code
- A test that can never fail proves nothing

### What tests never prove
- That production, with its data and traffic, behaves the same
- That the next provider version still passes`,
  narration:
    "Let's finish the chapter with the limits of the evidence itself. A passing test proves what it asserted, under the conditions it ran in, and nothing more. Look at this run. The assertion passed. Then, during teardown, the resource's destroy step failed, here a queue that still held messages, and Terraform could not remove it. The test file is marked as failed even though every run passed, and Terraform lists exactly which resources were left behind and must be cleaned up by hand. With a real cloud provider, those leftovers keep running, and keep costing money, until someone notices. That is why apply tests belong in an isolated account, never in production, and why teams that run them usually add a regular sweeper job to remove anything left over. Apply tests are also slow and cost money on every run, which is another reason to keep them for the questions that genuinely need them. And remember what no test proves. It does not show that production, with its real data and real traffic, will behave the same way. And it does not show that the next provider release will still pass, which is why tests run again on every upgrade.",
}
