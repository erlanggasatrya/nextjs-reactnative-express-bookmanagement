// app/not-authorized/page.tsx
"use client";
import Button from "@/components/atoms/Button";
import { usePostLogout } from "@/services/auth/mutation";
import { authDataActions } from "@/store/reducer/authData";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NotAuthorizedPage = () => {
  const { mutate: mutateLogout, isPending: isLoggingOut } = usePostLogout();
  const dispatch = useDispatch();

  const handleLogout = () => {
    mutateLogout(undefined, {
      onSuccess: (res) => {
        dispatch(authDataActions.resetAuth());
        window.location.href = "/login";
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">403 Forbidden</h1>
        <p className="text-lg text-gray-600 my-4">
          You do not have permission to access this page.
        </p>
      </div>
      <Button
        variant="secondary"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
       {isLoggingOut ? "Logging out..." : "Back to Login"}
      </Button>
    </div>
  );
};

export default NotAuthorizedPage;
