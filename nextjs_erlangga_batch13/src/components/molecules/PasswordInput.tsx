// src/components/molecules/PasswordInput.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  [key: string]: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-6">
      <label
        htmlFor="password"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className={`bg-[#F8FAFC] border rounded-[4px]  w-full py-4 px-3 text-gray-700 focus:outline-1 focus:shadow-outline ${
            error ? "border-[#ED0131]" : "border-transparent"
          }`}
          placeholder={placeholder || "Input Password"}
          value={value}
          onChange={onChange}
          {...props}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Image
            src={showPassword ? "/hide-icon.png" : "/eye-icon.png"}
            alt={showPassword ? "Hide Password" : "Show Password"}
            width={20}
            height={20}
          />
        </div>
      </div>
      {error && <p className="text-[#ED0131] text-xs text-end">{error}!</p>}
    </div>
  );
};

export default PasswordInput;
