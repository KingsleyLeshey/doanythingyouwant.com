# Project State

## Current cursor
Repository bootstrap began on `main` at `b1baf72f8f6d177888c545da28d06acd014a15bb`.

Trusted repository CI was bootstrapped on `main` at `f785e9e1cde460b93117cf09d1189c266eb34408` because the repository began empty and PR #1 could not otherwise inherit a trusted Actions workflow.

Active checkpoint branch: `checkpoint/foundation-v0`.  
Active pull request: **#1 — D0 foundation**.

**Current build:** D0 Foundation — establish the commercial V0, Cloudflare-native architecture, acquisition instrumentation, CI/staging skeleton, and exact next owner gates.

## Confirmed facts
- Repository: `KingsleyLeshey/doanythingyouwant.com`.
- Repository began empty and has no inherited application architecture.
- Company thesis: one front door, replaceable fulfillment, acquisition as the primary moat.
- First commercial wedge selected for validation: B2B acquisition / qualified-prospect work.
- A runnable Worker foundation now exists on the checkpoint branch with homepage, request-preview API, readiness/health endpoints, security headers, structured logs and tests.
- Request preview is intentionally non-durable; `/ready` must report durable intake, payment and fulfillment as false until those systems really exist.
- No paying customer, production deployment, live payment rail, case study, testimonial, or revenue evidence exists yet.

## V0 product decision
Launch a fixed-scope **Acquisition Sprint** under the broad `What do you want done?` intake.

V0 performs research/qualification/ranking and produces a campaign-ready acquisition pack. It does **not** autonomously send external outreach.

## Foundation priorities
1. Land D0 only after exact-head Repository CI is green and the checkpoint is reviewed.
2. Implement anonymous durable intent capture + acquisition attribution in D1.
3. Add objective qualification and V0 offer flow.
4. Add payment adapter with sandbox-only implementation until Owner activation.
5. Build deterministic Acquisition Sprint workflow and verifier.
6. Deploy staging only after CI and required isolated Cloudflare resources/secrets exist.

## Owner gates currently expected
Not required for ordinary code work. Required later for:
- Cloudflare staging resource provisioning/credentials if not already connected through an authorized deployment path;
- production DNS/cutover;
- live payment-provider account and secrets;
- company/legal/privacy/terms details used publicly;
- real customer communications sent by the system;
- paid acquisition/data/tool spend.

## Success hierarchy
1. Working staging journey.
2. First real payment from a stranger.
3. Five paid jobs / three unrelated customers with positive aggregate direct contribution.
4. Repeatable, increasingly automated delivery.
5. Recurring revenue and compounding acquisition.

## Exact next action
Use PR #1's exact-head CI result as the D0 implementation gate. Repair ordinary CI/code failures on the checkpoint branch. Do not merge around a failing gate. After D0 is reviewed and integrated, begin D1 durable intake rather than expanding the agent roster or fulfillment catalog.