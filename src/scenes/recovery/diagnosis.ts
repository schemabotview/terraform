import type { Scene } from '@graphlearning/flow'

// §1 — failures sorted by where they come from. Every headline except the quota row is real 1.16.6
// output from this course; the network failure is this authoring container's own blocked registry.
export const diagnosis: Scene = {
  id: 'diagnosis',
  title: 'Diagnosing failures',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Read the first error line: it names the layer',
      headers: ['layer', 'headline seen in this course', 'chapter'],
      values: [
        ['configuration', 'Unsupported argument', '7'],
        ['provider', 'Resource Import Not Implemented', '6'],
        ['credentials', 'No valid credential sources found', '2'],
        ['state', 'Error acquiring the state lock', '4'],
        ['network', 'Failed to query available provider packages', '10'],
        ['quota or API', 'an API error code, such as a limit', 'not run'],
      ],
    },
    {
      id: 'network',
      kind: 'code',
      filename: 'terraform init — with the registry unreachable',
      label: `Error: Failed to query available provider packages

Could not retrieve the list of available versions for provider
hashicorp/random: could not connect to registry.terraform.io: failed to
request discovery document: GET
https://registry.terraform.io/.well-known/terraform.json giving up after 4
attempt(s): Get "https://registry.terraform.io/.well-known/terraform.json":
Forbidden`,
    },
  ],
  edges: [{ source: 'kinds', target: 'network', label: 'network row' }],
}
