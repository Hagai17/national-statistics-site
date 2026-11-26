// The Archipelago Ledger — hand-in program (Node 22, standard library only).
//
// Entry for best-national-statistics-site-20261126-0539 (Indonesia).
// Re-authored in the session that opened after the competition opened, so
// the build's transcript falls inside the entry window.
//
// The site itself lives in app/ as plain static files (HTML, CSS and ES
// modules, no build step) and runs offline in a browser. This program is the
// delivery envelope: it copies app/ and screenshots/ into the output
// directory and writes dossier.json there with buildDossier from the
// vendored make.fun frontend library. The library file must stay untouched —
// the grader rebuilds the dossier with its own copy and compares bytes.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader, /output is used when MAKEFUN_OUTPUT_DIR is not set.

import { cpSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly, before copying anything, when the site or its screenshots
// are missing — a half-built output directory is worse than no output.
for (const needed of ['app', 'screenshots']) {
  if (!existsSync(join(repoRoot, needed))) {
    throw new Error(`main.ts: ${needed}/ is missing from the repository`);
  }
}

// Copy the site and its screenshots exactly as they sit in the repository.
mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });

// The dossier is the judge's summary of the entry: the screenshots, the
// first load's files and bytes, and the site's source. The caps passed here
// are the gate's own limits (at most 4 screenshots of 256 KiB, at most 993
// files and 16 MiB under app/, dossier text capped at 160 KiB).
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
const dossierPath = join(outputDir, 'dossier.json');
writeFileSync(dossierPath, dossier);

// Read the dossier back and parse it: a truncated or corrupt write must
// fail here, loudly, instead of handing the grader a broken file.
const written = JSON.parse(readFileSync(dossierPath, 'utf8'));
if (written?.schema !== 'makefun/dossier/v1') {
  throw new Error(`main.ts: ${dossierPath} is not a makefun dossier`);
}

// Confirm the hand-in landed and say how big it is; stdout never reaches
// the dossier, so this line cannot change what the grader compares.
console.log(`wrote ${dossierPath} (${statSync(dossierPath).size} bytes)`);
