export type Kit = {
  img: string;
  title: string;
  price: number;
  slug?: string;
};

export const KITS: Kit[] = [
  { img: "images/3kw_kit.webp", title: "Kit solar híbrido 3 kW", price: 6500, slug: "3kw-hibrido" },
  { img: "images/6kw_kit.webp", title: "Kit solar 6 kW", price: 7800, slug: "6kw" },
  { img: "images/6kw(off-grid)_kit.webp", title: "Kit solar off-grid 6 kW", price: 8400, slug: "6kw-offgrid" },
  { img: "images/8kw_kit.webp", title: "Kit solar híbrido 8 kW", price: 10800, slug: "8kw-hibrido" },
  { img: "images/10kw_kit.webp", title: "Kit solar híbrido 10 kW", price: 12000, slug: "10kw-hibrido" },
  { img: "images/cargador_kit.webp", title: "Cargador de coche eléctrico", price: 1200, slug: "cargador" },
  { img: "images/kit_domotico.webp", title: "Kit domótico", price: 2500, slug: "domotico" },
  { img: "images/kit_domotico_small.webp", title: "Kit domótico pequeño", price: 2000, slug: "domotico-s" },
];

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}
