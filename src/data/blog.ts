export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover: string;
  readingMinutes: number;
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: "el-mito-del-60-de-descuento-en-el-irpf",
    title: 'El mito del "60% de descuento" en el IRPF',
    excerpt:
      "Destripamos una instalación de 11.500 € llave en mano en Alicante: qué te llevas, cómo funcionan de verdad las deducciones estatal y autonómica, quién puede aprovecharlas y cómo se compara con un depósito bancario.",
    date: "2026-07-31",
    tags: ["fiscalidad", "autoconsumo"],
    cover: "images/cargador_chalet.png",
    readingMinutes: 10,
  },
  {
    slug: "cuantas-placas-solares-necesita-tu-casa",
    title: "¿Cuántas placas solares necesita tu casa? La fórmula, paso a paso",
    excerpt:
      "Aprende a dimensionar tu instalación fotovoltaica a partir de tu factura: consumo diario, horas de sol pico y una fórmula sencilla con ejemplo real en Murcia.",
    date: "2026-07-28",
    tags: ["placas solares", "autoconsumo", "guías"],
    cover: "images/placas.jpg",
    readingMinutes: 6,
  },
  {
    slug: "baterias-solares-como-elegir-capacidad",
    title: "Baterías solares: cómo elegir la capacidad correcta",
    excerpt:
      "kWh nominales vs. útiles, profundidad de descarga, litio frente a plomo-ácido y la fórmula para calcular cuánta batería necesitas de verdad.",
    date: "2026-07-21",
    tags: ["autoconsumo", "guías"],
    cover: "images/bateria.jpg",
    readingMinutes: 7,
  },
];

export const sortedArticles = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const ALL_TAGS = [...new Set(ARTICLES.flatMap((a) => a.tags))].sort();

export function articleBySlug(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
