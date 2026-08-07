import React from "react";
import { Link } from "react-router";
import { Zap, Phone, ArrowRight, Menu, X } from "lucide-react";
import { NAV, NAV_DIR } from "../data/navigation";
import { PHONE_DISPLAY, TEL_HREF } from "../lib/site.ts";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const homeAnchor = (dir: string) => `${import.meta.env.BASE_URL}#${dir.toLowerCase()}`;

export default function Navbar({
  menuOpen,
  setMenuOpen,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
    <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href={homeAnchor("inicio")} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap size={15} className="text-white" />
        </div>
        <div>
            <span className="font-bold text-primary text-base tracking-tight">White Fox Energy</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-1.5">Soluciones eléctricas</span>
        </div>
        </a>

        <div className="hidden lg:flex items-center gap-7">
        {NAV.map((l, i) =>
            NAV_DIR[i] === "Blog" ? (
            <Link key={l} to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
            </Link>
            ) : (
            <a key={l} href={homeAnchor(NAV_DIR[i])} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
            </a>
            )
        )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
        <a href={TEL_HREF} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors">
            <Phone size={14} /> {PHONE_DISPLAY}
        </a>
        <a
            href={homeAnchor("contacto")}
            className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
            Presupuesto gratis <ArrowRight size={13} />
        </a>
        </div>

        <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden text-foreground"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
    </div>

    {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-5 pb-6 pt-3 flex flex-col gap-3">
        {NAV.map((l, i) =>
            NAV_DIR[i] === "Blog" ? (
            <Link key={l} to="/blog" onClick={() => setMenuOpen(false)} className="py-1 text-sm text-foreground">
                {l}
            </Link>
            ) : (
            <a key={l} href={homeAnchor(NAV_DIR[i])} onClick={() => setMenuOpen(false)} className="py-1 text-sm text-foreground">
                {l}
            </a>
            )
        )}
        <div className="flex gap-3 pt-2">
            <a href={TEL_HREF} className="flex-1 py-2.5 rounded-full border border-border text-center text-sm font-medium flex items-center justify-center gap-1.5">
            <Phone size={13} /> Llamar
            </a>
            <a href={homeAnchor("contacto")} onClick={() => setMenuOpen(false)} className="flex-1 py-2.5 rounded-full bg-accent text-white text-center text-sm font-semibold">
            Presupuesto
            </a>
        </div>
        </div>
    )}
    </nav>
    );
}
