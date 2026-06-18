import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const helperPath = 'src/lib/chapterMedia.ts';
const helperSource = existsSync(helperPath) ? readFileSync(helperPath, 'utf8') : '';
const videoBackgroundSource = readFileSync('src/sections/VideoBackground.tsx', 'utf8');
const companionsSource = readFileSync('src/sections/Companions.tsx', 'utf8');
const seasonsSource = readFileSync('src/sections/Seasons.tsx', 'utf8');

assert.equal(existsSync(helperPath), true, 'chapter media helper module should exist');

for (const exportName of [
  'chapterImageThumb',
  'chapterPosterFromImage',
  'parseChapterHeading',
]) {
  assert.match(
    helperSource,
    new RegExp(`export function ${exportName}`),
    `chapter media helper should export ${exportName}`,
  );
}

assert.match(
  videoBackgroundSource,
  /import \{ chapterPosterFromImage \} from '@\/lib\/chapterMedia'/,
  'VideoBackground should use the shared chapter poster helper',
);

assert.match(
  companionsSource,
  /import \{ chapterImageThumb \} from '@\/lib\/chapterMedia'/,
  'Companions should use the shared chapter thumbnail helper',
);

assert.match(
  seasonsSource,
  /import \{ chapterImageThumb, parseChapterHeading \} from '@\/lib\/chapterMedia'/,
  'Seasons should use the shared heading and thumbnail helpers',
);

for (const [name, source] of [
  ['VideoBackground', videoBackgroundSource],
  ['Companions', companionsSource],
  ['Seasons', seasonsSource],
]) {
  assert.doesNotMatch(
    source,
    /function (chapterPoster|cardThumb|characterThumb|parseChapterHeading)\(/,
    `${name} should not keep local chapter media helper implementations`,
  );
}
