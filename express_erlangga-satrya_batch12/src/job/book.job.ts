import { dbBootcamp } from "../prisma/client.prisma";
import { schedule } from "node-cron";
import { sendBookDeletionRequest } from "../service/kafka.service";

const JClearDeletedBook = async (now: Date) => {
  try {
    console.log(`Running ${JClearDeletedBook.name} on ${now}`);
    const deletedBooks = await dbBootcamp.book.findMany({
      where: {
        deleted_at: {
          not: null,
        },
      },
    });

    for (const book of deletedBooks) {
      await dbBootcamp.book.delete({
        where: { id: book.id },
      });

      await sendBookDeletionRequest(Number(book.id));
      console.log(`Deleted book ID: ${book.id} and sent deletion request`);
    }
    console.log(`${deletedBooks.length} row(s) affected!`);
  } catch (error: any) {
    console.log("error", error);
  }
};

const JDeleteOldBooks = async (now: Date) => {
  try {
    console.log(`Running ${JDeleteOldBooks.name} on ${now}`);
    const aDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // const aDayAgo = new Date(now.getTime() - 1 * 60 * 1000);
    const oldBooks = await dbBootcamp.book.findMany({
      where: {
        created_at: {
          lte: aDayAgo,
        },
        deleted_at: null,
      },
    });

    for (const book of oldBooks) {
      try {
        await dbBootcamp.book.delete({
          where: { id: book.id },
        });

        await sendBookDeletionRequest(Number(book.id));
        console.log(`Deleted book ID: ${book.id} and sent deletion request`);
      } catch (error: any) {
        console.error(`Error deleting book with id ${book.id}:`, error);
      }
    }
    console.log(`${oldBooks.length} old book(s) permanently deleted`);
  } catch (error) {
    console.log("Error in JDeleteOldBooks:", error);
  }
};

schedule("1 * * * * *", () => JClearDeletedBook(new Date()), {
  runOnInit: false,
  name: JClearDeletedBook.name,
  timezone: "Asia/Jakarta",
});

// schedule("1 * * * * *", () => JDeleteOldBooks(new Date()), {
//   runOnInit: false,
//   name: JDeleteOldBooks.name,
//   timezone: "Asia/Jakarta",
// });
