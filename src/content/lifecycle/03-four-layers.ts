import type { Section } from '../types'

export const fourLayers: Section = {
  id: 'four-layers',
  title: 'Configuration, state and reality',
  scene: 'four-layers',
  focus: 'state',
  slide: `## Configuration, state and reality

"The infrastructure" means four different things. Keeping them apart is how you read every plan in this course.

### The four layers
- **Configuration**: the \`.tf\` files, what you *want*
- **State binding**: Terraform's record linking an address to one object ID
- **Observed attributes**: what the provider reads back from the API on refresh
- **Real object**: what actually exists, which people and other tools can change

### Seeing each layer
- \`terraform state list\` and \`state show\` print the bindings

### Two consequences
- State is a **record**, not the truth: reality can drift from it
- State stores **every attribute** in plain JSON, secrets included. Protect it from the first apply`,
  narration:
    "Here is the distinction that makes plans readable. When people say the infrastructure, they can mean four different things. First, the configuration: the files you write, describing what you want. Second, the state: Terraform's record, after an apply, that the address terraform data dot release is bound to one particular object, with that object's ID and the attributes it had at the time. Third, the observed attributes: what the provider reads back from the API when Terraform refreshes. And fourth, the real object itself, which exists outside Terraform and can be changed by a person in a console or by another tool. A plan is Terraform comparing these layers: configuration against the state, after refreshing the state against what the provider observes. Two consequences follow straight away. State is a record, not the truth, so reality can drift away from it, and we will deal with drift properly in chapter four. And state stores every attribute in plain JSON, including passwords and keys when a resource has them. So treat the state file as sensitive from your very first apply. Don't commit it, and don't paste it into a ticket.",
}
