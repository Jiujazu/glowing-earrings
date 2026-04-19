#!/usr/bin/env node
// Halb-automatischer App-Asset-Sammler für Kurse über Apps.
//
// Zieht offizielle Icons + Screenshots aus App Store (iTunes Search API)
// und Google Play Store (HTML-Scrape) in /public/courses/<slug>/app-assets/
// und schreibt ein manifest.json mit Quell-URLs für die Attribution.
//
// Du entscheidest danach manuell, welche Bilder wirklich in course.json
// als image- oder step-by-step-Elemente eingebunden werden.
//
// Nutzung:
//   node scripts/fetch-app-assets.mjs --slug=<course-slug> [--ios=<id>] [--android=<package>] [--limit=6]
//
// Beispiele:
//   node scripts/fetch-app-assets.mjs --slug=handy-speech-to-text --ios=1557961053 --android=com.aiko.aiko
//   node scripts/fetch-app-assets.mjs --slug=my-course --ios=284882215
//
// App Store ID findest du in der Store-URL: apps.apple.com/app/name/id<ID>
// Play Store Package in der URL: play.google.com/store/apps/details?id=<PACKAGE>

import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function parseArgs(argv) {
  const args = {};
  for (const raw of argv.slice(2)) {
    const m = raw.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

async function downloadBinary(url, destPath) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
  return buf.length;
}

async function fetchIosAssets(appId, limit) {
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}&country=de&entity=software`;
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`iTunes API HTTP ${res.status}`);
  const data = await res.json();
  const app = data.results?.[0];
  if (!app) throw new Error(`No iOS app found for id=${appId}`);

  const icon = app.artworkUrl512 || app.artworkUrl100;
  const screenshots = (app.screenshotUrls || []).slice(0, limit);

  return {
    name: app.trackName,
    seller: app.sellerName,
    storeUrl: app.trackViewUrl,
    icon,
    screenshots,
  };
}

async function fetchAndroidAssets(pkg, limit) {
  const storeUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(pkg)}&hl=de&gl=DE`;
  const res = await fetch(storeUrl, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`Play Store HTTP ${res.status}`);
  const html = await res.text();

  // Alle play-lh Googleusercontent Bilder aus dem HTML fischen.
  const urlSet = new Set();
  const re = /https:\/\/play-lh\.googleusercontent\.com\/[A-Za-z0-9_\-]+(?:=[A-Za-z0-9\-]+)?/g;
  for (const match of html.match(re) || []) {
    // Auflösungs-Suffixe (=w720, =s180) entfernen, damit wir eine stabile URL haben.
    urlSet.add(match.replace(/=.+$/, ""));
  }
  const urls = [...urlSet];
  if (urls.length === 0) throw new Error("Keine Play-Store-Bilder im HTML gefunden");

  // Heuristik: erster Treffer ist meistens das App-Icon. Der Rest sind Screenshots.
  const [icon, ...rest] = urls;
  const screenshots = rest.slice(0, limit);

  // Titel aus <title>-Tag ziehen.
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const name = titleMatch?.[1]?.replace(/\s*-\s*Apps bei Google Play.*$/i, "").trim();

  return { name, storeUrl, icon, screenshots };
}

function extFromUrl(url, fallback = ".png") {
  const clean = url.split("?")[0];
  const m = clean.match(/\.(png|jpg|jpeg|webp)$/i);
  return m ? `.${m[1].toLowerCase()}` : fallback;
}

async function saveAsset(url, destPath) {
  const bytes = await downloadBinary(url, destPath);
  return { path: destPath, sourceUrl: url, bytes };
}

async function main() {
  const args = parseArgs(process.argv);
  const { slug, ios, android } = args;
  const limit = Number(args.limit || 6);

  if (!slug) {
    console.error("Fehlt: --slug=<course-slug>");
    process.exit(1);
  }
  if (!ios && !android) {
    console.error("Mindestens --ios=<id> oder --android=<package> angeben.");
    process.exit(1);
  }

  const outDir = join(ROOT, "public", "courses", slug, "app-assets");
  await mkdir(outDir, { recursive: true });

  const manifest = {
    slug,
    fetchedAt: new Date().toISOString(),
    notice:
      "Offizielle Store-Assets. Nutzung redaktionell, mit Quellen-Attribution im Kurs-Outro.",
    sources: {},
    files: [],
  };

  if (ios) {
    console.log(`\n[iOS] Lade Assets für App-ID ${ios}…`);
    try {
      const app = await fetchIosAssets(ios, limit);
      manifest.sources.ios = {
        name: app.name,
        seller: app.seller,
        storeUrl: app.storeUrl,
      };
      console.log(`  App: ${app.name} (${app.seller})`);

      if (app.icon) {
        const file = `ios-icon${extFromUrl(app.icon)}`;
        const saved = await saveAsset(app.icon, join(outDir, file));
        manifest.files.push({ kind: "ios-icon", file, ...saved, path: file });
        console.log(`  ✓ ${file}`);
      }
      for (let i = 0; i < app.screenshots.length; i++) {
        const url = app.screenshots[i];
        const file = `ios-screenshot-${i + 1}${extFromUrl(url)}`;
        const saved = await saveAsset(url, join(outDir, file));
        manifest.files.push({ kind: "ios-screenshot", file, ...saved, path: file });
        console.log(`  ✓ ${file}`);
      }
    } catch (err) {
      console.error(`  ✗ iOS fehlgeschlagen: ${err.message}`);
    }
  }

  if (android) {
    console.log(`\n[Android] Lade Assets für Package ${android}…`);
    try {
      const app = await fetchAndroidAssets(android, limit);
      manifest.sources.android = {
        name: app.name,
        storeUrl: app.storeUrl,
      };
      console.log(`  App: ${app.name || "(Titel nicht gefunden)"}`);

      if (app.icon) {
        const file = `android-icon${extFromUrl(app.icon)}`;
        const saved = await saveAsset(app.icon, join(outDir, file));
        manifest.files.push({ kind: "android-icon", file, ...saved, path: file });
        console.log(`  ✓ ${file}`);
      }
      for (let i = 0; i < app.screenshots.length; i++) {
        const url = app.screenshots[i];
        const file = `android-screenshot-${i + 1}${extFromUrl(url)}`;
        const saved = await saveAsset(url, join(outDir, file));
        manifest.files.push({ kind: "android-screenshot", file, ...saved, path: file });
        console.log(`  ✓ ${file}`);
      }
    } catch (err) {
      console.error(`  ✗ Android fehlgeschlagen: ${err.message}`);
    }
  }

  const manifestPath = join(outDir, "manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`\nFertig. Assets in: public/courses/${slug}/app-assets/`);
  console.log(`Manifest: ${manifestPath}`);
  console.log("\nNächster Schritt: manuell sichten und nur die 2-3 didaktisch");
  console.log("wertvollen Bilder als image- oder step-by-step-Element in course.json einbinden.");
  console.log("Quelle + Attribution im Outro eintragen.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
