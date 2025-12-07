import { Waves, Utensils, Dumbbell, Car, Sparkles, Wifi, Tv, Coffee, ConciergeBell, ShieldCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import amenityPool from "@/assets/amenity-pool.jpg";

const amenities = [
  { icon: Waves, title: "Piscina", description: "Piscina exterior con área de relajación" },
  { icon: Utensils, title: "Restaurante", description: "Cocina gourmet con chef ejecutivo" },
  { icon: Dumbbell, title: "Gimnasio", description: "Equipamiento de última generación" },
  { icon: Car, title: "Estacionamiento", description: "Estacionamiento privado gratuito" },
  { icon: Sparkles, title: "Spa", description: "Servicios de spa y masajes" },
  { icon: Wifi, title: "WiFi Gratis", description: "Internet de alta velocidad" },
  { icon: Tv, title: "Entretenimiento", description: "TV por cable y servicios de streaming" },
  { icon: Coffee, title: "Bar & Café", description: "Bar lounge y cafetería 24/7" },
  { icon: ConciergeBell, title: "Conserjería", description: "Servicio de conserjería personalizado" },
  { icon: ShieldCheck, title: "Seguridad", description: "Seguridad y vigilancia las 24 horas" },
];

const Amenities = () => {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Servicios y Amenidades
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesita para una estadía perfecta
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-16">
          <div className="order-2 md:order-1">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {amenities.map((amenity, index) => (
                  <CarouselItem key={index} className="basis-full sm:basis-1/2">
                    <Card className="h-full hover:shadow-[var(--shadow-card)] transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="p-3 rounded-full bg-accent/10 w-fit mb-3">
                          <amenity.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{amenity.title}</h3>
                        <p className="text-sm text-muted-foreground">{amenity.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <div className="order-1 md:order-2 animate-fade-in">
            <div className="relative rounded-lg overflow-hidden shadow-[var(--shadow-elegant)]">
              <img
                src={amenityPool}
                alt="Amenidades del hotel"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
