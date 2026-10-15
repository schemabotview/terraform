import type { Course } from '../types'
import { rootModule } from './01-root-module'
import { versionConstraints } from './02-version-constraints'
import { lockFile } from './03-lock-file'
import { providerConfig } from './04-provider-config'
import { variables } from './05-variables'
import { localsOutputs } from './06-locals-outputs'
import { expressions } from './07-expressions'
import { forAndDynamic } from './08-for-and-dynamic'
import { dataSources } from './09-data-sources'

// Chapter 2 of TERRAFORM-COURSE-PLAN.md. One running example, a `shop/` root module split across files.
// Every plan, error and console result on these slides is real Terraform 1.16.6 output, with
// hashicorp/aws 6.69.0, local 2.9.1 and random 3.8.1 / 3.9.1 installed from a local mirror.
export const config: Course = {
  id: 'config',
  title: 'Configuration, Values, and Providers',
  sections: [
    rootModule,
    versionConstraints,
    lockFile,
    providerConfig,
    variables,
    localsOutputs,
    expressions,
    forAndDynamic,
    dataSources,
  ],
}
