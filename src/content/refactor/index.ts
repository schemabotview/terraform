import type { Course } from '../types'
import { adoptionInventory } from './01-adoption-inventory'
import { importBlocks } from './02-import-blocks'
import { generatedConfig } from './03-generated-config'
import { postImport } from './04-post-import'
import { movedBlocks } from './05-moved-blocks'
import { removedBlocks } from './06-removed-blocks'
import { stateCommands } from './07-state-commands'

// Chapter 6 of TERRAFORM-COURSE-PLAN.md. Every import, generated block, plan and state command output
// is real Terraform 1.16.6 with hashicorp/random 3.9.1 and local 2.9.1. The aws_s3_bucket import row
// is from that resource's documentation.
export const refactor: Course = {
  id: 'refactor',
  title: 'Adopting and Refactoring Infrastructure',
  sections: [adoptionInventory, importBlocks, generatedConfig, postImport, movedBlocks, removedBlocks, stateCommands],
}
