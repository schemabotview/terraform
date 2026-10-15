import type { Scene } from '@graphlearning/flow'

// §1 — extracting local_file.web_config into modules/web. The plan is real
// 1.16.6 + hashicorp/local 2.9.1 output, trimmed to their headline lines (…).
export const childModule: Scene = {
  id: 'child-module',
  title: 'Root and child modules',
  flow: 'TB',
  nodes: [
    {
      id: 'call',
      kind: 'code',
      filename: 'main.tf — the root module calls a child',
      label: `module "web" {
  source = "./modules/web"

  name = "web"
  port = 8080
}

output "web_config" {
  value = module.web.config_path
}`,
    },
    {
      id: 'plan',
      kind: 'code',
      filename: 'terraform plan — same file, new address',
      label: `  # local_file.web_config will be destroyed
  # (because local_file.web_config is not in configuration)
  - resource "local_file" "web_config" { … }

  # module.web.local_file.config will be created
  + resource "local_file" "config" { … }

Plan: 1 to add, 0 to change, 1 to destroy.`,
    },
    {
      id: 'facts',
      label: 'What a child module is',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'same-state', label: 'Same state', sub: "the root's state file", icon: 'database', pattern: 'storage' },
        { id: 'prefix', label: 'New prefix', sub: 'module.web. on every address', icon: 'tag', pattern: 'storage' },
      ],
    },
  ],
  edges: [
    { source: 'call', target: 'plan', label: 'without moved' },
    { source: 'plan', target: 'facts' },
  ],
}
