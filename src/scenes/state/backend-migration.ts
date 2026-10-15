import type { Scene } from '@graphlearning/flow'

// §4 — moving state from the local backend to S3. backend.tf is the taught configuration; the prompt
// and the leftover files are real 1.16.6 output. (In the authoring container the emulator endpoint
// came from a capture-only -backend-config file, which is not shown. The typed "yes" is
// shown as a terminal echoes it; the ls listing has its date columns trimmed.)
export const backendMigration: Scene = {
  id: 'backend-migration',
  title: 'Migrating a backend',
  flow: 'TB',
  nodes: [
    {
      id: 'backend',
      kind: 'code',
      filename: 'backend.tf',
      label: `terraform {
  backend "s3" {
    bucket       = "shop-tfstate"
    key          = "shop/app.tfstate"
    region       = "eu-west-1"
    use_lockfile = true
    encrypt      = true
  }
}`,
    },
    {
      id: 'migrate',
      kind: 'code',
      filename: 'terraform init -migrate-state',
      label: `Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "local" backend to the
  newly configured "s3" backend. No existing state was found in the newly
  configured "s3" backend. Do you want to copy this state to the new "s3"
  backend? Enter "yes" to copy and "no" to start with an empty state.

  Enter a value: yes

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.`,
    },
    {
      id: 'leftovers',
      kind: 'code',
      filename: 'ls -l (dates trimmed) — what migration left behind',
      label: `-rw-r--r-- 1 root root    0 terraform.tfstate
-rw-r--r-- 1 root root 2394 terraform.tfstate.backup   # the full old state`,
    },
  ],
  edges: [
    { source: 'backend', target: 'migrate', label: 'backend changed: init required' },
    { source: 'migrate', target: 'leftovers' },
  ],
}
