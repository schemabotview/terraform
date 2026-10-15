import type { Section } from '../types'

export const expressions: Section = {
  id: 'expressions',
  title: 'Expressions, functions and types',
  scene: 'expressions',
  focus: 'console',
  slide: `## Expressions, functions, types

Anywhere a value is expected, you can write an **expression**. \`terraform console\` evaluates them against your configuration.

### Building blocks
- **Operators**: arithmetic, comparison and logic, such as \`*\`, \`>\` and \`&&\`
- **Functions**: built in, like \`upper\` and \`cidrsubnet\`; none of your own
- **Collections**: index a list with \`[0]\`, look up a map key with \`lookup\`

### Types convert, sometimes silently
- \`"5" + 1\` is \`6\`: Terraform converts when it safely can
- A \`set\` drops duplicates and keeps no order
- \`tonumber("two")\` fails: conversion has limits

### Try before you apply
- The console only reads; it changes nothing
- It sees this directory's variables, locals and state`,
  narration:
    "Anywhere Terraform expects a value, you can write an expression instead, and the quickest way to learn them is terraform console. Run it in a configuration's directory and you can evaluate expressions against that configuration's variables and locals, which is exactly what the left side shows. Expressions are built from a few families. Operators do arithmetic, comparison and logic, so two times the instance count plus one is five, and the comparison returns true. Functions transform values. Terraform ships a large library of them, upper, join, cidrsubnet for carving networks into subnets, and many more, but you cannot write your own functions in the language itself. Collections are indexed with square brackets, and lookup reads a map key with a fallback when it is missing. Then there are types, and Terraform converts between them automatically when it safely can. The string five plus one is six. A set removes duplicates and keeps no order of its own. But conversion has limits: tonumber of the word two is an error. The console is read-only. It never changes infrastructure, so it is a safe place to check an expression before it goes into a plan.",
}
