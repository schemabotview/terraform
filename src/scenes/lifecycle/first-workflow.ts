import type { Scene } from '@graphlearning/flow'

// §5 — the six steps as a pipeline, over the real first plan they produce (1.16.6, -no-color).
export const firstWorkflow: Scene = {
  id: 'first-workflow',
  title: 'The first workflow',
  flow: 'TB',
  nodes: [
    {
      id: 'commands',
      label: 'Six steps, in order',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'init', label: 'init', sub: 'install providers', icon: 'package', pattern: 'service', badge: '1' },
        { id: 'fmt', label: 'fmt', sub: 'canonical style', icon: 'ruler', pattern: 'service', badge: '2' },
        { id: 'validate', label: 'validate', sub: 'no API calls', icon: 'circlecheck', pattern: 'service', badge: '3' },
        { id: 'plan', label: 'plan -out', sub: 'propose, then save', icon: 'scale', pattern: 'network', badge: '4' },
        { id: 'show', label: 'show tfplan', sub: 'review what was saved', icon: 'search', pattern: 'network', badge: '5' },
        { id: 'apply', label: 'apply', sub: 'run the saved plan', icon: 'zap', pattern: 'warn', badge: '6' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terraform plan -out=tfplan',
      label: `Resource actions are indicated with the following symbols:
  + create

  # terraform_data.release will be created
  + resource "terraform_data" "release" {
      + id     = (known after apply)
      + input  = {
          + app     = "shop"
          + version = "1.0.0"
        }
      + output = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + release = (known after apply)

Saved the plan to: tfplan`,
    },
  ],
  edges: [{ source: 'commands', target: 'output', label: 'step 4 prints' }],
}
