import type { Section } from '../types'

export const generatedConfig: Section = {
  id: 'generated-config',
  title: 'Generated configuration and human review',
  scene: 'generated-config',
  focus: 'review',
  slide: `## Generated configuration

With no resource block yet, \`-generate-config-out\` drafts one from each imported object.

### What you get
- One block per import, with every argument spelled out
- \`null\` where unset, literals everywhere else
- Terraform labels the feature **experimental**
- It only writes blocks that do not exist yet

### What it cannot know
- Which values should be variables or references
- Which values only match a default by accident
- Which values are secrets that now sit in a file
- Which arguments conflict and must go

### Treat it as a draft
- Tidy it, move it into the right file, then plan again
- Commit only the reviewed version
- Review it in the same change as the import`,
  narration:
    "An import block needs configuration to go with it, a resource block at the destination address. For one object you can write it by hand. For many, Terraform can draft it: run plan with the generate config out option, and it writes a resource block for each import, filled in from the object it found. On the left is the result for our random integer. Every argument is spelled out, with null for anything not set. And notice the warning printed alongside: configuration generation is still experimental, and its format may change. Generated configuration is a starting point, because it cannot know your intentions. It does not know which values should come from variables or references to other resources, so everything arrives as a literal. It cannot tell a value you chose from one that merely happens to match a default. And if the object holds a secret, that secret is now sitting in a file, about to be committed. So review it like any other change: drop the noise, replace literals with references, check for secrets, move the block into the file where it belongs, and then plan again.",
}
