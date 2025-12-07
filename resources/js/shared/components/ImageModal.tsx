import React from "react";
import Modal from "@/shared/components/Modal";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export default function ImageModal({ isOpen, onClose, src, alt }: ImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vista de Imagen">
      <div className="flex justify-center items-center">
        <img src={src} alt={alt} className="max-w-full max-h-[80vh] rounded-lg" />
      </div>
    </Modal>
  );
}