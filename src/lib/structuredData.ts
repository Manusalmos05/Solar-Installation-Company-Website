import { FAQS } from "../data/faqs.ts";
import { SERVICES } from "../data/services.ts";
import { KITS } from "../data/kits.ts";
import { KIT_SPECS } from "../data/kitSpecs.ts";
import { ARTICLES, type BlogArticle } from "../data/blog.ts";
import {
  SITE,
  BRAND,
  PHONE,
  EMAIL,
  WHATSAPP,
  LOGO,
  OG_IMAGE,
  LOCALE,
  AREAS,
  BUSINESS_DESCRIPTION,
  BLOG_NAME,
  BLOG_DESCRIPTION,
  ORG_ID,
  SITE_ID,
  BLOG_ID,
  slugify,
} from "./site.ts";

type Node = Record<string, unknown>;

function areaServed(): Node[] {
  return AREAS.map((name) => ({ "@type": "AdministrativeArea", name }));
}

function serviceId(title: string): string {
  return `${SITE}/#servicio-${slugify(title)}`;
}

function kitId(title: string, slug?: string): string {
  return `${SITE}/#kit-${slug ?? slugify(title)}`;
}

export function articleId(slug: string): string {
  return `${SITE}/blog/${slug}/#articulo`;
}

function website(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE}/`,
    name: BRAND,
    description: BUSINESS_DESCRIPTION,
    inLanguage: LOCALE,
    publisher: { "@id": ORG_ID },
  };
}

function organization(withCatalog = false): Node {
  const node: Node = {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: BRAND,
    url: `${SITE}/`,
    description: BUSINESS_DESCRIPTION,
    image: OG_IMAGE,
    logo: LOGO,
    telephone: PHONE,
    email: EMAIL,
    sameAs: [WHATSAPP],
    knowsLanguage: LOCALE,
    currenciesAccepted: "EUR",
    areaServed: areaServed(),
  };

  if (withCatalog) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Servicios de instalación",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": serviceId(s.title) },
      })),
    };
  }

  return node;
}

function services(): Node[] {
  return SERVICES.map((s) => ({
    "@type": "Service",
    "@id": serviceId(s.title),
    name: s.title,
    serviceType: s.title,
    description: s.desc,
    image: `${SITE}/${s.img}`,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
  }));
}

function products(): Node[] {
  return KITS.map((k) => {
    const spec = k.slug ? KIT_SPECS[k.slug] : undefined;
    const node: Node = {
      "@type": "Product",
      "@id": kitId(k.title, k.slug),
      name: k.title,
      image: `${SITE}/${k.img}`,
      brand: { "@type": "Brand", name: BRAND },
      offers: {
        "@type": "Offer",
        url: `${SITE}/#kits`,
        price: k.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@id": ORG_ID },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: k.price,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
    };
    if (spec?.summary) {
      node.description = spec.summary;
    }
    return node;
  });
}

function faqPage(): Node {
  return {
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    inLanguage: LOCALE,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function breadcrumb(trail: Array<[string, string]>): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}

function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function homeGraph(): Node {
  return graph([website(), organization(true), faqPage(), ...services(), ...products()]);
}

export function blogGraph(): Node {
  return graph([
    website(),
    organization(),
    {
      "@type": "Blog",
      "@id": BLOG_ID,
      url: `${SITE}/blog/`,
      name: BLOG_NAME,
      description: BLOG_DESCRIPTION,
      inLanguage: LOCALE,
      publisher: { "@id": ORG_ID },
      blogPost: ARTICLES.map((a) => ({
        "@type": "BlogPosting",
        "@id": articleId(a.slug),
        url: `${SITE}/blog/${a.slug}/`,
        headline: a.title,
        description: a.excerpt,
        image: `${SITE}/${a.cover}`,
        datePublished: a.date,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      })),
    },
    breadcrumb([
      ["Inicio", `${SITE}/`],
      ["Blog", `${SITE}/blog/`],
    ]),
  ]);
}

export function articleGraph(a: BlogArticle): Node {
  const url = `${SITE}/blog/${a.slug}/`;
  return graph([
    website(),
    organization(),
    {
      "@type": "BlogPosting",
      "@id": articleId(a.slug),
      url,
      headline: a.title,
      description: a.excerpt,
      image: `${SITE}/${a.cover}`,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: LOCALE,
      keywords: a.tags.join(", "),
      timeRequired: `PT${a.readingMinutes}M`,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": BLOG_ID },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    breadcrumb([
      ["Inicio", `${SITE}/`],
      ["Blog", `${SITE}/blog/`],
      [a.title, url],
    ]),
  ]);
}
