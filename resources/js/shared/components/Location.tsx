import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Location = () => {
  return (
    <section id="ubicacion" className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Nuestra Ubicación
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuéntranos fácilmente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-accent/10 mt-1">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Dirección</h3>
                <p className="text-muted-foreground">
                  Av. Principal 123<br />
                  Centro Histórico<br />
                  Ciudad, País 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-accent/10 mt-1">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Teléfono</h3>
                <p className="text-muted-foreground">+1 (234) 567-8900</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-accent/10 mt-1">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">info@hotelloscedros.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-accent/10 mt-1">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Horario</h3>
                <p className="text-muted-foreground">
                  Check-in: 3:00 PM<br />
                  Check-out: 12:00 PM<br />
                  Recepción: 24/7
                </p>
              </div>
            </div>
          </div>

          <div className="animate-scale-in">
            <div className="relative rounded-lg overflow-hidden shadow-[var(--shadow-elegant)] h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841724578124!2d-73.98823492346708!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Hotel Los Cedros"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
