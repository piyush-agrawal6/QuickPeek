# Quick Look technical validation protocol

Status: prepared; not executed on macOS. Only use generated synthetic fixtures.

## 1. Prerequisites and environment evidence
Use a Mac with Swift 6-capable Xcode selected by `xcode-select`. Record `sw_vers`, `uname -m`, `xcodebuild -version`, `swift --version`, exact commit, install location, signing mode, enabled competing preview providers and OS build. Repeat on minimum macOS 14 and latest public macOS at execution time. Capture intermediate OS and Intel if available; never label absent coverage as a pass.

The checked-in Xcode project does not require Node. If changing types/settings, run `node scripts/generate-project.mjs` on a development machine and commit regenerated output. Candidates live in POC/formats.json; branding/versions in Config/Product.xcconfig.

## 2. Baseline before registering the app
```sh
python3 scripts/generate-fixtures.py
swift scripts/probe-types.swift Tests/Fixtures/Generated
```
Record each fixture's resolved resource UTType and suffix-derived type before installation. For representative fixtures also record `mdls -name kMDItemContentType -name kMDItemContentTypeTree` (Spotlight may be unavailable/stale; do not conflate it with resource metadata). Inspect native Finder previews and thumbnails before installing the probe. Show hidden files with Command-Shift-period for `.env` and `.env.local`.

## 3. Compile check, then signed local build
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO build
```
This checks compilation only. Do not use an unsigned CI artifact as proof of extension behavior.

For the real Finder test, open PeekProbe.xcodeproj in Xcode, configure your own team in an ignored Config/Local.xcconfig, and use the same team for all targets. Example values (replace with your own):
```text
DEVELOPMENT_TEAM = YOUR_TEAM_ID
PEEK_BUNDLE_PREFIX = your.owned.namespace.peekprobe
```
Build using Xcode or the following command, which preserves automatic signing:
```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe -configuration Debug -derivedDataPath build/DerivedData build
```
Inspect signatures/entitlements using `codesign -dv --verbose=4` and `codesign -d --entitlements :-` on the app and both embedded appex bundles. Record evidence outside committed source; no credentials in Git.

Install the built app to the test user's Applications location using Finder; launch once. Inspect Quick Look extension settings where exposed by that OS version. Record unknown state honestly if no reliable status API exists. `pluginkit -m -A -D` is supplementary registration evidence, not proof of Finder invocation. Do not force registration, change defaults or clear global caches as the baseline test.

## 4. Observe every fixture
For each row in the matrix and each OS:
1. Select the fixture in Finder and press Space.
2. Record **PEEK PREVIEW PROBE** if visible; otherwise record native/other provider, no preview or error. Save a screenshot using synthetic data.
3. If our marker appears, record resolved type, byte size and read access message. Metadata failure is not a successful sandbox-access test.
4. Independently enable Finder icon previews and inspect the **PEEK THUMB** marker at a large enough icon size. Record native/stale/absent thumbnails distinctly.
5. Re-run the type probe after app installation and compare with baseline. If the observed type differs from candidates, record it before changing declarations.
6. Repeat selection at least three times, close/reopen app, then reboot and repeat. Include a clean account/install and a known third-party-provider environment separately.
7. Record elapsed startup using appropriate timing instrumentation later; a visual impression is not a benchmark.

`qlmanage -p` / `-t` may help diagnose behavior, but Finder observation is authoritative for the product. Directly launching the extension debugger proves its code can run, not that Finder routes to it. If testing cache resets, document separately as a diagnostic intervention; do not count intervention-dependent routing as reliable install behavior.

## 5. Safety and failure cases
Test empty/malformed/mislabeled fixtures, a duplicate fixture with read permission denied, rapid selection switching, hidden ENV variants and a missing file. Do not use real secrets or live user databases. The POC does not parse SQLite or display content; production SQLite safety is a separate later gate.
```sh
python3 scripts/verify-fixtures.py
```
Run this before regenerating any fixture. Also compare original timestamps/extended attributes manually if available; hash equality alone does not prove metadata unchanged. Record both source directory entries and any sidecar files. Thumbnail cache output belongs to macOS containers, never next to input files.

## 6. Evaluate the decision
Fill every matrix field with measured observations or explicit unavailable evidence. Separate suffix coverage from distinct format-family value. At approximately 6–7 reliable useful families and acceptable strategic coverage, select Quick Look-first plus standalone inspector. Otherwise select Inspector-first plus proven extension support. A thumbnail-only success does not count as custom-preview success. Missing Mac access means decision pending, not No-Go.

Update ADR-001, Phase 01 tasks/tests, MASTER_PLAN, CURRENT_STATE and KNOWN_ISSUES. Advance only after build/tests/manual gates pass and architecture decision has evidence.
