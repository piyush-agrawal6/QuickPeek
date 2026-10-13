# Accessibility QA checklist

Status: not run. Requires production UI on macOS.

- [ ] VoiceOver reads app, modes, data types, empty/error and purchase states meaningfully.
- [ ] Tree nodes expose names, values and expansion state; arrows navigate correctly.
- [ ] Tables expose headers, cells and row/column position with virtualized content.
- [ ] Entire inspect/search/copy/mode/restore flow works keyboard-only.
- [ ] Command F/C/plus/minus/zero behave where applicable.
- [ ] Focus is visible and returns sensibly after dialogs, search and mode changes.
- [ ] Error and log severity information does not rely on color alone.
- [ ] Light/dark, increased contrast, larger fonts and Reduce Motion work.
- [ ] Retina/external monitor and narrow windows do not clip necessary controls.
- [ ] Actual Finder Quick Look focus and accessibility pass independently of the app.
- [ ] Accessibility Inspector findings are recorded and high-severity issues resolved.

Attach exact build, OS, device, tester, steps and evidence to the release QA report.
