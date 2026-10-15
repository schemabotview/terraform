import type { Scene } from '@graphlearning/flow'

// §6 — matching each claim to evidence that can support it. A teaching table, not a run; the
// policy and health rows name categories of tool rather than any one product.
export const evidenceTypes: Scene = {
  id: 'evidence-types',
  title: 'Choosing evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'Each claim needs its own evidence',
      headers: ['claim', 'evidence'],
      values: [
        ['the syntax and schema are valid', 'fmt, validate'],
        ['inputs meet the contract', 'validation rules'],
        ['the plan has the right shape', 'test, command = plan'],
        ['the logic holds, offline', 'test with mock_provider'],
        ['the real API accepts it', 'test with apply'],
        ['it obeys our rules', 'policy checks on the plan'],
        ['the system actually works', 'health checks, monitoring'],
      ],
    },
    {
      id: 'order',
      label: 'Run them cheapest first',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'every-save', label: 'Every save', sub: 'fmt, validate', icon: 'zap', pattern: 'storage' },
        { id: 'every-change', label: 'Every change', sub: 'plan tests, policy', icon: 'repeat', pattern: 'storage' },
        { id: 'before-release', label: 'Before release', sub: 'apply tests', icon: 'clock', pattern: 'storage' },
      ],
    },
  ],
  edges: [{ source: 'matrix', target: 'order' }],
}
