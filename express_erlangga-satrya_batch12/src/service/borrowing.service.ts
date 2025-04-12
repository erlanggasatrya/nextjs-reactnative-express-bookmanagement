import { dbBootcamp } from "../prisma/client.prisma";
import { IBaseResponse } from "../interface/global.interface";
import {
  IBorrowing,
  ICreateBorrowing,
  IUpdateBorrowing,
} from "../interface/borrowing.interface";
import { calculateBorrowingStatus } from "../job/borrowing.job";

export const SCreateBorrowing = async (
  data: ICreateBorrowing
): Promise<IBaseResponse<IBorrowing>> => {
  try {
    const { bookId, userId } = data;

    const bookExists = await dbBootcamp.book.findUnique({
      where: { id: bookId, deleted_at: null },
    });

    if (!bookExists) {
      return { status: false, message: "Book not found.", data: undefined };
    }

    const userExists = await dbBootcamp.mst_user.findUnique({
      where: { id: userId, deleted_at: null },
    });

    if (!userExists) {
      return { status: false, message: "User not found.", data: undefined };
    }

    const existingBorrowing = await dbBootcamp.borrowing.findFirst({
      where: {
        bookId: BigInt(bookId),
        userId: BigInt(userId),
        status: {
          in: ["BORROWED", "LATE_RETURN"],
        },
        deleted_at: null,
      },
    });

    if (existingBorrowing) {
      return {
        status: false,
        message: "Book is already borrowed by this user",
        data: undefined,
      };
    }

    const initialStatus = calculateBorrowingStatus(
      data.borrowingDate,
      undefined
    );

    const borrowing = await dbBootcamp.borrowing.create({
      data: {
        userId: BigInt(userId), 
        bookId: BigInt(bookId), 
        borrowingDate: data.borrowingDate,
        status: initialStatus,
        created_at: new Date(),
      },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            publisher: true,
            year: true,
            cover_img: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      status: true,
      message: "Borrowing created successfully",
      data: {
        ...borrowing,
        id: Number(borrowing.id),
        bookId: Number(borrowing.bookId),
        userId: Number(borrowing.userId),
        borrowingDate: borrowing.borrowingDate,
        returnDate: borrowing.returnDate,
      },
    };
  } catch (error: any) {
    console.error("Error creating borrowing:", error);
    throw new Error("Failed to create borrowing");
  }
};

export const SGetAllBorrowings = async (): Promise<
  IBaseResponse<IBorrowing[]>
> => {
  try {
    const borrowings = await dbBootcamp.borrowing.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            publisher: true,
            year: true,
            cover_img: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      status: true,
      message: "Borrowings retrieved successfully",
      data: borrowings.map((borrowing) => ({
        ...borrowing,
        id: Number(borrowing.id),
        bookId: Number(borrowing.bookId),
        userId: Number(borrowing.userId),
        borrowingDate: borrowing.borrowingDate,
        returnDate: borrowing.returnDate,
      })),
    };
  } catch (error: any) {
    console.error("Error getting all borrowings:", error);
    throw new Error("Failed to get borrowings");
  }
};

export const SUpdateBorrowing = async (
  id: number,
  data: IUpdateBorrowing
): Promise<IBaseResponse<IBorrowing>> => {
  try {
    const existingBorrowing = await dbBootcamp.borrowing.findUnique({
      where: { id: BigInt(id), deleted_at: null },
    });

    if (!existingBorrowing) {
      throw new Error("Borrowing not found");
    }

    const newStatus = calculateBorrowingStatus(
      existingBorrowing.borrowingDate,
      data.returnDate
    );

    const updatedData: IUpdateBorrowing & {
      status?: "BORROWED" | "RETURNED" | "LATE_RETURN";
    } = { ...data };

    if (data.status || data.returnDate) {
      updatedData.status = newStatus;
    }

    const borrowing = await dbBootcamp.borrowing.update({
      where: { id: BigInt(id), deleted_at: null },
      data: {
        ...updatedData,
        updated_at: new Date(),
      },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            publisher: true,
            year: true,
            cover_img: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      status: true,
      message: "Borrowing updated successfully",
      data: {
        ...borrowing,
        id: Number(borrowing.id),
        bookId: Number(borrowing.bookId),
        userId: Number(borrowing.userId),
        borrowingDate: borrowing.borrowingDate,
        returnDate: borrowing.returnDate,
      },
    };
  } catch (error: any) {
    console.error("Error updating borrowing:", error);
    throw new Error("Failed to update borrowing");
  }
};

export const SDeleteBorrowing = async (id: number): Promise<IBaseResponse> => {
  try {
    await dbBootcamp.borrowing.update({
      where: { id: BigInt(id) },
      data: { deleted_at: new Date() },
    });

    return {
      status: true,
      message: "Borrowing deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting borrowing:", error);
    throw new Error("Failed to delete borrowing");
  }
};

export const SGetBorrowingsByUserId = async (
  userId: number
): Promise<IBaseResponse<IBorrowing[]>> => {
  try {
    const borrowings = await dbBootcamp.borrowing.findMany({
      where: {
        userId: BigInt(userId),
        deleted_at: null,
      },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            publisher: true,
            year: true,
            cover_img: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      status: true,
      message: "Borrowings retrieved successfully",
      data: borrowings.map((borrowing) => ({
        ...borrowing,
        id: Number(borrowing.id),
        bookId: Number(borrowing.bookId),
        userId: Number(borrowing.userId),
        borrowingDate: borrowing.borrowingDate,
        returnDate: borrowing.returnDate,
      })),
    };
  } catch (error: any) {
    console.error("Error getting borrowings by user ID:", error);
    throw new Error("Failed to get borrowings");
  }
};
