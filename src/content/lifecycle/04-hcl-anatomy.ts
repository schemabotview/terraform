import type { Section } from '../types'

export const hclAnatomy: Section = {
  id: 'hcl-anatomy',
  title: 'Blocks, arguments, references, addresses',
  scene: 'hcl-anatomy',
  focus: 'reference',
  slide: `## Blocks, arguments, references

Terraform configuration is written in **HCL**. The whole first file uses four pieces of grammar.

### Read main.tf with them
- **Block**: a type, labels, then a body in braces. \`resource\` takes two labels: a type and your name
- **Argument**: \`name = value\` inside a body, such as the variable's \`default\`
- **Reference**: an expression that reads another value, such as \`var.app_version\`
- **Address**: \`type.name\` names one resource in plans, state and commands

### Four block types here
- \`terraform\` pins the CLI version, \`variable\` takes input
- \`resource\` declares an object, \`output\` exposes a value

### Order does not matter
Every \`.tf\` file in the directory is read together. References decide what happens first.`,
  narration:
    "Terraform configuration is written in a language called HCL, and the whole of our first file uses just four pieces of grammar. The first is the block. A block has a type, then some labels, then a body in braces. Resource, terraform data, release is a block of type resource with two labels: the resource type and a name you choose. The second is the argument: a name, an equals sign and a value inside a body, like default equals one point oh point oh. The third is the reference. An expression like var dot app version doesn't contain a value itself. It reads one from somewhere else, here from the variable block. References also tell Terraform which things depend on which, which matters a great deal in chapter three. The fourth is the address. Resource type dot name, terraform data dot release, names exactly one resource, and it is the name you will see in plans, in state and in commands. With those four, the file reads cleanly: a terraform block pinning the version of the CLI, a variable taking input, a resource declaring an object, and an output exposing a value once it exists.",
}
