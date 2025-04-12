// components/atoms/Button.tsx
"use client";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  fullWidth = false,
  className,
  type,
  onClick,
  disabled = false,
}) => {
  let bgColor = "";
  switch (variant) {
    case "primary":
      bgColor = " text-white bg-[#36338D] hover:bg-indigo-700";
      break;
    case "secondary":
      bgColor = "text-[#36338D] outline-1 outline-[#36338D] hover:bg-gray-100";
      break;
  }

  return (
    <button
      type={type}
      className={`${bgColor} font-bold px-4 py-2.5 rounded-2xl ${
        fullWidth ? "w-full" : ""
      } flex items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
