import type { Scene } from '@graphlearning/flow'

// §2 — a dependency Terraform cannot see, and the two ways to fix it. Both outcomes are real 1.16.6
// + hashicorp/local 2.9.1 runs of this configuration (plan output trimmed to the lines that differ).
export const hiddenDependency: Scene = {
  id: 'hidden-dependency',
  title: 'Hidden dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'main.tf',
      label: `resource "local_file" "web" {
  filename = "\${path.module}/out/web.conf"
  content  = "port = 8080\\n"
}

# Reads the same file by path: a string, not a reference.
data "local_file" "web_conf" {
  filename = "\${path.module}/out/web.conf"

  depends_on = [local_file.web]   # the fix, when nothing can be referenced
}`,
    },
    {
      id: 'outcomes',
      label: 'Plan, without and with depends_on',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'without',
          kind: 'code',
          hug: true,
          filename: 'without — read too early',
          label: `data.local_file.web_conf: Reading...

Error: Read local file data source error

The file at given path cannot be read.

+Original Error: open ./out/web.conf: no such file or directory`,
        },
        {
          id: 'with',
          kind: 'code',
          hug: true,
          filename: 'with — read during apply',
          label: `  # data.local_file.web_conf will be read during apply
  # (depends on a resource or a module with changes pending)
 <= data "local_file" "web_conf" {
      + content              = (known after apply)
        # … other attributes trimmed`,
        },
      ],
    },
    {
      id: 'cycle',
      kind: 'code',
      filename: 'terraform validate — web.input = db.id, db.input = web.id',
      label: `Error: Cycle:
  terraform_data.db
  terraform_data.web`,
    },
  ],
  edges: [
    { source: 'config', target: 'outcomes' },
    { source: 'outcomes', target: 'cycle', label: 'and when it loops' },
  ],
}
