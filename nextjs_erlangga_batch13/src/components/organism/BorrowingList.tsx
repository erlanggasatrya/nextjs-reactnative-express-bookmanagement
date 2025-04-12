// components/organisms/BorrowingList.tsx
"use client";
import React from "react";
import PaginationControls from "@/components/molecules/PaginationControls";
import SearchBar from "@/components/atoms/SearchBar";
import { IBorrowing } from "@/interfaces/borrowing.interface";
import BorrowingRow from "../molecules/BorrowingRow";

interface BorrowingListProps {
  borrowingRecords: IBorrowing[];
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onSearch: (searchTerm: string) => void;
}

const BorrowingList: React.FC<BorrowingListProps> = ({
  borrowingRecords,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSearch,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md py-4">
      <div className="flex justify-between items-center mb-4 py-3 px-6">
        <h1 className="text-xl font-bold ml-2">Borrowing Data</h1>
        <SearchBar onSearch={onSearch}/>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#36338D] text-white text-xl">
            <tr>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Borrower
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Borrowing Date
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Return Date
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowingRecords.map((record, index) => (
              <BorrowingRow key={index} record={record} />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default BorrowingList;
