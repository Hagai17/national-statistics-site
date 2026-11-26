// charts.js — small SVG chart builders. One job: turn data rows into inline
// SVG strings (bars, lines, donut). No library, no canvas: the charts print
// in screenshots exactly as they render in the browser, and every value is
// labelled so a chart is readable without hovering.

const NS = 'http://www.w3.org/2000/svg';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// Vertical bar chart. rows: [{label, value, display, highlight}]
// opts: {width, height, color, highlightColor, unit}
export function barChart(rows, opts = {}) {
  const width = opts.width ?? 720;
  const height = opts.height ?? 300;
  const color = opts.color ?? '#b3352b';
  const highlightColor = opts.highlightColor ?? '#14635d';
  const padTop = 26, padBottom = 30, padX = 8;
  const max = Math.max(...rows.map((r) => r.value)) * 1.08;
  const slot = (width - padX * 2) / rows.length;
  const barW = Math.min(64, slot * 0.62);
  const base = height - padBottom;
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart" aria-label="${esc(opts.aria ?? 'Bar chart')}">`;
  out += `<line x1="${padX}" y1="${base}" x2="${width - padX}" y2="${base}" class="axis"/>`;
  rows.forEach((r, i) => {
    const h = Math.max(2, (r.value / max) * (base - padTop));
    const x = padX + slot * i + (slot - barW) / 2;
    const y = base - h;
    const fill = r.highlight ? highlightColor : color;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" fill="${fill}" rx="3"/>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" class="chart-value">${esc(r.display)}</text>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${base + 19}" class="chart-label">${esc(r.label)}</text>`;
  });
  return out + '</svg>';
}

// Line chart with dots and value labels. rows: [{label, value, display}]
// Handles negative values (a zero line is drawn when the range crosses 0).
export function lineChart(rows, opts = {}) {
  const width = opts.width ?? 720;
  const height = opts.height ?? 300;
  const color = opts.color ?? '#b3352b';
  const padTop = 30, padBottom = 30, padX = 34;
  let min = Math.min(0, ...rows.map((r) => r.value));
  let max = Math.max(...rows.map((r) => r.value));
  const span = (max - min) || 1;
  min -= span * 0.12;
  max += span * 0.18;
  const x = (i) => padX + (i * (width - padX * 2)) / (rows.length - 1);
  const y = (v) => padTop + ((max - v) / (max - min)) * (height - padTop - padBottom);
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart" aria-label="${esc(opts.aria ?? 'Line chart')}">`;
  if (min < 0) out += `<line x1="${padX}" y1="${y(0)}" x2="${width - padX}" y2="${y(0)}" class="axis"/>`;
  const pts = rows.map((r, i) => `${x(i).toFixed(1)},${y(r.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  rows.forEach((r, i) => {
    out += `<circle cx="${x(i)}" cy="${y(r.value)}" r="4.5" fill="${color}"/>`;
    const dy = r.value < 0 ? 18 : -10;
    out += `<text x="${x(i)}" y="${y(r.value) + dy}" class="chart-value">${esc(r.display)}</text>`;
    out += `<text x="${x(i)}" y="${height - 8}" class="chart-label">${esc(r.label)}</text>`;
  });
  return out + '</svg>';
}

// Donut chart with a legend list. parts: [{name, pct}]
export function donutChart(parts, opts = {}) {
  const size = opts.size ?? 240;
  const colors = opts.colors ?? ['#b3352b', '#14635d', '#d9903f', '#4a6fa5', '#8a8d93'];
  const r = size / 2 - 6;
  const cx = size / 2, cy = size / 2;
  const inner = r * 0.58;
  let angle = -Math.PI / 2;
  let out = `<svg viewBox="0 0 ${size} ${size}" role="img" class="chart donut" aria-label="${esc(opts.aria ?? 'Donut chart')}">`;
  parts.forEach((p, i) => {
    const sweep = (p.pct / 100) * Math.PI * 2;
    const a0 = angle, a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const ix1 = cx + inner * Math.cos(a1), iy1 = cy + inner * Math.sin(a1);
    const ix0 = cx + inner * Math.cos(a0), iy0 = cy + inner * Math.sin(a0);
    out += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${ix1.toFixed(1)} ${iy1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${ix0.toFixed(1)} ${iy0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
  });
  out += `<text x="${cx}" y="${cy - 2}" class="donut-center">GDP</text>`;
  out += `<text x="${cx}" y="${cy + 17}" class="donut-sub">by sector</text>`;
  return out + '</svg>';
}

export function donutLegend(parts, opts = {}) {
  const colors = opts.colors ?? ['#b3352b', '#14635d', '#d9903f', '#4a6fa5', '#8a8d93'];
  const items = parts
    .map((p, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(p.name)} — <strong>${p.pct}%</strong></li>`)
    .join('');
  return `<ul class="legend">${items}</ul>`;
}
