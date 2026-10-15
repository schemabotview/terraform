import type { Section } from '../types'

export const stateFile: Section = {
  id: 'state-file',
  title: 'What state records',
  scene: 'state-file',
  focus: 'bindings',
  slide: `## What state records

State is Terraform's record of what it manages: which **address** is bound to which real object, and what it last saw there.

### Inside the file
- **Bindings**: \`terraform_data.release\` to one object ID
- **Attributes**: what was last observed
- **Outputs**, plus \`serial\` and \`lineage\` to order snapshots
- Secrets are marked sensitive, yet stored in full
- Each write replaces the whole snapshot

### One owner per object
- Each real object belongs in exactly one state
- Two states managing one object undo each other's work
- Importing an object twice creates this by accident

### Read it with commands
Use \`terraform state list\` and \`state show\`, never an editor. To change state safely, see chapter 6.`,
  narration:
    "Chapter one introduced state as Terraform's record. This chapter is about protecting that record, so let's look inside it first. On the left is a real state file, trimmed to one resource. The most important part is the binding: the address terraform data dot release is tied to one particular object, identified by its ID. Alongside the binding sit the attributes, the values Terraform observed the last time it refreshed or applied, and the outputs. Then there is metadata. The serial number increases as the state is rewritten, and the lineage identifies this state's history, so Terraform can tell one snapshot from another and refuse to mix them up. One rule follows from all of this: every real object should be owned by exactly one state. If two states both believe they manage the same object, each apply undoes the other's work, and neither plan warns you. Finally, read state through commands, terraform state list and terraform state show, rather than opening the JSON. And never edit it by hand. When state genuinely needs changing, chapter six covers the tools built for that.",
}
