import type { Scene } from '@graphlearning/flow'

// §3 — where state is stored versus where Terraform runs. The lock info is real 1.16.6 output from
// the S3 backend (an S3 emulator in the authoring container): the state is remote, the run is local.
// The HCP Terraform row is described from its documentation, not run here.
export const localVsRemote: Scene = {
  id: 'local-vs-remote',
  title: 'Where state lives, where runs happen',
  flow: 'TB',
  nodes: [
    {
      id: 'setups',
      kind: 'table',
      label: 'Storage and execution are separate choices',
      headers: ['setup', 'state stored in', 'plan and apply run on'],
      values: [
        ['local backend', 'terraform.tfstate on disk', 'the machine you type on'],
        ['s3 backend', 'an object in a bucket', 'your machine or a CI runner'],
        ['HCP Terraform', 'an HCP workspace', 'HCP runners, or locally'],
      ],
    },
    {
      id: 'who',
      kind: 'code',
      filename: 's3 backend — lock info while an apply runs',
      label: `Lock Info:
  ID:        c998c1a1-1c80-4b12-b40a-7307a2d01d57
  Path:      shop-tfstate/shop/app.tfstate
  Operation: OperationTypeApply
  Who:       root@vm
  Version:   1.16.6`,
    },
    {
      id: 'meaning',
      label: 'Read the two lines that matter',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'path', label: 'Path', sub: 'state is in the bucket', icon: 'database', pattern: 'network' },
        { id: 'whoami', label: 'Who', sub: 'the run is on this machine', icon: 'monitor', pattern: 'network' },
      ],
    },
  ],
  edges: [
    { source: 'setups', target: 'who', label: 's3 row, observed' },
    { source: 'who', target: 'meaning' },
  ],
}
