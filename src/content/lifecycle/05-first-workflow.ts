import type { Section } from '../types'

export const firstWorkflow: Section = {
  id: 'first-workflow',
  title: 'The first workflow',
  scene: 'first-workflow',
  focus: 'output',
  slide: `## init, fmt, validate, plan, apply

Six steps take files to a recorded object. The output on the left is a real Terraform 1.16.6 run.

### What each one does
1. \`init\`: installs providers, writes the lock file
2. \`fmt\`: rewrites files into canonical style
3. \`validate\`: checks syntax and types, calls no API
4. \`plan -out=tfplan\`: proposes changes, saves them
5. \`show tfplan\`: re-reads the saved plan for review
6. \`apply tfplan\`: carries out exactly that plan

### When validate fails
A typo such as an undeclared \`var.app_versoin\` stops here, with the file and line, before any API is called.

### Reading the plan
- \`+ create\`: the address has no object bound yet
- \`(known after apply)\`: decided only when the object exists
- A saved plan may hold **sensitive values**: protect it like state`,
  narration:
    "Now let's run it, in six steps. terraform init prepares the working directory. It installs the providers the configuration needs, and for a real provider it writes a lock file recording exactly which version was chosen. terraform fmt rewrites your files into the one canonical style, so that reviews are about meaning rather than spacing. terraform validate checks syntax, references and types without calling any API, so it can catch a misspelled variable before anything is touched. Then terraform plan, with dash out, proposes the changes and saves them to a file. The output on the left is a real run. The plus sign means create: the address terraform data dot release has no object bound to it yet, so Terraform will make one. Some attributes say known after apply, because their values only exist once the object has been created. And the summary line, one to add, zero to change, zero to destroy, is the first thing to read in every plan. terraform show, given that file, prints the saved plan again so it can be reviewed. Finally, terraform apply with that saved file carries out exactly the actions you reviewed and nothing else. One caution: a saved plan can contain sensitive values, so protect it as carefully as state.",
}
