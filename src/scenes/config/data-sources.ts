import type { Scene } from '@graphlearning/flow'

// §9 — reading something Terraform does not manage. data.tf is shop/'s; the plan lines are real
// 1.16.6 + hashicorp/local 2.9.1 output.
export const dataSources: Scene = {
  id: 'data-sources',
  title: 'Data sources',
  flow: 'TB',
  nodes: [
    {
      id: 'data',
      kind: 'code',
      filename: 'data.tf',
      label: `data "local_file" "release_notes" {
  filename = "\${path.module}/notes/RELEASE.txt"
}

resource "terraform_data" "release" {
  input = {
    notes = trimspace(data.local_file.release_notes.content)
  }
}`,
    },
    {
      id: 'plan',
      kind: 'code',
      filename: 'terraform plan',
      label: `data.local_file.release_notes: Reading...
data.local_file.release_notes: Read complete after 0s [id=bea18f8d…]

  # terraform_data.release will be created
  + resource "terraform_data" "release" {
      + input  = {
          + notes = "v1.1.0: faster checkout"
        }
    }`,
    },
    {
      id: 'contrast',
      label: 'Two kinds of block',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'managed', label: 'resource', sub: 'Terraform owns it: create, update, delete', icon: 'boxes', pattern: 'service' },
        { id: 'read-only', label: 'data', sub: 'someone else owns it: read only', icon: 'search', pattern: 'external' },
      ],
    },
  ],
  edges: [
    { source: 'data', target: 'plan', label: 'read during plan' },
    { source: 'plan', target: 'contrast' },
  ],
}
