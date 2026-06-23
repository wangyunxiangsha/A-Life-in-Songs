import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const helperPath = 'src/lib/chapterProgress.ts';
const navPath = 'src/components/ChapterProgressNav.tsx';
const appPath = 'src/App.tsx';

const helperSource = existsSync(helperPath) ? readFileSync(helperPath, 'utf8') : '';
const navSource = existsSync(navPath) ? readFileSync(navPath, 'utf8') : '';
const appSource = readFileSync(appPath, 'utf8');

assert.equal(existsSync(helperPath), true, 'chapter progress helper module should exist');
assert.match(
  helperSource,
  /export function getChapterProgress\(/,
  'chapter progress helper should export getChapterProgress',
);
assert.match(
  helperSource,
  /export function scrollToChapter\(/,
  'chapter progress helper should export scrollToChapter',
);

assert.equal(existsSync(navPath), true, 'ChapterProgressNav component should exist');
assert.match(
  navSource,
  /useApp\(\)/,
  'ChapterProgressNav should use current chapter from app context',
);
assert.match(
  navSource,
  /getChapterProgress\(/,
  'ChapterProgressNav should compute active chapter progress through the helper',
);
assert.match(
  navSource,
  /<button[\s\S]*aria-current=/,
  'ChapterProgressNav should render accessible chapter buttons',
);
assert.match(
  navSource,
  /scrollToChapter\(/,
  'ChapterProgressNav buttons should jump to chapters',
);
assert.match(
  navSource,
  /chapter-progress-mobile/,
  'ChapterProgressNav should include a compact mobile progress surface',
);

assert.match(
  appSource,
  /import ChapterProgressNav from '@\/components\/ChapterProgressNav'/,
  'App should import ChapterProgressNav',
);
assert.match(
  appSource,
  /<ChapterProgressNav \/>/,
  'App should mount ChapterProgressNav with the fixed UI',
);
