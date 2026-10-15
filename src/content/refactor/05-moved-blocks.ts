import type { Section } from '../types'

export const movedBlocks: Section = {
  id: 'moved-blocks',
  title: 'moved blocks, renames and module extraction',
  scene: 'moved-blocks',
  focus: 'plan',
  slide: `## moved blocks

A \`moved\` block tells Terraform an address changed while the object did not. The plan rebinds instead of replacing.

### What it covers
- Renaming a resource: \`api_config\` to \`api\`
- Extracting into a module: chapter 5's destroy and create, gone
- Switching between \`count\` and \`for_each\`

### What it cannot do
- Move an object into a different state file

### What the plan shows
- \`has moved to\`, with the same ID on both sides
- \`Plan: 0 to add, 0 to change, 0 to destroy\`

### Keep them as history
- Another workspace or copy may not have applied the move yet
- Shared modules keep old \`moved\` blocks for their callers`,
  narration:
    "Chapter five ended with a problem. Extracting a resource into a module changed its address, and Terraform planned to destroy the object and create it again. The fix is a moved block. It says, in configuration, that an object which used to live at one address now lives at another. Here there are two: a rename, from api config to api, and the module extraction, from local file dot web config to module dot web dot local file dot config. Look at the plan. Instead of destroy and create, each resource has moved, the ID on the new address is the same ID as before, and the summary is zero to add, zero to change, zero to destroy. The same mechanism handles moves between count, for each and single instances, which is how you fix the count problem from chapter three without churning anything. Moved blocks are cheap to keep and costly to delete too early. Another workspace, or a teammate's copy, may not have applied the move yet. And if you publish a module, keep old moved blocks indefinitely, because every caller upgrading from an older version needs them.",
}
