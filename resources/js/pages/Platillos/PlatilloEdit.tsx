import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
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

interface Platillo {
  id: number;
  nombre: string;
  descripcion: string | null;
  ingredientes: string | null;
  image_url: string | null;
  precio: number;
  estado: "disponible" | "no disponible";
  categoria_id: number;
}

interface Props {
  platillo: Platillo;
  categorias: Categoria[];
}
// function getImageUrl(imageUrl: string | null): string {
//     if (!imageUrl) {
//       // Si no hay imagen, devuelve una imagen por defecto
//       return PlatilloDefault;
//     }
  
//     if (imageUrl.startsWith("http") || imageUrl.startsWith("https")) {
//       // Si la URL ya es absoluta, devuélvela tal cual
//       return imageUrl;
//     }
  
//     // Si la URL es relativa, asume que está en el storage de Laravel
//     return `/storage/${imageUrl}`;
// }
export default function PlatilloEdit({ platillo, categorias }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: platillo.nombre,
    categoria_id: platillo.categoria_id,
    descripcion: platillo.descripcion || "",
    ingredientes: platillo.ingredientes || "",
    precio: platillo.precio || 0,
    estado: platillo.estado || 'disponible',
    imagen: null as File | null,
    //imagen:PlatilloDefault
  });
  const platilloImageUrl = platillo.image_url;
  console.log(platilloImageUrl);
  //const platilloImageUrl =  PlatilloDefault;
  const [previewImage, setPreviewImage] = useState<string | null>(platilloImageUrl);

  const handleImageChange = (file: File) => {
    setData((prevData) => ({
        ...prevData, // Mantén los datos existentes
        imagen: file, // Actualiza solo el campo "imagen"
      }));
      setPreviewImage(URL.createObjectURL(file)); // Actualiza la previsualización
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("platillos.update", platillo.id), {
      preserveScroll: true,
      onSuccess: () => console.log("Platillo actualizado"),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Platillos", href: route("platillos.index") },
        { title: platillo.nombre, href: route("platillos.show", platillo.id) },
        { title: "Editar", href: route("platillos.edit", platillo.id) },
      ]}
    >
      <Head title={`Editar Platillo: ${platillo.nombre}`} />
      
      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
                <EntityHeader
                title={`Edicion del Platillo`}
                subtitle={`${platillo.nombre}`}
                />
                
            </div>

          <Separator />
          <form onSubmit={handleSubmit}>
            <Card>
                {/* <CardHeader>
                    <CardTitle>Información del Platillo</CardTitle>
                    <CardDescription>
                        Edita los Datos del Platillo Seleccionado.
                    </CardDescription>
                </CardHeader> */}
                
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
                      value={data.categoria_id.toString()}
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
                    <Label htmlFor="estado">Estado {data.estado}</Label>
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
                        Guardar Cambios
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

