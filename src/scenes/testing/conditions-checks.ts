import type { Scene } from '@graphlearning/flow'

// §3 — when each kind of condition runs. Three real 1.16.6 runs of the chapter's conditions/ example,
// trimmed to the headline, the value line and the message.
export const conditionsChecks: Scene = {
  id: 'conditions-checks',
  title: 'Conditions and check blocks',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Three kinds of condition',
      headers: ['kind', 'lives in', 'on failure'],
      values: [
        ['precondition', 'resource lifecycle', 'error: blocks this resource'],
        ['postcondition', 'resource lifecycle', 'error: blocks dependents'],
        ['check assert', 'top-level check block', 'warning only'],
      ],
    },
    {
      id: 'runs',
      label: 'They run when their values are known',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'post-at-plan',
          kind: 'code',
          hug: true,
          filename: 'postcondition — value known at plan, so it failed at plan',
          label: `Error: Resource postcondition failed
    │ self.file_permission is "0777"
web.conf must not be world-writable; got 0777.`,
        },
        {
          id: 'pre-at-apply',
          kind: 'code',
          hug: true,
          filename: 'precondition — value unknown until apply',
          label: `random_integer.port: Creation complete after 0s [id=8024]
Error: Resource precondition failed
    │ random_integer.port.result is 8024
port must be 9000 or above; got 8024.`,
        },
        {
          id: 'check-warns',
          kind: 'code',
          hug: true,
          filename: 'check block — fails, apply continues',
          label: `Warning: Check block assertion failed
    │ data.local_file.check.content is "port = 8024\\n"
web.conf has no listen line.
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.`,
        },
      ],
    },
  ],
  edges: [{ source: 'kinds', target: 'runs' }],
}
