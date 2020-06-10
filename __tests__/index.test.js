import path from 'path';
import gendiff from '../src/formatters/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const paths = {
  before: [],
  after: [],
  empty: []
}
// const cases = ['before', 'after', 'empty'];
const ext = ['json', 'yml', 'ini'];
ext.forEach((el) => {
  paths.before.push(getFixturePath(`before.${el}`));
  paths.after.push(getFixturePath(`after.${el}`));
  paths.empty.push(getFixturePath(`empty.${el}`))
})

 const results = {
   simple: [],
   emptyBefore: [],
   emptyAfter: []
 }

 const formats = ['tree', 'plain', 'json'];
 formats.forEach((el) => {
   results.simple.push([el, readFile(`${el}Result.txt`)]);
   results.emptyBefore.push([el, readFile(`${el}EmptyBeforeResult.txt`)]);
   results.emptyAfter.push([el, readFile(`${el}EmptyAfterResult.txt`)]);
 })

  const simpleResult = [];
  ext.forEach((el) => {
    const before = paths.before.filter((str) => str.includes(el));
    const after = paths.after.filter((str) => str.includes(el));
    results.simple.forEach((result) => simpleResult.push([...before, ...after, result]))
  })

  test.each(simpleResult)('simple', (before, after, expected) => {
    const format = expected[0];
    const result = expected[1].trim();
    expect(gendiff(before, after, format)).toBe(result);
  });

  const emptyBeforeResult = [];
  ext.forEach((el) => {
    const before = paths.empty.filter((str) => str.includes(el));
    const after = paths.after.filter((str) => str.includes(el));
    results.emptyBefore.forEach(result => emptyBeforeResult.push([...before, ...after, result]))
  })

  test.each(emptyBeforeResult)('emptyBefore', (before, after, expected) => {
    const format = expected[0];
    const result = expected[1].trim();
    expect(gendiff(before, after, format)).toBe(result);
  });

  const emptyAfterResult = [];
  ext.forEach(el => {
    const before = paths.before.filter((str) => str.includes(el));
    const after = paths.empty.filter((str) => str.includes(el));
    results.emptyAfter.forEach(result => emptyAfterResult.push([...before, ...after, result]))
  })

  test.each(emptyAfterResult)('emptyAfter', (before, after, expected) => {
    const format = expected[0];
    const result = expected[1].trim();
    expect(gendiff(before, after, format)).toBe(result);
  });

test('differentExt', () => {
  expect(() => {
    gendiff
  (beforeYaml, afterJSON);
  }).toThrow();
});
