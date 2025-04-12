// components/atoms/SearchBar.tsx
"use client";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#F0F0F0] w-[270px] text-[#2A3042] border border-transparent rounded-4xl pl-12 py-2 mr-2 focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
      <Image
        src="/search-icon.png"
        alt="Search Icon"
        width={15}
        height={15}
        className="absolute left-5 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default SearchBar;
