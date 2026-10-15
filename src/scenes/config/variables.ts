import type { Scene } from '@graphlearning/flow'

// §5 — a typed environment object and where its value comes from. The declaration is shop/'s
// variables.tf; the console result and the error are real 1.16.6 output.
export const variables: Scene = {
  id: 'variables',
  title: 'Typed input variables',
  flow: 'TB',
  nodes: [
    {
      id: 'declare',
      label: 'Declared, then resolved',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'decl',
          kind: 'code',
          hug: true,
          filename: 'variables.tf',
          label: `variable "environment" {
  type = object({
    name           = string
    instance_count = number
    size           = optional(string, "small")
    tags           = optional(map(string), {})
  })
}`,
        },
        {
          id: 'value',
          kind: 'code',
          hug: true,
          filename: 'terraform console',
          label: `> var.environment
{
  "instance_count" = 2
  "name" = "staging"
  "size" = "small"
  "tags" = tomap({})
}`,
        },
      ],
    },
    {
      id: 'precedence',
      kind: 'table',
      label: 'Where a value comes from — later rows win',
      headers: ['source', 'example'],
      values: [
        ['default in the block', 'default = "eu-west-1"'],
        ['environment variable', 'TF_VAR_region=us-east-1'],
        ['terraform.tfvars', 'loaded automatically'],
        ['*.auto.tfvars', 'loaded automatically, A→Z'],
        ['-var and -var-file', 'command line, in order'],
      ],
    },
    {
      id: 'type-error',
      kind: 'code',
      filename: 'terraform plan -var \'environment={name="prod",instance_count="two"}\'',
      label: `Error: Invalid value for input variable

Unsuitable value for var.environment set using -var="environment=...":
a number is required.`,
    },
  ],
  edges: [
    { source: 'declare', target: 'precedence' },
    { source: 'precedence', target: 'type-error', label: 'checked against type' },
  ],
}
