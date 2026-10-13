# Phase 11 — Settings and Preferences

## Goal
Add a small predictable preference system shared where required.

## Dependencies
Phase 10. All required earlier gates must pass before production work starts.

## Technical Decisions
Start with local preferences; add App Group only with a documented need.

## Tasks
- [ ] Define typed preference defaults and migration policy
- [ ] Implement System/Light/Dark appearance
- [ ] Implement code font size and Command plus/minus/zero shortcuts
- [ ] Add CSV header inference and bounded row-limit preferences
- [ ] Add large-file policy explanation and bounded user choices
- [ ] Evaluate App Group only for preferences needed inside extensions
- [ ] Handle corrupt or missing preference values safely
- [ ] Avoid storing recent paths or contents without a concrete feature requirement

## Testing Requirements
- [ ] Unit test defaults, value clamping and migration
- [ ] UI test setting changes and reset behavior
- [ ] Verify extension preference consistency after relaunch if App Group is used
- [ ] Test font scaling with accessibility and long content

## Acceptance Criteria
Preferences persist correctly, remain within resource limits and do not collect file contents or unnecessary history.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Shared container entitlement complexity and settings that bypass safe limits.

## Deliverables
- ProjectPeekApp/Settings/
- shared preference model
- preference tests

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
