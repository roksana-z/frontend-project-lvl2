#!/usr/bin/env node
import jsonCompare from './jsonCompare.js'

const gendiff = require('commander');
// const fs = require('fs');

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<file1Path> <file2Path>')
  .option('-f, --format [type]', 'output format')
  .action((file1Path, file2Path) => {
    const file1 = file1Path;
    const file2 = file2Path;
    jsonCompare(file1, file2);
  });

export default gendiff;
