import type { Section } from '../types'

export const stateRecovery: Section = {
  id: 'state-recovery',
  title: 'State restore, lineage and force-unlock',
  scene: 'state-recovery',
  focus: 'forced',
  slide: `## State recovery and its limits

Terraform guards state against obvious mistakes. Every guard can be overridden, at a cost.

### The safeguards
- An older **serial** cannot overwrite a newer state
- Another **lineage** cannot overwrite it

### Restoring a backup
- \`push -force\` put back a record from before a destroy
- The record came back; the **database did not**
- The next plan creates a new, empty one

### Before any of these
- \`state pull\` a copy and keep it safe
- Stop every other writer first

### force-unlock
- It removes the lock, not the writer holding it
- Here writer A kept running, and B applied over it
- First confirm the owner has really stopped`,
  narration:
    "When state itself goes wrong, Terraform has safeguards, and it is worth knowing both what they protect and what overriding them costs. terraform state push refuses an older serial number over a newer state, and refuses a state from a different lineage, because both usually mean someone is about to overwrite newer work with the wrong file. You can force past both. Here, a backup taken before a database file was destroyed was pushed back with dash force. State now lists the database again. But the data directory is empty, and the next plan wants to create it. Restoring state restores the record, never the object or its data. For a real database, that would be a new, empty database. Recovering the data is a backup and restore problem for the database, not a Terraform problem. force-unlock has the same shape. It removes a lock. It does not stop the process holding it. On the left, an apply was still running when its lock was forced open. A second apply then ran and wrote its state, the first one finished its migration anyway, and then failed to release a lock that was no longer its own. Before forcing a lock, confirm the owner it names has really stopped.",
}
