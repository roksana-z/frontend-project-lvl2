#!/usr/bin/env node
const fs = require('fs');


const jsonCompare = (file1, file2) => {
  let diff = '';
  // file
  const jsonBefore = fs.readFileSync(file1);
  const jsonAfter = fs.readFileSync(file2);
  // dict
  const jsBefore = JSON.parse(jsonBefore);
  const jsAfter = JSON.parse(jsonAfter);

  const keysAfter = Object.keys(jsAfter);
  const keysBefore = Object.keys(jsBefore);

  const common = keysAfter.filter((key) => keysBefore.includes(key));
  common.forEach((el) => {
    if (jsBefore[el] === jsAfter[el]) {
      diff += `   ${el}: ${jsAfter[el]}\n`;
    } else {
      diff += ` + ${el}: ${jsAfter[el]}\n`;
      diff += ` - ${el}: ${jsBefore[el]}\n`;
    }
  });
  const deleted = keysBefore.filter((key) => !keysAfter.includes(key));
  deleted.forEach((el) => diff =`${diff} - ${el}: ${jsBefore[el]}\n`);

  const added = keysAfter.filter((key) => !keysBefore.includes(key));
  added.forEach((el) => diff = `${diff} + ${el}: ${jsAfter[el]}\n`);

  diff = `{\n${diff}}`;
  console.log(diff);
  return diff;
};

export default jsonCompare;
