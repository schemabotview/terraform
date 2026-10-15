import type { Scene } from '@graphlearning/flow'

// §6 — the four lifecycle rules, each with what it actually did in a real 1.16.6 + hashicorp/local
// 2.9.1 run. The create_before_destroy card is the run where the replacement shared the old object's
// filename: apply reported success, then destroying the deposed object deleted the new file.
// Cards keep Terraform's own line breaks; only the prevent_destroy error prose is re-wrapped.
export const lifecycleRules: Scene = {
  id: 'lifecycle-rules',
  title: 'Lifecycle rules',
  flow: 'TB',
  nodes: [
    {
      id: 'rules',
      label: 'Four lifecycle rules, four real runs',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'cbd',
          kind: 'code',
          hug: true,
          filename: 'create_before_destroy = true',
          label: `local_file.web: Creating...
local_file.web: Creation complete after 0s
local_file.web (deposed object ebf55f16): Destroying...
local_file.web: Destruction complete after 0s

Apply complete! Resources: 1 added, 0 changed, 1 destroyed.

$ cat out/web.conf
cat: out/web.conf: No such file or directory`,
        },
        {
          id: 'prevent',
          kind: 'code',
          hug: true,
          filename: 'prevent_destroy = true',
          label: `Error: Instance cannot be destroyed

Resource local_file.web has
lifecycle.prevent_destroy set, but the
plan calls for this resource to be
destroyed.

# delete the whole resource block instead:
Plan: 0 to add, 0 to change, 1 to destroy.`,
        },
        {
          id: 'ignore',
          kind: 'code',
          hug: true,
          filename: 'ignore_changes = [input]',
          label: `$ terraform plan -var app_version=2.0.0

No changes. Your infrastructure matches the configuration.

# the configuration says 2.0.0;
# the object still holds 1.0.0`,
        },
        {
          id: 'trigger',
          kind: 'code',
          hug: true,
          filename: 'replace_triggered_by = [terraform_data.release]',
          label: `  # local_file.web will be replaced due to changes in replace_triggered_by
-/+ resource "local_file" "web" {

  # terraform_data.release will be updated in-place
  ~ resource "terraform_data" "release" {
      ~ input  = "1.0.0" -> "2.0.0"`,
        },
      ],
    },
  ],
  edges: [],
}
