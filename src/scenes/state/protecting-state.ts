import type { Scene } from '@graphlearning/flow'

// §6 — the state bucket's own protections, read back from the S3 emulator with boto3 after the
// chapter's runs (version IDs shortened). Lock-file versions are omitted from the listing.
export const protectingState: Scene = {
  id: 'protecting-state',
  title: 'Protecting state',
  flow: 'TB',
  nodes: [
    {
      id: 'versions',
      kind: 'code',
      filename: 'shop-tfstate — object versions of shop/app.tfstate',
      label: `version   modified  size  latest
00cf5366  18:49:43  3211  true
fb8dd1ba  18:49:32  3211  false
09cc3726  18:49:14  3211  false
c2cbf967  18:48:42  2394  false   # the migrated original

ServerSideEncryption: AES256`,
    },
    {
      id: 'controls',
      label: 'Four protections, four different jobs',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'encryption', label: 'Encryption', sub: 'at rest and in transit', icon: 'lock', pattern: 'storage' },
        { id: 'access', label: 'Access', sub: 'few readers, fewer writers', icon: 'shieldcheck', pattern: 'storage' },
        { id: 'history', label: 'Versions', sub: 'roll back a bad write', icon: 'history', pattern: 'storage' },
        { id: 'copies', label: 'Stray copies', sub: 'backups, pulls, plans', icon: 'copy', pattern: 'warn' },
      ],
    },
  ],
  edges: [{ source: 'versions', target: 'controls' }],
}
