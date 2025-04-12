// components/molecules/BookCoverModal.tsx
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";

interface BookCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: any | null;
}

const BookCoverModal: React.FC<BookCoverModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden [&>button]:hidden">
        <div className="bg-white p-6 rounded-lg">
          <DialogHeader>
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-xl font-bold">
                Book Cover
                <div className="border-[1.5px] w-[173px] border-[#131852] mb-5 mx-auto" />
              </DialogTitle>
              <DialogClose asChild>
                <button
                  aria-label="Close"
                  className="rounded-md hover:bg-gray-100 flex items-center justify-center"
                >
                  <X className="h-6 w-6" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          {book && (
            <Image
              priority
              src={
                book.cover_img
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${book.cover_img}`
                  : "/book-cover.png"
              }
              alt={`Cover of ${book.title}`}
              width={600}
              height={600}
              className="mx-auto"
              unoptimized={true}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookCoverModal;
