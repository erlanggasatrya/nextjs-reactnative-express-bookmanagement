// components/atoms/Input.tsx
'use client';
import React from 'react';

interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  textarea?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  required = false,
  type = 'text',
  textarea = false
}) => {
  return (
    <div className="mb-4">
      <label className="block text-[#221B1B] text-lg mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          className="bg-[#F8FAFC] rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          rows={4}
        />
      ) : (
        <input
          className="bg-[#F8FAFC] rounded w-full p-3 text-gray-700 focus:outline-none"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default Input;