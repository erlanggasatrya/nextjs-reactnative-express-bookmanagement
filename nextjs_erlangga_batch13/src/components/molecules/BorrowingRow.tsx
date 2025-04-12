// components/molecules/BorrowingRow.tsx
import { IBorrowing } from "@/interfaces/borrowing.interface";
import React from "react";
import { format, toZonedTime } from "date-fns-tz";

interface BorrowingRowProps {
  record: IBorrowing;
}

const BorrowingRow: React.FC<BorrowingRowProps> = ({ record }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "BORROWED":
        return "border-[#F2EB22] text-[#F2EB22]";
      case "RETURNED":
        return "border-[#3AB600] text-[#3AB600]";
      case "LATE_RETURN":
        return "border-[#B60000] text-[#B60000]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (isoDateString: string | null): string => {
    if (!isoDateString) {
      return "-";
    }
    const date = new Date(isoDateString);

    const wibDate = toZonedTime(date, "Asia/Jakarta");

    const formattedDate = format(wibDate, "MMMM do yyyy '-'");
    const formattedTime = format(wibDate, "h:mm");
    const formattedPeriod = format(wibDate, "a");

    return `${formattedDate} ${formattedTime} ${formattedPeriod}`;
  };

  const formattedBorrowingDate = formatDate(record.borrowingDate);
  const formattedReturnDate = formatDate(record.returnDate);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        {record.user.name || record.user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{record.book.title}</td>
      <td className="px-6 py-4 whitespace-nowrap">{record.book.author}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formattedBorrowingDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formattedReturnDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-sm border ${getStatusStyle(
            record.status
          )}`}
        >
          {record.status}
        </span>
      </td>
    </tr>
  );
};

export default BorrowingRow;
