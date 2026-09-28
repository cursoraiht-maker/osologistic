import { CheckCircle } from "lucide-react";

const fleetFeatures = [
  "Unidades modelo reciente",
  "Aire acondicionado",
  "Asientos reclinables",
  "Amplio espacio para equipaje",
  "GPS y rastreo en tiempo real",
  "Seguro de viajero incluido",
  "Mantenimiento preventivo constante",
  "Limpieza y sanitización diaria",
];

export default function FleetGallery() {
  return (
    <section id="flota" className="py-20 md:py-28 bg-[oklch(0.14_0.01_85)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] text-sm font-medium mb-4">
            Nuestra Flota
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.95_0.005_85)] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Viaja con Comodidad y Seguridad
          </h2>
          <p className="text-lg text-[oklch(0.65_0.02_85)] max-w-2xl mx-auto">
            Contamos con unidades modernas y bien equipadas para garantizar tu comodidad en cada viaje.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[oklch(0.75_0.15_85)/0.2] to-transparent rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-[oklch(0.25_0.01_85)]">
              <img 
                src="/flota-oso.jpg" 
                alt="Flota OSO Logistics - Unidades de transporte" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-[oklch(0.75_0.15_85)] text-[oklch(0.12_0.01_85)] px-6 py-3 rounded-xl shadow-lg">
              <span className="font-bold text-lg">Flota Certificada</span>
            </div>
          </div>

          {/* Features List */}
          <div className="lg:pl-8">
            <h3 className="text-2xl font-bold text-[oklch(0.95_0.005_85)] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Características de Nuestras Unidades
            </h3>
            <p className="text-[oklch(0.65_0.02_85)] mb-8 leading-relaxed">
              Cada una de nuestras unidades está equipada con todo lo necesario para que tu viaje sea cómodo, 
              seguro y placentero. Realizamos mantenimiento preventivo constante y cumplimos con todas las 
              normativas de seguridad vial.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fleetFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[oklch(0.16_0.01_85)] border border-[oklch(0.22_0.01_85)]">
                  <CheckCircle className="w-5 h-5 text-[oklch(0.75_0.15_85)] flex-shrink-0" />
                  <span className="text-[oklch(0.85_0.005_85)] text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[oklch(0.25_0.01_85)]">
              <div className="text-center">
                <div className="text-3xl font-bold text-[oklch(0.75_0.15_85)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>5+</div>
                <div className="text-sm text-[oklch(0.55_0.02_85)]">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[oklch(0.75_0.15_85)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>10K+</div>
                <div className="text-sm text-[oklch(0.55_0.02_85)]">Viajes realizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[oklch(0.75_0.15_85)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>99%</div>
                <div className="text-sm text-[oklch(0.55_0.02_85)]">Clientes satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
