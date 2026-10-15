import type { Scene } from '@graphlearning/flow'

// §4 — upgrading the four moving parts. The CLI check is real: state applied by 1.17.0-rc2
// (checksum-verified) and then planned by 1.16.6; the provider upgrade is chapter 2's real init.
export const upgrades: Scene = {
  id: 'upgrades',
  title: 'Upgrade strategy',
  flow: 'TB',
  nodes: [
    {
      id: 'order',
      kind: 'table',
      label: 'One moving part at a time',
      headers: ['part', 'how', 'evidence'],
      values: [
        ['providers', 'widen the range, init -upgrade', 'lock diff and a plan'],
        ['modules', 'bump the version or ref', 'plan in staging first'],
        ['Terraform CLI', 'change the pinned version in CI', 'plan shows no changes'],
        ['backend', 'init -migrate-state', 'plan shows no changes'],
      ],
    },
    {
      id: 'runs',
      label: 'Two real upgrades',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'provider',
          kind: 'code',
          hug: true,
          filename: 'terraform init -upgrade — chapter 2',
          label: `- Finding hashicorp/random versions matching "~> 3.8"...
- Installing hashicorp/random v3.9.1...`,
        },
        {
          id: 'cli',
          kind: 'code',
          hug: true,
          filename: 'applied with 1.17.0-rc2, then planned with 1.16.6',
          label: `state written by 1.17.0

$ terraform version   # Terraform v1.16.6
$ terraform plan
No changes. Your infrastructure matches the configuration.`,
        },
      ],
    },
  ],
  edges: [{ source: 'order', target: 'runs' }],
}
