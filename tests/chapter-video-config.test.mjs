import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/content/config.ts', 'utf8');

assert.match(
  source,
  /id:\s*'senior2-plain'[\s\S]*?video:\s*'\/videos\/ch07\.mp4'/,
  'the ch07 chapter should point at the uploaded 1080p chapter video',
);

assert.match(
  source,
  /chapterVideoIds:\s*\[[^\]]*'senior2-plain'/s,
  'chapterVideoIds should enable the ch07 chapter video',
);

assert.match(
  source,
  /introVideo:\s*'\/videos\/intro\.mp4'/,
  'intro should point at the uploaded 1080p intro video',
);
