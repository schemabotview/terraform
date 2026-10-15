import type { Scene } from '@graphlearning/flow'

// §5 — one plan with both kinds of change, and the full symbol legend. The plan is real 1.16.6 output
// (app_version 1.0.0 → 1.1.0, port 8080 → 9090), with local_file's computed hash lines trimmed.
export const changeActions: Scene = {
  id: 'change-actions',
  title: 'Update or replace',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'code',
      filename: 'terraform plan -var app_version=1.1.0 -var port=9090',
      label: `  # local_file.web must be replaced
-/+ resource "local_file" "web" {
      ~ content              = <<-EOT # forces replacement
          - port = 8080
          + port = 9090
        EOT
      ~ id                   = "c4a8ceac…" -> (known after apply)
        # … six computed hash attributes trimmed
    }

  # terraform_data.release will be updated in-place
  ~ resource "terraform_data" "release" {
        id     = "d6ca74b2-ed88-c8a1-c432-733716ff0a91"
      ~ input  = "1.0.0" -> "1.1.0"
      ~ output = "1.0.0" -> (known after apply)
    }

Plan: 1 to add, 1 to change, 1 to destroy.`,
    },
    {
      id: 'legend',
      kind: 'table',
      label: 'Every action symbol a plan can show',
      headers: ['symbol', 'action'],
      values: [
        ['+', 'create'],
        ['~', 'update in-place: same object, same ID'],
        ['-/+', 'destroy, then create a replacement'],
        ['+/-', 'create the replacement, then destroy'],
        ['-', 'destroy'],
        ['<=', 'read a data source'],
      ],
    },
  ],
  edges: [{ source: 'plan', target: 'legend', label: 'symbols' }],
}
