import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const KIB = 1024;
const MIB = 1024 * KIB;

const BUDGETS = {
  maxVideoBytes: 13 * MIB,
  totalVideoBytes: 45 * MIB,
  mobileVideoBytes: 24 * MIB,
  maxAudioBytes: 7 * MIB,
  totalAudioBytes: 85 * MIB,
  maxFullImageBytes: 3.2 * MIB,
  totalFullImageBytes: 55 * MIB,
  maxPosterBytes: 500 * KIB,
  totalPosterBytes: 1 * MIB,
};

function filesIn(dir, extension) {
  return readdirSync(dir)
    .filter((name) => name.toLowerCase().endsWith(extension))
    .map((name) => ({
      name,
      path: join(dir, name),
      bytes: statSync(join(dir, name)).size,
    }));
}

function extractQuotedValues(source) {
  return Array.from(source.matchAll(/'([^']+)'/g), (match) => match[1]);
}

function configuredMobileVideoFiles() {
  const source = readFileSync('src/content/config.ts', 'utf8');
  const mobileIdsMatch = source.match(/mobileVideoIds:\s*\[([\s\S]*?)\]/);

  assert.ok(mobileIdsMatch, 'siteConfig.mobileVideoIds should be defined');

  const mobileIds = new Set(extractQuotedValues(mobileIdsMatch[1]));
  const files = new Set();

  for (const match of source.matchAll(/\{\s*id:\s*'([^']+)'([\s\S]*?)\n\s*\},/g)) {
    const [, id, body] = match;
    if (!mobileIds.has(id)) continue;

    const videoMatch = body.match(/video:\s*'([^']+)'/);
    assert.ok(videoMatch, `mobile chapter ${id} should configure a video`);

    files.add(videoMatch[1].split('/').pop());
  }

  assert.equal(files.size, mobileIds.size, 'every mobile video id should map to a video file');
  return files;
}

function assertMax(files, maxBytes, label) {
  for (const file of files) {
    assert.ok(
      file.bytes <= maxBytes,
      `${label} ${file.name} is ${formatBytes(file.bytes)}, above ${formatBytes(maxBytes)}`,
    );
  }
}

function assertTotal(files, maxBytes, label) {
  const total = files.reduce((sum, file) => sum + file.bytes, 0);
  assert.ok(
    total <= maxBytes,
    `${label} total is ${formatBytes(total)}, above ${formatBytes(maxBytes)}`,
  );
}

function formatBytes(bytes) {
  return `${(bytes / MIB).toFixed(2)} MiB`;
}

const videos = filesIn('public/videos', '.mp4');
const audio = filesIn('public/audio', '.mp3');
const fullImages = filesIn('public/images', '.png');
const posters = filesIn('public/images/thumbs', '.webp');
const mobileVideoFiles = configuredMobileVideoFiles();
const mobileVideos = videos.filter((file) => mobileVideoFiles.has(file.name));

assertMax(videos, BUDGETS.maxVideoBytes, 'video');
assertTotal(videos, BUDGETS.totalVideoBytes, 'video');
assertTotal(mobileVideos, BUDGETS.mobileVideoBytes, 'mobile video');

assertMax(audio, BUDGETS.maxAudioBytes, 'audio');
assertTotal(audio, BUDGETS.totalAudioBytes, 'audio');

assertMax(fullImages, BUDGETS.maxFullImageBytes, 'full image');
assertTotal(fullImages, BUDGETS.totalFullImageBytes, 'full image');

assertMax(posters, BUDGETS.maxPosterBytes, 'poster');
assertTotal(posters, BUDGETS.totalPosterBytes, 'poster');
