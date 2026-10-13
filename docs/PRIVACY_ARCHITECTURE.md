# Privacy architecture

## Implemented in the probe source — platform verification pending
The preview requests metadata and reads at most 32 bytes locally to test access. It displays type, size and access outcome only, never contents or paths. The thumbnail draws a constant marker and does not read the file. No network code, analytics, crash reporter, account, backend or purchase SDK is present in the POC. All three targets request only App Sandbox. This source review is not a completed signed-binary audit.

## Production requirements
- Files and database rows stay on device; no content transmission or automatic remote Markdown assets.
- ENV values are masked by default, never logged, cached in shared state, or embedded in thumbnails/crash metadata.
- OSLog categories: app, quicklook, renderer, parser, storekit, performance. Record non-sensitive categories/timing only; avoid filenames and never log full paths, rows, content or ENV values.
- Cache only bounded derived data in app containers; define expiry and exclude secrets. No source-side sidecars.
- Apple handles App Store purchases; verify entitlements locally and support offline previews without waiting for the network.
- No analytics or external crash reporting at launch. Re-review policy if either is later proposed.
- Do not claim signed-binary privacy verification, zero observed network traffic or safe SQLite behavior until Phase 15 evidence exists.

## Review evidence required
Network inspection while previewing; log canary checks; entitlement inspection; cache/container audit; source hash and directory-entry comparisons; dependency audit; actual App Privacy and privacy-policy cross-check.
