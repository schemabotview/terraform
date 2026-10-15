import type { Scene } from '@graphlearning/flow'

// §4 — the whole first configuration, with the four pieces of HCL grammar named beside it. The code
// is the exact main.tf the rest of the chapter runs (terraform fmt clean on 1.16.6).
export const hclAnatomy: Scene = {
  id: 'hcl-anatomy',
  title: 'Anatomy of main.tf',
  flow: 'TB',
  nodes: [
    {
      id: 'main',
      kind: 'code',
      filename: 'main.tf',
      label: `terraform {
  required_version = "~> 1.16.0"
}

variable "app_version" {
  type    = string
  default = "1.0.0"
}

resource "terraform_data" "release" {
  input = {
    app     = "shop"
    version = var.app_version
  }
}

output "release" {
  value = terraform_data.release.output
}`,
    },
    {
      id: 'grammar',
      label: 'Four pieces of grammar',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'block', label: 'Block', sub: 'type, labels, then { body }', icon: 'braces', pattern: 'service', badge: '01' },
        { id: 'argument', label: 'Argument', sub: 'name = value, inside a body', icon: 'pencil', pattern: 'storage', badge: '02' },
        { id: 'reference', label: 'Reference', sub: 'var.app_version reads a value', icon: 'link', pattern: 'network', badge: '03' },
        { id: 'address', label: 'Address', sub: 'type.name names one resource', icon: 'tag', pattern: 'user', badge: '04' },
      ],
    },
  ],
  edges: [{ source: 'main', target: 'grammar', label: 'reads as' }],
}
