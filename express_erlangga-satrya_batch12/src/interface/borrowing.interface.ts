export interface IBorrowing {
  id: number;
  userId: number;
  bookId: number;
  borrowingDate: Date;
  returnDate: Date | null;
  status: "BORROWED" | "RETURNED" | "LATE_RETURN";
  user: {
    name: string | null;
    email: string;
  };
  book: {
    title: string;
    author: string | null;
    publisher: string | null;
    year: string | null;
    cover_img: string | null;
  };
}

export interface ICreateBorrowing {
  userId: number;
  bookId: number;
  borrowingDate: Date;
}

export interface IUpdateBorrowing {
  returnDate?: Date;
  status?: "BORROWED" | "RETURNED" | "LATE_RETURN";
}
