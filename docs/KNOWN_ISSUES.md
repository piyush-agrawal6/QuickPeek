# Known issues and blockers

## BUG-001 — Quick Look preview conformance actor isolation
Severity: High
Phase: 01
Status: Fix implemented — macOS CI verification pending (CI_BUILD_FIX_PENDING)
Affected versions: 0.1.0 POC through a55bd68

### Description
The first authoritative GitHub Actions run reached Swift compilation on Xcode 26.x in Swift 6 language mode. NSViewController makes PreviewViewController's instance methods main-actor isolated, while the imported QLPreviewingController requirement for preparePreviewOfFile(at:completionHandler:) is nonisolated. The unqualified conformance promised nonisolated use of an isolated method. A MainActor Task inside the method body cannot correct the isolation contract of the conformance itself.

### Steps to reproduce
Build a55bd68 using macOS probe validation. Evidence: [GitHub run 38373566151](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38373566151). Project discovery, package resolution and repository/fixture checks passed; the build step failed. The supplied compiler diagnostic identifies PeekPreview and PreviewViewController.swift.

### Expected
The view controller's Quick Look conformance is usable in its main-actor isolation domain and compiles under strict Swift 6 checking for both supported architectures.

### Actual
Compiler error: conformance of PreviewViewController to QLPreviewingController crosses into main actor-isolated code and can cause data races. Native smoke tests and bundle inspection were skipped after compilation failed. CI infrastructure is active, but no complete native build has passed yet.

### Proposed fix
Applied explicit @MainActor to the class and to its QLPreviewingController conformance using Swift 6.2 isolated-conformance syntax (Xcode 26.x toolchain). Method bodies are unchanged. The detached task captures only URL and returns ProbeResult: Sendable; AppKit state and the completion handler remain in the MainActor task. No @preconcurrency, unsafe isolation assertion, architecture exclusion, language downgrade or relaxed concurrency setting is used. A new real macOS CI run must verify this API/toolchain combination; keep this issue open until it passes. Signed Finder callback/lifecycle behavior remains a separate manual gate.

## BLOCK-001
Severity: High
Phase: 01
Status: Open — external environment prerequisite
Affected versions: 0.1.0 POC source

### Description
Local work runs on Windows without Swift, Xcode or Finder. The GitHub macOS runner is now proven operational and has reached native compilation, but the complete probe build is blocked by BUG-001 and Finder behavior remains unverified.

### Steps to reproduce
Inspect `Get-Command swift,xcodebuild -ErrorAction SilentlyContinue`; neither tool exists.

### Expected
Build signed sandboxed targets and observe Finder routing on minimum/latest macOS.

### Actual
Readiness is CODE_COMPLETE / MACOS_CI_ACTIVE / CI_BUILD_FIX_PENDING / REMOTE_MAC_PENDING. GitHub runner setup, Xcode project discovery, dependency resolution and repository checks passed. PeekPreview failed Swift actor-isolation checking; the fix awaits a new build. No positive or negative routing result is known.

### Proposed fix
Verify the actor-isolation fix in another GitHub Actions run using unchanged CI. Leave Codemagic untouched. After build/tests pass, use Xcode 26.x with Swift 6.2+ on a real Mac and follow QUICKLOOK_TEST_PLAN.md for signed interactive Finder testing, including minimum/latest OS coverage. Keep Phase 01 Blocked and production phases Not Started until evidence supports ADR-001.

## RISK-001 — candidate type declarations
Severity: Medium
Phase: 01
Status: Awaiting experiment
Affected versions: 0.1.0 POC

### Description
Candidate imported types may differ from types resolved by installed macOS or third-party apps, especially YAML, TOML, JSONL, SQLite, logs and ENV dotfiles.

### Steps to reproduce
Run type probe before and after installation on the Mac fixtures.

### Expected
Record resolved types and exact provider markers for every suffix.

### Actual
Not measured. No candidate is a verified system fact.

### Proposed fix
Compare measured type to extension declarations, add justified exact aliases and rerun the baseline/install protocol. Never claim ownership or use a blanket public.text/public.data handler to force selection.
