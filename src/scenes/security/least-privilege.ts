import type { Scene } from '@graphlearning/flow'

// §7 — a plan-only role for staging, written as aws_iam_policy_document and rendered by Terraform
// (1.16.6 + aws 6.69.0, computed locally). The lock statement is needed because use_lockfile writes a
// .tflock object even for plans. The JSON is condensed: Version and each "Effect": "Allow" omitted.
export const leastPrivilege: Scene = {
  id: 'least-privilege',
  title: 'Least privilege',
  flow: 'TB',
  nodes: [
    {
      id: 'policy',
      kind: 'code',
      filename: 'terraform output -raw policy (condensed) — staging plan role',
      label: `{
  "Statement": [
    { "Sid": "ReadStagingState",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::shop-tfstate/env:/staging/shop/app.tfstate" },
    { "Sid": "TakeTheLockOnly",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::shop-tfstate/env:/staging/shop/app.tfstate.tflock" },
    { "Sid": "ListOnlyStagingPrefix",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::shop-tfstate",
      "Condition": { "StringLike": { "s3:prefix": "env:/staging/*" } } }
  ]
}`,
    },
    {
      id: 'boundaries',
      label: 'Separate by environment and by job',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'plan-role', label: 'Plan role', sub: 'read state, take the lock', icon: 'search', pattern: 'storage' },
        { id: 'apply-role', label: 'Apply role', sub: 'one environment only', icon: 'zap', pattern: 'warn' },
        { id: 'prod-account', label: 'Prod account', sub: 'its own roles and state', icon: 'lock', pattern: 'storage' },
        { id: 'break-glass', label: 'Break glass', sub: 'rare, logged, reviewed', icon: 'bell', pattern: 'warn' },
      ],
    },
  ],
  edges: [{ source: 'policy', target: 'boundaries' }],
}
