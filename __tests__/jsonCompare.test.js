import jsonCompare from '../src/jsonCompare.js'

const path = require('path');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('simple', () => {
  const result = '{\n + timeout: 20\n - timeout: 50\n   host: hexlet.io\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(jsonCompare(before, after)).toMatch(result);
});

test('emptyBefore', () => {
  const result = '{\n + timeout: 20\n + verbose: true\n + host: hexlet.io\n}';
  const before = getFixturePath('empty.json');
  const after = getFixturePath('after.json');
  expect(jsonCompare(before, after)).toMatch(result);
});

test('emptyAfter', () => {
  const result = '{\n - host: hexlet.io\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n}';
  const before = getFixturePath('before.json');
  const after = getFixturePath('empty.json');
  expect(jsonCompare(before, after)).toMatch(result);
});
