import type { Scene } from '@graphlearning/flow'

// §5 — values that are never written down. All output is real: 1.16.6 for the ephemeral variable
// (applied locally), and hashicorp/aws 6.69.0 + random 3.9.1 for the write-only plan (offline). The
// write-only card condenses the configuration above its plan lines.
export const ephemeral: Scene = {
  id: 'ephemeral',
  title: 'Ephemeral values and write-only arguments',
  flow: 'TB',
  nodes: [
    {
      id: 'variable',
      label: 'An ephemeral variable',
      pattern: 'storage',
      cols: 2,
      children: [
        {
          id: 'used',
          kind: 'code',
          hug: true,
          filename: 'used by a provisioner — allowed',
          label: `variable "db_password" {
  type      = string
  sensitive = true
  ephemeral = true
}

# after apply:
#   terraform.tfstate  0 occurrence(s)
#   show -json tfplan  0 occurrence(s)`,
        },
        {
          id: 'refused',
          kind: 'code',
          hug: true,
          filename: 'used as terraform_data input — refused',
          label: `Error: Invalid use of ephemeral value

Ephemeral values are not valid for "input",
because it is not a write-only attribute and
must be persisted to state.`,
        },
      ],
    },
    {
      id: 'write-only',
      kind: 'code',
      filename: 'ephemeral resource into a write-only argument — terraform plan',
      label: `ephemeral "random_password" "db" { length = 24 }

resource "aws_db_instance" "shop" {
  # …
  password_wo         = ephemeral.random_password.db.result
  password_wo_version = 1
}

ephemeral.random_password.db: Opening...
ephemeral.random_password.db: Closing complete after 0s
      + password_wo                           = (write-only attribute)
      + password_wo_version                   = 1`,
    },
  ],
  edges: [{ source: 'variable', target: 'write-only', label: 'for resource arguments' }],
}
