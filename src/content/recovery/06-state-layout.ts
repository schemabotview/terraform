import type { Section } from '../types'

export const stateLayout: Section = {
  id: 'state-layout',
  title: 'Monolithic versus split-state design',
  scene: 'state-layout',
  focus: 'evidence',
  slide: `## One state or several

The same objects can live in one large state or several smaller ones. Neither is free.

### One state
- A destroy plan here covers all **900** instances
- Every plan refreshes everything and holds one lock
- References between parts are direct and ordered for you

### Several states
- A destroy plan in \`app\` covers its **300**, nothing else
- Faster plans, separate locks, separate permissions
- Ordering across states is now your job
- Pipelines or orchestration tools apply them in order
- Too many tiny states multiply the wiring

### Splitting well
- Along ownership and rate of change, as in chapter 4
- Move objects between states with chapter 6's tools`,
  narration:
    "Chapter four introduced splitting state to limit blast radius. Here is the trade-off in numbers. The same nine hundred instances were planned two ways: as one state, and as three states of three hundred. A destroy plan against the single state covers all nine hundred. Against the application's state, it covers three hundred and nothing else. Every plan of the large state refreshes everything and holds one lock for all of it. Even with terraform data, which needs no network at all, the large plan took four times as long; with real providers, every instance is an API call, and the gap grows. What one state gives you in return is simplicity. References between parts are direct, and Terraform orders everything for you. Split the state, and plans get faster, locks and permissions get separate, but ordering across states becomes your problem: something must apply the network before the application, and pass values between them through published outputs. So split deliberately, along ownership and rate of change, as chapter four suggested, and when objects need to move between states, use chapter six's removed and import blocks rather than editing state by hand.",
}
