# Phase 09 — Thumbnail Extension

## Goal
Add fast and privacy-safe thumbnails after previews are stable.

## Dependencies
Phase 08. All required earlier gates must pass before production work starts.

## Technical Decisions
Use content-free type marks initially; no renderer screenshot capture.

## Tasks
- [ ] Select useful type-specific symbols and restrained visual hierarchy
- [ ] Use shared bounded classification without full parsing or source content
- [ ] Implement QLThumbnailProvider respecting maximum sizes and scale
- [ ] Ensure ENV and database thumbnails contain no values, rows or table names
- [ ] Provide fallback for corrupted and unsupported input
- [ ] Handle cancellation and parallel requests within strict memory limits
- [ ] Restrict declarations to verified thumbnail types
- [ ] Document independent Finder thumbnail cache behavior

## Testing Requirements
- [ ] Test tiny/large thumbnail requests and Retina scale
- [ ] Verify ENV secrets and DB contents never appear
- [ ] Test multiple simultaneous Finder requests and error fallback
- [ ] Manually verify cold/warm thumbnails after fresh install and reboot

## Acceptance Criteria
Thumbnails are legible, bounded, source-safe and independently verified in Finder.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Stale system caches, privacy leakage and unnecessary expensive parsing.

## Deliverables
- ThumbnailExtension/
- thumbnail tests
- compatibility results

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
