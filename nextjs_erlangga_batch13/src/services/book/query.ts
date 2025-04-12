import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBookById } from "./api";

export const useGetAllBooks = () => {
  return useQuery({
    queryKey: ["get-all-books"],
    queryFn: getAllBooks,
  });
};

export const useGetBookById = (id: number) => {
  return useQuery({
    queryKey: ["get-book", id],
    queryFn: () => getBookById(id),
    enabled: !!id, // only enabled when id provided
  });
};


