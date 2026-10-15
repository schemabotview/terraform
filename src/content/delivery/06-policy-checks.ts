import type { Section } from '../types'

export const policyChecks: Section = {
  id: 'policy-checks',
  title: 'Policy, security and cost checks',
  scene: 'policy-checks',
  focus: 'levels',
  slide: `## Policy checks

A policy is a rule checked against the **plan**, before apply: no world-writable files, no public buckets, no oversized instances.

### How it works
- \`terraform show -json\` turns a saved plan into data
- A policy engine reads it: OPA, Sentinel, or a script
- Here: one rule, one violation, exit status 1

### Enforcement is a place
- A comment can be ignored; a required check can be overridden
- Checks in the apply path stop only applies run there
- Only cloud permissions stop every route

### Policies are code
- Test them like modules
- Exceptions need an owner and an expiry date

### Cost checks too
- Estimate a plan's monthly cost; flag the big jumps`,
  narration:
    "Some rules apply to every change, whoever writes it: no world-writable files, no public storage buckets, no instance types above a certain size, required tags on everything. Writing those as policy turns them into checks that run against the plan, before anything is applied. The mechanism is simple. terraform show dash json turns a saved plan into structured data, and a policy engine reads it. Real teams use tools such as Open Policy Agent or Sentinel. On the left is a deliberately tiny stand-in, a Python script with one rule, and run against staging's saved plan it finds the default world-writable permission and exits with a failure. The important question is where the check runs, because that decides what it can actually stop. A comment on the review is advice that can be ignored. A required check blocks merging, until an administrator overrides it. A check in the apply pipeline stops only the applies that go through that pipeline. Only the cloud's own permissions stop every route, including someone running apply from a laptop. Cost belongs here too: estimating each plan's monthly cost and flagging large jumps catches expensive mistakes during review.",
}
