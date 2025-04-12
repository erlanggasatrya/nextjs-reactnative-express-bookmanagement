import { dbBootcamp } from "../prisma/client.prisma";
import { schedule } from "node-cron";

export const calculateBorrowingStatus = (
  borrowingDate: Date,
  returnDate: Date | null | undefined
): "BORROWED" | "RETURNED" | "LATE_RETURN" => {
  if (!returnDate) {
    const now = new Date();
    const maxBorrowingDays = 7;
    const borrowingDeadline = new Date(borrowingDate);
    borrowingDeadline.setDate(borrowingDeadline.getDate() + maxBorrowingDays);

    if (now > borrowingDeadline) {
      return "LATE_RETURN";
    } else {
      return "BORROWED";
    }
  } else {
    return "RETURNED";
  }
};

export const JCheckOverdueBorrowings = async (now: Date) => {
  try {
    console.log(`Running ${JCheckOverdueBorrowings.name} on ${now}`);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 14);

    const overdueBorrowings = await dbBootcamp.borrowing.findMany({
      where: {
        status: "BORROWED",
        borrowingDate: {
          lte: sevenDaysAgo,
        },
        deleted_at: null,
      },
    });

    for (const borrowing of overdueBorrowings) {
      await dbBootcamp.borrowing.update({
        where: { id: borrowing.id },
        data: { status: "LATE_RETURN", updated_at: new Date() },
      });
      console.log(`Borrowing ${borrowing.id} marked as LATE_RETURN.`);
    }
    console.log(
      `${overdueBorrowings.length} borrowing(s) marked as LATE_RETURN.`
    );
  } catch (error) {
    console.error("Error checking overdue borrowings:", error);
  }
};

schedule("*/5 * * * * *", () => JCheckOverdueBorrowings(new Date()), {
  runOnInit: false,
  name: JCheckOverdueBorrowings.name,
  timezone: "Asia/Jakarta",
});
