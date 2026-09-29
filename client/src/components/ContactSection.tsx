import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { trackLeadSubmission, trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

const locations = ["Bacalar", "Mérida", "Chetumal", "Valladolid", "Otro"];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "" as "personal" | "paqueteria" | "ambos" | "",
    origin: "",
    destination: "",
    travelDate: "",
    passengers: "",
    packageDescription: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const createQuote = trpc.quotes.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      trackLeadSubmission({
        serviceType: formData.serviceType,
        origin: formData.origin,
        destination: formData.destination,
      });
      toast.success("¡Solicitud enviada! Nos pondremos en contacto pronto.");
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar la solicitud. Intenta de nuevo.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceType) {
      toast.error("Por favor selecciona un tipo de servicio");
      return;
    }

    createQuote.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      origin: formData.origin,
      destination: formData.destination,
      travelDate: formData.travelDate || undefined,
      passengers: formData.passengers ? parseInt(formData.passengers) : undefined,
      packageDescription: formData.packageDescription || undefined,
      message: formData.message || undefined,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      origin: "",
      destination: "",
      travelDate: "",
      passengers: "",
      packageDescription: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-[oklch(0.14_0.01_85)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] text-sm font-medium mb-4">
            Contáctanos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[oklch(0.95_0.005_85)] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solicita tu Cotización
          </h2>
          <p className="text-lg text-[oklch(0.65_0.02_85)] max-w-2xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas con una cotización personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-[oklch(0.16_0.01_85)] border-[oklch(0.22_0.01_85)]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[oklch(0.95_0.005_85)] mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+524464943350"
                    onClick={() => trackPhoneClick("contact_card")}
                    className="flex items-center gap-3 text-[oklch(0.75_0.02_85)] hover:text-[oklch(0.75_0.15_85)] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[oklch(0.55_0.02_85)]">Teléfono</div>
                      <div className="font-medium">+52 446 494 3350</div>
                    </div>
                  </a>
                  <a
                    href="mailto:osologistics22@gmail.com"
                    className="flex items-center gap-3 text-[oklch(0.75_0.02_85)] hover:text-[oklch(0.75_0.15_85)] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[oklch(0.55_0.02_85)]">Email</div>
                      <div className="font-medium">osologistics22@gmail.com</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-[oklch(0.75_0.02_85)]">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[oklch(0.55_0.02_85)]">Ubicación</div>
                      <div className="font-medium">Mérida, Valladolid, Playa del Carmen y Bacalar</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[oklch(0.75_0.02_85)]">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.75_0.15_85)/0.1] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                    </div>
                    <div>
                      <div className="text-sm text-[oklch(0.55_0.02_85)]">Horario</div>
                      <div className="font-medium">Lun-Sáb: 6AM-10PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/524464943350?text=Hola,%20me%20interesa%20cotizar%20un%20servicio%20de%20transporte" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("contact_card")}
              className="block"
            >
              <Card className="bg-[oklch(0.35_0.15_145)] border-[oklch(0.45_0.15_145)] hover:bg-[oklch(0.40_0.15_145)] transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-white font-semibold mb-1">¿Prefieres WhatsApp?</div>
                  <div className="text-white/80 text-sm">Escríbenos directamente</div>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 bg-[oklch(0.16_0.01_85)] border-[oklch(0.22_0.01_85)]">
            <CardContent className="p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[oklch(0.35_0.15_145)/0.2] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[oklch(0.55_0.15_145)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[oklch(0.95_0.005_85)] mb-2">¡Solicitud Enviada!</h3>
                  <p className="text-[oklch(0.65_0.02_85)] mb-6">
                    Gracias por contactarnos. Revisaremos tu solicitud y te enviaremos una cotización en menos de 24 horas.
                  </p>
                  <Button onClick={handleReset} variant="outline" className="border-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)]">
                    Enviar otra solicitud
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[oklch(0.85_0.005_85)]">Nombre completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)] placeholder:text-[oklch(0.45_0.02_85)]"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[oklch(0.85_0.005_85)]">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)] placeholder:text-[oklch(0.45_0.02_85)]"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[oklch(0.85_0.005_85)]">Teléfono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)] placeholder:text-[oklch(0.45_0.02_85)]"
                        placeholder="446 494 3350"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType" className="text-[oklch(0.85_0.005_85)]">Tipo de servicio *</Label>
                      <Select value={formData.serviceType} onValueChange={(value: "personal" | "paqueteria" | "ambos") => setFormData({ ...formData, serviceType: value })}>
                        <SelectTrigger className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)]">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-[oklch(0.16_0.01_85)] border-[oklch(0.25_0.01_85)]">
                          <SelectItem value="personal" className="text-[oklch(0.95_0.005_85)]">Transporte de personal</SelectItem>
                          <SelectItem value="paqueteria" className="text-[oklch(0.95_0.005_85)]">Paquetería</SelectItem>
                          <SelectItem value="ambos" className="text-[oklch(0.95_0.005_85)]">Ambos servicios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin" className="text-[oklch(0.85_0.005_85)]">Origen *</Label>
                      <Select value={formData.origin} onValueChange={(value) => setFormData({ ...formData, origin: value })}>
                        <SelectTrigger className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)]">
                          <SelectValue placeholder="¿De dónde sales?" />
                        </SelectTrigger>
                        <SelectContent className="bg-[oklch(0.16_0.01_85)] border-[oklch(0.25_0.01_85)]">
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc} className="text-[oklch(0.95_0.005_85)]">{loc}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-[oklch(0.85_0.005_85)]">Destino *</Label>
                      <Select value={formData.destination} onValueChange={(value) => setFormData({ ...formData, destination: value })}>
                        <SelectTrigger className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)]">
                          <SelectValue placeholder="¿A dónde vas?" />
                        </SelectTrigger>
                        <SelectContent className="bg-[oklch(0.16_0.01_85)] border-[oklch(0.25_0.01_85)]">
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc} className="text-[oklch(0.95_0.005_85)]">{loc}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelDate" className="text-[oklch(0.85_0.005_85)]">Fecha de viaje</Label>
                      <Input
                        id="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)]"
                      />
                    </div>
                    {(formData.serviceType === "personal" || formData.serviceType === "ambos") && (
                      <div className="space-y-2">
                        <Label htmlFor="passengers" className="text-[oklch(0.85_0.005_85)]">Número de pasajeros</Label>
                        <Input
                          id="passengers"
                          type="number"
                          min="1"
                          value={formData.passengers}
                          onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                          className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)] placeholder:text-[oklch(0.45_0.02_85)]"
                          placeholder="Ej: 5"
                        />
                      </div>
                    )}
                  </div>

                  {(formData.serviceType === "paqueteria" || formData.serviceType === "ambos") && (
                    <div className="space-y-2">
                      <Label htmlFor="packageDescription" className="text-[oklch(0.85_0.005_85)]">Descripción del paquete</Label>
                      <Input
                        id="packageDescription"
                        value={formData.packageDescription}
                        onChange={(e) => setFormData({ ...formData, packageDescription: e.target.value })}
                        className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)] placeholder:text-[oklch(0.45_0.02_85)]"
                        placeholder="Tipo de mercancía, peso aproximado, dimensiones..."
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[oklch(0.85_0.005_85)]">Mensaje adicional</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-[oklch(0.12_0.01_85)] border-[oklch(0.25_0.01_85)] text-[oklch(0.95_0.005_85)] placeholder:text-[oklch(0.45_0.02_85)] min-h-[100px]"
                      placeholder="¿Tienes alguna solicitud especial o comentario?"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={createQuote.isPending}
                    className="w-full bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.12_0.01_85)] font-semibold py-6"
                  >
                    {createQuote.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Solicitud
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
