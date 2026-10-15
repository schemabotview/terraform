import type { Scene } from '@graphlearning/flow'

// §1 — the graph Terraform built for a four-resource configuration (`terraform graph`, 1.16.6), and
// the real apply log it produced: web and db start together once network exists. Hashes trimmed (…).
export const dependencyGraph: Scene = {
  id: 'dependency-graph',
  title: 'References become a graph',
  flow: 'TB',
  nodes: [
    { id: 'network', label: 'network', sub: 'random_pet', icon: 'network', pattern: 'network' },
    { id: 'web', label: 'web', sub: 'local_file', icon: 'server', pattern: 'service' },
    { id: 'db', label: 'db', sub: 'local_file', icon: 'database', pattern: 'storage' },
    { id: 'monitoring', label: 'monitoring', sub: 'local_file', icon: 'gauge', pattern: 'external' },
    {
      id: 'log',
      kind: 'code',
      filename: 'terraform apply — real order',
      label: `random_pet.network: Creating...
random_pet.network: Creation complete after 0s [id=shop-net-famous-gelding]
local_file.web: Creating...
local_file.db: Creating...
local_file.web: Creation complete after 0s [id=acc8b72c…]
local_file.db: Creation complete after 0s [id=acc8b72c…]
local_file.monitoring: Creating...
local_file.monitoring: Creation complete after 0s [id=1a9c5ca0…]

Apply complete! Resources: 4 added, 0 changed, 0 destroyed.`,
    },
  ],
  edges: [
    { source: 'network', target: 'web', label: 'random_pet.network.id' },
    { source: 'network', target: 'db', label: 'random_pet.network.id' },
    { source: 'web', target: 'monitoring', label: 'filename' },
    { source: 'db', target: 'monitoring', label: 'filename' },
    { source: 'monitoring', target: 'log', dashed: true },
  ],
}
