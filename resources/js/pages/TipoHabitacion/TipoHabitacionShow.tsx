import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pencil, Image } from "lucide-react"; // Icono para la galería
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";

interface Categoria {
  id: number;
  nombre: string;
}

interface TipoHabitacion {
  id: number;
  nombre: string;
  descripcion: string | null;
  estado: "activo" | "inactivo";
  capacidad_adultos: number;
  capacidad_infantes: number;
  capacidad_total: number;
  precio: number;
  tipo: "habitacion" | "evento";
  categoria: Categoria;
  created_at: string;
  updated_at: string;
}

interface Props {
  tipoHabitacion: TipoHabitacion;
}

export default function TipoHabitacionShow({ tipoHabitacion }: Props) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Tipo de Habitaciones", href: route("tipo-habitacion.index") },
        { title: tipoHabitacion.nombre, href: route("tipo-habitacion.show", tipoHabitacion.id) },
      ]}
    >
      <Head title={`Detalle del Tipo de Habitación: ${tipoHabitacion.nombre}`} />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <EntityHeader
              title={`${tipoHabitacion.nombre}`}
              subtitle="Última actualización:"
              span={tipoHabitacion.updated_at}
            />
            
            <div className="flex gap-2">
              <Link href={route("tipo-habitacion.edit", tipoHabitacion.id)}>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </Link>
              <Link href={route("tipo-habitacion.galeria", tipoHabitacion.id)}>
                <Button variant="outline">
                  <Image className="mr-2 h-4 w-4" />
                  Ver Galería
                </Button>
              </Link>
            </div>
          </div>

          <Separator />

          {/* Contenedor principal */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información del Tipo de Habitación</CardTitle>
              <CardDescription>
                Detalles completos del tipo de habitación registrado en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información del tipo de habitación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Nombre</h2>
                  <p className="text-muted-foreground">{tipoHabitacion.nombre}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Descripción</h2>
                  <p className="text-muted-foreground">
                    {tipoHabitacion.descripcion || "No disponible"}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Precio</h2>
                  <p className="text-green-600 font-bold text-xl">
                    {new Intl.NumberFormat("es-BO", {
                      style: "currency",
                      currency: "BOB",
                      minimumFractionDigits: 2,
                    }).format(tipoHabitacion.precio)}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Estado</h2>
                  <Badge variant={tipoHabitacion.estado === "activo" ? "default" : "secondary"}>
                    {tipoHabitacion.estado.charAt(0).toUpperCase() + tipoHabitacion.estado.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Tipo</h2>
                  <p className="text-muted-foreground">
                    {tipoHabitacion.tipo.charAt(0).toUpperCase() + tipoHabitacion.tipo.slice(1)}
                  </p>
                </div>

                {/* Mostrar capacidades según el tipo */}
                {tipoHabitacion.tipo === "habitacion" ? (
                  <>
                    <div>
                      <h2 className="text-lg font-semibold">Capacidad de Adultos</h2>
                      <p className="text-muted-foreground">{tipoHabitacion.capacidad_adultos}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Capacidad de Infantes</h2>
                      <p className="text-muted-foreground">{tipoHabitacion.capacidad_infantes}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold">Capacidad Total</h2>
                    <p className="text-muted-foreground">{tipoHabitacion.capacidad_total}</p>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-semibold">Categoría</h2>
                  <p className="text-muted-foreground">{tipoHabitacion.categoria.nombre}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Creado el</h2>
                  <p className="text-muted-foreground">{tipoHabitacion.created_at}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}