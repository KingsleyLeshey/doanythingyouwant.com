# Architecture

## Principle
Cloudflare is the primary application/control plane, but architecture follows validated requirements rather than product catalog enthusiasm.

Current Cloudflare guidance supports Workers bindings for D1, R2, Queues, Durable Objects, Workflows and AI, and recommends current compatibility dates, bindings rather than REST calls, offloading background work to Queues/Workflows, and structured observability.

## V0 topology

```text
Browser
  ↓
Cloudflare Worker / web application
  ├─ public landing + intake UI
  ├─ API
  ├─ auth/session boundary
  └─ acquisition attribution
       ↓
      D1
       ├─ customers/sessions
       ├─ intents/objectives/offers
       ├─ jobs/steps
       ├─ permissions
       ├─ evidence/verifications
       ├─ payments/costs
       └─ acquisition events

Paid job
  ↓
Cloudflare Workflow
  ├─ qualification/planning
  ├─ research steps
  ├─ verification
  └─ artifact finalization
       ├─ R2 artifacts
       └─ D1 evidence/cost/job state

Async/non-critical tasks
  ↓
Cloudflare Queues

AI/provider calls
  ↓
internal adapter
  ├─ Workers AI where fit
  ├─ AI Gateway for supported external providers/observability
  └─ replaceable external model provider when justified
```

## Durable Objects / Agents SDK
Do **not** make Durable Objects or Agents SDK mandatory for every request.

Use them when V0 actually requires persistent stateful conversational sessions, real-time coordination, or agent-local durable state. Core commercial truth remains in explicit business records, not hidden inside one agent's conversation state.

## Stable domain contracts
Keep these provider-independent:
- `Customer`
- `Session`
- `Intent`
- `Objective`
- `Offer`
- `Payment`
- `Job`
- `JobStep`
- `Permission`
- `Artifact`
- `Evidence`
- `Verification`
- `Result`
- `CostEntry`
- `AcquisitionEvent`
- `Playbook`

## Initial D1 model
Tables planned for first implementation:
- `customers`
- `sessions`
- `intents`
- `objectives`
- `offers`
- `payments`
- `jobs`
- `job_steps`
- `permissions`
- `artifacts`
- `evidence`
- `verifications`
- `cost_entries`
- `acquisition_events`
- `playbooks`

V0 prospect research adds explicit company/prospect evidence tables only when the research workflow lands. Do not mix prospects with customers.

## State rules
- Money stored as integer minor units + explicit currency.
- Time stored in unambiguous UTC timestamps.
- IDs generated cryptographically/deterministically where appropriate, never `Math.random()`.
- Material state transitions are auditable.
- Payment callbacks are authenticated where provider supports it, idempotent, amount/order checked and replay safe.
- Job execution is resumable/idempotent at workflow-step boundaries.
- Evidence is append-oriented; a later observation does not silently erase prior evidence.

## Artifacts
R2 stores customer uploads, generated reports/CSV and larger evidence artifacts. D1 stores metadata, ownership, hashes/digests and access state. Customer artifacts are private by default.

## AI/provider abstraction
No business record should depend on a specific model name. Provider adapters return structured outputs with model/provider metadata, token/cost data where available, and evidence/confidence fields relevant to the job.

AI may propose plans, extraction, classifications and text. Deterministic code owns schemas, IDs, amounts, counts, deduplication, permission checks and acceptance-rule evaluation.

## Verification architecture
Worker/agent output does not mark itself complete.

```text
worker output
  ↓
evidence record(s)
  ↓
independent verifier
  ↓
PASS | FAIL | HUMAN_REVIEW
```

Only PASS or explicitly authorized human acceptance can move a paid job to customer-ready delivery.

## Observability
Capture structured events for:
- request/correlation ID;
- route/status/duration;
- objective/job/workflow IDs where applicable;
- provider/model/tool call cost;
- workflow step outcome/retry;
- verification outcome;
- funnel/acquisition stage;
- payment state;
- direct fulfillment cost.

Never log secrets or unnecessary customer/prospect personal data.

## Security baseline
- current Workers compatibility date on new code;
- `nodejs_compat` only where required by dependencies;
- no secrets in source/config;
- Turnstile + rate limits for anonymous intake when activated;
- same-origin/CSRF protection for authenticated browser mutations;
- security headers on HTML;
- strict input validation and bounded payloads;
- explicit permission checks before consequential actions;
- private R2/customer artifacts;
- no unrestricted browser/tool execution from raw customer prompts.

## Payment boundary
Implement a `PaymentAdapter`. The initial real provider is an Owner decision and must optimize mainstream B2B conversion; the product must not hard-wire itself to a cryptocurrency-only checkout or any one processor.

## Environments
- local development;
- staging with isolated D1/R2/resources;
- production only after explicit Owner gate.

Deployment is exact-reviewed-SHA based. Production and staging resources must never share destructive mutable state.