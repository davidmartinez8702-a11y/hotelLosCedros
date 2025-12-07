import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PlatilloDefault from "@/assets/platillo_default.jpg";
import { route } from "ziggy-js";
import ImageUploader from "@/shared/components/ImageUploader";
import EntityHeader from "@/shared/components/EntityHeader";

interface Categoria {
  id: number;
  nombre: string;
}

interface Props {
  categorias: Categoria[];
}

export default function PlatillosCreatePage({ categorias }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: "",
    categoria_id: categorias.length > 0 ? categorias[0].id : null,
    descripcion: "",
    ingredientes: "",
    precio: 0,
    estado: "disponible",
    imagen: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(PlatilloDefault);

  const handleImageChange = (file: File) => {
    setData("imagen", file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("platillos.store"), {
      preserveScroll: true,
      onSuccess: () => console.log("Platillo creado"),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Platillos", href: route("platillos.index") },
        { title: "Crear", href: route("platillos.create") },
      ]}
    >
      <Head title="Crear Platillo" />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex items-center justify-between">
            <EntityHeader title="Crear Platillo" subtitle="Agrega un nuevo platillo al menú" />
          </div>

          <Separator />
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent className="flex flex-col md:flex-row gap-6 mt-10">
                {/* Imagen */}
                <div className="md:w-1/2 flex justify-center items-center">
                  <ImageUploader onImageChange={handleImageChange} previewImage={previewImage} />
                </div>

                {/* Información del platillo */}
                <div className="md:w-1/2 space-y-6">
                  {/* Nombre */}
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      value={data.nombre}
                      onChange={(e) => setData("nombre", e.target.value)}
                      className={errors.nombre ? "border-red-500" : ""}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                  </div>

                  {/* Categoría */}
                  <div>
                    <Label htmlFor="categoria">Categoría</Label>
                    <Select
                      value={data.categoria_id?.toString() || ""}
                      onValueChange={(value) => setData("categoria_id", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id.toString()}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoria_id && (
                      <p className="text-red-500 text-sm">{errors.categoria_id}</p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={data.descripcion}
                      onChange={(e) => setData("descripcion", e.target.value)}
                    />
                  </div>

                  {/* Ingredientes */}
                  <div>
                    <Label htmlFor="ingredientes">Ingredientes</Label>
                    <Textarea
                      id="ingredientes"
                      value={data.ingredientes}
                      onChange={(e) => setData("ingredientes", e.target.value)}
                    />
                  </div>

                  {/* Precio */}
                  <div>
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                      id="precio"
                      type="number"
                      step="0.01"
                      value={data.precio}
                      onChange={(e) => setData("precio", parseFloat(e.target.value))}
                    />
                    {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                  </div>

                  {/* Estado */}
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={data.estado}
                      onValueChange={(value) => setData("estado", value as "disponible" | "no disponible")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">Disponible</SelectItem>
                        <SelectItem value="no disponible">No Disponible</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
                  </div>
                </div>
              </CardContent>
              <div className="flex justify-end mb-4 mr-4">
                <Button type="submit" disabled={processing}>
                  Crear Platillo
                </Button>
              </div>
            </Card>

            <Separator />
          </form>
        </div>
      </div>
    </AppLayout>
  );
}