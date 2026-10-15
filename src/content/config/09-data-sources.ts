import type { Section } from '../types'

export const dataSources: Section = {
  id: 'data-sources',
  title: 'Data sources',
  scene: 'data-sources',
  focus: 'read-only',
  slide: `## Data sources

A \`data\` block **reads** an object Terraform does not manage, so the configuration can use what it finds.

### Resource versus data
- \`resource\`: Terraform creates, updates and destroys it
- \`data\`: Terraform only reads it, normally during plan
- Its address starts with \`data.\`, such as \`data.local_file.release_notes\`

### External dependencies
- Someone else owns the image, network or file being read
- If it changes, the next plan changes; if it disappears, the plan fails
- Read what you depend on; manage what you own

### When reads wait
- A data source that depends on an unknown value is read during **apply**
- The plan then marks it with \`<= read\``,
  narration:
    "Not everything a configuration needs is something it should manage. A shared network built by another team, a machine image published by your platform group, the account you happen to be running in: you need to use them, but they are not yours to create or destroy. That is what data sources are for. A data block reads an existing object and makes its attributes available, and its address always starts with data dot. On the left, data dot local file dot release notes reads a file that someone else maintains, and the resource uses its contents. Look at the plan: the read happens first, during planning, and the value it found flows straight into the planned input. Compare the two kinds of block. Terraform creates, updates and destroys a resource. It only ever reads a data source. That makes a data source an external dependency. If the object changes, your next plan changes with it. If it disappears, the plan fails. So read what you depend on, and manage only what you own. One more detail: when a data source depends on a value that is not known until apply, Terraform waits and reads it during apply instead, and the plan shows that.",
}
