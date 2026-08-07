import { Lock } from "lucide-react";
import { Link } from "react-router";

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  return (
    <aside aria-label="Aviso de cookies" className="fixed bottom-0 left-0 right-0 z-[100] bg-primary text-primary-foreground p-4 md:p-5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <Lock size={18} aria-hidden="true" className="mt-0.5 flex-shrink-0 text-accent" />
          <p className="text-sm leading-relaxed opacity-90">
            Solo usamos cookies de analítica (Microsoft Clarity) para entender cómo se usa la web, y únicamente
            si las aceptas. Rechazarlas no te quita ninguna función.{" "}
            <Link to="/politica-de-cookies" className="underline hover:text-accent transition-colors">Política de cookies</Link>.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={onReject} className="px-4 py-2 rounded-lg border border-white/30 text-xs hover:bg-white/10 transition-colors">
            Rechazar
          </button>
          <button onClick={onAccept} className="px-5 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity">
            Aceptar
          </button>
        </div>
      </div>
    </aside>
  );
}
