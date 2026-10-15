import type { Section } from '../types'

export const reviewedApply: Section = {
  id: 'reviewed-apply',
  title: 'Approval, saved plans and controlled apply',
  scene: 'reviewed-apply',
  focus: 'saved',
  slide: `## Applying what was reviewed

Reviewers approved one plan. Running \`apply\` without that file plans **again**, from whatever the files say now.

### What happened here
- Reviewed: port 8080 to **9090**
- Before apply, an unrelated merge set **7070**
- Plain \`apply\`: proposes 7070, which nobody reviewed
- \`apply reviewed.tfplan\`: applied exactly 9090

### Keep plans fresh
- A plan made stale by a state change is refused
- Apply soon, or re-plan and re-review

### In the pipeline
- Store the plan as a short-lived artifact
- The apply job uses exactly that file
- An approval gate sits between the two jobs

### The next plan shows the rest
- 7070 appears as its own change`,
  narration:
    "Here is the gap that saved plans close. Reviewers approved a plan that changes staging's port from eight thousand eighty to nine thousand ninety. Before anyone applied it, an unrelated pull request merged and set the port to seven thousand seventy. Now someone runs terraform apply without a plan file. Terraform plans again, from the files as they are now, and proposes seven thousand seventy, a change that no reviewer ever saw. Here it was cancelled. Instead, apply the saved plan file. Terraform carries out exactly the reviewed actions, and the file on disk now says nine thousand ninety. The configuration still says seven thousand seventy, of course, so the next plan shows that as a change of its own, which goes through its own review. That is the property you want: what was approved is what was applied, and nothing else slips in alongside it. Saved plans have a freshness rule too. If the state changes after the plan is made, chapter three showed Terraform refusing the stale file. So apply soon after approval, and if too much time has passed, plan again and review again.",
}
