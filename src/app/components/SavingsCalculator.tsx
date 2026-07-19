import { useState } from "react";

export default function Calculator() {
  const [gasto, setGasto] = useState(120);
  const [provincia, setProvincia] = useState("Alicante");
  const [tipo, setTipo] = useState("unifamiliar");
  const [resultado, setResultado] = useState<null | { ahorro: number; paneles: number; amortizacion: number }>(null);

  function calcular() {
    const factor = provincia === "Murcia" ? 0.78 : 0.75;
    const bonus = tipo === "unifamiliar" ? 1 : tipo === "adosado" ? 0.9 : 0.85;
    const ahorro = Math.round(gasto * factor * bonus * 12);
    const paneles = tipo === "comunidad" ? 24 : gasto > 200 ? 12 : gasto > 100 ? 8 : 5;
    const inversion = paneles * 450;
    const amortizacion = Math.round((inversion / ahorro) * 10) / 10;
    setResultado({ ahorro, paneles, amortizacion });
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Gasto mensual (€)</label>
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
          <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Provincia</label>
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
          >
            <option>Alicante</option>
            <option>Murcia</option>
            <option>Vega Baja</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Tipo de vivienda</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
          >
            <option value="unifamiliar">Unifamiliar / Chalet</option>
            <option value="adosado">Adosado</option>
            <option value="comunidad">Comunidad de propietarios</option>
          </select>
        </div>
      </div>
      <button
        onClick={calcular}
        className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity mb-6"
      >
        Calcular mi ahorro estimado
      </button>

      {resultado && (
        <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-accent/5 border border-accent/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{resultado.ahorro.toLocaleString("es-ES")} €</div>
            <div className="text-xs text-muted-foreground">Ahorro anual estimado</div>
          </div>
          <div className="text-center border-x border-accent/20">
            <div className="text-3xl font-bold text-foreground mb-1">{resultado.paneles}</div>
            <div className="text-xs text-muted-foreground">Paneles recomendados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-1">{resultado.amortizacion} años</div>
            <div className="text-xs text-muted-foreground">Amortización estimada</div>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground text-center mt-3">
        Cálculo orientativo. Solicita un estudio personalizado gratuito para una cifra exacta.
      </p>
    </div>
  );
}