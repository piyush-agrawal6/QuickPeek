# Synthetic fixtures

Run `python3 scripts/generate-fixtures.py` from the repository root on the Mac. It writes only to ignored Tests/Fixtures/Generated and creates 20 files plus a hash manifest: every target suffix, literal `.env` and `.env.local`, and empty/malformed/mislabeled cases. Values are synthetic. No real ENV files are committed.

After preview testing, run `python3 scripts/verify-fixtures.py` **before** regenerating fixtures. It checks original byte hashes and flags any new directory entry, including SQLite sidecars. It does not assert timestamps or extended attributes; check those separately in manual QA.

Phase 04–07 add nested/deep/Unicode JSON, YAML anchors, malformed TOML/XML, quoted/multiline/BOM/100k-row CSV, huge logs and empty/multiple-table/large/corrupt/WAL SQLite fixtures. These larger parser fixtures are not part of the routing-only experiment yet. The SQLite generator intentionally writes synthetic fixture databases; the product never uses this writer.
