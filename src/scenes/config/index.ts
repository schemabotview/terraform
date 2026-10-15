import type { Scene } from '@graphlearning/flow'
import { rootModule } from './root-module'
import { versionConstraints } from './version-constraints'
import { lockFile } from './lock-file'
import { providerConfig } from './provider-config'
import { variables } from './variables'
import { localsOutputs } from './locals-outputs'
import { expressions } from './expressions'
import { forAndDynamic } from './for-and-dynamic'
import { dataSources } from './data-sources'

// One bundle per course folder, spread into src/scenes/index.ts.
export const configScenes: Scene[] = [
  rootModule,
  versionConstraints,
  lockFile,
  providerConfig,
  variables,
  localsOutputs,
  expressions,
  forAndDynamic,
  dataSources,
]
