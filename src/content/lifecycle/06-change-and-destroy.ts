import type { Section } from '../types'

export const changeAndDestroy: Section = {
  id: 'change-and-destroy',
  title: 'Outputs, changes and destruction',
  scene: 'change-and-destroy',
  focus: 'destroy',
  slide: `## Outputs, change and destroy

After apply, \`terraform output\` prints the values the configuration exposes.

### Changing configuration
- Set \`app_version = "1.1.0"\` and plan again
- \`~ update in-place\`: the same object keeps its ID

### Intentional destruction
- \`plan -destroy\` previews it, \`destroy\` carries it out
- \`- destroy\` and \`-> null\`: the object and its values go away

### The four symbols
- \`+\` create, \`~\` update in-place, \`-\` destroy
- \`-/+\` replace: by default destroy, then create a new object

### Neither plan can show
- Whether the application still **works** after apply
- That deleted **data** does not come back`,
  narration:
    "Once apply has finished, terraform output prints the values the configuration chose to expose. Here that is the release object, with app shop and version one point oh point oh. Now the lifecycle continues. Change the app version to one point one point oh and plan again. This time the symbol is a tilde, which means update in-place: the same object, with the same ID, gets changed rather than replaced. Notice that the plan only shows what differs and hides the unchanged attribute. Later in the course you will meet the more dangerous symbol, minus slash plus, which means replace: by default, destroy the old object and then create a new one with a new ID. Destruction itself is something you do deliberately. terraform plan dash destroy previews it, terraform destroy carries it out, and the plan shows minus signs with every value going to null. For terraform data that is harmless. For a database it means the data is gone, not paused, and no Terraform command brings it back. And remember the limit from the start of the chapter: neither of these plans can tell you whether your application still works afterwards. Successful apply means the API accepted the change. Nothing more.",
}
