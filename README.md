# The Archipelago Ledger — Indonesia's National Statistics

[![Bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-statistics-site)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hagai17/national-statistics-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-statistics-site)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hagai17/national-statistics-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-statistics-site)

An original national statistics site for **Indonesia** — the world's fourth most
populous country — that runs offline in a browser, on desktop and phone, from
its own static files. Every figure is printed with its source and year.

## What is inside

Six linked pages, each reached from the header:

- **Overview** — the headline figures (population 284.4 million, BPS mid-2025;
  GDP Rp 23,821 trillion, BPS 2025; poverty 8.07%, BPS March 2026), the census
  chart back to 1971, and Indonesia's place in the world.
- **People** — census growth, the shape of the population (median age 30.4,
  59.6% urban — UN, 2025), and the largest provinces.
- **Economy** — GDP growth 2019–2025 with the pandemic dip, GDP by sector,
  December inflation, and international visitor arrivals.
- **Living standards** — the March poverty series 2019–2026, unemployment,
  informal work and inequality.
- **Provinces** — the ten most populous provinces (BPS, 2020 Census) in a
  table with working search and sort controls.
- **Sources & method** — where every figure comes from and how to read it.

Every chart has a working Chart/Table toggle showing the same numbers as a
table. All statistics are real and sourced: BPS (Statistics Indonesia), the
World Bank and the United Nations — no invented figures, no placeholders.

## Layout of the repository

- `main.ts` — the hand-in program (Node 22, standard library only): copies
  `app/` and `screenshots/` to the output directory and writes `dossier.json`
  with the vendored library.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
- `app/` — the site itself: `index.html` (shell and navigation), `style.css`
  (the ledger design), `data.js` (every figure, with source and year),
  `charts.js` (SVG bar, line and donut charts), `views.js` (the six pages),
  `main.js` (hash router and controls). No build step, no network requests:
  the first load is 6 files, about 12.6 KB gzipped.
- `screenshots/` — four real renders of the site (desktop overview, economy
  and provinces, plus the People page at a phone's size); `shots.json` lists
  which view each one shows.

## Run it locally

Serve `app/` with any static file server, for example:

```
python3 -m http.server --directory app 8080
```

then open http://localhost:8080. To produce the hand-in output (needs
Node.js 22.18 or later):

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Verification

`main.ts` prints the size of the `dossier.json` it writes. The hand-in is
deterministic: running it twice into different output directories produces
byte-identical `dossier.json` files (455,572 bytes for this entry).

## License

MIT — see `LICENSE`.
