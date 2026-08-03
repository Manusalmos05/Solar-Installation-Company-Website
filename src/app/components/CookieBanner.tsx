
import{Lock} from "lucide-react"

interface CookieBannerProps {
    onAccept: () => void;
    onConfig: () => void;
}


export default function CookieBanner({onAccept, onConfig,}: CookieBannerProps) {

  return (
    <aside aria-label="Aviso de cookies" className="fixed bottom-0 left-0 right-0 z-[100] bg-primary text-primary-foreground p-4 md:p-5 shadow-2xl">
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
    </aside>
  );
}
