import {SERVICES} from "../data/services.ts";

import {ArrowRight} from "lucide-react";

export default function ServicesSection() {
    return (
    <section id="servicios" className="py-24">
    <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Nuestros servicios</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Soluciones de energía solar completas
        </h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Desde la instalación de placas solares y la domótica inteligente hasta reformas eléctricas. Todo gestionado por nuestro equipo propio en Alicante y Murcia.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
            <div
            key={s.title}
            className="group rounded-2xl border border-border overflow-hidden hover:shadow-md hover:border-accent/30 transition-all duration-300 bg-white"
            >
            <div className="relative h-48 bg-secondary overflow-hidden">
                <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <s.icon size={16} className="text-white" />
                </div>
            </div>
            <div className="p-5">
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <a
                href="#contacto"
                className="inline-flex items-center gap-1 text-accent text-xs font-semibold hover:gap-2 transition-all"
                >
                {s.cta} <ArrowRight size={12} />
                </a>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>
    );
}