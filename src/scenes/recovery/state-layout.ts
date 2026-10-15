import type { Scene } from '@graphlearning/flow'

// §6 — the same 900 instances as one state and as three. Destroy-plan sizes and plan times are real
// 1.16.6 runs of terraform_data, which refreshes without any API; with real providers each instance
// is a network call, so the time difference grows.
export const stateLayout: Scene = {
  id: 'state-layout',
  title: 'Monolithic or split state',
  flow: 'TB',
  nodes: [
    {
      id: 'layouts',
      label: 'Same 900 objects, two layouts',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'mono', label: 'One state', sub: '900 instances, one lock', icon: 'boxes', pattern: 'warn' },
        { id: 'split', label: 'Three states', sub: 'network, app, data: 300 each', icon: 'layers', pattern: 'storage' },
      ],
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'terraform plan -destroy, and plan time',
      label: `mono       Plan: 0 to add, 0 to change, 900 to destroy.
split/app  Plan: 0 to add, 0 to change, 300 to destroy.

mono         0.8s     # every plan refreshes all 900
split/app    0.2s`,
    },
    {
      id: 'tradeoffs',
      kind: 'table',
      label: 'The trade-off',
      headers: ['', 'one state', 'several states'],
      values: [
        ['blast radius', 'everything', 'one part'],
        ['plan time and locking', 'grows with size', 'per part'],
        ['cross-references', 'direct', 'published values'],
        ['ordering changes', 'automatic', 'you orchestrate it'],
      ],
    },
  ],
  edges: [
    { source: 'layouts', target: 'evidence' },
    { source: 'evidence', target: 'tradeoffs' },
  ],
}
