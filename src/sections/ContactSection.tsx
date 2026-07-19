import { useState } from "react";
import {
  Phone,Mail,MapPin,Clock,ArrowRight,MessageCircle, Check, Lock
} from "lucide-react";


const [submitted, setSubmitted] = useState(false);

function handleSubmit(e: React.FormEvent) {
e.preventDefault();
if (!formData.privacidad) return;
setSubmitted(true);
}
const [formData, setFormData] = useState({
nombre: "", telefono: "", email: "", localidad: "", mensaje: "", privacidad: false,
});

export default function ContactSection(){
    return( 
    <section id="contacto" className="py-24">
    <div className="max-w-7xl mx-auto px-5">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

    <div>
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Contacto</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
        Solicita tu <span className="text-accent">presupuesto gratuito</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
        Sin compromiso. Te contactamos en menos de 24 horas con un estudio personalizado para tu vivienda o comunidad en Alicante, Murcia o la Vega Baja.
        </p>

        <div className="space-y-4 mb-8">
        {[
            { Icon: Phone, label: "900 123 456 (gratuito)", href: "tel:+34900123456" },
            { Icon: MessageCircle, label: "WhatsApp: 600 000 000", href: "https://wa.me/34624890494" },
            { Icon: Mail, label: "info@solpure.es", href: "mailto:info@solpure.es" },
            { Icon: MapPin, label: "Alicante · Murcia · Vega Baja del Segura", href: "#" },
            { Icon: Clock, label: "Lun–Vie 8:30–18:30 · Sáb 9:00–14:00", href: "#" },
        ].map(({ Icon, label, href }) => (
            <a key={label} href={href} className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-accent" />
            </div>
            {label}
            </a>
        ))}
        </div>

        <div className="rounded-xl border border-border p-4 bg-secondary text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Zonas de trabajo</p>
        <p>Provincia de Alicante · Provincia de Murcia · Vega Baja del Segura · Orihuela · Torrevieja · Elche · Benidorm · Altea · Dénia · Cartagena · Lorca · Mazarrón</p>
        </div>
    </div>

    <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
        {submitted ? (
        <div className="flex flex-col items-center text-center gap-4 py-10">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <Check size={28} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold">¡Solicitud recibida!</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
            Te contactaremos en menos de 24 horas con tu presupuesto personalizado. ¡Gracias por confiar en SolPure!
            </p>
            <button onClick={() => { setSubmitted(false); setFormData({ nombre: "", telefono: "", email: "", localidad: "", mensaje: "", privacidad: false }); }} className="text-xs text-accent hover:underline mt-2">
            Enviar otra consulta
            </button>
        </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-lg mb-5">Solicitar presupuesto</h3>

            <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Nombre *</label>
                <input
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ana García"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Teléfono *</label>
                <input
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="600 000 000"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                />
            </div>
            </div>

            <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Email *</label>
            <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ana@email.com"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
            />
            </div>

            <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Localidad</label>
            <input
                value={formData.localidad}
                onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
                placeholder="Torrevieja, Murcia..."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
            />
            </div>

            <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Mensaje</label>
            <textarea
                rows={3}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                placeholder="Tipo de instalación, superficie del tejado, consumo aproximado..."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors resize-none"
            />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
            <input
                type="checkbox"
                required
                checked={formData.privacidad}
                onChange={(e) => setFormData({ ...formData, privacidad: e.target.checked })}
                className="mt-0.5 w-4 h-4 accent-[#00A86B] flex-shrink-0"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
                He leído y acepto la{" "}
                <a href="#" className="text-accent underline hover:no-underline">Política de Privacidad</a>{" "}
                y consiento el tratamiento de mis datos para atender mi consulta. *
            </span>
            </label>

            <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-1"
            >
            Solicitar presupuesto <ArrowRight size={14} />
            </button>
            <p className="text-xs text-muted-foreground text-center">
            Sin compromiso · Respuesta en menos de 24h · Conexión segura HTTPS
            <Lock size={10} className="inline ml-1 text-accent" />
            </p>
        </form>
        )}
    </div>
    </div>
</div>
</section>);
}