// components/organisms/ForgotPasswordForm.tsx
"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useForgotPassword } from "@/services/auth/mutation";
import { toast } from "react-toastify";

interface ForgotPasswordFormProps {
  onSuccess: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    forgotPassword(
      { email },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          onSuccess();
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
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="primary"
        className="w-full mt-4"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
