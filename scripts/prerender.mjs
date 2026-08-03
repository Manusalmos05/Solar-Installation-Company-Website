import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = resolve(root, "docs/index.html");
const ssrDir = resolve(root, ".ssr-tmp");
const serverEntry = resolve(ssrDir, "entry-server.js");

const ROOT_MARKER = '<div id="root"></div>';
const MIN_RENDERED_BYTES = 1000;

function fail(message) {
  console.error(`\n[prerender] ERROR: ${message}\n`);
  process.exit(1);
}

if (!existsSync(htmlPath)) {
  fail("no existe docs/index.html: ejecuta build:client antes de prerenderizar.");
}
if (!existsSync(serverEntry)) {
  fail(`no existe ${serverEntry}: falta el paso build:ssr.`);
}

const html = readFileSync(htmlPath, "utf8");

if (!html.includes(ROOT_MARKER)) {
  fail(`no se encontró ${ROOT_MARKER} en docs/index.html: revisa ROOT_MARKER.`);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (!appHtml || appHtml.length < MIN_RENDERED_BYTES) {
  fail(`el render devolvió ${appHtml ? `${appHtml.length} bytes` : "nada"}.`);
}

const out = html.replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);
writeFileSync(htmlPath, out, "utf8");
rmSync(ssrDir, { recursive: true, force: true });

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
console.log(
  `[prerender] docs/index.html: ${kb(html.length)} -> ${kb(out.length)} (+${kb(appHtml.length)} renderizados)`,
);
