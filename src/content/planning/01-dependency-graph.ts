import type { Section } from '../types'

export const dependencyGraph: Section = {
  id: 'dependency-graph',
  title: 'References become a graph',
  scene: 'dependency-graph',
  focus: 'monitoring',
  slide: `## References become a graph

Terraform never runs files top to bottom. It turns every **reference** into an edge, then walks the resulting graph.

### How the graph is built
- \`web\` reads \`random_pet.network.id\`, so it waits for \`network\`
- Every reference is an **implicit dependency**
- \`terraform graph\` prints the graph Terraform built

### Parallel where it can be
- \`web\` and \`db\` share no edge, so they start together
- At most 10 operations run at once by default
- \`-parallelism=n\` changes that limit

### Destroy runs the other way
- Dependents go first: \`monitoring\` before \`web\` and \`db\`

### Why it matters
- Adding one reference can reorder a whole apply
- A relationship with no reference has no order at all`,
  narration:
    "In chapter two we said file order is not execution order. Here is what Terraform uses instead. Every time one block refers to another, that reference becomes an edge in a dependency graph. The web config file reads the network's generated ID, so web depends on network. The database file does the same. The monitoring file refers to both of their filenames, so it depends on both. You never declared any of these dependencies. They are implicit, and they come straight from the references you had to write anyway. terraform graph prints the graph it built, and the diagram on the left is that output. Then Terraform walks the graph. Look at the real apply log underneath. Network is created first. Then web and db start together, because there is no edge between them, so nothing forces an order. Only when both have finished does monitoring start. By default Terraform runs up to ten operations at the same time, and the dash parallelism flag changes that. And when you destroy, the graph is walked in reverse: monitoring goes first, because something that depends on an object must be removed before the object it depends on.",
}
