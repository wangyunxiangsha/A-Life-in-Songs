import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const configSource = readFileSync('src/content/config.ts', 'utf8');
const introMatch = configSource.match(/introVideo:\s*(?:'([^']+)'|([A-Za-z0-9_$]+))/);

assert.ok(introMatch, 'siteConfig.introVideo should be defined');

const importedPath = introMatch[2]
  ? configSource.match(new RegExp(`import\\s+${introMatch[2]}\\s+from\\s+'([^']+)'`))?.[1]
  : null;
const configuredPath = introMatch[1] ?? importedPath;

assert.ok(configuredPath, 'siteConfig.introVideo should point to a file');

const normalizedPath = configuredPath.replace('@/', 'src/').replaceAll('/', '\\');
const publicPath = normalizedPath.startsWith('\\') ? `public${normalizedPath}` : normalizedPath;
const rootPath = normalizedPath.replace(/^\\/, '');
const videoPath = existsSync(publicPath) ? publicPath : rootPath;
const probe = spawnSync(
  'ffprobe',
  [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=codec_name,codec_tag_string,width,height',
    '-of',
    'default=noprint_wrappers=1',
    videoPath,
  ],
  { encoding: 'utf8' },
);

assert.equal(probe.status, 0, probe.stderr);
assert.match(probe.stdout, /codec_name=h264/, 'intro video should use H.264 for Chrome compatibility');
assert.match(probe.stdout, /codec_tag_string=avc1/, 'intro video should use an avc1 MP4 tag');

const width = Number(probe.stdout.match(/width=(\d+)/)?.[1]);
const height = Number(probe.stdout.match(/height=(\d+)/)?.[1]);

assert.equal(width, 1920, 'intro video should use the requested 1080p width');
assert.equal(height, 1080, 'intro video should use the requested 1080p height');
