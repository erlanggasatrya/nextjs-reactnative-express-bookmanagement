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
}

export interface IGetBook {
  id: number;
  title: string;
  description: string | null;
  publisher: string | null;
  author: string | null;
  year: string | null;
  cover_img: string | null; 
}

export interface IGetBookById extends IGetAllBooks {}
