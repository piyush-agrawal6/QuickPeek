# Phase 15 — Security and Privacy

## Goal
Verify untrusted-input boundaries, source integrity and accurate privacy claims.

## Dependencies
Phase 04, Phase 05, Phase 06, Phase 07, Phase 08, Phase 09, Phase 12, Phase 13. All required earlier gates must pass before production work starts.

## Technical Decisions
No analytics or third-party crash reporting at launch; no network entitlement for previewing.

## Tasks
- [ ] Threat-model malicious files, symlinks, resource exhaustion and changing sources
- [ ] Review XML entities, YAML aliases, Markdown scripts/resources and SQL identifier handling
- [ ] Verify SQLite read-only and no-sidecar behavior under WAL and locked writers
- [ ] Audit every entitlement and remove unjustified capabilities
- [ ] Audit logs, errors, crash context, caches and ENV reveal/copy behavior
- [ ] Check sandbox access on external drives, downloads and permission-revoked files
- [ ] Verify offline operation and zero required network requests during previews
- [ ] Inventory dependencies, licenses and vulnerabilities before release
- [ ] Draft privacy policy matching actual analytics and crash reporting behavior

## Testing Requirements
- [ ] Run adversarial parser fixtures and mutation-integrity checks
- [ ] Inspect final signed entitlements and app container output
- [ ] Use network inspection during all previews
- [ ] Search logs for synthetic secret canaries and fixture paths
- [ ] Review privacy claims against observed implementation

## Acceptance Criteria
No critical/high security issues; source bytes and directory contents stay unchanged; privacy statement matches observed behavior.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Indirect library telemetry, error descriptions containing paths, unsafe HTML and WAL sidecars.

## Deliverables
- docs/PRIVACY_ARCHITECTURE.md
- docs/SANDBOX_AND_ENTITLEMENTS.md
- security fixtures and audit

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
