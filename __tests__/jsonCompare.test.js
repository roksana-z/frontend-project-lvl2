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
  console.log(typeof result)
  expect(jsonCompare(beforeJSON, afterJSON)).toMatch(result.trim());
  expect(jsonCompare(beforeYaml, afterYaml)).toMatch(result.trim());
  expect(jsonCompare(beforeIni, afterIni)).toMatch(result.trim());
});

test('emptyBefore', () => {
  const result = fs.readFileSync(getFixturePath('emptyBeforeResult.txt'), 'utf-8');
  const resultForIni = fs.readFileSync(getFixturePath('emptyBeforeIni.txt'), 'utf-8')
  expect(jsonCompare(emptyJSON, afterJSON)).toMatch(result.trim());
  expect(jsonCompare(emptyYaml, afterYaml)).toMatch(result.trim());
  expect(jsonCompare(emptyIni, afterIni)).toMatch(resultForIni.trim());
});

test('emptyAfter', () => {
  const result = fs.readFileSync(getFixturePath('emptyAfterResult.txt'), 'utf-8');
  expect(jsonCompare(beforeJSON, emptyJSON)).toMatch(result.trim());
  expect(jsonCompare(beforeYaml, emptyYaml)).toMatch(result.trim());
  expect(jsonCompare(beforeIni, emptyIni)).toMatch(result.trim());
});

test('differentExt', () => {
  expect(() => {
    jsonCompare(beforeYaml, afterJSON);
  }).toThrow();
});
