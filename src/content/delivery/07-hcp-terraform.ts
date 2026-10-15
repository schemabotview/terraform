import type { Section } from '../types'

export const hcpTerraform: Section = {
  id: 'hcp-terraform',
  title: 'HCP Terraform and Enterprise',
  scene: 'hcp-terraform',
  focus: 'compare',
  slide: `## HCP Terraform and Enterprise

A hosted service that bundles what this chapter built by hand: state, run queues, approvals, policy and history.

### What it adds
- Remote runs, queued per workspace
- Variables and credentials stored per workspace
- Teams, permissions and an audit trail

### Two different workspaces
- A **CLI workspace** is one extra state, nothing more
- An **HCP workspace**: state, settings, access

### Execution modes
- Remote: runs on HashiCorp's workers
- Local: only state and history are hosted
- Agents: runs inside your own network

### Choosing
- Some features depend on edition and plan
- Everything in this chapter also works without it`,
  narration:
    "Everything this chapter has built by hand, a run queue per environment, stored plans, approvals, policy checks, drift detection and an audit trail, also comes bundled in HashiCorp's hosted service, HCP Terraform, and its self-hosted form, Terraform Enterprise. A cloud block in the terraform block connects a configuration to it, naming an organisation and a workspace. That block is shown here for comparison only. It was not run, and nothing in this course requires a commercial service. The name workspace causes real confusion, so compare the two carefully. A CLI workspace, from chapter four, is one extra state for the same configuration, and nothing more: the same backend, the same credentials, no access control of its own. An HCP workspace is much larger. It has its own state, its own variables and stored credentials, its own team permissions, a queue of runs and their history. It can run plans and applies on HashiCorp's infrastructure, or in local mode where it only stores state. Some features depend on the edition and plan you have. When you compare it with a self-built pipeline, compare against the same list of needs this chapter covered.",
}
