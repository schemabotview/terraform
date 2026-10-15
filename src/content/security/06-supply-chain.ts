import type { Section } from '../types'

export const supplyChain: Section = {
  id: 'supply-chain',
  title: 'Provider and module supply chains',
  scene: 'supply-chain',
  focus: 'tampered',
  slide: `## Supply chain

Every \`init\` downloads code that will run with your cloud credentials. Each download needs a pin and a check.

### Providers
- Version constraints choose; the **lock file** pins
- Checksums are verified on every install
- A package that does not match the lock fails, as on the left
- \`providers lock\` adds every platform's hashes

### Modules
- Pin a registry version or a Git commit
- Nothing hashes module code: review every upgrade

### The CLI itself
- Pin the version used in CI
- Verify downloads against \`SHA256SUMS\` and its signature

### Prefer fewer, better-known sources
- Every dependency is code you have chosen to trust`,
  narration:
    "Every terraform init downloads code: the providers, the modules, and before that the Terraform binary itself. That code then runs with your cloud credentials, so each download needs two things: a pin, so you get the same thing every time, and a check, so you know it is what it claims to be. For providers, version constraints choose a version and the lock file pins it, along with checksums of the package. On the left, one recorded checksum was changed, and init refused to install the provider, because the package no longer matches what the team reviewed and committed. That is the lock file doing its job. Modules are weaker. Pin them to a registry version or, better for Git sources, a specific commit. But nothing hashes module code the way providers are hashed, so the only real check is reviewing the code when you upgrade. And the CLI itself: pin the version your pipelines use, and verify the download against the published checksums and their signature, which is exactly how the Terraform binary used for this course was checked. Finally, the cheapest control of all: fewer dependencies, from sources you know.",
}
