import type { Section } from '../types'

export const moduleForEach: Section = {
  id: 'module-for-each',
  title: 'Repeated modules and output collections',
  scene: 'module-for-each',
  focus: 'result',
  slide: `## Repeated modules

\`for_each\` and \`count\` work on \`module\` blocks too: one call, several instances.

### Addresses
- Instances are \`module.service["api"]\` and \`["web"]\`
- Chapter 3's key rules apply: stable, known at plan time

### Collecting outputs
- \`module.service\` is a map of instances, keyed like \`for_each\`
- A \`for\` expression reshapes it for callers
- Here: one map from service name to config path

### Changing keys later
- Adding a key adds a whole instance
- Renaming a key replaces everything in that instance

### One call per meaning
- Repeat a module for instances of one kind of thing
- Different things deserve different module blocks`,
  narration:
    "The for each and count arguments from chapter three work on module blocks as well, so one call can create several complete instances of a module. Here the services variable maps names to ports, and the service module is called once for each entry. Every resource inside gets an address that includes the key: module dot service, open bracket, api, and module dot service, web. Everything chapter three said about keys applies. Use stable names rather than positions, and make sure the keys are known at plan time. Outputs need one more step. Because the module has several instances, module dot service is no longer a single object. It is a map of instances, keyed exactly like the for each. Callers rarely want that raw shape, so a for expression reshapes it, here into one map from each service name to its config path, which is what the output shows after apply. One design rule to finish. Repeat a module for many instances of the same kind of thing. If two instances need very different settings, they are probably different things, and they deserve their own module blocks.",
}
