import { Users, Package, Truck, Clock, Shield, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Users,
    title: "Transporte de Personal",
    description: "Servicio de traslado seguro y cómodo para empresas y grupos. Ideal para empleados, equipos de trabajo y eventos corporativos.",
    features: ["Unidades con aire acondicionado", "Asientos cómodos y espaciosos", "Conductores profesionales certificados", "Horarios flexibles"],
  },
  {
    icon: Package,
    title: "Paquetería y Mensajería",
    description: "Envío de paquetes y documentos con seguimiento y entrega garantizada. Conectamos toda la Península de Yucatán.",
    features: ["Entrega el mismo día disponible", "Seguimiento en tiempo real", "Manejo cuidadoso de mercancía", "Tarifas competitivas"],
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Flota Moderna",
    description: "Vehículos en excelentes condiciones con mantenimiento preventivo constante.",
  },
  {
    icon: Clock,
    title: "Puntualidad Garantizada",
    description: "Cumplimos con los horarios establecidos para que tu tiempo sea respetado.",
  },
  {
    icon: Shield,
    title: "Seguridad Total",
    description: "Unidades aseguradas y conductores capacitados para tu tranquilidad.",
  },
  {
    icon: HeartHandshake,
    title: "Atención Personalizada",
    description: "Servicio al cliente dedicado para resolver todas tus necesidades.",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-[oklch(0.14_0.01_85)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.95_0.005_85)] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Soluciones de Transporte a tu Medida
          </h2>
          <p className="text-lg text-[oklch(0.65_0.02_85)] max-w-2xl mx-auto">
            Ofrecemos servicios integrales de logística y transporte para satisfacer las necesidades de tu empresa o negocio.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="bg-[oklch(0.18_0.01_85)] border-[oklch(0.25_0.01_85)] overflow-hidden group hover:border-[oklch(0.75_0.15_85)/0.5] transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center mb-6 group-hover:bg-[oklch(0.75_0.15_85)/0.2] transition-colors">
                  <service.icon className="w-8 h-8 text-[oklch(0.75_0.15_85)]" />
                </div>
                <h3 className="text-2xl font-bold text-[oklch(0.95_0.005_85)] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-[oklch(0.65_0.02_85)] mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[oklch(0.75_0.02_85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.15_85)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-[oklch(0.16_0.01_85)] border border-[oklch(0.22_0.01_85)]">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
              </div>
              <h4 className="font-semibold text-[oklch(0.95_0.005_85)] mb-2">{benefit.title}</h4>
              <p className="text-sm text-[oklch(0.55_0.02_85)]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
