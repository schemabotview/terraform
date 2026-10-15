import type { Section } from '../types'

export const abstraction: Section = {
  id: 'abstraction',
  title: 'Documentation, evolution and abstraction trade-offs',
  scene: 'abstraction',
  focus: 'wrapper-plan',
  slide: `## Good abstractions, and bad ones

A module earns its place when its interface is **smaller** than what it hides.

### The over-general wrapper
- One \`any\` input passed through to a resource
- A typo is silently ignored: versioning stayed \`false\`
- Callers must read the module to use it

### The narrow module
- A few typed inputs, defaults that encode a decision
- Terraform catches the typo and suggests the fix

### Ask before writing one
- Will two callers really use it differently?
- Does its interface hide real complexity?

### Keep it maintainable
- A README, an example call, versioned releases
- Change the interface rarely, and say so when you do`,
  narration:
    "Not every module is worth writing. The test is simple: a module earns its place when its interface is smaller than the thing it hides. Here are two modules for the same bucket, called with the same typo, versioning spelled without its second n. The first is an over-general wrapper. It takes a single settings input of type any and looks keys up inside it. Because any accepts anything, the misspelled key is simply never read. The plan is accepted, versioning is false, and nobody is told. Wrappers like this also force every caller to read the module's source to discover which keys exist, so the interface hides nothing at all. The second is a narrow module with one typed variable per input and a default that encodes a decision, versioning on. The same typo is an unsupported argument, and Terraform even suggests the right name. Narrow modules also need looking after. Give each one a README and an example call, publish it with versions, and change its interface rarely and deliberately, because every change to an interface is a change for every caller.",
}
