import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = resolve(root, "docs");
const shellPath = resolve(docsDir, "index.html");
const articlesDir = resolve(root, "public/blog/articles");
const ssrDir = resolve(root, ".ssr-tmp");
const serverEntry = resolve(ssrDir, "entry-server.js");

const ROOT_MARKER = '<div id="root"></div>';
const MODULE_MARKER = '<script type="module"';
const MIN_RENDERED_BYTES = 1000;

function fail(message) {
  console.error(`\n[prerender] ERROR: ${message}\n`);
  process.exit(1);
}

function escAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function forScript(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    fail(`no se encontró ${label} en docs/index.html: la plantilla ha cambiado y el head por ruta dejaría de aplicarse.`);
  }
  return html.replace(pattern, () => replacement);
}

if (!existsSync(shellPath)) {
  fail("no existe docs/index.html: ejecuta build:client antes de prerenderizar.");
}
if (!existsSync(serverEntry)) {
  fail(`no existe ${serverEntry}: falta el paso build:ssr.`);
}

const shell = readFileSync(shellPath, "utf8");

for (const marker of [ROOT_MARKER, MODULE_MARKER]) {
  if (!shell.includes(marker)) {
    fail(`no se encontró ${marker} en docs/index.html.`);
  }
}

const { render, getRoutes } = await import(pathToFileURL(serverEntry).href);

if (typeof getRoutes !== "function") {
  fail("entry-server no exporta getRoutes.");
}

function applyHead(html, route) {
  let out = html;

  out = replaceOnce(out, /<title>[\s\S]*?<\/title>/, `<title>${escText(route.title)}</title>`, "<title>");
  out = replaceOnce(out, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escAttr(route.description)}" />`, 'meta name="description"');
  out = replaceOnce(out, /<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${escAttr(route.robots)}" />`, 'meta name="robots"');
  out = replaceOnce(
    out,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    route.canonical ? `<link rel="canonical" href="${escAttr(route.canonical)}" />` : "",
    'link rel="canonical"',
  );
  out = replaceOnce(out, /<meta property="og:type" content="[^"]*"\s*\/>/, `<meta property="og:type" content="${escAttr(route.ogType)}" />`, "og:type");
  out = replaceOnce(out, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${escAttr(route.canonical ?? route.image)}" />`, "og:url");
  out = replaceOnce(out, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escAttr(route.title)}" />`, "og:title");
  out = replaceOnce(out, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escAttr(route.description)}" />`, "og:description");
  out = replaceOnce(out, /<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${escAttr(route.image)}" />`, "og:image");
  out = replaceOnce(out, /<meta property="og:image:alt" content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${escAttr(route.imageAlt)}" />`, "og:image:alt");
  out = replaceOnce(out, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escAttr(route.title)}" />`, "twitter:title");
  out = replaceOnce(out, /<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escAttr(route.description)}" />`, "twitter:description");
  out = replaceOnce(out, /<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${escAttr(route.image)}" />`, "twitter:image");

  const extra = [];

  if (route.published) {
    extra.push(`<meta property="article:published_time" content="${escAttr(route.published)}" />`);
    if (route.lastmod) {
      extra.push(`<meta property="article:modified_time" content="${escAttr(route.lastmod)}" />`);
    }
  }

  if (route.jsonLd) {
    extra.push(`<script type="application/ld+json">${forScript(route.jsonLd)}</script>`);
  }

  if (extra.length > 0) {
    const block = extra.map((tag) => `      ${tag}`).join("\n");
    out = replaceOnce(out, /<\/head>/, `${block}\n\n    </head>`, "</head>");
  }

  return out;
}

const routes = getRoutes();
const written = [];

for (const route of routes) {
  const preloaded = {};

  for (const slug of route.slugs) {
    const articlePath = join(articlesDir, `${slug}.html`);
    if (!existsSync(articlePath)) {
      fail(`la ruta ${route.path} declara el artículo "${slug}" pero no existe ${articlePath}.`);
    }
    preloaded[slug] = readFileSync(articlePath, "utf8");
  }

  const appHtml = render(route.path, preloaded);

  if (!appHtml || appHtml.length < MIN_RENDERED_BYTES) {
    fail(`el render de ${route.path} devolvió ${appHtml ? `${appHtml.length} bytes` : "nada"}.`);
  }

  let out = applyHead(shell, route);
  out = out.replace(ROOT_MARKER, () => `<div id="root">${appHtml}</div>`);

  if (Object.keys(preloaded).length > 0) {
    const seed = `<script>window.__ARTICLE_HTML__=${forScript(preloaded)}</script>`;
    out = out.replace(MODULE_MARKER, () => `${seed}\n      ${MODULE_MARKER}`);
  }

  const target = resolve(docsDir, route.out);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, out, "utf8");
  written.push({ out: route.out, bytes: out.length, rendered: appHtml.length });
}

const indexed = routes.filter((r) => r.sitemap);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexed.map((r) =>
    [
      "  <url>",
      `    <loc>${escText(r.canonical)}</loc>`,
      r.lastmod ? `    <lastmod>${escText(r.lastmod)}</lastmod>` : "",
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve(docsDir, "sitemap.xml"), sitemap, "utf8");
rmSync(ssrDir, { recursive: true, force: true });

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
const pad = Math.max(...written.map((w) => w.out.length));

console.log(`\n[prerender] plantilla ${kb(shell.length)}`);
for (const w of written) {
  console.log(`[prerender]   ${w.out.padEnd(pad)}  ${kb(w.bytes).padStart(9)}  (+${kb(w.rendered)} renderizados)`);
}
console.log(`[prerender] sitemap.xml con ${indexed.length} URL(s)\n`);
