import { Wifi, Tv, Wind, Coffee } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent } from "@/shared/ui/card";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";

const rooms = [
  {
    title: "Habitación Deluxe",
    description: "Espaciosa habitación con vista panorámica",
    price: "Desde $150/noche",
    image: roomDeluxe,
    amenities: ["WiFi gratis", "TV Smart", "Aire acondicionado", "Minibar"],
    features: ["Cama king size", "Baño privado", "Vista a la ciudad", "Escritorio"],
  },
  {
    title: "Suite Ejecutiva",
    description: "Lujo y comodidad en nuestras suites premium",
    price: "Desde $250/noche",
    image: roomSuite,
    amenities: ["WiFi gratis", "TV Smart", "Aire acondicionado", "Minibar"],
    features: ["Sala de estar", "Jacuzzi", "Vista panorámica", "Balcón privado"],
  },
  {
    title: "Habitación Familiar",
    description: "Perfecta para familias con amplio espacio",
    price: "Desde $200/noche",
    image: roomDeluxe,
    amenities: ["WiFi gratis", "TV Smart", "Aire acondicionado", "Minibar"],
    features: ["2 habitaciones", "Cocina pequeña", "Sala de estar", "2 baños"],
  },
  {
    title: "Suite Presidencial",
    description: "El máximo lujo y exclusividad",
    price: "Desde $500/noche",
    image: roomSuite,
    amenities: ["WiFi gratis", "TV Smart", "Aire acondicionado", "Minibar"],
    features: ["Terraza privada", "Jacuzzi", "Mayordomo", "Chef privado"],
  },
];

const Rooms = () => {
  return (
    <section id="habitaciones" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Nuestras Habitaciones
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Espacios diseñados para su máximo confort y relajación
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {rooms.map((room, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="group overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                          {room.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{room.description}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {room.amenities.map((amenity, i) => {
                            const Icon = [Wifi, Tv, Wind, Coffee][i];
                            return (
                              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon className="h-4 w-4 text-accent" />
                                <span>{amenity}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-2xl font-bold text-primary">{room.price}</span>
                          <Button variant="hero">Reservar</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
