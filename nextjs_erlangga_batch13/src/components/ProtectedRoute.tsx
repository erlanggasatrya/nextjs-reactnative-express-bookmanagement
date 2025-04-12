// components/ProtectedRoute.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetUser, useCheckAuthToken } from "@/services/auth/query"; // Import useCheckAuthToken
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authDataActions } from "@/store/reducer/authData";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const {
    data: userData,
    isError: isUserError,
    refetch: refetchUser,
  } = useGetUser();
  const {
    data: tokenData,
    isError: isTokenError,
    refetch: refetchToken,
  } = useCheckAuthToken(); 
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const tokenResponse = await refetchToken();

      if (!tokenResponse.data?.data?.token) {
        router.replace("/login");
        return;
      }

      try {
        const userResponse = await refetchUser();

        if (userResponse.error) {
          toast.error("Session expired. Please log in again.");
          dispatch(authDataActions.resetAuth());
          router.replace("/login");
          return;
        }

        if (userResponse.data?.data?.role !== "ADMIN") {
          router.replace("/not-authorized");
          return;
        }

        if (userResponse.data?.data) {
          dispatch(authDataActions.setUserData(userResponse.data.data));
        }
      } catch (error) {
        toast.error("An error occurred. Please log in again.");
        dispatch(authDataActions.resetAuth());
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router, refetchUser, refetchToken, dispatch]);

  if (isUserError || isTokenError) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
