import type { Scene } from '@graphlearning/flow'

// §4 — one provider, two configurations. providers.tf and main.tf are the chapter's shop/ files; the
// error is real 1.16.6 + hashicorp/aws 6.69.0 output from `terraform plan` with no credentials set.
export const providerConfig: Scene = {
  id: 'provider-config',
  title: 'Provider configuration and aliases',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'providers.tf + main.tf (excerpt)',
      label: `provider "aws" {
  region = var.region           # eu-west-1
}

provider "aws" {
  alias  = "dr"
  region = "us-west-2"
}

resource "aws_s3_bucket" "assets_replica" {
  provider = aws.dr             # not the default
  bucket   = "\${local.name_prefix}-assets-replica"
}`,
    },
    {
      id: 'configs',
      label: 'Two configurations of hashicorp/aws',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'default', label: 'aws', sub: 'default · eu-west-1', icon: 's3', pattern: 'network' },
        { id: 'dr', label: 'aws.dr', sub: 'alias · us-west-2', icon: 's3', pattern: 'network' },
      ],
    },
    {
      id: 'no-creds',
      kind: 'code',
      filename: 'terraform plan — no credentials in the environment',
      label: `Error: No valid credential sources found

  with provider["registry.terraform.io/hashicorp/aws"].dr,
  on providers.tf line 5, in provider "aws":
   5: provider "aws" {`,
    },
  ],
  edges: [
    { source: 'config', target: 'configs', label: 'configures' },
    { source: 'configs', target: 'no-creds', label: 'credentials?' },
  ],
}
