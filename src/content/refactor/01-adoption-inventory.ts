import type { Section } from '../types'

export const adoptionInventory: Section = {
  id: 'adoption-inventory',
  title: 'Inventory, ownership and import support',
  scene: 'adoption-inventory',
  focus: 'questions',
  slide: `## Before you adopt anything

**Adopting** means bringing an existing object under Terraform's management. It starts with questions, not commands.

### Inventory and ownership
- Find what exists and who created it
- Decide who owns it from now on: one state, one root module
- Stop other tools changing it, or plan to share it explicitly

### Import support is per resource type
- The **provider** decides whether a type can be imported
- \`local_file\` cannot; \`random_integer\` and \`aws_s3_bucket\` can
- Each type defines its own import **ID** format
- Check the docs before writing any block

### Adoption is not approval
- Importing records an object; it does not make it correct
- The next plan shows the gap to your intent`,
  narration:
    "So far Terraform has created everything it manages. Real systems rarely start that way. There are servers, buckets and networks that someone built by hand, or with another tool, and at some point you want Terraform to manage them. That is called adoption, and it starts with questions rather than commands. What exists, and who created it? Who should own it from now on, meaning which state and which root module? Is any other tool still changing it, because if so, you will be fighting that tool on every apply. Then there is a technical question: can this resource type be imported at all? That is the provider's decision, per resource type. On the left, an import of a local file is refused outright: the provider simply has not implemented it. The random integer resource can be imported, and so can an S3 bucket, and each type defines its own format for the import ID, which you will find in the provider's documentation. And keep one limit in mind for the whole chapter. Importing an object records it in state. It does not mean the object is configured the way you want.",
}
