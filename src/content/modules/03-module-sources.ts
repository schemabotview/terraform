import type { Section } from '../types'

export const moduleSources: Section = {
  id: 'module-sources',
  title: 'Local, registry and Git sources',
  scene: 'module-sources',
  focus: 'install',
  slide: `## Module sources and versions

\`source\` says where a module's code comes from. Each kind of source is pinned in its own way.

### Three common sources
- **Local path**: changes with the repository itself
- **Registry**: \`version\` selects a release, like providers
- **Git**: \`?ref=\` picks a tag or a commit

### Installing
- \`init\` downloads modules into \`.terraform/modules\`
- Change a \`source\` or \`version\`, and run \`init\` again
- A module's provider ranges combine with the root's

### Choosing a source
- Local paths for code used in one repository
- Versioned sources for code shared across teams

### Not in the lock file
- The lock file records providers, never modules
- Pin modules explicitly and review upgrades like code`,
  narration:
    "Where a module comes from is set by its source argument, and each kind of source is versioned differently. A local path, like dot slash modules slash web, has no version of its own: it changes whenever the repository changes, which is ideal for modules that live alongside the configuration using them. A registry source names a published module, and a separate version argument selects a release with the same constraint syntax you use for providers. A Git source points at a repository, and the ref parameter pins a tag or commit. On the left, a Git source pinned to v one point oh point oh is installed by init into the dot terraform slash modules folder. Notice the last line, too: the module asks for local version two point nine or newer, the root asks for tilde greater-than two point nine, and Terraform combines both ranges. Changing a source or a version means running init again. And one important gap: the dependency lock file records providers only. Modules are never locked, so the only protection is pinning them explicitly and reviewing every upgrade as you would any code change.",
}
