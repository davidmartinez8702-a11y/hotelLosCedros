import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { usePage } from "@inertiajs/react";

interface Comentario {
  id: number;
  nombre: string;
  iniciales: string;
  calificacion: number;
  contenido: string;
  fecha: string;
  avatar: string | null;
}

const Testimonials = () => {
  // ✅ Obtener comentarios desde Inertia props
  const { comentarios = [] } = usePage().props as { comentarios?: Comentario[] };

  // 🎯 Comentarios de fallback si no hay en BD
  const comentariosEjemplo: Comentario[] = [
    {
      id: 1,
      nombre: "María García",
      iniciales: "MG",
      calificacion: 5,
      contenido: "Una experiencia inolvidable. El servicio es excepcional y las instalaciones son de primera clase. Definitivamente volveremos.",
      fecha: "Hace 1 semana",
      avatar: null,
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      iniciales: "CR",
      calificacion: 5,
      contenido: "El mejor hotel en el que me he hospedado. La atención del personal es excelente y la comida del restaurante es espectacular.",
      fecha: "Hace 2 semanas",
      avatar: null,
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      iniciales: "AM",
      calificacion: 5,
      contenido: "Perfecto para una escapada romántica. El ambiente es muy tranquilo y la habitación era hermosa. Altamente recomendado.",
      fecha: "Hace 3 semanas",
      avatar: null,
    },
    {
      id: 4,
      nombre: "Luis Hernández",
      iniciales: "LH",
      calificacion: 5,
      contenido: "Excelente ubicación y servicios de primera. El spa es maravilloso y el desayuno buffet tiene una gran variedad.",
      fecha: "Hace 1 mes",
      avatar: null,
    },
    {
      id: 5,
      nombre: "Sofia Torres",
      iniciales: "ST",
      calificacion: 5,
      contenido: "Celebramos nuestra boda aquí y fue mágico. El equipo de eventos hizo un trabajo impecable. Gracias por todo.",
      fecha: "Hace 1 mes",
      avatar: null,
    },
  ];

  const comentariosAMostrar = comentarios.length > 0 ? comentarios : comentariosEjemplo;

  return (
    <section id="comentarios" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Lo Que Dicen Nuestros Huéspedes
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiencias reales de quienes nos han visitado
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {comentariosAMostrar.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          {/* ✅ Si tiene avatar, mostrarlo */}
                          {testimonial.avatar && (
                            <AvatarImage 
                              src={testimonial.avatar} 
                              alt={testimonial.nombre}
                            />
                          )}
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {testimonial.iniciales}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{testimonial.nombre}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.fecha}</p>
                        </div>
                      </div>

                      {/* ⭐ Estrellas de calificación */}
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < testimonial.calificacion 
                                ? 'fill-accent text-accent' 
                                : 'text-muted-foreground'
                            }`} 
                          />
                        ))}
                      </div>

                      {/* 💬 Contenido del comentario */}
                      <p className="text-muted-foreground italic">
                        "{testimonial.contenido}"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* 🔢 Contador de comentarios (opcional) */}
        {comentarios.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Mostrando {comentarios.length} de nuestros comentarios más recientes
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
