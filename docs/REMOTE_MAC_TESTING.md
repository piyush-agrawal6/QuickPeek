# Remote Mac Finder validation

Status: **CODE_COMPLETE = PASS / CI_VERIFIED = PASS / REMOTE_MAC_PENDING = YES**. The [green native CI run](https://github.com/piyush-agrawal6/QuickPeek/actions/runs/38421045778) proves compilation and automated checks, not Finder routing. This guide is the remaining Phase 01 experiment. Use only synthetic fixtures; production renderers remain blocked.

## 1. Prepare a clean remote Mac

Use an interactive desktop session with Finder, preferably a dedicated test user without other Quick Look providers. Keep the remote provider's reconnect/recovery instructions available before rebooting. Install full Xcode 26.x or newer with a Swift 6.2+ compiler, Python 3 and Node.js (for repository checks). Open Xcode once, finish its initial setup, and choose that Xcode in Settings > Locations > Command Line Tools. Command Line Tools alone are insufficient.

The build Mac must support the selected Xcode. Consult [Apple's Xcode system requirements](https://developer.apple.com/xcode/system-requirements): Xcode 26 cannot run on the deployment minimum macOS 14. Build on a supported newer Mac; test minimum macOS 14 separately using a compatible locally signed build. Keep Apple Silicon and Intel coverage separate. A missing OS/architecture environment stays BLOCKED or NOT_TESTED; never raise the deployment target or exclude Intel to make this experiment pass. When transferring a test app, preserve its bundle/signatures, verify them again and record any launch-policy failure before interpreting routing.

Open Terminal and run:

```sh
git clone https://github.com/piyush-agrawal6/QuickPeek.git
cd QuickPeek
git status
git rev-parse HEAD
mkdir -p artifacts/remote-mac
sw_vers
uname -m
xcodebuild -version
swift --version
xcodebuild -list -project PeekProbe.xcodeproj
node --test Tests/Repository/*.test.mjs
python3 Tests/Repository/fixtures_test.py
```

Record date, commit, exact macOS version/build, architecture, Xcode/Swift versions, test user, competing providers and installation state in a new per-environment matrix record. Commands below assume this repository directory and the same Terminal session. Evidence can be saved under ignored `artifacts/remote-mac`; attach selected synthetic screenshots/logs to the findings before those local files are lost.

## 2. Capture the baseline before building or registering PeekProbe

```sh
python3 scripts/generate-fixtures.py
swift scripts/probe-types.swift Tests/Fixtures/Generated > artifacts/remote-mac/types-before.txt
open Tests/Fixtures/Generated
```

In Finder, inspect every matrix fixture with Space and note the native/other preview and thumbnail before installing the app. Command-Shift-period reveals `.env` and `.env.local`. Record the actual resolved resource UTType from the probe, separately from the suffix-derived candidate. Spotlight metadata, if collected, is supplementary and may be stale. If PeekProbe was already registered, label this an update run; obtain a clean-user baseline separately. Do not regenerate fixtures after testing until integrity has been checked.

## 3. Open Xcode and configure local signing

```sh
open -a Xcode PeekProbe.xcodeproj
```

Select scheme **PeekProbe** in the toolbar and destination **My Mac**. Run the **PeekProbe host target**, not an extension executable. Product > Scheme > Edit Scheme > Run > Info must use **Debug**. The shared host scheme builds and embeds **PeekPreview** and **PeekThumbnail** automatically.

For local testing use **Sign to Run Locally**, Xcode's ad hoc signing mode. It needs no production certificate, provisioning profile, paid developer team or App Store submission. It is different from the unsigned CI override. Apple describes this mode in [TN3127](https://developer.apple.com/documentation/technotes/tn3127-inside-code-signing-requirements). Local signing does not guarantee that every remote host's policy will allow extension loading; record policy failures as BLOCKED rather than altering system security.

In the project navigator select the blue PeekProbe project, then each of the three targets in turn. Under Signing & Capabilities select Debug, disable Automatically manage signing where necessary, choose **Sign to Run Locally** as Signing Certificate and no team. If that control is not exposed, use Build Settings > All, search Code Signing Identity and set Debug to Sign to Run Locally (`-`), and Code Sign Style to Manual. Apply consistently to host and both extensions; preserve sandbox entitlements. Do not use `CODE_SIGNING_ALLOWED=NO` for this runtime build. These GUI signing edits are local test setup: inspect `git diff` and do not commit machine-specific project changes.

Alternatively, the following command applies the same local-signing overrides to all targets without changing tracked configuration:

```sh
xcodebuild -project PeekProbe.xcodeproj -scheme PeekProbe \
  -configuration Debug -destination 'platform=macOS' \
  -derivedDataPath build/RemoteMacData \
  CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=- \
  CODE_SIGNING_ALLOWED=YES DEVELOPMENT_TEAM= build
```

Stop on a build/signing error and save the first error and surrounding log. Do not add provisioning-update flags or use the unsigned CI ZIP as an installed runtime test app.

## 4. Build, launch and inspect the host

With GUI signing configured, Product > Build (Command-B) builds all three targets. Product > Run (Command-R) launches the host; confirm a PeekProbe instruction window appears. The host is a routing probe, not a file viewer. Its launch alone does not establish extension invocation.

Xcode's usual output is `~/Library/Developer/Xcode/DerivedData/PeekProbe-<suffix>/Build/Products/Debug/PeekProbe.app`. In the Products group, right-click PeekProbe.app > Show in Finder to locate the actual product. The command above instead uses `build/RemoteMacData/Build/Products/Debug/PeekProbe.app`; launch that build with:

```sh
open build/RemoteMacData/Build/Products/Debug/PeekProbe.app
```

Quit the running host before installing a stable test copy. In Finder copy the selected built app into the test user's `~/Applications` folder, then launch that copy once. For the command-line build only, these commands create the folder and refuse to overwrite an existing app:

```sh
mkdir -p "$HOME/Applications"
if [ -e "$HOME/Applications/PeekProbe.app" ]; then
  printf '%s\n' 'STOP: inspect the existing test app and replace it intentionally in Finder.'
else
  ditto build/RemoteMacData/Build/Products/Debug/PeekProbe.app "$HOME/Applications/PeekProbe.app"
  open "$HOME/Applications/PeekProbe.app"
fi
```

If replacing a previous test app, quit it, verify its location and replace only that known test copy in Finder. Record clean install versus update. Multiple registered copies can confuse diagnosis; record which path is selected instead of assuming the newest build won.

Set the installed app path and inspect both extensions:

```sh
peek_app="$HOME/Applications/PeekProbe.app"
ls -ld "$peek_app/Contents/PlugIns/PeekPreview.appex"
ls -ld "$peek_app/Contents/PlugIns/PeekThumbnail.appex"
for peek_bundle in "$peek_app" "$peek_app/Contents/PlugIns/PeekPreview.appex" "$peek_app/Contents/PlugIns/PeekThumbnail.appex"; do
  /usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$peek_bundle/Contents/Info.plist"
  codesign --verify --strict --verbose=2 "$peek_bundle" || break
  codesign -dv --verbose=4 "$peek_bundle"
  codesign -d --entitlements :- "$peek_bundle"
done
```

Expect IDs `com.example.peek`, `com.example.peek.preview`, `com.example.peek.thumbnail` unless deliberately overridden. Expect valid local/ad hoc signatures and `com.apple.security.app-sandbox = true` for all three. Stop and investigate any verification error. Confirm the processed extension Info.plists have `NSExtensionPointIdentifier` values `com.apple.quicklook.preview` and `com.apple.quicklook.thumbnail`, with principal classes `PeekPreview.PreviewViewController` and `PeekThumbnail.ThumbnailProvider` inside their `NSExtension` dictionaries.

Before transferring to a different architecture, inspect the actual binary slices; a Debug build for My Mac may contain only the build Mac's architecture:

```sh
lipo -archs "$peek_app/Contents/MacOS/PeekProbe"
lipo -archs "$peek_app/Contents/PlugIns/PeekPreview.appex/Contents/MacOS/PeekPreview"
lipo -archs "$peek_app/Contents/PlugIns/PeekThumbnail.appex/Contents/MacOS/PeekThumbnail"
```

If the required slice is absent, rebuild with the same local-signing command plus `ONLY_ACTIVE_ARCH=NO ARCHS='arm64 x86_64'`, inspect all three binaries and signatures again, and retain that build's logs. This preserves both supported architectures. A successful Intel compile is still not Intel runtime evidence.

Read registration state (substitute actual bundle IDs if changed):

```sh
pluginkit -m -A -D -v -i com.example.peek.preview
pluginkit -m -A -D -v -i com.example.peek.thumbnail
swift scripts/probe-types.swift Tests/Fixtures/Generated > artifacts/remote-mac/types-after.txt
```

Check paths, versions and duplicate registrations. Registration is supplementary evidence, not proof Finder selected the provider. Where offered, enable the Quick Look extensions under System Settings > General > Login Items & Extensions > Quick Look; older OS versions may expose Extensions elsewhere. See [Apple's settings guide](https://support.apple.com/guide/mac-help/mtusr003/mac). Record the actual UI/state; do not force a provider/default association to manufacture a pass.

## 5. First Finder test and complete fixture pass

Start with **Tests/Fixtures/Generated/sample.yaml**:

```sh
open -R Tests/Fixtures/Generated/sample.yaml
```

1. Ensure Finder has selected `sample.yaml`, then press **Space**.
2. Our preview must visibly show **PEEK PREVIEW PROBE**, followed by **Type**, **Size**, **Read access OK (... bytes tested)** and **No file contents displayed**. Record the actual type/size/access message and take a screenshot. The POC intentionally does not display file contents or filenames; record the selected filename from Finder.
3. A regular text preview without that marker is not our preview. Compare it with the baseline and provider evidence. Use NATIVE_HANDLER_WINS only when Apple's handler is identified; otherwise record unknown/other provider in notes, without guessing.
4. Press Space again or Escape to close Quick Look. Re-select and repeat at least three times, recording inconsistent outcomes and cold/warm startup observations separately.
5. Independently test thumbnails: Finder icon view (Command-1), View > Show View Options (Command-J), enable Show icon preview and enlarge icons. Our thumbnail is a blue tile with white **PEEK THUMB** text. A normal document icon is not proof. This thumbnail intentionally reads no file data; thumbnail success cannot prove read access.
6. Repeat for every filename below, then after host quit/relaunch and reboot. Record fresh-install and third-party-provider environments separately. Do not replace a failed baseline with a cache-reset success.

| Suffix / case | Synthetic fixture |
|---|---|
| .json | sample.json |
| .jsonl | sample.jsonl |
| .ndjson | sample.ndjson |
| .yaml | sample.yaml |
| .yml | sample.yml |
| .toml | sample.toml |
| .xml | sample.xml |
| .csv | sample.csv |
| .tsv | sample.tsv |
| .env | sample.env, literal .env, .env.local (separate rows) |
| .log | sample.log |
| .sqlite | sample.sqlite |
| .sqlite3 | sample.sqlite3 |
| .db | sample.db |
| .md | sample.md |

For **every row and environment** record exact macOS version/build, architecture, before/after resolved UTType, our preview invoked, our thumbnail invoked, read access, result and notes/evidence in the [compatibility matrix](QUICKLOOK_COMPATIBILITY_MATRIX.md). Allowed results: **PASS, FAIL, PARTIAL, NATIVE_HANDLER_WINS, NOT_TESTED, BLOCKED**. Keep preview, thumbnail and read observations independent. Missing hardware or inaccessible signing is BLOCKED, not a routing failure. A thumbnail-only result never counts toward reliable custom-preview coverage.

Also exercise empty.json, malformed.json and mislabeled.db, rapid selection switching and the safe failure cases in [the protocol](QUICKLOOK_TEST_PLAN.md). This tests bounded access/lifecycle only, not parsing correctness. Verify fixtures before any regeneration:

```sh
python3 scripts/verify-fixtures.py
```

Record directory entries/sidecars and compare timestamps/extended attributes where practical; hashes alone do not prove metadata preservation. Do not use real ENV secrets or live databases.

## 6. Troubleshooting without changing the experiment

Save the original observation first. Apply one intervention at a time and record it separately.

| Symptom / step | Safe action and evidence |
|---|---|
| Wrong or old build | Confirm commit, scheme PeekProbe, Debug, My Mac, local signing on all targets. Rebuild the host, quit the old instance, intentionally replace the known test app and launch it. Keep build logs. |
| Missing extension | Inspect both Contents/PlugIns paths, processed Info.plists, signatures and sandbox entitlements above. Do not register a loose appex instead of fixing host embedding. |
| Host not launched / disabled extension | Launch the installed host once and inspect OS Quick Look settings. Recheck pluginkit IDs/paths and record duplicates. |
| No marker despite registration | Compare before/after UTTypes and baseline/native provider; inspect Console.app while reproducing. Filter PeekPreview, PeekThumbnail, quicklookd and pkd. The POC does not emit custom content logs; missing logs alone do not prove it was not invoked. Save relevant errors without personal paths or secrets. |
| Finder stale | Finish file copies/renames, close previews and run `killall Finder` in this test desktop. Finder should relaunch; reopening windows is expected. Repeat the same fixture. |
| Quick Look service stale | Consult installed `man qlmanage`; run `qlmanage -r` to reset the service, then repeat. If a current-user quicklookd remains stuck, `killall -u "$(id -un)" quicklookd` requests its normal termination; macOS restarts it when needed. No matching process is possible on newer OS releases. Do not use sudo, kill -9 or terminate unrelated/system processes. |
| Thumbnail cache stale | After preserving baseline, use `qlmanage -r cache` where supported and reopen the fixture folder. It clears regenerable Quick Look cache, not source files. Modern Finder caches may differ; record whether it helped. |
| Diagnostic preview only | `qlmanage -p Tests/Fixtures/Generated/sample.yaml` can be compared with Finder, but direct tool/debugger invocation does not establish Finder routing. See local `man qlmanage` and `man pluginkit` for version-specific options. |
| Still inconsistent | Save evidence and ensure remote reconnect access, then use Apple menu > Restart as the final intervention. Launch installed host and repeat. If unavailable, record the reboot test BLOCKED. |

Do not delete system databases, disable SIP/Gatekeeper, remove security protections, force handler ownership or change global defaults. An install that works only after diagnostic resets is not yet reliable fresh-install behavior.

## 7. Decision and completion gate

**GO:** approximately 6–7 strategically useful format families reliably invoke our preview with read access across the required environments. Prioritize YAML, TOML, CSV/TSV, JSONL/NDJSON, ENV, LOG and SQLite. Proceed Quick Look-first with the planned standalone Inspector.

**PARTIAL GO:** a valuable subset reliably works but native handlers win for others. Choose selective Quick Look plus the standalone Inspector, documenting the supported subset and why it is worthwhile.

**NO-GO FOR QUICKLOOK-FIRST:** too few valuable families route reliably. Choose Inspector-first while preserving useful proven Quick Look integrations. JSON or Markdown losing alone is not overall failure. Count YAML/YML, JSONL/NDJSON, CSV/TSV and the SQLite suffixes as families, not separate wins. Unknown or blocked evidence means decision pending, not No-Go.

After testing, update the matrix with evidence links and exact OS/architecture; write findings including repeatability, read failures and native/third-party precedence. Finalize the existing [ADR-001](ADR/ADR-001-QUICKLOOK-STRATEGY.md) with GO / PARTIAL GO / NO-GO, the chosen strategy and rationale. Update known issues, Phase 01, master plan and current state. Set REMOTE_MAC_VERIFIED only after the applicable manual coverage and integrity gates pass; unresolved blockers keep Phase 01 open. Mark Phase 01 Complete only after the evidence and final decision are reviewed. Then Phase 02 may start. A successful CI build alone never opens that gate.
