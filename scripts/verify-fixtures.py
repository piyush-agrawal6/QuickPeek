#!/usr/bin/env python3
"""Run AFTER Finder probes and BEFORE regenerating fixtures."""
from pathlib import Path
import hashlib
import json
import sys
root = Path(__file__).resolve().parents[1] / 'Tests' / 'Fixtures' / 'Generated'
manifest = json.loads((root / 'sha256.json').read_text(encoding='utf-8'))
failures = [name for name, expected in manifest.items()
            if not (root / name).is_file()
            or hashlib.sha256((root / name).read_bytes()).hexdigest() != expected]
unexpected = {p.name for p in root.iterdir()} - set(manifest) - {'sha256.json'}
if failures or unexpected:
    print('FAIL: fixture changes or unexpected files detected:', failures, sorted(unexpected))
    sys.exit(1)
print(f'PASS: {len(manifest)} fixture hashes unchanged; no sidecars or extra files')
