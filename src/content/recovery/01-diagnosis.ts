import type { Section } from '../types'

export const diagnosis: Section = {
  id: 'diagnosis',
  title: 'Diagnosing configuration, provider, credential and network failures',
  scene: 'diagnosis',
  focus: 'kinds',
  slide: `## Diagnosing failures

Most errors say which layer failed in their first line. Read that before changing anything.

### The layers
- **Configuration**: your code; \`validate\` usually finds it
- **Provider**: what a resource type supports or accepts
- **Credentials** and **network**: reaching the API at all
- **State**: locks, serials and lineage
- **Quota or API**: the remote system said no

### Narrowing it down
- Reproduce with the smallest command: \`validate\`, then \`plan\`
- \`TF_LOG=debug\` for the request, never in shared logs
- Change one thing at a time, and plan after each
- Ask what changed since the last good run

### Escalate when
- The error is inside the provider, or the API itself`,
  narration:
    "The last chapter is about what happens when things go wrong, and what happens as systems grow. It starts with diagnosis. Almost every Terraform error names the layer that failed in its first line, and the table on the left collects the ones you have already met in this course. A configuration error, like an unsupported argument, is your code, and validate usually finds it. A provider error, like an import that is not implemented, is about what a resource type supports. Credential and network errors mean Terraform never reached the API at all. The example here is genuine: the machine that produced this course cannot reach the public registry, and this is exactly what that looks like. State errors are about locks, serial numbers and lineage, which the next sections cover. And quota or API errors mean the remote system received the request and refused it. To narrow a problem down, reproduce it with the smallest command that fails, change one thing at a time, and plan after each change. Debug logging shows the actual requests, but keep it out of shared logs. And when the failure is inside a provider or the API itself, escalate rather than working around it.",
}
