
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import platilloDefault from "@/assets/platillo_default.jpg";
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";

interface Platillo {
  id: number;
  nombre: string;
  descripcion: string | null;
  ingredientes: string | null;
  image_url: string | null;
  precio: number;
  estado: "activo" | "inactivo";
  categoria: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  platillo: Platillo;
}

export default function PlatilloShow({ platillo }: Props) {
  // Variable para la URL de la imagen del platillo o la imagen por defecto
  //const imageUrl = platillo.image_url || platilloDefault;
  const imageUrl = platillo.image_url;

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Platillos", href: route("platillos.index") },
        { title: platillo.nombre, href: route("platillos.show", platillo.id) },
      ]}
    >
      <Head title={`Detalle del Platillo: ${platillo.nombre}`} />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <EntityHeader
              title={`${platillo.nombre}`}
              subtitle="Última actualización:"
              span={platillo.updated_at}
            />
            
            <Link href={route("platillos.edit", platillo.id)}>
              <Button>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </Link>
          </div>

          <Separator />

          {/* Contenedor principal */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información del Platillo</CardTitle>
              <CardDescription>
                Detalles completos del platillo registrado en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Imagen del platillo */}
              <div className="flex justify-center">
                <img
                  src={imageUrl!}
                  alt={`Imagen de ${platillo.nombre}`}
                  //className="w-full h-full object-cover rounded-lg shadow"
                   className="w-full max-w-md rounded-lg shadow object-cover"
                />
              </div>

              {/* Información del platillo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Nombre</h2>
                  <p className="text-muted-foreground">{platillo.nombre}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Categoría</h2>
                  <p className="text-muted-foreground">{platillo.categoria}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Descripción</h2>
                  <p className="text-muted-foreground">
                    {platillo.descripcion || "No disponible"}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Ingredientes</h2>
                  <p className="text-muted-foreground">
                    {platillo.ingredientes || "No disponible"}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Precio</h2>
                  <p className="text-green-600 font-bold text-xl">
                    {new Intl.NumberFormat("es-BO", {
                      style: "currency",
                      currency: "BOB",
                      minimumFractionDigits: 2,
                    }).format(platillo.precio)}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Estado</h2>
                  <Badge variant={platillo.estado === "activo" ? "default" : "secondary"}>
                    {platillo.estado.charAt(0).toUpperCase() + platillo.estado.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Creado el</h2>
                  <p className="text-muted-foreground">{platillo.created_at}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}