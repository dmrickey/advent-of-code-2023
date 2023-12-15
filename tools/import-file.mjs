// const fs = require('fs');
// const allContents = fs.readFileSync('test.json', 'utf-8');
// allContents.split(/\r?\n/).forEach((line) => {
//   // console.log('line: ', line);
// });

import { readFileSync } from 'fs';
import { truthiness } from './truthiness.mjs';

export function getFileContents(file) {
    const allContents = readFileSync(file, 'utf-8');
    return allContents.split(/\r?\n/);
}