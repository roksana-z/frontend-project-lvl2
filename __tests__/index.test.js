import path from 'path';
import gendiff from '../src/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const makePath = (prefix, ext) => getFixturePath(`${prefix}.${ext}`);

const formats = ['stylish', 'plain', 'json'];
const results = formats.map(format => { 
  const content = readFile(`${format}Result.txt`);
  return { content, format };
 });

const preparedData = []
results.forEach((result) => {
  preparedData.push([makePath('before', 'json'), makePath('after', 'json'), result]);
  preparedData.push([makePath('before', 'yml'), makePath('after', 'yml'), result]);
  preparedData.push([makePath('before', 'ini'), makePath('after', 'ini'), result]);
})

test.each(preparedData)('%s %s', (before, after, result) => {
  expect(gendiff(before, after, result.format)).toMatch(result.content.trim());
})

test('differentExt', () => {
  expect(() => {
    gendiff
  (beforeYaml, afterJSON);
  }).toThrow();
});