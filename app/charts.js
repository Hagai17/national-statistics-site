// charts.js — small SVG chart builders for the Ledger.
//
// No library, no canvas: each function returns an SVG string that views.js
// drops into the page. Scales are computed from the data itself, so a new
// series never needs hand-tuned coordinates. All text uses the page's own
// fonts, so nothing is fetched.

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nice(n) {
  return Number(n).toLocaleString('en-US');
}

// A line chart with labelled axes. points: [{ x: '2019', y: 5.02 }, ...].
// opts: { width, height, unit, decimals, zeroLine } — unit is appended to
// the value labels, decimals how many digits the labels carry.
export function lineChart(points, opts = {}) {
  const w = opts.width ?? 880;
  const h = opts.height ?? 300;
  const padL = 52;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const decimals = opts.decimals ?? 1;
  const unit = opts.unit ?? '';

  const values = points.map((p) => p.y);
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  if (lo === hi) { lo -= 1; hi += 1; }
  const span = hi - lo;
  lo -= span * 0.12;
  hi += span * 0.12;

  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const xAt = (i) => padL + (innerW * i) / Math.max(points.length - 1, 1);
  const yAt = (v) => padT + innerH * (1 - (v - lo) / (hi - lo));

  // Four evenly spaced gridlines with their values.
  const grid = [];
  for (let g = 0; g <= 3; g += 1) {
    const v = lo + ((hi - lo) * g) / 3;
    const y = yAt(v);
    grid.push(`<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e7dfcb" stroke-width="1"/>`);
    grid.push(`<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="#4c5a53">${v.toFixed(decimals)}${unit}</text>`);
  }

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.y).toFixed(1)}`).join(' ');
  const dots = points.map((p, i) => {
    const cx = xAt(i).toFixed(1);
    const cy = yAt(p.y).toFixed(1);
    return `<circle cx="${cx}" cy="${cy}" r="4" fill="#0d6b58" stroke="#fffdf6" stroke-width="1.5"/>` +
      `<text x="${cx}" y="${(yAt(p.y) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#1d2b26">${p.y.toFixed(decimals)}${unit}</text>`;
  }).join('');
  const labels = points.map((p, i) => `<text x="${xAt(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#4c5a53">${esc(p.x)}</text>`).join('');

  const zero = opts.zeroLine && lo < 0 && hi > 0
    ? `<line x1="${padL}" y1="${yAt(0)}" x2="${w - padR}" y2="${yAt(0)}" stroke="#a44a3f" stroke-width="1" stroke-dasharray="4 3"/>`
    : '';

  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart">${grid.join('')}${zero}` +
    `<path d="${path}" fill="none" stroke="#0d6b58" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>` +
    `${dots}${labels}</svg>`;
}

// Horizontal bars. rows: [{ name: 'West Java', value: 48274162, label: '48.3m' }].
// The longest bar fills the track; every bar prints its label at the end.
export function barChart(rows, opts = {}) {
  const w = opts.width ?? 880;
  const rowH = 34;
  const labelW = 190;
  const h = rows.length * rowH + 12;
  const max = Math.max(...rows.map((r) => r.value));
  const accent = opts.accent ?? '#0d6b58';

  const body = rows.map((r, i) => {
    const y = 8 + i * rowH;
    const trackW = w - labelW - 90;
    const barW = Math.max(2, (trackW * r.value) / max);
    return `<text x="0" y="${y + 15}" font-size="13" fill="#1d2b26">${esc(r.name)}</text>` +
      `<rect x="${labelW}" y="${y + 4}" width="${trackW}" height="14" fill="#e7dfcb"/>` +
      `<rect x="${labelW}" y="${y + 4}" width="${barW.toFixed(1)}" height="14" fill="${accent}"/>` +
      `<text x="${labelW + barW + 8}" y="${y + 15}" font-size="12" fill="#4c5a53">${esc(r.label ?? nice(r.value))}</text>`;
  }).join('');

  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart">${body}</svg>`;
}

// A compact census line: population in millions, one point per census.
export function censusChart(series) {
  return lineChart(
    series.map((d) => ({ x: String(d.year), y: Math.round(d.people / 100000) / 10 })),
    { unit: 'm', decimals: 1, height: 280 },
  );
}
