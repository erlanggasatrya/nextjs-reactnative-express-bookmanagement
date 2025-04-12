// components/organisms/EditBookModal.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import Input from "../atoms/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useUpdateBook } from "@/services/book/mutation";
import { toast } from "react-toastify";
import { queryClient } from "@/services/config/queryClient";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: any;
  onUpdate: (updatedBook: any) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  book,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(previewUrl);
  

  const { mutate: mutateUpdateBook, isPending: isUpdating } = useUpdateBook();

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPublisher(book.publisher || "");
      setYear(book.year || "");
      setDescription(book.description || "");
      if (book.cover_img) {
        setPreviewUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${book.cover_img}`);
      } else {
        setPreviewUrl(null);
      }
      setSelectedFile(null);
    }
  }, [book]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File is too large!  Please select a file smaller than 5MB.");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file.");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("year", year);
    formData.append("description", description);

    if (selectedFile) {
      formData.append("cover_img", selectedFile);
    }

    mutateUpdateBook(
      { id: book.id, bookData: formData },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["get-all-books"] });
          onUpdate({
            ...book,
            title,
            author,
            publisher,
            year,
            description,
            cover_img: selectedFile,
          });
          onClose();
          setSelectedFile(null);
          setPreviewUrl(null);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  console.log(previewUrl);
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px] p-0 overflow-auto [&>button]:hidden"
        style={{ maxWidth: "50vw" }}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-xl font-bold">
                Edit Book
                <div className="border-[1.5px] w-[173px] border-[#131852] mb-5 mx-auto" />
              </DialogTitle>
              <DialogClose asChild>
                <button
                  aria-label="Close"
                  className="p-1 rounded-md hover:bg-gray-100 flex items-center justify-center"
                >
                  <X className="h-6 w-6" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} onDragEnter={handleDrag}>
            <Input
              label="Title"
              value={title}
              placeholder="Input book title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Author"
              value={author}
              placeholder="Input author"
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <Input
              label="Publisher"
              value={publisher}
              placeholder="Input publisher"
              onChange={(e) => setPublisher(e.target.value)}
              required
            />
            <Input
              label="Year"
              value={year}
              placeholder="Publication year"
              onChange={(e) => setYear(e.target.value)}
              required
              type="number"
            />
            <Input
              label="Description"
              value={description}
              placeholder="Input description here..."
              onChange={(e) => setDescription(e.target.value)}
              required
              textarea
            />

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Book Cover <span className="text-red-500">*</span>
              </label>
              {previewUrl ? (
                <div className="relative">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={150}
                    height={200}
                    className="mb-2"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                    dragActive
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image
                    src="/upload-icon.png"
                    alt="Upload"
                    width={24}
                    height={24}
                    className="mx-auto mb-2"
                  />
                  <p className="text-gray-600">
                    Click to Upload or drag and drop
                  </p>
                  <p className="text-gray-400 text-sm">
                    (Max. File size: 25 MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*"
                    ref={fileInputRef}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <div className="flex justify-end">
                <Button variant="primary" type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Data"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
