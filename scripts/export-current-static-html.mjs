import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const sourceUrl = process.env.AI_INDEX_LOCAL_URL ?? "http://localhost:8000/";
const outputPath = process.env.AI_INDEX_STATIC_HTML ??
  "C:\\Users\\yulin\\OneDrive\\AI_Index\\output\\html\\ai-investment-atmosphere-current-static.html";

const response = await fetch(sourceUrl, { headers: { accept: "text/html" } });
if (!response.ok) throw new Error(`Page request failed with HTTP ${response.status}`);

let html = await response.text();
const assetDirectory = resolve(projectRoot, "dist", "client", "assets");
const cssAssets = (await readdir(assetDirectory)).filter((name) => name.endsWith(".css"));
if (cssAssets.length !== 1) {
  throw new Error(`Expected one compiled CSS asset, found ${cssAssets.length}`);
}
const css = await readFile(resolve(assetDirectory, cssAssets[0]), "utf8");
const favicon = await readFile(resolve(projectRoot, "public", "favicon.svg"), "utf8");
const csv = await readFile(resolve(projectRoot, "public", "ai-industry-chain-price-template.csv"), "utf8");

html = html
  .replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, "")
  .replace(/<link[^>]+rel=["']icon["'][^>]*>/gi, "")
  .replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(
    /href=["']\/ai-industry-chain-price-template\.csv["']/g,
    `href="data:text/csv;charset=utf-8,${encodeURIComponent(csv)}"`,
  )
  .replace(
    "</head>",
    `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}"><style>${css}</style><style>.static-export-note{position:fixed;right:12px;bottom:12px;z-index:9999;padding:7px 10px;border-radius:999px;background:#132726;color:#fff;font:600 10px/1.2 Arial,sans-serif;box-shadow:0 2px 12px #0002;opacity:.82}@media print{.static-export-note{display:none}}</style></head>`,
  )
  .replace("</body>", '<div class="static-export-note">STATIC SNAPSHOT</div></body>');

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, html, "utf8");
console.log(JSON.stringify({ outputPath, bytes: Buffer.byteLength(html) }));
