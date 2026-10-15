import type { Section } from '../types'

export const mocks: Section = {
  id: 'mocks',
  title: 'Plan tests, apply tests, mocks and overrides',
  scene: 'mocks',
  focus: 'output',
  slide: `## Mocked providers

\`mock_provider\` replaces a real provider inside a test. Apply runs then create nothing and need no credentials.

### What a mock gives you
- Fast, free, offline runs of your module's logic
- Generated values for computed attributes
- \`override_resource\` and \`override_data\` pin specific values

### What it cannot tell you
- Whether the real API accepts the request
- Same run here: **pass** mocked, **fail** for real
- Quotas, permissions, naming rules, provider bugs

### Where mocks are defined
- \`mock_resource\` blocks set values per resource type
- Shared mock data can live in \`.tfmock.hcl\` files

### Use both
- Mocks for logic on every change; real runs before release`,
  narration:
    "Apply tests create real objects, which can be slow, costly and impossible without credentials. A mock provider is the alternative. Declare mock provider in a test file and every resource from that provider is simulated: nothing is created, no credentials are needed, and computed attributes get generated values. When a test needs particular values, override resource and override data pin them. That makes mocks excellent for testing a module's own logic: its expressions, its conditionals, its outputs, quickly and on every change. But look at what happens on the left. The same run, writing a file into a directory that cannot exist, appears in two test files. With the mock provider, it passes. Against the real provider, it fails, because the real system refuses. Neither result is wrong. They answer different questions. The mocked run proves the module's logic produced the path it should. Only the real run can show whether the real system accepts it, along with quotas, permissions, naming rules and provider bugs. So use both: mocks for logic on every change, and real apply tests before a release.",
}
