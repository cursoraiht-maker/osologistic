import { useState, useEffect } from "react";
import { MessageSquare, Phone, X } from "lucide-react";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after small scroll or 3 seconds
    const timer = setTimeout(() => setVisible(true), 1500);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleWhatsApp = () => {
    trackWhatsAppClick("floating_button");
    const msg = encodeURIComponent(
      "Hola, me gustaría cotizar un servicio de transporte / paquetería con OSO Logistics."
    );
    window.open(`https://wa.me/524464943350?text=${msg}`, "_blank");
  };

  const handleCall = () => {
    trackPhoneClick("floating_button");
    window.location.href = "tel:+524464943350";
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative bg-[oklch(0.16_0.01_85)] text-[oklch(0.95_0.005_85)] text-xs md:text-sm py-2 px-3.5 rounded-xl shadow-xl border border-[oklch(0.25_0.01_85)] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[240px]">
          <span>¿Necesitas cotización inmediata? Escríbenos</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[oklch(0.60_0.01_85)] hover:text-white p-0.5"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Quick Phone Call Button */}
        <button
          onClick={handleCall}
          className="h-11 w-11 rounded-full bg-[oklch(0.18_0.01_85)] hover:bg-[oklch(0.25_0.01_85)] text-[oklch(0.75_0.15_85)] border border-[oklch(0.30_0.01_85)] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Llamar directamente"
          title="Llamar al +52 446 494 3350"
        >
          <Phone className="w-5 h-5" />
        </button>

        {/* Floating WhatsApp CTA with Ping Indicator */}
        <button
          onClick={handleWhatsApp}
          className="relative group h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label="Contactar por WhatsApp"
          title="Contactar por WhatsApp para cotización"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
          </span>
          <MessageSquare className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
