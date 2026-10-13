# Phase 07 — Log and Markdown

## Goal
Add streaming JSONL, windowed logs and safe Markdown rendering.

## Dependencies
Phase 03, Phase 04, Phase 06. All required earlier gates must pass before production work starts.

## Technical Decisions
Use explicit user actions for external links and no automatic network content.

## Tasks
- [ ] Parse JSONL/NDJSON records independently with line numbers and malformed-line recovery
- [ ] Implement bounded record list and structured detail with partial record counts
- [ ] Build log offset indexing and windowed reads with cancellation
- [ ] Add monospaced line numbers, search, severity labels and timestamp heuristics
- [ ] Evaluate optional tail mode without folder monitoring or idle CPU polling
- [ ] Render Markdown headings, lists, tables, links, inline code and fenced code blocks
- [ ] Provide safe raw source and highlighting
- [ ] Disable script execution and automatic remote content loads; restrict local resource paths
- [ ] Handle huge lines, invalid encodings, CRLF and files changing during preview

## Testing Requirements
- [ ] Unit test mixed valid/invalid JSONL, UTF-8 splits and oversized records
- [ ] Test large logs, line-window movement, cancellation and low idle CPU
- [ ] Test Markdown script, remote image, file URL and traversal payloads offline
- [ ] UI test source/rendered switching and search

## Acceptance Criteria
Record and log inspection remain bounded; Markdown never executes scripts or silently fetches network assets; malformed lines do not abort the entire preview.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
HTML injection, remote tracking, oversized lines and expensive offset indexes.

## Deliverables
- JSONLRenderer
- LogRenderer
- MarkdownRenderer
- windowed reader
- security fixtures

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
