import path from 'path';
import gendiff from '../src/formatters/index.js';
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
  // Arrange
  const result = readFile('treeResult.txt');
  const resultPlainFormat = readFile('plainResult.txt');
  const resultJSONFormat = readFile('jsonResult.txt');

  // Act
  const jsonStylish = gendiff(beforeJSON, afterJSON, 'stylish');
  const yamlStylish = gendiff(beforeYaml, afterYaml, 'stylish');
  const iniStylish = gendiff(beforeIni, afterIni, 'stylish');
  const plain = gendiff(beforeJSON, afterJSON, 'plain');
  const json = gendiff(beforeJSON, afterJSON, 'json');

  // Assert
  expect(jsonStylish).toMatch(result.trim());
  expect(yamlStylish).toMatch(result.trim());
  expect(iniStylish).toMatch(result.trim());
  expect(plain).toMatch(resultPlainFormat.trim());
  expect(json).toMatch(resultJSONFormat.trim());
});

test('emptyBefore', () => {
  // Arrange
  const result = readFile('treeEmptyBeforeResult.txt');
  const resultForIni = readFile('emptyBeforeIni.txt');
  const resultPlain = readFile('plainEmptyBeforeResult.txt');
  const resultJson = readFile('jsonEmptyBeforeResult.txt');

  // Act
  const jsonStylish  = gendiff(emptyJSON, afterJSON, 'stylish');
  const yamlStylish = gendiff(emptyYaml, afterYaml, 'stylish')
  const iniStylish = gendiff(emptyIni, afterIni, 'stylish');
  const plain = gendiff(emptyJSON, afterJSON, 'plain');
  const json = gendiff(emptyJSON, afterJSON, 'json');

  // Assert
  expect(jsonStylish).toMatch(result.trim());
  expect(yamlStylish).toMatch(result.trim());
  expect(iniStylish).toMatch(resultForIni.trim());
  expect(plain).toMatch(resultPlain.trim());
  expect(json).toMatch(resultJson.trim());
});

test('emptyAfter', () => {
  // Arrange
  const result = readFile('treeEmptyAfterResult.txt');
  const resultPlain = readFile('plainEmptyAfterResult.txt');
  const resultJson = readFile('jsonEmptyAfterResult.txt');

  // Act
  const jsonStylish = gendiff(beforeJSON, emptyJSON, 'stylish');
  const yamlStylish = gendiff(beforeYaml, emptyYaml, 'stylish');
  const iniStylish =gendiff(beforeIni, emptyIni, 'stylish');
  const plain = gendiff(beforeJSON, emptyJSON, 'plain');
  const json = gendiff(beforeJSON, emptyJSON, 'json');

  // Assert
  expect(jsonStylish).toMatch(result.trim());
  expect(yamlStylish).toMatch(result.trim());
  expect(iniStylish).toMatch(result.trim());
  expect(plain).toMatch(resultPlain.trim());
  expect(json).toMatch(resultJson.trim());
});

test('differentExt', () => {
  expect(() => {
    gendiff
  (beforeYaml, afterJSON);
  }).toThrow();
});