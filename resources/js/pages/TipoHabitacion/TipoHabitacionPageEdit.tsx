import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { route } from "ziggy-js";

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
  categoria_id: number;
}

interface Props {
  tipoHabitacion: TipoHabitacion;
  categorias: Categoria[];
}

export default function TipoHabitacionPageEdit({ tipoHabitacion, categorias }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: tipoHabitacion.nombre,
    descripcion: tipoHabitacion.descripcion || "",
    estado: tipoHabitacion.estado,
    capacidad_adultos: tipoHabitacion.capacidad_adultos,
    capacidad_infantes: tipoHabitacion.capacidad_infantes,
    capacidad_total: tipoHabitacion.capacidad_total,
    precio: tipoHabitacion.precio,
    tipo: tipoHabitacion.tipo,
    categoria_id: tipoHabitacion.categoria_id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("tipo-habitacion.update", tipoHabitacion.id), {
      preserveScroll: true,
      onSuccess: () => console.log("Tipo de habitación actualizado"),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Tipo de Habitaciones", href: route("tipo-habitacion.index") },
        { title: tipoHabitacion.nombre, href: route("tipo-habitacion.show", tipoHabitacion.id) },
        { title: "Editar", href: route("tipo-habitacion.edit", tipoHabitacion.id) },
      ]}
    >
      <Head title={`Editar Tipo de Habitación: ${tipoHabitacion.nombre}`} />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Editar Tipo de Habitación</h1>
          </div>

          <Separator />

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Información del Tipo de Habitación</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="categoria_id">Categoría</Label>
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
                  {errors.categoria_id && <p className="text-red-500 text-sm">{errors.categoria_id}</p>}
                </div>

                {/* Tipo */}
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={data.tipo}
                    onValueChange={(value) => setData("tipo", value as "habitacion" | "evento")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="habitacion">Habitación</SelectItem>
                      <SelectItem value="evento">Evento</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
                </div>

                {/* Descripción */}
                <div className="col-span-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={data.descripcion}
                    onChange={(e) => setData("descripcion", e.target.value)}
                  />
                  {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
                </div>

                {/* Capacidad de adultos e infantes (solo para habitaciones) */}
                {data.tipo === "habitacion" && (
                  <>
                    <div>
                      <Label htmlFor="capacidad_adultos">Capacidad de Adultos</Label>
                      <Input
                        id="capacidad_adultos"
                        type="number"
                        value={data.capacidad_adultos}
                        onChange={(e) => setData("capacidad_adultos", parseInt(e.target.value))}
                        className={errors.capacidad_adultos ? "border-red-500" : ""}
                      />
                      {errors.capacidad_adultos && (
                        <p className="text-red-500 text-sm">{errors.capacidad_adultos}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="capacidad_infantes">Capacidad de Infantes</Label>
                      <Input
                        id="capacidad_infantes"
                        type="number"
                        value={data.capacidad_infantes}
                        onChange={(e) => setData("capacidad_infantes", parseInt(e.target.value))}
                        className={errors.capacidad_infantes ? "border-red-500" : ""}
                      />
                      {errors.capacidad_infantes && (
                        <p className="text-red-500 text-sm">{errors.capacidad_infantes}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Capacidad total (solo para eventos) */}
                {data.tipo === "evento" && (
                  <div>
                    <Label htmlFor="capacidad_total">Capacidad Total</Label>
                    <Input
                      id="capacidad_total"
                      type="number"
                      value={data.capacidad_total}
                      onChange={(e) => setData("capacidad_total", parseInt(e.target.value))}
                      className={errors.capacidad_total ? "border-red-500" : ""}
                    />
                    {errors.capacidad_total && (
                      <p className="text-red-500 text-sm">{errors.capacidad_total}</p>
                    )}
                  </div>
                )}

                {/* Precio */}
                <div>
                  <Label htmlFor="precio">Precio</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={data.precio}
                    onChange={(e) => setData("precio", parseFloat(e.target.value))}
                    className={errors.precio ? "border-red-500" : ""}
                  />
                  {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                </div>

                {/* Estado */}
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select
                    value={data.estado}
                    onValueChange={(value) => setData("estado", value as "activo" | "inactivo")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
                </div>
              </CardContent>
              <div className="flex justify-end mb-4 mr-4">
                <Button type="submit" disabled={processing}>
                  Guardar Cambios
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}