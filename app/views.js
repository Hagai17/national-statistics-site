// views.js — one render function per page of the Ledger.
//
// Each page is a string of HTML built from the figures in data.js, so the
// numbers a visitor reads are always the numbers data.js holds. Two pages
// carry a working control: Provinces can sort its table, Economy can switch
// its chart between growth and inflation. The controls keep their state in
// this module and re-render the page when pressed.

import {
  COUNTRY, HEADLINES, CENSUS, CENSUS_SOURCE, PEOPLE_FACTS, TOP_PROVINCES,
  PROVINCE_SOURCE, GROWTH, GROWTH_SOURCE, SECTORS, SECTOR_SOURCE,
  INFLATION, INFLATION_SOURCE, ARRIVALS, ARRIVALS_SOURCE, POVERTY,
  POVERTY_SOURCE, LIVING_FACTS, ECONOMY_FACTS, SOURCE_NOTES,
} from './data.js';
import { lineChart, barChart, censusChart } from './charts.js';

let provinceSort = 'pop';
let economySeries = 'growth';

export function setProvinceSort(mode) { provinceSort = mode; }
export function setEconomySeries(mode) { economySeries = mode; }

function whole(n) {
  return Number(n).toLocaleString('en-US');
}

function millions(n) {
  return `${(n / 1000000).toFixed(1)}m`;
}

function head(title, lede) {
  return `<div class="page-head"><h2>${title}</h2><p class="lede">${lede}</p></div>`;
}

function sourceLine(text) {
  return `<p class="chart-source">Source: ${text}</p>`;
}

function statCards() {
  return `<div class="cards">${HEADLINES.map((c) => `
    <article class="stat-card">
      <div class="label">${c.label}</div>
      <div class="value">${c.value}</div>
      <p class="detail">${c.detail}</p>
      <p class="source">${c.source}</p>
    </article>`).join('')}
  </div>`;
}

function factGrid(facts) {
  return `<div class="fact-grid">${facts.map((f) => `
    <div class="fact">
      <div class="label">${f.label}</div>
      <div class="value">${f.value}</div>
      ${f.detail ? `<div class="label">${f.detail}</div>` : ''}
      <div class="source">${f.source}</div>
    </div>`).join('')}
  </div>`;
}

// ---- Overview: the six headline cards, the population story, and a map of
// the rest of the Ledger so a first-time visitor knows where to look.
function renderOverview() {
  return `
  ${head('Indonesia in numbers', 'The world’s fourth most populous country, the largest economy in Southeast Asia, and an archipelago of more than 17,000 islands — counted, sourced, and kept in one ledger.')}
  ${statCards()}
  <section class="section">
    <h3>How the population grew</h3>
    <p class="section-note">Every census since 1971, plus the latest projection. Indonesia passed 200 million people around the turn of the century and 280 million in the mid-2020s.</p>
    <div class="chart-box">
      <p class="chart-title">Population at each census, millions of people</p>
      ${censusChart(CENSUS)}
      ${sourceLine(CENSUS_SOURCE)}
    </div>
  </section>
  <section class="section two-col">
    <div class="callout">
      <h4>Indonesia at a glance</h4>
      <p><strong>${COUNTRY.provinces} provinces</strong> across ${COUNTRY.islands} islands, from Aceh in the west to Papua in the east. The capital is ${COUNTRY.capital}; the land area is ${COUNTRY.landArea}.</p>
      <p>More than half the population — 55.7% — lives on Java, an island smaller than Great Britain. That one fact shapes almost every other number in this ledger.</p>
    </div>
    <div class="callout">
      <h4>Where to look next</h4>
      <p><a href="#/people">People</a> — who lives here, and where.</p>
      <p><a href="#/economy">Economy</a> — growth, industries, prices and visitors.</p>
      <p><a href="#/provinces">Provinces</a> — the ten largest, ranked.</p>
      <p><a href="#/living">Living</a> — poverty, work and the cost of life.</p>
    </div>
  </section>`;
}

// ---- People: the facts of who lives here, and where they concentrate.
function renderPeople() {
  const top5 = TOP_PROVINCES.slice(0, 5).map((p) => ({
    name: p.name, value: p.people, label: millions(p.people),
  }));
  return `
  ${head('People', '284.4 million people, a median age of just over 30, and a population still growing — but more slowly than a generation ago.')}
  ${factGrid(PEOPLE_FACTS)}
  <section class="section">
    <h3>Where the people are</h3>
    <p class="section-note">Java holds the crowd. The five most populous provinces are all on Java except North Sumatra — and West Java alone holds more people than most countries.</p>
    <div class="chart-box">
      <p class="chart-title">Five largest provinces, 2020 census</p>
      ${barChart(top5)}
      ${sourceLine(PROVINCE_SOURCE)}
    </div>
  </section>
  <section class="section">
    <h3>A young country, ageing slowly</h3>
    <p class="section-note">A median age of 30.4 years and 68.9% of people of working age give Indonesia a demographic dividend: more workers than dependants. Fertility at 2.1 children per woman — replacement level — means that dividend will narrow in the decades ahead. The full provincial ranking is on the <a href="#/provinces">Provinces</a> page.</p>
  </section>`;
}

// ---- Economy: growth and prices on one switchable chart, industries as
// bars, visitors as a recovery story.
function renderEconomy() {
  const series = economySeries === 'growth'
    ? { points: GROWTH.map((g) => ({ x: String(g.year), y: g.pct })), source: GROWTH_SOURCE, title: 'Real GDP growth, % year on year', zero: true }
    : { points: INFLATION.map((g) => ({ x: String(g.year), y: g.pct })), source: INFLATION_SOURCE, title: 'Consumer price inflation, December year on year, %', zero: false };
  return `
  ${head('Economy', 'Southeast Asia’s largest economy grew 5.11% in 2025 — close to the 5.31% rebound peak of 2022 — while inflation stayed inside 2%.')}
  <section class="section">
    <h3>Growth and prices</h3>
    <p class="section-note">Switch the chart to see the two series side by side in your head: growth dipped below zero only in the pandemic year, 2020; inflation spiked once, in 2022, and fell back fast.</p>
    <div class="controls" role="group" aria-label="Choose the chart series">
      <button type="button" data-action="economy-series" data-value="growth" aria-pressed="${economySeries === 'growth'}">GDP growth</button>
      <button type="button" data-action="economy-series" data-value="inflation" aria-pressed="${economySeries === 'inflation'}">Inflation</button>
    </div>
    <div class="chart-box">
      <p class="chart-title">${series.title}</p>
      ${lineChart(series.points, { unit: '%', decimals: 2, zeroLine: series.zero })}
      ${sourceLine(series.source)}
    </div>
  </section>
  <section class="section">
    <h3>What the economy makes</h3>
    <p class="section-note">Manufacturing is the single largest industry at 19% of GDP; trade and farming each add about 13%.</p>
    <div class="chart-box">
      <p class="chart-title">Share of GDP by industry, 2024</p>
      ${barChart(SECTORS.map((s) => ({ name: s.name, value: s.pct, label: `${s.pct}%` })), { accent: '#b97f16' })}
      ${sourceLine(SECTOR_SOURCE)}
    </div>
  </section>
  <section class="section">
    <h3>Visitors are back</h3>
    <p class="section-note">International arrivals collapsed from 16.11 million in 2019 to 1.56 million in 2021, then climbed every year since — 15.39 million in 2025, within a million of the pre-pandemic peak.</p>
    <div class="chart-box">
      <p class="chart-title">International visitor arrivals, millions</p>
      ${lineChart(ARRIVALS.map((a) => ({ x: String(a.year), y: a.millions })), { unit: 'm', decimals: 2 })}
      ${sourceLine(ARRIVALS_SOURCE)}
    </div>
  </section>
  ${factGrid(ECONOMY_FACTS)}`;
}

// ---- Provinces: the full top-ten table, sortable two ways.
function renderProvinces() {
  const rows = [...TOP_PROVINCES].sort((a, b) =>
    provinceSort === 'name' ? a.name.localeCompare(b.name) : b.people - a.people);
  const max = TOP_PROVINCES[0].people;
  return `
  ${head('Provinces', 'Indonesia has 38 provinces. These ten hold the bulk of the population — West Java alone counts 48.3 million people, more than the whole of Canada.')}
  <section class="section">
    <div class="controls" role="group" aria-label="Sort the province table">
      <button type="button" data-action="province-sort" data-value="pop" aria-pressed="${provinceSort === 'pop'}">Most populous first</button>
      <button type="button" data-action="province-sort" data-value="name" aria-pressed="${provinceSort === 'name'}">Alphabetical</button>
    </div>
    <table class="ledger-table">
      <thead><tr><th>#</th><th>Province</th><th>Capital</th><th class="num">People, 2020</th><th class="bar-cell">Share of the largest</th></tr></thead>
      <tbody>
        ${rows.map((p, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${p.name}</strong></td>
          <td>${p.capital}</td>
          <td class="num">${whole(p.people)}</td>
          <td class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:${Math.round((p.people / max) * 100)}%"></div></div></td>
        </tr>`).join('')}
      </tbody>
    </table>
    ${sourceLine(PROVINCE_SOURCE)}
    <p class="section-note">Jakarta is listed by its 2020 census count; as the Special Capital Region it is governed differently from the other provinces. The remaining 28 provinces each count fewer than 6.5 million people.</p>
  </section>`;
}

// ---- Living: poverty falling, work informal, and what a month costs.
function renderLiving() {
  return `
  ${head('Living', 'Poverty has fallen every March since its 2021 peak, to 8.07% — the lowest in the series. Work, though, is still mostly informal.')}
  <section class="section">
    <h3>Poverty, year by year</h3>
    <p class="section-note">The poverty rate is measured each March by the National Socio-Economic Survey. It peaked at 10.14% in the pandemic year 2021 and has fallen every March since.</p>
    <div class="chart-box">
      <p class="chart-title">Poverty rate, % of the population, each March</p>
      ${lineChart(POVERTY.map((p) => ({ x: String(p.year), y: p.pct })), { unit: '%', decimals: 2 })}
      ${sourceLine(POVERTY_SOURCE)}
    </div>
  </section>
  ${factGrid(LIVING_FACTS)}
  <section class="section">
    <h3>Reading the poverty line</h3>
    <p class="section-note">The line — Rp 609,160 per person per month in March 2025 — is what BPS reckons a person needs for basic food and non-food needs. 22.93 million people lived below it in March 2026. At the same time 59.4% of workers were informal, without a formal contract or social protection — the number that explains why falling poverty and everyday precarity can both be true.</p>
  </section>`;
}

// ---- Sources: who counted what, and how this ledger treats the numbers.
function renderSources() {
  return `
  ${head('Sources &amp; method', 'A statistics site is only as good as its sources. Here is every one the Ledger uses, what it covers, and how the numbers are handled.')}
  <section class="section">
    <h3>Sources</h3>
    <ul class="source-list">
      ${SOURCE_NOTES.map((s) => `
      <li>
        <div class="name">${s.name}</div>
        <p class="covers">${s.covers}</p>
        <div class="link">${s.link}</div>
      </li>`).join('')}
    </ul>
  </section>
  <section class="section">
    <h3>How the Ledger works</h3>
    <ol class="method-list">
      <li><strong>Figures are printed as published.</strong> Rounding follows the source: BPS reports poverty to two decimals, GDP growth to two, census counts to the person.</li>
      <li><strong>Provisional figures are labelled.</strong> The 2025 visitor arrivals and the mid-2025 population are estimates, and the page says so next to the number.</li>
      <li><strong>Every chart carries its source.</strong> If a number has no source line, it is not on this site.</li>
      <li><strong>Nothing is fetched live.</strong> All figures ship inside the site's own files, so the numbers you see are the numbers that were checked — they do not change between visits.</li>
      <li><strong>Updates.</strong> The Ledger is refreshed when BPS publishes a new release; the dateline at the top of every page gives the date of the current edition.</li>
    </ol>
  </section>`;
}

export const PAGES = {
  overview: renderOverview,
  people: renderPeople,
  economy: renderEconomy,
  provinces: renderProvinces,
  living: renderLiving,
  sources: renderSources,
};

export function renderPage(route) {
  const render = PAGES[route] ?? PAGES.overview;
  return render();
}
