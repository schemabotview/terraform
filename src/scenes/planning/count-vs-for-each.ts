import type { Scene } from '@graphlearning/flow'

// §4 — the same three files under count and under for_each, then "web-a" removed from the list. Both
// plans are real 1.16.6 + hashicorp/local 2.9.1 output, trimmed to their headline lines.
// Card titles name the configuration; the bodies are `terraform state list` and the trimmed plans.
export const countVsForEach: Scene = {
  id: 'count-vs-for-each',
  title: 'count versus for_each',
  flow: 'TB',
  nodes: [
    {
      id: 'by-position',
      label: 'count: identity by position',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'count-config',
          kind: 'code',
          hug: true,
          filename: 'count = length(var.web_names)',
          label: `local_file.web[0]
local_file.web[1]
local_file.web[2]`,
        },
        {
          id: 'count-plan',
          kind: 'code',
          hug: true,
          filename: 'remove "web-a", then terraform plan',
          label: `# local_file.web[0] must be replaced
~ filename = "./out/web-a.conf" -> "./out/web-b.conf" # forces replacement
# local_file.web[1] must be replaced
~ filename = "./out/web-b.conf" -> "./out/web-c.conf" # forces replacement
# local_file.web[2] will be destroyed
# (because index [2] is out of range for count)

Plan: 2 to add, 0 to change, 3 to destroy.`,
        },
      ],
    },
    {
      id: 'by-key',
      label: 'for_each: identity by key',
      pattern: 'storage',
      cols: 1,
      children: [
        {
          id: 'foreach-config',
          kind: 'code',
          hug: true,
          filename: 'for_each = var.web_names',
          label: `local_file.web["web-a"]
local_file.web["web-b"]
local_file.web["web-c"]`,
        },
        {
          id: 'foreach-plan',
          kind: 'code',
          hug: true,
          filename: 'remove "web-a", then terraform plan',
          label: `# local_file.web["web-a"] will be destroyed
# (because key ["web-a"] is not in for_each map)

Plan: 0 to add, 0 to change, 1 to destroy.`,
        },
      ],
    },
  ],
  edges: [{ source: 'by-position', target: 'by-key', label: 'same files, keyed by name' }],
}
