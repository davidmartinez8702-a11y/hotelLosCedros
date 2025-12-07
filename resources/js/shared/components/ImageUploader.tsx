import React, { useRef } from "react";
import { Button } from "@/shared/ui/button";

interface ImageUploaderProps {
  onImageChange: (file: File) => void;
  previewImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, previewImage }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {previewImage ? (
        <img
          src={previewImage}
          alt="Previsualización"
          className="w-full h-64 object-cover rounded-lg shadow cursor-pointer"
          onClick={handleImageClick}
        />
      ) : (
        <Button variant="outline" onClick={handleImageClick}>
          Seleccionar Imagen
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;