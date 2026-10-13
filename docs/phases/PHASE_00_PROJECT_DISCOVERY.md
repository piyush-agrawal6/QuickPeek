# Phase 00 — Project Discovery

## Goal
Establish scope, environment, constraints, and a complete release task system.

## Dependencies
None. All required earlier gates must pass before production work starts.

## Technical Decisions
Swift 6 and native macOS APIs; provisional macOS 14 minimum; no runtime dependencies in the routing probe.

## Tasks
- [x] Inspect existing files, Git state, and repository instructions
- [x] Inventory operating system, Swift, Xcode, and signing availability
- [x] Extract V1 formats, privacy rules, monetization, and explicit non-goals
- [x] Create all 21 detailed phase documents and the linked master plan
- [x] Record provisional platform, architecture, dependency, and safety decisions
- [x] Record Windows validation limits and an actionable Mac handoff

## Testing Requirements
- [x] Verify all phase links and required sections with repository checks
- [x] Review scope against the full supplied brief
- [x] Confirm no existing project or user files were overwritten

## Acceptance Criteria
All 21 plans exist with actionable tasks, tests, risks, and acceptance criteria; discovery evidence and next action are recorded.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Missing Apple tooling prevents platform validation; commercial identity is not yet selected.

## Deliverables
- docs/MASTER_PLAN.md
- docs/CURRENT_STATE.md
- docs/DECISIONS.md
- docs/DISCOVERY.md
- docs/phases/*.md

## Completion Summary
Completed 2026-10-13. Empty workspace and tool availability documented in DISCOVERY.md. All 21 phase files include required sections, detailed tasks and acceptance requirements; Node contracts verify the plan structure and links. Scope was manually reviewed against the supplied brief. No pre-existing files were overwritten. Compiled-product build/runtime gates do not apply to this documentation-only discovery phase; they remain mandatory in Phase 01. No discovery blocker remains.

## Status
Complete
