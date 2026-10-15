import { lifecycle } from './lifecycle'
import { config } from './config'
import { planning } from './planning'
import { state } from './state'
import { modules } from './modules'
import { refactor } from './refactor'
import { testing } from './testing'
import { security } from './security'
import { delivery } from './delivery'
import { recovery } from './recovery'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [lifecycle.id]: lifecycle,
  [config.id]: config,
  [planning.id]: planning,
  [state.id]: state,
  [modules.id]: modules,
  [refactor.id]: refactor,
  [testing.id]: testing,
  [security.id]: security,
  [delivery.id]: delivery,
  [recovery.id]: recovery,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
