# Project Peek

Native, private, read-only macOS developer/data inspection. Working codename; commercial name is undecided.

**Status: native macOS CI verified; interactive Finder validation pending.** This is a technical probe, not the production inspector. Production renderers remain behind Phase 01's feasibility gate.

Start with [Current state](docs/CURRENT_STATE.md), [Master plan](docs/MASTER_PLAN.md) and [remote Mac testing](docs/REMOTE_MAC_TESTING.md).

The [CI guide](docs/CI.md) records the authoritative green run at `38d0c7d`. Readiness: **CODE_COMPLETE = PASS / CI_VERIFIED = PASS / REMOTE_MAC_PENDING = YES**. Both compile-only CI paths remain intact. No Finder routing result is claimed.

## What is here
- All 21 detailed phase plans through App Store release and post-launch.
- Checked-in Xcode project containing a SwiftUI host and embedded preview/thumbnail extensions.
- A constant preview marker, resolved-type/metadata/read-access probe and content-free thumbnail.
- Synthetic fixtures and source-integrity checking scripts.
- No third-party app runtime dependency, production parser, purchase implementation or backend.

## Build on macOS
Requires a Swift 6.2+ compiler (Xcode 26.x or newer) for isolated protocol conformance syntax, with Swift 6 language mode and provisional macOS 14+ deployment support. For a compilation-only check:
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO build
```
For interactive Finder testing follow [the complete remote Mac guide](docs/REMOTE_MAC_TESTING.md): run the PeekProbe host scheme in Debug on My Mac using Sign to Run Locally for all three targets. No production certificate or App Store submission is needed. A successful build is not proof of Finder integration.

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
Complete the compatibility matrix on minimum/latest macOS and finalize ADR-001 as GO, PARTIAL GO or NO-GO FOR QUICKLOOK-FIRST. Approximately 6–7 reliable useful families support Quick Look-first; a valuable subset supports selective Quick Look plus Inspector. Too little reliable coverage supports Inspector-first. Do not count suffix aliases as separate families; JSON/Markdown losses alone are not overall failure.
