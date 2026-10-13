# Known issues and blockers

## BLOCK-001
Severity: High
Phase: 01
Status: Open — external environment prerequisite
Affected versions: 0.1.0 POC source

### Description
This session runs on Windows without Swift, Xcode, Finder or a configured Mac destination. The probe is uncompiled and its platform behavior is unverified.

### Steps to reproduce
Inspect `Get-Command swift,xcodebuild -ErrorAction SilentlyContinue`; neither tool exists.

### Expected
Build signed sandboxed targets and observe Finder routing on minimum/latest macOS.

### Actual
Only local source, project structure and documentation checks are possible. No positive or negative routing result is known.

### Proposed fix
Open this repository on a Mac with a Swift 6-capable Xcode and run QUICKLOOK_TEST_PLAN.md. A Mac CI runner can first validate compilation but cannot replace interactive Finder testing. Recommended: build and run locally on a Mac, then obtain the second OS test environment. Keep Phase 01 Blocked and production phases Not Started until evidence supports ADR-001.

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
