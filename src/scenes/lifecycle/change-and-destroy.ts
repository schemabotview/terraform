import type { Scene } from '@graphlearning/flow'

// §6 — the same resource changed, then planned for destruction. Both cards are real 1.16.6 plans,
// trimmed of the preamble; the warn card is the consequence a plan cannot show.
export const changeAndDestroy: Scene = {
  id: 'change-and-destroy',
  title: 'Change and destroy',
  flow: 'TB',
  nodes: [
    {
      id: 'change',
      kind: 'code',
      filename: 'terraform plan -var app_version=1.1.0',
      label: `  # terraform_data.release will be updated in-place
  ~ resource "terraform_data" "release" {
        id     = "373ff189-bc9d-03fe-9d72-8e81f310bbba"
      ~ input  = {
          ~ version = "1.0.0" -> "1.1.0"
            # (1 unchanged attribute hidden)
        }
      ~ output = { … } -> (known after apply)
    }

Plan: 0 to add, 1 to change, 0 to destroy.`,
    },
    {
      id: 'destroy',
      kind: 'code',
      filename: 'terraform plan -destroy',
      label: `  # terraform_data.release will be destroyed
  - resource "terraform_data" "release" {
      - id     = "373ff189-bc9d-03fe-9d72-8e81f310bbba" -> null
      - input  = { … } -> null
      - output = { … } -> null
    }

Plan: 0 to add, 0 to change, 1 to destroy.`,
    },
    {
      id: 'after',
      label: 'What the plan cannot show',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'health', label: 'Apply succeeded', sub: 'does not mean the app is healthy', icon: 'gauge', pattern: 'warn' },
        { id: 'data', label: 'Destroyed data', sub: 'a database is gone, not paused', icon: 'trash', pattern: 'warn' },
      ],
    },
  ],
  edges: [
    { source: 'change', target: 'destroy', label: 'later' },
    { source: 'destroy', target: 'after' },
  ],
}
