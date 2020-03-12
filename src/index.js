#!/usr/bin/env node
import comander from 'commander';

const gendiff = require('commander');


gendiff
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    
gendiff.parse(process.argv);

