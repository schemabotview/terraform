import type { Scene } from '@graphlearning/flow'
import { diagnosis } from './diagnosis'
import { interruptedApply } from './interrupted-apply'
import { stateRecovery } from './state-recovery'
import { upgrades } from './upgrades'
import { boundaries } from './boundaries'
import { stateLayout } from './state-layout'
import { courseReview } from './course-review'

// One bundle per course folder, spread into src/scenes/index.ts.
export const recoveryScenes: Scene[] = [
  diagnosis,
  interruptedApply,
  stateRecovery,
  upgrades,
  boundaries,
  stateLayout,
  courseReview,
]
