# Project Peek master plan

## Project summary
Working codename for a commercial native macOS developer/data file inspector. Press Space in Finder for supported formats, and use the standalone inspector for explicit inspection. The name is temporary. This repository begins with a technical routing experiment, not a production application.

## Product goals
Fast, lightweight, offline, private, read-only inspection of JSON, JSONL/NDJSON, YAML/YML, TOML, XML, CSV/TSV, SQLite/sqlite3/db, ENV, LOG and Markdown. Ship native SwiftUI/AppKit UI, accessible navigation, robust errors, bounded memory, and useful free features. Lifetime StoreKit 2 Pro purchase, initially targeting $9.99; no subscriptions.

## Non-goals
No editing, auto-save, metadata rewriting, user-side sidecars, formulas, database mutations, IDE, Finder replacement, AI, login, cloud backend, file automation, format conversion or V2 features. No early branding/marketing work. No separate unsandboxed MVP.

## Target users
Developers, DevOps/data/QA engineers, technical founders and analysts, and Mac power users worldwide; English-first launch with localization-ready source.

## Supported macOS versions
Provisional minimum macOS 14.0, Swift 6-capable Xcode required. This is a planning baseline, not a compatibility claim. Test minimum and latest public macOS at execution time, recording exact versions/builds; intermediate version when practical. Apple Silicon and Intel require explicit evidence. See ADR-002.

## Architecture summary
Three disposable POC targets first: host, view-based Quick Look preview, and content-free thumbnail. After Gate 01, production app UI and extensions share one renderer core with file detection, bounded parsing, metadata, cancellation and typed errors. Purchase policy is centralized and cannot block preview startup on the network. Renderer models are separate from AppKit/SwiftUI presentation.

## Dependencies
POC: Apple SDK frameworks only. Node is an optional development-only project generator; the generated Xcode project is committed. Python 3 standard library generates synthetic fixtures. No third-party runtime package selected. Future YAML/TOML/highlighting packages require maintenance, license, Swift/OS, telemetry and size audits recorded in DEPENDENCIES.md.

## Main risks
The current Windows host cannot compile Apple frameworks or run Finder; no signing identity or owned bundle namespace has been supplied. Production work must not bypass unresolved Phase 01.

## Quick Look technical risk
UTType declarations do not prove Finder selects our extension. Resolve actual type before and after installation, inspect visible provider markers and retest across OSes/installs/reboots. Do not count YAML/YML or SQLite suffix aliases as separate strategic wins. Approximately 6–7 useful format families plus strategic coverage are required for Quick Look-first; otherwise adopt Inspector positioning. Pending evidence is neither Go nor No-Go.

## Sandbox risks
Extensions receive file-specific access; sibling WAL/SHM, external resources and persistent bookmarks need testing. Use minimal entitlements. Avoid broad access or undocumented handler overrides. App Groups require demonstrated need.

## Data-loss risks
User inputs are strictly read-only. Assert byte hashes and absence of sidecars; do not auto-save or normalize data. SQLite read-only flags alone are not proof of no-sidecar behavior. Generated fixtures are the only files intentionally created/modified by fixture tools.

## Performance risks
Deep trees, enormous fields, multiline CSV, huge logs and database counts can exhaust memory or block UI. Enforce budgets, windowing, virtualization, background work and cancellation. Targets: small structured first preview under 300 ms where practical; typical CSV first content under 1 second. These are unmeasured goals.

## App Store risks
Sandbox, extension signing, IAP verification/restore, privacy disclosures and current submission rules require Mac and Apple account validation. Product identity, legal/support URLs and final pricing remain release prerequisites.

## Phase list
Progress is completed primary task checkboxes / primary tasks, rounded to the nearest percent. It is not an acceptance pass. Testing checkboxes and all acceptance criteria must also pass before Complete.

Phase 01 readiness: **CODE_COMPLETE** for Windows-local planning and CI configuration; **CI_PENDING** for the first real Codemagic compile/tests; **REMOTE_MAC_PENDING** for signed Finder validation. These are readiness markers, not replacements for the phase's Blocked status or claims that the production application is code-complete. Production renderers remain blocked and unstarted. See [CI audit and troubleshooting](CI.md).

| Phase | Name | Dependency | Status | Progress | Major deliverables |
|---|---|---|---|---:|---|
| 00 | [Project Discovery](phases/PHASE_00_PROJECT_DISCOVERY.md) | None | Complete | 100% | docs/MASTER_PLAN.md; docs/CURRENT_STATE.md |
| 01 | [Technical Validation](phases/PHASE_01_TECHNICAL_VALIDATION.md) | 00 | Blocked | 40% | PeekProbe.xcodeproj; POC/ |
| 02 | [Project Foundation](phases/PHASE_02_PROJECT_FOUNDATION.md) | 01 | Not Started | 0% | ProjectPeekApp/; ProjectPeekCore/ |
| 03 | [Shared Renderer Core](phases/PHASE_03_SHARED_RENDERER_CORE.md) | 02 | Not Started | 0% | ProjectPeekCore/Models/; FileDetection/ |
| 04 | [Structured Text Formats](phases/PHASE_04_STRUCTURED_TEXT_FORMATS.md) | 03 | Not Started | 0% | ProjectPeekCore/Parsers/; JSONRenderer |
| 05 | [CSV TSV Viewer](phases/PHASE_05_CSV_TSV_VIEWER.md) | 03, 04 | Not Started | 0% | DelimitedParser; CSVRenderer |
| 06 | [SQLite Viewer](phases/PHASE_06_SQLITE_VIEWER.md) | 03, 05 | Not Started | 0% | SQLiteRenderer; read-only connection wrapper |
| 07 | [Log and Markdown](phases/PHASE_07_LOG_AND_MARKDOWN.md) | 03, 04, 06 | Not Started | 0% | JSONLRenderer; LogRenderer |
| 08 | [Quick Look Extension](phases/PHASE_08_QUICKLOOK_EXTENSION.md) | 01, 04, 05, 06, 07 | Not Started | 0% | QuickLookExtension/; verified type declarations |
| 09 | [Thumbnail Extension](phases/PHASE_09_THUMBNAIL_EXTENSION.md) | 08 | Not Started | 0% | ThumbnailExtension/; thumbnail tests |
| 10 | [Main Application UI](phases/PHASE_10_MAIN_APPLICATION_UI.md) | 04, 05, 06, 07, 08, 09 | Not Started | 0% | ProjectPeekApp/App/; Views/ |
| 11 | [Settings and Preferences](phases/PHASE_11_SETTINGS_AND_PREFERENCES.md) | 10 | Not Started | 0% | ProjectPeekApp/Settings/; shared preference model |
| 12 | [Free Pro Monetization](phases/PHASE_12_FREE_PRO_MONETIZATION.md) | 10, 11 | Not Started | 0% | ProjectPeekApp/Store/; shared entitlement policy |
| 13 | [Performance and Large Files](phases/PHASE_13_PERFORMANCE_AND_LARGE_FILES.md) | 04, 05, 06, 07, 08, 09, 12 | Not Started | 0% | docs/LARGE_FILE_STRATEGY.md; docs/PERFORMANCE_BENCHMARKS.md |
| 14 | [Accessibility and UX](phases/PHASE_14_ACCESSIBILITY_AND_UX.md) | 10, 11, 12, 13 | Not Started | 0% | docs/ACCESSIBILITY_QA_CHECKLIST.md; accessibility fixes |
| 15 | [Security and Privacy](phases/PHASE_15_SECURITY_AND_PRIVACY.md) | 04, 05, 06, 07, 08, 09, 12, 13 | Not Started | 0% | docs/PRIVACY_ARCHITECTURE.md; docs/SANDBOX_AND_ENTITLEMENTS.md |
| 16 | [Testing and QA](phases/PHASE_16_TESTING_AND_QA.md) | 08, 09, 10, 11, 12, 13, 14, 15 | Not Started | 0% | docs/MANUAL_QA_CHECKLIST.md; docs/KNOWN_ISSUES.md |
| 17 | [Packaging Signing Notarization](phases/PHASE_17_PACKAGING_SIGNING_NOTARIZATION.md) | 16 | Not Started | 0% | docs/RELEASE_CHECKLIST.md; packaging runbook |
| 18 | [App Store Preparation](phases/PHASE_18_APP_STORE_PREPARATION.md) | 16, 17 | Not Started | 0% | App Store metadata drafts; screenshot assets |
| 19 | [Website and Launch Assets](phases/PHASE_19_WEBSITE_AND_LAUNCH_ASSETS.md) | 18 | Not Started | 0% | Marketing site and launch assets; legal/support pages |
| 20 | [Release and Post Launch](phases/PHASE_20_RELEASE_AND_POST_LAUNCH.md) | 17, 18, 19 | Not Started | 0% | Released app; CHANGELOG.md |

## Working protocol and quality gates
Before work read this file and the active phase, verify dependencies, then mark In Progress. Update checkboxes only with evidence. Before advancing require A build, B tests, C no blockers, D docs updated, E manual acceptance. Discovery has no compiled-code gate. Mark Blocked with reason, options and recommended action when external prerequisites are absent. Use Not Started, In Progress, Blocked, Review Required or Complete only. Make stable milestone commits; never commit secrets, ENV fixtures, credentials or build artifacts.

## Navigation
- [Current state](CURRENT_STATE.md)
- [Decisions](DECISIONS.md) and [strategy ADR](ADR/ADR-001-QUICKLOOK-STRATEGY.md)
- [Compatibility matrix](QUICKLOOK_COMPATIBILITY_MATRIX.md) and [test protocol](QUICKLOOK_TEST_PLAN.md)
- [Dependencies](DEPENDENCIES.md), [roadmap](ROADMAP.md), [known issues](KNOWN_ISSUES.md)
- [Manual QA](MANUAL_QA_CHECKLIST.md), [accessibility](ACCESSIBILITY_QA_CHECKLIST.md), [release checklist](RELEASE_CHECKLIST.md)
