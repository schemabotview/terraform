import type { Section } from '../types'

export const testFiles: Section = {
  id: 'test-files',
  title: 'terraform test, run blocks and assertions',
  scene: 'test-files',
  focus: 'fail',
  slide: `## terraform test

Test files, \`*.tftest.hcl\`, run a module against chosen inputs and assert on the results.

### Inside a test file
- \`variables\` set inputs for every run, or for one
- Each \`run\` is a plan or an apply, then its \`assert\` blocks
- \`expect_failures\` passes only if the named rule rejects the input

### Running them
- \`terraform test\` runs every file under \`tests/\`
- Runs in one file share state; files do not

### plan or apply
- \`command = plan\` creates nothing
- The default is **apply**: real objects, destroyed at the end

### Reading a failure
- A failed assertion shows a diff
- Runs continue; the file fails as a whole`,
  narration:
    "terraform test runs a module against inputs you choose and checks the results with assertions. Tests live in files ending dot t f test dot h c l, next to the module. On the left is a test file for chapter five's web module. A top-level variables block sets the inputs for every run. Each run block is one plan or apply, followed by its assertions. The first run plans with the default port and asserts the rendered content. The second passes port eighty and uses expect failures: it passes only if the port validation rule rejects the input, which is how you test that your rules actually work. The third run has no command, and that matters, because the default command is apply. That run created a real file, checked that it existed, and then Terraform destroyed it again when the test file finished. Plan runs create nothing at all, so prefer them wherever a plan can answer the question. When an assertion fails, Terraform shows the actual and expected values as a diff, here eight thousand eighty against nine thousand ninety. The remaining runs still execute, and the file as a whole is marked as failed.",
}
