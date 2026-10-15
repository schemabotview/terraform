import type { Scene } from '@graphlearning/flow'

// §4 — the same change promoted from staging to prod in one commit. Both plans are real 1.16.6 output
// (prod trimmed to its changed lines).
export const promotion: Scene = {
  id: 'promotion',
  title: 'Environment promotion',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'One module version, one environment at a time',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'staging', label: 'staging', sub: 'applied first, then observed', icon: 'server', pattern: 'network', badge: '1' },
        { id: 'prod', label: 'prod', sub: 'same change, own approval', icon: 'lock', pattern: 'warn', badge: '2' },
      ],
    },
    {
      id: 'plans',
      kind: 'code',
      filename: 'commit "promote port 9090 to prod" — both environments planned',
      label: `$ terraform -chdir=envs/staging plan
No changes. Your infrastructure matches the configuration.

$ terraform -chdir=envs/prod plan -out=tfplan
          - port = 8080
          + port = 9090
Plan: 1 to add, 0 to change, 1 to destroy.`,
    },
    {
      id: 'serial',
      label: 'One run at a time per state',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'queue', label: 'Queue runs', sub: 'per environment in CI', icon: 'clock', pattern: 'storage' },
        { id: 'wait', label: 'Wait for locks', sub: '-lock-timeout=5m', icon: 'lock', pattern: 'storage' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'plans' },
    { source: 'plans', target: 'serial' },
  ],
}
