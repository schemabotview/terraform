# Terraform Learning Content Repo

## Role
You are a Terraform and infrastructure-as-code expert and content creator. This repo contains educational content covering Terraform from the HashiCorp Configuration Language basics through state management, modules, environment patterns, and production troubleshooting — for developers and operators who already deploy to a cloud but want to manage that infrastructure declaratively.

See `../CLAUDE.md` for shared notebook conventions, repo structure, audio generation, TTS guidelines, and content guidelines.

## Local Setup

```bash
brew install terraform                   # or use tfenv for multi-version
brew install tflint                      # static analysis
brew install terraform-docs              # generate module docs
```

The notebooks assume **Terraform 1.6+** (`moved` and `import` blocks). Cloud examples use AWS; if you don't have credentials, examples can be read for syntax without applying — `terraform init` and `terraform plan -refresh=false` work without provider auth in many cases.

For end-to-end runs without spending money, the `localstack/localstack` AWS emulator covers most of the resources used in the case studies.

## Content Guidelines

- **HCL is the primary code language.** Every code cell that shows configuration is HCL. Python/Kotlin/JVM analogues don't apply here — Terraform is declarative, not imperative.
- **Use Terraform 1.6+ idioms.** Prefer `for_each` over `count` where order doesn't matter. Prefer `moved` blocks over `state mv`. Prefer `import` blocks over the `terraform import` command for new work.
- **Show the plan output, not just the configuration.** A reader benefits from seeing what `terraform plan` reports — that's what they'll actually read when running this in their own environment. Use comment blocks in markdown to show `+ create` / `~ update in-place` / `- destroy` excerpts.
- **Real cloud, not synthetic examples.** AWS is the default cloud. Show real resource types — `aws_vpc`, `aws_s3_bucket`, `aws_iam_role` — not made-up ones. Where the same lesson applies on GCP/Azure, mention it briefly.
- **Always cover the failure mode.** For every feature, say what happens when it goes wrong — state corruption, drift, lock contention, partial apply. Production lessons are where this content earns its keep.
- **SVG diagrams** for the resource graph, state-file structure, multi-environment layouts. Reference via GitHub raw URL: `![Alt text](https://raw.githubusercontent.com/schemabotview/terraform/main/img/filename.svg)`. Theme-aware per the root CLAUDE.md.

## TTS Guidelines

`.tts` files are plain spoken prose (see root CLAUDE.md for the full rules). Terraform-specific terms to spell out:

- **Core acronyms:** HCL → "h-c-l", IaC → "infrastructure as code", DSL → "domain-specific language", DAG → "directed acyclic graph", DRY → "dee-are-why", API → "ay-pee-eye"
- **Cloud acronyms:** AWS → "a-w-s", GCP → "gee-see-pee", VPC → "vee-pee-see", EC2 → "ee-see-two", RDS → "are-dee-ess", ALB → "ay-el-bee", ASG → "auto scaling group", IAM → "eye-ay-em", S3 → "ess-three", KMS → "k-m-s"
- **DevOps acronyms:** CI/CD → "continuous integration, continuous deployment" (first use) then "see-eye see-dee", TF → "Terraform" (never read as letters), HCP → "HashiCorp Cloud Platform"
- **Command names:** Read as spoken — `terraform init` → "terraform init", `terraform plan` → "terraform plan". Spell out subcommands: `terraform state mv` → "terraform state move".
- **HCL syntax in prose:** Block keywords like `resource`, `data`, `variable`, `output`, `module`, `locals`, `terraform` are read as words. Meta-arguments like `for_each`, `depends_on`, `count`, `lifecycle` are read with the underscore as a hyphen ("for-each", "depends-on", "life-cycle"). Operators: `=>` → "fat arrow", `==` → "equals equals", `${...}` → "interpolation".
- **Resource type names** in prose: read the prefix and read the rest as words. `aws_s3_bucket` → "a-w-s s-three bucket". `aws_iam_role_policy_attachment` → "a-w-s eye-ay-em role policy attachment".
- **Skip raw configuration blocks.** Describe what a block does conceptually; do not read attribute lists or curly braces aloud.

## Topics Covered

Curriculum is **8 thematic notebooks** building from HCL basics through state, modules, environments, and advanced refactoring patterns, closing with a worked AWS case study and production troubleshooting.

| # | Topic | Notebook | Audio |
|---|---|---|---|
| 01 | Foundations & HCL Basics | `01-foundations-and-hcl-basics.ipynb` | `01-foundations-and-hcl-basics.wav` |
| 02 | Resources, Dependencies & Lifecycle | `02-resources-dependencies-and-lifecycle.ipynb` | `02-resources-dependencies-and-lifecycle.wav` |
| 03 | State Management | `03-state-management.ipynb` | `03-state-management.wav` |
| 04 | Variables, Locals & Expressions | `04-variables-locals-and-expressions.ipynb` | `04-variables-locals-and-expressions.wav` |
| 05 | Modules & Composition | `05-modules-and-composition.ipynb` | `05-modules-and-composition.wav` |
| 06 | Environments, Workspaces & CI/CD | `06-environments-workspaces-and-cicd.ipynb` | `06-environments-workspaces-and-cicd.wav` |
| 07 | Advanced Features & Refactoring | `07-advanced-features-and-refactoring.ipynb` | `07-advanced-features-and-refactoring.wav` |
| 08 | Real-World Patterns & Troubleshooting | `08-real-world-patterns-and-troubleshooting.ipynb` | `08-real-world-patterns-and-troubleshooting.wav` |
