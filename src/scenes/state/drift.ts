import type { Scene } from '@graphlearning/flow'

// §2 — a hand edit, seen two ways. Both plans are real 1.16.6 + hashicorp/local 2.9.1 output after
// `printf 'port = 9999\n' > out/web.conf`, trimmed to their headline lines (…). local_file reports a
// changed file as deleted: its Read compares checksums and drops the object on a mismatch.
export const drift: Scene = {
  id: 'drift',
  title: 'Drift and refresh-only plans',
  flow: 'TB',
  nodes: [
    {
      id: 'edit',
      kind: 'code',
      filename: 'someone edits the file by hand',
      label: `$ printf 'port = 9999\\n' > out/web.conf`,
    },
    {
      id: 'plans',
      label: 'Two plans, the same drift',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'refresh-only',
          kind: 'code',
          hug: true,
          filename: 'terraform plan -refresh-only — record reality',
          label: `Note: Objects have changed outside of Terraform

  # local_file.web has been deleted
  - resource "local_file" "web" { … }

This is a refresh-only plan, so Terraform will not take any actions to undo
these. If you were expecting these changes then you can apply this plan to
record the updated values in the Terraform state without changing any remote
objects.`,
        },
        {
          id: 'normal',
          kind: 'code',
          hug: true,
          filename: 'terraform plan — restore the configuration',
          label: `  # local_file.web will be created
  + resource "local_file" "web" {
      + content              = <<-EOT
            port = 8080
        EOT
      …
    }

Plan: 1 to add, 0 to change, 0 to destroy.`,
        },
      ],
    },
  ],
  edges: [{ source: 'edit', target: 'plans', label: 'refresh notices' }],
}
