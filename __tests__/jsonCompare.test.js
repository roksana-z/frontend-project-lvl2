import path from 'path';
import jsonCompare from '../src/jsonCompare.js';
// import __dirname from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
  const result = fs.readFileSync(getFixturePath('treeResult.txt'), 'utf-8');
  const resultPlainFormat = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
  const resultJSONFormat = fs.readFileSync(getFixturePath('resultJson.json'), 'utf-8');
  expect(jsonCompare(beforeJSON, afterJSON, 'tree')).toMatch(result.trim());
  expect(jsonCompare(beforeYaml, afterYaml, 'tree')).toMatch(result.trim());
  expect(jsonCompare(beforeIni, afterIni, 'tree')).toMatch(result.trim());
  expect(jsonCompare(beforeJSON, afterJSON, 'plain')).toMatch(resultPlainFormat.trim());
  expect(jsonCompare(beforeJSON, afterJSON, 'json')).toMatch(resultJSONFormat.trim());
});

test('emptyBefore', () => {
  const result = fs.readFileSync(getFixturePath('emptyBeforeResult.txt'), 'utf-8');
  const resultForIni = fs.readFileSync(getFixturePath('emptyBeforeIni.txt'), 'utf-8');
  const resultPlain = fs.readFileSync(getFixturePath('EmptyBeforePlain.txt'), 'utf-8');
  const resultJson = fs.readFileSync(getFixturePath('emptyBeforeJson.json'), 'utf-8');
  expect(jsonCompare(emptyJSON, afterJSON, 'tree')).toMatch(result.trim());
  expect(jsonCompare(emptyYaml, afterYaml, 'tree')).toMatch(result.trim());
  expect(jsonCompare(emptyIni, afterIni, 'tree')).toMatch(resultForIni.trim());
  expect(jsonCompare(emptyJSON, afterJSON, 'plain')).toMatch(resultPlain.trim());
  expect(jsonCompare(emptyJSON, afterJSON, 'json')).toMatch(resultJson.trim());
});

test('emptyAfter', () => {
  const result = fs.readFileSync(getFixturePath('emptyAfterResult.txt'), 'utf-8');
  const resultPlain = fs.readFileSync(getFixturePath('emptyAfterResultPlain.txt'), 'utf-8');
  const resultJson = fs.readFileSync(getFixturePath('emptyAfterJson.json'), 'utf-8');
  expect(jsonCompare(beforeJSON, emptyJSON, 'tree')).toMatch(result.trim());
  expect(jsonCompare(beforeYaml, emptyYaml, 'tree')).toMatch(result.trim());
  expect(jsonCompare(beforeIni, emptyIni, 'tree')).toMatch(result.trim());
  expect(jsonCompare(beforeJSON, emptyJSON, 'plain')).toMatch(resultPlain.trim());
  expect(jsonCompare(beforeJSON, emptyJSON, 'json')).toMatch(resultJson.trim());
});


test('differentExt', () => {
  expect(() => {
    jsonCompare(beforeYaml, afterJSON);
  }).toThrow();
});
