# Phase 01 — Technical Validation

## Goal
Measure Finder preview and thumbnail routing before choosing the commercial architecture.

## Dependencies
Phase 00. All required earlier gates must pass before production work starts.

## Technical Decisions
POC displays markers only, uses no production parsers, and makes no routing claims. Imported type candidates are hypotheses, not observed system types.

## Tasks
- [x] Review Apple preview, thumbnail, and imported UTType documentation
- [x] Create a host app plus minimal embedded preview and thumbnail extension targets
- [x] Provide synthetic fixture generation, a type probe, and source-integrity verification
- [x] Create per-extension compatibility matrix and repeatable manual protocol
- [ ] Build with Xcode using Swift 6; fix errors and inspect embedded bundles and entitlements
- [ ] Capture baseline UTTypes and native previews before installation
- [ ] Install signed sandboxed probe; test every extension and literal .env filename on current and minimum macOS
- [ ] Record preview marker, thumbnail marker, metadata, access failures, Apple fallback, and third-party conflicts
- [ ] Repeat after app restart, reboot, fresh install, and a second preview request; verify source hashes and absence of sidecars
- [ ] Evaluate strategic format coverage and approve Quick Look-first or Inspector strategy in ADR-001

## Testing Requirements
- [x] Run local project and planning contract checks
- [ ] Build the three macOS targets and inspect final Info.plists
- [ ] Manually exercise Finder Space and icon thumbnails independently on both OS endpoints
- [ ] Verify unchanged fixture hashes after testing
- [ ] Measure cold and warm probe startup without file content in logs

## Acceptance Criteria
Every target suffix has observed results with OS build, hardware, installation state and evidence; at least 6–7 useful format families reliably route for Quick Look-first, or Inspector pivot is documented; build and manual gates pass.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Built-in handler precedence, dynamic UTIs, hidden ENV names, other apps, stale thumbnails, sandbox differences, and unavailable Mac hardware.

## Deliverables
- PeekProbe.xcodeproj
- POC/
- scripts/probe-types.swift
- scripts/generate-fixtures.py
- docs/QUICKLOOK_COMPATIBILITY_MATRIX.md
- docs/QUICKLOOK_TEST_PLAN.md
- docs/ADR/ADR-001-QUICKLOOK-STRATEGY.md

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Blocked

BLOCK-001: prepared on Windows without Xcode, Swift or Finder. Four of ten primary preparation tasks complete (40%); this is not 40% validated platform support. Eight Node contracts and five Python fixture/plist tests pass locally. Native smoke-test source and macOS CI are prepared but unexecuted. Options: a configured Mac workspace for signed interactive testing, or macOS CI for initial compilation followed by Mac manual testing. Recommended: follow QUICKLOOK_TEST_PLAN.md on minimum/latest macOS and update ADR-001 from evidence. Do not advance to production implementation.
