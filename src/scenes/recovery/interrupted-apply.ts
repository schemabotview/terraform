import type { Scene } from '@graphlearning/flow'

// §2 — an apply interrupted with Ctrl-C (SIGINT) six seconds in, during a 20-second migration.
// Real 1.16.6 output, trimmed to the lines that matter (…).
export const interruptedApply: Scene = {
  id: 'interrupted-apply',
  title: 'Interrupted applies',
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      kind: 'code',
      filename: 'terraform apply — interrupted',
      label: `local_file.web: Creation complete after 0s [id=c4a8ceac…]
terraform_data.db_migration: Provisioning with 'local-exec'...
terraform_data.db_migration (local-exec): migrating...
Interrupt received.
Please wait for Terraform to exit or data loss may occur.
Gracefully shutting down...
Stopping operation...
Error: execution halted
Error running command 'echo migrating...; sleep 20; echo done': signal:
killed. Output: migrating...`,
    },
    {
      id: 'after',
      label: 'Then observe, before doing anything else',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'state',
          kind: 'code',
          hug: true,
          filename: 'terraform state list, ls out/, terraform plan',
          label: `local_file.web
terraform_data.db_migration
web.conf

  # local_file.api will be created
  # terraform_data.db_migration is tainted, so must be replaced
Plan: 2 to add, 0 to change, 1 to destroy.`,
        },
      ],
    },
    {
      id: 'unknown',
      label: 'What the plan cannot tell you',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'half', label: 'Half a migration', sub: 'did it change the schema?', icon: 'database', pattern: 'warn' },
        { id: 'rerun', label: 'Safe to re-run?', sub: 'only if it is idempotent', icon: 'repeat', pattern: 'warn' },
      ],
    },
  ],
  edges: [
    { source: 'log', target: 'after' },
    { source: 'after', target: 'unknown' },
  ],
}
