# Phase 16 — Testing and QA

## Goal
Complete automated and manual release acceptance with reproducible evidence.

## Dependencies
Phase 08, Phase 09, Phase 10, Phase 11, Phase 12, Phase 13, Phase 14, Phase 15. All required earlier gates must pass before production work starts.

## Technical Decisions
Build, automated tests, blocker review, documentation and manual acceptance all gate advancement.

## Tasks
- [ ] Complete detection, parser, renderer, metadata, entitlement and threshold unit coverage
- [ ] Run app-to-core and Quick-Look-to-core integration tests
- [ ] Automate launch, sample, search, mode switching, purchase and restore flows
- [ ] Execute latest/minimum macOS matrix and intermediate OS where practical
- [ ] Test Apple Silicon and Intel where accessible; document any release support limitation
- [ ] Verify dark/light, Retina/external monitor, low storage, offline and corrupt inputs
- [ ] Test fresh installation, update installation, restart and reboot
- [ ] Triage defects by severity and rerun affected acceptance checks
- [ ] Create a release candidate report linking exact commit, tools, fixtures and evidence

## Testing Requirements
- [ ] Run complete macOS test suite and clean build
- [ ] Run all manual QA checklists without silently skipping unavailable hardware
- [ ] Review crash reports locally for sensitive data
- [ ] Compare performance baselines and verify all release-blocking issues resolved

## Acceptance Criteria
All supported configurations have passing evidence; remaining low-risk defects are documented; no blocker/high-severity bug remains.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
CI cannot replace Finder behavior or accessibility verification; unavailable hardware must not be reported as tested.

## Deliverables
- docs/MANUAL_QA_CHECKLIST.md
- docs/KNOWN_ISSUES.md
- release candidate test report

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
