import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FleetGallery from "@/components/FleetGallery";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_85)]">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FleetGallery />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
