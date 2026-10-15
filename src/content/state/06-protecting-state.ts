import type { Section } from '../types'

export const protectingState: Section = {
  id: 'protecting-state',
  title: 'Encryption, access, versions and copies',
  scene: 'protecting-state',
  focus: 'copies',
  slide: `## Protecting state

State holds every attribute, secrets included, and losing it loses every binding. Guard it like a credential; keep history like a database.

### On the bucket
- **Encryption** at rest: \`encrypt = true\`, here \`AES256\`
- **Versioning**: every write kept, so a bad write can be rolled back
- **Access**: a few roles may read, fewer may write
- No public access, and a log of who reads it

### Copies escape
- \`.backup\` files, \`state pull\` output, saved plans, CI artifacts
- Each copy needs the same protection, or deleting
- State never belongs in Git

### A version is not a restore
- Old state brings back no deleted object or data: chapter 10`,
  narration:
    "State deserves two kinds of protection at once. It holds every attribute of every resource, including passwords and keys, so it needs protecting like a credential. And it holds the only record of which objects Terraform owns, so it needs protecting like a database. The bucket on the left does both. Objects are encrypted at rest, and versioning is switched on, so every write the chapter's runs made is still there, all the way back to the original migrated copy. If a bad apply or a lost update corrupts the record, a previous version can be restored. Access is the third control: only a few roles should be able to read state, and fewer still should be able to write it. Then there are copies, and they escape easily. A dot backup file left by a migration, the output of terraform state pull, a saved plan, an artifact kept by a CI job: each holds the same secrets as the state itself, and each needs the same protection or deleting. One limit to remember. An old version of state is only an old record. Restoring it does not bring back an object or data that was destroyed, and chapter ten deals with that properly.",
}
