# Dependencies

No third-party runtime packages are selected or linked.

## Apple SDK frameworks
Purpose: SwiftUI host, Foundation file access, UniformTypeIdentifiers metadata, AppKit/Quartz preview controller, QuickLookThumbnailing provider.
Version: selected by the installed Swift 6-capable Xcode; record exact build in Mac evidence.
License: Apple SDK terms.
Repository: [Apple developer documentation](https://developer.apple.com/documentation/).
Why selected: native platform integration without telemetry or additional binary packages.
Alternatives considered: legacy generators are not the chosen architecture; no Electron/WebKit renderer for the probe.

## Node.js — optional development tool only
Purpose: deterministic regeneration of Xcode project and static repository tests.
Version: Node 18 or later; exact local version in CURRENT_STATE.md test record.
License: MIT and bundled third-party notices; not shipped in the app.
Repository: [nodejs/node](https://github.com/nodejs/node).
Why selected: already available on this host; standard-library-only script.
Alternatives considered: XcodeGen adds a separate tool dependency; hand-editing repetitive target settings is error-prone.

## Python — development tool only
Purpose: synthetic text/SQLite fixtures and before/after hash checks.
Version: Python 3.9 or later with standard sqlite3 module; not shipped.
License: PSF; bundled SQLite is public domain.
Repository: [python/cpython](https://github.com/python/cpython).
Why selected: no package install needed for fixture databases or hashes.
Alternatives considered: separate sqlite3 CLI.

## Deferred package selection
Yams, a TOML parser, highlighting, Markdown parsing and SQLite wrapper choices are candidates only. Before adding any: verify recent maintenance and releases, exact pinned version, license/notices, Swift 6 and macOS 14 compatibility, transitive graph, size, telemetry/network behavior and adversarial-input limits. Record purpose/version/license/repository/reason/alternatives and test evidence. Native SQLite3 is the leading candidate, not an implemented decision.
