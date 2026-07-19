import { useState } from "react";
import {
  Sun, Phone, Mail, MapPin,
  Menu, X, Check, ChevronDown, ChevronUp, ArrowRight, Zap,
   Clock,  MessageCircle, Lock
} from "lucide-react";
import { SERVICES } from "../data/services.ts";
import { BENEFITS } from "../data/benefits.ts";
import { STEPS } from "../data/steps.ts";
import { PROJECTS } from "../data/projects.ts";
import { FAQS } from "../data/faqs.ts";
import Navbar from "../sections/Navbar.tsx";



// ─── Sub-components ───────────────────────────────────────────────────────────


function CookieBanner({ onAccept, onConfig }: { onAccept: () => void; onConfig: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-primary text-primary-foreground p-4 md:p-5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <Lock size={18} className="mt-0.5 flex-shrink-0 text-accent" />
          <p className="text-sm leading-relaxed opacity-90">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.
            Puedes aceptarlas todas o configurar tus preferencias.{" "}
            <a href="#" className="underline hover:text-accent transition-colors">Política de cookies</a>.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={onConfig} className="px-4 py-2 rounded-lg border border-white/30 text-xs hover:bg-white/10 transition-colors">
            Configurar
          </button>
          <button onClick={onAccept} className="px-5 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity">
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}

function Calculator() {
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        {open ? <ChevronUp size={16} className="text-accent flex-shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "", telefono: "", email: "", localidad: "", mensaje: "", privacidad: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.privacidad) return;
    setSubmitted(true);
  }


  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
        <Navbar 
        menuOpen={menuOpen}
    setMenuOpen={setMenuOpen}/>


      {/* Cookie banner */}
      {!cookieAccepted && (
        <CookieBanner onAccept={() => setCookieAccepted(true)} onConfig={() => setCookieAccepted(true)} />
      )}

      {/* Floating CTAs */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3" style={{ bottom: cookieAccepted ? "1.5rem" : "5.5rem" }}>
        <a
          href="tel:+34900123456"
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Llamar ahora"
        >
          <Phone size={18} />
        </a>
        <a
          href="https://wa.me/34600000000"
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
      </div>



      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&h=1100&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium mb-6 tracking-wide">
              <Zap size={11} className="text-accent" /> Instalador certificado — Alicante · Murcia · Vega Baja
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
              Instalación de Placas Solares en{" "}
              <span className="text-accent">Alicante, Murcia</span> y Vega Baja
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
                href="tel:+34900123456"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-secondary py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </div>
                <span className="text-xs font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Nuestros servicios</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Soluciones de energía solar completas
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              De la instalación de placas solares a la domótica inteligente. Todo gestionado por nuestro equipo propio en Alicante y Murcia.
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
                    src={`https://images.unsplash.com/${s.img}?w=600&h=380&fit=crop&auto=format`}
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

      {/* HOW WE WORK */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Cómo trabajamos</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">De la consulta a la puesta en marcha</h2>
            <p className="text-white/70 text-base max-w-lg mx-auto">
              Proceso transparente y sin burocracia para ti. Nos ocupamos de todo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center text-accent text-xs font-bold">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-white">{step.title}</h4>
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

      {/* PROJECTS */}
      <section id="proyectos" className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Proyectos realizados</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Más de 1.200 instalaciones en Alicante y Murcia</h2>
            <p className="text-muted-foreground text-base max-w-lg mx-auto">
              Instalaciones fotovoltaicas residenciales, comunidades de propietarios y naves industriales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PROJECTS.map((p, i) => (
              <div
                key={p.label}
                className={`relative group overflow-hidden rounded-2xl bg-secondary ${i === 0 ? "md:col-span-1 md:row-span-2" : ""}`}
                style={{ height: i === 0 ? undefined : "200px" }}
              >
                <img
                  src={`https://images.unsplash.com/${p.img}?w=700&h=500&fit=crop&auto=format`}
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


      {/* CALCULATOR */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Calculadora de ahorro</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5">¿Cuánto puedes ahorrar con la energía solar?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Introduce tu gasto mensual en electricidad, tu provincia y el tipo de vivienda. Te mostramos un estimado inmediato.
                Para un cálculo exacto, solicita tu auditoría gratuita.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {["placas solares Alicante", "autoconsumo Murcia", "energía solar Vega Baja"].map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-secondary border border-border text-xs">{kw}</span>
                ))}
              </div>
            </div>
            <Calculator />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Preguntas frecuentes</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Todo lo que necesitas saber</h2>
            <p className="text-muted-foreground text-base">Sobre placas solares, subvenciones, baterías, cargadores y domótica en Alicante y Murcia.</p>
          </div>

          <div className="bg-white rounded-2xl border border-border px-6 divide-y divide-border">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
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
                  { Icon: MessageCircle, label: "WhatsApp: 600 000 000", href: "https://wa.me/34600000000" },
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
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Sun size={15} className="text-white" />
                </div>
                <span className="font-bold text-base">SolPure</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Empresa instaladora de energía solar fotovoltaica en Alicante, Murcia y Vega Baja del Segura.
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm mb-4">Navegación</p>
              <ul className="space-y-2 text-xs text-white/60">
                {["Inicio", "Servicios", "Proyectos", "Blog", "Contacto"].map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm mb-4">Legal</p>
              <ul className="space-y-2 text-xs text-white/60">
                {["Política de privacidad", "Política de cookies", "Aviso legal", "Configuración de cookies", "Accesibilidad"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm mb-4">Contacto</p>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-center gap-2"><Phone size={11} /> 900 123 456</li>
                <li className="flex items-center gap-2"><Mail size={11} /> info@solpure.es</li>
                <li className="flex items-center gap-2"><MapPin size={11} /> Alicante · Murcia · Vega Baja</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © 2024 SolPure Instalaciones Solares S.L. · CIF B-00000000 · Todos los derechos reservados
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Lock size={10} className="text-accent" /> Sitio seguro · RGPD · LOPDGDD · LSSI-CE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
