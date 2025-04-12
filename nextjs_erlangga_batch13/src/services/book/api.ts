"use server";
import {
  ICreateBook,
  IGetAllBooks,
  IGetBookById,
} from "@/interfaces/book.interface";
import { IBaseResponse } from "@/interfaces/global/index.interface";
import satellite from "../satellite";

export const getAllBooks = async () => {
  const res = await satellite.get<IBaseResponse<IGetAllBooks[]>>("/book/all");
  return res.data;
};

export const getBookById = async (id: number) => {
  const res = await satellite.get<IBaseResponse<IGetBookById>>(`/book/${id}`);
  return res.data;
};

export const createBook = async (bookData: FormData) => {
  const res = await satellite.post<IBaseResponse>("/book", bookData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateBook = async (id: number, bookData: FormData) => {
  const res = await satellite.put<IBaseResponse>(`/book/${id}`, bookData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteBook = async (id: number) => {
  const res = await satellite.delete<IBaseResponse>(`/book/${id}`);
  return res.data;
};

