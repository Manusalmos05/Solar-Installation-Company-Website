import { STEPS } from "../data/steps";
import { ArrowRight } from "lucide-react";

export default function HowWeWorkSection() {

    return (

    <section className="py-24 bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Cómo trabajamos</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">De la consulta a la puesta en marcha</h2>
        <p className="text-white/70 text-base max-w-lg mx-auto">
            Proceso transparente y sin burocracia para ti. Nos ocupamos de todo.
        </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-md mx-auto md:max-w-none md:mx-0 md:grid-cols-none md:grid-rows-2 md:grid-flow-col md:auto-cols-fr md:gap-6">
        {STEPS.map((step) => (
            <div key={step.num} className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center text-accent text-xs font-bold">
                {step.num}
            </div>
            <div>
                <h3 className="font-bold text-sm mb-1 text-white">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
            </div>
            </div>
        ))}
        </div>

        <div className="mt-12 text-center">
        <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
            Solicitar estudio energético gratuito <ArrowRight size={14} />
        </a>
        </div>
    </div>
    </section>
);

}

