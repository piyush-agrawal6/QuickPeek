# Quick Look compatibility matrix

Last updated: 2026-10-13. **All runtime results are untested.** Prepared on Windows; no Mac build, Finder, sandbox or thumbnail result is available. Candidate IDs below come from the probe configuration and are not measured system UTTypes. Imported declarations are proposed fallback registrations, not ownership claims or guarantees of override.

## Format inventory

| Format | Extension / filename | Candidate declared UTType | Imported candidate | Observed UTType before / after | Custom preview | Apple/other renderer | Thumbnail | Sandbox read / metadata | Current macOS | Minimum macOS |
|---|---|---|---|---|---|---|---|---|---|---|
| JSON | .json | public.json | No | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| JSONL | .jsonl | org.ndjson.ndjson | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| NDJSON | .ndjson | org.ndjson.ndjson | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| YAML | .yaml | public.yaml | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| YAML | .yml | public.yaml | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| TOML | .toml | org.toml.toml | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| XML | .xml | public.xml | No | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| CSV | .csv | public.comma-separated-values-text | No | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| TSV | .tsv | public.tab-separated-values-text | No | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| ENV | sample.env | com.example.peek.env | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| ENV dotfile | .env | com.example.peek.env (hypothesis only) | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| ENV variant | .env.local | No guaranteed suffix mapping | No additional mapping | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| Log | .log | com.example.peek.log | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| SQLite | .sqlite | public.sqlite3 | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| SQLite | .sqlite3 | public.sqlite3 | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| SQLite | .db | public.sqlite3 | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |
| Markdown | .md | net.daringfireball.markdown | Yes | Untested | Untested | Untested | Untested | Untested | Untested | Untested |

`.db` is ambiguous; production detection must sniff safely rather than assume SQLite. A dotfile named `.env` may not have an `env` path extension. Record it independently. Existing exported declarations from other apps can change resolution.

## Per-run evidence record — duplicate for each environment
No runs yet. Record these fields for every suffix; do not overwrite prior OS results.

| Field | Value |
|---|---|
| Date, exact commit and probe version | Pending |
| macOS version/build, CPU, Xcode/Swift | Pending |
| Signing/team mode and effective entitlements | Pending |
| Install location, clean/update, competing providers | Pending |
| Filename and fixture SHA-256 | Pending |
| Resource UTType before/after; optional Spotlight type | Pending |
| Visible preview provider and repeated-attempt count | Pending |
| Visible thumbnail provider and cache state | Pending |
| Read access, byte metadata and errors | Pending |
| Restart/reboot/clean install results | Pending |
| Integrity verification and metadata comparison | Pending |
| Screenshot / evidence file references | Pending |

## Decision summary
Verified reliable families: **unknown**, not zero. Threshold: approximately 6–7 strategically useful format families, avoiding alias double-counting. Decision: **pending Mac validation**. Follow [test protocol](QUICKLOOK_TEST_PLAN.md) and [ADR-001](ADR/ADR-001-QUICKLOOK-STRATEGY.md). No production support claim can be made from this matrix yet.
