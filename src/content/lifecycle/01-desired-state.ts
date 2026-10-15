import type { Section } from '../types'

export const desiredState: Section = {
  id: 'desired-state',
  title: 'Desired state, not steps',
  scene: 'three-approaches',
  focus: 'desired',
  slide: `## Desired state, not steps

Terraform configuration describes **what should exist**. Terraform compares that description with what it has recorded, then proposes only the actions needed to close the gap.

### Three ways to change infrastructure
- **Imperative script**: runs steps in order, so running it twice can do the work twice
- **Configuration management**: Ansible, Chef or Puppet shape what runs *inside* a server
- **Desired-state IaC**: declares the objects themselves, so a second run **converges**

### What this buys you
- A **plan** you read before anything changes
- Environments rebuilt from reviewed files, not memory

### What it does not buy
- Proof that the application works: that needs its own checks`,
  narration:
    "Let's start with the idea everything else in this course rests on. There are broadly three ways to change infrastructure. The oldest is an imperative script: create the network, create the first server, create the second. It runs steps in order, and if you run it a second time, it happily does the work again, and now you have four servers. Configuration management tools like Ansible, Chef and Puppet solve a different problem: they shape what runs inside a server that already exists, the packages, files and services. Terraform takes the third approach. You declare the objects you want to exist, the network and the two servers, and Terraform compares that declaration with what it has recorded, then proposes only the actions needed to close the gap. Run it a second time and it says no changes, because there is no gap left. That convergence is what gives you a plan you can read before anything happens, and environments you can rebuild from reviewed files. But keep one limit in mind from the very start. Terraform can tell you the objects exist as declared. It cannot tell you your application works. That needs its own checks.",
}
