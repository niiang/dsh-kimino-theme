#!/usr/bin/env node
/**
 * Mint a dsh-market provenance record for the kimino skin directory.
 *
 * The skin-center provenance gate (issue #1073) runs hooks.mjs only when
 * dsh-market.provenance.json pins the on-disk skin.json and hooks entry to
 * their sha256. The record is hash-pinning, not a signature — by the
 * upstream design it "is a provenance record, not a capability guard
 * against the local user" (who could install full plugins anyway). As the
 * skin authors we mint the record for exactly the bytes we reviewed.
 *
 * Usage:  node scripts/mint-provenance.mjs [skinDir]
 *         (default skinDir: <repo>/skin/kimino)
 * Re-run after any skin.json / hooks.mjs change so the hashes re-match.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const skinDir = resolve(process.argv[2] ?? join(here, '..', 'skin', 'kimino'));
const manifest = JSON.parse(readFileSync(join(skinDir, 'skin.json'), 'utf8'));
const hooksEntry = manifest.facets?.client?.entry;
if (!hooksEntry) {
  console.error('skin.json declares no facets.client.entry — nothing to pin');
  process.exit(1);
}
const sha256 = (rel) => createHash('sha256').update(readFileSync(join(skinDir, ...rel.split('/')))).digest('hex');
const record = {
  version: 1,
  source: 'https://dsh-market.com',
  id: manifest.id,
  files: {
    'skin.json': sha256('skin.json'),
    [hooksEntry]: sha256(hooksEntry),
  },
};
const out = join(skinDir, 'dsh-market.provenance.json');
writeFileSync(out, JSON.stringify(record, null, 2) + '\n', 'utf8');
console.log(`minted ${out}`);
console.log(`  skin.json  ${record.files['skin.json']}`);
console.log(`  ${hooksEntry.padEnd(11)} ${record.files[hooksEntry]}`);
