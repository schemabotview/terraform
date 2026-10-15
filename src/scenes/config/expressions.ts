import type { Scene } from '@graphlearning/flow'

// §7 — expressions evaluated against shop/ in `terraform console` (real 1.16.6 results, one line
// each; multi-line results collapsed onto one line). The group names the four families on show.
export const expressions: Scene = {
  id: 'expressions',
  title: 'Expressions in the console',
  flow: 'TB',
  nodes: [
    {
      id: 'console',
      kind: 'code',
      filename: 'terraform console — in shop/',
      label: `> 2 * var.environment.instance_count + 1
5
> var.environment.instance_count > 1 && var.environment.name != "prod"
true
> upper(var.environment.name)
"STAGING"
> join(", ", local.web_names)
"shop-staging-web-1, shop-staging-web-2"
> cidrsubnet("10.0.0.0/16", 8, 2)
"10.0.2.0/24"
> local.web_names[0]
"shop-staging-web-1"
> lookup(local.common_tags, "team", "none")
"none"
> toset(["b", "a", "b"])
toset(["a", "b"])
> "5" + 1
6
> tonumber("two")
Error: Invalid function argument`,
    },
    {
      id: 'families',
      label: 'Four families',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'operators', label: 'Operators', sub: 'arithmetic, logic', icon: 'sigma', pattern: 'service' },
        { id: 'functions', label: 'Functions', sub: 'built in only', icon: 'wrench', pattern: 'network' },
        { id: 'collections', label: 'Collections', sub: 'list, map, set', icon: 'boxes', pattern: 'storage' },
        { id: 'conversion', label: 'Conversion', sub: 'automatic or explicit', icon: 'swap', pattern: 'warn' },
      ],
    },
  ],
  edges: [{ source: 'console', target: 'families' }],
}
