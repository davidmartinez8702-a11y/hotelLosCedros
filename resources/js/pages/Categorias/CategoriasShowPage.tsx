import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pencil, Tag, Layers } from "lucide-react";
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";

interface Categoria {
  id: number;
  nombre: string;
  tipo: string;
  estado: "activo" | "inactivo";
  created_at: string;
  updated_at: string;
}

interface Props {
  categoria: Categoria;
}

export default function CategoriasShowPage({ categoria }: Props) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Categorías", href: route("categorias.index") },
        { title: categoria.nombre, href: route("categorias.show", categoria.id) },
      ]}
    >
      <Head title={`Detalle de Categoría: ${categoria.nombre}`} />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <EntityHeader
              title={categoria.nombre}
              subtitle="Última actualización:"
              span={categoria.updated_at}
            />

            <Link href={route("categorias.edit", categoria.id)}>
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
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Información de la Categoría</CardTitle>
                  <CardDescription>
                    Detalles completos de la categoría registrada en el sistema.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información de la categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-muted-foreground">Nombre</h2>
                  <p className="text-lg font-semibold">{categoria.nombre}</p>
                </div>

                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-muted-foreground">Tipo</h2>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <p className="text-lg">{categoria.tipo}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-muted-foreground">Estado</h2>
                  <Badge variant={categoria.estado === "activo" ? "default" : "secondary"}>
                    {categoria.estado.charAt(0).toUpperCase() + categoria.estado.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-muted-foreground">Fecha de Creación</h2>
                  <p className="text-lg">{categoria.created_at}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}