import type { Scene } from '@graphlearning/flow'

// §1 — before importing anything. The two outcomes are real 1.16.6 runs (hashicorp/local 2.9.1 and
// random 3.9.1); the aws_s3_bucket row is from that resource's documentation, not run here.
export const adoptionInventory: Scene = {
  id: 'adoption-inventory',
  title: 'Inventory before adoption',
  flow: 'TB',
  nodes: [
    {
      id: 'questions',
      kind: 'list',
      label: 'Inventory first',
      sub: 'answer these before any import',
      icon: 'search',
      pattern: 'storage',
      framed: true,
      items: [
        'What exists, and who created it?',
        'Who should own it from now on?',
        'Is anything else still changing it?',
        'Which state, which root module?',
        'Does its provider support import?',
      ],
    },
    {
      id: 'support',
      kind: 'table',
      label: 'Import support is per resource type',
      headers: ['resource type', 'import', 'ID format'],
      values: [
        ['local_file', 'not implemented', '—'],
        ['random_integer', 'supported', 'result,min,max'],
        ['aws_s3_bucket', 'supported (docs)', 'the bucket name'],
      ],
    },
    {
      id: 'refused',
      kind: 'code',
      filename: 'import { to = local_file.legacy … } — terraform plan',
      label: `Error: Resource Import Not Implemented

This resource does not support import. Please contact the provider developer
for additional information.`,
    },
  ],
  edges: [
    { source: 'questions', target: 'support' },
    { source: 'support', target: 'refused', label: 'local_file row' },
  ],
}
