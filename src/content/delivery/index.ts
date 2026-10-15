import type { Course } from '../types'
import { reviewOwnership } from './01-review-ownership'
import { ciChecks } from './02-ci-checks'
import { reviewedApply } from './03-reviewed-apply'
import { promotion } from './04-promotion'
import { driftDetection } from './05-drift-detection'
import { policyChecks } from './06-policy-checks'
import { hcpTerraform } from './07-hcp-terraform'
import { auditProvenance } from './08-audit-provenance'

// Chapter 9 of TERRAFORM-COURSE-PLAN.md. The CI script, saved-plan apply, promotion, drift exit codes,
// policy check and provenance record are real runs (Terraform 1.16.6 + hashicorp/local 2.9.1) in a
// local Git repository. CODEOWNERS and the HCP Terraform cloud block are illustrative and labelled.
export const delivery: Course = {
  id: 'delivery',
  title: 'Team Workflows, Delivery, and Governance',
  sections: [
    reviewOwnership,
    ciChecks,
    reviewedApply,
    promotion,
    driftDetection,
    policyChecks,
    hcpTerraform,
    auditProvenance,
  ],
}
