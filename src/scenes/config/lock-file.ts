import type { Scene } from '@graphlearning/flow'

// §3 — the lock file and the two ways init treats it. All three cards are real 1.16.6 output
// (hashicorp/random, 3.8.1 → 3.9.1). The providers came from a local filesystem mirror, which is why
// the lock holds one h1: hash; a registry install also records zh: hashes for every platform. The
// two init cards are trimmed to their provider lines and wrapped to fit; the wording is unchanged.
export const lockFile: Scene = {
  id: 'lock-file',
  title: 'The dependency lock file',
  flow: 'TB',
  nodes: [
    {
      id: 'lock',
      kind: 'code',
      filename: '.terraform.lock.hcl — commit this file',
      label: `# This file is maintained automatically by "terraform init".
# Manual edits may be lost in future updates.

provider "registry.terraform.io/hashicorp/random" {
  version     = "3.9.1"
  constraints = "~> 3.8"
  hashes = [
    "h1:g40qr7yDmIpaur4SsK5BcOda3HSo1RJ6zHVMqN4EJ+0=",
  ]
}`,
    },
    {
      id: 'runs',
      label: 'Constraint widened to "~> 3.8", then init twice',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'reuse',
          kind: 'code',
          hug: true,
          filename: 'terraform init',
          label: `- Reusing previous version of
  hashicorp/random from the
  dependency lock file
- Using previously-installed
  hashicorp/random v3.8.1`,
        },
        {
          id: 'upgrade',
          kind: 'code',
          hug: true,
          filename: 'terraform init -upgrade',
          label: `- Finding hashicorp/random versions
  matching "~> 3.8"...
- Installing hashicorp/random v3.9.1...
- Installed hashicorp/random v3.9.1`,
        },
      ],
    },
    {
      id: 'limits',
      label: 'What the lock does not cover',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'modules', label: 'Modules', sub: 'pin them with version =', icon: 'package', pattern: 'warn' },
        { id: 'platforms', label: 'Other platforms', sub: 'need their own hashes', icon: 'cpu', pattern: 'warn' },
      ],
    },
  ],
  edges: [
    { source: 'lock', target: 'runs', label: 'read by init' },
    { source: 'runs', target: 'limits' },
  ],
}
