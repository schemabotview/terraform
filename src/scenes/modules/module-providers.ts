import type { Scene } from '@graphlearning/flow'

// §4 — a module that needs two AWS configurations. All three outputs are real 1.16.6 + hashicorp/aws
// 6.69.0 runs (the plan offline via the chapter-2 capture-only override), trimmed (…).
export const moduleProviders: Scene = {
  id: 'module-providers',
  title: 'Passing providers to modules',
  flow: 'TB',
  nodes: [
    {
      id: 'wiring',
      label: 'The module declares, the caller decides',
      pattern: 'network',
      cols: 2,
      children: [
        {
          id: 'declares',
          kind: 'code',
          hug: true,
          filename: 'modules/replicated-bucket — required_providers',
          label: `aws = {
  source                = "hashicorp/aws"
  version               = ">= 6.0"
  configuration_aliases = [aws.replica]
}`,
        },
        {
          id: 'passes',
          kind: 'code',
          hug: true,
          filename: 'root main.tf',
          label: `module "assets" {
  source = "./modules/replicated-bucket"

  providers = {
    aws         = aws
    aws.replica = aws.dr      # us-west-2
  }

  name = "shop-staging-assets"
}`,
        },
      ],
    },
    {
      id: 'results',
      label: 'With and without the mapping',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'planned',
          kind: 'code',
          hug: true,
          filename: 'terraform plan',
          label: `  # module.assets.aws_s3_bucket.primary will be created
      + region                      = "eu-west-1"
  # module.assets.aws_s3_bucket.replica will be created
      + region                      = "us-west-2"`,
        },
        {
          id: 'missing',
          kind: 'code',
          hug: true,
          filename: 'providers = { … } removed',
          label: `Error: Missing required provider configuration

The child module requires an additional configuration for provider
hashicorp/aws, with the local name "aws.replica".`,
        },
      ],
    },
  ],
  edges: [{ source: 'wiring', target: 'results' }],
}
