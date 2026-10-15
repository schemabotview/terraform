import type { Scene } from '@graphlearning/flow'

// §2 — short-lived credentials from a CI identity token. providers.tf validated against
// hashicorp/aws 6.69.0 (1.16.6 `terraform validate`: Success); the account ID is the AWS
// documentation example and the flow is described, not run.
export const federation: Scene = {
  id: 'federation',
  title: 'Federation and short-lived credentials',
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: 'No stored keys: a token is exchanged per run',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'token', label: 'CI token', sub: 'signed, names repo and branch', icon: 'fingerprint', pattern: 'network', badge: '1' },
        { id: 'trust', label: 'Trust policy', sub: 'accepts that repo and branch', icon: 'shieldcheck', pattern: 'network', badge: '2' },
        { id: 'sts', label: 'STS', sub: 'issues credentials', icon: 'key', pattern: 'network', badge: '3' },
        { id: 'expiry', label: 'One hour', sub: 'then they expire', icon: 'clock', pattern: 'network', badge: '4' },
      ],
    },
    {
      id: 'provider',
      kind: 'code',
      filename: 'providers.tf — terraform validate: Success',
      label: `provider "aws" {
  region = "eu-west-1"

  assume_role_with_web_identity {
    role_arn                = "arn:aws:iam::111122223333:role/shop-staging-apply"
    web_identity_token_file = "/tmp/ci/oidc-token"
    session_name            = "ci-shop-staging"
    duration                = "1h"
  }
}`,
    },
  ],
  edges: [{ source: 'flow', target: 'provider', label: 'configured as' }],
}
