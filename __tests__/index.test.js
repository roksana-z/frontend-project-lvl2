import path from 'path';
import gendiff from '../src/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

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
  const result = readFile('treeResult.txt');
  const resultPlainFormat = readFile('resultPlain.txt');
  const resultJSONFormat = readFile('resultJson.json');
  expect(gendiff
  (beforeJSON, afterJSON, 'tree')).toMatch(result.trim());
  expect(gendiff
  (beforeYaml, afterYaml, 'tree')).toMatch(result.trim());
  expect(gendiff
  (beforeIni, afterIni, 'tree')).toMatch(result.trim());
  expect(gendiff
  (beforeJSON, afterJSON, 'plain')).toMatch(resultPlainFormat.trim());
  expect(gendiff
  (beforeJSON, afterJSON, 'json')).toMatch(resultJSONFormat.trim());
});

test('emptyBefore', () => {
  const result = readFile('emptyBeforeTreeResult.txt');
  const resultForIni = readFile('emptyBeforeIni.txt');
  const resultPlain = readFile('emptyBeforePlainResult.txt');
  const resultJson = readFile('emptyBeforeJsonResult.json');
  expect(gendiff
  (emptyJSON, afterJSON, 'tree')).toMatch(result.trim());
  expect(gendiff
  (emptyYaml, afterYaml, 'tree')).toMatch(result.trim());
  expect(gendiff
  (emptyIni, afterIni, 'tree')).toMatch(resultForIni.trim());
  expect(gendiff
  (emptyJSON, afterJSON, 'plain')).toMatch(resultPlain.trim());
  expect(gendiff
  (emptyJSON, afterJSON, 'json')).toMatch(resultJson.trim());
});

test('emptyAfter', () => {
  const result = readFile('emptyAfterTreeResult.txt');
  const resultPlain = readFile('emptyAfterPlainResult.txt');
  const resultJson = readFile('emptyAfterJsonResult.json');
  expect(gendiff
  (beforeJSON, emptyJSON, 'tree')).toMatch(result.trim());
  expect(gendiff
  (beforeYaml, emptyYaml, 'tree')).toMatch(result.trim());
  expect(gendiff
  (beforeIni, emptyIni, 'tree')).toMatch(result.trim());
  expect(gendiff
  (beforeJSON, emptyJSON, 'plain')).toMatch(resultPlain.trim());
  expect(gendiff
  (beforeJSON, emptyJSON, 'json')).toMatch(resultJson.trim());
});

test('differentExt', () => {
  expect(() => {
    gendiff
  (beforeYaml, afterJSON);
  }).toThrow();
});
