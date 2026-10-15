import type { Scene } from '@graphlearning/flow'

// §7 — a test that passes and still leaves something behind. Real 1.16.6 `terraform test` output: the
// resource's destroy-time provisioner fails during teardown.
export const testLimits: Scene = {
  id: 'test-limits',
  title: 'The limits of test evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'teardown',
      kind: 'code',
      filename: 'terraform test — the run passed, teardown did not',
      label: `  run "creates_queue"... pass
tests/queue.tftest.hcl... tearing down

Terraform encountered an error destroying resources created while executing
tests/queue.tftest.hcl/creates_queue.

Error: local-exec provisioner error
Output: queue still has 3 messages

Terraform left the following resources in state after executing
tests/queue.tftest.hcl/creates_queue, and they need to be cleaned up
manually:
  - terraform_data.queue

tests/queue.tftest.hcl... fail
Failure! 1 passed, 0 failed.`,
    },
    {
      id: 'limits',
      label: 'What apply tests cost',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'real', label: 'Real objects', sub: 'created in a real account', icon: 'cloud', pattern: 'warn' },
        { id: 'leftovers', label: 'Leftovers', sub: 'when teardown fails', icon: 'trash', pattern: 'warn' },
        { id: 'isolation', label: 'Isolation', sub: 'a separate test account', icon: 'shieldcheck', pattern: 'warn' },
        { id: 'money', label: 'Time and money', sub: 'minutes and bills per run', icon: 'clock', pattern: 'warn' },
      ],
    },
  ],
  edges: [{ source: 'teardown', target: 'limits' }],
}
