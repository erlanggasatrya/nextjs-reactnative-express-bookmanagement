// components/organisms/ResetPasswordForm.tsx
"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useResetPassword } from "@/services/auth/mutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  email: string;
  otp: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  otp,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: resetPassword, isPending } = useResetPassword();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword(
      { email, otp, newPassword },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          router.push("/login");
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <Input
        label="New Password"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="primary"
        className="w-full mt-4"
        disabled={isPending}
      >
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
