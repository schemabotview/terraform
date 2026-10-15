import type { Scene } from '@graphlearning/flow'

// §6 — two ways to stop managing local_file.api. Both plans are real 1.16.6 output; the ls is after
// applying the removed block.
export const removedBlocks: Scene = {
  id: 'removed-blocks',
  title: 'removed blocks',
  flow: 'TB',
  nodes: [
    {
      id: 'deleted',
      kind: 'code',
      filename: 'resource block deleted — terraform plan',
      label: `  # local_file.api will be destroyed
  # (because local_file.api is not in configuration)

Plan: 0 to add, 0 to change, 1 to destroy.`,
    },
    {
      id: 'handoff',
      label: 'With a removed block instead',
      pattern: 'storage',
      cols: 1,
      children: [
        {
          id: 'block',
          kind: 'code',
          hug: true,
          filename: 'main.tf',
          label: `removed {
  from = local_file.api

  lifecycle {
    destroy = false
  }
}`,
        },
        {
          id: 'plan',
          kind: 'code',
          hug: true,
          filename: 'terraform plan, apply, then ls out/',
          label: ` # local_file.api will no longer be managed by Terraform, but will not be destroyed
 # (destroy = false is set in the configuration)

Plan: 0 to add, 0 to change, 0 to destroy.

Warning: Some objects will no longer be managed by Terraform

$ ls out/
api.conf  web.conf`,
        },
      ],
    },
  ],
  edges: [{ source: 'deleted', target: 'handoff', label: 'keep the object' }],
}
