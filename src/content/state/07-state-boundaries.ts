import type { Section } from '../types'

export const stateBoundaries: Section = {
  id: 'state-boundaries',
  title: 'Root modules, separate states and blast radius',
  scene: 'state-boundaries',
  focus: 'exposed',
  slide: `## Separate states, explicit dependencies

Each root module has its own state. Splitting a system into several limits the **blast radius** of every plan and apply.

### Splitting
- \`network\` and \`app\` each plan, lock and fail on their own
- A mistake in \`app\` cannot destroy the network
- Each state can carry its own access rules

### Reading across the boundary
- \`terraform_remote_state\` reads another state's **outputs**
- But the reader needs access to that **whole** state
- That access also reveals what is not an output

### Choosing boundaries
- Split along ownership and rate of change

### Alternatives
- Publish shared values elsewhere, or look them up with a data source`,
  narration:
    "So far each example has been one root module with one state. Larger systems are usually split into several, and the reason is blast radius. Here the network and the application are separate root modules, with separate state files. Each one plans, locks and fails on its own. A mistake in the application's configuration cannot produce a plan that destroys the network, because the network is simply not in that state. The cost of splitting is that the parts still depend on each other, and the dependency has to be made explicit. terraform remote state is the built-in way: the application reads the network's outputs, here the network's address range, and carves a subnet from it. But look at the bottom card. To read those outputs, the reader needs read access to the entire network state, not just the outputs. With that same access, the whole file is readable, including a note that was never published as an output. That is why the documentation suggests alternatives for sharing values between states: publishing them somewhere designed for it, or looking up the real objects with a data source.",
}
