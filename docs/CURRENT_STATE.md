# Current state

Current Phase: 01 — Technical Validation (Blocked; not complete).
Current Task: macOS CI readiness prepared; first real Codemagic build pending.
Last Completed Task: Audit the Xcode project and prepare compile-only Codemagic workflow, diagnostics, unsigned artifact inspection and documentation.
Next Task: Connect the repository to Codemagic and run macos-probe-compile against the CI readiness commit; fix actual Mac compiler/test errors before interactive Finder testing.

## Readiness states
- **CODE_COMPLETE**: Windows-local planning, routing POC source preparation and CI configuration only. This does not mean the production application is complete or that Swift compiles.
- **CI_PENDING**: No Codemagic build has been started or observed in this session. Real macOS compile and native test results are still required.
- **REMOTE_MAC_PENDING**: Signed, interactive Finder preview/thumbnail validation on minimum/latest macOS is pending even after CI succeeds.
- Production renderers: blocked, not started. Phase 00 remains Complete; Phase 01 remains Blocked at 40% of its original primary tasks.

## Completed this session
- Confirmed milestone b6c0b54 exists and the starting working tree was clean on main.
- Verified origin fetch/push URL is https://github.com/piyush-agrawal6/QuickPeek.git; live read-only remote inspection confirmed main at b6c0b546c2bc952912215ce9799baffc3d2c5081 before changes. This supersedes the earlier no-remote state.
- Audited PeekProbe.xcodeproj: shared PeekProbe scheme, Debug/Release, macOS 14.0, Swift 6.0, three targets and both extension dependencies/embedding references.
- Created codemagic.yaml with Apple Silicon runner, native project diagnostics, dependency resolution, all existing tests, unsigned scheme build, bundle inspection and retained logs/artifacts.
- Added docs/CI.md with build identifiers, connection procedure and failure-to-log troubleshooting map.
- Added a processed-bundle inspector and one repository contract for scheme/configuration/bundle-ID consistency. POC Swift source and generated Xcode project remain unchanged.
- Updated readiness states without passing the feasibility gate or starting production renderers.

## Files changed
Created: codemagic.yaml, docs/CI.md, scripts/inspect-ci-bundle.py.
Changed: README.md, Tests/Repository/contracts.test.mjs, docs/CURRENT_STATE.md, docs/MASTER_PLAN.md, docs/KNOWN_ISSUES.md, docs/phases/PHASE_01_TECHNICAL_VALIDATION.md.
The existing GitHub Actions workflow is unchanged. Temporary YAML tooling is confined to ignored build/ci-tools and is not a project dependency or commit artifact.

## Tests run
- Node 24.19.0: **9/9 repository contracts passed**, including new shared-scheme/configuration/identifier audit and deterministic project regeneration.
- Bundled Python: **5/5 fixture/plist tests passed**.
- YAML parsed with temporary yaml 2.8.1: no syntax/duplicate-key errors; selected workflow structure checked. This is local syntax/configuration validation, not Codemagic service acceptance.
- All seven extracted Bash scripts passed `bash -n`; none were executed. Initial sandbox prevented Git Bash startup; syntax checking succeeded with the permitted process access.
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
- codemagic.yaml, docs/CI.md and scripts/inspect-ci-bundle.py

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
BLOCK-001: Windows has no Xcode/Swift/Finder. Codemagic account/repository connection, runner access and the first real macOS CI result remain pending. Apple credentials are not needed for compile-only CI. A signed interactive Mac environment is still needed later. Candidate type resolution is unmeasured, particularly dotfile ENV and ambiguous .db files. POC may require compiler/SDK corrections on its first Mac build. No release-ready app exists yet.

## Decisions made and important discoveries
Provisional macOS 14 minimum; Swift 6; no third-party runtime dependencies; no cloud/AI/subscriptions; read-only sandbox-first design. Quick Look strategy remains pending, not Go or No-Go. UTType imports do not prove handler priority, and suffix aliases must not inflate strategic coverage. Windows cannot replace manual Mac evidence.

## Next recommended action
Follow CI.md to select main and macos-probe-compile in Codemagic. Record the first actual build URL/ID, exact commit, runner/toolchain, result and diagnostic artifacts here. Once compile/tests pass, follow QUICKLOOK_TEST_PLAN.md on real Macs and populate every matrix row before choosing ADR-001's strategy. Keep phases 02–20 Not Started until Phase 01 acceptance passes.
