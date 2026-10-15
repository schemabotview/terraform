import type { Course } from '../types'
import { staticChecks } from './01-static-checks'
import { inputValidation } from './02-input-validation'
import { conditionsChecks } from './03-conditions-checks'
import { testFiles } from './04-test-files'
import { mocks } from './05-mocks'
import { evidenceTypes } from './06-evidence-types'
import { testLimits } from './07-test-limits'

// Chapter 7 of TERRAFORM-COURSE-PLAN.md. Every validate, plan, apply and `terraform test` result is
// real Terraform 1.16.6 output with hashicorp/local 2.9.1 and random 3.9.1, including the mocked run,
// the failing assertion and the failed teardown. The evidence table (§6) is a teaching summary.
export const testing: Course = {
  id: 'testing',
  title: 'Validation, Tests, and Change Evidence',
  sections: [staticChecks, inputValidation, conditionsChecks, testFiles, mocks, evidenceTypes, testLimits],
}
