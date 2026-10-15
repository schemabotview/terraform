import type { Course } from '../types'
import { diagnosis } from './01-diagnosis'
import { interruptedApply } from './02-interrupted-apply'
import { stateRecovery } from './03-state-recovery'
import { upgrades } from './04-upgrades'
import { boundaries } from './05-boundaries'
import { stateLayout } from './06-state-layout'
import { courseReview } from './07-course-review'

// Chapter 10 of TERRAFORM-COURSE-PLAN.md. The failures, interrupted apply, state push safeguards,
// forced restore, force-unlock race, CLI cross-version check (1.17.0-rc2 -> 1.16.6) and state-layout
// numbers are real Terraform runs. The boundaries section is teaching material.
export const recovery: Course = {
  id: 'recovery',
  title: 'Failure Recovery and Architecture Evolution',
  sections: [diagnosis, interruptedApply, stateRecovery, upgrades, boundaries, stateLayout, courseReview],
}
