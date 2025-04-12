// services/borrowing/api.ts
"use server";
import { IBaseResponse } from "@/interfaces/global/index.interface";
import { IBorrowing } from "@/interfaces/borrowing.interface";
import satellite from "../satellite";

export const getAllBorrowings = async () => {
  const res = await satellite.get<IBaseResponse<IBorrowing[]>>("/borrowing");
  return res.data;
};

export const createBorrowing = async (data: {
  userId: number;
  bookId: number;
  borrowingDate: string;
}) => {
  const res = await satellite.post<IBaseResponse<IBorrowing>>(
    "/borrowing",
    data
  );
  return res.data;
};

export const updateBorrowing = async (
  id: number,
  data: {
    returnDate?: string;
    status?: "BORROWED" | "RETURNED" | "LATE_RETURN";
  }
) => {
  const res = await satellite.put<IBaseResponse<IBorrowing>>(
    `/borrowing/${id}`,
    data
  );
  return res.data;
};

export const deleteBorrowing = async (id: number) => {
  const res = await satellite.delete<IBaseResponse>(`/borrowing/${id}`);
  return res.data;
};

