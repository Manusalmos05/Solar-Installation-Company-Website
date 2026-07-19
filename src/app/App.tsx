import { useState } from "react";
import {Phone, MessageCircle
} from "lucide-react";

import Navbar from "../sections/Navbar.tsx";
import HeroSection from "../sections/HeroSection.tsx";
import BenefitsSection from "../sections/BenefitsSection.tsx";
import ServicesSection from "../sections/ServicesSection.tsx";
import HowWeWorkSection from "../sections/HowWeWorkSection.tsx";
import ProjectsSection from "../sections/ProjectsSection.tsx";
import CalculatorSection from "../sections/CalculatorSection.tsx"
import FqaSection from "../sections/FaqSection.tsx";
import ContactSection from "../sections/ContactSection.tsx";
import FooterSection from "../sections/FooterSection.tsx";
import CookieBanner from "../app/components/CookieBanner.tsx";

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
 
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
          href="tel:+34624890494"
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Llamar ahora"
        >
          <Phone size={18} />
        </a>
        <a
          href="https://wa.me/34624890494"
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
      </div>

      {/* HERO */}
      <HeroSection />

      {/* BENEFITS */}
      <BenefitsSection />

      {/* SERVICES */}
      <ServicesSection />

      {/* HOW WE WORK */}
      <HowWeWorkSection />

      {/* PROJECTS */}
      <ProjectsSection />

      {/* CALCULATOR */}
      <CalculatorSection />

      {/* FAQ */}
      <FqaSection />

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}

    <FooterSection />

    </div>
  );
}
