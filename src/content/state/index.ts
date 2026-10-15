import type { Course } from '../types'
import { stateFile } from './01-state-file'
import { drift } from './02-drift'
import { localVsRemote } from './03-local-vs-remote'
import { backendMigration } from './04-backend-migration'
import { locking } from './05-locking'
import { protectingState } from './06-protecting-state'
import { stateBoundaries } from './07-state-boundaries'
import { workspaces } from './08-workspaces'

// Chapter 4 of TERRAFORM-COURSE-PLAN.md. Every state excerpt, plan, prompt and lock error is real
// Terraform 1.16.6 output. The S3 backend ran against a local S3 emulator (moto) with versioning on;
// its endpoint came from capture-only backend config that the slides never show.
export const state: Course = {
  id: 'state',
  title: 'State, Backends, and Environment Boundaries',
  sections: [stateFile, drift, localVsRemote, backendMigration, locking, protectingState, stateBoundaries, workspaces],
}
