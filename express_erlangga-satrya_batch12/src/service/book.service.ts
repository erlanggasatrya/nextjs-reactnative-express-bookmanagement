import { Prisma } from "@prisma/client";
import {
  ICreateBook,
  IGetAllBooks,
  IGetBookById,
} from "../interface/book.interface";
import { IBaseResponse } from "../interface/global.interface";
import { dbBootcamp } from "../prisma/client.prisma";
import {
  sendCreateBookNotification,
  sendDeleteBookNotification,
  sendUpdateBookNotification,
} from "./kafka.service";

export const SCreateBook = async (
  bookData: ICreateBook
): Promise<IBaseResponse> => {
  try {
    const book = await dbBootcamp.book.create({
      data: {
        ...bookData,
        created_at: new Date(),
      },
    });

    // await sendCreateBookNotification({
    //   id: Number(book.id),
    //   title: book.title,
    // });

    return {
      status: true,
      message: "Success create book!",
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SDeleteBook = async (bookId: number): Promise<IBaseResponse> => {
  try {
    const book = await dbBootcamp.book.findUnique({ where: { id: bookId } });

    if (!book || book.deleted_at !== null) {
      const error: any = new Error("Book not found");
      error.status = 404;
      throw error;
    }

    await dbBootcamp.book.update({
      where: {
        id: bookId,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    // await sendDeleteBookNotification({
    //   id: Number(bookId),
    //   title: book.title,
    // });

    return {
      status: true,
      message: "Success delete book!",
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SGetAllBook = async (
  page: number,
  limit: number
): Promise<IBaseResponse<IGetAllBooks[]>> => {
  try {
    const skip = (page - 1) * limit;

    const books = await dbBootcamp.book.findMany({
      where: {
        deleted_at: null,
      },
      skip: skip, // Skip the specified number of records
      take: limit, // Take the specified number of records
    });

    const data: IBaseResponse<IGetAllBooks[]> = {
      status: true,
      message: "Success get all books!",
      data: books.map(
        (book): IGetAllBooks => ({
          id: Number(book.id),
          author: book.author,
          cover_img: book.cover_img,
          description: book.description,
          publisher: book.publisher,
          title: book.title,
          year: book.year,
          created_at: book.created_at.toISOString(),
        })
      ),
    };

    return data;
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SGetAllBookWithoutPagination = async (): Promise<
  IBaseResponse<IGetAllBooks[]>
> => {
  try {
    const books = await dbBootcamp.book.findMany({
      where: {
        deleted_at: null,
      },
    });

    const data: IBaseResponse<IGetAllBooks[]> = {
      status: true,
      message: "Success get all books!",
      data: books.map(
        (book): IGetAllBooks => ({
          id: Number(book.id),
          author: book.author,
          cover_img: book.cover_img,
          description: book.description,
          publisher: book.publisher,
          title: book.title,
          year: book.year,
          created_at: book.created_at.toISOString(),
        })
      ),
    };

    return data;
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SGetBookById = async (
  bookId: number
): Promise<IBaseResponse<IGetBookById>> => {
  try {
    const book = await dbBootcamp.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book || book.deleted_at != null) {
      const error: any = new Error("Book not found");
      error.status = 404;
      throw error;
    }

    const data: IBaseResponse<IGetBookById> = {
      status: true,
      message: "Success get book by ID",
      data: {
        ...book,
        id: Number(book.id),
      },
    };

    return data;
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SUpdateBook = async (
  bookId: number,
  updateData: Prisma.bookUpdateInput
): Promise<IBaseResponse> => {
  try {
    const book = await dbBootcamp.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book || book.deleted_at !== null) {
      const error: any = new Error("Book not found");
      error.status = 404;
      throw error;
    }

    const updatedBook = await dbBootcamp.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...updateData,
        updated_at: new Date(),
      },
    });

    // if (updatedBook) {
    //   await sendUpdateBookNotification({
    //     id: Number(updatedBook.id),
    //     title: updatedBook.title,
    //   });
    // }

    return {
      status: true,
      message: "Success update book!",
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};
