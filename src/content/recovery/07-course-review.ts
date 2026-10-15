import type { Section } from '../types'

export const courseReview: Section = {
  id: 'course-review',
  title: 'Integrated lifecycle review and continued practice',
  scene: 'course-review',
  focus: 'c10',
  slide: `## The whole lifecycle

Ten chapters, one idea: configuration describes what should exist, and every tool around it protects that description and its record.

### What you can now explain
- How a plan is derived, and what it cannot show
- Who owns each object, and where that is recorded
- What evidence supports a change, and what does not

### Keep practising
- Rebuild the examples; break them on purpose
- Read provider and backend docs for the versions you run
- Review real plans with someone experienced
- Every example here was a real run: repeat them

### Beyond this course
- Production responsibility needs **demonstrated** deploys and recoveries`,
  narration:
    "That is the whole lifecycle. It started with one small resource and a single idea: configuration describes what should exist, Terraform compares it with what it has recorded, and a plan shows the difference before anything changes. Every chapter since has built on that. How configuration expresses intent, and how dependencies and identity shape a plan. Why state matters, and how to protect it. How modules package configuration, and how to adopt and refactor without destroying what you meant to keep. What evidence each kind of check provides. How credentials and secrets leak, and how teams review, apply and govern changes. And finally, how to diagnose and recover when something goes wrong. You should now be able to explain how a plan is derived and what it cannot show, who owns each object and where that ownership is recorded, and what evidence supports a change. To go further, rebuild these examples yourself and break them on purpose. Read the documentation for the provider and backend versions you actually run. Review real plans with someone experienced. And remember that understanding is the start. Responsibility for production comes with demonstrated deployments and demonstrated recoveries.",
}
