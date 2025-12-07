import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent } from "@/shared/ui/card";

const dishes = [
  {
    name: "Filete Mignon",
    description: "Filete de res con salsa de vino tinto y vegetales asados",
    price: "$25.00",
    category: "Carnes",
  },
  {
    name: "Salmón a la Parrilla",
    description: "Salmón fresco con salsa de mantequilla de limón",
    price: "$22.00",
    category: "Pescados",
  },
  {
    name: "Pasta Primavera",
    description: "Pasta fresca con vegetales de temporada",
    price: "$18.00",
    category: "Pastas",
  },
  {
    name: "Risotto de Hongos",
    description: "Cremoso risotto con hongos silvestres",
    price: "$20.00",
    category: "Especialidades",
  },
  {
    name: "Tarta de Chocolate",
    description: "Deliciosa tarta con helado de vainilla",
    price: "$12.00",
    category: "Postres",
  },
];

const Restaurant = () => {
  return (
    <section id="restaurante" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Nuestro Menú
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deléitate con nuestra exquisita gastronomía
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
              {dishes.map((dish, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-3">
                        <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                          {dish.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {dish.description}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {dish.price}
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
      </div>
    </section>
  );
};

export default Restaurant;
