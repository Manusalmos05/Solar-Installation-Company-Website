import Calculator from "../app/components/SavingsCalculator.tsx";


export default function CalculatorSection() {
    return (

    <section className="py-24">
    <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Calculadora de ahorro</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5">¿Cuánto puedes ahorrar con la energía solar?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
            Introduce tu gasto mensual en electricidad, tu provincia y el tipo de vivienda. Te mostramos un estimado inmediato.
            <b>Para un cálculo exacto, solicita una cita de valoración.</b>
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {["placas solares Alicante", "autoconsumo Murcia", "energía solar Vega Baja", "ahorro en tu factura"].map((kw) => (
                <span key={kw} className="px-3 py-1 rounded-full bg-secondary border border-border text-xs">{kw}</span>
            ))}
            </div>
        </div>
        <Calculator />
        </div>
    </div>
    </section>
    );
}