// services/borrowing/mutation.ts
import { useMutation } from "@tanstack/react-query";
import { createBorrowing, updateBorrowing, deleteBorrowing } from "./api";

export const useCreateBorrowing = () =>
  useMutation({
    mutationKey: ["create-borrowing"],
    mutationFn: createBorrowing,
  });

export const useUpdateBorrowing = () =>
  useMutation({
    mutationKey: ["update-borrowing"],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: {
        returnDate?: string;
        status?: "BORROWED" | "RETURNED" | "LATE_RETURN";
      };
    }) => updateBorrowing(id, data),
  });

export const useDeleteBorrowing = () =>
  useMutation({
    mutationKey: ["delete-borrowing"],
    mutationFn: deleteBorrowing,
  });
