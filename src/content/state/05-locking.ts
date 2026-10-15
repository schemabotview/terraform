import type { Section } from '../types'

export const locking: Section = {
  id: 'locking',
  title: 'Locking and concurrent writers',
  scene: 'locking',
  focus: 'lost',
  slide: `## Locking and concurrent writers

Two applies writing one state at the same time is how state loses work. A **lock** lets only one writer in.

### With the lock
- Writer B fails at once and changes nothing
- Lock Info names the operation, the machine and the version
- A crashed run can leave a lock that blocks everyone

### Without the lock
- Both applies report success
- The last snapshot written wins: state says port 8080, the file says 9090
- The next plan works from the wrong record

### Locking depends on the backend
- Local state and S3 with \`use_lockfile\` lock; not every backend does
- \`-lock=false\` and \`force-unlock\` are for emergencies only`,
  narration:
    "State is a single shared record, and two people writing it at once is the classic way to lose work. On the left, writer A starts an apply against the S3 backend. A few seconds later, writer B tries to apply too. B fails immediately, before touching anything, and the lock information says who holds the lock and what they are doing. That failure is the lock working. Now the same race with locking switched off. A changes the release, B changes the port. Both applies report apply complete. But each one started from the same snapshot and wrote back its own version of the whole state, and A wrote last. The result: the file on disk says port nine thousand ninety, because B really did change it, while the state still records port eight thousand eighty, because A's snapshot never knew about B's change. Both commands succeeded, and the record is now wrong, so the next plan works from a false picture. Locking is a backend feature. Local state and S3 with use lockfile both lock, but not every backend does, so check before you share one. And treat dash lock equals false, and force-unlock, as emergency tools.",
}
