import type { Course } from '../types'
import { identities } from './01-identities'
import { federation } from './02-federation'
import { sensitiveValues } from './03-sensitive-values'
import { artefactExposure } from './04-artefact-exposure'
import { ephemeral } from './05-ephemeral'
import { supplyChain } from './06-supply-chain'
import { leastPrivilege } from './07-least-privilege'

// Chapter 8 of TERRAFORM-COURSE-PLAN.md. Plans, greps, errors and the rendered policy are real
// Terraform 1.16.6 output (with hashicorp/aws 6.69.0 offline, random 3.9.1, local 2.9.1). The
// identity matrix and the federation flow are teaching material; the provider block validates.
export const security: Course = {
  id: 'security',
  title: 'Credentials, Secrets, and Secure Automation',
  sections: [identities, federation, sensitiveValues, artefactExposure, ephemeral, supplyChain, leastPrivilege],
}
