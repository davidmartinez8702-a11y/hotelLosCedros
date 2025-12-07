import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ImageCardProps {
  src: string; // URL de la imagen
  alt: string; // Texto alternativo
  createdAt: string; // Fecha de creación
  onDelete: () => void; // Función para manejar la eliminación
  onClick: () => void;
}

export default function ImageCard({ src, alt, createdAt, onDelete,onClick }: ImageCardProps) {
  return (
    <div className="relative group rounded-lg shadow-md overflow-hidden">
      {/* Imagen */}
      <div onClick={onClick} className="cursor-pointer">
        <img
          src={src}
          alt={alt}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Botón de eliminar */}
      <Button
        variant="destructive"
        size="icon"
        onClick={onDelete}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash className="h-4 w-4" />
      </Button>

      {/* Fecha de creación */}
      <div className="absolute bottom-0 w-full bg-black/50 text-white text-sm text-center py-1">
        {createdAt}
      </div>
    </div>
  );
}