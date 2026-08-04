export type IconName =
  | "trending"
  | "shield"
  | "leaf"
  | "house"
  | "panel"
  | "inverter"
  | "battery"
  | "clipboard";

export type KitSpec = {
  badge: string;
  titleMain: string;
  titlePower: string;
  summary: string;
  productImage: string;
  productImageAlt: string;
  priceLabel: string;
  taxNote: string;
  benefits: { icon: IconName; title: string; body: string }[];
  components: { icon: IconName; title: string; body: string }[];
  selfSufficiency: { percent: string; scope: string; body: string };
  stats: { label: string; value: string; ring?: boolean }[];
  includes: string[];
  extras: { label: string; price: number }[];
  guarantees: { icon: IconName; title: string; body: string }[];
};

export const KIT_SPECS: Record<string, KitSpec> = {
  "3kw-hibrido": {
    badge: "Promoción",
    titleMain: "Kit solar híbrido",
    titlePower: "3 kW",
    summary: "Inversor híbrido Hoymiles 3kW, 8 paneles AIKO 610W y batería DEYE 5,12 kWh",
    productImage: "images/kits/3kw-producto.webp",
    productImageAlt:
      "Paneles solares AIKO 610W, inversor híbrido Hoymiles 3kW y batería DEYE 5,12 kWh",
    priceLabel: "Precio de venta",
    taxNote: "IVA incluido",
    benefits: [
      { icon: "trending", title: "Máxima eficiencia", body: "Ahorra más desde el primer día." },
      { icon: "shield", title: "Energía segura", body: "Suministro garantizado incluso en cortes de luz." },
      { icon: "leaf", title: "Energía limpia", body: "Reduce tu huella de carbono." },
      { icon: "house", title: "Aumenta el valor", body: "Revaloriza tu vivienda." },
    ],
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
      { label: "Cobertura del consumo anual", value: "90% - 98%", ring: true },
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
};
