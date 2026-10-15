import type { Section } from '../types'

export const variables: Section = {
  id: 'variables',
  title: 'Typed input variables',
  scene: 'variables',
  focus: 'precedence',
  slide: `## Typed input variables

A \`variable\` block declares an input with a **type**. Every value is checked against it before planning starts.

### Types
- Primitive: \`string\`, \`number\`, \`bool\`
- Structural: \`object({...})\` with named attributes; collections \`list\`, \`map\`, \`set\`
- \`optional(type, default)\` fills an attribute left out or set to \`null\`

### No default means required
- \`environment\` has no default, so a value must come from somewhere
- Add \`description\` so the input explains itself in errors and docs

### Precedence
- Later sources win, in the order shown on the left
- A later source replaces the **whole** value: objects are not merged`,
  narration:
    "Variables are how a configuration takes input, and in Terraform every variable can, and usually should, have a type. On the left, the environment variable is an object with four named attributes: a name, an instance count, and two optional attributes with defaults, size and tags. Types do real work. Every value is checked against the type before planning starts, so passing the word two as an instance count fails immediately with a clear error, instead of producing something strange halfway through an apply. Optional attributes are filled in when they are left out, or set to null, which is why the console shows size as small even though the tfvars file never mentioned it. This variable has no default, which makes it required: a value must arrive from somewhere. And there are several somewheres. In increasing order of precedence: the default, environment variables starting with T F underscore VAR, the terraform dot tfvars file, any dot auto dot tfvars files in alphabetical order, and finally dash var and dash var-file on the command line. A later source replaces the whole value. If two files both set environment, the objects are not merged; the later one wins outright.",
}
