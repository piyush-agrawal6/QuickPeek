# Phase 05 — CSV TSV Viewer

## Goal
Deliver a bounded spreadsheet-style viewer for CSV and TSV.

## Dependencies
Phase 03, Phase 04. All required earlier gates must pass before production work starts.

## Technical Decisions
Read-only table with streaming access and bounded row cache; no formulas or editing.

## Tasks
- [ ] Define incremental delimited parser with chunk-boundary state
- [ ] Handle commas, tabs, quoted delimiters, escaped quotes and multiline fields
- [ ] Handle UTF-8, BOM, CRLF, LF, empty fields and trailing records
- [ ] Detect optional header rows with user override
- [ ] Set field, column, record and byte budgets with useful error positions
- [ ] Implement virtualized rows and horizontal scrolling with column sizing
- [ ] Implement scoped search and sorting with explicit loaded-row versus whole-file semantics
- [ ] Show exact or partial row counts and column counts honestly
- [ ] Preserve cell text literally without executing formulas
- [ ] Generate normal, malformed, 100k-row and adversarial wide-field fixtures

## Testing Requirements
- [ ] Unit test quote and UTF-8 sequences split at every chunk boundary
- [ ] Test empty files, ragged rows, multiline fields, BOM and malformed quotes
- [ ] UI test keyboard cell navigation, copy, headers, scrolling and sorting
- [ ] Benchmark first content under one second for documented typical fixtures and memory ceilings

## Acceptance Criteria
Large inputs avoid a complete in-memory row array; quoted multiline data is correct; table, search and sort semantics are clear and responsive.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Unbounded quoted fields, global sorting cost, incorrect multiline indexing and spreadsheet formula interpretation.

## Deliverables
- DelimitedParser
- CSVRenderer
- TSVRenderer
- virtualized table UI
- tests and benchmarks

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
