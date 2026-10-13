# Current state

Current Phase: 01 — Technical Validation (Blocked: macOS required).
Current Task: Compile and execute the prepared routing probe on a Mac.
Last Completed Task: Verify repository contracts and fixture safety tools; mark Phase 00 complete and Phase 01 blocked with explicit evidence gaps.
Next Task: Run the Mac build, fix compiler/SDK issues if any, then capture baseline/install Finder routing for every fixture on minimum/latest macOS.

## Completed this session
- Inspected empty Windows workspace and initialized Git without overwriting an existing project.
- Read full supplied brief and Apple preview/thumbnail/type-declaration documentation.
- Created detailed phases 00–20, linked master plan, decisions/ADRs, roadmap, risks, privacy/sandbox/performance and QA/release checklists.
- Created a SwiftUI instruction host, minimal AppKit Quick Look marker preview and content-free thumbnail provider.
- Added centralized branding/version configuration, candidate type imports, three sandboxed targets, embedded extensions and shared Xcode scheme.
- Added synthetic fixture generator, hash/no-sidecar verifier, macOS UTType probe and standalone Swift smoke-test source.
- Added cross-platform repository checks and a macOS CI workflow (not dispatched).
- Verified generated ENV fixtures, local signing overrides and build output are ignored by Git. Prepared a local milestone commit; no remote is configured and nothing has been pushed.

## Files changed
New repository: README.md, CHANGELOG.md, Config/, POC/, PeekProbe.xcodeproj/, scripts/, Tests/, .github/workflows/probe.yml, docs/ and 21 docs/phases/ files. Product implementation phases have not started.

## Tests run
- Node 24.19.0: **8/8 repository contracts passed**, including project reference resolution, extension embedding, source membership, type inventory, minimal entitlements, all phase sections/links and deterministic regeneration.
- Bundled Python: **5/5 tests passed**, including generated SQLite integrity, all 20 synthetic fixtures, unchanged input checks, detection of changed/missing files and unexpected sidecars, and plist schema checks.
- PowerShell XML parsing passed for all three plists, three entitlement files and shared Xcode scheme.
- Git staged whitespace validation and ignore rules are included in final milestone verification.
- Initial checks caught the missing state document while work was in progress, a Windows temp-directory permission issue and an unclosed test SQLite connection; these were fixed and affected checks rerun successfully. Isolated fixture tests now use ignored workspace build directories and explicit connection closing.
Swift/Xcode/native smoke tests, signing, sandbox, Finder preview/thumbnail, accessibility and performance have **not** run on this Windows machine. CI workflow exists but no remote execution is claimed.

## Architecture
Disposable routing POC only: SwiftUI host + AppKit/Quartz QLPreviewingController + QuickLookThumbnailing provider. Shared FileProbe reads metadata and at most 32 bytes; contents/paths are not displayed or logged. No production renderer, SQLite reader, StoreKit or runtime dependency. Future production app and extensions share one renderer core.

## Important paths
- docs/MASTER_PLAN.md and docs/phases/PHASE_01_TECHNICAL_VALIDATION.md
- docs/QUICKLOOK_TEST_PLAN.md and docs/QUICKLOOK_COMPATIBILITY_MATRIX.md
- docs/ADR/ADR-001-QUICKLOOK-STRATEGY.md
- Config/Product.xcconfig and POC/formats.json
- PeekProbe.xcodeproj and scripts/generate-project.mjs

## Build command — macOS only
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO build
```
For real Finder validation, configure local signing and omit CODE_SIGNING_ALLOWED=NO, install/launch the app and follow the test protocol. Compilation is not routing evidence.

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
BLOCK-001: Windows has no Xcode/Swift/Finder; no Mac destination or signing identity supplied. Candidate type resolution is unmeasured, particularly dotfile ENV and ambiguous .db files. POC may require compiler/SDK corrections on its first Mac build. No release-ready app exists yet.

## Decisions made and important discoveries
Provisional macOS 14 minimum; Swift 6; no third-party runtime dependencies; no cloud/AI/subscriptions; read-only sandbox-first design. Quick Look strategy remains pending, not Go or No-Go. UTType imports do not prove handler priority, and suffix aliases must not inflate strategic coverage. Windows cannot replace manual Mac evidence.

## Next recommended action
Open this repo on a Mac with Swift 6-capable Xcode. Follow QUICKLOOK_TEST_PLAN.md, populate every matrix row with actual OS/build and evidence, then choose ADR-001's strategy. A macOS CI build can catch compilation defects first but cannot replace Finder tests. Keep phases 02–20 Not Started until Phase 01 acceptance passes.
