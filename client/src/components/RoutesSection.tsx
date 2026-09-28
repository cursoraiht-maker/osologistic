import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function RoutesSection() {
  const { data: routes, isLoading } = trpc.routes.list.useQuery();

  const scrollToContact = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="rutas" className="py-20 md:py-28 bg-[oklch(0.12_0.01_85)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] text-sm font-medium mb-4">
            Rutas Disponibles
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.95_0.005_85)] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Conectamos la Península de Yucatán
          </h2>
          <p className="text-lg text-[oklch(0.65_0.02_85)] max-w-2xl mx-auto">
            Operamos las principales rutas entre Bacalar, Mérida, Chetumal y Valladolid con salidas frecuentes y horarios flexibles.
          </p>
        </div>

        {/* Routes Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-[oklch(0.16_0.01_85)] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes?.map((route) => (
              <Card key={route.id} className="bg-[oklch(0.16_0.01_85)] border-[oklch(0.22_0.01_85)] overflow-hidden group hover:border-[oklch(0.75_0.15_85)/0.5] transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Route Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.15_85)]" />
                      <span className="font-semibold text-[oklch(0.95_0.005_85)]">{route.origin}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="font-semibold text-[oklch(0.95_0.005_85)]">{route.destination}</span>
                      <div className="w-3 h-3 rounded-full border-2 border-[oklch(0.75_0.15_85)]" />
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="flex justify-between items-center mb-6 py-4 border-y border-[oklch(0.25_0.01_85)]">
                    <div className="flex items-center gap-2 text-[oklch(0.65_0.02_85)]">
                      <MapPin className="w-4 h-4 text-[oklch(0.75_0.15_85)]" />
                      <span className="text-sm">{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[oklch(0.65_0.02_85)]">
                      <Clock className="w-4 h-4 text-[oklch(0.75_0.15_85)]" />
                      <span className="text-sm">{route.duration}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="w-full border-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)] hover:text-[oklch(0.12_0.01_85)]"
                    onClick={scrollToContact}
                  >
                    Cotizar esta ruta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-[oklch(0.55_0.02_85)] mb-4">
            ¿Necesitas una ruta diferente? Contáctanos para rutas personalizadas.
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.12_0.01_85)] font-semibold"
          >
            Solicitar Ruta Especial
          </Button>
        </div>
      </div>
    </section>
  );
}
