import type { Section } from '../types'

export const lifecycleRules: Section = {
  id: 'lifecycle-rules',
  title: 'Lifecycle rules',
  scene: 'lifecycle-rules',
  focus: 'cbd',
  slide: `## Lifecycle rules

A \`lifecycle\` block changes how Terraform handles one resource's changes. Every rule has a cost.

### The four rules
- \`create_before_destroy\`: replacement first, then removal
- \`prevent_destroy\`: any plan that destroys it fails
- \`ignore_changes\`: listed arguments stop producing diffs
- \`replace_triggered_by\`: replace when another resource changes

### What each one costs
- Create-first needs **unique names**: here destroy deleted the new file
- Delete the block and its protection goes with it
- Ignored arguments drift away from the configuration
- Triggers fire even if nothing else changed

### Use them sparingly
- Each one hides something a plan would show`,
  narration:
    "Sometimes the default behaviour is not what you want, and a lifecycle block lets you change it for one resource. There are four rules, and each card on the left is a real run. create before destroy flips the replacement order: the new object is created first, then the old one is removed, which avoids a gap. But look at the top left. The new file had the same name as the old one, apply reported success, and then destroying the old object deleted the file that had just been written. Create first only works when old and new can exist side by side, which usually means unique names. prevent destroy makes any plan that would destroy the resource fail. That is useful protection, with a limit: the rule lives inside the resource block, so if someone deletes the whole block, the protection goes with it and the destroy goes ahead. ignore changes tells Terraform to stop diffing the listed arguments, which is how you share an argument with another tool. The cost: the configuration says two point oh, the object holds one point oh, and the plan says no changes. And replace triggered by replaces this resource whenever another one changes, here replacing the web file because the release was updated.",
}
