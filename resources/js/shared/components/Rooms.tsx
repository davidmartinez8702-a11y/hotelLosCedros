import { Wifi, Tv, Wind, Coffee, Users } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent } from "@/shared/ui/card";
import { usePage } from "@inertiajs/react";
import roomDeluxe from "@/assets/room-deluxe.jpg";

interface TipoHabitacion {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  capacidad_total: number;
  capacidad_adultos: number;
  capacidad_infantes: number;
  imagen: string | null;
}

const Rooms = () => {
  // ✅ Obtener habitaciones desde Inertia props
  const { habitaciones = [] } = usePage().props as { habitaciones?: TipoHabitacion[] };

  // 🎯 Habitaciones de fallback si la BD está vacía
  const habitacionesEjemplo: TipoHabitacion[] = [
    {
      id: 1,
      nombre: "Habitación Deluxe",
      descripcion: "Espaciosa habitación con vista panorámica",
      precio: 150,
      capacidad_total: 2,
      capacidad_adultos: 2,
      capacidad_infantes: 0,
      imagen: null,
    },
    {
      id: 2,
      nombre: "Suite Ejecutiva",
      descripcion: "Lujo y comodidad en nuestras suites premium",
      precio: 250,
      capacidad_total: 3,
      capacidad_adultos: 2,
      capacidad_infantes: 1,
      imagen: null,
    },
    {
      id: 3,
      nombre: "Habitación Familiar",
      descripcion: "Perfecta para familias con amplio espacio",
      precio: 200,
      capacidad_total: 4,
      capacidad_adultos: 2,
      capacidad_infantes: 2,
      imagen: null,
    },
    {
      id: 4,
      nombre: "Suite Presidencial",
      descripcion: "El máximo lujo y exclusividad",
      precio: 500,
      capacidad_total: 4,
      capacidad_adultos: 4,
      capacidad_infantes: 0,
      imagen: null,
    },
  ];

  const habitacionesAMostrar = habitaciones.length > 0 ? habitaciones : habitacionesEjemplo;

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
              {habitacionesAMostrar.map((room) => (
                <CarouselItem key={room.id} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="group overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CardContent className="p-0">
                      {/* 🖼️ Imagen de la habitación */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={room.imagen ? `/resources/js/assets/room-deluxe.jpg` : roomDeluxe}
                          alt={room.nombre}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = roomDeluxe;
                          }}
                        />
                        {/* Badge de precio */}
                        <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          Bs. {room.precio}/noche
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                          {room.nombre}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {room.descripcion || "Disfruta de una estancia inolvidable"}
                        </p>

                        {/* 👥 Capacidad */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 text-accent" />
                            <span>
                              {room.capacidad_adultos > 0 && `${room.capacidad_adultos} adultos`}
                              {room.capacidad_adultos > 0 && room.capacidad_infantes > 0 && " + "}
                              {room.capacidad_infantes > 0 && `${room.capacidad_infantes} niños`}
                            </span>
                          </div>
                        </div>

                        {/* 🎨 Amenidades */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {[
                            { icon: Wifi, text: "WiFi gratis" },
                            { icon: Tv, text: "TV Smart" },
                            { icon: Wind, text: "Aire acondicionado" },
                            { icon: Coffee, text: "Minibar" },
                          ].map(({ icon: Icon, text }, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon className="h-4 w-4 text-accent" />
                              <span>{text}</span>
                            </div>
                          ))}
                        </div>

                        {/* 💰 Botón de reserva */}
                        <div className="pt-4 border-t border-border">
                          <Button 
                            variant="hero"
                            className="w-full"
                            onClick={() => (window.location.href = '/reservas/cliente/crear')}
                          >
                            Reservar Ahora
                          </Button>
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

        {/* 🔗 Ver más habitaciones (si hay más de 4) */}
        {habitaciones.length > 4 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/habitaciones')}
            >
              Ver Todas las Habitaciones
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;
