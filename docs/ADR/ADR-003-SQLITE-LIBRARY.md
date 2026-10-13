# Decision
Deferred to Phase 06; native SQLite3 is the initial candidate.

## Context
Strict no-mutation and no-sidecar requirements need control over connection flags, query limits and WAL access.

## Options
Native SQLite3; audited Swift wrapper; omit unsafe live-database cases with clear error.

## Decision
No SQLite production code until feasibility is complete. Evaluate native API first; audit any wrapper. Read-only flags do not prove directory integrity; never blindly use immutable mode on live files.

## Consequences
Test locked writers, WAL/SHM permissions, corrupt databases, hostile identifiers, views/virtual tables and source hashes. Reject unsafe cases instead of returning silently stale data.
