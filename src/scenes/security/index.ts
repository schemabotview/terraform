import type { Scene } from '@graphlearning/flow'
import { identities } from './identities'
import { federation } from './federation'
import { sensitiveValues } from './sensitive-values'
import { artefactExposure } from './artefact-exposure'
import { ephemeral } from './ephemeral'
import { supplyChain } from './supply-chain'
import { leastPrivilege } from './least-privilege'

// One bundle per course folder, spread into src/scenes/index.ts.
export const securityScenes: Scene[] = [
  identities,
  federation,
  sensitiveValues,
  artefactExposure,
  ephemeral,
  supplyChain,
  leastPrivilege,
]
