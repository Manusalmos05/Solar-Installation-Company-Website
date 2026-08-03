import HeroSection from "../sections/HeroSection.tsx";
import BenefitsSection from "../sections/BenefitsSection.tsx";
import ServicesSection from "../sections/ServicesSection.tsx";
import HowWeWorkSection from "../sections/HowWeWorkSection.tsx";
import ProjectsSection from "../sections/ProjectsSection.tsx";
import KitsSection from "../sections/kitsSection.tsx";
import CalculatorSection from "../sections/CalculatorSection.tsx";
import BlogSection from "../sections/BlogSection.tsx";
import FaqSection from "../sections/FaqSection.tsx";
import ContactSection from "../sections/ContactSection.tsx";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <HowWeWorkSection />
      <ProjectsSection />
      <KitsSection />
      <CalculatorSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
