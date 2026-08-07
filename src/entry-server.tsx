import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./app/App.tsx";
import { ARTICLES } from "./data/blog.ts";
import { seedArticleHtml } from "./lib/articleHtml.ts";
import { articleGraph, blogGraph, homeGraph } from "./lib/structuredData.ts";
import {
  SITE,
  BRAND,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_LOCALE,
  TWITTER_CARD,
  INDEXABLE,
  BLOG_NAME,
  BLOG_DESCRIPTION,
  BUSINESS_DESCRIPTION,
} from "./lib/site.ts";

export interface SiteMeta {
  siteName: string;
  ogLocale: string;
  twitterCard: string;
}

export function getSiteMeta(): SiteMeta {
  return { siteName: BRAND, ogLocale: OG_LOCALE, twitterCard: TWITTER_CARD };
}

const BRAND_SUFFIX_LIMIT = 45;
const DESCRIPTION_LIMIT = 155;

export interface PrerenderRoute {
  path: string;
  out: string;
  title: string;
  description: string;
  canonical: string | null;
  ogType: string;
  image: string;
  imageAlt: string;
  robots: string;
  slugs: string[];
  lastmod: string | null;
  published: string | null;
  sitemap: boolean;
  jsonLd: unknown | null;
}

function withBrand(title: string): string {
  return title.length <= BRAND_SUFFIX_LIMIT ? `${title} | ${BRAND}` : title;
}

function clamp(text: string, max = DESCRIPTION_LIMIT): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const boundary = cut.lastIndexOf(" ");
  const kept = boundary > max * 0.6 ? cut.slice(0, boundary) : cut;
  return `${kept.replace(/[\s,;:.…-]+$/, "")}…`;
}

const LEGAL_PAGES: Array<[string, string, string]> = [
  ["/aviso-legal", "Aviso legal", "Identificación del titular y condiciones de uso del sitio web de White Fox Energy."],
  ["/politica-de-privacidad", "Política de privacidad", "Cómo tratamos los datos personales del formulario de contacto y qué derechos tienes."],
  ["/politica-de-cookies", "Política de cookies", "Qué cookies usa este sitio, para qué sirven y cómo cambiar tu elección."],
  ["/accesibilidad", "Accesibilidad", "Compromiso de accesibilidad WCAG 2.1 AA y cómo avisarnos de cualquier barrera."],
];

const articleStamp = (a: (typeof ARTICLES)[number]) =>
  a.updated && a.updated > a.date ? a.updated : a.date;

const newestArticleDate = ARTICLES.reduce(
  (latest, a) => (articleStamp(a) > latest ? articleStamp(a) : latest),
  ARTICLES[0] ? articleStamp(ARTICLES[0]) : "",
);

export function getRoutes(): PrerenderRoute[] {
  return [
    {
      path: "/",
      out: "index.html",
      title: `Placas Solares en Alicante y Murcia | ${BRAND}`,
      description: BUSINESS_DESCRIPTION,
      canonical: `${SITE}/`,
      ogType: "website",
      image: OG_IMAGE,
      imageAlt: OG_IMAGE_ALT,
      robots: INDEXABLE,
      slugs: [],
      lastmod: null,
      published: null,
      sitemap: true,
      jsonLd: homeGraph(),
    },
    {
      path: "/blog",
      out: "blog/index.html",
      title: `${BLOG_NAME} | ${BRAND}`,
      description: BLOG_DESCRIPTION,
      canonical: `${SITE}/blog/`,
      ogType: "website",
      image: OG_IMAGE,
      imageAlt: OG_IMAGE_ALT,
      robots: INDEXABLE,
      slugs: [],
      lastmod: newestArticleDate || null,
      published: null,
      sitemap: true,
      jsonLd: blogGraph(),
    },
    ...ARTICLES.map((a) => ({
      path: `/blog/${a.slug}`,
      out: `blog/${a.slug}/index.html`,
      title: withBrand(a.title),
      description: clamp(a.excerpt),
      canonical: `${SITE}/blog/${a.slug}/`,
      ogType: "article",
      image: `${SITE}/${a.cover}`,
      imageAlt: a.title,
      robots: INDEXABLE,
      slugs: [a.slug],
      lastmod: articleStamp(a),
      published: a.date,
      sitemap: true,
      jsonLd: articleGraph(a),
    })),
    ...LEGAL_PAGES.map(([path, title, description]) => ({
      path,
      out: `${path.slice(1)}/index.html`,
      title: withBrand(title),
      description,
      canonical: `${SITE}${path}/`,
      ogType: "website",
      image: OG_IMAGE,
      imageAlt: OG_IMAGE_ALT,
      robots: INDEXABLE,
      slugs: [],
      lastmod: null,
      published: null,
      sitemap: false,
      jsonLd: null,
    })),
    {
      path: "/pagina-que-no-existe",
      out: "404.html",
      title: `Página no encontrada | ${BRAND}`,
      description: "La página que buscas no existe o se ha movido.",
      canonical: null,
      ogType: "website",
      image: OG_IMAGE,
      imageAlt: OG_IMAGE_ALT,
      robots: "noindex, follow",
      slugs: [],
      lastmod: null,
      published: null,
      sitemap: false,
      jsonLd: null,
    },
  ];
}

export function render(
  location = "/",
  preloaded: Record<string, string> = {},
): string {
  seedArticleHtml(preloaded);
  return renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>,
  );
}
