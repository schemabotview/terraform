import type { Course } from '../types'
import { childModule } from './01-child-module'
import { moduleInterface } from './02-module-interface'
import { moduleSources } from './03-module-sources'
import { moduleProviders } from './04-module-providers'
import { composition } from './05-composition'
import { moduleForEach } from './06-module-for-each'
import { abstraction } from './07-abstraction'

// Chapter 5 of TERRAFORM-COURSE-PLAN.md. Every plan, init line and error is real Terraform 1.16.6
// output: local modules over hashicorp/local and terraform_data, a Git source from a local tagged
// repository, and an aws 6.69.0 module planned offline. The registry source is the documented form.
export const modules: Course = {
  id: 'modules',
  title: 'Modules and Maintainable Composition',
  sections: [childModule, moduleInterface, moduleSources, moduleProviders, composition, moduleForEach, abstraction],
}
