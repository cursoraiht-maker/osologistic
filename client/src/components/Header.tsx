import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#flota", label: "Nuestra Flota" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.12_0.01_85)] border-b border-[oklch(0.25_0.01_85)]">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={() => scrollToSection("#inicio")}
            className="flex items-center shrink-0 group py-1"
          >
            <img
              src="/logo-oso.jpg"
              alt="OSO Logistics"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[oklch(0.85_0.005_85)] hover:text-[oklch(0.75_0.15_85)] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+524464943350"
              onClick={() => trackPhoneClick("header")}
              className="flex items-center gap-2 text-[oklch(0.75_0.15_85)] hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">446 494 3350</span>
            </a>
            <Button 
              onClick={() => scrollToSection("#contacto")}
              className="bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.12_0.01_85)] font-semibold"
            >
              Cotizar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[oklch(0.85_0.005_85)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[oklch(0.25_0.01_85)]">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-[oklch(0.85_0.005_85)] hover:text-[oklch(0.75_0.15_85)] transition-colors py-2 text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-[oklch(0.25_0.01_85)]">
                <a href="tel:+524464943350" className="flex items-center gap-2 text-[oklch(0.75_0.15_85)] mb-3">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">446 494 3350</span>
                </a>
                <Button 
                  onClick={() => scrollToSection("#contacto")}
                  className="w-full bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.12_0.01_85)] font-semibold"
                >
                  Cotizar Ahora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
