import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash, Plus, ImageOff } from "lucide-react";
import AddImageModal from "@/shared/components/AddImageModal";
import ConfirmModal from "@/shared/components/ConfirmModal";
import ImageCard from "@/shared/components/ImageCard";
import ImageModal from "@/shared/components/ImageModal";
import { route } from "ziggy-js";

interface Imagen {
  id: number;
  url: string;
  created_at: string;
}

interface Props {
  tipoHabitacionId: number;
  tipoHabitacionNombre: string;
  imagenes: Imagen[];
}

export default function TipoHabitacionGaleria({ tipoHabitacionId, tipoHabitacionNombre, imagenes }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Imagen | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const handleDeleteImage = (imageId: number) => {
    setSelectedImageId(imageId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteImage = () => {
    if (!selectedImageId) return;

    router.delete(route("tipo-habitacion.imagenes.eliminar", { imagen: selectedImageId }), {
      onSuccess: () => {
        setIsConfirmModalOpen(false);
        setSelectedImageId(null);
      },
    });
  };

  const handleAddImage = (file: File) => {
    const formData = new FormData();
    formData.append("imagen", file);

    router.post(route("tipo-habitacion.imagenes.subir", { tipoHabitacion: tipoHabitacionId }), formData, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleImageClick = (imagen: Imagen) => {
    setSelectedImage(imagen);
    setIsImageModalOpen(true);
  };

  return (
    <AppLayout
    breadcrumbs={[
        { title: "Tipo de Habitaciones", href: route('tipo-habitacion.index') },
        { title: tipoHabitacionNombre, href: route('tipo-habitacion.show', tipoHabitacionId) },
        { title: "Galería", href: route('tipo-habitacion.galeria', tipoHabitacionId) },
    ]}
    >
      <Head title={`Galería de Imágenes: ${tipoHabitacionNombre}`} />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Galería de Imágenes</h1>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Imagen
            </Button>
          </div>

          <Separator />

          {/* Contenedor de imágenes */}
          {imagenes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {imagenes.map((imagen) => (
                <ImageCard
                  key={imagen.id}
                  src={imagen.url}
                  alt={`Imagen ${imagen.id}`}
                  createdAt={imagen.created_at}
                  onDelete={() => handleDeleteImage(imagen.id)}
                  onClick={() => handleImageClick(imagen)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <ImageOff className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground">No hay imágenes para este tipo de habitación.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar imagen */}
      <AddImageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddImage}
      />
      {selectedImage && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          src={selectedImage.url}
          alt={`Imagen ${selectedImage.id}`}
        />
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteImage}
        title="Eliminar Imagen"
        description="¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer."
      />
    </AppLayout>
  );
}