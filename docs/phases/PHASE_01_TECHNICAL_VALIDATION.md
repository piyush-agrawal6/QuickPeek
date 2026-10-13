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
- [ ] Build with Xcode using Swift 6; fix errors and inspect embedded bundles and entitlements
- [ ] Capture baseline UTTypes and native previews before installation
- [ ] Install signed sandboxed probe; test every extension and literal .env filename on current and minimum macOS
- [ ] Record preview marker, thumbnail marker, metadata, access failures, Apple fallback, and third-party conflicts
- [ ] Repeat after app restart, reboot, fresh install, and a second preview request; verify source hashes and absence of sidecars
- [ ] Evaluate strategic format coverage and approve Quick Look-first or Inspector strategy in ADR-001

## Testing Requirements
- [x] Run local project and planning contract checks
- [x] Confirm real GitHub macOS runner, project discovery, dependency resolution and repository checks work (run 38373566151)
- [x] Diagnose PeekPreview Swift actor-isolation failure and implement explicit MainActor protocol conformance
- [ ] Verify isolation fix in another real macOS build, preserving Swift 6, strict checking and Intel/x86_64 support
- [x] Audit shared scheme, configurations, bundle identifiers and host extension dependencies for CI readiness
- [x] Prepare Codemagic compile-only workflow, diagnostics, existing tests and unsigned inspection artifacts
- [x] Prepare independent GitHub Actions macos-26 workflow with relevant-path main push trigger, manual dispatch and failure artifacts
- [ ] Observe at least one successful real macOS build, record exact commit/toolchain/run URL, and only then set CI_VERIFIED
- [ ] Run first real macOS Codemagic build and record commit, toolchain, build URL and result
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
- codemagic.yaml
- .github/workflows/macos-probe.yml
- docs/CI.md
- scripts/inspect-ci-bundle.py

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Blocked

Readiness: **CODE_COMPLETE / MACOS_CI_ACTIVE / CI_BUILD_FIX_PENDING / REMOTE_MAC_PENDING**. CODE_COMPLETE applies to the prepared POC fix and infrastructure, not production features or a validated full native build. Four of ten primary tasks remain complete (40%); reaching the compiler does not pass the build gate. CI_VERIFIED is not set.

BUG-001: GitHub run 38373566151 at a55bd68 confirms runner/project/dependency/repository stages passed and compilation reached Swift, where PeekPreview's main-actor method could not satisfy its nonisolated QLPreviewingController conformance. Both class and conformance now explicitly use MainActor (Swift 6.2+ compiler); method bodies, architectures and strict checking are unchanged. The fix awaits another macOS CI run. BLOCK-001 still applies to local Windows compilation and signed Finder testing. Codemagic remains untouched. After CI passes, minimum/latest-macOS Finder evidence and ADR-001 are still required. Production renderers remain blocked; Phase 01 is not complete.
