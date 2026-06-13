import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const seasonsSource = readFileSync('src/sections/Seasons.tsx', 'utf8');
const cssSource = readFileSync('src/index.css', 'utf8');
const audioSource = readFileSync('src/sections/AudioPlayer.tsx', 'utf8');

assert.match(
  seasonsSource,
  /season-reading-panel/,
  'chapter panels should use a dedicated high-contrast reading layer',
);

assert.equal(
  seasonsSource.includes('text-white/92'),
  false,
  'story text should not rely on translucent white over variable video backgrounds',
);

assert.match(
  seasonsSource,
  /season-character-card/,
  'character summary should have its own contrast layer',
);

assert.match(
  cssSource,
  /\.season-reading-panel[\s\S]*background:\s*linear-gradient[\s\S]*rgba\(8,\s*18,\s*22,\s*0\.82\)/,
  'reading layer should use a darker translucent base for contrast',
);

assert.match(
  cssSource,
  /\.season-story-text[\s\S]*text-shadow:/,
  'story text should include text shadow for bright backgrounds',
);

assert.match(
  audioSource,
  /season-audio-player/,
  'compact audio player should use the shared high-contrast control surface',
);
