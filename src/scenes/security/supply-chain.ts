import type { Scene } from '@graphlearning/flow'

// §6 — provenance for what Terraform downloads. The init error is real 1.16.6 output after one h1:
// hash in the lock file was replaced; the CLI check is the SHA256SUMS verification used for this
// course's own Terraform download.
export const supplyChain: Scene = {
  id: 'supply-chain',
  title: 'Supply chain and provenance',
  flow: 'TB',
  nodes: [
    {
      id: 'tampered',
      kind: 'code',
      filename: 'terraform init — lock file hash does not match the package',
      label: `Error: Failed to install provider

Error while installing hashicorp/random v3.9.1: the current package for
registry.terraform.io/hashicorp/random 3.9.1 doesn't match any of the
checksums previously recorded in the dependency lock file`,
    },
    {
      id: 'controls',
      kind: 'table',
      label: 'One control per thing downloaded',
      headers: ['download', 'pinned by', 'verified by'],
      values: [
        ['Terraform CLI', 'a version in CI', 'SHA256SUMS and signature'],
        ['providers', 'version + lock file', 'checksums, registry signature'],
        ['modules', 'version or commit', 'review: nothing is hashed'],
      ],
    },
    {
      id: 'cli',
      kind: 'code',
      filename: "verifying this course's own CLI download",
      label: `$ grep linux_amd64 terraform_1.16.6_SHA256SUMS | sha256sum -c
tf.zip: OK`,
    },
  ],
  edges: [
    { source: 'tampered', target: 'controls' },
    { source: 'controls', target: 'cli', label: 'CLI row' },
  ],
}
