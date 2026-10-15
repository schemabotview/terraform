import type { Scene } from '@graphlearning/flow'

// §3 — an unknown value is fine, an unknown key is not. Both errors are real 1.16.6 output, trimmed to
// their first paragraph and re-wrapped to fit (Terraform wraps this prose to the terminal width).
export const unknownValues: Scene = {
  id: 'unknown-values',
  title: 'Unknown values and keys',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'main.tf',
      label: `resource "random_pet" "env" {}

# Unknown VALUE: fine, it is filled in at apply.
resource "terraform_data" "tag" {
  input = random_pet.env.id
}

# Unknown KEY: not fine, Terraform must know how many instances exist.
resource "terraform_data" "web" {
  for_each = toset(["\${random_pet.env.id}-web"])
  input    = each.key
}`,
    },
    {
      id: 'errors',
      label: 'for_each keys must be known, and not sensitive',
      pattern: 'warn',
      cols: 2,
      children: [
        {
          id: 'unknown-key',
          kind: 'code',
          hug: true,
          filename: 'terraform plan',
          label: `Error: Invalid for_each argument

  │ random_pet.env.id is a string,
  │ known only after apply

The "for_each" set includes values
derived from resource attributes that
cannot be determined until apply`,
        },
        {
          id: 'sensitive-key',
          kind: 'code',
          hug: true,
          filename: 'for_each = var.web_names (sensitive)',
          label: `Error: Invalid for_each argument

  │ var.web_names has a sensitive value

Sensitive values, or values derived
from sensitive values, cannot be used
as for_each arguments.`,
        },
      ],
    },
  ],
  edges: [{ source: 'config', target: 'errors', label: 'terraform plan' }],
}
