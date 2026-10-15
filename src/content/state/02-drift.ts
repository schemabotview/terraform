import type { Section } from '../types'

export const drift: Section = {
  id: 'drift',
  title: 'Refresh, drift and refresh-only plans',
  scene: 'drift',
  focus: 'refresh-only',
  slide: `## Drift and refresh-only plans

**Drift** is a difference between the state's record and what really exists, usually from a change made outside Terraform.

### Refresh observes first
- Every plan first asks the provider to re-read each object
- The **provider** decides what a change looks like: \`local_file\` reports an edited file as deleted

### Two ways to answer drift
- \`plan -refresh-only\`: accept reality, update only the record
- A normal plan: put the object back as configured

### When refresh-only fits
- A hand-made emergency fix that should stay
- Then update the configuration to match

### Neither is automatic
- Decide which side is right before applying either
- Refresh changes state, never the real object`,
  narration:
    "Real infrastructure does not stay still just because Terraform is not running. Someone edits a setting in a console, a script changes a file, and now the state's record no longer matches reality. That difference is called drift. Terraform finds it through refresh. Before planning, it asks the provider to read every object again and compares what it sees with what state recorded. Notice something on the left. Someone changed the config file by hand, and the local file provider reports it as deleted, not as changed. That is a real detail of this provider: it compares checksums, and a mismatch means the object it created is gone. What drift looks like is always the provider's decision. Once drift is found, you have two possible answers. A refresh-only plan accepts reality: applying it updates the record and changes nothing real. A normal plan does the opposite: it puts the object back the way the configuration says, here by writing port eight thousand eighty again. Terraform will not choose for you, and neither answer is always right. Decide which side is correct, the change someone made or the configuration, before you apply either plan.",
}
