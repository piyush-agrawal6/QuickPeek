# Phase 06 — SQLite Viewer

## Goal
Inspect schemas and limited rows without changing database bytes or creating sidecars.

## Dependencies
Phase 03, Phase 05. All required earlier gates must pass before production work starts.

## Technical Decisions
Default toward rejecting unsafe access instead of silently ignoring WAL or marking live databases immutable.

## Tasks
- [ ] Evaluate native SQLite3 against wrapper dependency and document ADR-003
- [ ] Open using SQLite read-only flags, disable extension loading and restrict executable operations
- [ ] Validate SQLite header; handle corrupted, encrypted and mislabeled DB files
- [ ] Enumerate tables, indexes and views with cheap metadata
- [ ] Present columns, declared types, nullability, defaults and primary keys
- [ ] Quote identifiers safely and bind values; avoid executing untrusted view expressions by default
- [ ] Implement limited row pagination, bounded BLOB summaries and interruptible queries
- [ ] Avoid costly count queries and state when counts are unavailable
- [ ] Define WAL/SHM and locked/live database policy respecting no-sidecar guarantee
- [ ] Test app and sandboxed Quick Look access, including missing sibling-file permissions

## Testing Requirements
- [ ] Test hostile identifiers containing quotes and SQL-looking text
- [ ] Hash DB/WAL/SHM and enumerate source directory before and after inspection
- [ ] Test read-only filesystem, locked writer, WAL, corrupt DB and huge BLOB inputs
- [ ] Benchmark paginated access, query interruption and repeated open/close

## Acceptance Criteria
No mutations or source-side sidecars occur; schema and pages are accurate for supported cases; unsafe/live WAL cases get an explicit limitation.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Read-only flags alone do not establish no-sidecar safety; immutable mode is unsafe for changing databases; expensive virtual tables or views.

## Deliverables
- SQLiteRenderer
- read-only connection wrapper
- SQLite fixtures
- ADR-003
- data-integrity tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
