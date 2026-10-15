import type { Scene } from '@graphlearning/flow'
import { adoptionInventory } from './adoption-inventory'
import { importBlocks } from './import-blocks'
import { generatedConfig } from './generated-config'
import { postImport } from './post-import'
import { movedBlocks } from './moved-blocks'
import { removedBlocks } from './removed-blocks'
import { stateCommands } from './state-commands'

// One bundle per course folder, spread into src/scenes/index.ts.
export const refactorScenes: Scene[] = [
  adoptionInventory,
  importBlocks,
  generatedConfig,
  postImport,
  movedBlocks,
  removedBlocks,
  stateCommands,
]
