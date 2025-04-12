import { useQuery } from "@tanstack/react-query";
import { checkAuthToken, getUserLogin } from "./api";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUserLogin(),
    // enabled: false,
  });

export const useCheckAuthToken = () =>
  useQuery({
    queryKey: ["check-auth-token"],
    queryFn: checkAuthToken,
  });
