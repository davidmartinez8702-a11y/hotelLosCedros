// import React, { useState } from "react";
// import  Modal  from "@/shared/components/Modal";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   servicioId: number;
// }

// export default function AddImageModal({ isOpen, onClose, servicioId }: Props) {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = () => {
//     console.log(`Subir imagen para el servicio ${servicioId}`);
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Agregar Imagen">
//       <div className="space-y-4">
//         {/* {preview ? (
//           <img src={preview} alt="Previsualización" className="w-full h-48 object-cover rounded-lg" />
//         ) : (
//           <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
//             <p className="text-muted-foreground">Selecciona una imagen para previsualizar</p>
//           </div>
//         )} */}
//         {preview ? (
//         <img src={preview} alt="Previsualización" className="w-full h-96 object-contain rounded-lg" />
//         ) : (
//         <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
//             <p className="text-muted-foreground">Selecciona una imagen para previsualizar</p>
//         </div>
//         )}
//         <Input type="file" accept="image/*" onChange={handleFileChange} />
//         <div className="flex justify-end">
//           <Button onClick={handleSubmit}>Subir Imagen</Button>
//         </div>
//       </div>
//     </Modal>
//   );
// }



import React, { useState } from "react";
import Modal from "@/shared/components/Modal";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react"; // Ícono para agregar imagen

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void; // Función para manejar la subida de la imagen
}

export default function AddImageModal({ isOpen, onClose, onSubmit }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (imageFile) {
      onSubmit(imageFile); // Llama a la función proporcionada por el padre
      setImageFile(null); // Limpia la imagen seleccionada
      setPreview(null); // Limpia la previsualización
      onClose(); // Cierra el modal
    }
  };

  const handleCancel = () => {
    setImageFile(null); // Limpia la imagen seleccionada
    setPreview(null); // Limpia la previsualización
    onClose(); // Cierra el modal
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Agregar Imagen">
      <div className="space-y-4">
        {preview ? (
          <img
            src={preview}
            alt="Previsualización"
            className="w-full h-96 object-contain rounded-lg"
          />
        ) : (
          <label
            htmlFor="file-input"
            className="w-full h-96 bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
          >
            <UploadCloud className="h-12 w-12 text-gray-500" />
            <p className="text-gray-500">Toca para agregar imagen</p>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!imageFile}>
            Subir Imagen
          </Button>
        </div>
      </div>
    </Modal>
  );
}