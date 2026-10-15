import type { Scene } from '@graphlearning/flow'

// §3 — the four things a beginner calls "the infrastructure", kept apart. Both code cards are the
// real files from the 1.16.6 run the course uses (state trimmed to the binding, marked with …).
export const fourLayers: Scene = {
  id: 'four-layers',
  title: 'Configuration, state, observation, reality',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: '① configuration — main.tf (what you want)',
      label: `resource "terraform_data" "release" {
  input = {
    app     = "shop"
    version = var.app_version
  }
}`,
    },
    {
      id: 'state',
      kind: 'code',
      filename: '② state binding — terraform.tfstate (what was recorded)',
      label: `"mode": "managed",
"type": "terraform_data",
"name": "release",
"instances": [{
  "attributes": {
    "id": "373ff189-bc9d-03fe-9d72-8e81f310bbba",
    "input":  { "value": { "app": "shop", "version": "1.0.0" } },
    "output": { "value": { "app": "shop", "version": "1.0.0" } }
  } … }]`,
    },
    {
      id: 'outside',
      label: 'Outside the files',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'observed', label: 'Observed attributes', sub: 'read back on refresh', icon: 'search', pattern: 'network' },
        { id: 'real', label: 'Real object', sub: 'can be changed by hand', icon: 'server', pattern: 'external' },
      ],
    },
  ],
  edges: [
    { source: 'config', target: 'state', label: 'apply records' },
    { source: 'state', target: 'outside', label: 'refresh compares' },
  ],
}
