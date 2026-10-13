# Sandbox and entitlements

| Capability | POC state | Purpose | Privacy implications / verification |
|---|---|---|---|
| com.apple.security.app-sandbox | YES, host and both extensions | Constrain access | Verify final signed entitlements and real Finder URL access. |
| com.apple.security.files.user-selected.read-only | Absent | Planned when production host Open/drop is implemented | Explicit user selection only, no editing; balance security scopes. |
| App Groups | Absent | Evaluate later for preferences and verified entitlement state | Shared container must never hold file contents or ENV secrets by default. |
| Security-scoped bookmarks | Not implemented | Only if persistent access is needed | Avoid persisting paths/access unnecessarily; handle revocation. |
| Network client/server | Absent | No preview feature needs network | Markdown must not auto-fetch; StoreKit behavior tested separately. |
| Broad disk access / temporary exceptions | Absent | Not justified | Do not add to work around failed sandbox tests. |

The host only displays instructions, so it does not need a file entitlement yet. The preview receives a system-provided URL; whether that access succeeds must be measured. The fixture/type scripts are development tools, not sandboxed product code. SQLite sibling WAL/SHM access remains an unresolved production design test. Signing credentials and overrides stay outside Git.
