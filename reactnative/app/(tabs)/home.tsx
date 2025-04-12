import React from "react";
import BooksScreen from "@/components/organisms/BooksScreen";
import { SafeAreaView, View } from "react-native";

const Books = () => {
  return (
    <SafeAreaView className="flex-1">
      <BooksScreen />
    </SafeAreaView>
  );
};

export default Books;
