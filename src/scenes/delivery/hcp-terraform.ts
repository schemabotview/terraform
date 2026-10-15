import type { Scene } from '@graphlearning/flow'

// §7 — HCP Terraform as a comparison. Not run: app.terraform.io is not reachable from the authoring
// container and no commercial service is needed for this course. The cloud block is illustrative.
export const hcpTerraform: Scene = {
  id: 'hcp-terraform',
  title: 'HCP Terraform and Enterprise',
  flow: 'TB',
  nodes: [
    {
      id: 'cloud',
      kind: 'code',
      filename: 'versions.tf — illustrative, not run',
      label: `terraform {
  cloud {
    organization = "shop"

    workspaces {
      name = "web-prod"
    }
  }
}`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Two things called a workspace',
      headers: ['', 'CLI workspace', 'HCP workspace'],
      values: [
        ['holds', 'one extra state', 'state, variables, settings'],
        ['runs plan and apply', 'where you type', 'remote or local mode'],
        ['credentials', "the caller's", 'stored per workspace'],
        ['access control', 'none of its own', 'teams and permissions'],
        ['run queue and history', 'no', 'yes'],
      ],
    },
  ],
  edges: [{ source: 'cloud', target: 'compare' }],
}
