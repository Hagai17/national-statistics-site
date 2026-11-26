// data.js — every figure The Archipelago Ledger publishes, with its source
// and year attached. One job: hold the numbers. Rendering lives in views.js,
// chart drawing in charts.js.
//
// Sources: BPS = Statistics Indonesia (Badan Pusat Statistik); WB = World
// Bank World Development Indicators; UN = UN World Population Prospects.

export const COUNTRY = {
  name: 'Indonesia',
  capital: 'Jakarta',
  provinces: 38,
  landAreaKm2: '1,904,569 km²',
  islands: 'more than 17,000',
  sourcesNote: 'BPS country profile; province count since November 2022',
};

// Headline figures for the front page. Each carries value, unit, year, source.
export const HEADLINES = [
  { label: 'Population', value: '284.4', unit: 'million', year: 'mid-2025', source: 'BPS projection' },
  { label: 'Gross domestic product', value: 'Rp 23,821', unit: 'trillion', year: '2025', source: 'BPS' },
  { label: 'GDP per person', value: 'US$5,083', unit: 'Rp 83.7 million', year: '2025', source: 'BPS' },
  { label: 'Economic growth', value: '5.11%', unit: 'year on year', year: '2025', source: 'BPS' },
  { label: 'Poverty rate', value: '8.07%', unit: '22.93 million people', year: 'Mar 2026', source: 'BPS, Susenas' },
  { label: 'Open unemployment', value: '4.75%', unit: 'of the labour force', year: 'Aug 2026', source: 'BPS, Sakernas' },
];

// Population counted by each census, plus the latest official estimate.
// BPS censuses 1971–2020; mid-2025 is the BPS projection from the 2020 base.
export const CENSUS = [
  { year: 1971, people: 119208229 },
  { year: 1980, people: 147490298 },
  { year: 1990, people: 179378946 },
  { year: 2000, people: 206264595 },
  { year: 2010, people: 237641326 },
  { year: 2020, people: 270203919 },
  { year: 2025, people: 284438782, estimate: true },
];
export const CENSUS_SOURCE = 'BPS population censuses 1971–2020; BPS mid-2025 projection';

export const PEOPLE_FACTS = [
  { label: 'Median age', value: '30.4 years', source: 'UN World Population Prospects, 2025' },
  { label: 'Living in towns and cities', value: '59.6%', source: 'UN World Population Prospects, 2025' },
  { label: 'Children per woman', value: '2.1', source: 'UN World Population Prospects, 2025' },
  { label: 'Of working age (15–64)', value: '68.9%', source: 'BPS, 2025' },
  { label: 'Living on Java', value: '55.7%', source: 'BPS Intercensal Survey (SUPAS), 2025' },
  { label: 'World rank by population', value: '4th', source: 'UN, 2025 — after India, China, USA' },
];

// The ten most populous provinces, 2020 census counts (BPS).
export const TOP_PROVINCES = [
  { name: 'West Java', people: 48274162, capital: 'Bandung' },
  { name: 'East Java', people: 40665696, capital: 'Surabaya' },
  { name: 'Central Java', people: 36516035, capital: 'Semarang' },
  { name: 'North Sumatra', people: 14799361, capital: 'Medan' },
  { name: 'Banten', people: 11904562, capital: 'Serang' },
  { name: 'Jakarta', people: 10562088, capital: '— (capital city)' },
  { name: 'South Sulawesi', people: 9073509, capital: 'Makassar' },
  { name: 'Lampung', people: 9007848, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', people: 8467432, capital: 'Palembang' },
  { name: 'Riau', people: 6494087, capital: 'Pekanbaru' },
];
export const PROVINCE_SOURCE = 'BPS, 2020 Population Census';

// Real GDP growth, percent year on year (BPS). 2020 is the pandemic year.
export const GDP_GROWTH = [
  { year: 2019, pct: 5.02 },
  { year: 2020, pct: -2.07 },
  { year: 2021, pct: 3.70 },
  { year: 2022, pct: 5.31 },
  { year: 2023, pct: 5.05 },
  { year: 2024, pct: 5.03 },
  { year: 2025, pct: 5.11 },
];
export const GDP_GROWTH_SOURCE = 'BPS national accounts, 2019–2025';

// Shares of GDP by broad sector, rounded (BPS, 2024).
export const SECTORS = [
  { name: 'Manufacturing', pct: 19 },
  { name: 'Wholesale & retail trade', pct: 13 },
  { name: 'Agriculture & fisheries', pct: 13 },
  { name: 'Construction', pct: 10 },
  { name: 'All other sectors', pct: 45 },
];
export const SECTOR_SOURCE = 'BPS, GDP by industry, 2024 (shares rounded)';

// Consumer price inflation, December year on year (BPS).
export const INFLATION = [
  { year: 2020, pct: 1.68 },
  { year: 2021, pct: 1.87 },
  { year: 2022, pct: 5.51 },
  { year: 2023, pct: 2.61 },
  { year: 2024, pct: 1.57 },
];
export const INFLATION_SOURCE = 'BPS consumer price index, December of each year';

// International visitor arrivals, millions (BPS). 2025 is provisional.
export const ARRIVALS = [
  { year: 2019, m: 16.11 },
  { year: 2020, m: 4.05 },
  { year: 2021, m: 1.56 },
  { year: 2022, m: 5.89 },
  { year: 2023, m: 11.68 },
  { year: 2024, m: 13.90 },
  { year: 2025, m: 15.39, provisional: true },
];
export const ARRIVALS_SOURCE = 'BPS international visitor arrivals; 2025 provisional (BPS, Feb 2026)';

// Poverty rate each March, percent of the population (BPS, Susenas).
export const POVERTY = [
  { year: 2019, pct: 9.41 },
  { year: 2020, pct: 9.78 },
  { year: 2021, pct: 10.14 },
  { year: 2022, pct: 9.54 },
  { year: 2023, pct: 9.36 },
  { year: 2024, pct: 9.03 },
  { year: 2025, pct: 8.47 },
  { year: 2026, pct: 8.07 },
];
export const POVERTY_SOURCE = 'BPS, National Socio-Economic Survey (Susenas), March rounds';

export const LIVING_FACTS = [
  { label: 'People in poverty', value: '22.93 million', source: 'BPS, March 2026' },
  { label: 'Poverty line', value: 'Rp 609,160', unit: 'per person per month', source: 'BPS, March 2025' },
  { label: 'Open unemployment', value: '4.75%', source: 'BPS, Sakernas, August 2026' },
  { label: 'Working informally', value: '59.4% of workers', source: 'BPS, Sakernas, February 2025' },
  { label: 'Inequality (Gini ratio)', value: '0.375', source: 'BPS, March 2025' },
  { label: 'Domestic tourist trips', value: '1.02 billion', source: 'BPS, 2024' },
];

export const ECONOMY_FACTS = [
  { label: 'GDP in US dollars', value: 'US$1.40 trillion', source: 'World Bank, 2024' },
  { label: 'GDP (PPP)', value: 'US$4.67 trillion', source: 'World Bank, 2024' },
  { label: 'Largest sector', value: 'Manufacturing, 19% of GDP', source: 'BPS, 2024' },
  { label: 'Foreign visitors', value: '15.39 million', source: 'BPS, 2025 (provisional)' },
];
