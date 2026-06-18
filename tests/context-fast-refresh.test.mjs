import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const appContextSource = readFileSync('src/context/AppContext.tsx', 'utf8');
const ambientContextSource = readFileSync('src/context/AmbientMusicContext.tsx', 'utf8');
const appHookPath = 'src/context/useApp.ts';
const ambientHookPath = 'src/context/useAmbientMusic.ts';
const appValuePath = 'src/context/appContextValue.ts';
const ambientValuePath = 'src/context/ambientMusicContextValue.ts';

assert.equal(existsSync(appHookPath), true, 'useApp hook should live in its own module');
assert.equal(existsSync(ambientHookPath), true, 'useAmbientMusic hook should live in its own module');
assert.equal(existsSync(appValuePath), true, 'AppContext value should live in its own module');
assert.equal(
  existsSync(ambientValuePath),
  true,
  'AmbientMusicContext value should live in its own module',
);

assert.doesNotMatch(
  appContextSource,
  /export function useApp/,
  'AppContext.tsx should only export context/provider code for Fast Refresh',
);

assert.doesNotMatch(
  ambientContextSource,
  /export function useAmbientMusic/,
  'AmbientMusicContext.tsx should only export context/provider code for Fast Refresh',
);

assert.doesNotMatch(
  appContextSource,
  /export const AppContext|createContext/,
  'AppContext.tsx should not export or create the React context object',
);

assert.doesNotMatch(
  ambientContextSource,
  /export const AmbientMusicContext|createContext/,
  'AmbientMusicContext.tsx should not export or create the React context object',
);

const appHookSource = existsSync(appHookPath) ? readFileSync(appHookPath, 'utf8') : '';
const ambientHookSource = existsSync(ambientHookPath) ? readFileSync(ambientHookPath, 'utf8') : '';

assert.match(appHookSource, /export function useApp/, 'useApp.ts should export useApp');
assert.match(
  ambientHookSource,
  /export function useAmbientMusic/,
  'useAmbientMusic.ts should export useAmbientMusic',
);

for (const [file, hook] of [
  ['src/sections/VideoBackground.tsx', 'useApp'],
  ['src/sections/TimeSlider.tsx', 'useApp'],
  ['src/sections/Seasons.tsx', 'useApp'],
  ['src/sections/ParticleCanvas.tsx', 'useApp'],
  ['src/components/AmbientMusicToggle.tsx', 'useAmbientMusic'],
]) {
  const source = readFileSync(file, 'utf8');
  assert.match(
    source,
    new RegExp(`import \\{ ${hook} \\} from '@/context/${hook}'`),
    `${file} should import ${hook} from its hook module`,
  );
}
