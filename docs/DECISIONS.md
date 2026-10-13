# Decisions

| ID | Decision | State | Rationale / follow-up |
|---|---|---|---|
| D-001 | Swift 6; SwiftUI host, AppKit preview, Apple Quick Look extensions | Accepted for POC | Native stack requested; no web wrapper. |
| D-002 | Minimum macOS 14.0 | Provisional | Validate on real macOS before promising support; ADR-002. |
| D-003 | Quick Look-first vs Inspector | Pending evidence | Windows cannot resolve Finder routing; ADR-001. |
| D-004 | No third-party runtime packages in POC | Accepted | Routing is independent of parser dependencies. |
| D-005 | Shared renderer core for app and extension | Planned | No duplicated parsers or purchase rules. |
| D-006 | Strictly read-only; no user-side sidecars | Accepted | Applies even to SQLite and error recovery. |
| D-007 | Sandbox-only MVP; minimal entitlements | Accepted | No network, broad disk access, App Group or persistent bookmarks in probe. |
| D-008 | StoreKit 2 lifetime non-consumable | Planned | No subscriptions; proposed $9.99 launch and $14.99 later. |
| D-009 | 5/50 MiB text thresholds | Provisional | Benchmark before product defaults; conservative structured-data caps. |
| D-010 | No analytics, crash service, backend or AI | Accepted | Offline local processing; no feature requires any. |
| D-011 | Central product configuration | Accepted | Config/Product.xcconfig owns branding/version/identity/URL settings. |
| D-012 | Disposable routing probe, not production UI | Accepted | Markers show provider selection without parsing or secret disclosure. |
| D-013 | Native Xcode project, deterministic optional Node generator | Accepted for POC | No XcodeGen dependency; generated project builds without Node on Mac. |

Technical type IDs in POC/formats.json are test hypotheses and stable identifiers, not product display strings. Replace the example namespace consistently during Phase 02; never export someone else's format to win routing. Website values in xcconfig must use safe xcconfig URL syntax (for example `https:/$()/example.com`) when populated; literal `//` starts a comment.
