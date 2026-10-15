import type { Scene } from '@graphlearning/flow'

// §1 — three problems, caught at three different moments. All output is real 1.16.6 + hashicorp/local
// 2.9.1, trimmed to the error headlines and messages.
export const staticChecks: Scene = {
  id: 'static-checks',
  title: 'What static checks catch',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'main.tf — three mistakes',
      label: `resource "local_file" "web" {
  filename        = "\${path.module}/out/web.conf"
  content         = "port = 8080\\n"
  file_permission = "0999"                   # not octal
}

resource "local_file" "api" {
  filename = "/proc/forbidden/api.conf"      # cannot be created
  content  = "port = 9090\\n"
  colour   = "blue"                          # not in the schema
}`,
    },
    {
      id: 'caught',
      label: 'Who catches what',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'validate',
          kind: 'code',
          hug: true,
          filename: 'terraform validate — no API calls',
          label: `Error: Invalid File Permission String Value
bad mode permission: string must be expressed in octal numeric notation: 0999

Error: Unsupported argument`,
        },
        {
          id: 'apply',
          kind: 'code',
          hug: true,
          filename: 'both fixed: validate says Success, then terraform apply',
          label: `local_file.web: Creation complete after 0s [id=c4a8ceac…]

Error: Create local file error
+Original Error: mkdir /proc/forbidden: no such file or directory`,
        },
      ],
    },
  ],
  edges: [{ source: 'config', target: 'caught' }],
}
