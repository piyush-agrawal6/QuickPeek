# Known issues and blockers

## BUG-001 — Quick Look preview conformance actor isolation
Severity: High
Phase: 01
Status: Resolved — verified in native CI run 38421045778 at 38d0c7d
Affected versions: 0.1.0 POC through a55bd68

### Description
The first authoritative GitHub Actions run reached Swift compilation on Xcode 26.x in Swift 6 language mode. NSViewController makes PreviewViewController's instance methods main-actor isolated, while the imported QLPreviewingController requirement for preparePreviewOfFile(at:completionHandler:) is nonisolated. The unqualified conformance promised nonisolated use of an isolated method. A MainActor Task inside the method body cannot correct the isolation contract of the conformance itself.

### Steps to reproduce
Build a55bd68 using macOS probe validation. Evidence: [GitHub run 38373566151](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38373566151). Project discovery, package resolution and repository/fixture checks passed; the build step failed. The supplied compiler diagnostic identifies PeekPreview and PreviewViewController.swift.

### Expected
The view controller's Quick Look conformance is usable in its main-actor isolation domain and compiles under strict Swift 6 checking for both supported architectures.

### Actual
Compiler error: conformance of PreviewViewController to QLPreviewingController crosses into main actor-isolated code and can cause data races. Native smoke tests and bundle inspection were skipped after compilation failed. This describes the historical failed run; the subsequent native build and checks passed.

### Verified fix
Applied explicit @MainActor to the class and to its QLPreviewingController conformance using Swift 6.2 isolated-conformance syntax (Xcode 26.x toolchain). Method bodies are unchanged. The detached task captures only URL and returns ProbeResult: Sendable; AppKit state and the completion handler remain in the MainActor task. No @preconcurrency, unsafe isolation assertion, architecture exclusion, language downgrade or relaxed concurrency setting is used. Verified by [run 38421045778](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38421045778), commit 38d0c7d; the compiler issue is closed. Signed Finder callback/lifecycle behavior remains a separate manual gate.

## BLOCK-001 — interactive Finder evidence
Severity: High
Phase: 01
Status: Open — REMOTE_MAC_PENDING = YES
Affected versions: 0.1.0 POC

### Description
Native macOS CI now passes. Windows cannot provide interactive Finder routing, local signature/registration, installed sandbox access or callback/lifecycle evidence.

### Steps to reproduce
Review the runtime compatibility matrix: every field is NOT_TESTED. CI does not exercise Finder.

### Expected
Observe locally signed sandboxed targets on minimum/latest macOS, recording OS/architecture, preview/thumbnail markers, read access and repeatability, then approve the strategy.

### Actual
CODE_COMPLETE = PASS / CI_VERIFIED = PASS / REMOTE_MAC_PENDING = YES. No positive or negative Finder routing result is known.

### Proposed fix
Follow [REMOTE_MAC_TESTING.md](REMOTE_MAC_TESTING.md), populate the matrix from observations and finalize ADR-001. Keep Phase 01 Blocked and production phases Not Started until REMOTE_MAC_VERIFIED. Codemagic remains untouched.

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
