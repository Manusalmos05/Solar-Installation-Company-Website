import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { Phone, MessageCircle } from "lucide-react";

import Navbar from "../sections/Navbar.tsx";
import FooterSection from "../sections/FooterSection.tsx";
import CookieBanner from "./components/CookieBanner.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import HomePage from "../pages/HomePage.tsx";
import BlogPage from "../pages/BlogPage.tsx";
import ArticlePage from "../pages/ArticlePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import AvisoLegalPage from "../pages/legal/AvisoLegalPage.tsx";
import PrivacidadPage from "../pages/legal/PrivacidadPage.tsx";
import CookiesPage from "../pages/legal/CookiesPage.tsx";
import AccesibilidadPage from "../pages/legal/AccesibilidadPage.tsx";
import { TEL_HREF, WHATSAPP } from "../lib/site.ts";
import { getStoredConsent, storeConsent, loadClarity, type CookieConsent } from "../lib/consent.ts";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  useEffect(() => {
    if (consent === "accepted") loadClarity();
  }, [consent]);

  const decideConsent = (value: CookieConsent) => {
    storeConsent(value);
    setConsent(value);
  };

  const bannerVisible = consent === null;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <ScrollToTop />

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {bannerVisible && (
        <CookieBanner onAccept={() => decideConsent("accepted")} onReject={() => decideConsent("rejected")} />
      )}

      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3" style={{ bottom: bannerVisible ? "5.5rem" : "1.5rem" }}>
        <a
          href={TEL_HREF}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Llamar ahora"
        >
          <Phone size={18} />
        </a>
        <a
          href={WHATSAPP}
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacidadPage />} />
        <Route path="/politica-de-cookies" element={<CookiesPage />} />
        <Route path="/accesibilidad" element={<AccesibilidadPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <FooterSection onCookieSettings={() => setConsent(null)} />
    </div>
  );
}
