# Phase 17 — Packaging Signing Notarization

## Goal
Produce a reproducible correctly signed distribution archive.

## Dependencies
Phase 16. All required earlier gates must pass before production work starts.

## Technical Decisions
Mac App Store sandbox first; no separate unsandboxed MVP.

## Tasks
- [ ] Replace placeholder bundle prefix with owned identity and configure developer team
- [ ] Set release version/build from central configuration
- [ ] Validate app and extension provisioning profiles and entitlements
- [ ] Create Release archive and inspect embedded extension signatures
- [ ] Run archive validation for Mac App Store distribution
- [ ] Document secure certificate handling outside Git
- [ ] Document Developer ID notarization and stapling only if a direct build is actually needed
- [ ] Verify clean installation and upgrade from a prior build
- [ ] Record archive hash, toolchain and rollback/recovery procedure

## Testing Requirements
- [ ] Inspect codesign verification and effective entitlements for every bundle
- [ ] Install archived build on a clean Mac account
- [ ] Validate launch, Finder extensions and offline previews from packaged build
- [ ] Run App Store archive validation; notarize only the applicable direct distribution artifact

## Acceptance Criteria
QA-approved archive is signed and validates for its selected channel; secrets are outside Git; installed behavior matches tested build.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Signing identity availability, profile mismatches, nested signatures and accidental broad permissions.

## Deliverables
- docs/RELEASE_CHECKLIST.md
- packaging runbook
- signed archive evidence outside repository

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
