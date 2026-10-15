import type { Section } from '../types'

export const ciChecks: Section = {
  id: 'ci-checks',
  title: 'CI initialisation, validation, tests and speculative plans',
  scene: 'ci-checks',
  focus: 'run',
  slide: `## CI checks and speculative plans

Every pull request runs the same checks, in order of cost. Reviewers then read results, not guesses.

### The checks
- \`fmt -check\`, then module tests, then \`validate\`
- A **speculative plan** for each affected environment
- \`-input=false\`: CI must never wait for a prompt

### Speculative means
- The plan shows what *would* happen if merged now
- It is posted to the review and never applied
- Saved with \`-out\`, so it can be applied later

### When a check fails
- Later steps do not run: \`set -eu\`
- \`init -lockfile=readonly\` refuses lock changes

### Keep CI identities narrow
- Plan jobs use the plan-only role from chapter 8`,
  narration:
    "Reviewers should not have to guess what a change will do, so every pull request runs the same checks automatically, cheapest first. The script on the left is the one used in this chapter, and below it is a real run against staging. First fmt dash check, which fails if anything is not in canonical layout. Then the module's own tests, all three passing. Then validate for the environment, and finally a plan. Notice the dash input equals false on every command. In CI there is nobody to answer a prompt, so a missing variable must fail immediately rather than hang until the job times out. That last plan is called a speculative plan. It shows what would happen if this branch were merged and applied right now, and its output is posted to the review so reviewers read the real consequences. It is never applied by the pull request job itself. But it is saved with dash out, because, as the next section shows, applying exactly that file is how the reviewed change and the applied change stay the same. And plan jobs should run with the plan-only role from chapter eight: they read state and take the lock, and nothing more.",
}
