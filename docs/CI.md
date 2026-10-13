# macOS CI validation

## Readiness and scope
**CODE_COMPLETE = PASS / CI_VERIFIED = PASS / REMOTE_MAC_PENDING = YES**. Phase 01 remains Blocked only on REMOTE_MAC_VERIFIED; production renderers remain unstarted.

## Authoritative green native validation
[GitHub Actions run 38421045778](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38421045778), source commit `38d0c7d9745d0c568636df95fc650d6b7746e3c1`, completed successfully on the `macos-26` runner. Toolchain/repository diagnostics, Xcode project and shared-scheme validation, dependency resolution, repository/fixture checks, host and both extension builds, unsigned bundle inspection/packaging, native probe checks and artifact uploads passed. Exact OS/Xcode/Swift versions are retained in the run diagnostics; the source requires Swift 6.2+ (Xcode 26.x+) with Swift 6 language mode.

The earlier actor-isolation failure below is resolved. No compiler workaround, architecture exclusion or concurrency relaxation was introduced. The green run verifies the configured build; it is not interactive Finder or minimum-OS/Intel runtime evidence. Use [remote Mac testing](REMOTE_MAC_TESTING.md) for the remaining gate.

## First authoritative native compile and isolation fix
[Run 38373566151](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38373566151), commit `a55bd68dcb450401f1399c2e11bb9f6a486d5694`, completed with failure. GitHub API step results confirm runner setup, repository checkout, toolchain diagnostics, Xcode project discovery, dependency resolution and repository/fixture checks succeeded. The unsigned build failed; bundle inspection/native smoke tests were skipped; diagnostic and Xcode-result uploads succeeded. The compiler output supplied by the user identifies only the PeekPreview actor-isolation error on Xcode 26.x with Swift 6 language mode; it is not a runner, package-resolution or project-discovery failure.

`PreviewViewController` inherits AppKit main-actor isolation, but its unqualified `QLPreviewingController` conformance tried to satisfy a nonisolated callback requirement. The body already creating `Task { @MainActor in ... }` does not change that conformance contract. The fix explicitly annotates both the class and conformance:
```swift
@MainActor
final class PreviewViewController: NSViewController, @MainActor QLPreviewingController {
    // Existing method bodies unchanged.
}
```
This uses [SE-0470 isolated conformances](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0470-isolated-conformances.md), implemented in Swift 6.2, and the approach presented in [Apple's Swift concurrency update](https://developer.apple.com/videos/play/wwdc2025/245/). The compiler can restrict use of this conformance to MainActor instead of accepting a nonisolated promise. No @preconcurrency fallback is justified by the evidence, and none is added. AppKit access/completion stay on MainActor; the detached file read captures URL only and returns a Sendable value. This does not automatically make foreign Objective-C callers hop actors: actual Quick Look callback/lifecycle behavior still requires signed Finder validation.

The source now requires a **Swift 6.2+ compiler (Xcode 26.x or newer)** for this syntax while retaining **SWIFT_VERSION=6.0**, complete concurrency checking, macOS 14.0 deployment and Intel/x86_64 support. Neither CI configuration nor architecture/build flags are changed. Run 38421045778 verified the fix and previously skipped bundle/native checks. No remaining compiler failure is known from that run; future source changes still require native CI.

`codemagic.yaml` defines the manual workflow `macos-probe-compile` for an Apple Silicon M2 Mac mini, with `xcode: latest` and `node: lts`. Actual OS, CPU, Xcode, Swift, SDK, Node, Python and commit are printed on every run. After the first successful run, record and consider pinning the exact Xcode version. Runner access/credits and repository authorization must be available in the Codemagic account. The selected instance and YAML structure follow [Codemagic configuration documentation](https://docs.codemagic.io/yaml-basic-configuration/yaml-getting-started/) and [machine types](https://docs.codemagic.io/knowledge-codemagic/machine-type/).

No signing certificates, profiles, secret groups, App Store integrations or distribution steps are configured. Codemagic has no automatic triggers. Repository access through Codemagic's GitHub connection is separate from Apple Developer credentials; no Apple account is needed for compile validation.

## Two independent CI paths

| Path | Workflow | Runner | Trigger / current evidence |
|---|---|---|---|
| A. Codemagic M2 | `codemagic.yaml`: `macos-probe-compile` | `mac_mini_m2` | Manual; user reports compilation is queued. Configuration and queued job are untouched. |
| B. GitHub Actions macOS | `.github/workflows/macos-probe.yml`: `macOS probe validation` | Standard GitHub-hosted `macos-26` | Authoritative green run 38421045778 at 38d0c7d; host, extensions and native checks passed. |

Both paths are **compile-validation only** and use the exact unsigned build command below. Neither requires Apple credentials, provisions devices, signs a release, publishes the app or tests Finder routing. **CI_VERIFIED = PASS** is supported by the successful run above. **REMOTE_MAC_PENDING = YES** remains until interactive testing and the architecture decision pass; CI success does not complete Phase 01.

The new GitHub workflow includes environment and repository diagnostics (`pwd`, `git status`, `ls`), native project/plist checks, package resolution, existing Node/Python tests, the shared-scheme build, bundle inspection and native Swift checks. Push filters cover `POC/`, `Config/`, `PeekProbe.xcodeproj/`, `Tests/`, `scripts/`, `.github/workflows/`, `codemagic.yaml`, `.gitattributes` and `.gitignore`. Documentation-only pushes do not start it. No concurrency cancellation policy affects the queued Codemagic job.

GitHub uploads logs/JSON with `always()`, and `build.xcresult` when generated even after failure. Its unsigned app ZIP is uploaded only when both the build and packaging steps succeed and the ZIP exists. If later native checks fail, the build artifact can still be inspected, but the workflow remains failed. Artifacts are retained for 14 days and named with run ID/attempt. The ZIP preserves the app bundle; downloaded Xcode result contents may need to be placed in a `.xcresult` directory for Xcode. See [GitHub artifact documentation](https://docs.github.com/en/actions/tutorials/store-and-share-data) and the [macOS runner inventory](https://github.com/actions/runner-images).

To run path B immediately, push its configuration to `main` (which triggers this workflow), or open the repository's Actions tab, choose **macOS probe validation**, then **Run workflow** on `main`. Inspect its named logs using the same troubleshooting table below. A queued/running job is not successful validation. Leave path A queued and unchanged while path B runs.

## Git audit
- Branch at preparation: `main`; initial working tree clean.
- Existing milestone: `b6c0b546c2bc952912215ce9799baffc3d2c5081` (`b6c0b54`).
- Fetch and push remote: `https://github.com/piyush-agrawal6/QuickPeek.git`.
- Live read-only `git ls-remote --heads origin main` confirmed that same full commit on GitHub before changes. Local `origin/main` also matched. No remote was invented or modified.
- CI preparation commit: `chore: add macOS CI validation workflow`. See Git history for its hash. Connecting Codemagic requires that this commit is available on the selected remote branch. No force-push or branch rewrite is needed.

## Discovered Xcode project
This source/project-file audit is now backed by successful native Xcode discovery, build and bundle inspection in run 38421045778.

| Property | Discovered value |
|---|---|
| Project | `PeekProbe.xcodeproj` (project name `PeekProbe`) |
| Shared scheme | `PeekProbe` |
| Scheme file | `PeekProbe.xcodeproj/xcshareddata/xcschemes/PeekProbe.xcscheme` |
| Configurations | `Debug`, `Release` on the project and all three targets; default `Release`, CI explicitly selects `Debug` |
| Deployment target | `MACOSX_DEPLOYMENT_TARGET = 14.0` from `Config/Product.xcconfig` |
| Swift language | `SWIFT_VERSION = 6.0`; strict concurrency `complete` |
| SDK | `macosx`; actual installed SDK recorded in CI |
| Host target / product | `PeekProbe` / `PeekProbe.app` |
| Preview target / product | `PeekPreview` / `PeekPreview.appex` |
| Thumbnail target / product | `PeekThumbnail` / `PeekThumbnail.appex` |
| Host bundle ID | `$(PEEK_BUNDLE_PREFIX)` → `com.example.peek` without local overrides |
| Preview bundle ID | `$(PEEK_BUNDLE_PREFIX).preview` → `com.example.peek.preview` |
| Thumbnail bundle ID | `$(PEEK_BUNDLE_PREFIX).thumbnail` → `com.example.peek.thumbnail` |
| Preview extension point | `com.apple.quicklook.preview` |
| Thumbnail extension point | `com.apple.quicklook.thumbnail` |
| Preview principal class | `$(PRODUCT_MODULE_NAME).PreviewViewController` → `PeekPreview.PreviewViewController` |
| Thumbnail principal class | `$(PRODUCT_MODULE_NAME).ThumbnailProvider` → `PeekThumbnail.ThumbnailProvider` |
| External packages | None; no package references in the project |
| XCTest targets / TestAction | None; existing native tests use a standalone Swift harness |

The shared scheme's BuildAction selects host target `PeekProbe` and enables implicit dependencies. The host also has **explicit PBXTargetDependency references to both extensions**. Its **Embed App Extensions** copy phase contains both products with destination `13` (PlugIns). Expected output is:

```text
PeekProbe.app/Contents/
  MacOS/PeekProbe
  PlugIns/PeekPreview.appex/Contents/{Info.plist,MacOS/PeekPreview}
  PlugIns/PeekThumbnail.appex/Contents/{Info.plist,MacOS/PeekThumbnail}
```

One host scheme build therefore compiles all three targets and exercises embedding. Separate extension schemes/builds are unnecessary and could miss broken host embedding. No shared-scheme change was needed. `APPLICATION_EXTENSION_API_ONLY=YES` and `SKIP_INSTALL=YES` are set on the extensions. All targets retain their sandbox and hardened-runtime settings. `Config/Local.xcconfig` is ignored and must not be installed on the CI checkout. Placeholder IDs are suitable for this unsigned probe, not final distribution.

## Workflow and commands
1. Print environment and exact commit (`01-environment.log`).
2. Lint the OpenStep project, Info.plists and entitlements with native `plutil`; confirm the shared scheme; run `xcodebuild -list -project PeekProbe.xcodeproj` (`02-project.log`). Print resolved build settings (`03-build-settings.log`).
3. Run `xcodebuild -resolvePackageDependencies -project PeekProbe.xcodeproj -scheme PeekProbe -clonedSourcePackagesDirPath build/SourcePackages CODE_SIGNING_ALLOWED=NO` (`04-packages.log`). With no packages this is expected to be a no-op, but errors are not ignored.
4. Run Node repository contracts, Python fixture/plist tests, synthetic fixture generation and integrity checks (`05`–`07` logs).
5. Build the host and both extensions with the command below (`08-build.log`, plus `build.xcresult`).
6. Validate processed bundle IDs, executable presence, both embedded extensions, extension points/classes, deployment consistency and supported-type inventory. Preserve inspection archive and checksum (`bundle-report.json`, `09-bundle.log`).
7. Compile/run the existing native Swift smoke harness; run the UTType probe against synthetic fixtures and recheck integrity (`10-native-tests.log`). This CLI probe does not demonstrate Finder selection or sandbox grants.

```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe \
  -configuration Debug -destination 'platform=macOS' \
  -derivedDataPath build/DerivedData \
  -clonedSourcePackagesDirPath build/SourcePackages \
  -resultBundlePath artifacts/ci/build.xcresult \
  CODE_SIGNING_ALLOWED=NO build
```

Run on a real Mac from repository root after `mkdir -p artifacts/ci`. For a repeat local run, choose a fresh result bundle path; Xcode refuses to overwrite an existing `.xcresult`. Codemagic uses a clean checkout with no configured build cache.

Every shell step uses Bash `set -euo pipefail`, so piping output through `tee` preserves compiler/test failure. No `ignore_failure`, `|| true`, project regeneration, code signing workaround, source patch, warning suppression or compile-error suppression is used in CI. The repository test generator works in an isolated temporary directory and compares output rather than repairing the checkout.

`CODE_SIGNING_ALLOWED=NO` is a command-line override for unsigned compile validation; project signing settings remain intact. CI does not run `archive`, export a distributable package, provision devices or register Finder extensions. Do not add provisioning-update flags or certificates to solve a compile-only failure. A standalone Swift harness may use the toolchain's normal local linker behavior; that does not turn the app artifact into a signed distribution build.

There is no valid `xcodebuild test` action yet. Running it would fail for lack of a test target rather than test this code. Available tests are executed explicitly:
```sh
node --test Tests/Repository/*.test.mjs
python3 Tests/Repository/fixtures_test.py
xcrun swiftc -swift-version 6 POC/Shared/FileProbe.swift Tests/Probe/ProbeSmokeTests.swift -o build/probe-tests
build/probe-tests
```

## Artifacts and failure evidence
Download `artifacts/ci/*.log`, `bundle-report.json`, `build.xcresult`, `PeekProbe-unsigned-inspection.zip` and its `.sha256` from the build page when produced. Logs are written as each command runs, so earlier diagnostics remain available on a failed build. If compilation fails there is no completed app archive; if native tests fail after packaging, the archive may exist but the **overall build is still failed**. Never infer a passing CI result from artifact presence. Very early runner/checkout failures appear in Codemagic's setup log, before repository artifact collection.

The ZIP preserves the built `.app` via `ditto` for structural inspection and later remote-Mac debugging. It is **unsigned, unnotarized, not distributable, and not proof that Finder will load either extension**. No raw user files or credentials are packaged. Open the `.xcresult` on a Mac with a compatible Xcode; consult the plain build log if result-bundle generation itself failed.

## Common likely failures

| Failure | Log section to inspect | Investigation / fix |
|---|---|---|
| Invalid project.pbxproj | `02-project.log`: `plutil` and `xcodebuild -list` | Locate parser line/reference error; fix the deterministic generator and regenerate locally; compare checked-in output. Do not regenerate away errors during CI. |
| Missing shared scheme | `02-project.log`: file check and scheme listing | Confirm case-sensitive path and target BlueprintIdentifier; share and commit scheme if missing. |
| Wrong deployment target | `03-build-settings.log`: `MACOSX_DEPLOYMENT_TARGET`; `08-build.log` availability/link messages | Confirm all targets inherit 14.0; resolve actual SDK support rather than silently raising deployment target. |
| Unavailable SDK/API | `01-environment.log`: installed SDK/Swift; `08-build.log`: SwiftCompile/Ld | Use a Swift 6.2+ compiler on a supported Xcode image; fix availability annotations or unsupported APIs. Record image/version change. |
| Extension Info.plist errors | `02-project.log` plist lint; `08-build.log`: ProcessInfoPlistFile; inspection-step stderr | Check extension point, principal class/module expansion, package type, QL attributes and processed plist values. |
| Missing embed extension phase | `08-build.log`: dependency graph and Copy steps; bundle-inspection step | Verify explicit dependencies, both appex product references and destination 13; fixing extension compilation alone is insufficient. |
| Bundle identifier mismatch | `03-build-settings.log`: PRODUCT_BUNDLE_IDENTIFIER; `bundle-report.json` or inspection-step stderr | Compare host prefix and `.preview`/`.thumbnail`; remove unintended local override, not checks. |
| Invalid UTType declaration | `02-project.log`, Python tests in `06-fixture-tests.log`, inspection-step stderr | Check candidate inventory, conformance/tag structure and QLSupportedContentTypes. Well-formed declarations can still fail routing; use remote Finder evidence for semantic/priority failures. |
| Swift compile errors | `08-build.log`: SwiftCompile/SwiftEmitModule and first error; `10-native-tests.log` for harness | Fix the indicated source/concurrency/import/API error in the POC; do not weaken Swift 6 or skip the target. |
| Code-signing-related failures | `03-build-settings.log`: CODE_SIGNING_ALLOWED; `08-build.log`: CodeSign/provisioning messages | Confirm this exact unsigned command is used and no local signing file is present. Investigate the requiring build phase; no certificates/profiles are required for this workflow. |
| Tests fail | `05-repository-tests.log`, `06-fixture-tests.log`, `07-fixture-integrity.log`, `10-native-tests.log` | Fix the failing contract/fixture/native behavior; retain nonzero exit status. |
| Runner or repository unavailable | Codemagic setup/clone log, then `01-environment.log` if reached | Authorize this repository and ensure Apple Silicon runner access/credits; do not substitute a Windows/Linux build. |

## Connect and run
1. Ensure the CI readiness commit is on GitHub's `main` (a normal fast-forward push only after remote verification).
2. Add the existing `piyush-agrawal6/QuickPeek` repository to Codemagic through the user's account; select YAML configuration. No service account, secret or Apple integration is configured by this work.
3. Select branch `main`, workflow `macos-probe-compile`, and start the first build manually. Confirm the clone commit matches the readiness commit. This work does not start a paid/remote job automatically.
4. Record build URL/ID, exact commit, runner/toolchain, step outcome and artifacts in CURRENT_STATE.md. Fix actual Mac errors and rerun until passing; GitHub already satisfies CI_VERIFIED; record any Codemagic result independently.
5. Keep REMOTE_MAC_PENDING until signed interactive minimum/latest-macOS Finder testing completes under [the manual protocol](QUICKLOOK_TEST_PLAN.md). Keep production renderers blocked until Phase 01's architecture gate passes.

The older `.github/workflows/probe.yml` remains available and unchanged as a legacy baseline; the requested independent path B is `.github/workflows/macos-probe.yml`. A push may also trigger that older workflow. Configuration existence or any uninspected previous run is not passing evidence. Codemagic remains manual and its queued job is not cancelled or modified.
