import { PartyPopper, Heart, Briefcase, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const events = [
  {
    icon: Heart,
    title: "Bodas",
    description: "Celebra el día más importante de tu vida en nuestras elegantes instalaciones",
    capacity: "Hasta 200 personas",
  },
  {
    icon: Briefcase,
    title: "Eventos Corporativos",
    description: "Salas equipadas con tecnología de vanguardia para tus reuniones",
    capacity: "Hasta 100 personas",
  },
  {
    icon: PartyPopper,
    title: "Fiestas y Celebraciones",
    description: "Espacios versátiles para cualquier tipo de celebración",
    capacity: "Hasta 150 personas",
  },
  {
    icon: Music,
    title: "Eventos Sociales",
    description: "Ambiente perfecto para tus eventos sociales y familiares",
    capacity: "Hasta 80 personas",
  },
];

const Events = () => {
  return (
    <section id="eventos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Eventos Especiales
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            El lugar perfecto para tus momentos inolvidables
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <Card 
              key={index}
              className="animate-scale-in hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-full bg-accent/10">
                    <event.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                </div>
                <CardDescription className="text-base">{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold">Capacidad:</span> {event.capacity}
                </p>
                <Button variant="hero">
                  Solicitar Información
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
