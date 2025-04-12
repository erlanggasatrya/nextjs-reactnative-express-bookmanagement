export interface ICreateBook {
  title: string;
  author: string;
  year: string;
  description: string;
  publisher: string;
  cover_img: string;
}

export interface IGetAllBooks {
  id: number;
  title: string;
  description: string | null;
  publisher: string | null;
  author: string | null;
  year: string | null;
  cover_img: string | null;
  created_at: string;
}

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
  book: IGetAllBooks;
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
