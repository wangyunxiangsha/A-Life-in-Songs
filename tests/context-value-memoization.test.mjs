import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const appContext = readFileSync('src/context/AppContext.tsx', 'utf8');
const ambientContext = readFileSync('src/context/AmbientMusicContext.tsx', 'utf8');
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

assert.match(
  appContext,
  /const value = useMemo\(\(\) => \(\{/,
  'AppProvider should memoize its context value object',
);
assert.match(
  appContext,
  /<AppContext\.Provider value=\{value\}>/,
  'AppProvider should pass the memoized value to the provider',
);
assert.doesNotMatch(
  appContext,
  /<AppContext\.Provider value=\{\{/,
  'AppProvider should not pass an inline object value',
);

assert.match(
  ambientContext,
  /useMemo/,
  'AmbientMusicProvider should import and use useMemo',
);
assert.match(
  ambientContext,
  /const value = useMemo<AmbientMusicState>\(\(\) => \(\{/,
  'AmbientMusicProvider should memoize its context value object',
);
assert.match(
  ambientContext,
  /<AmbientMusicContext\.Provider value=\{value\}>/,
  'AmbientMusicProvider should pass the memoized value to the provider',
);

assert.equal(
  packageJson.scripts['test:context-value'],
  'node tests/context-value-memoization.test.mjs',
  'package.json should expose the context value memoization test',
);
