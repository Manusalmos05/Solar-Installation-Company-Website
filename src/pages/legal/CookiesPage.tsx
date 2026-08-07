import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND } from "../../lib/site.ts";

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="7 de agosto de 2026">
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños
          ficheros que un sitio web guarda en tu dispositivo para recordar información sobre tu visita.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué usamos en este sitio">
        <p>{BRAND} utiliza únicamente lo siguiente:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Preferencia de consentimiento</strong> (propia, técnica): una entrada de
            almacenamiento local llamada <code>wfe-cookie-consent</code> que recuerda si aceptaste o
            rechazaste la analítica. No requiere consentimiento por ser estrictamente necesaria.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> (de terceros, analítica, solo si la aceptas): cookies
            como <code>_clck</code>, <code>_clsk</code>, <code>MUID</code>, <code>ANONCHK</code> y{" "}
            <code>SM</code>, que permiten analizar de forma agregada cómo se navega por la web para
            mejorarla. Más información en la política de privacidad de Microsoft Clarity.
          </li>
        </ul>
        <p>Si rechazas la analítica, Microsoft Clarity no se carga y no se instala ninguna de sus cookies.</p>
      </LegalSection>

      <LegalSection title="3. Cómo cambiar tu elección">
        <p>
          Puedes cambiar tu decisión en cualquier momento desde el enlace «Configuración de cookies»
          del pie de página, que vuelve a mostrar el aviso de cookies. También puedes borrar las
          cookies ya instaladas desde la configuración de tu navegador (Chrome, Firefox, Safari o
          Edge disponen de ayuda específica para ello).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
