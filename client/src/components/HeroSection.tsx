import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-[oklch(0.12_0.01_85)] pt-16 md:pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a855' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.01_85)] via-[oklch(0.14_0.01_85)] to-[oklch(0.10_0.02_85)]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.75_0.15_85)/0.1] border border-[oklch(0.75_0.15_85)/0.3] mb-6">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.75_0.15_85)] animate-pulse" />
              <span className="text-[oklch(0.75_0.15_85)] text-sm font-medium">Servicio disponible 7 días</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.95_0.005_85)] leading-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Transporte Seguro en la{" "}
              <span className="text-[oklch(0.75_0.15_85)]">Península de Yucatán</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[oklch(0.75_0.02_85)] mb-8 max-w-xl mx-auto lg:mx-0">
              Conectamos Bacalar, Mérida, Chetumal y Valladolid con servicios de transporte de personal y paquetería. 
              <strong className="text-[oklch(0.75_0.15_85)]"> Fuerza que mueve tu negocio.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg"
                onClick={() => scrollToSection("#contacto")}
                className="bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.12_0.01_85)] font-semibold text-lg px-8 py-6"
              >
                Solicitar Cotización
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#rutas")}
                className="border-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)/0.1] font-semibold text-lg px-8 py-6"
              >
                Ver Rutas
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
                </div>
                <span className="text-xs md:text-sm text-[oklch(0.65_0.02_85)] text-center lg:text-left">Viajes Seguros</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
                </div>
                <span className="text-xs md:text-sm text-[oklch(0.65_0.02_85)] text-center lg:text-left">Puntualidad</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
                </div>
                <span className="text-xs md:text-sm text-[oklch(0.65_0.02_85)] text-center lg:text-left">Cobertura Regional</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-[oklch(0.75_0.15_85)/0.2] to-transparent rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-[oklch(0.25_0.01_85)] shadow-2xl">
              <img 
                src="/flota-oso.jpg" 
                alt="Flota OSO Logistics" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.01_85)] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[oklch(0.75_0.15_85)/0.5] flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-[oklch(0.75_0.15_85)]" />
        </div>
      </div>
    </section>
  );
}
