// Refuse to build while unfilled metric tokens remain in the site content.
// Fill them from Semaine-1-Contenu/00-Metriques-a-extraire.md.
// To bypass temporarily: remove the "prebuild" script from package.json.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "lib", "components"];
const TOKEN = /⟦[^⟧]{1,40}⟧/g;
const found = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(ts|tsx|css|md)$/.test(name)) continue;
    const text = readFileSync(p, "utf8");
    for (const m of text.matchAll(TOKEN)) {
      if (m[0].includes("…")) continue; // "⟦…⟧" dans les commentaires : pas une vraie valeur
      found.push({ p, token: m[0] });
    }
  }
}

for (const r of ROOTS) { try { walk(r); } catch {} }

if (found.length) {
  console.error("\n[31m✖ Build bloque : " + found.length + " valeur(s) non remplie(s).[0m\n");
  const seen = new Set();
  for (const f of found) {
    const key = f.p + f.token;
    if (seen.has(key)) continue;
    seen.add(key);
    console.error("  " + f.token.padEnd(20) + "  " + f.p);
  }
  console.error("\nRemplace-les avec les chiffres reels (voir Semaine-1-Contenu/00-Metriques-a-extraire.md).");
  console.error("Ne mets jamais un chiffre que tu n'as pas mesure.\n");
  process.exit(1);
}
console.log("✓ Aucun placeholder restant.");
