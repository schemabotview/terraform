import type { Scene } from '@graphlearning/flow'

// §3 — what `sensitive = true` changes, and what it does not. Plan, output and console results are
// real 1.16.6 output (TF_VAR_db_password=Sens1tive-Example).
export const sensitiveValues: Scene = {
  id: 'sensitive-values',
  title: 'Sensitive values and redaction',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'main.tf',
      label: `variable "db_password" {
  type      = string
  sensitive = true
}

resource "terraform_data" "db" {
  input = {
    user     = "shop"
    password = var.db_password
  }
}`,
    },
    {
      id: 'shown',
      label: 'Redacted where Terraform prints it',
      pattern: 'storage',
      cols: 1,
      children: [
        {
          id: 'plan',
          kind: 'code',
          hug: true,
          filename: 'terraform plan',
          label: `      + input  = {
          + password = (sensitive value)
          + user     = "shop"
        }`,
        },
        {
          id: 'disclose',
          kind: 'code',
          hug: true,
          filename: 'terraform console — explicit disclosure',
          label: `> nonsensitive(var.db_password)
"Sens1tive-Example"`,
        },
      ],
    },
  ],
  edges: [{ source: 'config', target: 'shown' }],
}
