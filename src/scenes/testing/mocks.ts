import type { Scene } from '@graphlearning/flow'

// §5 — the same run, mocked and real. Both results are real `terraform test` output (1.16.6 +
// hashicorp/local 2.9.1) against chapter 5's web module with its directory made a variable.
export const mocks: Scene = {
  id: 'mocks',
  title: 'Mocked providers',
  flow: 'TB',
  nodes: [
    {
      id: 'files',
      label: 'Same run, two test files',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'mocked',
          kind: 'code',
          hug: true,
          filename: 'tests/mocked.tftest.hcl',
          label: `mock_provider "local" {}

run "writes_to_unwritable_dir" {
  variables {
    name = "web"
    dir  = "/proc/forbidden"
  }
  # assert on output.config_path trimmed
}`,
        },
        {
          id: 'real',
          kind: 'code',
          hug: true,
          filename: 'tests/real.tftest.hcl',
          label: `run "writes_to_unwritable_dir" {
  variables {
    name = "web"
    dir  = "/proc/forbidden"
  }
}`,
        },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terraform test',
      label: `tests/mocked.tftest.hcl... in progress
  run "writes_to_unwritable_dir"... pass
tests/mocked.tftest.hcl... pass

tests/real.tftest.hcl... in progress
  run "writes_to_unwritable_dir"... fail
Error: Create local file error
+Original Error: mkdir /proc/forbidden: no such file or directory
tests/real.tftest.hcl... fail

Failure! 1 passed, 1 failed.`,
    },
  ],
  edges: [{ source: 'files', target: 'output' }],
}
