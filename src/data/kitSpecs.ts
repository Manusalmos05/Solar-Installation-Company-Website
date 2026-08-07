export type IconName =
  | "trending"
  | "shield"
  | "leaf"
  | "house"
  | "panel"
  | "inverter"
  | "battery"
  | "clipboard"
  | "phone"
  | "droplet"
  | "plug"
  | "wifi"
  | "calendar"
  | "cloud"
  | "lock";

export type KitSpec = {
  badge: string;
  titleMain: string;
  titlePower: string;
  summary: string;
  productImage: string;
  productImageAlt: string;
  productImageWidth: number;
  productImageHeight: number;
  priceLabel: string;
  taxNote: string;
  benefits: { icon: IconName; title: string; body: string }[];
  components?: { icon: IconName; title: string; body: string }[];
  selfSufficiency?: { percent: string; scope: string; body: string };
  stats?: { label: string; value: string; ringPercent?: number }[];
  highlight?: { icon: IconName; title: string; body: string };
  includes?: string[];
  extras?: { label: string; price: number }[];
  guarantees: { icon: IconName; title: string; body: string }[];
};

const SOLAR_BENEFITS: KitSpec["benefits"] = [
  { icon: "trending", title: "Máxima eficiencia", body: "Ahorra más desde el primer día." },
  { icon: "shield", title: "Energía segura", body: "Suministro garantizado incluso en cortes de luz." },
  { icon: "leaf", title: "Energía limpia", body: "Reduce tu huella de carbono." },
  { icon: "house", title: "Aumenta el valor", body: "Revaloriza tu vivienda." },
];

const SOLAR_ADMIN_INCLUDES = [
  "Tasas y trámites ante la administración",
  "Certificado de instalación eléctrica (Boletín)",
  "2 Certificados de eficiencia energética",
  "Trámite de ayudas y subvenciones",
];

const SOLAR_EXTRAS: KitSpec["extras"] = [
  { label: "Batería DEYE 5,12 kWh", price: 900 },
  { label: "Batería DEYE 16 kWh", price: 2200 },
  { label: "Toma de tierra", price: 250 },
  { label: "Cargador coche eléctrico", price: 1000 },
  { label: "Casa inteligente solar (domótica)", price: 2000 },
];

const SOLAR_GUARANTEES: KitSpec["guarantees"] = [
  {
    icon: "shield",
    title: "Instalación profesional",
    body: "Cumplimos con la normativa REBT y la normativa fotovoltaica vigente.",
  },
  {
    icon: "clipboard",
    title: "Gestión completa",
    body: "Nos encargamos de todos los trámites y documentación.",
  },
];

const MEDIA_VIVIENDA = {
  scope: "Para una vivienda media",
  body: "Con este kit, una vivienda media del sureste español solo necesitará comprar entre un 2% y un 10% de la electricidad que consume durante el año.",
};

const DOMOTICO_BASE = {
  badge: "Promoción",
  summary:
    "Controla tu hogar desde cualquier lugar con nuestro sistema inteligente y fácil de usar.",
  productImageWidth: 550,
  productImageHeight: 460,
  priceLabel: "Precio de venta",
  taxNote: "IVA incluido",
  benefits: [
    { icon: "trending", title: "Control total", body: "Gestiona luces, persianas, clima y más desde tu móvil." },
    { icon: "shield", title: "Seguridad inteligente", body: "Cerradura inteligente y acceso remoto para tu tranquilidad." },
    { icon: "leaf", title: "Ahorro y eficiencia", body: "Automatiza y reduce el consumo energético de tu hogar, con control de sistema solar." },
    { icon: "house", title: "Escenarios personalizados", body: "Crea ambientes únicos con un solo toque gracias a las escenas inteligentes." },
  ],
  highlight: {
    icon: "house",
    title: "Home Assistant Green",
    body: "El hub inteligente y privado para hacer tu hogar más eficiente, seguro y conectado.",
  },
  guarantees: [
    {
      icon: "shield",
      title: "Compatible y escalable",
      body: "Sistema compatible con múltiples dispositivos y ampliable según tus necesidades.",
    },
    {
      icon: "cloud",
      title: "Sin cuotas mensuales",
      body: "Sin suscripciones ni costes ocultos. Tu sistema, siempre tuyo.",
    },
    {
      icon: "lock",
      title: "100% privado",
      body: "Tu información y tu hogar siempre bajo tu control.",
    },
  ],
} satisfies Partial<KitSpec>;

export const KIT_SPECS: Record<string, KitSpec> = {
  "3kw-hibrido": {
    badge: "Promoción",
    titleMain: "Kit solar híbrido",
    titlePower: "3 kW",
    summary: "Inversor híbrido Hoymiles 3kW, 8 paneles AIKO 610W y batería DEYE 5,12 kWh",
    productImage: "images/kits/3kw-producto.webp",
    productImageAlt:
      "Paneles solares AIKO 610W, inversor híbrido Hoymiles 3kW y batería DEYE 5,12 kWh",
    productImageWidth: 726,
    productImageHeight: 535,
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: SOLAR_BENEFITS,
    components: [
      { icon: "panel", title: "8 Paneles AIKO 610W", body: "Alta eficiencia N-Type ABC" },
      { icon: "inverter", title: "Inversor Híbrido Hoymiles 3kW", body: "Potencia, fiable y eficiente" },
      { icon: "battery", title: "Batería DEYE 5,12 kWh", body: "Almacenamiento seguro y escalable" },
    ],
    selfSufficiency: {
      percent: "95%",
      scope: "Para una vivienda pequeña",
      body: "Con este kit, una vivienda pequeña de bajo consumo apenas necesitará comprar electricidad de la red, minimizando su dependencia energética durante todo el año.",
    },
    stats: [
      { label: "Producción anual estimada", value: "8.120 kWh" },
      { label: "Cobertura del consumo anual", value: "90% - 98%", ringPercent: 94 },
    ],
    includes: [
      "Inversor híbrido Hoymiles 3kW",
      "8 paneles AIKO 610W",
      "Batería DEYE 5,12 kWh",
      "Full Back-Up",
      "Tasas y trámites ante la administración",
      "Certificado de instalación eléctrica (si aplica)",
      "2 Certificados de eficiencia energética",
      "Trámite de ayudas y subvenciones",
    ],
    extras: [
      { label: "Batería DEYE 5,12kWh", price: 900 },
      { label: "Batería DEYE 10kWh", price: 2200 },
      { label: "Torre de 5kva", price: 250 },
      { label: "Cargador coche eléctrico", price: 1000 },
      { label: "Casa inteligente solar (domótica)", price: 2000 },
    ],
    guarantees: [
      {
        icon: "shield",
        title: "Instalación profesional",
        body: "Contamos con la normativa REBT y servicio técnico 24/7 experto.",
      },
      {
        icon: "clipboard",
        title: "Gestión completa",
        body: "Nos encargamos de todos los trámites y documentación.",
      },
    ],
  },

  "6kw": {
    badge: "Promoción",
    titleMain: "Kit solar",
    titlePower: "6 kW",
    summary: "Inversor híbrido DEYE 6kW, 10 paneles AIKO 610W y batería DEYE 5,12 kWh",
    productImage: "images/kits/6kw-producto.webp",
    productImageAlt:
      "Paneles solares AIKO 610W, inversor híbrido DEYE 6kW y batería DEYE 5,12 kWh",
    productImageWidth: 746,
    productImageHeight: 510,
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: SOLAR_BENEFITS,
    components: [
      { icon: "panel", title: "10 Paneles AIKO 610W", body: "Alta eficiencia N-Type ABC" },
      { icon: "inverter", title: "Inversor Híbrido DEYE 6kW", body: "Potente, fiable y eficiente" },
      { icon: "battery", title: "Batería DEYE 5,12 kWh", body: "Almacenamiento seguro y escalable" },
    ],
    selfSufficiency: { percent: "98%", ...MEDIA_VIVIENDA },
    stats: [
      { label: "Producción anual estimada", value: "10.340 kWh" },
      { label: "Cobertura del consumo anual", value: "90% - 98%", ringPercent: 94 },
    ],
    includes: [
      "Inversor híbrido DEYE 6kW",
      "10 paneles AIKO 610W",
      "Batería DEYE 5,12 kWh",
      "Full Back-Up",
      ...SOLAR_ADMIN_INCLUDES,
    ],
    extras: SOLAR_EXTRAS,
    guarantees: SOLAR_GUARANTEES,
  },

  "6kw-offgrid": {
    badge: "Promoción",
    titleMain: "Kit solar",
    titlePower: "off-grid 6 kW",
    summary: "Inversor Off-grid Felicity 6kW, 10 paneles AIKO 610W y batería Felicity 16 kWh",
    productImage: "images/kits/6kw-offgrid-producto.webp",
    productImageAlt:
      "Paneles solares AIKO 610W, inversor off-grid Felicity 6kW y batería Felicity 16 kWh",
    productImageWidth: 780,
    productImageHeight: 505,
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: SOLAR_BENEFITS,
    components: [
      { icon: "panel", title: "10 Paneles AIKO 610W", body: "Alta eficiencia N-Type ABC" },
      { icon: "inverter", title: "Inversor Off-grid Felicity 6kW", body: "Potente, fiable y eficiente" },
      { icon: "battery", title: "Batería Felicity 16 kWh", body: "Almacenamiento seguro y escalable" },
    ],
    selfSufficiency: {
      percent: "100%",
      scope: "Para ubicaciones sin acceso a red",
      body: "Con este kit, la vivienda es completamente autónoma, proporcionando energía 100% limpia y sostenible, ideal para ubicaciones sin acceso a red.",
    },
    stats: [{ label: "Producción anual estimada", value: "10.340 kWh" }],
    includes: [
      "Inversor Off-grid Felicity 6kW",
      "10 paneles AIKO 610W",
      "Batería Felicity 16 kWh",
      "Full Back-Up",
      ...SOLAR_ADMIN_INCLUDES,
    ],
    extras: SOLAR_EXTRAS,
    guarantees: SOLAR_GUARANTEES,
  },

  "8kw-hibrido": {
    badge: "Promoción",
    titleMain: "Kit solar híbrido",
    titlePower: "8 kW",
    summary: "Inversor híbrido DEYE 8kW, 16 paneles AIKO 610W y batería Felicity 16 kWh",
    productImage: "images/kits/8kw-producto.webp",
    productImageAlt:
      "Paneles solares AIKO 610W, inversor híbrido DEYE 8kW y batería Felicity 16 kWh",
    productImageWidth: 630,
    productImageHeight: 395,
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: SOLAR_BENEFITS,
    components: [
      { icon: "panel", title: "16 Paneles AIKO 610W", body: "Alta eficiencia N-Type ABC" },
      { icon: "inverter", title: "Inversor Híbrido DEYE 8kW", body: "Potente, fiable y eficiente" },
      { icon: "battery", title: "Batería Felicity 16 kWh", body: "Almacenamiento seguro y escalable" },
    ],
    selfSufficiency: { percent: "98%", ...MEDIA_VIVIENDA },
    stats: [
      { label: "Producción anual estimada", value: "14.720 kWh" },
      { label: "Cobertura del consumo anual", value: "90% - 98%", ringPercent: 94 },
    ],
    includes: [
      "Inversor híbrido DEYE 8kW",
      "16 paneles AIKO 610W",
      "Batería Felicity 16 kWh",
      "Full Back-Up",
      ...SOLAR_ADMIN_INCLUDES,
    ],
    extras: SOLAR_EXTRAS,
    guarantees: SOLAR_GUARANTEES,
  },

  "10kw-hibrido": {
    badge: "Promoción",
    titleMain: "Kit solar híbrido",
    titlePower: "10 kW",
    summary: "Inversor híbrido DEYE 10kW, 20 paneles AIKO 610W y batería Felicity 16 kWh",
    productImage: "images/kits/10kw-producto.webp",
    productImageAlt:
      "Paneles solares AIKO 610W, inversor híbrido DEYE 10kW y batería Felicity 16 kWh",
    productImageWidth: 630,
    productImageHeight: 395,
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: SOLAR_BENEFITS,
    components: [
      { icon: "panel", title: "20 Paneles AIKO 610W", body: "Alta eficiencia N-Type ABC" },
      { icon: "inverter", title: "Inversor Híbrido DEYE 10kW", body: "Potente, fiable y eficiente" },
      { icon: "battery", title: "Batería Felicity 16 kWh", body: "Almacenamiento seguro y escalable" },
    ],
    selfSufficiency: { percent: "98%", ...MEDIA_VIVIENDA },
    stats: [
      { label: "Producción anual estimada", value: "18.400 kWh" },
      { label: "Cobertura del consumo anual", value: "92% - 98%", ringPercent: 95 },
    ],
    includes: [
      "Inversor híbrido DEYE 10kW",
      "20 paneles AIKO 610W",
      "Batería Felicity 16 kWh",
      "Full Back-Up",
      ...SOLAR_ADMIN_INCLUDES,
    ],
    extras: SOLAR_EXTRAS,
    guarantees: SOLAR_GUARANTEES,
  },

  cargador: {
    badge: "Promoción",
    titleMain: "Cargador de",
    titlePower: "coche eléctrico",
    summary: "7,4 kW monofásico / 11 kW trifásico. Carga rápida, segura e inteligente.",
    productImage: "images/kits/cargador-producto.webp",
    productImageAlt:
      "Cargador de coche eléctrico AUTEL de pared con cable, conector Tipo 2 y app móvil de control",
    productImageWidth: 928,
    productImageHeight: 600,
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: [
      { icon: "inverter", title: "Carga rápida y eficiente", body: "Potencia ajustable para una carga más rápida y optimizada." },
      { icon: "shield", title: "Seguridad avanzada", body: "Protección contra sobrecargas, cortocircuitos, fugas y sobretemperatura." },
      { icon: "phone", title: "Control inteligente", body: "Monitoriza y gestiona la carga desde tu móvil en tiempo real." },
      { icon: "trending", title: "Control dinámico de cargas", body: "Ajusta automáticamente la potencia de carga según los consumos de tu casa." },
      { icon: "droplet", title: "Diseño resistente", body: "Certificación IP65 para uso en exteriores e interiores." },
    ],
    components: [
      { icon: "inverter", title: "7,4 kW monofásico", body: "Corriente máxima 32 A" },
      { icon: "inverter", title: "11 kW trifásico", body: "Corriente máxima 16 A" },
      { icon: "plug", title: "Conector Tipo 2", body: "Universal IEC 62196-2" },
      { icon: "droplet", title: "Protección IP65", body: "Resistente al agua y al polvo" },
    ],
    highlight: {
      icon: "clipboard",
      title: "Incluye documentación y legalización del punto de carga",
      body: "Nos encargamos de todo, tú no te preocupas.",
    },
    guarantees: [
      {
        icon: "shield",
        title: "Seguridad total",
        body: "Protección contra sobrecargas, cortocircuitos, fugas y sobretemperatura.",
      },
      {
        icon: "wifi",
        title: "Conectividad Wi-Fi / Bluetooth",
        body: "Control y monitorización en tiempo real desde la app AUTEL.",
      },
      {
        icon: "calendar",
        title: "Programación inteligente",
        body: "Programa la carga en horarios valle y optimiza tu consumo.",
      },
      {
        icon: "leaf",
        title: "Eficiencia y sostenibilidad",
        body: "Aprovecha al máximo tu energía y reduce tu huella de carbono.",
      },
    ],
  },

  domotico: {
    ...DOMOTICO_BASE,
    titleMain: "Kit",
    titlePower: "domótico",
    productImage: "images/kits/domotico-producto.webp",
    productImageAlt: "Hub Home Assistant Green con su caja, base del kit domótico",
    includes: [
      "7 módulos de iluminación",
      "5 módulos de persianas",
      "2 mandos de clima",
      "1 cerradura inteligente",
      "3 enchufes inteligentes",
      "1 puerta garaje / piscina / aerotermo",
      "5 escenas personalizadas",
    ],
  },

  "domotico-s": {
    ...DOMOTICO_BASE,
    titleMain: "Kit domótico",
    titlePower: "pequeño",
    productImage: "images/kits/domotico-s-producto.webp",
    productImageAlt: "Hub Home Assistant Green con su caja, base del kit domótico pequeño",
    includes: [
      "5 módulos de iluminación",
      "3 módulos de persianas",
      "1 mando de clima",
      "1 cerradura inteligente",
      "2 enchufes inteligentes",
      "3 escenas personalizadas",
    ],
  },
};
