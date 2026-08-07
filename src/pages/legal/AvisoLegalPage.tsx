import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND, EMAIL, PHONE_DISPLAY, SITE } from "../../lib/site.ts";

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" updated="7 de agosto de 2026">
      <LegalSection title="1. Identificación del titular">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
          de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular de este
          sitio web es:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Titular: [RAZÓN SOCIAL O NOMBRE DEL TITULAR]</li>
          <li>NIF: [NIF]</li>
          <li>Domicilio: [DOMICILIO A EFECTOS DE NOTIFICACIONES]</li>
          <li>Nombre comercial: {BRAND}</li>
          <li>Correo electrónico: {EMAIL}</li>
          <li>Teléfono: {PHONE_DISPLAY}</li>
          <li>Sitio web: {SITE}</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          Este sitio web tiene por objeto dar a conocer los servicios de instalación de energía solar
          fotovoltaica, baterías, cargadores de vehículo eléctrico y domótica que {BRAND} presta en
          Alicante, Murcia y la Vega Baja del Segura, así como facilitar la solicitud de estudios y
          presupuestos sin compromiso.
        </p>
      </LegalSection>

      <LegalSection title="3. Condiciones de uso">
        <p>
          El acceso a este sitio web es gratuito y atribuye la condición de usuario, que implica la
          aceptación de las presentes condiciones. El usuario se compromete a hacer un uso adecuado de
          los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.
        </p>
        <p>
          Los precios y promociones mostrados tienen carácter orientativo y no constituyen oferta
          contractual; el presupuesto definitivo se formaliza tras el estudio personalizado de cada
          instalación.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual e industrial">
        <p>
          Salvo indicación expresa, los contenidos de este sitio (textos, imágenes, logotipos, diseño y
          código) son titularidad de {BRAND} o de sus licenciantes, y están protegidos por la normativa
          de propiedad intelectual e industrial. Las marcas de terceros citadas (fabricantes de paneles,
          inversores, baterías u otros equipos) pertenecen a sus respectivos titulares y se usan con
          finalidad meramente descriptiva.
        </p>
      </LegalSection>

      <LegalSection title="5. Responsabilidad">
        <p>
          {BRAND} no se hace responsable de los daños derivados del uso incorrecto del sitio web ni de
          los contenidos de sitios de terceros enlazados desde estas páginas. Se procura que la
          información esté actualizada, pero no se garantiza la ausencia de errores; agradecemos
          cualquier aviso a {EMAIL}.
        </p>
      </LegalSection>

      <LegalSection title="6. Legislación aplicable">
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
          serán competentes los juzgados y tribunales que correspondan conforme a la normativa de
          consumidores y usuarios.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
