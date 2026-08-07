import { Link } from "react-router";
import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND, EMAIL } from "../../lib/site.ts";

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="7 de agosto de 2026">
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales recogidos en este sitio web es
          [RAZÓN SOCIAL O NOMBRE DEL TITULAR], NIF [NIF], con domicilio en [DOMICILIO], operando bajo el
          nombre comercial {BRAND}. Contacto para cuestiones de privacidad: {EMAIL}.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos recogemos">
        <p>A través del formulario de contacto recogemos: nombre, teléfono, correo electrónico, localidad y el mensaje que nos envías.</p>
        <p>
          Si aceptas las cookies de analítica, Microsoft Clarity recoge datos de uso de la web
          (páginas visitadas, interacciones, tipo de dispositivo) de forma pseudonimizada. Puedes
          consultar el detalle en la <Link to="/politica-de-cookies" className="text-accent-deep underline">política de cookies</Link>.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidad y base jurídica">
        <p>
          Usamos tus datos de contacto exclusivamente para responder a tu solicitud y elaborar el
          estudio o presupuesto que nos pidas. La base jurídica es tu consentimiento, que otorgas al
          marcar la casilla de privacidad antes de enviar el formulario, y la aplicación de medidas
          precontractuales a petición tuya.
        </p>
        <p>No usamos tus datos para publicidad ni elaboramos perfiles comerciales.</p>
      </LegalSection>

      <LegalSection title="4. Destinatarios">
        <p>
          El envío del formulario se procesa a través de EmailJS, que actúa como encargado del
          tratamiento para hacer llegar tu mensaje a nuestro buzón. La analítica, solo si la aceptas,
          la presta Microsoft (Clarity). No cedemos tus datos a terceros con fines comerciales.
        </p>
      </LegalSection>

      <LegalSection title="5. Conservación">
        <p>
          Conservamos los datos de contacto el tiempo necesario para atender tu solicitud y, si se
          formaliza un encargo, durante los plazos legales aplicables a la relación contractual y
          fiscal.
        </p>
      </LegalSection>

      <LegalSection title="6. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
          tratamiento y portabilidad escribiendo a {EMAIL}, indicando el derecho que ejerces y
          adjuntando un medio de verificar tu identidad. También tienes derecho a presentar una
          reclamación ante la Agencia Española de Protección de Datos (aepd.es).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
