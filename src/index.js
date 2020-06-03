#!/usr/bin/env node
import gendiff from 'commander';
import jsonCompare from './jsonCompare.js';

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<file1Path> <file2Path>')
  .option('-f, --format [type]', 'output format [type]', 'tree')
  .action((file1Path, file2Path) => {
    const file1 = file1Path;
    const file2 = file2Path;
    jsonCompare(file1, file2, gendiff.format);
  });

export default gendiff;
