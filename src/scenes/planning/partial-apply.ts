import type { Scene } from '@graphlearning/flow'

// §8 — an apply that fails partway, and a saved plan that goes stale. All three cards are real 1.16.6
// output from the chapter's partial/ example (migrate.sh exits 1 on the first run).
export const partialApply: Scene = {
  id: 'partial-apply',
  title: 'When apply fails partway',
  flow: 'TB',
  nodes: [
    {
      id: 'apply',
      kind: 'code',
      filename: 'terraform apply tfplan — Plan: 3 to add',
      label: `local_file.web: Creating...
local_file.db: Creating...
local_file.web: Creation complete after 0s [id=c4a8ceac…]
local_file.db: Creation complete after 0s [id=f44ccb4d…]
terraform_data.migrate: Creating...
terraform_data.migrate: Provisioning with 'local-exec'...
terraform_data.migrate (local-exec): migrating schema...
terraform_data.migrate (local-exec): error: connection refused

Error: local-exec provisioner error`,
    },
    {
      id: 'after',
      label: 'Afterwards',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'kept',
          kind: 'code',
          hug: true,
          filename: 'nothing rolled back',
          label: `$ ls out/
db.conf  web.conf

$ terraform plan
  # terraform_data.migrate is tainted, so must be replaced
Plan: 1 to add, 0 to change, 1 to destroy.`,
        },
        {
          id: 'stale',
          kind: 'code',
          hug: true,
          filename: 'terraform apply old.tfplan',
          label: `Error: Saved plan is stale

The given plan file can no longer be
applied because the state was changed
by another operation after the plan
was created.`,
        },
      ],
    },
  ],
  edges: [{ source: 'apply', target: 'after', label: 'exit status 1' }],
}
