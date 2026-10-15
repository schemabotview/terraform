import type { Section } from '../types'

export const inputValidation: Section = {
  id: 'input-validation',
  title: 'Input validation and helpful errors',
  scene: 'input-validation',
  focus: 'error',
  slide: `## Input validation

A \`validation\` block turns a rule about inputs into an error, before any planning starts.

### What a rule can check
- Ranges, formats and allowed values of one variable
- Combinations: here \`instance_count\` checks \`environment\` too
- \`can()\` and \`regex()\` check formats
- One idea per rule, each with its own message
- Rules run on every plan, for every caller

### Write messages for the caller
- Say **what** the rule is, **why** it exists, what was **received**
- \`got 1\` beats \`invalid input\`
- Terraform adds the variables' values and the rule's location

### What validation cannot do
- Check real objects: conditions do that, next
- Errors at this stage are the cheapest to fix`,
  narration:
    "A validation block turns a rule about an input into an error, and the error appears before any planning starts, which is the cheapest possible moment to find out. Most rules check a single variable: a range, a format, a list of allowed values, with functions like can and regex for things like names and address ranges. Rules can also look at more than one variable. Here the instance count rule reads the environment too: production needs at least two instances for redundancy. Passing environment prod with one instance fails immediately, and look at how much the error tells you. Terraform shows both variables' values and points at the rule. Then comes the message the author wrote, and that is where most rules fall short. A good message says what the rule is, why it exists, and what value was actually received. Got one beats invalid input every time, because the caller can fix the problem without opening the module. What validation cannot do is look at real objects. It only sees inputs. For rules about what exists or what was created, you need conditions, which are next.",
}
