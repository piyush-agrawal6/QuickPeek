# Phase 02 — Project Foundation

## Goal
Create the production application and shared modules after the feasibility decision.

## Dependencies
Phase 01. All required earlier gates must pass before production work starts.

## Technical Decisions
Native SwiftUI shell, AppKit where needed, and one shared renderer core; no backend or AI.

## Tasks
- [ ] Record the accepted strategy and supported macOS target in ADRs
- [ ] Create production app, core, Quick Look, thumbnail, unit-test and UI-test targets
- [ ] Centralize display name, bundle identifiers, URLs, support email, version and build settings
- [ ] Configure Swift 6 concurrency and extension-safe core APIs
- [ ] Add sandbox entitlements, hardened runtime and separate local signing overrides
- [ ] Establish asset catalogs, localization-ready strings and temporary app icon
- [ ] Create minimal macOS build and test CI with pinned runner/toolchain evidence
- [ ] Document clean checkout, build, test and debugging commands

## Testing Requirements
- [ ] Build all targets on a clean macOS checkout
- [ ] Run test target smoke tests in CI
- [ ] Verify extension embedding and shared module import
- [ ] Verify renaming configuration changes app-facing strings without source edits

## Acceptance Criteria
Production targets build and test; configuration is centralized; a clean checkout reproduces the build; Phase 01 strategy is accepted.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Target linkage or entitlements can differ between host and extension; CI cannot prove Finder routing.

## Deliverables
- ProjectPeekApp/
- ProjectPeekCore/
- QuickLookExtension/
- ThumbnailExtension/
- ProjectPeekTests/
- ProjectPeekUITests/
- .github/workflows/

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
