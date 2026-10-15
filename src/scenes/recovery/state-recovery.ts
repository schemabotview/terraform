import type { Scene } from '@graphlearning/flow'

// §3 — state safeguards and their limits. All output is real 1.16.6: state push refusals (local
// state), a forced push of a backup taken before orders_db was destroyed, and force-unlock used while
// another apply was still running against the S3 backend (S3 emulator).
export const stateRecovery: Scene = {
  id: 'state-recovery',
  title: 'State recovery and safeguards',
  flow: 'TB',
  nodes: [
    {
      id: 'refused',
      kind: 'code',
      filename: 'terraform state push — the safeguards',
      label: `$ terraform state push backup.tfstate
Failed to write state: cannot import state with serial 3 over newer state with serial 5

$ terraform state push ../other.tfstate
Failed to write state: cannot import state with lineage "f2b348c0-…" over
unrelated state with lineage "cb7fcfbd-…"`,
    },
    {
      id: 'limits',
      label: 'Overriding them',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'forced',
          kind: 'code',
          hug: true,
          filename: 'state push -force backup.tfstate — the record, not the data',
          label: `$ terraform state list
local_file.orders_db
local_file.web
$ ls -A data/                       # empty: the database is still gone
$ terraform plan
  # local_file.orders_db will be created`,
        },
        {
          id: 'unlock',
          kind: 'code',
          hug: true,
          filename: 'force-unlock while writer A is still applying',
          label: `$ terraform force-unlock -force 66f3a891-…
Terraform state has been successfully unlocked!

writer B: Apply complete! Resources: 2 added, 1 changed, 2 destroyed.
writer A: terraform_data.migrate: Creation complete after 15s
writer A: Error: Error releasing the state lock`,
        },
      ],
    },
  ],
  edges: [{ source: 'refused', target: 'limits' }],
}
