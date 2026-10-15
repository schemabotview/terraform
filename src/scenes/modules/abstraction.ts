import type { Scene } from '@graphlearning/flow'

// §7 — the same typo ("versionig") passed to an over-general wrapper and to a narrow module. Both
// results are real 1.16.6 output (terraform_data stand-ins for a bucket).
export const abstraction: Scene = {
  id: 'abstraction',
  title: 'Narrow interfaces versus wrappers',
  flow: 'TB',
  nodes: [
    {
      id: 'wrapper',
      label: 'Wrapper: settings = any',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'wrapper-call',
          kind: 'code',
          hug: true,
          filename: 'caller',
          label: `module "via_wrapper" {
  source = "./modules/wrapper"
  settings = {
    name      = "shop-assets"
    versionig = true
  }
}`,
        },
        {
          id: 'wrapper-plan',
          kind: 'code',
          hug: true,
          filename: 'terraform plan — accepted, silently wrong',
          label: `  # module.via_wrapper.terraform_data.bucket will be created
          + force_destroy = false
          + name          = "shop-assets"
          + versioning    = false`,
        },
      ],
    },
    {
      id: 'narrow',
      label: 'Narrow: one typed variable per input',
      pattern: 'storage',
      cols: 1,
      children: [
        {
          id: 'narrow-error',
          kind: 'code',
          hug: true,
          filename: 'versionig = true — terraform validate',
          label: `Error: Unsupported argument

  on main.tf line 12, in module "via_narrow":
  12:   versionig  = true

An argument named "versionig" is not expected here. Did you mean
"versioning"?`,
        },
      ],
    },
  ],
  edges: [{ source: 'wrapper', target: 'narrow', label: 'same typo' }],
}
