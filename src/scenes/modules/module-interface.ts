import type { Scene } from '@graphlearning/flow'

// §2 — modules/web's whole interface. The error is real 1.16.6 output from passing port = 80.
export const moduleInterface: Scene = {
  id: 'module-interface',
  title: 'A module interface',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      kind: 'code',
      filename: 'modules/web/variables.tf + outputs.tf (excerpt)',
      label: `variable "port" {
  description = "Port the service listens on."
  type        = number
  default     = 8080

  validation {
    condition     = var.port >= 1024 && var.port <= 65535
    error_message = "port must be between 1024 and 65535."
  }
}

output "config_path" {
  description = "Path of the rendered configuration file."
  value       = local_file.config.filename
}`,
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'caller passes port = 80, then terraform plan',
      label: `Error: Invalid value for variable

  on main.tf line 5, in module "web":
   5:   port = 80
    ├────────────────
    │ var.port is 80

port must be between 1024 and 65535.

This was checked by the validation rule at modules/web/variables.tf:16,3-13.`,
    },
  ],
  edges: [{ source: 'contract', target: 'error', label: 'checked at the call' }],
}
