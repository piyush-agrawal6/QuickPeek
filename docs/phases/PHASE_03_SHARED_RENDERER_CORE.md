# Phase 03 — Shared Renderer Core

## Goal
Build bounded, cancellable file preparation and renderer models shared by both entry points.

## Dependencies
Phase 02. All required earlier gates must pass before production work starts.

## Technical Decisions
Read-only access; no auto-save, sidecars or metadata updates; unknown content gets a bounded safe fallback.

## Tasks
- [ ] Define PeekFile metadata including URL, UTType, extension, byte size and dates
- [ ] Detect format using UTType, suffix and bounded content sniffing with mismatch handling
- [ ] Define ContentCategory, renderer protocol, RenderedDocument and typed error states
- [ ] Implement renderer registry and safe raw-text fallback
- [ ] Implement read-only file access with balanced security-scoped access and cancellation
- [ ] Separate background parsing from main-actor presentation
- [ ] Apply byte, field, node, depth and time budgets before expensive allocations
- [ ] Create consistent metadata and partial-content models without eager full scans
- [ ] Define sanitized OSLog categories and timing signposts without contents or paths

## Testing Requirements
- [ ] Unit test detection, mislabeled data, Unicode, encodings and unsupported files
- [ ] Unit test permission denial, cancellation and resource cleanup
- [ ] Integration test registry selection from app and extension adapters
- [ ] Measure bounded reads and verify no source writes

## Acceptance Criteria
Shared models represent all preview states; malformed, oversized and denied inputs are bounded and recoverable; both adapters use the same core.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Symlinks, files changing during read, non-regular files, unbounded parsing and UI actor stalls.

## Deliverables
- ProjectPeekCore/Models/
- FileDetection/
- Renderers/
- Metadata/
- Performance/
- Utilities/
- core unit tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
