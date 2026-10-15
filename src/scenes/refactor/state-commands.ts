import type { Scene } from '@graphlearning/flow'

// §7 — the state commands, run on local state (1.16.6). Output is verbatim; the backup file name
// carries a timestamp.
export const stateCommands: Scene = {
  id: 'state-commands',
  title: 'State commands',
  flow: 'TB',
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'state surgery — one command at a time',
      label: `$ terraform state mv -dry-run module.web.local_file.config local_file.web
Would move "module.web.local_file.config" to "local_file.web"

$ terraform state rm module.web.local_file.config
Removed module.web.local_file.config
Successfully removed 1 resource instance(s).

$ ls terraform.tfstate*
terraform.tfstate
terraform.tfstate.1792090999.backup
terraform.tfstate.backup

$ terraform state mv -state=restored.tfstate \\
    -state-out=../other/terraform.tfstate \\
    module.web.local_file.config local_file.web
Move "module.web.local_file.config" to "local_file.web"
Successfully moved 1 object(s).`,
    },
    {
      id: 'prefer',
      label: 'Prefer a reviewed plan',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'moved', label: 'moved', sub: 'instead of state mv', icon: 'swap', pattern: 'storage' },
        { id: 'removed', label: 'removed', sub: 'instead of state rm', icon: 'scissors', pattern: 'storage' },
        { id: 'import', label: 'import', sub: 'instead of state push', icon: 'dooropen', pattern: 'storage' },
        { id: 'backup', label: 'Backup first', sub: 'state pull to a file', icon: 'copy', pattern: 'warn' },
      ],
    },
  ],
  edges: [{ source: 'commands', target: 'prefer' }],
}
