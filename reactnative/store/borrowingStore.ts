import { create } from "zustand";
import {
  getMyBorrowedBooks,
  returnBook,
  borrowBook,
} from "@/services/book/api";
import { IBorrowing } from "@/interfaces/book.interface";
import useBookStore from "./bookStore";
import useAuthStore from "./authStore";

interface BorrowingState {
  borrowedBooks: IBorrowing[];
  loading: boolean;
  error: string | null;
  fetchBorrowedBooks: (userId: number) => Promise<void>;
  returnBook: (borrowingId: string) => Promise<void>;
  borrowBook: (bookId: string, userId: string) => Promise<void>; 
  searchBorrowedBooks: (searchText: string) => IBorrowing[];
  refreshBorrowedBooks: (userId: number) => Promise<void>;
}

const useBorrowingStore = create<BorrowingState>((set, get) => ({
  borrowedBooks: [],
  loading: false,
  error: null,

  fetchBorrowedBooks: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const fetchedBooks = await getMyBorrowedBooks(userId);
      set({ borrowedBooks: fetchedBooks, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch borrowed books",
        loading: false,
      });
    }
  },

  returnBook: async (borrowingId: string) => {
    const previousBooks = get().borrowedBooks;
    set({
      borrowedBooks: previousBooks.filter(
        (book) => book.id !== parseInt(borrowingId)
      ),
    });
    try {
      await returnBook(parseInt(borrowingId));
    } catch (err: any) {
      set({ borrowedBooks: previousBooks });
      throw err; 
    }
  },

  borrowBook: async (bookId: string, userId: string) => {
    const previousBorrowedBooks = get().borrowedBooks;
    const book = useBookStore
      .getState()
      .books.find((b) => b.id === parseInt(bookId));
    const user = useAuthStore.getState().user;

    if (!book) {
      throw new Error("Book not found."); 
    }
    try {
      const borrowedBook: IBorrowing = {
        id: 0, 
        userId: parseInt(userId),
        bookId: parseInt(bookId),
        borrowingDate: new Date().toISOString(),
        returnDate: null,
        status: "BORROWED",
        user: { name: user?.name || "", email: user?.email || "" },
        book: {
          title: book.title,
          author: book.author || "",
          publisher: book.publisher || "",
          year: book.year || "",
          cover_img: book.cover_img || "",
        },
      };

      set({ borrowedBooks: [...previousBorrowedBooks, borrowedBook] });
      const res = await borrowBook(parseInt(bookId), parseInt(userId));

      set((state) => ({
        borrowedBooks: state.borrowedBooks.map((b) =>
          b.id === 0 && b.bookId === parseInt(bookId) ? { ...res } : b
        ),
      }));
    } catch (err: any) {
      set({ borrowedBooks: previousBorrowedBooks }); 
      throw err; 
    }
  },

  searchBorrowedBooks: (searchText: string) => {
    const { borrowedBooks } = get();
    const lowerSearchText = searchText.toLowerCase();
    return borrowedBooks.filter((borrowing) => {
      const title = borrowing.book.title.toLowerCase();
      const author = borrowing.book.author?.toLowerCase() || "";
      const publisher = borrowing.book.publisher?.toLowerCase() || "";
      return (
        title.includes(lowerSearchText) ||
        author.includes(lowerSearchText) ||
        publisher.includes(lowerSearchText)
      );
    });
  },

  refreshBorrowedBooks: async (userId: number) => {
    await get().fetchBorrowedBooks(userId);
  },
}));

export default useBorrowingStore;
