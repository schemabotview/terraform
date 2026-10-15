import type { Course } from '../types'
import { dependencyGraph } from './01-dependency-graph'
import { hiddenDependency } from './02-hidden-dependency'
import { unknownValues } from './03-unknown-values'
import { countVsForEach } from './04-count-vs-for-each'
import { changeActions } from './05-change-actions'
import { lifecycleRules } from './06-lifecycle-rules'
import { escapeHatches } from './07-escape-hatches'
import { partialApply } from './08-partial-apply'

// Chapter 3 of TERRAFORM-COURSE-PLAN.md. Every plan, apply log and error on these slides is real
// Terraform 1.16.6 output, from configurations using terraform_data and hashicorp/local + random so
// that applies (and failures) could run for real; the timeouts block was validated against aws 6.69.0.
export const planning: Course = {
  id: 'planning',
  title: 'Dependencies, Resource Identity, and Change Planning',
  sections: [
    dependencyGraph,
    hiddenDependency,
    unknownValues,
    countVsForEach,
    changeActions,
    lifecycleRules,
    escapeHatches,
    partialApply,
  ],
}
