import type { Scene } from '@graphlearning/flow'

// §2 — who is responsible for what. Core never speaks to a cloud API; a provider plugin does, with
// credentials the core never owns. The built-in provider is the contrast: no download, no API.
// The four bands are badged 01-04 in call order rather than wired: edges inside a container force a
// single chain, which lays four bands out as one wide strip and leaves two thirds of the pane empty.
export const coreAndProviders: Scene = {
  id: 'core-and-providers',
  title: 'Core, providers and APIs',
  flow: 'LR',
  nodes: [
    {
      id: 'boundaries',
      label: 'Who does what in one apply',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'workdir',
          badge: '01',
          label: 'Your working directory',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'config', label: 'Configuration', sub: '.tf files you write', icon: 'filecode', pattern: 'storage' },
            { id: 'state', label: 'State', sub: 'recorded bindings', icon: 'database', pattern: 'storage' },
            { id: 'lockfile', label: 'Lock file', sub: 'chosen provider versions', icon: 'lock', pattern: 'storage' },
          ],
        },
        {
          id: 'core',
          badge: '02',
          label: 'Terraform core',
          sub: 'the CLI binary',
          pattern: 'service',
          cols: 1,
          children: [
            { id: 'graph', label: 'Builds the graph', sub: 'from references', icon: 'workflow', pattern: 'service' },
            { id: 'diff', label: 'Plans the diff', sub: 'desired vs recorded', icon: 'scale', pattern: 'service' },
            { id: 'record', label: 'Writes state', sub: 'after each change', icon: 'pencil', pattern: 'service' },
          ],
        },
        {
          id: 'providers',
          badge: '03',
          label: 'Provider plugins',
          sub: 'schemas + API calls',
          pattern: 'network',
          cols: 1,
          children: [
            { id: 'builtin', label: 'Built-in provider', sub: 'terraform_data — no API', icon: 'box', pattern: 'network' },
            { id: 'aws', label: 'hashicorp/aws', sub: 'downloaded by init', icon: 'plug', pattern: 'network' },
            { id: 'creds', label: 'Credentials', sub: 'from the environment', icon: 'key', pattern: 'warn' },
          ],
        },
        {
          id: 'remote',
          badge: '04',
          label: 'Remote APIs',
          sub: 'they decide what is real',
          pattern: 'external',
          cols: 1,
          children: [
            { id: 'ec2', label: 'EC2', sub: 'servers', icon: 'ec2', pattern: 'external' },
            { id: 's3', label: 'S3', sub: 'buckets', icon: 's3', pattern: 'external' },
            { id: 'iam', label: 'IAM', sub: 'who may call what', icon: 'iam', pattern: 'external' },
          ],
        },
      ],
    },
  ],
  edges: [],
}
