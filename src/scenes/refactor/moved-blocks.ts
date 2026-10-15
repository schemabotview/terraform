import type { Scene } from '@graphlearning/flow'

// §5 — chapter 5's extraction, done properly, plus a rename. The plan is real 1.16.6 +
// hashicorp/local 2.9.1 output (hash attributes collapsed by Terraform itself).
export const movedBlocks: Scene = {
  id: 'moved-blocks',
  title: 'moved blocks',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'main.tf',
      label: `module "web" {
  source = "./modules/web"
  name   = "web"
}

resource "local_file" "api" {
  filename = "\${path.module}/out/api.conf"
  content  = "port = 9090\\n"
}

moved {
  from = local_file.web_config
  to   = module.web.local_file.config
}

moved {
  from = local_file.api_config
  to   = local_file.api
}`,
    },
    {
      id: 'plan',
      kind: 'code',
      filename: 'terraform plan',
      label: `  # local_file.api_config has moved to local_file.api
    resource "local_file" "api" {
        id                   = "64c6ed53eb2afeec5bab5f7ec0e954f3864bc57e"
        # (10 unchanged attributes hidden)
    }

  # local_file.web_config has moved to module.web.local_file.config
    resource "local_file" "config" {
        id                   = "c4a8ceac89382686b7220243d97f08299b545f08"
        # (10 unchanged attributes hidden)
    }

Plan: 0 to add, 0 to change, 0 to destroy.`,
    },
  ],
  edges: [{ source: 'config', target: 'plan', label: 'same objects, new addresses' }],
}
