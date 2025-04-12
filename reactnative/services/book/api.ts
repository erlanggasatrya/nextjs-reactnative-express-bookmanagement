import satellite from "../satellite";
import { IBaseResponse } from "@/interfaces/global.interface";
import {
  IGetAllBooks,
  IBorrowing,
  ICreateBorrowing,
} from "@/interfaces/book.interface";
import useAuthStore from "@/store/authStore";

export const getAllBooks = async (
  page: number,
  limit: number = 10
): Promise<IGetAllBooks[]> => {
  try {
    const response = await satellite.get<IBaseResponse<IGetAllBooks[]>>(
      `/book?page=${page}&limit=${limit}`
    );
    return response.data.data || [];
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const borrowBook = async (
  bookId: number,
  userId: number
): Promise<IBorrowing> => {
  try {
    const response = await satellite.post<IBaseResponse<IBorrowing>>(
      "/borrowing",
      { bookId: bookId, userId: userId, borrowingDate: new Date() }
    );
    return response.data.data!;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const returnBook = async (borrowingId: number): Promise<void> => {
  try {
    const response = await satellite.put<IBaseResponse>(
      `/borrowing/${borrowingId}`,
      { status: "RETURNED", returnDate: new Date() }
    );
    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to return book");
    }
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getMyBorrowedBooks = async (
  userId: number
): Promise<IBorrowing[]> => {
  try {
    const response = await satellite.get<IBaseResponse<IBorrowing[]>>(
      `/borrowing/${userId}`
    );
    return response.data.data || [];
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
