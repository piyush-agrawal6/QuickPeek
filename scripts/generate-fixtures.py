#!/usr/bin/env python3
"""Generate only synthetic test files in the repository's ignored fixture directory."""
from pathlib import Path
from contextlib import closing
import hashlib
import json
import sqlite3

root = Path(__file__).resolve().parents[1] / 'Tests' / 'Fixtures' / 'Generated'
root.mkdir(parents=True, exist_ok=True)
fixtures = {
    'sample.json': '{"synthetic": true, "message": "Hello, 世界", "items": [1, 2]}\n',
    'sample.jsonl': '{"id":1}\n{"id":2}\n',
    'sample.ndjson': '{"id":1}\n{"id":2}\n',
    'sample.yaml': 'synthetic: true\nitems:\n  - first\n  - second\n',
    'sample.yml': 'synthetic: true\nname: fixture\n',
    'sample.toml': '[probe]\nsynthetic = true\n',
    'sample.xml': '<?xml version="1.0"?><probe synthetic="true"><value>1</value></probe>\n',
    'sample.csv': 'id,name\r\n1,"Sample, One"\r\n2,"Two"\r\n',
    'sample.tsv': 'id\tname\n1\tSample\n',
    'sample.env': 'EXAMPLE_TOKEN=synthetic-not-a-real-secret\n',
    '.env': 'EXAMPLE_TOKEN=synthetic-dotfile-value\n',
    '.env.local': 'EXAMPLE_TOKEN=synthetic-dotfile-variant\n',
    'sample.log': '2026-01-01T00:00:00Z INFO synthetic fixture\n',
    'sample.md': '# Synthetic fixture\n\n- No real user data.\n',
    'malformed.json': '{"broken":\n',
    'empty.json': '',
    'mislabeled.db': 'This is not a SQLite database.\n',
}
for name, data in fixtures.items():
    target = root / name
    if target.is_symlink():
        raise RuntimeError('Refusing to replace a symlink fixture')
    target.write_bytes(data.encode('utf-8'))
for ext in ('sqlite', 'sqlite3', 'db'):
    target = root / ('sample.' + ext)
    # These are generated fixtures, never user-selected databases.
    if target.exists() or target.is_symlink():
        if target.is_symlink():
            raise RuntimeError('Refusing to replace a symlink fixture')
        target.unlink()
    with closing(sqlite3.connect(target)) as db:
        db.executescript('CREATE TABLE example (id INTEGER PRIMARY KEY, label TEXT);'
                         "INSERT INTO example VALUES (1, 'synthetic');"
                         'CREATE INDEX example_label ON example(label);'
                         'CREATE VIEW example_view AS SELECT id FROM example;')
manifest = {p.name: hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(root.iterdir()) if p.is_file() and p.name != 'sha256.json'}
(root / 'sha256.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Generated {len(manifest)} synthetic fixtures in Tests/Fixtures/Generated')
