import React from "react";
import Modal  from "@/shared/components/Modal";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, description }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}