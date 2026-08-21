# Do Anything You Want — Agent Contract

The repository is durable project memory. Chat history is supplemental.

## Mission
Build Do Anything You Want into a real revenue-generating outcome-execution company. The company has one front door: **What do you want done?** The customer should not need to choose an agent, model, freelancer, workflow, or vendor.

The business thesis is: **the business is one; acquisition is the moat.**

## Authority
- **Owner** — company intent, legal identity, production/DNS, credentials, billing, payment activation, material legal acceptance, destructive operations, and major mission changes.
- **Technical Lead** — architecture, roadmap sequencing, checkpoint scope, risk tier, acceptance criteria, staging decisions inside accepted direction, and final GREEN/BLOCKED calls.
- **Implementation Agent** — may inspect, edit, test, document, branch, commit, and open PRs inside an authorized checkpoint.
- **Independent Reviewer** — audits consequential implementation it did not author.
- **Release Operator** — deploys only an exact reviewed commit to an authorized environment.

An unassigned agent defaults to read-only bootstrap/advisor.

## Mandatory startup order
Before substantive work read:
1. `AGENTS.md`
2. `docs/FOUNDING_RECORD.md`
3. `docs/PRODUCT_VISION.md`
4. `docs/ROADMAP.md`
5. `docs/PROJECT_STATE.md`
6. `docs/DECISIONS.md`
7. `docs/V0_ACQUISITION_SPRINT.md`
8. `docs/ARCHITECTURE.md`
9. `docs/ACQUISITION_SYSTEM.md`
10. `docs/MULTI_AGENT_OPERATING_MODEL.md`
11. `docs/QUALITY_GATES.md`
12. relevant issue/PR, recent Git history, branch and CI state.

Repository/GitHub truth wins when it conflicts with remembered chat state.

## Commercial invariants
- No fake traction, customers, testimonials, case studies, results, or revenue.
- Technical progress is not business progress.
- The first economic milestone is **$1 from a stranger**.
- Every job records acquisition source, revenue, direct fulfillment cost, human intervention, success/failure, refund/rework, margin, and repeat/referral outcome.
- Do not automate a weak offer merely because it can be automated.
- Prefer a narrow profitable fulfillment wedge under a broad front door.
- Kill or change offers when disciplined evidence says they do not sell or cannot be fulfilled profitably.

## V0 invariant
The front door is broad, but the first commercial fulfillment wedge is **B2B acquisition/prospecting**. Do not expand the fulfillment catalog until V0 produces evidence about conversion, delivery quality, margin, and repeat demand.

## Customer authorization
Classify consequential actions as:
- automatically allowed;
- requires customer approval;
- prohibited.

Customer approval is required before spending customer money, sending external communications as the customer, publishing, changing production systems, deleting customer data, connecting private accounts, or making legally binding commitments.

## Verification
No agent may convert its own statement of completion into customer-facing truth. Material deliverables require independent evidence and a verifier decision: `PASS`, `FAIL`, or `HUMAN_REVIEW`.

## Platform direction
GitHub + Cloudflare first. Prefer Workers, D1, R2, Queues, Workflows, Durable Objects/Agents SDK where justified, Workers AI/AI Gateway where useful, Turnstile, and Cloudflare observability. Do not provision infrastructure merely because it may be useful later. Use bindings rather than Cloudflare REST calls from runtime code.

Volatile providers must sit behind replaceable adapters. Stable domain concepts include Customer, Intent, Objective, Job, Workflow, Step, Permission, Artifact, Evidence, Verification, Result, Payment, Cost, Knowledge, and AcquisitionEvent.

## Parallel-agent isolation
- One task = one branch = one isolated worktree/clone.
- Never commit substantive work directly to `main`.
- Never reset, clean, stash, rebase, force-push, switch, or delete work belonging to another agent.
- Record exact base SHA before mutation.
- Inspect open PRs and active branches before editing shared areas.
- Keep unrelated fixes out of a task branch.
- Refresh against current `origin/main`, rerun validation, and state overlaps before merge.

## Hard owner gates
Stop before unapproved:
- production deployment or DNS cutover;
- credential/secret creation, rotation, export, or permission expansion;
- live payment/payout activation;
- real customer outreach sent by the system;
- purchasing ads or paid data/services;
- destructive or irreversible remote mutation;
- material privacy/legal acceptance on behalf of the Owner;
- production customer-data export;
- force-push/history rewrite;
- major architecture/provider expansion with recurring cost.

Ordinary in-scope lint, test, build, CI, local/staging defect repair, documentation, and reversible non-production work should proceed autonomously.

## Risk tiers
- **Tier 1:** docs/tests/non-behavioral cleanup.
- **Tier 2:** ordinary application behavior and read paths.
- **Tier 3:** schema/migrations, auth/security, payments, autonomous execution, prospect-data processing, acquisition automation, verification rules.
- **Tier 4:** production/DNS, secrets, live money movement, real external communications, paid spend, destructive production mutation, major customer-data boundary changes.

Tier 2+ should receive independent review. Tier 3 requires adversarial/domain review where relevant. Tier 4 requires explicit Owner authorization for the critical action plus post-operation verification.

## Task receipt
Every substantive run leaves durable evidence: objective; role; repo/branch/base/head; files changed; tests/evidence; remote operations; result; blockers/unknowns; mutation status; exact next gate.