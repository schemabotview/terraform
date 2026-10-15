import type { Section } from '../types'

export const forAndDynamic: Section = {
  id: 'for-and-dynamic',
  title: 'Conditionals, for expressions and dynamic blocks',
  scene: 'for-and-dynamic',
  focus: 'dynamic',
  slide: `## Conditionals, for and dynamic

These constructs **generate** values from other values, so one input can shape many settings.

### Generating values
- \`cond ? a : b\` picks one of two values
- \`[for x in list : f(x)]\` builds a list; in braces, a map
- An \`if\` clause filters; \`%{ for }\` loops inside a string template
- \`flatten\` turns nested results into one list

### Generating nested blocks
- \`dynamic "ingress"\` writes one \`ingress\` block per element
- In \`content\`, \`ingress.key\` and \`ingress.value\` name the current element

### Limits
- \`dynamic\` makes **nested blocks only**, never whole resources
- Overused, it hides what the configuration says`,
  narration:
    "The next group of constructs generates values from other values. A conditional, condition question mark a colon b, picks one of two values, so the same configuration can run three servers in production and one everywhere else. A for expression transforms a collection. In square brackets it builds a list, here upper-casing every web name. In braces it builds a map, with an arrow between key and value. Add an if clause and it filters. And templates can loop too, with percent-brace for directives inside a string. Then there is one construct that generates something other than a value. Some resource arguments are nested blocks, like the ingress rules of a security group, and you cannot build a block with an expression. A dynamic block can. For each element of var dot web ports, it writes one ingress block, and inside content, ingress dot key and ingress dot value refer to the current element. The plan at the bottom shows the result: two ingress blocks, http and https, generated from a two-entry map. Two limits. Dynamic only produces nested blocks inside a resource, never whole resources; that is for each, in chapter three. And used too freely, it hides what the configuration actually says.",
}
