import type { Scene } from '@graphlearning/flow'

// §7 — the escape hatches and where each one stops. The terraform_data block is the chapter's real
// migrate example; the timeouts block validated against hashicorp/aws 6.69.0 (and `resize` did not:
// "An argument named "resize" is not expected here"); the warning is real 1.16.6 output.
export const escapeHatches: Scene = {
  id: 'escape-hatches',
  title: 'Escape hatches',
  flow: 'TB',
  nodes: [
    {
      id: 'hatches',
      label: 'Inside the configuration',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'provisioner',
          kind: 'code',
          hug: true,
          filename: 'terraform_data + local-exec',
          label: `resource "terraform_data" "migrate" {
  triggers_replace = [local_file.db.content]

  provisioner "local-exec" {
    command = "./migrate.sh"
  }
}`,
        },
        {
          id: 'timeouts',
          kind: 'code',
          hug: true,
          filename: 'aws_db_instance (excerpt)',
          label: `resource "aws_db_instance" "shop" {
  # …

  timeouts {
    create = "60m"
    delete = "2h"
  }
}`,
        },
      ],
    },
    {
      id: 'target',
      kind: 'code',
      filename: 'terraform plan -target=local_file.web',
      label: `Warning: Resource targeting is in effect

You are creating a plan with the -target option, which means that the
result of this plan may not represent all of the changes requested by the
current configuration.

The -target option is not for routine use, and is provided only for
exceptional situations such as recovering from errors or mistakes, or when
Terraform specifically suggests to use it as part of an error message.`,
    },
  ],
  edges: [{ source: 'hatches', target: 'target', label: 'and from the command line' }],
}
