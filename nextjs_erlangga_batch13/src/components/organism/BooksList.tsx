// components/organisms/BooksList.tsx
"use client";
import React, { useState } from "react";
import BookRow, { Book } from "@/components/molecules/BookRow";
import PaginationControls from "@/components/molecules/PaginationControls";
import SearchBar from "@/components/atoms/SearchBar";
import DeleteConfirmationModal from "../molecules/DeleteConfirmationModal";
import BookCoverModal from "../molecules/BookCoverModal";
import EditBookModal from "../molecules/EditBookModal";

interface BooksListProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onDeleteBook: (index: number) => void;
  onUpdateBook: (index: number, updatedBook: any) => void;
  onSearch: (searchTerm: string) => void;
}

const BooksList: React.FC<BooksListProps> = ({
  books,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onDeleteBook,
  onUpdateBook,
  onSearch,
}) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const openDeleteModal = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteBookModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteIndex != null) {
      onDeleteBook(deleteIndex);
      closeDeleteBookModal();
    }
  };

  const openCoverModal = (book: any) => {
    setSelectedBook(book);
    setIsCoverModalOpen(true);
  };

  const closeCoverModal = () => {
    setSelectedBook(null);
    setIsCoverModalOpen(false);
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditIndex(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg drop-shadow-md py-4">
      <div className="flex justify-between items-center mb-4 py-3 px-6">
        <h1 className="text-xl font-bold ml-2">Books List</h1>
        <SearchBar onSearch={onSearch}/>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#36338D] text-white text-xl">
            <tr>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book, index) => (
              <BookRow
                key={index}
                book={book}
                onDelete={() => openDeleteModal(index)}
                onView={() => openCoverModal(book)}
                onEdit={() => openEditModal(index)}
              />
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteBookModal}
        onConfirm={handleDelete}
      />
      <BookCoverModal
        isOpen={isCoverModalOpen}
        onClose={closeCoverModal}
        book={selectedBook}
      />
      {editIndex !== null && (
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          book={books[editIndex]}
          onUpdate={(updatedBook) => {
            onUpdateBook(editIndex, updatedBook);
            closeEditModal();
          }}
        />
      )}
    </div>
  );
};

export default BooksList;
