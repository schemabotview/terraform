import type { Section } from '../types'

export const staticChecks: Section = {
  id: 'static-checks',
  title: 'fmt, validate and the limits of static checks',
  scene: 'static-checks',
  focus: 'apply',
  slide: `## What static checks catch

\`fmt\` and \`validate\` run without touching any real system. They are fast, cheap and limited.

### validate catches
- Syntax errors, unknown arguments, wrong types
- Values the provider schema rejects, like a non-octal mode
- References to things that do not exist

### validate cannot catch
- What only the real system knows: paths, quotas, permissions
- Here: \`Success!\`, then apply failed on the directory
- Whether the configuration does what you meant

### Use them anyway
- On every save and every commit: they cost seconds
- \`fmt -check\` fails a pipeline when layout drifts
- A clean \`validate\` is the floor, never the evidence`,
  narration:
    "This chapter is about evidence: what can each kind of check actually prove? We start with the cheapest. terraform fmt checks layout, and terraform validate checks the configuration against the language and the providers' schemas, all without touching any real system. On the left is a configuration with three mistakes. validate catches two of them: an argument that is not in the resource's schema, and a file permission that is not valid octal, which the provider's own schema validation rejects. Fix those two and validate says success. But the third mistake is still there. The second file points at a directory that cannot be created, and only the real system knows that. So apply creates the first file, then fails on the second. That is the boundary of static checks. They cannot know about paths, quotas, permissions, names already taken, or anything else that only the real system can answer. And they certainly cannot tell whether the configuration does what you intended. Run them anyway, on every save and every commit, because they cost seconds and catch a lot. Just treat a clean validate as the floor, not as evidence that a change is safe.",
}
