import { create } from "zustand";
import {
  getAllBooks,
  borrowBook, 
} from "@/services/book/api";
import { IGetAllBooks, IBorrowing } from "@/interfaces/book.interface";
import useAuthStore from "./authStore"; 
import useBorrowingStore from "./borrowingStore";

interface BookState {
  books: IGetAllBooks[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  fetchBooks: (page?: number) => Promise<void>;
  searchBooks: (searchText: string) => IGetAllBooks[];
  loadMoreBooks: () => Promise<void>;
  refreshBooks: () => Promise<void>;
  borrowBook: (bookId: string) => Promise<void>;
}

const useBookStore = create<BookState>((set, get) => ({
  books: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,

  fetchBooks: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const fetchedBooks = await getAllBooks(page);
      if (fetchedBooks.length === 0) {
        set({ hasMore: false });
      }
      set((state) => ({
        books: page === 1 ? fetchedBooks : [...state.books, ...fetchedBooks],
        page: page,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch books", loading: false });
    }
  },

  searchBooks: (searchText: string) => {
    const { books } = get();
    const lowerSearchText = searchText.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerSearchText) ||
        book.author?.toLowerCase().includes(lowerSearchText) ||
        book.publisher?.toLowerCase().includes(lowerSearchText) ||
        book.description?.toLowerCase().includes(lowerSearchText)
    );
  },

  loadMoreBooks: async () => {
    const { loading, hasMore, page, fetchBooks } = get();
    if (loading || !hasMore) return;
    await fetchBooks(page + 1);
  },

  refreshBooks: async () => {
    set({ page: 1, hasMore: true }); 
    await get().fetchBooks(1); 
  },

  borrowBook: async (bookId: string) => {
    const user = useAuthStore.getState().user; 
    if (!user) {
      alert("You must be logged in to borrow a book.");
      return;
    }
    const userId = user.id.toString();

    console.log("Calling useBorrowingStore.borrowBook with bookId:", bookId, "userId:", userId);
    await useBorrowingStore.getState().borrowBook(bookId, userId);
  },
}));

export default useBookStore;
