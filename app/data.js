// data.js — the numbers behind The Archipelago Ledger.
//
// Every figure on the site lives here, next to the source and year it came
// from, so a page never prints a number without saying where it was counted.
// The three sources the Ledger leans on:
//   BPS — Statistics Indonesia (Badan Pusat Statistik), the national office.
//   WB  — World Bank, World Development Indicators.
//   UN  — United Nations, World Population Prospects 2024 revision.
// Figures are typed as plain data; views.js decides how they are shown and
// charts.js decides how they are drawn. Nothing here touches the page.

export const COUNTRY = {
  name: 'Indonesia',
  capital: 'Jakarta',
  provinces: 38,
  regenciesAndCities: 514,
  landArea: '1,904,569 km²',
  islands: 'more than 17,000',
  note: 'Province count as of November 2022; regency and city count per BPS.',
};

// The six cards on the front page. value is the big print, detail the small
// print underneath, and every card names its source and its reference year.
export const HEADLINES = [
  { label: 'Population', value: '284.4 million', detail: 'mid-2025 projection', source: 'BPS' },
  { label: 'Gross domestic product', value: 'Rp 23,821 trillion', detail: 'current prices, 2025', source: 'BPS' },
  { label: 'GDP per person', value: 'US$5,083', detail: 'about Rp 83.7 million, 2025', source: 'BPS' },
  { label: 'Economic growth', value: '5.11%', detail: 'real GDP, year on year, 2025', source: 'BPS' },
  { label: 'Poverty rate', value: '8.07%', detail: '22.93 million people', source: 'BPS, Susenas, Mar 2026' },
  { label: 'Open unemployment', value: '4.75%', detail: 'share of the labour force', source: 'BPS, Sakernas, Aug 2026' },
];

// People counted at each census, 1971–2020, plus the latest BPS estimate.
// The 2025 row is a projection off the 2020 census base, not a count.
export const CENSUS = [
  { year: 1971, people: 119208229 },
  { year: 1980, people: 147490298 },
  { year: 1990, people: 179378946 },
  { year: 2000, people: 206264595 },
  { year: 2010, people: 237641326 },
  { year: 2020, people: 270203919 },
  { year: 2025, people: 284438782, note: 'projection' },
];
export const CENSUS_SOURCE = 'BPS population censuses 1971–2020; BPS mid-2025 projection';

// Who lives here, in six facts a visitor can read in a minute.
export const PEOPLE_FACTS = [
  { label: 'Median age', value: '30.4 years', source: 'UN World Population Prospects, 2025' },
  { label: 'Living in towns and cities', value: '59.6%', source: 'UN World Population Prospects, 2025' },
  { label: 'Children per woman', value: '2.1', source: 'UN World Population Prospects, 2025' },
  { label: 'Of working age, 15–64', value: '68.9%', source: 'BPS, 2025' },
  { label: 'Living on Java', value: '55.7%', source: 'BPS Intercensal Survey (SUPAS), 2025' },
  { label: 'World rank by population', value: '4th', source: 'UN, 2025 — after India, China and the USA' },
];

// The ten most populous provinces at the 2020 census, with their capitals.
export const TOP_PROVINCES = [
  { name: 'West Java', people: 48274162, capital: 'Bandung' },
  { name: 'East Java', people: 40665696, capital: 'Surabaya' },
  { name: 'Central Java', people: 36516035, capital: 'Semarang' },
  { name: 'North Sumatra', people: 14799361, capital: 'Medan' },
  { name: 'Banten', people: 11904562, capital: 'Serang' },
  { name: 'Jakarta', people: 10562088, capital: 'the capital city' },
  { name: 'South Sulawesi', people: 9073509, capital: 'Makassar' },
  { name: 'Lampung', people: 9007848, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', people: 8467432, capital: 'Palembang' },
  { name: 'Riau', people: 6494087, capital: 'Pekanbaru' },
];
export const PROVINCE_SOURCE = 'BPS, 2020 Population Census';

// Real GDP growth, percent year on year. 2020 is the pandemic contraction.
export const GROWTH = [
  { year: 2019, pct: 5.02 },
  { year: 2020, pct: -2.07 },
  { year: 2021, pct: 3.7 },
  { year: 2022, pct: 5.31 },
  { year: 2023, pct: 5.05 },
  { year: 2024, pct: 5.03 },
  { year: 2025, pct: 5.11 },
];
export const GROWTH_SOURCE = 'BPS national accounts, 2019–2025';

// Shares of GDP by broad industry, 2024, rounded so they sum to 100.
export const SECTORS = [
  { name: 'Manufacturing', pct: 19 },
  { name: 'Wholesale and retail trade', pct: 13 },
  { name: 'Agriculture and fisheries', pct: 13 },
  { name: 'Construction', pct: 10 },
  { name: 'All other industries', pct: 45 },
];
export const SECTOR_SOURCE = 'BPS, GDP by industry, 2024 (shares rounded)';

// Consumer price inflation, December year on year.
export const INFLATION = [
  { year: 2020, pct: 1.68 },
  { year: 2021, pct: 1.87 },
  { year: 2022, pct: 5.51 },
  { year: 2023, pct: 2.61 },
  { year: 2024, pct: 1.57 },
];
export const INFLATION_SOURCE = 'BPS consumer price index, December of each year';

// International visitor arrivals, millions. 2025 is provisional.
export const ARRIVALS = [
  { year: 2019, millions: 16.11 },
  { year: 2020, millions: 4.05 },
  { year: 2021, millions: 1.56 },
  { year: 2022, millions: 5.89 },
  { year: 2023, millions: 11.68 },
  { year: 2024, millions: 13.9 },
  { year: 2025, millions: 15.39, note: 'provisional' },
];
export const ARRIVALS_SOURCE = 'BPS international visitor arrivals; 2025 provisional (BPS, Feb 2026)';

// Poverty rate each March, percent of the population.
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

// How people live: the facts behind the poverty and jobs numbers.
export const LIVING_FACTS = [
  { label: 'People in poverty', value: '22.93 million', source: 'BPS, March 2026' },
  { label: 'Poverty line', value: 'Rp 609,160', detail: 'per person per month', source: 'BPS, March 2025' },
  { label: 'Open unemployment', value: '4.75%', source: 'BPS, Sakernas, August 2026' },
  { label: 'Working informally', value: '59.4% of workers', source: 'BPS, Sakernas, February 2025' },
  { label: 'Inequality, Gini ratio', value: '0.375', source: 'BPS, March 2025' },
  { label: 'Domestic tourist trips', value: '1.02 billion', source: 'BPS, 2024' },
];

// The economy in the wider world, for the economy page's side panel.
export const ECONOMY_FACTS = [
  { label: 'GDP in US dollars', value: 'US$1.40 trillion', source: 'World Bank, 2024' },
  { label: 'GDP at purchasing power parity', value: 'US$4.67 trillion', source: 'World Bank, 2024' },
  { label: 'Largest industry', value: 'Manufacturing, 19% of GDP', source: 'BPS, 2024' },
  { label: 'Foreign visitors', value: '15.39 million', source: 'BPS, 2025 (provisional)' },
];

// Where each page's numbers come from, for the Sources page.
export const SOURCE_NOTES = [
  { name: 'BPS — Statistics Indonesia', covers: 'Population, GDP, poverty, unemployment, prices, visitors, provinces', link: 'bps.go.id' },
  { name: 'World Bank — World Development Indicators', covers: 'GDP in US dollars and at purchasing power parity', link: 'data.worldbank.org' },
  { name: 'United Nations — World Population Prospects', covers: 'Median age, urban share, fertility, world population rank', link: 'population.un.org' },
];
