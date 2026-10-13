#!/usr/bin/env python3
"""Read built bundle metadata; fail if expected extension embedding is missing.

This is structure validation only, not code-signing or Finder routing validation.
"""
from pathlib import Path
import json
import plistlib
import re
import sys

REPO = Path(__file__).resolve().parents[1]

def inspect(app):
    expected_types = {item['type'] for item in json.loads((REPO / 'POC/formats.json').read_text())}

    def read_bundle(bundle, executable, kind):
        with (bundle / 'Contents/Info.plist').open('rb') as stream:
            info = plistlib.load(stream)
        if '$(' in json.dumps(info):
            raise ValueError(f'{bundle.name}: unresolved build setting in processed Info.plist')
        if info.get('CFBundlePackageType') != kind or info.get('CFBundleExecutable') != executable:
            raise ValueError(f'{bundle.name}: unexpected package type or executable')
        if not (bundle / 'Contents/MacOS' / executable).is_file():
            raise ValueError(f'{bundle.name}: executable missing')
        identifier = info.get('CFBundleIdentifier', '')
        if not re.fullmatch(r'[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+', identifier):
            raise ValueError(f'{bundle.name}: invalid bundle identifier')
        return info

    host = read_bundle(app, 'PeekProbe', 'APPL')
    plugins = app / 'Contents/PlugIns'
    if {p.name for p in plugins.glob('*.appex')} != {'PeekPreview.appex', 'PeekThumbnail.appex'}:
        raise ValueError('Host must embed exactly PeekPreview.appex and PeekThumbnail.appex')
    report = {'purpose': 'Unsigned inspection artifact; not distributable or Finder-validated',
              'host': host['CFBundleIdentifier'], 'minimum_macos': host.get('LSMinimumSystemVersion'),
              'extensions': []}
    for name, suffix, principal in [('PeekPreview', 'preview', 'PreviewViewController'),
                                     ('PeekThumbnail', 'thumbnail', 'ThumbnailProvider')]:
        info = read_bundle(plugins / (name + '.appex'), name, 'XPC!')
        if info['CFBundleIdentifier'] != host['CFBundleIdentifier'] + '.' + suffix:
            raise ValueError(f'{name}: identifier must match host prefix and {suffix} suffix')
        if info.get('LSMinimumSystemVersion') != host.get('LSMinimumSystemVersion'):
            raise ValueError(f'{name}: deployment target differs from host')
        extension = info.get('NSExtension', {})
        if extension.get('NSExtensionPointIdentifier') != 'com.apple.quicklook.' + suffix:
            raise ValueError(f'{name}: incorrect extension point')
        if extension.get('NSExtensionPrincipalClass') != name + '.' + principal:
            raise ValueError(f'{name}: incorrect principal class')
        if set(extension.get('NSExtensionAttributes', {}).get('QLSupportedContentTypes', [])) != expected_types:
            raise ValueError(f'{name}: supported types differ from the candidate inventory')
        report['extensions'].append({'bundle': name + '.appex', 'identifier': info['CFBundleIdentifier'],
                                     'extension_point': extension['NSExtensionPointIdentifier']})
    return report

if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('Usage: python3 scripts/inspect-ci-bundle.py path/to/PeekProbe.app')
    try:
        print(json.dumps(inspect(Path(sys.argv[1])), indent=2))
    except (OSError, ValueError, KeyError, plistlib.InvalidFileException) as error:
        sys.exit(f'Bundle inspection failed: {error}')
