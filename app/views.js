// views.js — the pages of The Archipelago Ledger. One job: turn the figures
// in data.js into HTML for each route. The router in main.js picks a view;
// charts come from charts.js. Every figure is printed with its source and
// year next to it — that is the site's promise.

import {
  COUNTRY, HEADLINES, CENSUS, CENSUS_SOURCE, PEOPLE_FACTS, TOP_PROVINCES,
  PROVINCE_SOURCE, GDP_GROWTH, GDP_GROWTH_SOURCE, SECTORS, SECTOR_SOURCE,
  INFLATION, INFLATION_SOURCE, ARRIVALS, ARRIVALS_SOURCE, POVERTY,
  POVERTY_SOURCE, LIVING_FACTS, ECONOMY_FACTS,
} from './data.js';
import { barChart, lineChart, donutChart, donutLegend } from './charts.js';

const fmt = (n) => n.toLocaleString('en-US');
const millions = (n) => (n / 1e6).toFixed(1);

function statCards(facts) {
  return `<div class="stat-grid">${facts
    .map((f) => `<div class="stat"><span class="stat-value">${f.value}</span>${f.unit ? `<span class="stat-unit">${f.unit}</span>` : ''}<span class="stat-label">${f.label}</span><span class="stat-source">${f.source}${f.year ? `, ${f.year}` : ''}</span></div>`)
    .join('')}</div>`;
}

function factList(facts) {
  return `<dl class="fact-list">${facts
    .map((f) => `<div><dt>${f.label}</dt><dd><strong>${f.value}</strong>${f.unit ? ` <span>${f.unit}</span>` : ''}<br><small>${f.source}</small></dd></div>`)
    .join('')}</dl>`;
}

// A chart with a working Chart/Table toggle: the same numbers, two ways.
function chartCard(title, source, chartSvg, tableHtml) {
  return `<section class="card">
    <div class="card-head"><h2>${title}</h2>
    <div class="toggle" role="group" aria-label="View as chart or table">
      <button type="button" class="toggle-btn is-on" data-view="chart">Chart</button>
      <button type="button" class="toggle-btn" data-view="table">Table</button>
    </div></div>
    <div class="chart-wrap">${chartSvg}</div>
    <div class="table-wrap" hidden>${tableHtml}</div>
    <p class="source-line">Source: ${source}</p>
  </section>`;
}

function simpleTable(headers, rows) {
  return `<table class="data-table"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;
}

export function overviewView() {
  const censusChart = barChart(
    CENSUS.map((c) => ({ label: String(c.year), value: c.people / 1e6, display: millions(c.people), highlight: !!c.estimate })),
    { aria: 'Population of Indonesia by census year, in millions' },
  );
  const censusTable = simpleTable(
    ['Count', 'People'],
    CENSUS.map((c) => [`${c.year}${c.estimate ? ' (estimate)' : ' census'}`, fmt(c.people)]),
  );
  return `
  <section class="hero">
    <p class="kicker">National statistics of ${COUNTRY.name}</p>
    <h1>A country of 284 million people,<br>told in its own numbers.</h1>
    <p class="lede">The Archipelago Ledger gathers the official figures for the world's fourth most
    populous country — ${COUNTRY.islands} islands, ${COUNTRY.provinces} provinces, one capital at
    ${COUNTRY.capital} — and prints every number with the source and year it came from.</p>
  </section>
  ${statCards(HEADLINES)}
  ${chartCard('Population at each census, millions', CENSUS_SOURCE, censusChart, censusTable)}
  <section class="card">
    <h2>Indonesia in the world</h2>
    ${factList([
      { label: 'Share of world population', value: '3.5%', source: 'UN World Population Prospects, 2025' },
      { label: 'World rank by GDP', value: '16th', source: 'World Bank, 2024' },
      { label: 'In Southeast Asia', value: 'Largest economy, most people', source: 'World Bank, 2024' },
      { label: 'Domestic tourist trips', value: '1.02 billion a year', source: 'BPS, 2024' },
    ])}
  </section>
  <section class="card">
    <h2>Explore the country</h2>
    <div class="link-grid">
      <a class="link-card" href="#/people"><strong>People</strong><span>Who Indonesians are: age, cities, provinces and how the population grew.</span></a>
      <a class="link-card" href="#/economy"><strong>Economy</strong><span>Growth, sectors, prices and the visitors who come to see the country.</span></a>
      <a class="link-card" href="#/living"><strong>Living standards</strong><span>Poverty, work and inequality — the figures that describe daily life.</span></a>
      <a class="link-card" href="#/provinces"><strong>Provinces</strong><span>The ten most populous provinces, searchable and sortable.</span></a>
    </div>
  </section>`;
}

export function peopleView() {
  const censusChart = barChart(
    CENSUS.map((c) => ({ label: String(c.year), value: c.people / 1e6, display: millions(c.people), highlight: !!c.estimate })),
    { aria: 'Population of Indonesia by census year, in millions' },
  );
  const censusTable = simpleTable(
    ['Count', 'People'],
    CENSUS.map((c) => [`${c.year}${c.estimate ? ' (estimate)' : ' census'}`, fmt(c.people)]),
  );
  const provChart = barChart(
    TOP_PROVINCES.slice(0, 6).map((p) => ({ label: p.name, value: p.people / 1e6, display: millions(p.people) })),
    { aria: 'Six most populous provinces, in millions', color: '#14635d' },
  );
  const provTable = simpleTable(
    ['Province', 'People (2020)', 'Capital'],
    TOP_PROVINCES.map((p) => [p.name, fmt(p.people), p.capital]),
  );
  return `
  <section class="page-head">
    <p class="kicker">People</p>
    <h1>Who lives in Indonesia</h1>
    <p class="lede">The population has more than doubled since 1971. Growth is slowing — about
    1.1% a year in 2025 (BPS) — and the country is urbanising: nearly six in ten Indonesians
    now live in towns and cities.</p>
  </section>
  ${chartCard('Population at each census, millions', CENSUS_SOURCE, censusChart, censusTable)}
  <section class="card"><h2>The shape of the population</h2>${factList(PEOPLE_FACTS)}</section>
  ${chartCard('The six largest provinces, millions (2020)', PROVINCE_SOURCE, provChart, provTable)}
  <p class="note">Three Javanese provinces — West, East and Central Java — hold 125.5 million
  people between them, 46% of the country (BPS, 2020 Census). The full provincial table is on
  the <a href="#/provinces">Provinces page</a>.</p>`;
}

export function economyView() {
  const growthChart = lineChart(
    GDP_GROWTH.map((g) => ({ label: String(g.year), value: g.pct, display: `${g.pct.toFixed(2)}%` })),
    { aria: 'GDP growth by year, percent' },
  );
  const growthTable = simpleTable(['Year', 'GDP growth'], GDP_GROWTH.map((g) => [g.year, `${g.pct.toFixed(2)}%`]));
  const inflationChart = lineChart(
    INFLATION.map((g) => ({ label: String(g.year), value: g.pct, display: `${g.pct.toFixed(2)}%` })),
    { aria: 'Inflation each December, percent', color: '#14635d' },
  );
  const inflationTable = simpleTable(['December', 'Inflation (year on year)'], INFLATION.map((g) => [g.year, `${g.pct.toFixed(2)}%`]));
  const arrivalsChart = barChart(
    ARRIVALS.map((a) => ({ label: String(a.year), value: a.m, display: a.m.toFixed(2), highlight: !!a.provisional })),
    { aria: 'International visitor arrivals by year, in millions', color: '#d9903f' },
  );
  const arrivalsTable = simpleTable(['Year', 'Arrivals'], ARRIVALS.map((a) => [a.year, `${a.m.toFixed(2)} million${a.provisional ? ' (provisional)' : ''}`]));
  return `
  <section class="page-head">
    <p class="kicker">Economy</p>
    <h1>Southeast Asia's largest economy</h1>
    <p class="lede">Indonesia's GDP reached Rp 23,821 trillion in 2025 (BPS) — about US$1.40
    trillion in 2024 (World Bank). Growth has held near 5% a year since the pandemic rebound,
    and prices have calmed after the 2022 spike.</p>
  </section>
  ${statCards(ECONOMY_FACTS.map((f) => ({ ...f, year: '' })))}
  ${chartCard('GDP growth, percent year on year', GDP_GROWTH_SOURCE, growthChart, growthTable)}
  <section class="card">
    <h2>What the economy makes</h2>
    <div class="donut-row">${donutChart(SECTORS, { aria: 'Shares of GDP by sector' })}${donutLegend(SECTORS)}</div>
    <p class="source-line">Source: ${SECTOR_SOURCE}</p>
  </section>
  ${chartCard('Inflation, December year on year', INFLATION_SOURCE, inflationChart, inflationTable)}
  ${chartCard('International visitors, millions a year', ARRIVALS_SOURCE, arrivalsChart, arrivalsTable)}`;
}

export function livingView() {
  const povertyChart = lineChart(
    POVERTY.map((p) => ({ label: String(p.year), value: p.pct, display: `${p.pct.toFixed(2)}%` })),
    { aria: 'Poverty rate each March, percent', color: '#14635d' },
  );
  const povertyTable = simpleTable(['March', 'Poverty rate'], POVERTY.map((p) => [p.year, `${p.pct.toFixed(2)}%`]));
  return `
  <section class="page-head">
    <p class="kicker">Living standards</p>
    <h1>How life is changing</h1>
    <p class="lede">Poverty fell to 8.07% in March 2026 — the lowest in the series — after rising
    during the pandemic. Work is plentiful but often informal: three in five workers are in
    informal jobs (BPS, February 2025).</p>
  </section>
  ${chartCard('Poverty rate, percent of the population each March', POVERTY_SOURCE, povertyChart, povertyTable)}
  <section class="card"><h2>Work and welfare in figures</h2>${factList(LIVING_FACTS)}</section>
  <p class="note">The poverty line is drawn by BPS from the cost of a basic basket of food and
  non-food needs: Rp 609,160 per person per month in March 2025. Urban poverty (6.73% in March
  2025) runs well below rural poverty (11.03%) — both BPS, Susenas.</p>`;
}

export function provincesView() {
  const rows = TOP_PROVINCES.map(
    (p, i) => `<tr data-name="${p.name.toLowerCase()}"><td>${i + 1}</td><td><strong>${p.name}</strong></td><td>${fmt(p.people)}</td><td>${millions(p.people)} M</td><td>${p.capital}</td></tr>`,
  ).join('');
  return `
  <section class="page-head">
    <p class="kicker">Provinces</p>
    <h1>The ten most populous provinces</h1>
    <p class="lede">Indonesia has ${COUNTRY.provinces} provinces. These ten, from the 2020
    census, hold 196.3 million people — almost three quarters of the country. Search the list
    or sort it with the controls below; both work on this page, offline.</p>
  </section>
  <section class="card">
    <div class="controls">
      <label>Search <input type="search" id="province-search" placeholder="Type a province name…" autocomplete="off"></label>
      <label>Sort by
        <select id="province-sort">
          <option value="rank">Population rank</option>
          <option value="name">Name, A–Z</option>
          <option value="people-desc">People, most first</option>
          <option value="people-asc">People, fewest first</option>
        </select>
      </label>
    </div>
    <table class="data-table" id="province-table">
      <thead><tr><th>#</th><th>Province</th><th>People (2020)</th><th>Millions</th><th>Capital</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="source-line">Source: ${PROVINCE_SOURCE}. West Java has since passed 50 million
    in BPS estimates for 2025 — the census table above stays the comparable count.</p>
  </section>`;
}

export function sourcesView() {
  return `
  <section class="page-head">
    <p class="kicker">Sources &amp; method</p>
    <h1>Where every figure comes from</h1>
    <p class="lede">The Archipelago Ledger republishes official statistics. Nothing here is
    estimated by the site itself: each figure is printed beside its source and year, and the
    full list is below.</p>
  </section>
  <section class="card">
    <h2>Principal sources</h2>
    <ul class="source-list">
      <li><strong>BPS — Statistics Indonesia</strong> (bps.go.id): population censuses 1971–2020 and the mid-2025 projection; national accounts 2019–2025; consumer prices; Susenas poverty rounds to March 2026; Sakernas labour rounds to August 2026; international visitor arrivals to 2025.</li>
      <li><strong>World Bank</strong>, World Development Indicators: GDP in US dollars and at PPP, 2024.</li>
      <li><strong>United Nations</strong>, World Population Prospects: median age, urban share and fertility, 2025.</li>
    </ul>
    <h2>How to read the figures</h2>
    <p>Figures marked <em>provisional</em> or <em>estimate</em> are the publishing agency's own
    labels and may be revised. Census counts are complete enumerations; survey figures
    (poverty, unemployment) come from BPS's national samples, Susenas and Sakernas. Where two
    agencies publish the same quantity — GDP per person, for example — the site prints one and
    names it, rather than blending them.</p>
    <h2>About this site</h2>
    <p>The Archipelago Ledger is an original, independent presentation of public statistics.
    It is not affiliated with BPS or any government body. It runs entirely from its own files:
    no account, no network, nothing to install.</p>
  </section>`;
}
