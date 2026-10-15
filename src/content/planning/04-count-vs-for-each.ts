import type { Section } from '../types'

export const countVsForEach: Section = {
  id: 'count-vs-for-each',
  title: 'count, for_each and stable keys',
  scene: 'count-vs-for-each',
  focus: 'count-plan',
  slide: `## count, for_each, stable keys

Both make several instances from one block. They differ in how each instance is **identified**, and identity is what state binds to.

### count: identity by position
- Addresses are \`web[0]\`, \`web[1]\`, \`web[2]\`
- Remove the first item and every later index shifts
- Shifted instances change: here 2 replaced, 1 destroyed

### for_each: identity by key
- Addresses are \`web["web-a"]\` and so on
- Removing \`web-a\` destroys \`web-a\` and nothing else

### Choosing
- One block takes \`count\` or \`for_each\`, never both
- \`count\` for identical copies, or for on and off
- \`for_each\` whenever instances have names
- Switching later changes every address: chapter 6 covers \`moved\``,
  narration:
    "Here is the same set of three web config files, built two different ways. With count, each instance is identified by its position in a list: web zero, web one, web two. With for each, each instance is identified by a key: web a, web b, web c. Both work fine on day one. The difference shows up when the list changes. Remove web a, the first item, and plan again. With count, every index after the removed one shifts down by one. Instance zero, which used to be web a, now has to become web b, and instance one has to become web c. For these files a new filename forces replacement, so the plan replaces two instances and destroys the third: two to add, three to destroy, to remove one file. With for each, the plan is exactly what you meant. web a is destroyed, and nothing else is touched, because the other keys did not change. That is the whole lesson: state binds addresses to objects, and with count the address is a position, so positions moving means objects churning. Use count for genuinely identical copies, or for switching a single resource on and off. Use for each whenever your instances have names.",
}
