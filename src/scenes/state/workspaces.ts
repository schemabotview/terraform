import type { Scene } from '@graphlearning/flow'

// §8 — CLI workspaces against the S3 backend: real 1.16.6 output and the object keys they produced
// (listed from the S3 emulator).
export const workspaces: Scene = {
  id: 'workspaces',
  title: 'CLI workspaces',
  flow: 'TB',
  nodes: [
    {
      id: 'new',
      kind: 'code',
      filename: 'terraform workspace new staging',
      label: `Created and switched to workspace "staging"!

You're now on a new, empty workspace. Workspaces isolate their state,
so if you run "terraform plan" Terraform will not see any existing state
for this configuration.

$ terraform workspace list
  default
* staging

# objects in the one bucket, with the one set of credentials:
shop/app.tfstate
env:/staging/shop/app.tfstate`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'What each approach actually separates',
      headers: ['', 'CLI workspaces', 'separate backends'],
      values: [
        ['state', 'separate', 'separate'],
        ['configuration', 'shared', 'can differ'],
        ['backend and bucket', 'shared', 'separate'],
        ['credentials', 'shared', 'separate'],
        ['wrong target', 'one select away', 'a different directory'],
      ],
    },
  ],
  edges: [{ source: 'new', target: 'compare' }],
}
