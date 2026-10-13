# Phase 01 — Technical Validation

## Goal
Measure Finder preview and thumbnail routing before choosing the commercial architecture.

## Dependencies
Phase 00. All required earlier gates must pass before production work starts.

## Technical Decisions
POC displays markers only, uses no production parsers, and makes no routing claims. Imported type candidates are hypotheses, not observed system types.

Two independent compile-only CI paths use the shared PeekProbe scheme, which explicitly depends on and embeds PeekPreview and PeekThumbnail: A. Codemagic M2 (queued per user, untouched), and B. GitHub Actions on standard macos-26. Both use the same unsigned build command. No scheme or production-code changes are required. Signing is disabled only at the CI command line; no Apple credentials are requested. See [CI audit](../CI.md).

## Tasks
- [x] Review Apple preview, thumbnail, and imported UTType documentation
- [x] Create a host app plus minimal embedded preview and thumbnail extension targets
- [x] Provide synthetic fixture generation, a type probe, and source-integrity verification
- [x] Create per-extension compatibility matrix and repeatable manual protocol
- [x] Build with Xcode using Swift 6; fix errors and inspect unsigned embedded bundles and declared entitlements
- [ ] Capture baseline UTTypes and native previews before installation
- [ ] Install locally signed sandboxed probe, verify effective entitlements; test every extension and literal .env filename on current and minimum macOS
- [ ] Record preview marker, thumbnail marker, metadata, access failures, Apple fallback, and third-party conflicts
- [ ] Repeat after app restart, reboot, fresh install, and a second preview request; verify source hashes and absence of sidecars
- [ ] Evaluate strategic format coverage and approve Quick Look-first or Inspector strategy in ADR-001

## Testing Requirements
- [x] Run local project and planning contract checks
- [x] Confirm real GitHub macOS runner, project discovery, dependency resolution and repository checks work (run 38373566151)
- [x] Diagnose PeekPreview Swift actor-isolation failure and implement explicit MainActor protocol conformance
- [x] Verify isolation fix in real macOS run 38421045778, preserving Swift 6, strict checking and Intel/x86_64 support
- [x] Audit shared scheme, configurations, bundle identifiers and host extension dependencies for CI readiness
- [x] Prepare Codemagic compile-only workflow, diagnostics, existing tests and unsigned inspection artifacts
- [x] Prepare independent GitHub Actions macos-26 workflow with relevant-path main push trigger, manual dispatch and failure artifacts
- [x] Observe successful native build/checks at 38d0c7d in run 38421045778; retain toolchain diagnostics and set CI_VERIFIED
- Optional independent evidence: record Codemagic result when available; a second CI provider is not a phase blocker. Leave its queued job untouched.
- [x] Build the three macOS targets and inspect final Info.plists
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
- docs/REMOTE_MAC_TESTING.md
- docs/ADR/ADR-001-QUICKLOOK-STRATEGY.md
- codemagic.yaml
- .github/workflows/macos-probe.yml
- docs/CI.md
- scripts/inspect-ci-bundle.py

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Blocked

Readiness: **CODE_COMPLETE = PASS / CI_VERIFIED = PASS / REMOTE_MAC_PENDING = YES**. Five of ten primary tasks complete (50%). [GitHub Actions run 38421045778](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38421045778), source commit `38d0c7d9745d0c568636df95fc650d6b7746e3c1`, completed successfully on the `macos-26` runner. Toolchain/repository diagnostics, Xcode project and shared-scheme validation, dependency resolution, repository/fixture checks, host and both extension builds, unsigned bundle inspection/packaging, native probe checks and artifact uploads passed. Exact OS/Xcode/Swift versions are retained in the run diagnostics; the source requires Swift 6.2+ (Xcode 26.x+) with Swift 6 language mode.

BUG-001 is resolved by the green native build. BLOCK-001 now concerns only REMOTE_MAC_VERIFIED: locally signed interactive Finder preview/thumbnail/read-access testing and final GO / PARTIAL GO / NO-GO strategy in ADR-001. Follow [remote Mac instructions](../REMOTE_MAC_TESTING.md). All runtime matrix fields remain NOT_TESTED. Codemagic is untouched. Phase 01 is not complete; production renderers remain blocked.
