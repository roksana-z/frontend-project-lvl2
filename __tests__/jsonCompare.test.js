import path from 'path';
import jsonCompare from '../src/jsonCompare.js';
// import __dirname from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const beforeJSON = getFixturePath('before.json');
const afterJSON = getFixturePath('after.json');
const emptyJSON = getFixturePath('empty.json');

const beforeYaml = getFixturePath('before.yml');
const afterYaml = getFixturePath('after.yml');
const emptyYaml = getFixturePath('empty.yml');

const beforeIni = getFixturePath('before.ini');
const afterIni = getFixturePath('after.ini');
const emptyIni = getFixturePath('empty.ini');

test('simple', () => {
  const result = '{\n + timeout: 20\n - timeout: 50\n   host: hexlet.io\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  expect(jsonCompare(beforeJSON, afterJSON)).toMatch(result);
  expect(jsonCompare(beforeYaml, afterYaml)).toMatch(result);
  expect(jsonCompare(beforeIni, afterIni)).toMatch(result);
});

test('emptyBefore', () => {
  const result = '{\n + timeout: 20\n + verbose: true\n + host: hexlet.io\n}';
  expect(jsonCompare(emptyJSON, afterJSON)).toMatch(result);
  expect(jsonCompare(emptyYaml, afterYaml)).toMatch(result);
  expect(jsonCompare(emptyIni, afterIni)).toMatch(result);
});

test('emptyAfter', () => {
  const result = '{\n - host: hexlet.io\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n}';
  expect(jsonCompare(beforeJSON, emptyJSON)).toMatch(result);
  expect(jsonCompare(beforeYaml, emptyYaml)).toMatch(result);
  expect(jsonCompare(beforeIni, emptyIni)).toMatch(result);
});

test('differentExt', () => {
  expect(() => {
    jsonCompare(beforeYaml, afterJSON);
  }).toThrow();
});
