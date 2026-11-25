import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FORTUNE } from './fortune.ts';

// Write exactly one fortune to /output/entry.txt. The gate accepts UTF-8 text
// of 1 to 200 characters that is not only whitespace, and the judge compares
// single-line fortunes two at a time, so check every constraint first. The
// sting is the "gift" of more memory spent on the most forgettable meeting.
const text = FORTUNE;
const size = [...text].length;
if (size < 1 || size > 200) {
  throw new Error(`a fortune must be 1-200 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the fortune must not be only whitespace');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('a fortune must be one line with no control characters');
}
if (/[\u200b-\u200f\ufeff]/.test(text)) {
  throw new Error('a fortune must not carry invisible format characters');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, single-line agent fortune to ${target}`);
