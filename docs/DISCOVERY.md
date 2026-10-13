# Discovery — 2026-10-13

- Workspace: `C:\Users\agraw\OneDrive\Desktop\quick-peek`.
- Initial directory listing was empty, including hidden files. No existing Xcode project or architecture to preserve.
- Initial `git status --short` reported no repository. Git was initialized for this project.
- No applicable AGENTS.md was found in the workspace or inspected ancestor directories.
- Host is Windows/PowerShell. Git and Node are available. Swift and xcodebuild are absent. PATH Python resolves to inaccessible Windows Store aliases; a bundled Python runtime was later located and used successfully for five fixture/plist tests.
- No Mac, Apple developer team, certificate, provisioning profile or commercial bundle ID was supplied.
- Full user brief was reviewed, including formats, phases 00–20, read-only policy, no cloud/AI/subscriptions, and mandatory feasibility-first ordering.
- Brand, legal/support URLs and App Store identity remain undecided; these do not block the POC source preparation.

## Scope and first gate
Complete planning and prepare the smallest preview/thumbnail routing probe. Real Finder testing is a mandatory external prerequisite. Do not manufacture results or implement production parsers to fill time while this gate is blocked.

## Evidence boundaries
Source/configuration can be inspected on Windows. Swift compiler behavior, SDK availability, signing, sandbox access, Finder routing, thumbnail caching, performance and accessibility cannot be established here.

## Primary references reviewed
Apple describes preview controller entry points in [QLPreviewingController](https://developer.apple.com/documentation/quicklookui/qlpreviewingcontroller). The POC uses a view controller so it can later test native interaction.

Apple documents the thumbnail provider and supported-content-type declarations in [Providing thumbnails](https://developer.apple.com/documentation/quicklookthumbnailing/providing-thumbnails-of-your-custom-file-types). Thumbnail success needs a separate observation from preview success.

Apple distinguishes imported and exported types in [Defining file and data types](https://developer.apple.com/documentation/uniformtypeidentifiers/defining-file-and-data-types-for-your-app). Third-party formats are imported candidates, not claimed as proprietary exports. These API documents do not establish handler precedence on a specific Mac.
