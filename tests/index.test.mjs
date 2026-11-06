import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('encodes reserved characters', () => {
  assert.equal(api.encodeEntities('<&>'), '&lt;&amp;&gt;');
});
test('encodes quotes', () => {
  assert.equal(api.encodeEntities('"\''), '&quot;&apos;');
});
test('decodes named references', () => {
  assert.equal(api.decodeEntities('&lt;&amp;'), '<&');
});
test('decodes decimal references', () => {
  assert.equal(api.decodeEntities('&#65;'), 'A');
});
test('decodes hexadecimal references', () => {
  assert.equal(api.decodeEntities('&#x1F600;'), '😀');
});
test('rejects unsupported names', () => {
  assert.throws(() => api.decodeEntities('&unknown;'), RangeError);
});
