import { FAQS } from "../data/faqs";
import FaqItem from "../app/components/FaqItem.tsx";

export default function FqaSection(){
    return(
    <section className="py-24 bg-secondary">
    <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Preguntas frecuentes</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Todo lo que necesitas saber</h2>
        <p className="text-muted-foreground text-base">Sobre placas solares, subvenciones, baterías, cargadores, boletines elécticos y domótica en Alicante y Murcia.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border px-6 divide-y divide-border">
        {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
        </div>
    </div>
    </section>
    );
}