import type { Section } from '../types'

export const stateCommands: Section = {
  id: 'state-commands',
  title: 'State commands and cross-state moves',
  scene: 'state-commands',
  focus: 'commands',
  slide: `## State commands

\`terraform state\` subcommands edit bindings directly, with **no plan** to review. Keep them for what blocks cannot do.

### What they do
- \`state mv\` rebinds; \`-dry-run\` shows the move first
- \`state rm\` forgets a binding, like \`removed\` without review
- Each writes a timestamped backup beside local state

### Moving between states
- \`-state-out\` moves a binding into a local state file
- Remote states: \`removed\` in one, \`import\` in the other

### Read-only and safe
- \`state list\` and \`state show\` change nothing
- \`state replace-provider\` follows a renamed provider

### Before any surgery
- Stop every other writer, and keep the lock
- \`state pull\` to a file you can push back`,
  narration:
    "Everything so far in this chapter has gone through a plan you can review. The terraform state commands do not. They edit bindings in state directly, immediately, and they are the right tool only for what the blocks cannot express. state mv rebinds an object to a new address, and dash dry run shows what it would do first. state rm forgets a binding, the same effect as a removed block, but without any plan or review. Notice that on local state each command leaves a timestamped backup file behind, which is useful and, as chapter four said, one more copy of the state to protect. state mv can also move a binding into a different local state file, with dash state out. For remote states the recommended route is the one from the previous section: a removed block in the old configuration, and an import block in the new one, each planned and reviewed. Before any state surgery, stop every other writer and make sure you hold the lock, and pull a copy of the state to a file, so that if something goes wrong you can put it back. Chapter ten returns to that kind of recovery.",
}
