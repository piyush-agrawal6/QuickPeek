# Current state

Current Phase: 01 — Technical Validation (Blocked; not complete).
Current Task: Independent GitHub Actions macOS validation prepared while Codemagic M2 remains queued.
Last Completed Task: Add macos-probe.yml with the same unsigned build command, current checks and failure artifact collection.
Next Task: Observe the GitHub Actions run triggered by the readiness push while leaving Codemagic queued; record actual build/test results and fix real Mac errors before Finder testing.

## Readiness states
- **CODE_COMPLETE**: Windows-local planning, routing POC source preparation and CI configuration only. This does not mean the production application is complete or that Swift compiles.
- **CI_PENDING**: A. Codemagic M2 is queued per the user's report; neither its job nor configuration was changed. B. GitHub Actions on standard macos-26 is independently configured. No successful real macOS build has been verified in this session. Do not set **CI_VERIFIED** until at least one real build succeeds with recorded run/commit evidence.
- **REMOTE_MAC_PENDING**: Signed, interactive Finder preview/thumbnail validation on minimum/latest macOS is pending even after CI succeeds.
- Production renderers: blocked, not started. Phase 00 remains Complete; Phase 01 remains Blocked at 40% of its original primary tasks.

## Completed this session
- Started with clean main at 356cf74 and the existing origin https://github.com/piyush-agrawal6/QuickPeek.git.
- Added .github/workflows/macos-probe.yml on standard GitHub-hosted macos-26, with manual dispatch and relevant-file pushes to main only.
- Matched Codemagic's build arguments, project/package validation, repository/fixture tests, bundle inspection and standalone native Swift tests.
- Added unconditional diagnostic uploads, conditional Xcode result upload and success-gated unsigned ZIP upload, each retained for 14 days.
- Documented two independent compile-validation paths and kept CI_PENDING / REMOTE_MAC_PENDING explicit.
- Preserved codemagic.yaml, the queued Codemagic job, legacy .github/workflows/probe.yml, POC source, signing settings and generated Xcode project. No production renderer was started.

## Files changed
Created: .github/workflows/macos-probe.yml.
Changed: docs/CI.md, docs/CURRENT_STATE.md, docs/MASTER_PLAN.md, docs/phases/PHASE_01_TECHNICAL_VALIDATION.md.
Temporary YAML tooling stays in ignored build/ci-tools and is not a project dependency or commit artifact.

## Tests run
- Node 24.19.0: **9/9 repository contracts passed**, including new shared-scheme/configuration/identifier audit and deterministic project regeneration.
- Bundled Python: **5/5 fixture/plist tests passed**.
- Both YAML workflows are checked with temporary yaml 2.8.1 for syntax/duplicate keys, trigger/runner/artifact policy and exact build-command parity. Local validation is not remote service acceptance.
- All 14 Bash scripts across the two paths are syntax-checked with `bash -n`; no CI script or Xcode command is executed on Windows.
- New bundle inspector passed Python syntax compilation. It has not inspected a real app yet; that is a CI step.
- Git whitespace checks passed during readiness verification.
No Xcode, Swift, signed sandbox, Finder or macOS runtime result is claimed. No fake macOS tools or build outputs were used.

## Architecture
Disposable routing POC only: SwiftUI host + AppKit/Quartz QLPreviewingController + QuickLookThumbnailing provider. Shared FileProbe reads metadata and at most 32 bytes; contents/paths are not displayed or logged. No production renderer, SQLite reader, StoreKit or runtime dependency. Future production app and extensions share one renderer core.

## Important paths
- docs/MASTER_PLAN.md and docs/phases/PHASE_01_TECHNICAL_VALIDATION.md
- docs/QUICKLOOK_TEST_PLAN.md and docs/QUICKLOOK_COMPATIBILITY_MATRIX.md
- docs/ADR/ADR-001-QUICKLOOK-STRATEGY.md
- Config/Product.xcconfig and POC/formats.json
- PeekProbe.xcodeproj and scripts/generate-project.mjs
- codemagic.yaml, .github/workflows/macos-probe.yml, docs/CI.md and scripts/inspect-ci-bundle.py

## Build command — macOS only
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -destination 'platform=macOS' -derivedDataPath build/DerivedData -clonedSourcePackagesDirPath build/SourcePackages -resultBundlePath artifacts/ci/build.xcresult CODE_SIGNING_ALLOWED=NO build
```
CI creates artifacts/ci first and builds from a clean checkout. For real Finder validation, configure local signing and omit CODE_SIGNING_ALLOWED=NO, install/launch the app and follow the test protocol. Compilation is not routing evidence. The PeekProbe scheme builds both PeekPreview and PeekThumbnail automatically through explicit dependencies and embeds them in the host.

## Test commands
```sh
node --test Tests/Repository/*.test.mjs
python3 Tests/Repository/fixtures_test.py
python3 scripts/generate-fixtures.py
swift scripts/probe-types.swift Tests/Fixtures/Generated
python3 scripts/verify-fixtures.py
mkdir -p build
swiftc -swift-version 6 POC/Shared/FileProbe.swift Tests/Probe/ProbeSmokeTests.swift -o build/probe-tests
build/probe-tests
```
Run fixture verification after Finder inspection and before regeneration. Node is optional for generation; the Xcode project is already checked in.

## Known issues and blockers
BLOCK-001: Windows has no Xcode/Swift/Finder. Codemagic M2 is queued per user; the first successful real macOS compile/test evidence remains pending from either CI path. Apple credentials are not needed for compile-only CI. A signed interactive Mac environment is still needed later. Candidate type resolution is unmeasured, particularly dotfile ENV and ambiguous .db files. POC may require compiler/SDK corrections on its first Mac build. No release-ready app exists yet.

## Decisions made and important discoveries
Provisional macOS 14 minimum; Swift 6; no third-party runtime dependencies; no cloud/AI/subscriptions; read-only sandbox-first design. Quick Look strategy remains pending, not Go or No-Go. UTType imports do not prove handler priority, and suffix aliases must not inflate strategic coverage. Windows cannot replace manual Mac evidence.

## Next recommended action
Follow CI.md for path B: inspect macOS probe validation in GitHub Actions after push, or use workflow_dispatch on main. Leave queued path A (Codemagic M2) untouched. Record the first successful real build URL/ID, exact commit, runner/toolchain and test results before setting CI_VERIFIED. Once compile/tests pass, follow QUICKLOOK_TEST_PLAN.md on real Macs and populate every matrix row before choosing ADR-001's strategy. Keep phases 02–20 Not Started until Phase 01 acceptance passes.
