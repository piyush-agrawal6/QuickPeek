# Performance benchmarks

No macOS runtime measurement has been collected. Do not substitute estimated numbers.

| Commit | Fixture/hash/bytes | Hardware/OS/Xcode | Cold/warm | Runs | First content p50/p95 | Parse time | Peak memory | Scroll/idle CPU | Result |
|---|---|---|---|---|---|---|---|---|---|
| Pending | Pending | Pending | Pending | Pending | Unmeasured | Unmeasured | Unmeasured | Unmeasured | Not run |

Protocol: generate reproducible synthetic workloads; record exact tools/hardware; separate cold and warm cache; use at least 10 measured repetitions after setup; capture Time Profiler/Allocations/Memory Graph or equivalent; include cancellation and rapid selection changes. Keep raw evidence under ignored artifacts/ and link sanitized summaries here. Compare against the prior release under the same conditions. Report targets and regressions, including extension termination, rather than assuming an optimization worked.
