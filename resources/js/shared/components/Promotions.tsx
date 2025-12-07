import { Tag, Calendar, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const promotions = [
  {
    icon: Tag,
    title: "Especial de Bienvenida",
    discount: "20% OFF",
    description: "En tu primera reserva con nosotros",
    validUntil: "Válido hasta 31 Dic 2025",
  },
  {
    icon: Heart,
    title: "Paquete Romántico",
    discount: "15% OFF",
    description: "Cena especial y spa para parejas",
    validUntil: "Válido todo el año",
  },
  {
    icon: Calendar,
    title: "Estadía Prolongada",
    discount: "30% OFF",
    description: "Reservas de 5 noches o más",
    validUntil: "Válido todo el año",
  },
];

const Promotions = () => {
  return (
    <section id="promociones" className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Promociones Especiales
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprovecha nuestras ofertas exclusivas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {promotions.map((promo, index) => (
            <Card 
              key={index} 
              className="animate-scale-in hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <promo.icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-2xl font-bold text-accent">{promo.discount}</span>
                </div>
                <CardTitle className="text-xl">{promo.title}</CardTitle>
                <CardDescription>{promo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{promo.validUntil}</p>
                <Button variant="hero" className="w-full">
                  Reservar Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
