import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND, EMAIL } from "../../lib/site.ts";

export default function AccesibilidadPage() {
  return (
    <LegalPage title="Accesibilidad" updated="7 de agosto de 2026">
      <LegalSection title="Nuestro compromiso">
        <p>
          En {BRAND} queremos que cualquier persona pueda usar esta web, independientemente de sus
          capacidades o del dispositivo que utilice. Trabajamos para cumplir el nivel AA de las Pautas
          de Accesibilidad para el Contenido Web (WCAG) 2.1.
        </p>
      </LegalSection>

      <LegalSection title="Medidas aplicadas">
        <ul className="list-disc space-y-2 pl-6">
          <li>Contraste de color de nivel AA en textos y controles.</li>
          <li>Navegación completa por teclado, incluido el carrusel de kits.</li>
          <li>Textos alternativos en las imágenes y etiquetas ARIA en los componentes interactivos.</li>
          <li>Estructura semántica de encabezados y HTML válido en todas las páginas.</li>
          <li>Contenido legible y funcional en móvil, tablet y escritorio.</li>
        </ul>
      </LegalSection>

      <LegalSection title="¿Has encontrado una barrera?">
        <p>
          Si algo de esta web te resulta difícil de usar o inaccesible, escríbenos a {EMAIL}{" "}
          describiendo el problema y la página en la que ocurre. Nos comprometemos a estudiarlo y
          corregirlo lo antes posible.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
