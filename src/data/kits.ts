export type Kit = {
  img: string;
  title: string;
  price: number;
  slug?: string;
};

export const KITS: Kit[] = [
  { img: "images/3kw_kit.png", title: "Kit solar híbrido 3 kW", price: 6500, slug: "3kw-hibrido" },
  { img: "images/6kw_kit.png", title: "Kit solar 6 kW", price: 7800 },
  { img: "images/6kw(off-grid)_kit.png", title: "Kit solar off-grid 6 kW", price: 8400 },
  { img: "images/8kw_kit.png", title: "Kit solar híbrido 8 kW", price: 10800 },
  { img: "images/10kw_kit.png", title: "Kit solar híbrido 10 kW", price: 12000 },
  { img: "images/cargador_kit.png", title: "Cargador de coche eléctrico", price: 1200 },
  { img: "images/kit_domotico.png", title: "Kit domótico", price: 2500 },
  { img: "images/kit_domotico_small.png", title: "Kit domótico pequeño", price: 2000 },
];

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}
