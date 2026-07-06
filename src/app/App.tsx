import { useState } from "react";
import {
  Sun, Battery, Car, Home, Wifi, Wrench, Phone, Mail, MapPin, Star,
  Menu, X, Check, ChevronDown, ChevronUp, ArrowRight, Zap, Shield,
  TrendingDown, Clock, CreditCard, HeadphonesIcon, MessageCircle,
  BarChart3, Lock
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Sun,
    title: "Placas Solares Fotovoltaicas",
    desc: "Instalamos sistemas de autoconsumo residencial y comunidades de propietarios. Máximo rendimiento, certificación oficial y tramitación incluida.",
    cta: "Ver más",
    img: "photo-1509391366360-2e959784a276",
  },
  {
    icon: Battery,
    title: "Baterías Solares",
    desc: "Almacena la energía que produces y úsala cuando más lo necesitas. Independencia de la red y ahorro máximo en horas punta.",
    cta: "Ver más",
    img: "photo-1614850715649-1d0106293bd1",
  },
  {
    icon: Car,
    title: "Cargadores Vehículo Eléctrico",
    desc: "Puntos de recarga domésticos e industriales certificados. Carga tu coche con energía solar y reduce el coste a casi cero.",
    cta: "Ver más",
    img: "photo-1593941707882-a5bba14938c7",
  },
  {
    icon: Wifi,
    title: "Domótica Inteligente",
    desc: "Automatiza y controla tu hogar desde el móvil. Termostatos, persianas, iluminación y seguridad integrados con tu sistema solar.",
    cta: "Ver más",
    img: "photo-1558618666-fcd25c85cd64",
  },
  {
    icon: BarChart3,
    title: "Monitorización Energética",
    desc: "Visualiza en tiempo real tu producción, consumo y ahorro desde cualquier dispositivo. Alertas automáticas ante incidencias.",
    cta: "Ver más",
    img: "photo-1551288049-bebda4e38f71",
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    desc: "Planes de mantenimiento preventivo y correctivo. Garantizamos el rendimiento máximo de tu instalación durante toda su vida útil.",
    cta: "Ver más",
    img: "photo-1497440001374-f26997328c1b",
  },
];

const BENEFITS = [
  { icon: TrendingDown, label: "Ahorro hasta 80%" },
  { icon: Clock, label: "Instalación rápida" },
  { icon: CreditCard, label: "Subvenciones" },
  { icon: Shield, label: "Garantía 25 años" },
  { icon: Wrench, label: "Mantenimiento" },
  { icon: HeadphonesIcon, label: "Asesoramiento personalizado" },
];

const STEPS = [
  { num: "01", title: "Auditoría gratuita", body: "Visitamos tu propiedad sin compromiso y analizamos tu consumo eléctrico real." },
  { num: "02", title: "Estudio energético", body: "Diseñamos la instalación óptima para tu tejado, orientación y consumo." },
  { num: "03", title: "Presupuesto", body: "Recibes un presupuesto detallado, transparente y sin letra pequeña." },
  { num: "04", title: "Instalación", body: "Nuestro equipo propio instala con limpieza, precisión y en el plazo acordado." },
  { num: "05", title: "Legalización", body: "Gestionamos todos los trámites con distribuidora y administración por ti." },
  { num: "06", title: "Puesta en marcha", body: "Activamos tu sistema, verificamos rendimiento y te enseñamos a monitorizarlo." },
];

const PROJECTS = [
  { img: "photo-1600585154340-be6161a56a0c", label: "Chalet — Torrevieja", kw: "8 kWp" },
  { img: "photo-1497366811353-6870744d04b2", label: "Comunidad — Alicante", kw: "32 kWp" },
  { img: "photo-1558618047-3c8c76ca7d13", label: "Unifamiliar — Murcia", kw: "6 kWp" },
  { img: "photo-1605152276897-4f618f831968", label: "Adosado — Orihuela", kw: "5 kWp" },
  { img: "photo-1487958449943-2429e8be8625", label: "Nave industrial — Elche", kw: "120 kWp" },
  { img: "photo-1570129477492-45c003edd2be", label: "Chalet — Benidorm", kw: "10 kWp" },
];

const TESTIMONIALS = [
  {
    name: "Rosa Martínez",
    loc: "Torrevieja, Alicante",
    body: "Llevamos un año con las placas y pasamos de 210€ al mes a 35€. El equipo fue muy profesional y resolvieron todos los trámites con la eléctrica sin que yo tuviese que hacer nada.",
    stars: 5,
    avatar: "photo-1438761681033-6461ffad8d80",
  },
  {
    name: "Pedro Sánchez",
    loc: "Murcia capital",
    body: "Instalaron 12 paneles en dos días. La aplicación de monitorización es muy intuitiva. Ahorro real del 75% en el primer mes de verano. Muy recomendables.",
    stars: 5,
    avatar: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Comunidad El Palmeral",
    loc: "Orihuela Costa",
    body: "Instalaron 48 paneles en el garaje comunitario. Ahorro de 14.000€/año para los 32 vecinos. La tramitación con el ayuntamiento fue perfecta y muy rápida.",
    stars: 5,
    avatar: "photo-1472099645785-5658abf4ff4e",
  },
  {
    name: "Isabel López",
    loc: "Elda, Alicante",
    body: "Añadimos batería y el cargador para el Tesla. Ahora me cuesta casi cero cargar el coche. La domótica integrada es fantástica, controlo todo desde el móvil.",
    stars: 5,
    avatar: "photo-1544005313-94ddf0286df2",
  },
];

const FAQS = [
  { q: "¿Qué subvenciones existen para placas solares en Alicante y Murcia?", a: "Actualmente puedes acceder al programa MOVES III (hasta 1.300 €/punto de recarga), ayudas del IDAE para autoconsumo y subvenciones de la Generalitat Valenciana y la Región de Murcia. En muchos casos la deducción fiscal estatal llega al 20% en IRPF. Te asesoramos sin coste sobre todas las ayudas aplicables a tu caso." },
  { q: "¿Cuánto tiempo dura la instalación de placas solares?", a: "Una instalación residencial estándar (6–10 paneles) se completa en 1–2 días laborables. Comunidades de propietarios o instalaciones industriales pueden requerir entre 3 y 5 días. La tramitación administrativa posterior tarda entre 4 y 8 semanas." },
  { q: "¿Necesito batería solar?", a: "Depende de tu perfil de consumo. Si consumes mucho en horario nocturno o quieres independencia total de la red, la batería maximiza el ahorro. Si tu consumo es principalmente diurno, los paneles solos ya ofrecen un retorno excelente. Te lo analizamos gratis." },
  { q: "¿Cuánto puedo ahorrar con la energía solar?", a: "Con una instalación bien dimensionada, el ahorro medio en Alicante y Murcia oscila entre el 60% y el 80% de la factura eléctrica anual. Con batería, puedes alcanzar el 90–95%. La amortización media es de 5–7 años." },
  { q: "¿Qué pasa si produzco más energía de la que consumo?", a: "El excedente se vierte a la red y recibes una compensación económica en tu factura (autoconsumo con excedentes). También puedes almacenarlo en batería para usarlo por la noche." },
  { q: "¿Puedo instalar un cargador de coche eléctrico con energía solar?", a: "Sí, es una de las combinaciones más rentables. Puedes cargar tu vehículo eléctrico directamente con la energía que producen tus paneles, reduciendo el coste de recarga prácticamente a cero en los meses de mayor irradiación." },
  { q: "¿Necesito permiso del ayuntamiento para instalar placas solares?", a: "En viviendas unifamiliares generalmente basta con comunicación a la distribuidora. En edificios de protección histórica o comunidades pueden requerirse permisos adicionales. Nos encargamos de todos los trámites por ti." },
  { q: "¿Qué mantenimiento requieren los paneles solares?", a: "Los paneles fotovoltaicos tienen un mantenimiento mínimo: una limpieza anual y revisión de conexiones. Ofrecemos planes de mantenimiento desde 79 €/año con garantía de rendimiento." },
  { q: "¿La domótica es compatible con cualquier instalación solar?", a: "Nuestros sistemas domóticos se integran con cualquier instalación solar que instalemos. Controlamos iluminación, climatización, persianas, seguridad y consumos desde una sola app compatible con iOS y Android." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} fill="#00A86B" className="text-accent" />
      ))}
    </div>
  );
}

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

  const NAV = ["Inicio", "Servicios", "Proyectos", "Opiniones", "Contacto"];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

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

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Sun size={15} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-primary text-base tracking-tight">SolPure</span>
              <span className="hidden sm:inline text-xs text-muted-foreground ml-1.5">Energía Solar</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+34900123456" className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors">
              <Phone size={14} /> 900 123 456
            </a>
            <a
              href="#contacto"
              className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              Presupuesto gratis <ArrowRight size={13} />
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-foreground">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-5 pb-6 pt-3 flex flex-col gap-3">
            {NAV.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="py-1 text-sm text-foreground">
                {l}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="tel:+34900123456" className="flex-1 py-2.5 rounded-full border border-border text-center text-sm font-medium flex items-center justify-center gap-1.5">
                <Phone size={13} /> Llamar
              </a>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="flex-1 py-2.5 rounded-full bg-accent text-white text-center text-sm font-semibold">
                Presupuesto
              </a>
            </div>
          </div>
        )}
      </nav>

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

      {/* TESTIMONIALS */}
      <section id="opiniones" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Opiniones de clientes</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Lo que dicen nuestros clientes</h2>
            <div className="flex items-center justify-center gap-2">
              <StarRow n={5} />
              <span className="text-sm font-bold text-foreground">4.9/5</span>
              <span className="text-sm text-muted-foreground">· 312 reseñas verificadas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-3">
                <StarRow n={t.stars} />
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{t.body}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <img
                    src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&auto=format`}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover bg-secondary"
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.loc}</p>
                  </div>
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
