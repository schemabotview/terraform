import type { Scene } from '@graphlearning/flow'
import { reviewOwnership } from './review-ownership'
import { ciChecks } from './ci-checks'
import { reviewedApply } from './reviewed-apply'
import { promotion } from './promotion'
import { driftDetection } from './drift-detection'
import { policyChecks } from './policy-checks'
import { hcpTerraform } from './hcp-terraform'
import { auditProvenance } from './audit-provenance'

// One bundle per course folder, spread into src/scenes/index.ts.
export const deliveryScenes: Scene[] = [
  reviewOwnership,
  ciChecks,
  reviewedApply,
  promotion,
  driftDetection,
  policyChecks,
  hcpTerraform,
  auditProvenance,
]
