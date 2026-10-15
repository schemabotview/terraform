import type { Scene } from '@graphlearning/flow'

// §1 — the four identities in a Terraform deployment and what each should be able to do. A teaching
// matrix, not a run.
export const identities: Scene = {
  id: 'identities',
  title: 'Four identities',
  flow: 'TB',
  nodes: [
    {
      id: 'who',
      label: 'Who is acting, in one apply',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'human', label: 'People', sub: 'write code, review plans', icon: 'users', pattern: 'user', badge: '01' },
        { id: 'ci', label: 'CI runner', sub: 'runs plan and apply', icon: 'workflow', pattern: 'service', badge: '02' },
        { id: 'provider', label: 'Provider', sub: 'calls the cloud API', icon: 'plug', pattern: 'network', badge: '03' },
        { id: 'backend', label: 'Backend', sub: 'reads and writes state', icon: 'database', pattern: 'storage', badge: '04' },
      ],
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'What each should be allowed',
      headers: ['identity', 'read plans', 'write state', 'change infra'],
      values: [
        ['person, day to day', 'yes', 'no', 'no'],
        ['CI, plan job', 'yes', 'lock only', 'no'],
        ['CI, apply job', 'yes', 'yes', 'yes, one env'],
        ['person, break glass', 'yes', 'audited', 'audited'],
      ],
    },
  ],
  edges: [{ source: 'who', target: 'matrix' }],
}
