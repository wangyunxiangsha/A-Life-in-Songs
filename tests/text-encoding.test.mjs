import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { TextDecoder } from 'node:util';

const TEXT_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
]);

const ROOTS = [
  'README.md',
  '使用说明.md',
  'docs',
  'src',
  'tests',
  'index.html',
  'package.json',
  'vite.config.ts',
];

const EXCLUDED_FILES = new Set([
  'tests\\text-encoding.test.mjs',
  'tests/text-encoding.test.mjs',
]);

const COMMON_CHINESE_MOJIBAKE = [
  '涓€',
  '绗',
  '闊',
  '瑙',
  '鐐',
  '鍥',
  '馃',
  '鈥',
  '鈫',
  '銆',
  '锛',
  '姊',
  '棣',
  '鍚',
  '浣',
];

function extensionOf(path) {
  const dot = path.lastIndexOf('.');
  return dot >= 0 ? path.slice(dot).toLowerCase() : '';
}

function listTextFiles(path) {
  const stat = statSync(path);
  if (stat.isFile()) {
    return TEXT_EXTENSIONS.has(extensionOf(path)) ? [path] : [];
  }

  return readdirSync(path)
    .flatMap((entry) => listTextFiles(join(path, entry)));
}

const files = ROOTS.flatMap(listTextFiles)
  .filter((file) => !EXCLUDED_FILES.has(file));
const utf8Decoder = new TextDecoder('utf-8', { fatal: true });

for (const file of files) {
  const bytes = readFileSync(file);
  let text;

  assert.doesNotThrow(
    () => {
      text = utf8Decoder.decode(bytes);
    },
    `${file} should be valid UTF-8`,
  );

  assert.ok(!text.includes('\uFFFD'), `${file} should not contain replacement characters`);

  const hits = COMMON_CHINESE_MOJIBAKE.filter((pattern) => text.includes(pattern));
  assert.deepEqual(hits, [], `${file} appears to contain mojibake fragments: ${hits.join(', ')}`);
}
