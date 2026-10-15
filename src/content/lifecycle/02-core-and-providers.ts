import type { Section } from '../types'

export const coreAndProviders: Section = {
  id: 'core-and-providers',
  title: 'Core, providers and APIs',
  scene: 'core-and-providers',
  focus: 'aws',
  slide: `## Core, providers and APIs

Terraform is two programs talking to each other. **Core** is the CLI you run. **Providers** are plugins that know one platform's resource types and API.

### Core's job
- Read configuration and state, build the dependency **graph**
- Compute the plan, then record results in **state**

### A provider's job
- Define each resource type's **schema**: its arguments and attributes
- Turn create, update and delete into **API calls**, with your credentials

### Where responsibility ends
- \`terraform_data\` is built in: no download, no API, no credentials
- An \`aws_s3_bucket\` needs \`hashicorp/aws\`, credentials and a real account
- The **remote API** has the final say on what exists`,
  narration:
    "When you run Terraform, two kinds of program are involved, and knowing which one does what will save you a lot of confusion later. The first is Terraform core, the CLI binary itself. Core reads your configuration and your state, works out how resources depend on each other, builds a graph from that, computes the plan, and records the results in state. What core does not do is talk to any cloud. That is the job of providers. A provider is a plugin that knows one platform: its resource types, the schema of arguments and attributes each type has, and how to turn create, update and delete into calls against that platform's API. Core talks to providers, and providers talk to the APIs. This chapter's example uses terraform data, which is built into Terraform itself. There is nothing to download, no API, and no credentials, which makes it a safe place to learn the workflow. A real cloud resource, like an S3 bucket, is different: init has to download the AWS provider, the provider needs credentials from your environment, and the API on the other end has the final say on what actually exists.",
}
