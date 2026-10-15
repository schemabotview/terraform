import type { Scene } from '@graphlearning/flow'

// §1 — what a state file holds. Real terraform.tfstate written by 1.16.6 for the chapter's app/
// example, trimmed to one resource binding (…) and condensed onto fewer lines so the structure reads
// at a glance. Keys and values are unchanged.
export const stateFile: Scene = {
  id: 'state-file',
  title: 'What state records',
  flow: 'TB',
  nodes: [
    {
      id: 'tfstate',
      kind: 'code',
      filename: 'terraform.tfstate (excerpt)',
      label: `{
  "version": 4,
  "terraform_version": "1.16.6",
  "serial": 3,
  "lineage": "09290318-c36d-30f7-5d56-29945c083462",
  "outputs": {
    "web_config": { "value": "./out/web.conf", "type": "string" }
  },
  "resources": [
    {
      "mode": "managed",
      "type": "terraform_data",
      "name": "release",
      "provider": "provider[\\"terraform.io/builtin/terraform\\"]",
      "instances": [
        { "attributes": { "id": "00f7d4ee-9950-75d6-93dc-3683b598fd24", … } }
      ]
    },
    …
  ]
}`,
    },
    {
      id: 'parts',
      label: 'Four kinds of record',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'bindings', label: 'Bindings', sub: 'address to object ID', icon: 'link', pattern: 'storage' },
        { id: 'attributes', label: 'Attributes', sub: 'last observed values', icon: 'search', pattern: 'storage' },
        { id: 'outputs', label: 'Outputs', sub: 'for people and readers', icon: 'share', pattern: 'storage' },
        { id: 'metadata', label: 'Metadata', sub: 'serial and lineage', icon: 'hash', pattern: 'storage' },
      ],
    },
  ],
  edges: [{ source: 'tfstate', target: 'parts' }],
}
