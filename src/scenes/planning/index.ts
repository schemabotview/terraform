import type { Scene } from '@graphlearning/flow'
import { dependencyGraph } from './dependency-graph'
import { hiddenDependency } from './hidden-dependency'
import { unknownValues } from './unknown-values'
import { countVsForEach } from './count-vs-for-each'
import { changeActions } from './change-actions'
import { lifecycleRules } from './lifecycle-rules'
import { escapeHatches } from './escape-hatches'
import { partialApply } from './partial-apply'

// One bundle per course folder, spread into src/scenes/index.ts.
export const planningScenes: Scene[] = [
  dependencyGraph,
  hiddenDependency,
  unknownValues,
  countVsForEach,
  changeActions,
  lifecycleRules,
  escapeHatches,
  partialApply,
]
