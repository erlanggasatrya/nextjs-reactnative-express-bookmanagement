import { timeStamp } from "console";
import { producer, TOPICS } from "../config/kafka.config";
import { IGetBook } from "../interface/book.interface";

enum BookAction {
  "CREATED" = "created",
  "UPDATED" = "updated",
  "DELETED" = "deleted",
}

export const sendCreateBookNotification = async (
  book: Omit<
    IGetBook,
    "author" | "cover_img" | "publisher" | "description" | "year"
  >
) => {
  try {
    const bookData = {
      topic: TOPICS.BOOK_CHANGES,
      messages: [
        {
          value: JSON.stringify({
            id: book.id,
            action: BookAction.CREATED,
            bookName: book.title,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
    console.log("Sending Create Book Notification Payload:", bookData);
    await producer.send(bookData);
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to send create book notification");
  }
};

export const sendUpdateBookNotification = async (
  book: Omit<
    IGetBook,
    "author" | "cover_img" | "publisher" | "description" | "year"
  >
) => {
  try {
    const bookData = {
      topic: TOPICS.BOOK_CHANGES,
      messages: [
        {
          value: JSON.stringify({
            id: book.id,
            action: BookAction.UPDATED,
            bookName: book.title,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
    await producer.send(bookData);
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to send update book notification");
  }
};

export const sendDeleteBookNotification = async (
  book: Omit<
    IGetBook,
    "author" | "cover_img" | "publisher" | "description" | "year"
  >
) => {
  try {
    const bookData = {
      topic: TOPICS.BOOK_CHANGES,
      messages: [
        {
          value: JSON.stringify({
            id: book.id,
            action: BookAction.DELETED,
            bookName: book.title,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
    await producer.send(bookData);
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to send delete book notification");
  }
};

export const sendBookDeletionRequest = async (bookId: number) => {
  try {
    const bookData = {
      topic: TOPICS.BOOK_DELETION_REQUESTS, 
      messages: [
        {
          value: JSON.stringify({
            bookId: bookId,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
    await producer.send(bookData);
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to send book deletion request");
  }
};
