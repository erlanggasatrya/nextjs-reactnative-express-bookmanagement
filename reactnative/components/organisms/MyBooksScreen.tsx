import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import BookItem from "../molecules/BookItem";
import HeaderWithSearch from "../molecules/HeaderWithSearch";
import { env } from "@/configs/env.config";
import useAuthStore from "@/store/authStore";
import { useFocusEffect } from "@react-navigation/native";
import useBorrowingStore from "@/store/borrowingStore";

const MyBooksScreen: React.FC = () => {
  const {
    borrowedBooks,
    loading,
    error,
    returnBook,
    searchBorrowedBooks,
    refreshBorrowedBooks,
  } = useBorrowingStore();
  const [searchText, setSearchText] = useState("");
  const user = useAuthStore((state) => state.user);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setShowMessage(false);
        setSuccessMessage(null);
      });
    }, 3000);
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        refreshBorrowedBooks(Number(user.id));
      }
    }, [user, refreshBorrowedBooks])
  );

  const handleReturn = useCallback(
    async (borrowingId: string) => {
      try {
        await returnBook(borrowingId);
        const returnedBook = borrowedBooks.find(
          (b) => b.id === parseInt(borrowingId)
        );
        const bookTitle = returnedBook?.book.title;

        showSuccess(`Returned "${bookTitle}" successfully!`);
      } catch (err: any) {
        alert(err.message || "Failed to return book");
      }
    },
    [returnBook, borrowedBooks]
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const currentlyBorrowed = borrowedBooks.filter((book) =>
    ["BORROWED", "LATE_RETURN"].includes(book.status)
  );

  const filteredBooks = searchText
    ? searchBorrowedBooks(searchText).filter((book) =>
        ["BORROWED", "LATE_RETURN"].includes(book.status)
      )
    : currentlyBorrowed;

  const onRefresh = useCallback(async () => {
    if (user) {
      await refreshBorrowedBooks(Number(user.id));
    }
  }, [user, refreshBorrowedBooks]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithSearch title="My Books" onSearch={handleSearch} />

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookItem
            book={{
              ...item,
              id: item.id.toString(),
              title: item.book.title,
              author: item.book.author || "",
              publisher: item.book.publisher || "",
              year: parseInt(item.book.year || "0"),
              borrowDate: item.borrowingDate,
              imageUrl: item.book.cover_img
                ? `${env.BASE_URL}/${item.book.cover_img.replace(/\\/g, "/")}`
                : "",
              status: item.status,
            }}
            onReturn={handleReturn}
            isMyBooks={true}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />

      {showMessage && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>{successMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  successMessage: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  successText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyBooksScreen;
