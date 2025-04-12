// components/molecules/PaginationControls.tsx
'use client';
import React, { ChangeEvent } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange?.(newRowsPerPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-end mt-6 mb-12 mr-4 gap-8 text-[#787878] ">
      <div className="flex items-center">
        <span className="mr-2">Rows per page:</span>
        <select
          className="px-2 py-1"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div>
        <span>
          {1 + (currentPage - 1) * rowsPerPage}-{Math.min(currentPage * rowsPerPage, totalPages * rowsPerPage)} of {totalPages * rowsPerPage}
        </span>
        <button
          className="mx-4 px-2 py-1"
          onClick={handlePreviousPage}
          disabled={currentPage === 1} 
        >
          {'<'}
        </button>
        <button
          className="px-2 py-1"
          onClick={handleNextPage}
          disabled={currentPage === totalPages} 
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;