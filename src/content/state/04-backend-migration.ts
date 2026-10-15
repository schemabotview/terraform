import type { Section } from '../types'

export const backendMigration: Section = {
  id: 'backend-migration',
  title: 'Backend configuration and migration',
  scene: 'backend-migration',
  focus: 'migrate',
  slide: `## Configuring and migrating a backend

A \`backend\` block inside \`terraform {}\` decides where state goes. Changing it always requires \`init\`.

### The bootstrap problem
- The bucket must exist before state can be stored in it
- Create it separately: by hand, or a small bootstrap configuration
- Backend settings cannot use variables; use \`-backend-config\` files

### Migrating
- \`init -migrate-state\` copies the existing state, after asking
- Plan afterwards: it should say **No changes**

### Clean up behind you
- \`terraform.tfstate.backup\` still holds the full old state
- \`.terraform/\` keeps backend settings: keep secrets out of them`,
  narration:
    "A backend is configured with a backend block inside the terraform block. Here it names a bucket, a key for this configuration's state, a region, and two settings worth keeping: native locking with a lock file, and encryption. Before any of this works, there is a bootstrap problem. The bucket has to exist before Terraform can store state in it, so it is usually created separately, by hand or by a small configuration of its own. And backend settings are read before variables exist, so they cannot use variables. Values that differ per environment go in backend config files passed to init instead. Changing the backend always means running init again, and Terraform says so if you forget. When state already exists, init dash migrate-state offers to copy it to the new backend, and asks first, as you can see. After migrating, run a plan. It should report no changes, because the record moved and reality did not. Then clean up. The migration left behind an empty state file and a backup that still contains the entire old state, secrets included. And the dot terraform folder remembers backend settings, which is one more reason never to pass credentials as backend config.",
}
