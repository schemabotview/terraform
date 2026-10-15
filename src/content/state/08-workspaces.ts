import type { Section } from '../types'

export const workspaces: Section = {
  id: 'workspaces',
  title: 'CLI workspaces versus separate backends',
  scene: 'workspaces',
  focus: 'compare',
  slide: `## CLI workspaces

One configuration, several states. Creating the \`staging\` workspace starts an empty state beside the default one.

### What they separate
- State only, under a prefix like \`env:/staging/\`
- \`terraform.workspace\` lets names vary per workspace
- Good for short-lived copies, like a branch's test stack
- \`terraform workspace show\` names the current one

### What they do not separate
- The code, the backend, the bucket and the credentials
- Anyone who can apply staging can apply production
- The wrong environment is one \`workspace select\` away

### For real environments
- Separate directories or backends, with separate credentials
- HCP Terraform workspaces are a different thing with the same name`,
  narration:
    "CLI workspaces let one configuration keep several states. terraform workspace new staging creates an empty state alongside the default one, and in the S3 backend it appears under an env colon slash staging prefix in the same bucket. Inside the configuration, terraform dot workspace returns the current name, so resources can be named per workspace. That sounds like environments, and it is often used that way, so be clear about what is and is not separated. Only the state is. The code is the same code. The backend is the same bucket. And the credentials that can write staging's state can write production's, because they are the same credentials. Nothing stops the wrong apply except remembering which workspace is selected. For environments that need real isolation, use separate root directories or separate backends, each with its own credentials and access policy, so a staging pipeline physically cannot touch production. One naming warning to finish. HCP Terraform also has workspaces, but they are a different, much heavier concept, each with its own settings, permissions and variables. Same word, different thing.",
}
