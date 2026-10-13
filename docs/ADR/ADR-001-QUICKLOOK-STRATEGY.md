# Decision
Pending — feasibility gate remains closed.

## Context
Product depends on Finder selecting our provider for enough useful formats. A Windows source preparation session cannot observe this. An unbuilt extension and an Info.plist entry are not evidence of routing success.

## Options
1. Quick Look-first with standalone inspector, if approximately 6–7 strategically useful format families repeatedly work.
2. Inspector-first with drag/drop, Open With and only proven Quick Look integrations, if routing coverage is insufficient. Optional Finder extension requires separate justification.
3. Wait for missing evidence rather than guessing either outcome.

## Decision
Choose option 3 for now. Do not start production phases 02–20. Execute the test plan and matrix on current/minimum macOS, review usefulness of winning formats, then explicitly choose option 1 or 2. `.yaml` and `.yml` are one family, as are three SQLite suffixes; aliases cannot inflate coverage.

## Consequences
Planning and the probe are prepared; actual build, sandbox behavior, routing and thumbnails remain unverified. No Quick Look support marketing is justified. The fallback inspector remains part of the planned product and is not abandoned.
