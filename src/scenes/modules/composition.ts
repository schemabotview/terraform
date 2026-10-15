import type { Scene } from '@graphlearning/flow'

// §5 — the app module takes a network instead of creating one. The plan lines are real 1.16.6
// output for this configuration (terraform_data stand-ins), trimmed to the subnet inputs.
export const composition: Scene = {
  id: 'composition',
  title: 'Composition and dependency inversion',
  flow: 'TB',
  nodes: [
    {
      id: 'wiring',
      label: 'One app module, two callers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'network', label: 'network module', sub: 'creates a network', icon: 'network', pattern: 'network' },
        { id: 'existing', label: 'existing network', sub: 'made elsewhere', icon: 'building', pattern: 'external' },
        { id: 'app', label: 'app', sub: 'network = module output', icon: 'server', pattern: 'service' },
        { id: 'app-legacy', label: 'app_legacy', sub: 'network = literal IDs', icon: 'server', pattern: 'service' },
      ],
    },
    {
      id: 'interface',
      kind: 'code',
      filename: 'modules/app — asks for a network, never builds one',
      label: `variable "network" {
  description = "An existing network. The app module never creates one."
  type = object({
    id   = string
    cidr = string
  })
}`,
    },
    {
      id: 'plan',
      kind: 'code',
      filename: 'terraform plan',
      label: `  # module.app.terraform_data.subnet will be created
          + cidr       = (known after apply)
          + network_id = (known after apply)
  # module.app_legacy.terraform_data.subnet will be created
          + cidr       = "172.31.1.0/24"
          + network_id = "vpc-0a1b2c3d4e5f67890"
  # module.network.terraform_data.vpc will be created

Plan: 3 to add, 0 to change, 0 to destroy.`,
    },
  ],
  edges: [
    { source: 'wiring', target: 'interface' },
    { source: 'interface', target: 'plan', label: 'both callers satisfy it' },
  ],
}
