#!/usr/bin/env node
import gendiff from '..';

gendiff.parse(process.argv)

// const gendiff = require('commander');
// // const gendiff = { program };

// gendiff
//   .description('Compares two configuration files and shows a difference.')
//   .version('0.0.1')
  

// gendiff.parse(process.argv)

// const { program } = require('commander');
// program.version('0.0.1');

// import genDiff from '..';
// const fs = require('fs');
// const gendiff = require('commander');

// gendiff
//     .description('Compares two configuration files and shows a difference.')
//     .version('1.0.0')
//     .arguments('<firstConfig> <secondConfig>')
//     .option('-f, --format [type]', 'output format')
//     .action(genDiff());
    
// gendiff.parse(process.argv);
// console.log(process.cwd());
