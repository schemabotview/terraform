import type { Scene } from '@graphlearning/flow'

// §7 — the course as one lifecycle. Each card is a chapter, badged by number.
export const courseReview: Scene = {
  id: 'course-review',
  title: 'The whole lifecycle',
  flow: 'TB',
  nodes: [
    {
      id: 'spine',
      label: 'From a first plan to a recovered system',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c1', label: 'Lifecycle', sub: 'desired state, plan, apply', icon: 'repeat', pattern: 'service', badge: '01' },
        { id: 'c2', label: 'Configuration', sub: 'types, providers, locks', icon: 'braces', pattern: 'service', badge: '02' },
        { id: 'c3', label: 'Planning', sub: 'graphs, keys, replacement', icon: 'workflow', pattern: 'service', badge: '03' },
        { id: 'c4', label: 'State', sub: 'backends, locks, drift', icon: 'database', pattern: 'storage', badge: '04' },
        { id: 'c5', label: 'Modules', sub: 'interfaces, composition', icon: 'boxes', pattern: 'storage', badge: '05' },
        { id: 'c6', label: 'Refactoring', sub: 'import, moved, removed', icon: 'swap', pattern: 'storage', badge: '06' },
        { id: 'c7', label: 'Evidence', sub: 'validation and tests', icon: 'circlecheck', pattern: 'network', badge: '07' },
        { id: 'c8', label: 'Security', sub: 'identities and secrets', icon: 'shieldcheck', pattern: 'network', badge: '08' },
        { id: 'c9', label: 'Delivery', sub: 'review, apply, govern', icon: 'gitbranch', pattern: 'network', badge: '09' },
        { id: 'c10', label: 'Recovery', sub: 'diagnose and evolve', icon: 'history', pattern: 'warn', badge: '10' },
      ],
    },
  ],
  edges: [],
}
