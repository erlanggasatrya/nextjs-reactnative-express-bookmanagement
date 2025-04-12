// app/books/page.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Topbar from "@/components/molecules/Topbar";
import Sidebar from "@/components/organism/Sidebar";
import BooksList from "@/components/organism/BooksList";
import AddBookModal from "@/components/molecules/AddBookModal";
import { useGetAllBooks } from "@/services/book/query";
import { useDeleteBook, useUpdateBook } from "@/services/book/mutation";
import { toast } from "react-toastify";
import { queryClient } from "@/services/config/queryClient";
import { IGetBook } from "@/interfaces/book.interface";
import ProtectedRoute from "@/components/ProtectedRoute";

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

  const { data: booksData, isLoading, isError, refetch } = useGetAllBooks();
  const { mutate: mutateDeleteBook, isPending: isDeleting } = useDeleteBook();
  const { mutate: mutateUpdateBook, isPending: isUpdating } = useUpdateBook();

  const books: IGetBook[] = useMemo(() => {
    return booksData?.data || [];
  }, [booksData?.data]);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author &&
          book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.publisher &&
          book.publisher.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.description &&
          book.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const totalPages = Math.ceil(filteredBooks.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredBooks.length);
  const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const openModal = () => {
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteBook = (index: number) => {
    const bookId = booksToDisplay[index]?.id;
    if (bookId) {
      mutateDeleteBook(bookId, {
        onSuccess: (res) => {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["get-all-books"] });
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      });
    }
  };

  const handleUpdateBook = (index: number, updatedBook: any) => {
    const bookId = booksToDisplay[index]?.id;

    if (bookId) {
      const formData = new FormData();
      formData.append("title", updatedBook.title);
      formData.append("author", updatedBook.author);
      formData.append("publisher", updatedBook.publisher);
      formData.append("year", updatedBook.year.toString());
      formData.append("description", updatedBook.description);
      if (updatedBook.coverUrl) {
        if (
          typeof updatedBook.coverUrl === "string" &&
          updatedBook.coverUrl.startsWith("data:image")
        ) {
          const byteString = atob(updatedBook.coverUrl.split(",")[1]);
          const mimeString = updatedBook.coverUrl
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          formData.append("cover_img", blob, "cover.jpg");
        } else if (updatedBook.coverUrl instanceof File) {
          formData.append("cover_img", updatedBook.coverUrl);
        }
      }

      mutateUpdateBook(
        { id: bookId, bookData: formData },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["get-all-books"] });
          },
          onError: (error: any) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 p-10">
          <Topbar onAddClick={openModal} />
          <BooksList
            books={booksToDisplay}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            onDeleteBook={handleDeleteBook}
            onUpdateBook={handleUpdateBook}
            onSearch={handleSearch}
          />
        </div>
        <AddBookModal isOpen={isAddModalOpen} onClose={closeModal} />
      </div>
    </ProtectedRoute>
  );
};

export default BooksPage;
