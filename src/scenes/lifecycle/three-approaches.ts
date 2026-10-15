import type { Scene } from '@graphlearning/flow'

// §1 — three ways to change infrastructure, and what re-running each one does. Left: the three
// approaches. Right: the same second run, imperative versus desired-state. The script is
// illustrative (no real tool's output); the plan text is real Terraform 1.16.6 output.
export const threeApproaches: Scene = {
  id: 'three-approaches',
  title: 'Steps versus desired state',
  flow: 'LR',
  framed: true,
  nodes: [
    {
      id: 'approaches',
      label: 'Three ways to change infrastructure',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'imperative',
          kind: 'list',
          label: 'Imperative script',
          sub: 'how: steps, in order',
          icon: 'terminal',
          pattern: 'warn',
          items: ['create network, then two servers', 'run it again: two more servers'],
        },
        {
          id: 'config-mgmt',
          kind: 'list',
          label: 'Configuration management',
          sub: 'what runs inside a server',
          icon: 'gears',
          pattern: 'service',
          items: ['Ansible, Chef, Puppet', 'assumes the server exists'],
        },
        {
          id: 'desired',
          kind: 'list',
          label: 'Desired-state IaC',
          sub: 'what should exist',
          icon: 'file',
          pattern: 'storage',
          items: ['plan: compare with the record', 'run it again: no changes'],
        },
      ],
    },
    {
      id: 'second-run',
      label: 'Run it a second time',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'script-rerun',
          kind: 'code',
          hug: true,
          filename: 'deploy.sh — illustrative',
          label: `$ ./deploy.sh
creating network app-net ... already exists
creating server web-3 ... done
creating server web-4 ... done
# four servers now, not two`,
        },
        {
          id: 'plan-rerun',
          kind: 'code',
          hug: true,
          filename: 'terraform plan — real output',
          label: `$ terraform plan
terraform_data.release: Refreshing state...

No changes. Your infrastructure matches
the configuration.`,
        },
      ],
    },
  ],
  edges: [{ source: 'approaches', target: 'second-run', label: 'run twice' }],
}
