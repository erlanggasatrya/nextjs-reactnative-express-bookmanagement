import { useMutation } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./api";
import { ICreateBook } from "@/interfaces/book.interface";

export const useCreateBook = () =>
  useMutation({
    mutationKey: ["create-book"],
    mutationFn: (bookData: FormData) => createBook(bookData),
  });

export const useUpdateBook = () =>
  useMutation({
    mutationKey: ["update-book"],
    mutationFn: ({ id, bookData }: { id: number; bookData: FormData }) =>
      updateBook(id, bookData),
  });

export const useDeleteBook = () =>
  useMutation({
    mutationKey: ["delete-book"],
    mutationFn: (id: number) => deleteBook(id),
  });
