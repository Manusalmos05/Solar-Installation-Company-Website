
import KitsCarousel from "../app/components/KitsCarousel";


export default function KitsSection() {
  return (
    <section id="kits" className="py-24 bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6">
          {/* Título */}
        <div className="text-center mb-14">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Kits instalables fotovoltaicos y de domótica</p>
        <h2 className="text-4xl font-bold mt-3">Ahorra con nuestros packs</h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Consulta el precio de envío e instalación.
        </p>
        </div>

        <KitsCarousel />
    </div>
    </section>
  );
}