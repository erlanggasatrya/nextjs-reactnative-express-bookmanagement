// app/borrowing/page.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/organism/Sidebar";
import BorrowingList from "@/components/organism/BorrowingList";
import { IBorrowing } from "@/interfaces/borrowing.interface";
import { useGetAllBorrowings } from "@/services/borrowing/query";
import { format, toZonedTime } from "date-fns-tz";
import ProtectedRoute from "@/components/ProtectedRoute";

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBorrowingRecords, setFilteredBorrowingRecords] = useState<
    any[]
  >([]);

  const {
    data: borrowingsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllBorrowings();

  const borrowingRecords: IBorrowing[] = useMemo(() => {
    return borrowingsData?.data || [];
  }, [borrowingsData?.data]);

  const formatDate = (isoDateString: string | null): string => {
    if (!isoDateString) {
      return "-";
    }
    const date = new Date(isoDateString);
    const wibDate = toZonedTime(date, "Asia/Jakarta");
    const formattedDate = format(wibDate, "MMMM do yyyy '-'");
    const formattedTime = format(wibDate, "h:mm");
    const formattedPeriod = format(wibDate, "a");
    return `${formattedDate} ${formattedTime} ${formattedPeriod}`;
  };

  useEffect(() => {
    const filtered = borrowingRecords.filter((record) => {
      const formattedBorrowingDate = formatDate(record.borrowingDate);
      const formattedReturnDate = formatDate(record.returnDate);

      return (
        (record.user.name
          ? record.user.name.toLowerCase().includes(searchTerm.toLowerCase())
          : record.user.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
        (record.book.title &&
          record.book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (record.book.author &&
          record.book.author
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (record.status &&
          record.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
        formattedBorrowingDate
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        formattedReturnDate.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredBorrowingRecords(filtered);
  }, [searchTerm, borrowingRecords]);

  const totalPages = Math.ceil(filteredBorrowingRecords.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(
    startIndex + rowsPerPage,
    filteredBorrowingRecords.length
  );
  const borrowingRecordsToDisplay = filteredBorrowingRecords.slice(
    startIndex,
    endIndex
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading borrowings</div>;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 px-10 py-22">
          <BorrowingList
            borrowingRecords={borrowingRecordsToDisplay}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BooksPage;
