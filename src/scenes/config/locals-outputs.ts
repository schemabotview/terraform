import type { Scene } from '@graphlearning/flow'

// §6 — derived values and exposed values. Both code cards are real 1.16.6 runs of the chapter's
// outputs example (terraform_data only, applied locally with TF_VAR_db_password set).
export const localsOutputs: Scene = {
  id: 'locals-outputs',
  title: 'Locals and outputs',
  flow: 'TB',
  nodes: [
    {
      id: 'source',
      kind: 'code',
      filename: 'locals.tf + outputs.tf (excerpt)',
      label: `locals {
  name_prefix = "shop-\${var.environment.name}"

  web_names = [
    for i in range(var.environment.instance_count) : "\${local.name_prefix}-web-\${i + 1}"
  ]
}

output "web_names" {
  description = "Names for the web servers, one per instance."
  value       = local.web_names
}

output "db_password" {
  value     = var.db_password
  sensitive = true      # required: the value comes from a sensitive variable
}`,
    },
    {
      id: 'after-apply',
      label: 'After apply',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'output',
          kind: 'code',
          hug: true,
          filename: 'terraform output',
          label: `db_name = "shop-staging-db"
db_password = <sensitive>
web_names = [
  "shop-staging-web-1",
  "shop-staging-web-2",
]`,
        },
        {
          id: 'json',
          kind: 'code',
          hug: true,
          filename: 'terraform output -json db_password',
          label: `"s3cret-example"

# redacted on screen,
# not hidden: state holds
# the same value in plain text`,
        },
      ],
    },
  ],
  edges: [{ source: 'source', target: 'after-apply', label: 'apply' }],
}
