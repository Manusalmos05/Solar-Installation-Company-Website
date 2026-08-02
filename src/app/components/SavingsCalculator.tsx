import { useState } from "react";

// Catálogo de Equipos de Referencia reales de mercado
const INVERSORES_REFERENCIA = [
  { maxKwp: 4.5, inversor: "Inversor Híbrido 3 kW / 3.6 kW", bateria5kw: "Batería Litio 5,12 kWh", bateria16kw: "Batería Litio 10 kWh" },
  { maxKwp: 7.5, inversor: "Inversor Híbrido 5 kW / 6 kW", bateria5kw: "Batería Litio 5,12 kWh", bateria16kw: "Batería Litio 10 kWh" },
  { maxKwp: 11.0, inversor: "Inversor Híbrido 8 kW / 10 kW", bateria5kw: "Batería Litio 10 kWh", bateria16kw: "Batería Litio 16 kWh" },
  { maxKwp: 99.0, inversor: "Inversor Híbrido 12 kW / 15 kW", bateria5kw: "Batería Litio 16 kWh", bateria16kw: "Batería Litio 20+ kWh" }
];

// Rendimiento promedio anual kWh producidos por kWp instalado (Levante/Sureste)
const RENDIMIENTO_PROVINCIA_KWH_KWP = {
  Alicante: 1550, // ~1550 kWh por kWp instalado al año
  Murcia: 1600    // ~1600 kWh por kWp instalado al año
};

// Potencia media por panel de alta eficiencia (540W = 0.54 kWp)
const POTENCIA_PANEL_REFERENCIA_KW = 0.54;

// Precio/kWh estimado por tramos (incluidos potencia, peajes e impuestos)
function obtenerPrecioReferenciaKwh(gasto: number): number {
  if (gasto <= 70) return 0.44;  // Facturas bajas: tarifas no optimizadas + alto peso del término fijo
  if (gasto <= 160) return 0.24; // Facturas medias: ajustado a 0.24 €/kWh
  return 0.20;                   // Facturas altas: gran volumen de consumo
}

  interface ResultadoCalculo {
      ahorroAnualEstimadoEuro: number;
      produccionAnualKwh: number;
      consumoEstimadoKwhMes: number;
      potenciaTotalKwp: number;
      numeroPanelesEstimado: number;
      amortizacionEstimadaAños: string;
      sistemaNombre: string;
      bateriaInfo:any;
      inversorInfo:any,
      porcentajeAhorroPct: number;
    };

export default function Calculator() {
  const [gasto, setGasto] = useState(100);
  const [provincia, setProvincia] = useState("Alicante");
  const [incluyeBateriaFisica, setIncluyeBateriaFisica] = useState(true);
  const [incluyeBateriaVirtual, setIncluyeBateriaVirtual] = useState(true);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  function calcular() {
    const gastoValido = Math.max(0, Number(gasto) || 0);

    if (gastoValido === 0) {
      setResultado(null);
      return;
    }

    // 1. Obtener precio estimado dinámico por tramo
    const precioKwhAplicado = obtenerPrecioReferenciaKwh(gastoValido);

    // 2. Estimar consumo mensual y anual en kWh
    const consumoEstimadoKwhMes = Math.round(gastoValido / precioKwhAplicado);
    const consumoAnualKwh = consumoEstimadoKwhMes * 12;

    // 3. Asignación de % de Ahorro y Cobertura de Producción según la combinación de baterías
    let factorCoberturaPotencia = 0.80; // Base sin baterías
    let porcentajeAhorroFactura = 0.80; // Base sin baterías

    if (incluyeBateriaFisica && incluyeBateriaVirtual) {
      factorCoberturaPotencia = 0.95; // 95% cobertura
      porcentajeAhorroFactura = 0.95; // 95% ahorro
    } else if (incluyeBateriaFisica) {
      factorCoberturaPotencia = 0.90; // 90% cobertura
      porcentajeAhorroFactura = 0.90; // 90% ahorro
    } else if (incluyeBateriaVirtual) {
      factorCoberturaPotencia = 0.85; // 85% cobertura
      porcentajeAhorroFactura = 0.85; // 85% ahorro
    }

    // 4. Cálculo de potencia base en kWp
    const rendimientoLocal = RENDIMIENTO_PROVINCIA_KWH_KWP[provincia as keyof typeof RENDIMIENTO_PROVINCIA_KWH_KWP];
    const kwpBrutosBase = (consumoAnualKwh * factorCoberturaPotencia) / rendimientoLocal;
    
    // 5. MARGEN TÉCNICO DE SEGURIDAD (+1.5 paneles de 540W ≈ +0.81 kWp)
    const margenTecnicoKwp = 1.5 * POTENCIA_PANEL_REFERENCIA_KW; // ~0.81 kWp adicionales
    
    // Potencia total ajustada en kWp
    const potenciaTotalKwp = Math.max(2.16, Math.round((kwpBrutosBase + margenTecnicoKwp) * 100) / 100);

    // Número final de paneles físicos de 540W
    const numeroPanelesEstimado = Math.round(potenciaTotalKwp / POTENCIA_PANEL_REFERENCIA_KW);

    // 6. Ahorro Anual Estimado en Euros (€/año)
    const gastoAnualFactura = gastoValido * 12;
    const ahorroAnualEstimadoEuro = Math.round(gastoAnualFactura * porcentajeAhorroFactura);
    const porcentajeAhorroPct= Math.round(porcentajeAhorroFactura * 100);

    // 7. Emparejamiento con equipo comercial sugerido
    const equipoMatcheado = INVERSORES_REFERENCIA.find((e) => potenciaTotalKwp <= e.maxKwp) || INVERSORES_REFERENCIA[3];

    const inversorSugerido = equipoMatcheado.inversor;
    const bateriaSugerida = incluyeBateriaFisica 
      ? (potenciaTotalKwp > 7.5 ? equipoMatcheado.bateria16kw : equipoMatcheado.bateria5kw)
      : "Sin batería física";
      const bateriaInfo= bateriaSugerida;
      const inversorInfo= inversorSugerido;

    // 8. Producción Anual Estimada
    const produccionAnualKwh = Math.round(potenciaTotalKwp * rendimientoLocal);

    // 9. Amortización orientativa
    const amortizacionEstimadaAños = incluyeBateriaFisica ? "4 - 6 años" : "3 - 5 años";

    // 10. Nombre dinámico del sistema
    const sistemaNombre = `Instalación ${incluyeBateriaFisica ? "con Batería Física" : "Autoconsumo Directo"} (${potenciaTotalKwp} kWp)`;

    // 11. Actualización del estado
     setResultado({
      ahorroAnualEstimadoEuro,
      produccionAnualKwh,
      consumoEstimadoKwhMes,
      potenciaTotalKwp,
      numeroPanelesEstimado,
      amortizacionEstimadaAños,
      sistemaNombre,
      bateriaInfo,
      inversorInfo,
      porcentajeAhorroPct
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Factura promedio mensual (€)
          </label>
          <input
            type="number"
            min={30}
            max={2000}
            value={gasto}
            onChange={(e) => setGasto(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Provincia
          </label>
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
          >
            <option value="Alicante">Alicante</option>
            <option value="Murcia">Murcia</option>
          </select>
        </div>
      </div>

      {/* Opción Batería Física */}
      <div className="mb-2 p-3.5 rounded-xl bg-secondary/40 border border-border">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={incluyeBateriaFisica}
            onChange={(e) => setIncluyeBateriaFisica(e.target.checked)}
            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-xs md:text-sm font-medium text-foreground">
            Incluir batería física de almacenamiento (acumula energía para la noche)
          </span>
        </label>
      </div>

      {/* Opción Batería Virtual */}
      <div className="mb-4 p-3.5 rounded-xl bg-secondary/40 border border-border">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={incluyeBateriaVirtual}
            onChange={(e) => setIncluyeBateriaVirtual(e.target.checked)}
            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-xs md:text-sm font-medium text-foreground">
            Aprovechar Monedero / Batería Virtual (compensar peajes y término fijo)
          </span>
        </label>
      </div>

      {/* Explicación del consumo estimado */}
      <p className="text-xs text-muted-foreground mb-6">
        * Con una factura de {gasto} €/mes, estimamos un consumo de ~{Math.round(gasto / obtenerPrecioReferenciaKwh(gasto))} kWh/mes (estimado a {obtenerPrecioReferenciaKwh(gasto)} €/kWh incluidos potencia, peajes e impuestos).
      </p>

      <button
        onClick={calcular}
        className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity mb-6"
      >
        Calcular producción y ahorro
      </button>

      {resultado && (
        <div className="space-y-4">
          {/* Métricas Principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-accent/5 border border-accent/20">
            {/* Ahorro Anual Estimado */}
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                {resultado.ahorroAnualEstimadoEuro.toLocaleString("es-ES")} €
              </div>
              <div className="text-xs text-muted-foreground">Ahorro estimado / año (~{resultado.porcentajeAhorroPct}%)</div>
            </div>

            {/* Producción Anual */}
            <div className="text-center md:border-l border-accent/20 pt-3 md:pt-0">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {resultado.produccionAnualKwh.toLocaleString("es-ES")} kWh
              </div>
              <div className="text-xs text-muted-foreground">Producción estimada / año</div>
            </div>

            {/* Potencia Fotovoltaica + Paneles */}
            <div className="text-center border-t md:border-t-0 md:border-l border-accent/20 pt-3 md:pt-0">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {resultado.potenciaTotalKwp} kWp
              </div>
              <div className="text-xs text-muted-foreground">
                ~{resultado.numeroPanelesEstimado} paneles (540W)
              </div>
            </div>

            {/* Amortización */}
            <div className="text-center border-t md:border-t-0 md:border-l border-accent/20 pt-3 md:pt-0">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                {resultado.amortizacionEstimadaAños}
              </div>
              <div className="text-xs text-muted-foreground">Amortización media</div>
            </div>
          </div>

          {/* Ficha Detallada de la Configuración Recomendada */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs text-muted-foreground space-y-1.5">
            <div className="flex justify-between font-semibold text-foreground pb-1 border-b border-border/50">
              <span>Configuración orientativa:</span>
              <span>{resultado.sistemaNombre}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Módulos fotovoltaicos:</span>
              <span className="text-foreground font-medium">
                {resultado.numeroPanelesEstimado} módulos de ~540 Wp
              </span>
            </div>
            <div className="flex justify-between">
              <span>Inversor recomendado:</span>
              <span className="text-foreground font-medium">{resultado.inversorInfo}</span>
            </div>
            <div className="flex justify-between">
              <span>Batería física:</span>
              <span className="text-foreground font-medium">{resultado.bateriaInfo}</span>
            </div>
            <div className="flex justify-between">
              <span>Batería virtual:</span>
              <span className="text-foreground font-medium">
                {incluyeBateriaVirtual ? "Activada (compensación de sobrantes)" : "No configurada"}
              </span>
            </div>
          </div>

          {/* Nota Aclaratoria sobre Subvenciones y Deducción Fiscal */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/60 text-xs text-slate-700 space-y-1">
            <p className="font-semibold text-slate-900">
              💡 Subvenciones y bonificaciones fiscales disponibles:
            </p>
            <p>
              El periodo de amortización puede reducirse significativamente gracias a las <strong>deducciones del IRPF (hasta un 40%-60%)</strong> y las bonificaciones en el <strong>IBI y ICIO</strong> según tu municipio.
            </p>
          </div>

          {/* Llamada a la Acción */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-center space-y-2">
            <p className="text-xs text-foreground font-medium">
              Esta estimación es una guía inicial. Cada tejado y hábito de consumo es único.
            </p>
            <a
              href="#contacto"
              className="inline-block w-full md:w-auto px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-xs transition-transform active:scale-95"
            >
              Solicitar estudio técnico y presupuesto exacto gratuito
            </a>
          </div>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground text-center mt-3">
        Cálculo orientativo basado en la irradiación promedio de {provincia}. Contacta con nuestro equipo para un análisis de sombras y orientación exacto.
      </p>
    </div>
  );
}