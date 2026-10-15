import type { Section } from '../types'

export const importBlocks: Section = {
  id: 'import-blocks',
  title: 'Import blocks and provider-specific IDs',
  scene: 'import-blocks',
  focus: 'wrong',
  slide: `## Import blocks

An \`import\` block names a destination **address** and the provider's **ID** for an existing object. The plan shows the import before anything happens.

### Two arguments
- \`to\`: the address the object will be bound to
- \`id\`: whatever this resource type's import format requires

### Planned, reviewed, applied
- \`Plan: 1 to import\` appears beside adds and destroys
- Import happens at apply, like every other change

### Many objects at once
- \`for_each\` on an import block adopts a set

### Read the imported values
- The ID format is the provider's: here \`result,min,max\`
- Swapped fields were **accepted**: min 8999, max 8080
- Nothing else checks that you adopted the right object`,
  narration:
    "Terraform's modern way to adopt an object is an import block, written in configuration and reviewed like everything else. It has two arguments. to is the address the object will be bound to, here random integer dot port. id is the provider's identifier for the existing object, and its format belongs to the provider. For a random integer it is three numbers: the result, the minimum and the maximum. Run a plan and the import appears alongside the usual changes, one to import, and nothing happens until apply. Now look at the two plans on the left, because the second one is a genuine mistake made while preparing this course. The ID was written with its fields in the wrong order. Terraform did not complain. The provider accepted it and planned to adopt an object whose minimum is larger than its maximum. That is the lesson: an import ID is only checked by the provider, and only as far as the provider chooses to check it. So read the imported values in the plan as carefully as you would read a destroy. Nothing else will tell you that you adopted the wrong thing.",
}
