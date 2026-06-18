import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const appContextSource = readFileSync('src/context/AppContext.tsx', 'utf8');
const seasonsSource = readFileSync('src/sections/Seasons.tsx', 'utf8');

assert.match(
  appContextSource,
  /useMemo\(\s*\(\)\s*=>\s*new Map/,
  'AppProvider should memoize a chapter id lookup map instead of scanning chapters on each scroll update',
);

assert.doesNotMatch(
  appContextSource,
  /chapters\.find/,
  'AppProvider.setChapter should not scan chapters with Array.find for every scroll update',
);

assert.match(
  appContextSource,
  /setCurrentChapterState\(\(prev\)\s*=>\s*prev\.id === id \? prev : chapter\)/,
  'AppProvider.setChapter should keep the previous chapter object when the requested id is already active',
);

assert.match(
  seasonsSource,
  /const applyChapterMedia = useCallback/,
  'Seasons should share one callback for applying the active chapter and video source',
);

assert.match(
  seasonsSource,
  /onEnter:\s*\(\)\s*=>\s*applyChapterMedia\(chapter\)/,
  'Seasons.onEnter should delegate to the shared chapter media callback',
);

assert.match(
  seasonsSource,
  /onEnterBack:\s*\(\)\s*=>\s*applyChapterMedia\(chapter\)/,
  'Seasons.onEnterBack should delegate to the shared chapter media callback',
);
