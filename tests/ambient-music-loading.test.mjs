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

assert.match(
  source,
  /localStorage\.getItem\(PREF_KEY\) !== '0'/,
  'ambient music should be enabled by default unless the user explicitly disables it',
);

assert.match(
  source,
  /catch\s*\{\s*return true;\s*\}/,
  'ambient music should default to enabled when stored preferences cannot be read',
);
