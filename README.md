# The Archipelago Ledger — Indonesia in Numbers

[![Bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-statistics-site)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hagai17/national-statistics-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-statistics-site)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hagai17/national-statistics-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=national-statistics-site)

An original national statistics site for **Indonesia** — the world's fourth most populous country — that runs entirely offline in a browser, on desktop and on a phone, from its own static files. Every figure is printed with its source and its year.

## The six pages

- **Overview** — the six headline figures (population 284.4 million, BPS mid-2025; GDP Rp 23,821 trillion, BPS 2025; poverty 8.07%, BPS March 2026), the census line back to 1971, and a first-visit guide to the rest of the site.
- **People** — six facts about who lives here (median age 30.4, 59.6% urban — UN, 2025) and a bar chart of the five largest provinces.
- **Economy** — a switchable chart (GDP growth or December inflation), GDP by industry, and the return of international visitors after the pandemic.
- **Provinces** — the ten most populous provinces (BPS, 2020 Census) in a table with a working sort control: most populous first, or alphabetical.
- **Living** — the March poverty series 2019–2026, the poverty line, informal work and inequality.
- **Sources & method** — where every figure comes from (BPS, World Bank, UN) and the five rules the Ledger follows when it prints a number.

All statistics are real and sourced — no invented figures, no placeholders, no lorem ipsum. The site fetches nothing: no CDN, no web font, no analytics.

## How it is built

- `main.ts` — the hand-in program (Node 22, standard library only): copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored kit library.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
- `app/` — the site itself: `index.html` (shell, masthead and navigation), `style.css` (the ledger-newspaper design), `data.js` (every figure, with source and year), `charts.js` (small SVG line and bar chart builders), `views.js` (the six pages and their two controls), `main.js` (hash router). No build step, no framework, no network requests: the first load is 6 files, 12,431 bytes gzipped (34,158 raw), and the dossier reports zero URLs in the source.
- `screenshots/` — four real renders of the site in a browser (desktop overview, economy and provinces, plus a phone-sized view of the People page).

## Run it locally

Serve `app/` with any static file server, for example:

```
python3 -m http.server --directory app 8080
```

then open http://localhost:8080 and follow the six links in the header. To produce the hand-in output:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
