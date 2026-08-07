import {  Zap, ArrowRight, Phone} from "lucide-react";
export default function HeroSection() {
  return (

    <section id="inicio" className="relative w-full min-h-screen flex items-center pt-16">
    <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&h=1100&fit=crop&auto=format)` }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

    <div className="relative z-10 max-w-7xl mx-auto px-5 py-16 md:py-28">
        <div className="max-w-2xl">
        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium mb-6 tracking-wide">
            <Zap size={11} className="text-accent" /> Instalaciones Eléctricas — Alicante · Murcia · Vega Baja
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Instalación de Placas Solares y más en{" "}
            <span className="text-accent">Alicante, Murcia y La Vega Baja</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
            Reduce hasta un <strong className="text-white">80%</strong> tu factura eléctrica con energía solar, domótica y movilidad eléctrica. Sin compromiso.
        </p>
        <div className="flex flex-wrap gap-3">
            <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
            Solicitar presupuesto gratuito <ArrowRight size={15} />
            </a>
            <a
            href="tel:+34743098335"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
            >
            <Phone size={14} /> Llámanos ahora
            </a>
        </div>
        </div>
    </div>
    </section>


  );
}