#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import parse from './parse.js';

export default (file1, file2) => {
  // const entries = fs.readFileSync(file1, 'utf-8');
  // const inI = ini.parse(entries);
  // const str = ini.encode(inI);
  // console.log(str);
  let diff = '';
  // // file
  const ext1 = path.extname(path.basename(file1));
  const ext2 = path.extname(path.basename(file2));
  if (ext1 !== ext2) {
    throw new Error('different extensions');
  }

  // dict
  const parsedBefore = parse(file1);
  const parsedAfter = parse(file2);

  const keysAfter = Object.keys(parsedAfter);
  const keysBefore = Object.keys(parsedBefore);

  const common = keysAfter.filter((key) => keysBefore.includes(key));
  common.forEach((el) => {
    if (parsedBefore[el] === parsedAfter[el]) {
      diff += `   ${el}: ${parsedAfter[el]}\n`;
    } else {
      diff += ` + ${el}: ${parsedAfter[el]}\n`;
      diff += ` - ${el}: ${parsedBefore[el]}\n`;
    }
  });
  const deleted = keysBefore.filter((key) => !keysAfter.includes(key));
  deleted.forEach((el) => diff +=` - ${el}: ${parsedBefore[el]}\n`);

  const added = keysAfter.filter((key) => !keysBefore.includes(key));
  added.forEach((el) => diff += ` + ${el}: ${parsedAfter[el]}\n`);

  diff = `{\n${diff}}`;
  console.log(diff);
  return diff;
};

// export default jsonCompare;
