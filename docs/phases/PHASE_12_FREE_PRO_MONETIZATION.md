# Phase 12 — Free Pro Monetization

## Goal
Implement one lifetime Pro non-consumable with offline-friendly verified entitlements.

## Dependencies
Phase 10, Phase 11. All required earlier gates must pass before production work starts.

## Technical Decisions
Lifetime non-consumable only; free/Pro mapping remains a proposal until implemented and tested.

## Tasks
- [ ] Confirm Free JSON/YAML/Markdown/raw/metadata and suggested Pro feature policy in ADR-005
- [ ] Create centralized ProFeature policy and usable sample/limited previews
- [ ] Configure one StoreKit 2 non-consumable and local StoreKit test configuration
- [ ] Implement verified purchase success, pending, cancelled and failed states
- [ ] Implement explicit restore and transaction update listener with lifecycle cleanup
- [ ] Handle refunds, revocation and unverified transactions
- [ ] Define verified entitlement sharing with extensions and offline freshness behavior
- [ ] Ensure preview startup never waits for purchase network requests
- [ ] Use localized StoreKit price; target $9.99 launch lifetime price subject to store configuration
- [ ] Add restrained purchase screen and accessible restore controls

## Testing Requirements
- [ ] Unit test centralized feature rules and no-network preview behavior
- [ ] StoreKit test purchase, pending, cancel, error, refund, revoked and restore states
- [ ] Test offline relaunch and stale shared entitlement handling
- [ ] Sandbox test real product metadata, purchase and restore before release

## Acceptance Criteria
Purchases and restore pass locally and in Apple sandbox; free features remain useful; no subscription or account requirement is introduced.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Treating untrusted shared flags as purchases, unavailable products, stale revocations and extension access constraints.

## Deliverables
- ProjectPeekApp/Store/
- shared entitlement policy
- .storekit configuration
- StoreKit tests
- ADR-005

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
