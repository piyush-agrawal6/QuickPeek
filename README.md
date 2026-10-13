# Project Peek

Native, private, read-only macOS developer/data inspection. Working codename; commercial name is undecided.

**Status: technical probe prepared; macOS build and Finder validation pending.** This is not the production inspector. Development currently runs on Windows, so no routing or signing result is asserted. Production renderers remain behind the mandatory feasibility gate.

Start with [Current state](docs/CURRENT_STATE.md), [Master plan](docs/MASTER_PLAN.md) and [Quick Look test plan](docs/QUICKLOOK_TEST_PLAN.md).

For the first real macOS compile, use the manual `macos-probe-compile` workflow in [codemagic.yaml](codemagic.yaml). The [CI guide](docs/CI.md) documents the audited targets/shared scheme, unsigned build, diagnostics, artifacts and troubleshooting. Readiness is CODE_COMPLETE / CI_PENDING / REMOTE_MAC_PENDING; no macOS build result is claimed yet.

## What is here
- All 21 detailed phase plans through App Store release and post-launch.
- Checked-in Xcode project containing a SwiftUI host and embedded preview/thumbnail extensions.
- A constant preview marker, resolved-type/metadata/read-access probe and content-free thumbnail.
- Synthetic fixtures and source-integrity checking scripts.
- No third-party app runtime dependency, production parser, purchase implementation or backend.

## Build on macOS
Requires Swift 6-capable Xcode and provisional macOS 14+ deployment support. For a compilation-only check:
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO build
```
For interactive Finder testing configure your own development team and bundle prefix in ignored Config/Local.xcconfig, then build with signing:
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -derivedDataPath build/DerivedData build
```
Install and launch the built app, then follow the [full baseline/install/reboot protocol](docs/QUICKLOOK_TEST_PLAN.md). A successful build is not proof of Finder integration.

## Tests and fixture commands
```sh
node --test Tests/Repository/*.test.mjs
python3 Tests/Repository/fixtures_test.py
python3 scripts/generate-fixtures.py
swift scripts/probe-types.swift Tests/Fixtures/Generated
python3 scripts/verify-fixtures.py
```
Node tests validate repository contracts, not Swift execution. The fixture hash check must run after Finder testing and before regeneration. Platform tests and production XCTest/UI tests remain pending.

## Configuration
Edit Config/Product.xcconfig for branding, identity, version and URLs. The empty legal/support/store values are intentional release prerequisites. Never commit signing credentials or real ENV files.

POC/formats.json holds candidate UTTypes. Run `node scripts/generate-project.mjs` to regenerate plists, entitlements, project and shared scheme after changing target wiring/types. Commit generated output; building on a Mac does not require Node. Importing a type does not establish that Finder will choose our provider.

## Next gate
Complete the compatibility matrix on minimum/latest macOS. Choose Quick Look-first only if approximately 6–7 strategically useful format families reliably route; otherwise adopt the standalone Inspector-first strategy with proven Quick Look integrations. Do not count suffix aliases as separate format families.
