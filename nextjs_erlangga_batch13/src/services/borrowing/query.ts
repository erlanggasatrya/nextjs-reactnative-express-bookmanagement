// services/borrowing/query.ts
import { useQuery } from "@tanstack/react-query";
import { getAllBorrowings } from "./api";

export const useGetAllBorrowings = () =>
  useQuery({
    queryKey: ["get-all-borrowings"],
    queryFn: getAllBorrowings,
  });
