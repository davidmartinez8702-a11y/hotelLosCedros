import { Button } from "@/shared/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { BookingDialog } from "@/shared/components/BookingDialog";
import AppearanceToggleTab from "./AppareanceToggleTab";


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Hotel Los Cedros
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
              Inicio
            </a>
            <a href="#habitaciones" className="text-foreground hover:text-primary transition-colors font-medium">
              Habitaciones
            </a>
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">
              Servicios
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <AppearanceToggleTab/>
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Button variant="hero" size="lg" onClick={() => setBookingDialogOpen(true)}>
              Reservar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
          <AppearanceToggleTab/>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Inicio
              </a>
              <a href="#habitaciones" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Habitaciones
              </a>
              <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Servicios
              </a>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Contacto
              </a>
              <Link href="/login" className="py-2">
                <Button variant="outline" className="w-full">Iniciar Sesión</Button>
              </Link>
              <Button variant="hero" size="lg" className="mt-2 w-full" onClick={() => setBookingDialogOpen(true)}>
                Reservar Ahora
              </Button>
            </div>
          </nav>
        )}
      </div>
      
      <BookingDialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
    </header>
  );
};

export default Header;
