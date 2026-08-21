# Quality Gates

## Gate 0 — Repository integrity
Required for every substantive PR:
- scoped branch from recorded base;
- no secrets committed;
- formatting/lint/type/test/build green where applicable;
- docs/project cursor updated when behavior/state changes;
- task receipt present in PR/issue/state;
- no unrelated changes.

## Gate 1 — Intake correctness
Before durable intake is considered working:
- bounded input validation;
- abuse/rate protection appropriate to environment;
- acquisition attribution persisted;
- intent durable in D1;
- duplicate/retry behavior tested;
- failure does not tell the user a request was saved when it was not.

## Gate 2 — Objective/offer correctness
Before an offer can be shown:
- objective has explicit success criteria;
- unsupported/ambiguous requests do not masquerade as supported;
- price/version/currency are explicit;
- scope and exclusions are preserved with the offer;
- approval-required actions are identified.

## Gate 3 — Payment correctness
Before live money:
- sandbox state machine tested;
- callback/webhook verification implemented where available;
- replay/idempotency tested;
- amount/currency/order binding checked;
- failed/abandoned/refunded states represented;
- no deliverable unlock from unverified payment state.

Owner authorization required for live provider activation.

## Gate 4 — Fulfillment correctness
Before paid Acquisition Sprint delivery:
- agreed count/scope satisfied or explicit exception accepted;
- required source evidence retained;
- duplicate elimination deterministic;
- unknown/unverified facts visibly marked;
- direct cost ledger complete;
- workflow is restart-safe at defined boundaries.

## Gate 5 — Independent verification
Customer-ready state requires:
- verifier independent of the worker output;
- `PASS`, `FAIL`, or `HUMAN_REVIEW` recorded;
- verifier evidence stored;
- failures trigger bounded rework or human escalation;
- no agent self-attestation as sole proof.

## Gate 6 — Staging release
Required:
- exact reviewed SHA;
- CI green for that SHA;
- isolated staging bindings/resources;
- migration preflight/apply evidence;
- readiness endpoint;
- public smoke journey;
- request/offer/payment-sandbox/fulfillment smoke appropriate to checkpoint;
- rollback/recovery path.

## Gate 7 — Production launch
Owner-gated. Required before first real customer:
- production/DNS authorization;
- public legal/contact/business details approved;
- payment provider live and verified;
- production secrets configured outside Git;
- abuse/security baseline green;
- real telemetry working;
- customer support/refund path defined;
- no fake proof anywhere public.

## Revenue gates
### R1 — First dollar
An unrelated stranger voluntarily pays for a real scoped outcome.

### R2 — Initial validation
At least 5 paid jobs across at least 3 unrelated customers with positive aggregate direct contribution and documented rework/refund outcomes.

### R3 — Repeatability
At least 10 paid jobs with improving fulfillment efficiency and evidence of repeat/upsell/referral demand.

### R4 — Expansion permission
Only after R2/R3 evidence may the company productize a second fulfillment wedge or invest heavily in recurring autonomous acquisition execution.