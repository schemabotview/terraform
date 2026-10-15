import type { Scene } from '@graphlearning/flow'
import { staticChecks } from './static-checks'
import { inputValidation } from './input-validation'
import { conditionsChecks } from './conditions-checks'
import { testFiles } from './test-files'
import { mocks } from './mocks'
import { evidenceTypes } from './evidence-types'
import { testLimits } from './test-limits'

// One bundle per course folder, spread into src/scenes/index.ts.
export const testingScenes: Scene[] = [
  staticChecks,
  inputValidation,
  conditionsChecks,
  testFiles,
  mocks,
  evidenceTypes,
  testLimits,
]
