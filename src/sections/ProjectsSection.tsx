
import { PROJECTS } from "../data/projects.ts";

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="py-24">
    <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Proyectos realizados</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Proyectos en Alicante y Murcia</h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Instalaciones fotovoltaicas residenciales y proyectos de domótica.
        </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
            <div
            key={p.label}
            className={`relative group overflow-hidden rounded-2xl bg-secondary ${i === 0 ? "md:col-span-1 md:row-span-2" : ""}`}
            style={{ height: i === 0 ? undefined : "200px" }}
            >
            <img
                src={p.img}
                alt={p.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ height: i === 0 ? "420px" : "200px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-semibold">{p.label}</p>
                <p className="text-accent text-xs">{p.kw}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>
  );
}