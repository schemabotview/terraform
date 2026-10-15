import type { Section } from '../types'

export const removedBlocks: Section = {
  id: 'removed-blocks',
  title: 'removed blocks and ownership handoff',
  scene: 'removed-blocks',
  focus: 'plan',
  slide: `## removed blocks

Deleting a resource block means **destroy**. A \`removed\` block with \`destroy = false\` means stop managing, and leave the object alone.

### Forgetting is not deleting
- Deleted block: \`1 to destroy\`, as on the left
- \`removed\`: \`will no longer be managed\`, \`0 to destroy\`
- After apply the file is still there: only the binding went
- It works on whole \`module\` calls too
- Without \`destroy = false\`, it destroys as well

### Handing ownership over
- Old owner: \`removed\` with \`destroy = false\`
- New owner: an \`import\` block for the same object
- Apply the old side first, so two states never own it

### Then nobody watches it
- Until it is imported again, drift goes unseen
- Delete the block once applied everywhere`,
  narration:
    "Sometimes the right change is for Terraform to stop managing an object, without destroying it. Perhaps it is moving to another team's configuration, or being retired from automation. Simply deleting the resource block does not do that. As the first plan shows, an object in state but not in configuration is destroyed. A removed block expresses the other intention. It names the address and, with destroy set to false, tells Terraform to forget the object instead. The plan says the object will no longer be managed, but will not be destroyed, warns you about it, and after apply the file is still on disk. Only the binding in state went away. This is also how you hand ownership between two configurations safely. The old owner applies a removed block with destroy false. The new owner then applies an import block for the same object. Doing it in that order means there is never a moment when two states both believe they own it. One caution: between those two steps, and forever if no one imports it, nobody is watching the object. Any drift goes unnoticed until someone adopts it again.",
}
