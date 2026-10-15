import type { Scene } from '@graphlearning/flow'

// §5 — a scheduled job that never applies. Script and results are real 1.16.6 runs: prod's file was
// edited by hand; staging had an unapplied merge (port 7070) but no drift.
export const driftDetection: Scene = {
  id: 'drift-detection',
  title: 'Scheduled drift detection',
  flow: 'TB',
  nodes: [
    {
      id: 'script',
      kind: 'code',
      filename: 'drift.sh (excerpt: -input=false, -no-color and redirects trimmed)',
      label: `d="$1"
terraform -chdir="$d" plan -refresh-only -detailed-exitcode -lock=false
drift=$?
terraform -chdir="$d" plan -detailed-exitcode -lock=false
pending=$?
echo "$d: drift=$drift pending=$pending   (0 none, 2 found, 1 error)"`,
    },
    {
      id: 'results',
      kind: 'code',
      filename: 'two environments, one night',
      label: `envs/staging: drift=0 pending=2   (0 none, 2 found, 1 error)
envs/prod: drift=2 pending=2   (0 none, 2 found, 1 error)`,
    },
    {
      id: 'decide',
      label: 'Each signal goes to someone',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'drift-owner', label: 'Drift', sub: 'who changed it, and should it stay?', icon: 'search', pattern: 'warn' },
        { id: 'pending-owner', label: 'Pending', sub: 'merged but never applied', icon: 'clock', pattern: 'warn' },
      ],
    },
  ],
  edges: [
    { source: 'script', target: 'results' },
    { source: 'results', target: 'decide' },
  ],
}
