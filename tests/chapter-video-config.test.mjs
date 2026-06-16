import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/content/config.ts', 'utf8');

assert.match(
  source,
  /id:\s*'senior2-plain'[\s\S]*?video:\s*'\/videos\/ch07\.trim\.mp4'/,
  'the ch07 chapter should point at the trimmed chapter video',
);

assert.match(
  source,
  /id:\s*'primary-run'[\s\S]*?video:\s*'\/videos\/ch02\.mp4'/,
  'the ch02 chapter should point at the generated chapter video',
);

assert.match(
  source,
  /id:\s*'junior-moon'[\s\S]*?video:\s*'\/videos\/ch03\.mp4'/,
  'the ch03 chapter should point at the generated chapter video',
);

assert.match(
  source,
  /id:\s*'college-dance'[\s\S]*?video:\s*'\/videos\/ch12\.mp4'/,
  'the ch12 chapter should point at the generated chapter video',
);

assert.match(
  source,
  /chapterVideoIds:\s*\[[^\]]*'primary-run'/s,
  'chapterVideoIds should enable the ch02 chapter video',
);

assert.match(
  source,
  /chapterVideoIds:\s*\[[^\]]*'junior-moon'/s,
  'chapterVideoIds should enable the ch03 chapter video',
);

assert.match(
  source,
  /chapterVideoIds:\s*\[[^\]]*'senior2-plain'/s,
  'chapterVideoIds should enable the ch07 chapter video',
);

assert.match(
  source,
  /chapterVideoIds:\s*\[[^\]]*'college-dance'/s,
  'chapterVideoIds should enable the ch12 chapter video',
);

assert.match(
  source,
  /introVideo:\s*'\/videos\/首屏\.mp4'/,
  'intro should point at the first-screen video',
);
