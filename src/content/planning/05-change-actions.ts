import type { Section } from '../types'

export const changeActions: Section = {
  id: 'change-actions',
  title: 'Create, update, replace and delete',
  scene: 'change-actions',
  focus: 'plan',
  slide: `## Update or replace

Each instance's action comes from comparing configuration with state, through the provider's **schema**.

### Who decides update versus replace
- Some arguments cannot change in place
- The plan flags those with \`# forces replacement\`
- \`local_file\` content forces it; \`terraform_data\` input does not

### Replacement is not an update
- A new object with a new ID; what referred to the old one may change too
- By default the old object is destroyed **first**

### Read the summary first
- \`Plan: 1 to add, 1 to change, 1 to destroy\`
- Stop at any destroy you did not expect

### Delete and create
- In state but gone from configuration: destroy
- In configuration but not in state: create`,
  narration:
    "Every instance in a plan gets one action, and the symbols on the left are the complete list. Create, update in place, replace in either order, destroy, and read for data sources. How does Terraform choose? It compares the configuration with the state, and then it asks the provider. The provider's schema says, for every argument, whether it can be changed on an existing object. Some cannot. Change one of those and the only way to get there is a new object, and the plan marks the argument with forces replacement. Look at the real plan. Two variables changed. terraform data's input can be updated in place, so the release keeps its ID and gets a tilde. The local file's content cannot be changed in place, so the file must be replaced, and the symbol is minus slash plus. Take replacement seriously. It is not an update. It is a new object with a new ID, so anything that referred to the old one may have to change too, and by default the old object is destroyed before its replacement is created. The last two cases are simple: an instance in state but no longer in configuration is destroyed, and one in configuration but not in state is created.",
}
