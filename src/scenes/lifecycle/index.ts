import type { Scene } from '@graphlearning/flow'
import { threeApproaches } from './three-approaches'
import { coreAndProviders } from './core-and-providers'
import { fourLayers } from './four-layers'
import { hclAnatomy } from './hcl-anatomy'
import { firstWorkflow } from './first-workflow'
import { changeAndDestroy } from './change-and-destroy'

// One bundle per course folder, spread into src/scenes/index.ts.
export const lifecycleScenes: Scene[] = [threeApproaches, coreAndProviders, fourLayers, hclAnatomy, firstWorkflow, changeAndDestroy]
