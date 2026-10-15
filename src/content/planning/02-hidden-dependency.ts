import type { Section } from '../types'

export const hiddenDependency: Section = {
  id: 'hidden-dependency',
  title: 'Hidden dependencies and depends_on',
  scene: 'hidden-dependency',
  focus: 'without',
  slide: `## Hidden dependencies

A dependency Terraform cannot see is one no **reference** expresses. Here the data source names the file by path: a plain string.

### What goes wrong
- The data source is read during plan, before the file exists
- The plan fails, as on the left

### Two fixes, best first
- Reference it: \`filename = local_file.web.filename\`
- When there is nothing to reference: \`depends_on\`

### depends_on has a cost
- The read waits for apply, so its values are unknown in the plan
- A broad \`depends_on\` makes plans more conservative

### Cycles
- Two blocks that refer to each other cannot be ordered at all`,
  narration:
    "The graph only contains the dependencies Terraform can see, and it can only see references. Look at this configuration. A resource writes a config file, and a data source reads the same file. But the data source names the file by its path, written out as a plain string. There is no reference to the resource, so as far as Terraform knows, the two are unrelated. Data sources are normally read during planning, so the read happens immediately, before the file has been created, and the plan fails, exactly as you see on the left. There are two fixes. The best one is to make the relationship a reference: set the filename to local file dot web dot filename. Now the dependency is part of the graph, and Terraform defers the read until apply. When there is genuinely nothing to reference, the explicit fallback is depends on, which adds the edge by hand. But depends on has a cost. The data source is now read during apply, so everything derived from it is unknown in the plan, and a broad depends on can make whole sections of a plan vaguer than they need to be. And at the bottom, the opposite problem: two blocks that refer to each other form a cycle, and Terraform cannot order them at all.",
}
