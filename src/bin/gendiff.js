#!/usr/bin/env node
import gendiff from 'commander';
import genDiff from '../index.js';

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<file1Path> <file2Path>')
  .option('-f, --format [type]', 'output format [type]', 'stylish')
  .action((file1Path, file2Path) => {
    console.log(genDiff(file1Path, file2Path, gendiff.format));
  });

gendiff.parse(process.argv);
