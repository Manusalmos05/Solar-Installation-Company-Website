
import { KITS } from "../data/kits.ts";
import { ArrowRight } from "lucide-react";

export default function KitsSection() {
  return (
    <section id="proyectos" className="py-24 bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6">
          {/* Título */}
        <div className="text-center mb-14">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Kits instalables fotovoltaicos y de domótica</p>
        <h2 className="text-4xl font-bold mt-3">Ahorra con nuestros packs</h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Consulta el precio de envío e instalación.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {KITS.map((k) => (
            <div
            key={k.title}
            className="group
            rounded-3xl
            overflow-hidden
            border
            border-border
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
           
           "
            >
                 {/* IMAGEN */}
            <div className="bg-gray-50 p-7">
                <img
                    src={k.img}
                    alt={k.title}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                />
                
            </div>
        
           
            <div className="p-6">
                <h3 className="text-muted-foreground text-xl font-bold">{k.title}</h3>
                <p className="text-muted-foreground mb-6">{k.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                    <div>
                       
                        <p className="text-xs uppercase text-muted-foreground">
                        Desde
                        </p>

                        <p className="text-3xl font-bold text-accent">
                        {k.price}
                        </p>

                    </div>
                    <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-white font-semibold hover:bg-accent/90 transition">
                    Solicitar presupuesto <ArrowRight size={18} />
                    </a>

                </div>



                
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>
  );
}