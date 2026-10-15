import type { Section } from '../types'

export const escapeHatches: Section = {
  id: 'escape-hatches',
  title: 'Timeouts, provisioners and escape hatches',
  scene: 'escape-hatches',
  focus: 'provisioner',
  slide: `## Escape hatches

Some work does not fit a resource's arguments. Terraform has a few exits, and each one weakens what a plan can tell you.

### terraform_data and provisioners
- \`triggers_replace\` replaces it when the listed values change
- A \`local-exec\` provisioner runs a command when it is created
- The plan cannot show what that command will do
- A last resort: prefer a provider feature or a deploy tool
- \`terraform_data\` replaces \`null_resource\`, no extra provider

### timeouts
- Defined by the provider, per resource and per operation

### -target
- Plans only part of the configuration
- For recovery from errors, not routine deployment`,
  narration:
    "Not everything you need fits neatly into a resource's arguments, and Terraform has a few escape hatches for those cases. The first is the one we have been using all along: terraform data. Besides holding values, it has triggers replace, which replaces it whenever the listed values change. Combine that with a provisioner and you can run a command, here a schema migration script, each time the database configuration changes. But be honest about what you lose. The plan can say that the command will run. It cannot say what the command will do, whether it will succeed, or whether running it twice is safe. That is why the documentation calls provisioners a last resort, behind a provider feature or a tool built for deployment. Timeouts are a different kind of setting. They let slow operations, like creating a database, take longer, but they are defined by each provider, per resource and per operation. Here create and delete validate, and an invented resize argument is rejected. And finally dash target, which plans only part of the configuration. The warning on the left is Terraform's own advice: it is for recovering from errors, not for routine deployment.",
}
