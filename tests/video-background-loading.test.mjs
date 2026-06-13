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
  'intro video should only preload metadata to reduce startup memory pressure',
);

assert.match(
  source,
  /poster=/,
  'intro video should keep a poster fallback while the video is loading',
);

assert.equal(
  (source.match(/<video/g) ?? []).length,
  1,
  'first screen should use a single video element, not double-buffered videos',
);
