import type { Scene } from '@graphlearning/flow'

// §8 — expressions that generate values, and the one construct that generates nested blocks. The
// console results and the plan excerpt are real 1.16.6 + hashicorp/aws 6.69.0 output (plan trimmed to
// the generated ingress attributes that differ; trimmed lines are marked with a # … comment).
export const forAndDynamic: Scene = {
  id: 'for-and-dynamic',
  title: 'Conditionals, for and dynamic',
  flow: 'TB',
  nodes: [
    {
      id: 'top',
      label: 'Generating values, generating blocks',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'for-exprs',
          kind: 'code',
          hug: true,
          filename: 'terraform console',
          label: `> var.environment.name == "prod" ? 3 : 1
1
> [for n in local.web_names : upper(n)]
["SHOP-STAGING-WEB-1", "SHOP-STAGING-WEB-2"]
> {for i, n in local.web_names : n => i}
{ "shop-staging-web-1" = 0, "shop-staging-web-2" = 1 }
> [for n in local.web_names : n if endswith(n, "-2")]
["shop-staging-web-2"]
> "%{ for n in local.web_names }\${n};%{ endfor }"
"shop-staging-web-1;shop-staging-web-2;"`,
        },
        {
          id: 'dynamic',
          kind: 'code',
          hug: true,
          filename: 'network.tf',
          label: `resource "aws_security_group" "web" {
  name = "\${local.name_prefix}-web"

  dynamic "ingress" {
    for_each = var.web_ports   # { http = 80, https = 443 }
    content {
      description = ingress.key
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}`,
        },
      ],
    },
    {
      id: 'plan',
      kind: 'code',
      filename: 'terraform plan — one ingress block per map entry',
      label: `  + resource "aws_security_group" "web" {
      + ingress                = [
          + {
              + description      = "http"
              + from_port        = 80
              + protocol         = "tcp"
              + to_port          = 80
                # … cidr_blocks and defaults trimmed
            },
          # … second block trimmed: "https", 443
        ]
      + name                   = "shop-staging-web"
    }`,
    },
  ],
  edges: [{ source: 'dynamic', target: 'plan', label: 'expands to' }],
}
