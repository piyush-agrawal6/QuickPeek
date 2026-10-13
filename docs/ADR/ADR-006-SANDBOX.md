# Decision
Sandboxed App Store-first MVP with least privilege.

## Context
File selection, Finder-provided URLs and possible sibling SQLite resources have different access lifetimes.

## Options
Sandboxed host/extensions; broad unsandboxed direct version; unsafe workarounds.

## Decision
POC requires app-sandbox only. Production host adds user-selected read-only access when Open/drop is implemented. App Groups and bookmarks require a concrete shared-state or persistence need. No broad filesystem or network permissions for previews.

## Consequences
Document each entitlement and test actual signed bundles. If source safety cannot be guaranteed inside sandbox, show a limitation; do not bypass the sandbox.
