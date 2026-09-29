import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#flota", label: "Nuestra Flota" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[oklch(0.10_0.01_85)] text-[oklch(0.85_0.005_85)]">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img src="/logo-oso.jpg" alt="OSO Logistics" className="h-12 w-12 shrink-0 rounded object-contain mb-4" />
            <p className="text-[oklch(0.75_0.15_85)] font-semibold text-lg mb-2">
              Fuerza que mueve tu negocio
            </p>
            <p className="text-sm text-[oklch(0.65_0.02_85)] leading-relaxed">
              Servicio de transporte de personal y paquetería en la Península de Yucatán. 
              Conectamos Bacalar, Mérida, Chetumal y Valladolid con seguridad y puntualidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[oklch(0.75_0.15_85)] font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm hover:text-[oklch(0.75_0.15_85)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[oklch(0.75_0.15_85)] font-semibold text-lg mb-4">Contacto</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+524464943350" className="flex items-center gap-3 text-sm hover:text-[oklch(0.75_0.15_85)] transition-colors">
                <Phone className="w-4 h-4 text-[oklch(0.75_0.15_85)]" />
                <span>+52 446 494 3350</span>
              </a>
              <a href="mailto:osologistics22@gmail.com" className="flex items-center gap-3 text-sm hover:text-[oklch(0.75_0.15_85)] transition-colors">
                <Mail className="w-4 h-4 text-[oklch(0.75_0.15_85)]" />
                <span>osologistics22@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[oklch(0.75_0.15_85)] mt-0.5" />
                <span>Mérida, Valladolid, Playa del Carmen y Bacalar</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-[oklch(0.75_0.15_85)] font-semibold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com/osologistics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[oklch(0.20_0.01_85)] flex items-center justify-center hover:bg-[oklch(0.75_0.15_85)] hover:text-[oklch(0.12_0.01_85)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/osologistics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[oklch(0.20_0.01_85)] flex items-center justify-center hover:bg-[oklch(0.75_0.15_85)] hover:text-[oklch(0.12_0.01_85)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/524464943350" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[oklch(0.20_0.01_85)] flex items-center justify-center hover:bg-[oklch(0.75_0.15_85)] hover:text-[oklch(0.12_0.01_85)] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-[oklch(0.65_0.02_85)] mt-4">
              Horario de atención:<br />
              Lunes a Sábado: 6:00 AM - 10:00 PM<br />
              Domingo: 7:00 AM - 8:00 PM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[oklch(0.25_0.01_85)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[oklch(0.55_0.02_85)]">
              © {new Date().getFullYear()} OSO Logistics. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-[oklch(0.55_0.02_85)]">
              <a href="#" className="hover:text-[oklch(0.75_0.15_85)] transition-colors">Aviso de Privacidad</a>
              <a href="#" className="hover:text-[oklch(0.75_0.15_85)] transition-colors">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
