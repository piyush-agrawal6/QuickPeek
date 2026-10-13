# Phase 10 — Main Application UI

## Goal
Deliver a compact native standalone inspector and understandable onboarding.

## Dependencies
Phase 04, Phase 05, Phase 06, Phase 07, Phase 08, Phase 09. All required earlier gates must pass before production work starts.

## Technical Decisions
The standalone inspector ships in either strategy; extension routing only changes product positioning.

## Tasks
- [ ] Build Home, Supported Formats, Appearance, Quick Look, Large Files, License and About navigation
- [ ] Implement drag/drop, Open panel and Finder Open With using the shared renderer
- [ ] Balance security scopes and decide whether persistent bookmarks are actually necessary
- [ ] Create useful empty, loading, error and unsupported states
- [ ] Provide synthetic JSON, YAML, CSV and SQLite samples
- [ ] Add first-run welcome and instructions to select a sample then press Space
- [ ] Display only verified routing coverage and honest unknown extension status
- [ ] Support multiple inspection requests without stale state
- [ ] Apply native typography, restrained layout, light/dark appearance and compact windows

## Testing Requirements
- [ ] UI test launch, open, drop, sample inspection, modes and search
- [ ] Test cancelled panels, revoked permissions and inaccessible URLs
- [ ] Manually test onboarding and Open With from Finder
- [ ] Compare app and Quick Look rendered models for the same fixture

## Acceptance Criteria
Standalone inspection is useful offline without purchase or account; all input entry points are read-only and share core behavior.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Security scope leaks, unsupported document associations and confusing preview-versus-inspector claims.

## Deliverables
- ProjectPeekApp/App/
- Views/
- Onboarding/
- Inspector/
- UI tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
