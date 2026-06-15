import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/sections/Companions.tsx', 'utf8');

assert.match(
  source,
  /const goPage = useCallback/,
  'companions should keep a dedicated pagination handler',
);

assert.equal(
  source.includes('stopCurrentAudio'),
  false,
  'companions pagination should not stop the currently playing song',
);
