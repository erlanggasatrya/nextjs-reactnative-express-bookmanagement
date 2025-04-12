// components/molecules/DeleteConfirmationModal.tsx
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Button from "@/components/atoms/Button";


interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[485px] flex-col justify-items-center [&>button]:hidden py-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Are you sure want to delete this data?</DialogTitle>
        </DialogHeader>
        <div className="pb-2">
          <p className="text-[#54595E99]">
            Data that has been deleted cannot be recovered.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-[180px]">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="primary" onClick={onConfirm} className="w-[180px]">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
