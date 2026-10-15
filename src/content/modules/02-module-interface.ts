import type { Section } from '../types'

export const moduleInterface: Section = {
  id: 'module-interface',
  title: 'Inputs, outputs and validation contracts',
  scene: 'module-interface',
  focus: 'error',
  slide: `## A module's interface

Variables and outputs are the whole contract between a module and its callers. Everything else is internal.

### Inputs
- A \`type\` and a \`description\` for every variable
- \`validation\` rejects bad values at the call, with your message
- Defaults only where one value suits nearly every caller
- \`nullable = false\` refuses a \`null\` from callers
- Mark secret inputs and outputs \`sensitive\`

### Outputs
- Expose what callers need, not every attribute
- Describe each one; renaming an output breaks callers

### Errors point at the caller
- The message names the caller's line and the rule that failed
- Callers learn the contract without reading the module`,
  narration:
    "A module's interface is its variables and its outputs, and nothing else. Callers should never need to know which resources are inside. So treat the interface as a contract. Every variable gets a type and a description. Where a value has rules, write them down as a validation block: here, the port must be between ten twenty-four and sixty-five thousand five hundred thirty-five. Then look at what happens when a caller passes port eighty. The error points at the caller's own line, shows the value it passed, prints the message the module author wrote, and names the rule that rejected it. The caller learns the contract without opening the module's code. Defaults deserve care too. A default is a decision made on behalf of every caller, so add one only where a single value really does suit almost everyone, and leave the rest required. Outputs work the same way in reverse. Expose what callers actually need, not every attribute you happen to have, and describe each one, because once a caller depends on an output, renaming or removing it is a breaking change.",
}
