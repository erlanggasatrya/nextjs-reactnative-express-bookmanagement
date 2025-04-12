import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CustomButton from "../atoms/CustomButton";
import useAuthStore from "@/store/authStore";
import { IBorrowing } from "@/interfaces/book.interface";

interface BookItemProps {
  book: {
    id: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    description?: string;
    borrowDate?: string;
    imageUrl: string;
    status?: "BORROWED" | "RETURNED" | "LATE_RETURN";
  };
  onBorrow?: (bookId: string, userId: string) => void;
  onReturn?: (bookId: string) => void;
  isMyBooks?: boolean;
  borrowedBooks?: IBorrowing[];
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  onBorrow,
  onReturn,
  isMyBooks = false,
  borrowedBooks = [],
}) => {
  const user = useAuthStore((state) => state.user);
  const [expanded, setExpanded] = useState(false);

  if (!user) {
    return null;
  }

  const isBorrowed = borrowedBooks.some(
    (borrowedBook) =>
      borrowedBook.bookId === parseInt(book.id) &&
      (borrowedBook.status === "BORROWED" ||
        borrowedBook.status === "LATE_RETURN")
  );

  const truncateDescription = (desc: string | undefined, maxLength: number) => {
    if (!desc) return "";
    if (desc.length <= maxLength) return desc;
    return desc.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "No date";

    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    return `${day} ${monthNames[monthIndex]} ${year} - ${hours}:${minutesStr} ${ampm}`;
  };

  return (
    <View className="flex-row px-6 py-4 border-b border-gray-200">
      <Image
        source={
          book.imageUrl
            ? { uri: book.imageUrl }
            : require("../../assets/images/book-icon.png")
        }
        style={{ width: 79.54, height: 122 }}
      />
      <View className="ml-4 flex-1 justify-between">
        <View className="justify-start">
          <Text className="text-sm text-[#1D1D21] font-semibold">
            {book.title}
          </Text>
          <Text className="text-[#878787] text-[10px] mt-1">
            {book.author} - {book.publisher} ({book.year})
          </Text>

          {isMyBooks && (
            <Text
              className={`text-[10px] font-semibold mt-[6px] ${
                book.status === "LATE_RETURN"
                  ? "text-red-500"
                  : "text-[#188CFF]"
              }`}
            >
              Borrow Date: {formatDate(book.borrowDate)}
            </Text>
          )}

          {!isMyBooks && book.description && (
            <View>
              <Text className="text-[#1E1E1E] text-[10px] mt-[6px]">
                {expanded
                  ? book.description
                  : truncateDescription(book.description, 100)}
              </Text>
              {book.description.length > 100 && (
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text className="text-blue-500 text-[10px]">
                    {expanded ? "Read Less" : "Read More"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View className="justify-end">
          {isMyBooks && (
            <CustomButton
              style={{ borderRadius: 6 }}
              textStyle={{ fontSize: 10 }}
              variant="secondary"
              title="Return Book"
              onPress={() => onReturn && onReturn(book.id)}
            />
          )}

          {!isMyBooks && (
            <CustomButton
              style={{ borderRadius: 6 }}
              textStyle={{ fontSize: 10 }}
              variant="primary"
              title={isBorrowed ? "Borrowed" : "+ Borrow"}
              onPress={() => onBorrow && onBorrow(book.id, user.id.toString())}
              disabled={isBorrowed}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default BookItem;
