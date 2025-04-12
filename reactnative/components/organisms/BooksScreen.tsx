// components/organisms/BooksScreen.tsx
import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import HeaderWithSearch from "../molecules/HeaderWithSearch";
import BookItem from "../molecules/BookItem";
import { IGetAllBooks } from "@/interfaces/book.interface";
import useAuthStore from "@/store/authStore";
import { env } from "@/configs/env.config";
import { useFocusEffect } from "@react-navigation/native";
import useBookStore from "@/store/bookStore";
import useBorrowingStore from "@/store/borrowingStore";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "../atoms/Icon"; // Import your Icon component

type SortOption = "title" | "year" | "created_at";
type SortOrder = "asc" | "desc";
type FilterOption = "all" | "available";

const BooksScreen: React.FC = () => {
  const {
    books,
    loading,
    error,
    searchBooks,
    loadMoreBooks,
    refreshBooks,
    borrowBook,
  } = useBookStore();
  const { borrowedBooks } = useBorrowingStore();
  const [searchText, setSearchText] = useState("");
  const user = useAuthStore((state) => state.user);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const [filterOption, setFilterOption] = useState<FilterOption>("all");
  const [sortOption, setSortOption] = useState<SortOption>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showFilters, setShowFilters] = useState(false);

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

  const handleBorrow = useCallback(
    async (bookId: string) => {
      try {
        await borrowBook(bookId);
        const bookTitle = books.find((b) => b.id === parseInt(bookId))?.title;
        showSuccess(`Borrowed "${bookTitle}" successfully!`);
      } catch (error) {
        alert(error instanceof Error ? error.message : "An error occurred.");
      }
    },
    [borrowBook, books]
  );

  useFocusEffect(
    useCallback(() => {
      const initialLoad = async () => {
        if (user) {
          refreshBooks();
          useBorrowingStore.getState().fetchBorrowedBooks(Number(user.id));
        }
      };
      initialLoad();
    }, [user, refreshBooks])
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const onRefresh = useCallback(async () => {
    if (user) {
      await refreshBooks();
      await useBorrowingStore.getState().refreshBorrowedBooks(Number(user.id));
    }
  }, [user, refreshBooks]);

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    if (searchText) {
      result = searchBooks(searchText);
    }

    if (filterOption === "available") {
      result = result.filter(
        (book) =>
          !borrowedBooks.some(
            (borrowedBook) =>
              borrowedBook.bookId === book.id &&
              (borrowedBook.status === "BORROWED" ||
                borrowedBook.status === "LATE_RETURN")
          )
      );
    }

    result.sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;

      if (sortOption === "title") {
        return order * a.title.localeCompare(b.title);
      } else if (sortOption === "year") {
        return order * (parseInt(a.year || "0") - parseInt(b.year || "0"));
      } else if (sortOption === "created_at") {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return order * (dateA - dateB);
      }
      return 0;
    });

    return result;
  }, [
    books,
    searchText,
    filterOption,
    borrowedBooks,
    sortOption,
    sortOrder,
    searchBooks,
  ]);

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Pick a book to borrow!"
        onSearch={handleSearch}
      />

      <TouchableOpacity
        style={styles.filterToggleButton}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Icon
          name={showFilters ? "sort-up" : "filter"}
          size={18}
          color="white"
          type="FontAwesome"
        />
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.controlsContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Filter:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={filterOption}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  setFilterOption(itemValue as FilterOption)
                }
              >
                <Picker.Item label="All Books" value="all" />
                <Picker.Item label="Available" value="available" />
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Sort By:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={sortOption}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  setSortOption(itemValue as SortOption)
                }
              >
                <Picker.Item label="Title" value="title" />
                <Picker.Item label="Year" value="year" />
                <Picker.Item label="Creation Date" value="created_at" />
              </Picker>
            </View>
          </View>

          <View style={styles.sortOrderButtonContainer}>
            <Text style={styles.label}>Sort:</Text>
            <TouchableOpacity
              style={[
                styles.sortOrderButton,
                sortOrder === "asc" && styles.sortOrderButtonSelected,
              ]}
              onPress={() => setSortOrder("asc")}
            >
              <Text
                style={[
                  styles.sortOrderButtonText,
                  sortOrder === "asc" && styles.sortOrderButtonTextSelected,
                ]}
              >
                Asc
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOrderButton,
                sortOrder === "desc" && styles.sortOrderButtonSelected,
              ]}
              onPress={() => setSortOrder("desc")}
            >
              <Text
                style={[
                  styles.sortOrderButtonText,
                  sortOrder === "desc" && styles.sortOrderButtonTextSelected,
                ]}
              >
                Desc
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={filteredAndSortedBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookItem
            book={{
              ...item,
              id: item.id.toString(),
              year: parseInt(item.year || "0"),
              imageUrl: item.cover_img
                ? `${env.BASE_URL}/${item.cover_img.replace(/\\/g, "/")}`
                : "",
            }}
            onBorrow={handleBorrow}
            borrowedBooks={borrowedBooks}
          />
        )}
        onEndReached={loadMoreBooks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />

      {error && (
        <View style={styles.errorMessage}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

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
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerWrapper: {
    height: 30,
    width: 130,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
  },
  picker: {},
  sortOrderButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sortOrderButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginLeft: 5,
  },
  sortOrderButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  sortOrderButtonText: {
    color: "#333",
  },
  sortOrderButtonTextSelected: {
    color: "#fff",
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
  errorMessage: {
    position: "absolute",
    bottom: 4,
    left: 4,
    right: 4,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingIndicator: {
    paddingVertical: 20,
  },
  label: {
    marginRight: 5,
    fontSize: 16,
  },
  filterToggleButton: {
    backgroundColor: "#36338D",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  filterToggleButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BooksScreen;
