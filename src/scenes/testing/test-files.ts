import type { Scene } from '@graphlearning/flow'

// §4 — a test file for chapter 5's web module and two real `terraform test` runs (1.16.6): all
// passing, then with the first assertion's expected value changed to 9090.
export const testFiles: Scene = {
  id: 'test-files',
  title: 'terraform test',
  flow: 'TB',
  nodes: [
    {
      id: 'file',
      kind: 'code',
      filename: 'tests/web.tftest.hcl',
      label: `variables {
  name = "web"
}

run "renders_default_port" {
  command = plan

  assert {
    condition     = local_file.config.content == "port = 8080\\n"
    error_message = "default port should render as 8080"
  }
}

run "rejects_privileged_port" {
  command = plan
  variables {
    port = 80
  }
  expect_failures = [var.port]
}

run "writes_the_file" {            # command defaults to apply
  assert {
    condition     = fileexists(output.config_path)
    error_message = "config file was not written"
  }
}`,
    },
    {
      id: 'results',
      label: 'terraform test',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'pass',
          kind: 'code',
          hug: true,
          filename: 'as written',
          label: `  run "renders_default_port"... pass
  run "rejects_privileged_port"... pass
  run "writes_the_file"... pass
tests/web.tftest.hcl... tearing down

Success! 3 passed, 0 failed.`,
        },
        {
          id: 'fail',
          kind: 'code',
          hug: true,
          filename: 'expecting 9090 instead',
          label: `Error: Test assertion failed
    │ Diff:
    │ --- actual
    │ +++ expected
    │ - "port = 8080\\n"
    │ + "port = 9090\\n"`,
        },
      ],
    },
  ],
  edges: [{ source: 'file', target: 'results' }],
}
