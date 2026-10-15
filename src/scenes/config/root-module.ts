import type { Scene } from '@graphlearning/flow'

// §1 — one directory, one configuration. The error card is real Terraform 1.16.6 output from adding
// a second `variable "region"` in another file of the chapter's `shop/` directory.
export const rootModule: Scene = {
  id: 'root-module',
  title: 'One directory, one configuration',
  flow: 'TB',
  nodes: [
    {
      id: 'loaded',
      label: 'shop/ — every .tf file, read as one',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'versions', label: 'versions.tf', sub: 'CLI and providers', icon: 'tag', pattern: 'storage' },
        { id: 'providers', label: 'providers.tf', sub: 'provider settings', icon: 'plug', pattern: 'storage' },
        { id: 'variables', label: 'variables.tf', sub: 'typed inputs', icon: 'braces', pattern: 'storage' },
        { id: 'locals', label: 'locals.tf', sub: 'derived values', icon: 'sigma', pattern: 'storage' },
        { id: 'main', label: 'main.tf', sub: 'resources', icon: 'boxes', pattern: 'storage' },
        { id: 'outputs', label: 'outputs.tf', sub: 'exposed values', icon: 'share', pattern: 'storage' },
      ],
    },
    {
      id: 'beside',
      label: 'Beside the configuration, not part of it',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'tfvars', label: 'Values', sub: 'terraform.tfvars', icon: 'pencil', pattern: 'external' },
        { id: 'lock', label: 'Lock file', sub: '.terraform.lock.hcl', icon: 'lock', pattern: 'external' },
        { id: 'subdir', label: 'Subfolders', sub: 'ignored unless a module', icon: 'folder', pattern: 'external' },
      ],
    },
    {
      id: 'duplicate',
      kind: 'code',
      filename: 'terraform validate — a second variable "region" in extra.tf',
      label: `Error: Duplicate variable declaration

  on variables.tf line 1:
   1: variable "region" {

A variable named "region" was already declared at extra.tf:1,1-18.
Variable names must be unique within a module.`,
    },
  ],
  edges: [
    { source: 'loaded', target: 'beside' },
    { source: 'beside', target: 'duplicate', label: 'one namespace' },
  ],
}
