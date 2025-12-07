const Welcome = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Una Experiencia Inolvidable
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            En Hotel Los Cedros, cada detalle ha sido cuidadosamente diseñado para ofrecerle 
            la mejor experiencia de hospedaje. Nuestras instalaciones combinan elegancia clásica 
            con comodidades modernas.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Disfrute de nuestras habitaciones espaciosas, servicios de primera clase y una 
            ubicación privilegiada que le permitirá explorar todo lo que la ciudad tiene para ofrecer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
