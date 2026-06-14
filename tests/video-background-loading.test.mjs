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
  /preload="auto"/,
  'intro video should load immediately so the first screen paints without an old fallback frame',
);

assert.equal(
  source.includes('intro-poster'),
  false,
  'first screen should not flash the old intro poster before the video paints',
);

assert.equal(
  (source.match(/<video/g) ?? []).length,
  1,
  'first screen should use a single video element, not double-buffered videos',
);
