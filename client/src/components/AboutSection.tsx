import { Award, Shield, Users, Leaf } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "Seguro de Viajero",
    description: "Todas nuestras unidades cuentan con seguro de responsabilidad civil y cobertura para pasajeros.",
  },
  {
    icon: Award,
    title: "Operadores Certificados",
    description: "Conductores con licencia federal, capacitación continua y años de experiencia en carretera.",
  },
  {
    icon: Users,
    title: "Compromiso con el Cliente",
    description: "Atención personalizada y seguimiento de cada servicio para garantizar tu satisfacción.",
  },
  {
    icon: Leaf,
    title: "Responsabilidad Ambiental",
    description: "Mantenimiento preventivo para reducir emisiones y contribuir al cuidado del medio ambiente.",
  },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-[oklch(0.12_0.01_85)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] text-sm font-medium mb-4">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.95_0.005_85)] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Fuerza que Mueve tu Negocio
            </h2>
            <p className="text-lg text-[oklch(0.65_0.02_85)] mb-6 leading-relaxed">
              <strong className="text-[oklch(0.75_0.15_85)]">OSO Logistics</strong> nació con la misión de conectar 
              la Península de Yucatán a través de servicios de transporte confiables, seguros y puntuales. 
              Con presencia en Mérida, Valladolid, Playa del Carmen y Bacalar, operamos rutas estratégicas que enlazan los principales destinos de la Península de Yucatán.
            </p>
            <p className="text-[oklch(0.65_0.02_85)] mb-8 leading-relaxed">
              Nuestra experiencia en el sector nos ha permitido desarrollar un servicio integral que combina 
              transporte de personal y paquetería, adaptándonos a las necesidades específicas de cada cliente. 
              Ya sea que necesites trasladar a tu equipo de trabajo o enviar mercancía importante, 
              en OSO Logistics encontrarás un aliado de confianza.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-[oklch(0.16_0.01_85)] border border-[oklch(0.22_0.01_85)]">
                <h3 className="font-bold text-[oklch(0.75_0.15_85)] mb-2">Nuestra Misión</h3>
                <p className="text-sm text-[oklch(0.65_0.02_85)]">
                  Brindar soluciones de transporte que impulsen el crecimiento de nuestros clientes, 
                  con seguridad, puntualidad y servicio de excelencia.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[oklch(0.16_0.01_85)] border border-[oklch(0.22_0.01_85)]">
                <h3 className="font-bold text-[oklch(0.75_0.15_85)] mb-2">Nuestra Visión</h3>
                <p className="text-sm text-[oklch(0.65_0.02_85)]">
                  Ser la empresa de transporte líder en la Península de Yucatán, reconocida por 
                  nuestra calidad, innovación y compromiso con el cliente.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-[oklch(0.14_0.01_85)] border border-[oklch(0.22_0.01_85)] hover:border-[oklch(0.75_0.15_85)/0.5] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center mb-4">
                  <cert.icon className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
                </div>
                <h3 className="font-semibold text-[oklch(0.95_0.005_85)] mb-2">{cert.title}</h3>
                <p className="text-sm text-[oklch(0.55_0.02_85)] leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[oklch(0.75_0.15_85)/0.1] to-[oklch(0.75_0.15_85)/0.05] border border-[oklch(0.75_0.15_85)/0.3]">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[oklch(0.95_0.005_85)] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              ¿Por qué elegir OSO Logistics?
            </h3>
            <p className="text-[oklch(0.65_0.02_85)] max-w-3xl mx-auto">
              Más de <strong className="text-[oklch(0.75_0.15_85)]">5 años</strong> de experiencia, 
              <strong className="text-[oklch(0.75_0.15_85)]"> miles de viajes</strong> realizados sin incidentes, 
              y un equipo comprometido con brindarte el mejor servicio. Tu seguridad y satisfacción son nuestra prioridad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
