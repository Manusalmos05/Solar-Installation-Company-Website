export const SITE = "https://www.wf-energy.com";
export const BRAND = "White Fox Energy";
export const PHONE = "+34743098335";
export const PHONE_DISPLAY = PHONE.replace("+34", "");
export const TEL_HREF = `tel:${PHONE}`;
export const EMAIL = "info@wf-energy.com";
export const MAILTO_HREF = `mailto:${EMAIL}`;
export const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}`;
export const LOGO = `${SITE}/icon.svg`;
export const OG_IMAGE = `${SITE}/images/og-image.jpg`;
export const OG_IMAGE_ALT = "Instalación de placas solares fotovoltaicas en una vivienda";
export const LOCALE = "es-ES";
export const OG_LOCALE = "es_ES";
export const TWITTER_CARD = "summary_large_image";
export const INDEXABLE = "index, follow, max-image-preview:large, max-snippet:-1";

export const AREAS = ["Alicante", "Murcia", "Vega Baja del Segura"];

export const BUSINESS_DESCRIPTION =
  "Instalación de placas solares, baterías, cargadores de coche eléctrico y domótica en Alicante, Murcia y la Vega Baja. Estudio y presupuesto gratis en 24 h.";

export const BLOG_NAME = "Blog de autoconsumo solar";
export const BLOG_DESCRIPTION =
  "Guías prácticas sobre placas solares, baterías, cargadores y fiscalidad del autoconsumo en Alicante, Murcia y la Vega Baja, escritas por instaladores.";

export const ORG_ID = `${SITE}/#empresa`;
export const SITE_ID = `${SITE}/#sitio`;
export const BLOG_ID = `${SITE}/blog/#blog`;

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
