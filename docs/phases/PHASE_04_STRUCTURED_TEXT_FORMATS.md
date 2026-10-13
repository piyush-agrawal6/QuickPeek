# Phase 04 — Structured Text Formats

## Goal
Implement JSON, YAML, TOML, XML and masked ENV inspection.

## Dependencies
Phase 03. All required earlier gates must pass before production work starts.

## Technical Decisions
Parser dependencies require a documented audit; nontrivial formats will not use ad-hoc incomplete grammars.

## Tasks
- [ ] Audit YAML and TOML library maintenance, Swift compatibility, licenses, size and telemetry before selection
- [ ] Implement bounded JSON tree with lazy child expansion and preserved scalar types
- [ ] Add JSON pretty source, syntax highlighting, key/value search and key/value/object/path copy
- [ ] Compute cheap JSON metadata; handle deep objects, Unicode and large arrays
- [ ] Implement YAML mappings, sequences, scalars, source and bounded anchors/aliases
- [ ] Implement TOML tables, arrays and values using pyproject.toml and Cargo.toml fixtures
- [ ] Implement XML elements, attributes and namespaces with external entities disabled
- [ ] Implement ENV parsing with all values masked by default and explicit per-value reveal
- [ ] Add source/tree switching, accessible types and consistent malformed-data recovery
- [ ] Verify no ENV value appears in logs, default copies, thumbnails or error diagnostics

## Testing Requirements
- [ ] Unit test valid, malformed, Unicode, escaped and deeply nested data for every parser
- [ ] Test YAML alias amplification, TOML dates, XML external entities and ENV exports/quotes
- [ ] Test search and JSON path escaping for keys containing dots and brackets
- [ ] Integration test cancellation, error fallback and source/tree equivalence
- [ ] Measure nested and large structured input memory

## Acceptance Criteria
Each format renders realistic fixtures, exposes errors cleanly and stays within budgets; XML cannot resolve external resources; ENV is masked by default.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Parser recursion, YAML expansion, XML entity attacks, numeric precision and accidental secret disclosure.

## Deliverables
- ProjectPeekCore/Parsers/
- JSONRenderer
- YAMLRenderer
- TOMLRenderer
- XMLRenderer
- EnvRenderer
- structured fixtures and tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
