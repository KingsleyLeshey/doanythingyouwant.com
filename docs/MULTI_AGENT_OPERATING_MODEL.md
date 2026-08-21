# Multi-Agent Operating Model

## Principle
Multiple agents may work concurrently, but shared architecture and consequential state are serialized through reviewed checkpoints.

## Work isolation
- One task = one branch = one isolated worktree/clone.
- Branch format: `agent/<agent-id>/<task-slug>` or lead-owned `checkpoint/<slug>`.
- Record exact `origin/main` base SHA before mutation.
- Inspect open PRs/branches before editing shared files.
- Never use another agent's worktree, reset, stash, rebase, force-push, or branch as scratch space.

## Coordination surface
Open PRs, issues, exact Git history, CI, and `docs/PROJECT_STATE.md` are the coordination surface.

Do not create a giant shared mutable task file that every agent edits on every run.

## Preferred lanes after D0
When dependencies allow:
1. **Core product** — intake, identity, objectives, customer/project UX.
2. **Commercial** — offers, payment state, economics ledger.
3. **Fulfillment** — Acquisition Sprint research workflow and artifacts.
4. **Verification/security** — evidence checks, abuse controls, independent tests.
5. **Acquisition/SEO** — instrumentation and distribution assets.
6. **Staging/release** — exact reviewed SHA only.

Schema direction, auth model, payment state, shared workflow contracts, and production releases must be serialized.

## Review
Tier 2+ work should be reviewed by a session that did not author it. Tier 3 work receives adversarial/domain review where relevant.

The reviewer evaluates the frozen diff and evidence; it does not silently redesign the product inside the review.

## Merge discipline
Before merge:
- refresh against current `main` without rewriting other work;
- resolve only branch-owned conflicts;
- rerun required validation;
- verify scope remained bounded;
- record head SHA and result.

## Release discipline
Implementation and deployment are separate by default. A release operator deploys an exact reviewed SHA and makes no unrelated repository changes during release.

## Failure categories
- `SAFE_AUTO_RETRY` — local/read-only/idempotent and outcome is known; bounded retry allowed.
- `VERIFY_BEFORE_RETRY` — consequential remote operation may have applied; inspect authoritative state first.
- `HARD_STOP` — needs new owner authority, architecture expansion, paid service, production action, legal acceptance, secret, or destructive operation.