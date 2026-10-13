# Decision
Pending — remote Finder feasibility gate remains closed.

## Context
The native build and automated checks passed in GitHub run 38421045778 at 38d0c7d. This proves compilation, not Finder selection, installed sandbox access or thumbnail routing. Interactive runtime evidence remains NOT_TESTED.

## Options
1. GO: Quick Look-first plus standalone Inspector if approximately 6–7 strategically useful format families repeatedly invoke our preview with read access.
2. PARTIAL GO: selective Quick Look plus standalone Inspector when a valuable reliable subset works and native handlers win elsewhere.
3. NO-GO FOR QUICKLOOK-FIRST: Inspector-first while retaining useful proven Quick Look integrations if too few valuable families route reliably.
4. Wait for missing evidence rather than guessing an outcome.

## Decision
Option 4 remains active. Execute [remote Mac testing](../REMOTE_MAC_TESTING.md) and populate the [matrix](../QUICKLOOK_COMPATIBILITY_MATRIX.md), then finalize this ADR with the chosen option, exact environments, evidence and rationale. Prioritize YAML, TOML, CSV/TSV, JSONL/NDJSON, ENV, LOG and SQLite. Count aliases as one family; JSON or Markdown failure alone is not overall failure. Missing environments are not No-Go evidence.

## Consequences
CODE_COMPLETE = PASS / CI_VERIFIED = PASS / REMOTE_MAC_PENDING = YES. No routing support claim is justified yet. The final decision and applicable manual gates must pass before Phase 01 completes and Phase 02 starts. Production renderers remain unstarted.
