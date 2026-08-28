#!/usr/bin/env node
/**
 * Backfill real star history: walk the GitHub stargazers API with the
 * application/vnd.github.star+json preview (each entry carries starred_at)
 * and rebuild docs/stats-history.json so the purple line reflects the true
 * day-by-day star growth since the repository was created.
 *
 * npm downloads stay untouched (they genuinely start at publish day).
 * Usage: node scripts/backfill-stars.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const historyPath = join(root, 'docs', 'stats-history.json');
const REPO = 'niiang/dsh-kimino-theme';
const REPO_CREATED = '2026-08-16'; // repository creation date (issue/API verified)

const headers = {
  'user-agent': 'dsh-kimino-theme-stats',
  accept: 'application/vnd.github.star+json',
};
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function fetchStars() {
  const stars = [];
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/stargazers?per_page=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`${res.status} fetching stargazers page ${page}`);
    const batch = await res.json();
    for (const s of batch) stars.push((s.starred_at ?? '').slice(0, 10));
    if (batch.length < 100) break;
  }
  return stars.filter(Boolean).sort();
}

function dayRange(from, to) {
  const days = [];
  const d = new Date(from + 'T00:00:00Z');
  const end = new Date(to + 'T00:00:00Z');
  while (d <= end) {
    days.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return days;
}

const stars = await fetchStars();
console.log(`fetched ${stars.length} stargazers with timestamps`);
const counts = new Map();
for (const day of stars) counts.set(day, (counts.get(day) ?? 0) + 1);

let history = existsSync(historyPath) ? JSON.parse(readFileSync(historyPath, 'utf8')) : [];
const byDate = new Map(history.map((p) => [p.date, p]));
const today = new Date().toISOString().slice(0, 10);

let running = 0;
for (const day of dayRange(REPO_CREATED, today)) {
  running += counts.get(day) ?? 0;
  const p = byDate.get(day) ?? { date: day };
  p.stars = running;
  byDate.set(day, p);
}
// keep any future-dated points (none expected)
history = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
// downloads only exist from publish day onward — leave zeros implicit
for (const p of history) if (p.downloads === undefined) p.downloads = 0;

writeFileSync(historyPath, JSON.stringify(history, null, 2) + '\n', 'utf8');
console.log(`history rebuilt: ${history.length} days, final stars=${running}`);
