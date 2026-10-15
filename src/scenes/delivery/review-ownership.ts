import type { Scene } from '@graphlearning/flow'

// §1 — the chapter's repository and who owns which part. The tree is the real layout used for every
// run in this chapter; the CODEOWNERS file is illustrative (the format GitHub and GitLab read).
export const reviewOwnership: Scene = {
  id: 'review-ownership',
  title: 'Repository, review and ownership',
  flow: 'TB',
  nodes: [
    {
      id: 'tree',
      kind: 'code',
      filename: "shop-infra/ — the chapter's repository",
      label: `modules/web/            # one module, its tests beside it
  main.tf  variables.tf  outputs.tf  versions.tf
  tests/web.tftest.hcl
envs/staging/           # one root module per environment
  main.tf  terraform.tfvars  .terraform.lock.hcl
envs/prod/
  main.tf  terraform.tfvars  .terraform.lock.hcl
ci-check.sh  drift.sh  policy.py
.gitignore              # .terraform/  *.tfstate*  tfplan  out/`,
    },
    {
      id: 'owners',
      kind: 'code',
      filename: 'CODEOWNERS (illustrative)',
      label: `/modules/      @shop/platform
/envs/staging/ @shop/web
/envs/prod/    @shop/web @shop/prod-approvers`,
    },
    {
      id: 'review',
      label: 'A review answers',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'intent', label: 'Intent', sub: 'is this what we want?', icon: 'search', pattern: 'storage' },
        { id: 'plan', label: 'Plan', sub: 'is this what will happen?', icon: 'scale', pattern: 'storage' },
        { id: 'owner', label: 'Owner', sub: 'is the right person here?', icon: 'usercheck', pattern: 'storage' },
      ],
    },
  ],
  edges: [
    { source: 'tree', target: 'owners' },
    { source: 'owners', target: 'review' },
  ],
}
