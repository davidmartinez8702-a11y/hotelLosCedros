import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent } from "@/shared/ui/card";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";

const testimonials = [
  {
    name: "María García",
    initials: "MG",
    rating: 5,
    comment: "Una experiencia inolvidable. El servicio es excepcional y las instalaciones son de primera clase. Definitivamente volveremos.",
    date: "Hace 1 semana",
  },
  {
    name: "Carlos Rodríguez",
    initials: "CR",
    rating: 5,
    comment: "El mejor hotel en el que me he hospedado. La atención del personal es excelente y la comida del restaurante es espectacular.",
    date: "Hace 2 semanas",
  },
  {
    name: "Ana Martínez",
    initials: "AM",
    rating: 5,
    comment: "Perfecto para una escapada romántica. El ambiente es muy tranquilo y la habitación era hermosa. Altamente recomendado.",
    date: "Hace 3 semanas",
  },
  {
    name: "Luis Hernández",
    initials: "LH",
    rating: 5,
    comment: "Excelente ubicación y servicios de primera. El spa es maravilloso y el desayuno buffet tiene una gran variedad.",
    date: "Hace 1 mes",
  },
  {
    name: "Sofia Torres",
    initials: "ST",
    rating: 5,
    comment: "Celebramos nuestra boda aquí y fue mágico. El equipo de eventos hizo un trabajo impecable. Gracias por todo.",
    date: "Hace 1 mes",
  },
];

const Testimonials = () => {
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
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
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

export default Testimonials;
