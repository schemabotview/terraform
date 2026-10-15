import type { Scene } from '@graphlearning/flow'

// §2 — the pull-request check, and a real run of it against envs/staging (1.16.6 + local 2.9.1),
// trimmed to each step's result line.
export const ciChecks: Scene = {
  id: 'ci-checks',
  title: 'CI checks and speculative plans',
  flow: 'TB',
  nodes: [
    {
      id: 'script',
      kind: 'code',
      filename: 'ci-check.sh — on every pull request',
      label: `set -eu
env_dir="$1"
terraform fmt -check -recursive
terraform -chdir=modules/web init -input=false
terraform -chdir=modules/web test
terraform -chdir="$env_dir" init -input=false
terraform -chdir="$env_dir" validate
terraform -chdir="$env_dir" plan -input=false -lock-timeout=5m -out=tfplan`,
    },
    {
      id: 'run',
      kind: 'code',
      filename: './ci-check.sh envs/staging',
      label: `  run "renders_default_port"... pass
  run "rejects_privileged_port"... pass
  run "writes_the_file"... pass
Success! 3 passed, 0 failed.
Success! The configuration is valid.

  # module.web.local_file.config will be created
Plan: 1 to add, 0 to change, 0 to destroy.`,
    },
  ],
  edges: [{ source: 'script', target: 'run', label: 'posts the plan to the review' }],
}
