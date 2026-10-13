# Current state

Current Phase: 01 — Technical Validation (Blocked; not complete).
Current Task: Interactive Finder validation on a real remote Mac.
Last Completed Task: Authoritative native CI build and checks passed; BUG-001 resolved.
Next Task: Follow [remote Mac instructions](REMOTE_MAC_TESTING.md), starting with sample.yaml, and record measured routing before deciding ADR-001.

## Readiness states
- **CODE_COMPLETE = PASS**: Disposable routing POC and CI infrastructure, not production features.
- **CI_VERIFIED = PASS**: [GitHub Actions run 38421045778](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38421045778), source commit `38d0c7d9745d0c568636df95fc650d6b7746e3c1`, completed successfully on the `macos-26` runner. Toolchain/repository diagnostics, Xcode project and shared-scheme validation, dependency resolution, repository/fixture checks, host and both extension builds, unsigned bundle inspection/packaging, native probe checks and artifact uploads passed. Exact OS/Xcode/Swift versions are retained in the run diagnostics; the source requires Swift 6.2+ (Xcode 26.x+) with Swift 6 language mode.
- **REMOTE_MAC_PENDING = YES**: REMOTE_MAC_VERIFIED is the sole remaining phase gate, including local signing, interactive Finder preview/thumbnail/read-access evidence, required OS/architecture coverage and final strategy decision.
- Phase 00 remains Complete; Phase 01 remains Blocked at 50% (five of ten primary tasks). Phases 02–20 and production renderers remain Not Started.

## Verified scope and limits
The explicit MainActor class/protocol conformance fix compiled successfully. Swift 6 complete concurrency checking, macOS 14 deployment and Intel support remain unchanged. CI confirms native compilation and automated checks; it does not demonstrate Finder provider selection, installed sandbox grants, callback lifecycle, minimum-OS runtime compatibility or Intel runtime behavior.

Both CI paths remain available: A. Codemagic M2 (last reported queued; untouched), B. GitHub Actions macOS (authoritative green result above). No signing credentials or production renderers were added. The unsigned CI ZIP is an inspection artifact, not a distributable or runtime-validation result.

## Remote preparation
[REMOTE_MAC_TESTING.md](REMOTE_MAC_TESTING.md) covers clean setup, Xcode scheme/target PeekProbe, Debug/My Mac, Sign to Run Locally for all three targets, app/extension inspection, registration, exact fixture tests and safe troubleshooting. Existing PEEK PREVIEW PROBE and blue PEEK THUMB markers are already unmistakable; no POC code changes are needed. All [compatibility matrix](QUICKLOOK_COMPATIBILITY_MATRIX.md) runtime fields remain NOT_TESTED.

## Checks
Windows-compatible checks passed: `node --test Tests/Repository/*.test.mjs` (9/9 contracts), `python3 Tests/Repository/fixtures_test.py` (5/5 fixture/plist tests), Python bundle-inspector syntax, both YAML policies/build-command parity, all 14 CI Bash syntax checks and `git diff --check`. Native checks passed in the linked macOS run; no macOS build is simulated on Windows. See [CI.md](CI.md) for the exact unsigned build and log inventory.

## Architecture and decisions
Disposable SwiftUI host, AppKit/Quartz preview and content-free thumbnail. FileProbe reads metadata and at most 32 bytes, returning a Sendable result without displaying contents/paths. No production parser, SQLite reader, StoreKit or runtime dependency. Provisional minimum macOS 14; read-only sandbox-first design. Candidate UTTypes are not runtime selection evidence.

## Remaining blocker and next gate
BLOCK-001: real interactive Mac evidence is missing. Execute the minimum/latest macOS and Apple Silicon/Intel protocol, record unavailable coverage honestly, verify fixture integrity, write findings and finalize [ADR-001](ADR/ADR-001-QUICKLOOK-STRATEGY.md) as GO, PARTIAL GO or NO-GO FOR QUICKLOOK-FIRST. JSON/Markdown losses alone do not invalidate useful coverage. Only after REMOTE_MAC_VERIFIED and the documented decision may Phase 01 complete and Phase 02 begin.
