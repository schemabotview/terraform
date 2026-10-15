import type { Section } from '../types'

export const lockFile: Section = {
  id: 'lock-file',
  title: 'The dependency lock file',
  scene: 'lock-file',
  focus: 'lock',
  slide: `## The dependency lock file

\`init\` records the exact provider versions it chose in \`.terraform.lock.hcl\`. Commit it, and everyone installs the same versions.

### What it records
- Per provider: the \`version\`, the \`constraints\` it met, and package **checksums**
- A checksum mismatch stops \`init\`: the package is not the one recorded

### Upgrading on purpose
- \`init\` keeps the locked version while it still meets the constraints
- \`init -upgrade\` picks the newest allowed version and rewrites the lock
- Review the lock diff like code, then plan

### What it does not lock
- **Modules**: pin those with \`version\` in each \`module\` block
- Other platforms: \`terraform providers lock\` adds their hashes`,
  narration:
    "A version range says what is allowed. The lock file records what was actually chosen. When terraform init selects a provider version, it writes it to dot terraform dot lock dot h c l, together with the constraints it satisfied and checksums of the package it installed. Commit this file. With it in version control, everyone on the team, and every pipeline, installs exactly the same provider versions, and if a downloaded package does not match a recorded checksum, init refuses to continue. The lock also changes how upgrades happen. On the left, the constraint was widened to allow any three point x release. A plain init kept the locked version, three point eight point one, because it still satisfies the constraint. Only init dash upgrade went looking for the newest allowed version and moved the lock to three point nine point one. That makes an upgrade a deliberate, reviewable change: the lock file diff shows up in your pull request, and you plan before you apply. Two things the lock does not cover. It does not lock module versions, so pin those in each module block. And it only holds checksums for the platforms it has seen, which terraform providers lock can extend.",
}
