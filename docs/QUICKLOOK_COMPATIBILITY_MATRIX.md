# Quick Look compatibility matrix

Native CI is verified at 38d0c7d; **all interactive runtime fields remain NOT_TESTED**. CI UTType/native harness results do not establish Finder routing, sandbox grants or thumbnail invocation. Use [REMOTE_MAC_TESTING.md](REMOTE_MAC_TESTING.md).

## Static candidate inventory — not observed runtime results
Imported declarations are hypotheses, not ownership or selection guarantees.

| Format | Extension / filename | Candidate declared UTType | Imported candidate |
|---|---|---|---|
| JSON | .json | public.json | No |
| JSONL | .jsonl | org.ndjson.ndjson | Yes |
| NDJSON | .ndjson | org.ndjson.ndjson | Yes |
| YAML | .yaml | public.yaml | Yes |
| YAML | .yml | public.yaml | Yes |
| TOML | .toml | org.toml.toml | Yes |
| XML | .xml | public.xml | No |
| CSV | .csv | public.comma-separated-values-text | No |
| TSV | .tsv | public.tab-separated-values-text | No |
| ENV | sample.env | com.example.peek.env | Yes |
| ENV dotfile | .env | com.example.peek.env (hypothesis only) | Yes |
| ENV variant | .env.local | No guaranteed suffix mapping | No additional mapping |
| Log | .log | com.example.peek.log | Yes |
| SQLite | .sqlite | public.sqlite3 | Yes |
| SQLite | .sqlite3 | public.sqlite3 | Yes |
| SQLite | .db | public.sqlite3 | Yes |
| Markdown | .md | net.daringfireball.markdown | Yes |

`.db` is ambiguous; `.env` may have no conventional suffix. Record hidden variants independently. Other apps can change type resolution.

## Per-environment results — copy this entire section for each OS/architecture
Keep minimum macOS 14 and latest-public results separate, with Apple Silicon/Intel and clean/update/competing-provider environments identified. Do not overwrite earlier evidence.

| Environment field | Observation |
|---|---|
| Date / exact commit / probe version | NOT_TESTED |
| OS version and build / architecture / hardware | NOT_TESTED |
| Xcode / Swift compiler versions | NOT_TESTED |
| Local signing / effective entitlements | NOT_TESTED |
| Install path / clean or update / other providers | NOT_TESTED |
| Integrity / timestamps / attributes / sidecars | NOT_TESTED |
| Restart / reboot / fresh-install observations | NOT_TESTED |
| Cold / warm startup measurements and method | NOT_TESTED |
| Evidence location / screenshot references | NOT_TESTED |

| Fixture | macOS version/build | Architecture | Resolved UTType before / after | Our preview invoked | Our thumbnail invoked | Read access | Result | Notes / evidence / repeats |
|---|---|---|---|---|---|---|---|---|
| sample.json | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.jsonl | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.ndjson | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.yaml | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.yml | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.toml | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.xml | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.csv | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.tsv | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.env | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| .env | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| .env.local | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.log | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.sqlite | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.sqlite3 | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.db | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |
| sample.md | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED | NOT_TESTED |

Add rows for empty.json, malformed.json, mislabeled.db and safe failure-case copies. Record the selected filename and fixture hash. Record preview and thumbnail independently as YES/NO/UNKNOWN with the exact marker or failure message; record read success only from the preview's bounded-read message. The thumbnail performs no read test. Include at least three preview attempts and separate observations after relaunch/reboot and diagnostic cache interventions.

## Allowed Result values
- **PASS**: our preview reliably invoked with successful read access; thumbnail outcome remains separately recorded. PASS is not a claim that every feature or OS is supported.
- **PARTIAL**: inconsistent preview, failed read despite invocation, thumbnail-only success or another incomplete outcome; explain exactly which component worked.
- **NATIVE_HANDLER_WINS**: evidence identifies Apple's provider instead of ours; lack of our marker alone does not establish provider identity.
- **FAIL**: attempted test fails (no usable result, crash/error, or other-provider outcome); name known/unknown provider and failure in notes.
- **NOT_TESTED**: no observation yet.
- **BLOCKED**: environment/signing/install prerequisite prevents a valid routing test; record the blocker.

## Decision summary
Reliable useful families: **NOT_TESTED**, not zero. GO / PARTIAL GO / NO-GO decision: **pending**. Prioritize YAML, TOML, CSV/TSV, JSONL/NDJSON, ENV, LOG and SQLite; approximately 6–7 reliable families support Quick Look-first. Aliases do not add families, thumbnail-only success does not count as preview coverage, and JSON/Markdown losses alone do not decide the outcome. Finalize [ADR-001](ADR/ADR-001-QUICKLOOK-STRATEGY.md) only from recorded evidence before completing Phase 01.
