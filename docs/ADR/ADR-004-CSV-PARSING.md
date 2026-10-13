# Decision
Streaming parser abstraction with bounded record caching; implementation deferred.

## Context
Multiline quoted fields, UTF-8 chunk boundaries and large files preclude naïve line splitting or eager row arrays.

## Options
Audited incremental parser library; small tested state machine; eager third-party CSV loader.

## Decision
Reject eager whole-file loading for large CSV. Select library versus state machine during Phase 05 using correctness and resource benchmarks.

## Consequences
Explicit maximum field/column/row budgets; row virtualization; scoped search/sorting; exact-versus-partial counts. Boundary tests are required before UI claims.
