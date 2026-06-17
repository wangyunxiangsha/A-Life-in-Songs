import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const configSource = readFileSync('src/content/config.ts', 'utf8');
const videoSource = readFileSync('src/sections/VideoBackground.tsx', 'utf8');
const companionsSource = readFileSync('src/sections/Companions.tsx', 'utf8');

assert.match(
  configSource,
  /mobileVideoIds:\s*\[[^\]]*'childhood-61'[\s\S]*'junior-moon'[\s\S]*'senior2-plain'[\s\S]*'college-dance'/,
  'mobile media policy should explicitly whitelist the few chapter videos allowed on phones',
);

assert.doesNotMatch(
  videoSource,
  /preload="auto"/,
  'background video should not auto-preload heavy media on page load',
);

assert.match(
  videoSource,
  /preload="metadata"/,
  'background video should only fetch lightweight metadata before playback',
);

assert.match(
  videoSource,
  /poster=\{posterSrc\}/,
  'background video should keep a poster visible while media loads',
);

assert.match(
  videoSource,
  /\/images\/thumbs\/ch\$\{match\[1\]\}\.webp/,
  'chapter background posters should use lightweight webp files instead of the original large PNGs',
);

for (let index = 1; index <= 18; index += 1) {
  const chapterId = String(index).padStart(2, '0');
  const posterPath = `public/images/thumbs/ch${chapterId}.webp`;

  assert.equal(
    existsSync(posterPath),
    true,
    `lightweight poster should exist for chapter ${chapterId}`,
  );

  assert.ok(
    statSync(posterPath).size < 500 * 1024,
    `lightweight poster for chapter ${chapterId} should stay under 500KB`,
  );
}

assert.match(
  companionsSource,
  /const isMobile = useIsMobile\(\)/,
  'companions should branch mobile behavior away from desktop 3D flip rendering',
);

assert.match(
  companionsSource,
  /isMobile \? 'flat' : 'preserve-3d'/,
  'mobile cards should not rely on preserve-3d for core text visibility',
);

assert.match(
  companionsSource,
  /const \[shouldLoadAudio, setShouldLoadAudio\]/,
  'companion voice audio should mount only after the user asks to play it',
);
