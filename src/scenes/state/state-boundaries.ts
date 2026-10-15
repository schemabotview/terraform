import type { Scene } from '@graphlearning/flow'

// §7 — two root modules, two states, one dependency between them. The data block is the taught
// configuration (the emulator endpoint came from a capture-only override); the plan line and the
// state pull are real 1.16.6 output.
export const stateBoundaries: Scene = {
  id: 'state-boundaries',
  title: 'Separate states, explicit dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'roots',
      label: 'Two root modules, two states',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'network', label: 'network', sub: 'shop/network.tfstate', icon: 'network', pattern: 'network' },
        { id: 'app', label: 'app', sub: 'shop/app.tfstate', icon: 'server', pattern: 'service' },
      ],
    },
    {
      id: 'read',
      kind: 'code',
      filename: 'app/network.tf',
      label: `data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket = "shop-tfstate"
    key    = "shop/network.tfstate"
    region = "eu-west-1"
  }
}

resource "terraform_data" "web_subnet" {
  input = cidrsubnet(data.terraform_remote_state.network.outputs.vpc_cidr, 8, 1)
  # plan: + input = "10.0.1.0/24"
}`,
    },
    {
      id: 'exposed',
      kind: 'code',
      filename: 'terraform state pull — the same read access sees everything',
      label: `"input": {
  "value": {
    "admin_note": "break-glass password is in vault path ops/net",
    "cidr": "10.0.0.0/16"
  },`,
    },
  ],
  edges: [
    { source: 'roots', target: 'read', label: 'app reads network outputs' },
    { source: 'read', target: 'exposed', label: 'but the whole state is readable' },
  ],
}
