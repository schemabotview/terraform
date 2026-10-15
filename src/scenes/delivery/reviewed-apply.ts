import type { Scene } from '@graphlearning/flow'

// §3 — a plan reviewed at port 9090, then an unrelated merge setting 7070 before apply. All three
// cards are real 1.16.6 output against envs/staging (plan lines trimmed to the changed content;
// the typed "no" is shown as a terminal echoes it).
export const reviewedApply: Scene = {
  id: 'reviewed-apply',
  title: 'Applying what was reviewed',
  flow: 'TB',
  nodes: [
    {
      id: 'reviewed',
      kind: 'code',
      filename: 'reviewed.tfplan — what the reviewers approved',
      label: `          - port = 8080
          + port = 9090
Plan: 1 to add, 0 to change, 1 to destroy.`,
    },
    {
      id: 'paths',
      label: 'Then a merge sets port = 7070, and someone applies',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'replan',
          kind: 'code',
          hug: true,
          filename: "terraform apply — plans again, from today's files",
          label: `          - port = 8080
          + port = 7070
Plan: 1 to add, 0 to change, 1 to destroy.
  Enter a value: no
Apply cancelled.`,
        },
        {
          id: 'saved',
          kind: 'code',
          hug: true,
          filename: 'terraform apply reviewed.tfplan — exactly the reviewed change',
          label: `Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
$ cat out/web-staging.conf
port = 9090`,
        },
      ],
    },
  ],
  edges: [{ source: 'reviewed', target: 'paths' }],
}
