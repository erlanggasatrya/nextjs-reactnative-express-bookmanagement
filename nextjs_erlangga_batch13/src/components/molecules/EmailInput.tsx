// src/components/molecules/EmailInput.tsx
"use client";
import React from "react";

interface EmailInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  [key: string]: any;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        className={`bg-[#F8FAFC] border rounded-sm w-full py-4 px-3 text-gray-700 focus:outline-1 focus:shadow-outline ${
          error ? "border-[#ED0131]" : "border-transparent"
        }`}
        placeholder={placeholder || "Input Email"}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <p className="text-[#ED0131] text-xs text-end">{error}!</p>}{" "}
    </div>
  );
};

export default EmailInput;
