import type { Scene } from '@graphlearning/flow'
import { childModule } from './child-module'
import { moduleInterface } from './module-interface'
import { moduleSources } from './module-sources'
import { moduleProviders } from './module-providers'
import { composition } from './composition'
import { moduleForEach } from './module-for-each'
import { abstraction } from './abstraction'

// One bundle per course folder, spread into src/scenes/index.ts.
export const moduleScenes: Scene[] = [
  childModule,
  moduleInterface,
  moduleSources,
  moduleProviders,
  composition,
  moduleForEach,
  abstraction,
]
