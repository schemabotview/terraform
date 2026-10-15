import type { Scene } from '@graphlearning/flow'

// §3 — where a module can come from. The git install is real 1.16.6 output from a local repository
// tagged v1.0.0 (its scratch path shortened to …); the registry row is the documented form only — the
// registry is not reachable from the authoring container.
export const moduleSources: Scene = {
  id: 'module-sources',
  title: 'Module sources and versions',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    {
      id: 'forms',
      kind: 'table',
      label: 'Three common sources (registry example illustrative)',
      headers: ['source', 'example', 'pinned by'],
      values: [
        ['local path', '"./modules/web"', 'the repository commit'],
        ['registry', '"acme/web/aws"', 'version = "~> 1.0"'],
        ['git', '"git::https://…//web?ref=v1.0.0"', 'ref = a tag or commit'],
      ],
    },
    {
      id: 'install',
      kind: 'code',
      filename: 'terraform init — a git source at a tag',
      label: `Initializing modules...
Downloading git::file:///…/git-src?ref=v1.0.0 for web...
- web in .terraform/modules/web/web

Initializing provider plugins...
- Finding hashicorp/local versions matching ">= 2.9.0, ~> 2.9"...`,
    },
  ],
  edges: [{ source: 'forms', target: 'install', label: 'git row, run' }],
}
