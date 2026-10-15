import type { Scene } from '@graphlearning/flow'

// §5 — two writers, with and without the lock. All output is real 1.16.6 against the S3 backend with
// use_lockfile (S3 emulator). The lock error is trimmed to its headline and Lock Info; the unlocked
// run shows both applies reporting success and the state then disagreeing with the file on disk.
export const locking: Scene = {
  id: 'locking',
  title: 'Locking and concurrent writers',
  flow: 'TB',
  nodes: [
    {
      id: 'locked',
      kind: 'code',
      filename: 'writer B, while writer A is applying',
      label: `Error: Error acquiring the state lock

Lock Info:
  Path:      shop-tfstate/shop/app.tfstate
  Operation: OperationTypeApply
  Who:       root@vm

Terraform acquires a state lock to protect the state from being written
by multiple users at the same time.`,
    },
    {
      id: 'unlocked',
      label: 'Same race with -lock=false',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'both',
          kind: 'code',
          hug: true,
          filename: 'A changes the release, B changes the port',
          label: `B: Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
A: Apply complete! Resources: 1 added, 1 changed, 1 destroyed.`,
        },
        {
          id: 'lost',
          kind: 'code',
          hug: true,
          filename: 'afterwards — A wrote last',
          label: `$ cat out/web.conf
port = 9090

$ terraform state show local_file.web
# local_file.web:
resource "local_file" "web" {
    content              = <<-EOT
        port = 8080
    EOT
    …`,
        },
      ],
    },
  ],
  edges: [{ source: 'locked', target: 'unlocked', label: 'without the lock' }],
}
