#!/usr/bin/env node
/**
 * Materialize the two skin variants (kimino static / kimino-live dynamic)
 * from the single source of truth in skin/shared/.
 *
 *   skin/shared/            css / hooks / logos / still previews  (edit HERE)
 *   skin/kimino/skin.json   static manifest                      (variant config)
 *   skin/kimino-live/skin.json  live manifest + wallpaper.mp4     (variant config)
 *   docs/screenshots/live-wallpaper.gif  animated preview source
 *
 * Run after any shared change:  node scripts/build-skins.mjs
 * (then re-run scripts/mint-provenance.mjs for each variant dir if
 *  skin.json or hooks.mjs bytes changed.)
 */
import { copyFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const shared = join(root, 'skin', 'shared');
const gif = join(root, 'docs', 'screenshots', 'live-wallpaper.gif');

const VARIANTS = [
  { dir: join(root, 'skin', 'kimino'), id: 'kimino', animated: false },
  { dir: join(root, 'skin', 'kimino-live'), id: 'kimino-live', animated: true },
];

let failed = false;
for (const v of VARIANTS) {
  const manifestPath = join(v.dir, 'skin.json');
  if (!existsSync(manifestPath)) { console.error(`${v.id}: skin.json missing`); failed = true; continue; }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  // 1) shared code & styles
  for (const f of ['skin.css', 'patches.css', 'hooks.mjs']) {
    copyFileSync(join(shared, f), join(v.dir, f));
  }
  // 2) logos
  mkdirSync(join(v.dir, 'assets'), { recursive: true });
  copyFileSync(join(shared, 'logo-blue.svg'), join(v.dir, 'assets', 'logo-blue.svg'));
  copyFileSync(join(shared, 'logo-letter.svg'), join(v.dir, 'assets', 'logo-letter.svg'));
  // 3) previews per manifest
  mkdirSync(join(v.dir, 'preview'), { recursive: true });
  const wanted = new Set();
  for (const key of ['light', 'dark']) {
    const src = manifest.preview?.[key];
    if (src) wanted.add(src.replace(/^preview\//, ''));
  }
  if (wanted.has('light.png')) copyFileSync(join(shared, 'preview-light.png'), join(v.dir, 'preview', 'light.png'));
  if (wanted.has('dark.png')) copyFileSync(join(shared, 'preview-dark.png'), join(v.dir, 'preview', 'dark.png'));
  if (wanted.has('live.gif')) {
    if (!existsSync(gif)) { console.error(`${v.id}: live.gif preview wanted but docs gif missing`); failed = true; }
    else copyFileSync(gif, join(v.dir, 'preview', 'live.gif'));
  }
  // 4) background asset present?
  for (const key of ['light', 'dark']) {
    const src = manifest.contributes?.backgroundMedia?.[key]?.src;
    if (src && !existsSync(join(v.dir, src))) { console.error(`${v.id}: background ${src} missing`); failed = true; }
  }
  // 5) sanity: id matches dir intent
  if (manifest.id !== v.id) { console.error(`${v.id}: manifest id mismatch (${manifest.id})`); failed = true; }
  console.log(`${v.id}: materialized (${manifest.contributes.backgroundMedia.light.type} background)`);
}
if (failed) process.exit(1);
console.log('both variants built from shared/');
