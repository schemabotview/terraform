import type { Section } from '../types'

export const childModule: Section = {
  id: 'child-module',
  title: 'Root and child modules',
  scene: 'child-module',
  focus: 'plan',
  slide: `## Root and child modules

A **module** is a directory of \`.tf\` files. The one you run is the root; a \`module\` block calls a child.

### Calling a child
- \`source\` says where its code lives; \`init\` installs it
- Arguments set its variables; \`module.web.config_path\` reads an output

### Addresses gain a prefix
- Every address inside gains \`module.web.\` in front
- A new address is a new identity: destroy, then create
- Chapter 6's \`moved\` block fixes exactly this

### Before you extract
- Plan first and read every address change
- Extract a group of resources with one job

### One state, not two
- A child's resources live in the **caller's** state
- A module organises code; it is not a state boundary`,
  narration:
    "Every configuration so far has been a single module: the root module, the directory you run Terraform in. Now we split code out into a child module. A child module is just another directory of dot t f files, and the root calls it with a module block. The source argument says where the code lives, here a local folder, and terraform init installs it. The other arguments set the child's input variables, and the root reads the child's outputs with expressions like module dot web dot config path. Here is the part to slow down for. Moving a resource into a module changes its address. What was local file dot web config is now module dot web dot local file dot config. Terraform binds state to addresses, so a new address looks like a new resource, and the plan on the left proposes to destroy the old file and create a new one, even though nothing about the file changed. Chapter six shows how a moved block tells Terraform the two addresses are the same object. And remember: a child module's resources live in the caller's state. A module organises code. It does not create a separate state or a separate permission boundary.",
}
