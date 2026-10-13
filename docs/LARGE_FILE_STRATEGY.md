# Large-file strategy

Status: planned; no production renderer or benchmark results yet.

| Input | Provisional behavior | Limits to validate |
|---|---|---|
| Text under 5 MiB | Background preparation; bounded normal rendering | Byte/node/depth/field limits still apply. |
| Text 5–50 MiB | Background preparation with cancellation and progress where useful | Do not assume every format can safely fully parse. |
| Text above 50 MiB | Window/stream or partial source with clear notice | Never eager full-row arrays or giant strings. |
| JSON/YAML/TOML/XML | Conservative full-parse cap, depth/node budgets and source fallback | Alias/entity expansion, giant scalars and numbers. |
| CSV/TSV | Incremental parser, offsets, virtual rows and bounded cache | Multiline and chunk-boundary correctness; scope sort/search. |
| JSONL | Independent records and bounded line access | Huge line limit; per-line error recovery. |
| Logs | Windowed byte offsets and bounded index | UTF-8 splits, tail cancellation, near-zero idle CPU. |
| SQLite | Requested row pages and query interruption | No eager row counts, bounded BLOBs, no source sidecars. |

Tune thresholds with actual Quick Look process memory/latency measurements. Initial goals are small structured preview under 300 ms where practical and typical CSV content under 1 second; define fixture/hardware precisely. Extensions may need lower budgets than the app. No production budget is validated by the POC's 32-byte access read.
