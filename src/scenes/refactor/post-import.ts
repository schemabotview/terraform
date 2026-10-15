import type { Scene } from '@graphlearning/flow'

// §4 — after the import is applied. All three cards are real 1.16.6 + random 3.9.1 output: the import
// apply, an edit that changed max to 8099, and the plan once the configuration matched again.
export const postImport: Scene = {
  id: 'post-import',
  title: 'Post-import plans',
  flow: 'TB',
  nodes: [
    {
      id: 'applied',
      kind: 'code',
      filename: 'terraform apply',
      label: `random_integer.port: Importing... [id=8080,8000,8999]
random_integer.port: Import complete [id=8080,8000,8999]

Apply complete! Resources: 1 imported, 0 added, 0 changed, 0 destroyed.`,
    },
    {
      id: 'reconcile',
      label: 'Then make configuration and object agree',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'edited',
          kind: 'code',
          hug: true,
          filename: 'tidied, with max edited to 8099 — terraform plan',
          label: `  # random_integer.port must be replaced
-/+ resource "random_integer" "port" {
      ~ max    = 8999 -> 8099 # forces replacement
        # (1 unchanged attribute hidden)

Plan: 1 to add, 0 to change, 1 to destroy.`,
        },
        {
          id: 'matched',
          kind: 'code',
          hug: true,
          filename: 'max back to 8999 — terraform plan',
          label: `No changes. Your infrastructure matches the configuration.`,
        },
      ],
    },
  ],
  edges: [{ source: 'applied', target: 'reconcile', label: 'imported is not finished' }],
}
