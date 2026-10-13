# Manual QA checklist

All unchecked; source creation is not manual verification.

## Environment and installation
- [ ] Minimum macOS version/build recorded and tested.
- [ ] Latest public macOS version/build recorded and tested.
- [ ] Intermediate macOS tested where practical; absence recorded.
- [ ] Apple Silicon and Intel coverage recorded; unsupported/unavailable combinations explicitly resolved.
- [ ] Fresh installation, upgrade, relaunch and reboot pass.
- [ ] Signed archive behavior matches development build.

## Finder and inspector
- [ ] Every advertised preview type has repeated Finder Space evidence.
- [ ] Thumbnail routing is verified separately and cache state recorded.
- [ ] Competing providers and native fallback do not produce false support claims.
- [ ] Drag/drop, Open With, panel and bundled samples work.
- [ ] Search, copy, mode switching and metadata behave consistently.
- [ ] Empty, unsupported, malformed, invalid encoding, denied and oversized states are useful.
- [ ] Rapid selection changes cancel old preparation and avoid stale content.

## Safety and reliability
- [ ] Source hashes, directory entries and metadata remain unchanged.
- [ ] SQLite/WAL/SHM never get altered or created beside sources.
- [ ] ENV values are hidden by default and absent from logs and thumbnails.
- [ ] XML external entities and Markdown script/network payloads are blocked.
- [ ] Large CSV/log/SQLite and deep structured files stay responsive and bounded.
- [ ] Offline, low storage and permission-revoked scenarios behave gracefully.
- [ ] Idle CPU and memory recovery pass benchmarks.

## Commerce and UI
- [ ] Free features provide usable value without an account/purchase.
- [ ] Purchase, pending, cancel, failure, refund/revocation and restore pass.
- [ ] Offline verified entitlements and extension access work without preview delay.
- [ ] Light/dark, Retina/external display and accessibility checklists pass.
- [ ] Support, privacy, version, format claims and localized prices are accurate.

Record date, commit, OS/hardware, steps, actual outcome and evidence for each test in the release report. Do not tick unavailable configurations as passed.
