import { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/analytics";

export const faqItems = [
  {
    question: "¿Qué tipo de servicio de transporte de personal ofrecen?",
    answer:
      "Ofrecemos transporte de personal corporativo, industrial y hotelero con unidades modernas (vans ejecutivas tipo Hiace y Sprinter) equipadas con aire acondicionado, asientos reclinables y sistemas de monitoreo. Diseñamos rutas fijas o eventuales adaptadas a los turnos laborales y necesidades operativas de tu empresa.",
  },
  {
    question: "¿Cuentan con seguro de viajero y operadores certificados?",
    answer:
      "Sí. Todas nuestras unidades cuentan con póliza de seguro de viajero de cobertura amplia y responsabilidad civil. Nuestros operadores tienen licencia federal, capacitación continua en manejo defensivo y amplia experiencia en las rutas de la Península de Yucatán.",
  },
  {
    question: "¿Emiten factura fiscal (CFDI) para empresas?",
    answer:
      "Sí, 100% deducible. Emitimos factura electrónica (CFDI) con todos los requisitos del SAT de forma inmediata para personas morales y personas físicas con actividad empresarial.",
  },
  {
    question: "¿Qué zonas y rutas cubren en la Península de Yucatán?",
    answer:
      "Tenemos cobertura integral en Yucatán y Quintana Roo, conectando Mérida, Cancún, Playa del Carmen, Tulum, Bacalar, Chetumal y Valladolid, así como parques industriales, hoteles y zonas periféricas con rutas directas y sin escalas innecesarias.",
  },
  {
    question: "¿Cómo funciona el servicio de paquetería y envíos urgentes?",
    answer:
      "Brindamos servicio de paquetería empresarial puerta a puerta para valijas corporativas, documentos confidenciales, refacciones y mercancías. Ofrecemos entregas directas el mismo día (Same-Day) en rutas seleccionadas con confirmación de entrega inmediata.",
  },
  {
    question: "¿Con cuánto tiempo de anticipación debo cotizar o reservar?",
    answer:
      "Podemos coordinar servicios regulares con 24 a 48 horas de anticipación, y contamos con disponibilidad de respuesta inmediata para requerimientos urgentes o traslados imprevistos. Te entregamos tu cotización formal en menos de 30 minutos.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick("faq_section");
    const message = encodeURIComponent(
      "Hola, vi su sitio web y tengo una duda sobre los servicios de transporte de OSO Logistics."
    );
    window.open(`https://wa.me/524464943350?text=${message}`, "_blank");
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[oklch(0.12_0.01_85)] border-t border-[oklch(0.20_0.01_85)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.95_0.005_85)] mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Resolvemos tus dudas sobre el servicio
          </h2>
          <p className="text-lg text-[oklch(0.65_0.02_85)]">
            Todo lo que necesitas saber antes de contratar transporte de personal o paquetería en la Península de Yucatán.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[oklch(0.16_0.01_85)] border-[oklch(0.75_0.15_85)/0.4] shadow-md"
                    : "bg-[oklch(0.14_0.01_85)] border-[oklch(0.22_0.01_85)] hover:border-[oklch(0.35_0.01_85)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base md:text-lg text-[oklch(0.95_0.005_85)] leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[oklch(0.75_0.15_85)] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-[oklch(0.70_0.01_85)] text-sm md:text-base leading-relaxed border-t border-[oklch(0.20_0.01_85)]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner inside FAQ */}
        <div className="max-w-3xl mx-auto mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[oklch(0.16_0.01_85)] to-[oklch(0.18_0.02_85)] border border-[oklch(0.75_0.15_85)/0.3] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[oklch(0.95_0.005_85)] mb-1">
              ¿Tienes un requerimiento especial o ruta a la medida?
            </h3>
            <p className="text-sm text-[oklch(0.65_0.02_85)]">
              Cotiza en minutos sin compromiso. Te respondemos de inmediato.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Button
              onClick={handleWhatsApp}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold flex items-center gap-2 justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button
              onClick={scrollToContact}
              className="bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.12_0.01_85)] font-semibold"
            >
              Cotizar Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
