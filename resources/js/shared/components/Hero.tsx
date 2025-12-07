// import { Button } from "@/shared/ui/button";
// import { ArrowRight } from "lucide-react";
// import heroImage from "@/assets/hero-hotel.jpg";

// const Hero = () => {
//   return (
//     <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
              
//         <img
//           src={heroImage}
//           alt="Hotel Los Cedros"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-hotel-dark/80 via-hotel-brown/70 to-hotel-dark/60" />
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 z-10 text-center">
//         <div className="max-w-4xl mx-auto animate-fade-in">
//           <h1 className="text-5xl md:text-7xl font-serif font-bold text-hotel-cream mb-6">
//             Bienvenido a Hotel Los Cedros
//           </h1>
//           <p className="text-xl md:text-2xl text-hotel-cream/90 mb-8 font-light">
//             Donde la elegancia se encuentra con la comodidad. Una experiencia única de hospedaje.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button variant="hero" size="xl" className="group">
//               Reservar Ahora
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//             <Button variant="outline" size="xl" className="bg-transparent border-hotel-cream text-hotel-cream hover:bg-hotel-cream/10">
//               Ver Habitaciones
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
//         <div className="w-6 h-10 border-2 border-hotel-cream rounded-full flex items-start justify-center p-2">
//           <div className="w-1 h-3 bg-hotel-cream rounded-full" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




//version funcional

import { Button } from "@/shared/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hotel Los Cedros"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hotel-dark)/0.8)] via-[hsl(var(--hotel-brown)/0.7)] to-[hsl(var(--hotel-dark)/0.6)]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[hsl(var(--hotel-cream))] mb-6">
            Bienvenido a Hotel Los Cedros
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--hotel-cream)/0.9)] mb-8 font-light">
            Donde la elegancia se encuentra con la comodidad. Una experiencia
            única de hospedaje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              Reservar Ahora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-[hsl(var(--hotel-cream))] text-[hsl(var(--hotel-cream))] hover:bg-[hsl(var(--hotel-cream)/0.1)]"
            >
              Ver Habitaciones
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-[hsl(var(--hotel-cream))] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[hsl(var(--hotel-cream))] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;


