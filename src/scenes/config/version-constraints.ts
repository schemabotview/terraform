import type { Scene } from '@graphlearning/flow'

// §2 — the two version requirements a root module declares. versions.tf and the error are real
// (1.16.6); the error came from raising required_version to ">= 1.17.0".
export const versionConstraints: Scene = {
  id: 'version-constraints',
  title: 'Version requirements',
  flow: 'TB',
  nodes: [
    {
      id: 'versions',
      kind: 'code',
      filename: 'versions.tf',
      label: `terraform {
  required_version = "~> 1.16.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.9"
    }
  }
}`,
    },
    {
      id: 'operators',
      kind: 'table',
      label: 'What each constraint allows',
      headers: ['constraint', 'allows'],
      values: [
        ['= 3.8.1', 'exactly 3.8.1'],
        ['>= 3.8', '3.8 and every later version'],
        ['~> 3.8', '3.8 up to, not including, 4.0'],
        ['~> 3.8.0', '3.8.x patch releases only'],
      ],
    },
    {
      id: 'too-old',
      kind: 'code',
      filename: 'terraform init — required_version = ">= 1.17.0"',
      label: `Error: Unsupported Terraform Core version

This configuration does not support Terraform version 1.16.6.`,
    },
  ],
  edges: [
    { source: 'versions', target: 'operators', label: 'version =' },
    { source: 'operators', target: 'too-old', label: 'required_version' },
  ],
}
