# Terraform — From Infrastructure as Code to Reliable Change Management

## Audience and prerequisites

For learners new to Terraform who understand basic files, terminal commands, and infrastructure concepts such as networks, applications, and databases. Introduce HCL and Git collaboration locally. Cloud examples require basic knowledge of the illustrated services; explain the necessary context and use companion cloud plans for depth. Programming expertise is not required.

Scope: Terraform configuration and CLI workflows, resource identity and dependencies, state, modules, adoption/refactoring, validation, secure automation, collaboration, and recovery. This course is independent of certifications. Teach through annotated HCL, commands, plans, graphs, state-binding sketches, tests, and failure timelines. No paid account, submitted exercises, or monitored assessments are required; following examples is optional.

Reference baseline: **Terraform 1.16.x documentation**, inspected on **2026-10-12**. Pin the actual CLI and provider versions when lessons are authored. Provider schemas, backend locking, test capabilities, ephemeral resources, and write-only arguments have independent requirements. Do not assume OpenTofu compatibility. HCP Terraform and Terraform Enterprise are operational comparisons; commercial access is not required. No preview feature is essential to the course.

Target: understand how to construct and interpret configuration and plans, explain infrastructure ownership and changes, and justify state, module, delivery, and recovery decisions. Completion does not establish assessed production competence.

Structure: **10 chapters**, with **6, 9, 8, 8, 7, 7, 7, 7, 8, and 7 sections**. Counts follow conceptual weight rather than quotas or equal teaching duration.

## Learning spine

Understand desired configuration and observed infrastructure → follow one resource through init/plan/apply → express inputs and relationships → reason about graph execution and changes → protect state and ownership → compose modules → adopt/refactor infrastructure → validate and test → collaborate and govern → recover and evolve safely.

Recurring example: a small application environment grows from one resource into network, application, and data components. Start with provider-neutral language examples and a small built-in terraform_data illustration; use AWS as one consistent cloud surface when real infrastructure matters. Explain cloud concepts portably without teaching three provider schemas in parallel. Protect state and credentials from first use; deepen those responsibilities later.

Teaching method: objective → mental model → annotated configuration and expected plan/output → alternative or failure contrast → explanation summary → bridge. Clearly label illustrative output and unexecuted examples. Distinguish configuration, state bindings, provider observations, and actual objects throughout.

## Chapter 1 — Infrastructure as Code and a First Lifecycle

Objective: Explain Terraform's operating model and follow one resource through its lifecycle.

1. Desired-state configuration versus imperative scripts and configuration management
2. Terraform core, providers, APIs, and responsibility boundaries
3. Configuration, state bindings, observed attributes, and real infrastructure
4. HCL blocks, arguments, references, and resource addresses
5. init, fmt, validate, plan, and apply in an annotated first workflow
6. Inspecting outputs, changing configuration, and intentional destruction

Worked illustrations: A small terraform_data configuration; a configuration/state/object diagram; an annotated initial plan, change plan, and destroy plan. Contrast built-in resource behaviour with a cloud resource requiring a provider and credentials. Explain immediately that plan/state files may contain sensitive information, a successful apply does not prove application health, and destruction can have irreversible data consequences.

Outcome: Interpret a small configuration and plan, explain each workflow stage, and distinguish Terraform's recorded bindings from real infrastructure.

Bridge: A first resource establishes the lifecycle; next we make configuration configurable, expressive, and reproducible.

## Chapter 2 — Configuration, Values, and Providers

Objective: Express typed configuration and explain the dependencies needed to interpret it consistently.

1. Root-module directories, .tf files, block structure, and file-loading behaviour
2. CLI version constraints, provider sources, and provider version requirements
3. Dependency lock files, checksums, installation, and controlled upgrades
4. Provider configuration, credentials, aliases, and environment assumptions
5. Variables, types, defaults, null, optional object attributes, and input precedence
6. Locals, outputs, and module-facing contracts
7. Expressions, operators, functions, collections, and type conversion
8. Conditionals, for expressions, templates, and dynamic nested blocks
9. Data sources versus managed resources and external dependencies

Worked illustrations: A typed environment object; tfvars and command-line input precedence; a transformed collection; an output; a provider alias; a data lookup. Explain that file order is not execution order, dynamic blocks generate nested configuration rather than arbitrary top-level resources, and the dependency lock file locks provider selections rather than remote module versions. Avoid embedding credentials in configuration.

Outcome: Construct and interpret a parameterised configuration, explain value flow, and identify which CLI/provider/module dependencies need explicit version control.

Bridge: Expressions connect resources; next we explain how those connections and instance identities shape plans.

## Chapter 3 — Dependencies, Resource Identity, and Change Planning

Objective: Explain why Terraform proposes a change and what its dependency and identity assumptions imply.

1. References, implicit dependencies, graph ordering, and parallelism
2. Explicit depends_on, hidden dependencies, and cycles
3. Unknown values, deferred reads, and plan-time constraints
4. count, for_each, stable keys, and resource-instance addresses
5. Create, update, replace, and delete decisions and provider schemas
6. Lifecycle rules: replacement ordering, protection, ignored changes, and triggers
7. Timeouts, provisioners, terraform_data, and escape-hatch boundaries
8. Saved plans, apply-time failures, and non-transactional execution

Worked illustrations: A dependency graph; a reordered count-based list compared with keyed for_each; an unknown attribute versus unknown instance key; a replacement plan; a partially completed apply. Explain why for_each instance keys must be known and cannot expose sensitive values, and why broad depends_on can make plans more conservative. Contrast create_before_destroy constraints with prevent_destroy limitations and ignore_changes ownership trade-offs. Treat targeting as an exceptional diagnostic/recovery mechanism rather than normal deployment design.

Outcome: Interpret a change plan, explain identity-related churn and dependency ordering, and identify risks a plan cannot eliminate.

Bridge: Instance addresses matter because state binds them to objects; next we protect and partition those bindings.

## Chapter 4 — State, Backends, and Environment Boundaries

Objective: Explain state ownership, concurrency, and storage choices without treating state as a universal source of truth.

1. State bindings, metadata, outputs, and one-owner expectations
2. Refresh, drift, refresh-only plans, and desired-state reconciliation
3. Local versus remote storage and execution-location distinctions
4. Backend configuration, bootstrap, reinitialisation, and migration
5. Backend-specific locking and concurrent-writer hazards
6. Encryption, access, version history, and recovery copies
7. Root modules, separate states, dependencies, and blast radius
8. CLI workspaces versus separate backends and access isolation

Worked illustrations: An address-to-object binding sketch; a manual change and refresh-only comparison; two concurrent writers; a backend migration; alternative environment layouts. Explain that remote storage does not imply remote execution, not every backend supports locking, and CLI workspaces alone do not provide independent credentials or access controls. Distinguish refreshing observations from changing real resources and protect remote-state access even when consumers only want selected outputs.

Outcome: Explain a drift and concurrency scenario, justify a state/backend boundary, and identify permissions and recovery evidence required for safe operation.

Bridge: Ownership and state boundaries are explicit; next we package configuration into reusable modules.

## Chapter 5 — Modules and Maintainable Composition

Objective: Design module interfaces that support reuse without concealing ownership and change consequences.

1. Root and child modules, interfaces, and resource addresses
2. Inputs, outputs, validation contracts, and sensible defaults
3. Local, registry, and version-control sources and version selection
4. Provider inheritance, aliases, and explicit provider passing
5. Composition, dependency inversion, and passing existing resources
6. Repeated modules, stable instance keys, and output collection shapes
7. Documentation, examples, evolution, and abstraction trade-offs

Worked illustrations: Extract an application component into a module; annotate its input/output contract; compare provider alias wiring; contrast a narrowly useful module with an over-general wrapper. Explain that a child module normally shares the calling configuration's state rather than establishing an independent state boundary. Preview address changes before extraction and defer the actual migration mechanism to the next chapter.

Outcome: Explain a module's interface and provider requirements, compose modules through explicit values, and judge whether an abstraction improves maintainability.

Bridge: Reuse changes addresses and ownership; next we adopt existing objects and refactor without unintended recreation.

## Chapter 6 — Adopting and Refactoring Infrastructure

Objective: Explain infrastructure adoption and ownership transitions as explicit configuration and state changes.

1. Inventory, discovery, intended ownership, and provider import support
2. Import blocks, provider-specific IDs, and destination addresses
3. Generated configuration, defaults, and human review
4. Post-import plans and reconciliation with intended configuration
5. moved blocks, renames, module extraction, and compatibility history
6. removed blocks, destruction choices, and ownership handoff
7. State commands, cross-state moves, and migration/recovery boundaries

Worked illustrations: Import an existing resource; review generated attributes; compare a rename with and without a moved block; illustrate a removed block with destroy = false; sketch a coordinated ownership transfer. Explain that import does not prove the configuration expresses the intended infrastructure, removing configuration may propose destruction, and abandoning a binding differs from deleting an object. Coordinate writers and preserve recovery copies before state surgery.

Outcome: Interpret an adoption/refactoring plan, distinguish address migration from resource replacement, and explain a controlled ownership handoff.

Bridge: A plausible migration plan still needs evidence; next we distinguish validation, tests, and operational checks.

## Chapter 7 — Validation, Tests, and Change Evidence

Objective: Select checks according to the claims they can support and their effect on execution.

1. Formatting, validate, provider schemas, and static-check limits
2. Input validation and helpful contract errors
3. Preconditions, postconditions, check blocks, and evaluation timing
4. terraform test files, run blocks, assertions, and expected failures
5. Plan versus apply tests, provider mocks, and overrides
6. Integration, policy, security, and operational health checks
7. Evidence limits, test isolation, cleanup failures, and cost

Worked illustrations: An annotated .tftest.hcl file; an invalid input; a mocked provider result; a real-service integration contrast; a failing check versus blocking precondition. Explain that check failures generally warn rather than block normal operations, while test assertions have their own failure semantics. terraform test defaults and selected run commands can create infrastructure; mocked success does not establish API compatibility or runtime health, and cleanup can fail.

Outcome: Interpret a validation/test result, choose evidence appropriate to a configuration or operational claim, and explain what remains unverified.

Bridge: Tests and automation handle privileged artefacts; next we deepen credential and secret protection before team delivery.

## Chapter 8 — Credentials, Secrets, and Secure Automation

Objective: Explain where sensitive values can appear and how identities and artefacts should be constrained.

1. Human, automation, provider, and backend identities
2. Short-lived credentials, federation, and trust boundaries
3. sensitive values, output redaction, and explicit disclosure paths
4. State, saved plans, logs, and artefact access protection
5. Ephemeral values and write-only arguments with eligibility limits
6. Provider/module supply chains, version provenance, and review
7. Least privilege, environment separation, and deployment boundaries

Worked illustrations: A redacted output whose value remains in state; a pipeline federation diagram; an ephemeral-value contrast; a state/plan access matrix. Explain that sensitive marks do not encrypt or omit values, and fetching a secret through a data source can still persist it. Ephemeral and write-only patterns have allowed contexts and provider requirements; they are not universal secret-removal switches. Treat plan JSON, debug logs, and state backups as potentially revealing.

Outcome: Trace credential and secret exposure paths, distinguish redaction from non-persistence, and justify permissions and artefact protections for automation.

Bridge: Identities and artefacts now have explicit boundaries; next we organise collaborative planning and controlled application.

## Chapter 9 — Team Workflows, Delivery, and Governance

Objective: Explain a collaborative change process that preserves reviewed intent and state ownership.

1. Git history, code review, ownership, and module documentation
2. CI initialisation, validation, tests, and speculative plans
3. Approval, trusted saved plans, freshness, and controlled apply
4. Environment promotion, run serialisation, and concurrent changes
5. Drift detection, reconciliation decisions, and scheduled review
6. Policy, security, and cost checks and their enforcement boundaries
7. HCP Terraform/Enterprise execution and workspace comparisons
8. Audit evidence, artefact provenance, and module distribution

Worked illustrations: Pull request → checks → reviewed plan → controlled apply sequence; a concurrent run invalidating assumptions; a drift notification; a shared module release. Explain why reviewing one plan and applying an unrelated re-plan changes the evidence being approved. Distinguish CLI workspaces from HCP workspaces and local backend choice from hosted execution. Label hosted feature/edition requirements; no commercial service is essential to the example workflow.

Outcome: Explain a team's change path, identify trust and concurrency gaps, and compare local/CI/hosted execution under stated ownership and governance requirements.

Bridge: Controlled workflows reduce risk but cannot remove failures; next we integrate diagnosis, recovery, and evolution.

## Chapter 10 — Failure Recovery and Architecture Evolution

Objective: Reason about interrupted changes and long-term evolution without assuming automatic rollback.

1. Configuration, provider, credential, network, quota, and API failure diagnosis
2. Interrupted and partial apply, observation, and reconciliation
3. State backup/restore, lineage/serial checks, and force-unlock safeguards
4. CLI, provider, module, and backend upgrade strategy
5. Multi-account, multi-region, and multi-cloud boundaries
6. Monolithic versus split-state design and orchestration trade-offs
7. Integrated lifecycle review, ownership decisions, and continued practice

Worked illustrations: A partial-apply timeline; a stale lock with its owner checked; a backup differing from real infrastructure; an upgrade plan; alternative state-layout diagrams. Explain why restoring old state does not restore deleted resources or database contents, force-unlock does not stop a running writer, and forced state pushes can overwrite newer ownership information. Recover by reconciling observed resources, configuration, and valid bindings. Separate Terraform state recovery from application-data recovery and infrastructure portability from provider-specific implementation.

Outcome: Explain a justified recovery sequence, identify when specialist intervention is needed, and compare upgrade and state-layout choices using ownership, coupling, and failure consequences.

Bridge: Continue through optional implementations, current provider/backend documentation, peer-reviewed changes, and operational practice. Production responsibility requires demonstrated deployment and recovery competence beyond following worked explanations.

## Sources and scope

Official sources inspected on 2026-10-12:

- [Introduction](https://developer.hashicorp.com/terraform/intro), [language](https://developer.hashicorp.com/terraform/language), [CLI workflow](https://developer.hashicorp.com/terraform/cli/run), [references and unknown values](https://developer.hashicorp.com/terraform/language/expressions/references), [for_each](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each), [lifecycle](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle), and [terraform_data](https://developer.hashicorp.com/terraform/language/resources/terraform-data).
- [Provider requirements](https://developer.hashicorp.com/terraform/language/providers/requirements), [dependency lock file](https://developer.hashicorp.com/terraform/language/files/dependency-lock), [state](https://developer.hashicorp.com/terraform/language/state), [backends](https://developer.hashicorp.com/terraform/language/backend), [locking](https://developer.hashicorp.com/terraform/language/state/locking), and [CLI workspaces](https://developer.hashicorp.com/terraform/language/state/workspaces).
- [Modules](https://developer.hashicorp.com/terraform/language/modules), [imports](https://developer.hashicorp.com/terraform/language/import), [refactoring](https://developer.hashicorp.com/terraform/language/modules/develop/refactoring), [removed blocks](https://developer.hashicorp.com/terraform/language/block/removed), and [state push safeguards](https://developer.hashicorp.com/terraform/cli/commands/state/push).
- [Validation](https://developer.hashicorp.com/terraform/language/validate), [tests](https://developer.hashicorp.com/terraform/language/tests), [mocking](https://developer.hashicorp.com/terraform/language/tests/mocking), [sensitive data](https://developer.hashicorp.com/terraform/language/manage-sensitive-data), [ephemeral resource values](https://developer.hashicorp.com/terraform/language/manage-sensitive-data/ephemeral), and [HCP run management](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/run/manage).

Book comparison: Yevgeniy (Jim) Brikman's [Terraform: Up and Running, third edition](https://www.oreilly.com/library/view/terraform-up-and/9781098116736/), September 2022, was inspected through publisher description and contents. Scott Winkler's [Terraform in Action](https://www.manning.com/books/terraform-in-action), May 2021, was inspected through publisher description and topic coverage. Full texts were not accessed. Their older examples inform teaching/coverage comparisons, while current primary documentation governs technical behaviour. Detailed tracking and coverage mapping are in [README.md](../README.md).

Boundaries: provider development, deep cloud architecture, full policy-language courses, full HCP/Enterprise administration, and separate OpenTofu/Terragrunt instruction are deferred. Terraform Stacks and other advanced orchestration surfaces receive a selection boundary rather than a complete specialist treatment. Provider-specific schemas and import/locking behaviour require their own documentation. No claim of cloud or tool interchangeability is made.

This document plans teaching material; it is not completed lessons or executed infrastructure. Detailed snippets, commands, backend recovery procedures, provider semantics, and feature/version requirements must be checked against the pinned implementation when lessons are authored.
