import type { Scene } from '@graphlearning/flow'

// §5 — how accounts, regions and clouds map onto state and providers. Teaching material: the alias
// mechanism itself was run in chapters 2 and 5.
export const boundaries: Scene = {
  id: 'boundaries',
  title: 'Accounts, regions and clouds',
  flow: 'TB',
  nodes: [
    {
      id: 'layout',
      label: 'One state per account and environment',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'staging-acct', label: 'staging account', sub: 'eu-west-1 + us-west-2', icon: 'awscloud', pattern: 'network' },
        { id: 'prod-acct', label: 'prod account', sub: 'eu-west-1 + us-west-2', icon: 'awscloud', pattern: 'warn' },
        { id: 'shared-acct', label: 'shared services', sub: 'DNS, state buckets', icon: 'globe', pattern: 'storage' },
        { id: 'other-cloud', label: 'another cloud', sub: 'its own provider and state', icon: 'cloud', pattern: 'external' },
      ],
    },
    {
      id: 'rules',
      kind: 'table',
      label: 'What crosses a boundary, and how',
      headers: ['boundary', 'in configuration', 'shares'],
      values: [
        ['region', 'provider alias or region argument', 'state, if one owner'],
        ['account', 'provider per role', 'nothing: separate state'],
        ['cloud', 'a different provider', 'only published values'],
      ],
    },
  ],
  edges: [{ source: 'layout', target: 'rules' }],
}
