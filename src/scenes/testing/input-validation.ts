import type { Scene } from '@graphlearning/flow'

// §2 — a validation rule that reads two variables, and the error it gives. Real 1.16.6 output.
export const inputValidation: Scene = {
  id: 'input-validation',
  title: 'Input validation',
  flow: 'TB',
  nodes: [
    {
      id: 'rule',
      kind: 'code',
      filename: 'variables.tf',
      label: `variable "environment" {
  type    = string
  default = "staging"
}

variable "instance_count" {
  type    = number
  default = 1

  validation {
    condition     = var.environment != "prod" || var.instance_count >= 2
    error_message = "prod needs at least 2 instances for redundancy; got \${var.instance_count}."
  }
}`,
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'terraform plan -var environment=prod',
      label: `Error: Invalid value for variable

  on main.tf line 6:
   6: variable "instance_count" {
    ├────────────────
    │ var.environment is "prod"
    │ var.instance_count is 1

prod needs at least 2 instances for redundancy; got 1.

This was checked by the validation rule at main.tf:10,3-13.`,
    },
    {
      id: 'message',
      label: 'A helpful message says',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'what', label: 'What', sub: 'the rule', icon: 'scale', pattern: 'storage' },
        { id: 'why', label: 'Why', sub: 'the reason for it', icon: 'search', pattern: 'storage' },
        { id: 'got', label: 'Got', sub: 'the value received', icon: 'hash', pattern: 'storage' },
      ],
    },
  ],
  edges: [
    { source: 'rule', target: 'error', label: 'before any planning' },
    { source: 'error', target: 'message' },
  ],
}
