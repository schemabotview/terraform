import type { Scene } from '@graphlearning/flow'

// §2 — an import block, with the ID right and wrong. Both plans are real 1.16.6 + random 3.9.1 output.
// The wrong one was a genuine mistake made while authoring: fields in the wrong order, accepted.
export const importBlocks: Scene = {
  id: 'import-blocks',
  title: 'Import blocks and provider IDs',
  flow: 'TB',
  nodes: [
    {
      id: 'block',
      kind: 'code',
      filename: 'imports.tf',
      label: `import {
  to = random_integer.port     # destination address
  id = "8080,8000,8999"        # provider-specific: result,min,max
}`,
    },
    {
      id: 'plans',
      label: 'The ID decides what you adopt',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'right',
          kind: 'code',
          hug: true,
          filename: 'id = "8080,8000,8999" — terraform plan',
          label: `  # random_integer.port will be imported
    resource "random_integer" "port" {
        id     = "8080"
        max    = 8999
        min    = 8000
        result = 8080
    }

Plan: 1 to import, 0 to add, 0 to change, 0 to destroy.`,
        },
        {
          id: 'wrong',
          kind: 'code',
          hug: true,
          filename: 'id = "8000,8999,8080" (fields swapped) — also accepted',
          label: `  # random_integer.port will be imported
    resource "random_integer" "port" {
        id     = "8000"
        max    = 8080
        min    = 8999
        result = 8000
    }`,
        },
      ],
    },
  ],
  edges: [{ source: 'block', target: 'plans', label: 'terraform plan' }],
}
