# Release checklist

Not started. This repository is a pre-validation POC, not release-ready.

## Code
- [ ] Clean Release build from tagged commit.
- [ ] Warnings resolved or justified; tests pass.
- [ ] No critical/high defects; all applicable phase acceptance gates pass.
- [ ] Dependency licenses, pins and notices reviewed.

## Privacy and safety
- [ ] No accidental telemetry or network content loads.
- [ ] No secrets, content, rows or full paths logged.
- [ ] Source integrity/no-sidecar tests pass, including SQLite WAL cases.
- [ ] Signed entitlements are minimal; privacy policy/App Privacy answers are accurate.

## Store
- [ ] Purchase works with verified transactions.
- [ ] Restore, pending, cancellation, refund/revocation and offline behavior pass.
- [ ] Lifetime product, localized price and usable free limits configured.

## UI
- [ ] Dark mode and light mode.
- [ ] Accessibility and keyboard pass complete.
- [ ] Retina/external monitors, useful errors and onboarding verified.

## Quick Look
- [ ] Extension works after install, update and reboot.
- [ ] Supported types verified on every supported OS.
- [ ] Thumbnails verified independently.
- [ ] Advertised formats reflect actual routing evidence.

## Performance
- [ ] Large CSV and multiline/huge-field edge cases.
- [ ] Large logs and huge lines.
- [ ] Large SQLite and corrupted databases.
- [ ] Malformed/deep structured files, startup, bounded memory and near-zero idle CPU.

## Distribution
- [ ] Final name/domain/trademark review and owned bundle ID.
- [ ] Version, build number, category, subtitle, description and keywords finalized.
- [ ] Icon and real UI screenshots complete using synthetic data.
- [ ] Signed and archived; nested signatures/entitlements verified.
- [ ] Notarized/stapled where required for an explicitly chosen direct channel; otherwise rationale recorded.
- [ ] App Store validation and review requirements pass.
- [ ] TestFlight/internal or equivalent release candidate testing complete.
- [ ] Support/privacy/marketing/changelog pages work.
- [ ] Archive hash, tag, release notes and post-launch verification recorded.
