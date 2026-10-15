import type { Section } from '../types'

export const composition: Section = {
  id: 'composition',
  title: 'Composition and passing existing resources',
  scene: 'composition',
  focus: 'interface',
  slide: `## Composition

Build systems from small modules wired together in the root, not modules that create everything they touch.

### Pass dependencies in
- \`app\` takes a network as input and never creates one
- Its caller chooses: a new network module, or an existing one
- This is **dependency inversion**

### What that buys
- One module serves new and existing networks alike
- The dependency is visible in the root, as a reference
- Each module stays small enough to understand

### Where the wiring lives
- In the root: the one place to read the whole system

### Shape the input
- Ask for only what is needed: an object with \`id\` and \`cidr\``,
  narration:
    "Once you have several modules, the question is how they fit together. A tempting design is for each module to create everything it needs: an app module that builds its own network, its own database, its own everything. That module works exactly once, in exactly one situation. The alternative is composition. Keep modules small, and wire them together in the root. Here the app module asks for a network as an input, an object with an ID and an address range, and it never creates one. Its caller decides where that network comes from. The first caller passes the output of a network module. The second passes a network that already existed, created by another team long ago, using literal values. The same app module serves both, unchanged. This is called dependency inversion: the module depends on an interface, not on a particular implementation. It also keeps the dependency visible, as a reference in the root configuration, where anyone reading it can see what connects to what. And notice how the input is shaped: it asks for only the two values the app actually uses, not the network's every attribute.",
}
