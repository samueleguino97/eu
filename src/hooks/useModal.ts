import { useState } from 'react';
interface ModalFunctions {
  openModal: () => void;
  closeModal: () => void;
}
export function useModal() {
  const [open, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const modalFunction: ModalFunctions = { openModal, closeModal };
  return [open, modalFunction] as [boolean, ModalFunctions];
}

export type ModalProps = {
  open: boolean;
  onClose: () => void;
};
