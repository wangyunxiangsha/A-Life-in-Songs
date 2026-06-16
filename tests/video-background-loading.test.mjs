import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/sections/VideoBackground.tsx', 'utf8');

assert.equal(
  source.includes('setTimeout'),
  false,
  'initial background video should not be delayed behind a timer',
);

assert.match(
  source,
  /<video/,
  'intro should render as the first-screen background video',
);

assert.match(
  source,
  /preload="metadata"/,
  'background video should avoid auto-preloading full media before playback',
);

assert.match(
  source,
  /poster=\{posterSrc\}/,
  'background should keep a poster visible until the video paints',
);

assert.equal(
  (source.match(/<video/g) ?? []).length,
  1,
  'first screen should use a single video element, not double-buffered videos',
);
