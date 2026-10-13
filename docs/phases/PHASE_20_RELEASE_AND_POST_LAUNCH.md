# Phase 20 — Release and Post Launch

## Goal
Ship the validated release and establish maintenance without scope creep.

## Dependencies
Phase 17, Phase 18, Phase 19. All required earlier gates must pass before production work starts.

## Technical Decisions
No V2 mutations, conversions or automation are part of V1.

## Tasks
- [ ] Review all release checklist items and obtain final commercial release readiness decision
- [ ] Submit validated app and IAP to App Review with review notes
- [ ] Track review feedback and retest changes before resubmission
- [ ] Release approved build with support/privacy/marketing pages available
- [ ] Verify store install, purchase, restore and Finder routing on the public build
- [ ] Record released version, archive hash, date and changelog
- [ ] Triage support and crashes without requesting sensitive user content
- [ ] Schedule manual compatibility checks for new macOS releases
- [ ] Keep V1.1/V1.2/V2 roadmap separate; prioritize reliability fixes first

## Testing Requirements
- [ ] Run post-release clean-install and purchase smoke tests
- [ ] Verify public URLs, version and supported-format claims
- [ ] Practice removal/reinstall and recovery instructions
- [ ] Review initial support issues against release acceptance evidence

## Acceptance Criteria
Public build and purchase path work, support is operational, release artifacts are recorded and no unresolved release blocker remains.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Store rejection, OS regressions, support gaps and scope creep after launch.

## Deliverables
- Released app
- CHANGELOG.md
- release record
- post-launch issue triage and roadmap

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
