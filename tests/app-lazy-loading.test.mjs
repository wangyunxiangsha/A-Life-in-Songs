import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/App.tsx', 'utf8');

for (const section of ['About', 'Companions', 'Seasons', 'Footer']) {
  assert.equal(
    source.includes(`import ${section} from '@/sections/${section}'`),
    false,
    `${section} should be dynamically imported instead of being part of the initial bundle`,
  );
}

assert.match(
  source,
  /IntersectionObserver/,
  'below-the-fold sections should mount only when scrolled near the viewport',
);

assert.equal(
  source.includes("rootMargin: '900px 0px'"),
  false,
  'below-the-fold sections should not mount eagerly from a large root margin',
);

assert.equal(
  source.includes('<ParticleCanvas'),
  false,
  'particle canvas should not be part of the initial experience while investigating Chrome OOM',
);
