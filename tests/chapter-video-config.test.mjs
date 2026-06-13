import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/content/config.ts', 'utf8');

assert.match(
  source,
  /import\s+ch07VideoUrl\s+from\s+'@\/assets\/ch07-1080p\.mp4'/,
  'ch07 should use the optimized 1080p chapter video asset',
);

assert.match(
  source,
  /chapterVideoIds:\s*\[[^\]]*'senior2-plain'/s,
  'chapterVideoIds should enable the ch07 chapter video',
);

assert.match(
  source,
  /id:\s*'senior2-plain'[\s\S]*?video:\s*ch07VideoUrl/,
  'the ch07 chapter should point at the optimized video asset',
);
