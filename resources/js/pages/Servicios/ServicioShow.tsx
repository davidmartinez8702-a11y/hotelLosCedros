import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pencil, Image } from "lucide-react"; // Icono para la galería
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";

interface Categoria{
    id: number;
    nombre: string;
}
interface Servicio {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  estado: "activo" | "inactivo";
  categoria: Categoria;
  created_at: string;
  updated_at: string;
}

interface Props {
  servicio: Servicio;
}

export default function ServicioShow({ servicio }: Props) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Servicios", href: route("servicios.index") },
        { title: servicio.nombre, href: route("servicios.show", servicio.id) },
      ]}
    >
      <Head title={`Detalle del Servicio: ${servicio.nombre}`} />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <EntityHeader
              title={`${servicio.nombre}`}
              subtitle="Última actualización:"
              span={servicio.updated_at}
            />
            
            <div className="flex gap-2">
              <Link href={route("servicios.edit", servicio.id)}>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </Link>
              <Link href={route("servicios.galeria", servicio.id)}>
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
              <CardTitle>Información del Servicio</CardTitle>
              <CardDescription>
                Detalles completos del servicio registrado en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información del servicio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Nombre</h2>
                  <p className="text-muted-foreground">{servicio.nombre}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Categoría</h2>
                  <p className="text-muted-foreground">{servicio.categoria.nombre}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Descripción</h2>
                  <p className="text-muted-foreground">
                    {servicio.descripcion || "No disponible"}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Precio</h2>
                  <p className="text-green-600 font-bold text-xl">
                    {new Intl.NumberFormat("es-BO", {
                      style: "currency",
                      currency: "BOB",
                      minimumFractionDigits: 2,
                    }).format(servicio.precio)}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Estado</h2>
                  <Badge variant={servicio.estado === "activo" ? "default" : "secondary"}>
                    {servicio.estado.charAt(0).toUpperCase() + servicio.estado.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Creado el</h2>
                  <p className="text-muted-foreground">{servicio.created_at}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}