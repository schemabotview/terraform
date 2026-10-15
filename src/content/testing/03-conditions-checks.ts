import type { Section } from '../types'

export const conditionsChecks: Section = {
  id: 'conditions-checks',
  title: 'Preconditions, postconditions and check blocks',
  scene: 'conditions-checks',
  focus: 'pre-at-apply',
  slide: `## Conditions and check blocks

Conditions state assumptions about real values. **When** they run depends on when those values become known.

### Inside a resource
- \`precondition\`: an assumption, checked first
- \`postcondition\`: a guarantee about the result, via \`self\`
- Both are errors, and both block what depends on them

### When they run
- As early as possible: this postcondition failed at plan
- Values known only at apply wait: here the port was created first

### Choosing
- Validation for inputs, conditions for real values

### check blocks
- Assertions about the whole configuration
- A failure is a **warning**: apply still completed
- For things to watch, not things to block`,
  narration:
    "Validation checks inputs. Conditions check real values, and there are three kinds. A precondition, inside a resource's lifecycle block, states an assumption that must hold before that resource changes. A postcondition states a guarantee about the result, using self to refer to the resource's own attributes. Both are errors, and both stop anything that depends on them. The subtle part is timing. Conditions run as early as their values are known. The postcondition on the left checks the file's permissions, which are known during planning, so it failed at plan, before anything was created. The precondition checks a randomly generated port, which does not exist until apply. So apply created the random number first, and only then did the precondition fail and block the file. That is chapter three's lesson again: a failure partway through apply leaves what already succeeded in place. The third kind is the check block, which sits outside any resource and makes assertions about the configuration as a whole. A failing check is only a warning. Notice that apply completed anyway. Check blocks report problems. They never stop anything.",
}
