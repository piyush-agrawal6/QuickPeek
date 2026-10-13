# Phase 08 — Quick Look Extension

## Goal
Replace the routing probe with reliable shared production previews for verified formats.

## Dependencies
Phase 01, Phase 04, Phase 05, Phase 06, Phase 07. All required earlier gates must pass before production work starts.

## Technical Decisions
Do not force overrides of Apple handlers; standalone inspector covers unsupported routing.

## Tasks
- [ ] Restrict QLSupportedContentTypes to evidence-backed supported types
- [ ] Connect extension lifecycle to shared file preparation and cancellation
- [ ] Build native table/tree/source/metadata/search shell with content-appropriate modes
- [ ] Handle rapid selection changes without stale results or leaked access
- [ ] Implement permission, size, encoding, corruption and renderer error states
- [ ] Apply extension-specific resource budgets and timeout handling
- [ ] Document extension status troubleshooting without claiming unreliable enablement detection
- [ ] Retest supported formats after install, reboot, updates and competing handlers

## Testing Requirements
- [ ] Integration test adapter-to-core preparation and cancellation
- [ ] Manually test Finder Space and repeat selection on every supported OS
- [ ] Verify keyboard focus, dark/light mode and error states in actual Quick Look
- [ ] Measure startup and memory under rapid repeated requests

## Acceptance Criteria
Only verified formats are advertised; actual Finder previews work repeatedly with shared core and graceful failure; no startup purchase network dependency.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Host process lifecycle, focus limitations, memory termination and OS routing regressions.

## Deliverables
- QuickLookExtension/
- verified type declarations
- updated compatibility matrix
- integration tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
