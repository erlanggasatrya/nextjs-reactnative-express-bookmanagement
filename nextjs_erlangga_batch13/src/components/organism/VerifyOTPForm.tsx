// components/organisms/VerifyOTPForm.tsx
"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useVerifyOTP } from "@/services/auth/mutation";
import { toast } from "react-toastify";

interface VerifyOTPFormProps {
  email: string;
  onSuccess: () => void;
}
const VerifyOTPForm: React.FC<VerifyOTPFormProps> = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState("");
  console.log("kode otp", typeof otp, otp);
  
  const { mutate: verifyOTP, isPending } = useVerifyOTP();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    verifyOTP(
      { email, otp },
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
        label="OTP"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="primary"
        className="w-full mt-4"
        disabled={isPending}
      >
        {isPending ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
};

export default VerifyOTPForm;
