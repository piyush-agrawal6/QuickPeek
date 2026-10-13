# Phase 13 — Performance and Large Files

## Goal
Measure and enforce responsive bounded inspection under realistic and hostile loads.

## Dependencies
Phase 04, Phase 05, Phase 06, Phase 07, Phase 08, Phase 09, Phase 12. All required earlier gates must pass before production work starts.

## Technical Decisions
Performance targets are goals until measured, never marketing claims based on assumptions.

## Tasks
- [ ] Generate small/medium/large fixtures with reproducible seeds and hashes
- [ ] Benchmark cold/warm preview startup, parse time, peak memory and scrolling
- [ ] Tune provisional 5 MiB and 50 MiB text thresholds based on measured results
- [ ] Use conservative structured JSON limits and partial source fallback
- [ ] Validate CSV virtualization, log windows and SQLite requested-page-only reads
- [ ] Implement cancellation propagation and avoid repeated parsing on mode switches
- [ ] Set bounded caches inside approved containers with eviction and secret exclusions
- [ ] Profile idle CPU, repeated requests and memory recovery with Instruments
- [ ] Record hardware, OS, toolchain, sample count and regression budgets

## Testing Requirements
- [ ] Performance test typical first CSV content under one second and small structured preview target below 300 ms
- [ ] Stress 100k rows, huge lines/fields, depth bombs and corrupt DBs
- [ ] Test low-memory and low-storage scenarios
- [ ] Compare recorded baselines before and after optimizations

## Acceptance Criteria
Measured budgets pass on supported hardware; UI remains responsive; no unbounded allocations; targets have evidence or explicit justified revised limits.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Optimizing without measurements, hidden eager materialization and cache leakage.

## Deliverables
- docs/LARGE_FILE_STRATEGY.md
- docs/PERFORMANCE_BENCHMARKS.md
- benchmarks and resource-budget tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
