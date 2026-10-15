import type { Section } from '../types'

export const reviewOwnership: Section = {
  id: 'review-ownership',
  title: 'Git history, code review and ownership',
  scene: 'review-ownership',
  focus: 'review',
  slide: `## Review and ownership

Infrastructure changes go through version control like any other code: a branch, a review, a merge, a history.

### The repository
- Modules with their tests; one root module per environment
- Lock files committed; state, plans and \`.terraform/\` ignored
- Pipeline scripts beside the code they check

### Ownership
- A \`CODEOWNERS\` file routes reviews by path
- Production paths need production approvers

### What a review checks
- **Intent**: is this the change we want?
- **Plan**: is this what will actually happen?
- **Owner**: is the right person approving?
- Small, single-purpose changes review best`,
  narration:
    "This chapter puts everything so far into a team workflow, and it starts with version control. Infrastructure changes should travel exactly like application code: on a branch, through a review, into a merge, leaving a history you can read later. On the left is the repository used for every run in this chapter. There is one module, with its tests beside it, and one root module per environment, staging and production. The lock files are committed, and state, saved plans and the dot terraform folders are ignored, for the reasons chapters two, four and eight gave. The pipeline scripts live in the same repository as the code they check. Ownership is expressed in a code owners file, which most Git hosts read to route reviews by path. Changes to shared modules go to the platform team, and changes under the production directory need production approvers. Then the review itself has three questions. Intent: is this the change we actually want? Plan: is this what will actually happen? A diff of configuration does not answer that; the plan does. And owner: is the person approving the right one for this part of the system?",
}
