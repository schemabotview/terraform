import type { Scene } from '@graphlearning/flow'
import { stateFile } from './state-file'
import { drift } from './drift'
import { localVsRemote } from './local-vs-remote'
import { backendMigration } from './backend-migration'
import { locking } from './locking'
import { protectingState } from './protecting-state'
import { stateBoundaries } from './state-boundaries'
import { workspaces } from './workspaces'

// One bundle per course folder, spread into src/scenes/index.ts.
export const stateScenes: Scene[] = [
  stateFile,
  drift,
  localVsRemote,
  backendMigration,
  locking,
  protectingState,
  stateBoundaries,
  workspaces,
]
