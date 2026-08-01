import { useState } from "react";
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <ScrollToTop />

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {!cookieAccepted && (
        <CookieBanner onAccept={() => setCookieAccepted(true)} onConfig={() => setCookieAccepted(true)} />
      )}

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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <FooterSection />
    </div>
  );
}
