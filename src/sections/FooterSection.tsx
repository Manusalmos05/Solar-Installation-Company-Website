import { useState } from "react";
import {Sun,Phone,Mail,MapPin,Lock} from "lucide-react"
import { Link } from "react-router";
import { EMAIL, PHONE_DISPLAY } from "../lib/site.ts";

const LEGAL_LINKS: Array<[string, string]> = [
  ["Política de privacidad", "/politica-de-privacidad"],
  ["Política de cookies", "/politica-de-cookies"],
  ["Aviso legal", "/aviso-legal"],
  ["Accesibilidad", "/accesibilidad"],
];

export default function FooterSection({ onCookieSettings }: { onCookieSettings?: () => void }){
    return(
            <footer className="bg-primary text-primary-foreground pt-14 pb-6">
    <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sun size={15} className="text-white" />
            </div>
            <span className="font-bold text-base">White Fox Energy</span>
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
            {LEGAL_LINKS.map(([label, to]) => (
                <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
            <li>
                <button onClick={onCookieSettings} className="hover:text-white transition-colors">
                    Configuración de cookies
                </button>
            </li>
            </ul>
        </div>

        <div>
            <p className="font-semibold text-sm mb-4">Contacto</p>
            <ul className="space-y-2 text-xs text-white/60">
            <li className="flex items-center gap-2"><Phone size={11} /> {PHONE_DISPLAY}</li>
            <li className="flex items-center gap-2"><Mail size={11} /> {EMAIL}</li>
            <li className="flex items-center gap-2"><MapPin size={11} /> Alicante · Murcia · Vega Baja</li>
            </ul>
        </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/60">
            © 2026 White Fox Energy · Instalaciones solares en Alicante, Murcia y Vega Baja · Todos los derechos reservados
        </p>
        <div className="flex items-center gap-1.5 text-xs text-white/60">
            <Lock size={10} className="text-accent" /> Sitio seguro · RGPD · LOPDGDD · LSSI-CE
        </div>
        </div>
    </div>
    </footer>
    );
}