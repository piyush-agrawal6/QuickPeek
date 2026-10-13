"""Exercise fixture tools in an isolated temporary repository, never user files."""
from pathlib import Path
from contextlib import closing
import plistlib
import shutil
import sqlite3
import subprocess
import sys
import unittest
import uuid

REPO = Path(__file__).resolve().parents[2]

class FixtureContracts(unittest.TestCase):
    def setUp(self):
        self.root = REPO / 'build' / ('peek-fixtures-' + uuid.uuid4().hex)
        self.root.mkdir(parents=True)
        self.addCleanup(self.clean_temporary_repository)
        (self.root / 'scripts').mkdir()
        for name in ('generate-fixtures.py', 'verify-fixtures.py'):
            shutil.copyfile(REPO / 'scripts' / name, self.root / 'scripts' / name)
        self.run_script('generate-fixtures.py')
        self.fixtures = self.root / 'Tests' / 'Fixtures' / 'Generated'

    def clean_temporary_repository(self):
        resolved = self.root.resolve()
        assert resolved.parent == (REPO / 'build').resolve()
        assert resolved.name.startswith('peek-fixtures-')
        shutil.rmtree(resolved)

    def run_script(self, name, expected=0):
        result = subprocess.run([sys.executable, str(self.root / 'scripts' / name)],
                                capture_output=True, text=True)
        self.assertEqual(result.returncode, expected, result.stdout + result.stderr)

    def test_valid_text_database_fixtures_and_integrity(self):
        self.run_script('verify-fixtures.py')
        self.assertEqual(len(list(self.fixtures.iterdir())), 21)
        self.assertTrue((self.fixtures / '.env').exists())
        for ext in ('sqlite', 'sqlite3', 'db'):
            uri = (self.fixtures / ('sample.' + ext)).as_uri() + '?mode=ro'
            with closing(sqlite3.connect(uri, uri=True)) as db:
                self.assertEqual(db.execute('SELECT * FROM example').fetchall(), [(1, 'synthetic')])
                self.assertEqual(db.execute('PRAGMA integrity_check').fetchone(), ('ok',))
        self.run_script('verify-fixtures.py')

    def test_byte_change_is_detected(self):
        (self.fixtures / 'sample.json').write_text('changed', encoding='utf-8')
        self.run_script('verify-fixtures.py', expected=1)

    def test_unexpected_sidecar_is_detected(self):
        (self.fixtures / 'sample.db-wal').write_bytes(b'synthetic')
        self.run_script('verify-fixtures.py', expected=1)

    def test_missing_fixture_is_detected(self):
        (self.fixtures / 'sample.toml').unlink()
        self.run_script('verify-fixtures.py', expected=1)

class PropertyListContracts(unittest.TestCase):
    def test_plists_are_valid_and_extensions_have_required_keys(self):
        for target, point in [('Preview', 'preview'), ('Thumbnail', 'thumbnail')]:
            with (REPO / 'POC' / target / 'Info.plist').open('rb') as handle:
                data = plistlib.load(handle)
            self.assertEqual(data['CFBundlePackageType'], 'XPC!')
            extension = data['NSExtension']
            self.assertEqual(extension['NSExtensionPointIdentifier'], 'com.apple.quicklook.' + point)
            self.assertTrue(extension['NSExtensionPrincipalClass'].startswith('$(PRODUCT_MODULE_NAME).'))
            self.assertGreater(len(extension['NSExtensionAttributes']['QLSupportedContentTypes']), 6)

if __name__ == '__main__':
    unittest.main()
