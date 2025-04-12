import React from "react";
import { View, Text, TextInput } from "react-native";
import { Icon } from "../atoms/Icon";

interface HeaderWithSearchProps {
  title: string;
  onSearch: (text: string) => void;
  placeholder?: string;
}

const HeaderWithSearch: React.FC<HeaderWithSearchProps> = ({
  title,
  onSearch,
  placeholder = "Search book",
}) => {
  return (
    <View className="bg-secondary p-6 pt-16 mb-[16px] rounded-b-3xl">
      <Text className="text-white text-xl font-bold">{title}</Text>
      <View className="mt-6 relative">
        <Icon
          name="search"
          type="Feather"
          size={18}
          color="#878787"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
        <TextInput
          className="bg-white px-4 pl-[42px] py-3 h-[42px] rounded-[40px]"
          placeholder={placeholder}
          placeholderTextColor="#878787"
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
};

export default HeaderWithSearch;
