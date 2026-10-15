import type { Course } from '../types'
import { desiredState } from './01-desired-state'
import { coreAndProviders } from './02-core-and-providers'
import { fourLayers } from './03-four-layers'
import { hclAnatomy } from './04-hcl-anatomy'
import { firstWorkflow } from './05-first-workflow'
import { changeAndDestroy } from './06-change-and-destroy'

// Chapter 1 of TERRAFORM-COURSE-PLAN.md. Every plan and command output on these slides comes from a
// real Terraform 1.16.6 run against the built-in terraform_data resource.
export const lifecycle: Course = {
  id: 'lifecycle',
  title: 'Infrastructure as Code and a First Lifecycle',
  sections: [desiredState, coreAndProviders, fourLayers, hclAnatomy, firstWorkflow, changeAndDestroy],
}
