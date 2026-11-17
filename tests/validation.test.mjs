import test from 'node:test';
import assert from 'node:assert/strict';
import { isAssetPath } from '../lib/validation.ts';
test('asset paths remain inside public assets and have the expected type', () => {
  assert.ok(isAssetPath('/assets/documents/jbm-pro-auto.pdf'));
  assert.ok(isAssetPath('/assets/certificates/283NVKV.png', 'image'));
  for (const path of ['https://example.com/x.pdf', '/assets/../secret.pdf', '/assets/%2e%2e/x.pdf', '/assets//x.pdf', '/assets/x.pdf?token=1', '/assets/x.svg', '/assets/a\\x.pdf']) assert.equal(isAssetPath(path), false);
});
