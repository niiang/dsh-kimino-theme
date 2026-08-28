#!/usr/bin/env node
/**
 * Growth chart generator: daily npm downloads (cumulative, cyan, left axis)
 * and GitHub stars (purple, right axis) rendered into docs/stats.svg.
 *
 * Data history is cached in docs/stats-history.json — one point per day,
 * appended idempotently (re-running the same day updates the last point).
 * Zero dependencies: plain Node (>= 18) with global fetch.
 *
 * Usage: node scripts/gen-stats.mjs
 * Env:   GITHUB_TOKEN (optional, for star lookup rate headroom)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const historyPath = join(root, 'docs', 'stats-history.json');
const svgPath = join(root, 'docs', 'stats.svg');
const PKG = 'dsh-kimino-theme';
const REPO = 'niiang/dsh-kimino-theme';

const today = () => new Date().toISOString().slice(0, 10);

async function fetchJson(url) {
  const headers = { 'user-agent': `${PKG}-stats` };
  if (process.env.GITHUB_TOKEN && url.includes('api.github.com')) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function collect() {
  // Full range from package creation to today — npm returns daily counts.
  const start = '2026-08-26';
  const end = today();
  const dl = await fetchJson(`https://api.npmjs.org/downloads/range/${start}:${end}/${PKG}`);
  const perDay = dl.downloads ?? [];
  let running = 0;
  const downloadsByDay = new Map();
  for (const d of perDay) {
    running += d.downloads;
    downloadsByDay.set(d.day, running);
  }
  const meta = await fetchJson(`https://api.github.com/repos/${REPO}`);
  return { downloadsByDay, stars: meta.stargazers_count ?? 0 };
}

function mergeHistory({ downloadsByDay, stars }) {
  let history = [];
  if (existsSync(historyPath)) {
    try { history = JSON.parse(readFileSync(historyPath, 'utf8')); } catch { history = []; }
  }
  for (const [day, cumulative] of downloadsByDay) {
    const existing = history.find((p) => p.date === day);
    if (existing) existing.downloads = cumulative;
    else history.push({ date: day, downloads: cumulative });
  }
  history.sort((a, b) => a.date.localeCompare(b.date));
  const t = today();
  const last = history[history.length - 1];
  if (last && last.date === t) last.stars = stars;
  else if (last && last.date < t && last.stars === undefined) {
    // first run mid-life: backfill stars on the newest point
    last.stars = stars;
  } else if (!last || last.date < t) {
    history.push({ date: t, downloads: last ? last.downloads : 0, stars });
  }
  // carry stars backward for older points missing them (chart continuity)
  let carry = null;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].stars !== undefined) carry = history[i].stars;
    else if (carry !== null) history[i].stars = carry;
  }
  mkdirSync(dirname(historyPath), { recursive: true });
  writeFileSync(historyPath, JSON.stringify(history, null, 2) + '\n', 'utf8');
  return history;
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function render(history) {
  const W = 900, H = 400;
  const M = { top: 46, right: 86, bottom: 46, left: 86 };
  const pw = W - M.left - M.right, ph = H - M.top - M.bottom;
  const n = Math.max(history.length, 2);
  const x = (i) => M.left + (n === 1 ? pw : (i / (n - 1)) * pw);
  const maxD = Math.max(4, ...history.map((p) => p.downloads ?? 0));
  const maxS = Math.max(4, ...history.map((p) => p.stars ?? 0));
  const yL = (v) => M.top + ph - (v / (maxD * 1.08)) * ph;
  const yR = (v) => M.top + ph - (v / (maxS * 1.15)) * ph;
  const fmt = (v) => v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(v);
  const nice = (v) => Math.round(v);

  const ptsL = history.map((p, i) => `${x(i).toFixed(1)},${yL(p.downloads ?? 0).toFixed(1)}`);
  const ptsR = history.map((p, i) => `${x(i).toFixed(1)},${yR(p.stars ?? 0).toFixed(1)}`);
  const lastP = history[history.length - 1] ?? { downloads: 0, stars: 0, date: today() };

  const gridLines = [];
  for (let g = 0; g <= 4; g++) {
    const yy = M.top + (ph / 4) * g;
    gridLines.push(`<line x1="${M.left}" y1="${yy}" x2="${W - M.right}" y2="${yy}" stroke="#8b949e" stroke-opacity="0.22" stroke-width="1"/>`);
    const dv = maxD * 1.08 * (1 - g / 4);
    const sv = maxS * 1.15 * (1 - g / 4);
    gridLines.push(`<text x="${M.left - 10}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#1f6feb">${fmt(nice(dv))}</text>`);
    gridLines.push(`<text x="${W - M.right + 10}" y="${yy + 4}" text-anchor="start" font-size="11" fill="#8957e5">${fmt(nice(sv))}</text>`);
  }

  const step = Math.max(1, Math.ceil(n / 6));
  const xTicks = history.map((p, i) => (i % step === 0 || i === n - 1)
    ? `<text x="${x(i).toFixed(1)}" y="${H - M.bottom + 20}" text-anchor="middle" font-size="11" fill="#8b949e">${esc(p.date.slice(5))}</text>` : '').join('');

  const dots = history.map((p, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${yL(p.downloads ?? 0).toFixed(1)}" r="2.6" fill="#1f6feb"/><circle cx="${x(i).toFixed(1)}" cy="${yR(p.stars ?? 0).toFixed(1)}" r="2.6" fill="#8957e5"/>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
<rect width="${W}" height="${H}" fill="rgba(0,0,0,0)" rx="12"/>
<text x="${W / 2}" y="24" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2328">${PKG} · growth</text>
<circle cx="${W / 2 - 150}" cy="24" r="0"/>
<text x="${M.left}" y="24" font-size="12" fill="#1f6feb">downloads (cumulative)</text>
<text x="${W - M.right}" y="24" text-anchor="end" font-size="12" fill="#8957e5">stars</text>
${gridLines.join('\n')}
${xTicks}
<polyline points="${ptsL.join(' ')}" fill="none" stroke="#1f6feb" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<polyline points="${ptsR.join(' ')}" fill="none" stroke="#8957e5" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="1 0"/>
${dots}
<text x="${x(history.length - 1).toFixed(1)}" y="${(yL(lastP.downloads ?? 0) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#1f6feb">${fmt(lastP.downloads ?? 0)}</text>
<text x="${x(history.length - 1).toFixed(1)}" y="${(yR(lastP.stars ?? 0) + 20).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#8957e5">${fmt(lastP.stars ?? 0)}</text>
</svg>
`;
}

const data = await collect();
const history = mergeHistory(data);
mkdirSync(dirname(svgPath), { recursive: true });
writeFileSync(svgPath, render(history), 'utf8');
console.log(`stats updated: ${history.length} day(s), latest downloads=${history[history.length - 1].downloads}, stars=${history[history.length - 1].stars}`);
