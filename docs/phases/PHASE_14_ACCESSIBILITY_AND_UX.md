# Phase 14 — Accessibility and UX

## Goal
Make inspection usable with VoiceOver, keyboard and varied display settings.

## Dependencies
Phase 10, Phase 11, Phase 12, Phase 13. All required earlier gates must pass before production work starts.

## Technical Decisions
Native controls preferred; color is never the only signal.

## Tasks
- [ ] Audit VoiceOver labels, reading order and type/error descriptions
- [ ] Implement tree arrow navigation and meaningful table keyboard navigation
- [ ] Verify Command F, C, plus, minus and zero where applicable
- [ ] Provide visible focus and restore focus after mode changes
- [ ] Check light/dark contrast and non-color error/severity signals
- [ ] Test larger fonts, Reduce Motion and increased contrast
- [ ] Review empty/error/purchase states for actionable plain language
- [ ] Test Retina and external monitors with narrow windows and long values

## Testing Requirements
- [ ] Perform full keyboard-only and VoiceOver sessions in app and Finder previews
- [ ] Use Accessibility Inspector and record findings
- [ ] Test display scaling and appearance changes while previewing
- [ ] Recheck critical flows after fixing accessibility issues

## Acceptance Criteria
Critical flows require no mouse; controls have meaningful labels and focus; no high-severity accessibility defect remains.
The phase cannot be marked complete until its applicable build, tests, no-blocker, documentation and manual-acceptance gates all pass. Inapplicable gates require an explicit rationale.

## Risks
Virtualization may hide accessibility nodes and Quick Look has host-specific focus behavior.

## Deliverables
- docs/ACCESSIBILITY_QA_CHECKLIST.md
- accessibility fixes
- evidence in QA records

## Completion Summary
Not completed. Fill with verified outcomes and evidence only after acceptance.

## Status
Not Started
