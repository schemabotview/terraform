import type { Section } from '../types'

export const rootModule: Section = {
  id: 'root-module',
  title: 'One directory, one configuration',
  scene: 'root-module',
  focus: 'loaded',
  slide: `## One directory, one configuration

The **root module** is the directory you run Terraform in. Every \`.tf\` and \`.tf.json\` file in it is read together, as one configuration with one namespace.

### What gets loaded
- Files in that directory only, never its subfolders
- A subfolder joins only when a module block calls it
- A name declared in two files is an error
- Override files, \`*_override.tf\`, are merged in last

### File order is not execution order
Terraform orders work by **references**, not by file or line. A resource in \`zz.tf\` can be created before one in \`aa.tf\`. File names are a convention for people, not rules.

### Beside the configuration
- \`terraform.tfvars\` supplies values; the lock file records providers
- \`.terraform/\` holds downloaded plugins: never commit it
- With local state, \`terraform.tfstate\` lives here too`,
  narration:
    "In chapter one everything lived in a single file. Real configurations are split across several, so let's be precise about what Terraform actually reads. The directory you run Terraform in is called the root module, and Terraform loads every file ending in dot t f, or dot t f dot json, in that directory, and nothing from its subfolders. All of those files become one configuration with one namespace. That is why declaring a variable called region in two different files is an error, as you can see on the left: Terraform does not care which file a block lives in. The file names you see here, versions, providers, variables, locals, main and outputs, are a convention for the people reading the code, not something Terraform enforces. And here is the point that trips people up: file order is not execution order. Terraform works out what to do first from references between blocks, not from the order of files or lines. Beside the configuration sit a few other things: a tfvars file that supplies values, the lock file that records provider versions, and the dot terraform folder of downloaded plugins, which never belongs in version control.",
}
