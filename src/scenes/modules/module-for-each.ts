import type { Scene } from '@graphlearning/flow'

// §6 — one module, called once per map entry. Apply headlines, outputs and state list are real 1.16.6
// output (the previous single module.web instance was destroyed in the same apply).
export const moduleForEach: Scene = {
  id: 'module-for-each',
  title: 'Repeated modules',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'main.tf',
      label: `variable "services" {
  type = map(number)
  default = {
    web = 8080
    api = 9090
  }
}

module "service" {
  source   = "./modules/web"
  for_each = var.services

  name = each.key
  port = each.value
}

output "config_paths" {
  value = { for name, m in module.service : name => m.config_path }
}`,
    },
    {
      id: 'result',
      kind: 'code',
      filename: 'terraform apply, then terraform state list',
      label: `config_paths = {
  "api" = "./out/api.conf"
  "web" = "./out/web.conf"
}

$ terraform state list
module.service["api"].local_file.config
module.service["web"].local_file.config`,
    },
  ],
  edges: [{ source: 'config', target: 'result', label: 'keyed by service name' }],
}
