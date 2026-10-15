import type { Scene } from '@graphlearning/flow'

// §6 — a policy over plan JSON. policy.py is a minimal stand-in for a policy engine (OPA, Sentinel);
// its run against envs/staging's saved plan is real. The enforcement table is teaching material.
export const policyChecks: Scene = {
  id: 'policy-checks',
  title: 'Policy checks',
  flow: 'TB',
  nodes: [
    {
      id: 'policy',
      kind: 'code',
      filename: 'policy.py (excerpt) — runs on terraform show -json tfplan',
      label: `violations = [
    f'{rc["address"]}: world-writable file_permission {rc["change"]["after"]["file_permission"]}'
    for rc in plan["resource_changes"]
    if rc["type"] == "local_file"
    and rc["change"]["after"]
    and rc["change"]["after"]["file_permission"][-1] in "2367"
]
for v in violations:
    print("DENY", v)
print(f"{len(violations)} violation(s)")
sys.exit(1 if violations else 0)

$ terraform show -json tfplan | python3 policy.py
DENY module.web.local_file.config: world-writable file_permission 0777
1 violation(s)`,
    },
    {
      id: 'levels',
      kind: 'table',
      label: 'Where enforcement actually happens',
      headers: ['level', 'effect', 'bypassed by'],
      values: [
        ['advisory', 'a comment on the review', 'ignoring it'],
        ['required check', 'blocks the merge', 'admin override'],
        ['in the apply path', 'blocks the apply', 'running apply elsewhere'],
        ['in the permissions', 'the API refuses', 'nothing in Terraform'],
      ],
    },
  ],
  edges: [{ source: 'policy', target: 'levels', label: 'only as strong as where it runs' }],
}
