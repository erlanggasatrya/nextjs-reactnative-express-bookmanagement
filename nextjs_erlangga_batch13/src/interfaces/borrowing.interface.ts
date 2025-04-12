export interface IBorrowing {
  id: number;
  userId: number;
  bookId: number;
  borrowingDate: string;
  returnDate: string | null;
  status: "BORROWED" | "RETURNED" | "LATE_RETURN";
  user: {
    name: string | null;
    email: string;
  };
  book: {
    title: string;
    author: string;
  };
}
