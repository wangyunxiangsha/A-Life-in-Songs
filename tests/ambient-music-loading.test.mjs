import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/context/AmbientMusicContext.tsx', 'utf8');

assert.equal(
  source.includes("status !== 'ready'"),
  false,
  'ambient music should not block user-triggered playback while metadata is still loading',
);

assert.match(
  source,
  /\.load\(\)/,
  'ambient music should explicitly request loading instead of relying only on preload',
);
