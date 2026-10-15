import type { Scene } from '@graphlearning/flow'

// §8 — a provenance record for the prod apply, assembled from real commands (git, terraform version
// -json, the lock file, sha256sum and show -json) after the promotion commit.
export const auditProvenance: Scene = {
  id: 'audit-provenance',
  title: 'Audit evidence and provenance',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'code',
      filename: 'provenance record — envs/prod, attached to the apply',
      label: `commit:    556b817
terraform: 1.16.6
providers: version = "2.9.1"
plan:      sha256 041947e7586a7723
changes:   {'delete/create': 1}`,
    },
    {
      id: 'kept',
      label: 'Keep, for every apply',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'who', label: 'Who', sub: 'approver and runner', icon: 'usercheck', pattern: 'storage' },
        { id: 'what', label: 'What', sub: 'commit and plan hash', icon: 'fingerprint', pattern: 'storage' },
        { id: 'with', label: 'With what', sub: 'CLI and provider versions', icon: 'package', pattern: 'storage' },
        { id: 'result', label: 'Result', sub: 'apply log and outputs', icon: 'scroll', pattern: 'storage' },
      ],
    },
    {
      id: 'modules',
      kind: 'code',
      filename: 'distributing the module — a tag callers can pin (illustrative)',
      label: `$ git tag v1.1.0 && git push origin v1.1.0
source = "git::https://…/shop-modules.git//web?ref=v1.1.0"`,
    },
  ],
  edges: [
    { source: 'record', target: 'kept' },
    { source: 'kept', target: 'modules' },
  ],
}
