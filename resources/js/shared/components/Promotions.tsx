import { Tag, Calendar, Heart, Percent, Sparkles, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { usePage } from "@inertiajs/react";
import roomDeluxe from "@/assets/promo.jpg";
interface Promo {
  id: number;
  nombre: string;
  descripcion: string;
  image_url: string | null;
  tipo_promo: string;
  descuento_porcentaje: number | null;
  precio_total_paquete: number | string | null; // ✅ Puede ser string
  precio_normal: number | string | null; // ✅ Puede ser string
  fecha_fin: string;
}

const Promotions = () => {
  // ✅ Obtener promociones desde Inertia props
  const { promociones = [] } = usePage().props as { promociones?: Promo[] };

  // 🎨 Mapeo de iconos según tipo de promo
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'descuento_porcentual':
        return Percent;
      case 'descuento_fijo':
        return Tag;
      case 'paquete':
        return Package;
      case 'precio_especial':
        return Sparkles;
      default:
        return Heart;
    }
  };

  // 💰 Calcular descuento
  const getDescuento = (promo: Promo) => {
    if (promo.tipo_promo === 'descuento_porcentual' && promo.descuento_porcentaje) {
      return `${promo.descuento_porcentaje}% OFF`;
    }
    if (promo.precio_total_paquete && promo.precio_normal) {
      const precioTotal = parseFloat(String(promo.precio_total_paquete));
      const precioNormal = parseFloat(String(promo.precio_normal));
      const descuento = ((precioNormal - precioTotal) / precioNormal * 100).toFixed(0);
      return `${descuento}% OFF`;
    }
    return 'OFERTA';
  };

  // 📅 Formatear fecha
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // 🎯 Si no hay promociones de BD, mostrar las de ejemplo (fallback)
  const promosAMostrar = promociones.length > 0 ? promociones : [
    {
      id: 1,
      nombre: "Especial de Bienvenida",
      descripcion: "En tu primera reserva con nosotros",
      tipo_promo: "descuento_porcentual",
      descuento_porcentaje: 20,
      fecha_fin: "2025-12-31",
      image_url: null,
      precio_total_paquete: null,
      precio_normal: null,
    },
    {
      id: 2,
      nombre: "Paquete Romántico",
      descripcion: "Cena especial y spa para parejas",
      tipo_promo: "paquete",
      descuento_porcentaje: 15,
      fecha_fin: "2025-12-31",
      image_url: null,
      precio_total_paquete: null,
      precio_normal: null,
    },
    {
      id: 3,
      nombre: "Estadía Prolongada",
      descripcion: "Reservas de 5 noches o más",
      tipo_promo: "descuento_porcentual",
      descuento_porcentaje: 30,
      fecha_fin: "2025-12-31",
      image_url: null,
      precio_total_paquete: null,
      precio_normal: null,
    },
  ];

  // 📊 Limitar a 3 promociones para mantener el diseño limpio
  const promosParaMostrar = promosAMostrar.slice(0, 3);

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
          {promosParaMostrar.map((promo, index) => {
            const Icon = getTipoIcon(promo.tipo_promo);
            const descuento = getDescuento(promo);

            // ✅ Convertir precios a número de forma segura
            const precioTotal = promo.precio_total_paquete ? parseFloat(String(promo.precio_total_paquete)) : null;
            const precioNormal = promo.precio_normal ? parseFloat(String(promo.precio_normal)) : null;

            return (
              <Card 
                key={promo.id} 
                className="animate-scale-in hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* ✨ Imagen de fondo */}
                {promo.image_url && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      // ✅ CORRECTO: Usar /storage/ para archivos guardados con Storage::disk('public')
                      src={promo.image_url ? `/storage/${promo.image_url}` : roomDeluxe}
                      alt={promo.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Si falla, mostrar imagen por defecto
                        e.currentTarget.src = roomDeluxe;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-accent text-white text-lg font-bold px-3 py-1">
                      {descuento}
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    {!promo.image_url && (
                      <span className="text-2xl font-bold text-accent">{descuento}</span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{promo.nombre}</CardTitle>
                  <CardDescription>{promo.descripcion}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* 💰 Mostrar precio si existe */}
                  {precioTotal !== null && precioNormal !== null && !isNaN(precioTotal) && !isNaN(precioNormal) && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground line-through">
                        Bs. {precioNormal.toFixed(2)}
                      </span>
                      <span className="text-xl font-bold text-accent">
                        Bs. {precioTotal.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mb-4">
                    Válido hasta {formatearFecha(promo.fecha_fin)}
                  </p>

                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={() => window.location.href = '/reservas/cliente'}
                  >
                    Reservar Ahora
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 🔗 Botón para ver todas las promociones (si hay más de 3) */}
        {promociones.length > 3 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/promos'}
              // className="border-2 border-accent text-accent hover:bg-accent hover:text-white"
            >
              Ver Todas las Promociones
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Promotions;
