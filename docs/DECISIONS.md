# Decisions

## D-001 — One company, one front door
**Decision:** keep the public intake broad: `What do you want done?`  
**Reason:** the brand captures intent; customers should not navigate provider/tool categories.

## D-002 — Narrow V0 fulfillment
**Decision:** productize B2B Acquisition Sprint first.  
**Reason:** measurable output, existing willingness to pay, recurring potential, fulfillment can begin research-first, and the company dogfoods its intended acquisition moat.

## D-003 — No autonomous outbound in V0
**Decision:** V0 prepares acquisition-ready deliverables but does not send customer communications.  
**Reason:** faster launch with lower legal, privacy, deliverability, authorization and brand risk.

## D-004 — $499 founding price hypothesis
**Decision:** initial standard Acquisition Sprint price hypothesis is $499 fixed.  
**Reason:** low enough to test stranger willingness-to-pay rapidly, high enough to force real value and margin discipline. Price is versioned and experimental.

## D-005 — Cloudflare-first, not Cloudflare-forced
**Decision:** Workers/D1/R2/Workflows/Queues are preferred where justified. Durable Objects/Agents SDK are added only for a real stateful-agent requirement.  
**Reason:** preserve simplicity while keeping a coherent long-term control plane.

## D-006 — Stable business records outside agent state
**Decision:** commercial truth lives in explicit Customer/Intent/Objective/Offer/Job/Evidence/Payment/Cost/Acquisition records.  
**Reason:** agents/providers are replaceable and their conversational state must not become the canonical business database.

## D-007 — Payment adapter, mainstream conversion first
**Decision:** do not hard-wire a crypto-only or single-provider checkout.  
**Reason:** the business depends on reducing purchase friction for mainstream B2B customers.

## D-008 — Evidence before public proof
**Decision:** no customer result becomes marketing/case-study material without real evidence and appropriate permission.  
**Reason:** acquisition compounds only if the proof asset is trustworthy.

## D-009 — Repository is durable memory
**Decision:** GitHub docs/state/PRs/receipts govern current implementation state.  
**Reason:** multiple agents and long-running development cannot rely on one chat history.

## D-010 — Revenue gates precede catalog expansion
**Decision:** do not add the second fulfillment wedge until V0 has meaningful payment and fulfillment evidence.  
**Reason:** expansion before validation recreates a generic agency/agent-platform trap.