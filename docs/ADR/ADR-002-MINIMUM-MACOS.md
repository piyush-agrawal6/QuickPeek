# Decision
Provisional minimum macOS 14.0.

## Context
A modern native Swift 6 utility needs a bounded support matrix; the user did not specify a minimum. Deployment target and compiler version are separate choices.

## Options
Older macOS with more compatibility work; macOS 14 baseline; latest-only support with a smaller market.

## Decision
Use 14.0 for the probe and planning, with a Swift 6-capable Xcode. Confirm all chosen APIs, actual Finder behavior and target architecture support on a Mac before finalizing. Record latest stable macOS at test time instead of assuming a current version.

## Consequences
Minimum-OS and latest-OS manual tests are required. No published compatibility promise until they pass. If tooling drops Intel/minimum support, document a deliberate product decision rather than silently changing it.
