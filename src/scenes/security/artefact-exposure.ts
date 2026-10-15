import type { Scene } from '@graphlearning/flow'

// §4 — where the same sensitive value actually landed after `plan -out` and `apply` (1.16.6, with
// TF_LOG=trace). Counts are `grep -c` on each file; the plan file is a compressed archive. The show -json line is
// an excerpt of one resource_changes entry.
export const artefactExposure: Scene = {
  id: 'artefact-exposure',
  title: 'Where secrets persist',
  flow: 'TB',
  nodes: [
    {
      id: 'grep',
      kind: 'code',
      filename: 'grep -c Sens1tive-Example — after plan -out and apply',
      label: `terraform.tfstate   2 occurrence(s)
tfplan              0 occurrence(s)     # compressed, not clean
trace.log           0 occurrence(s)     # this run; providers may log more

$ terraform show -json tfplan
… "after": {"input": {
      "password": "Sens1tive-Example", "user": "shop"}} …`,
    },
    {
      id: 'artefacts',
      kind: 'table',
      label: 'Treat every artefact as holding the secret',
      headers: ['artefact', 'protect by'],
      values: [
        ['state', 'encrypted backend, few readers'],
        ['saved plan file', 'short-lived, restricted storage'],
        ['plan JSON for review tools', 'the same as the plan'],
        ['debug and CI logs', 'no TF_LOG in shared CI; scrub'],
        ['.terraform/ settings', 'no secrets in -backend-config'],
      ],
    },
  ],
  edges: [{ source: 'grep', target: 'artefacts' }],
}
