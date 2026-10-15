import type { Section } from '../types'

export const postImport: Section = {
  id: 'post-import',
  title: 'Post-import plans and reconciliation',
  scene: 'post-import',
  focus: 'edited',
  slide: `## After the import

\`Apply complete! 1 imported\` means the object is now in state. Configuration and object still have to agree.

### Reconcile until the plan is empty
- Change configuration until the plan says **No changes**
- Removing \`null\` arguments made no difference here
- Editing \`max\` to 8099 planned a **replacement**

### Read every post-import diff
- An update changes a real object you just adopted
- A replacement destroys it: often the opposite of the goal
- Decide object by object which side is right

### Common surprises
- Settings the object has that configuration omits
- Tags or settings added by other tools
- Computed values copied in as literals

### Then remove the import block
- Or keep it as history; it does nothing once applied`,
  narration:
    "Applying the plan imports the object, and the summary says so: one imported. The object is now bound in state. But the job is not finished, because the configuration and the object still have to agree, and the way to check is the next plan. The goal of reconciliation is a plan that says no changes. Here, tidying the generated block by removing its null arguments made no difference, which is what you want. But then the maximum was edited to eight thousand ninety-nine, perhaps to match some convention, and the plan proposed to replace the object, because that argument cannot change in place. Replacing an object you just went to the trouble of adopting is usually the opposite of what you intended. So read every post-import diff with care. An update changes a real system that, until a moment ago, nobody was managing with Terraform. A replacement destroys it. For each difference, decide which side is right, the configuration or the object, and change the configuration until the plan is empty. Once applied, the import block has done its job. You can delete it, or keep it as a record.",
}
