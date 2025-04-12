import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../atoms/Icon";

interface ProfileMenuItemProps {
  iconName: string;
  iconType?: string;
  title: string;
  onPress: () => void;
  iconColor?: string;
  bgColor?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  iconName,
  iconType,
  title,
  onPress,
  iconColor = "#000",
  bgColor = "#FEEFFF",
  isFirst = false,
  isLast = false,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-4 ${isFirst && isLast ? "py-4 rounded-2xl" : ""} ${
        isFirst && !isLast ? "rounded-t-2xl pt-4 pb-2" : "py-2"
      } ${isLast ? "rounded-b-2xl pb-4" : ""}`}
      style={{ backgroundColor: bgColor }}
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View className="w-[40] h-[40] p-2 rounded-full bg-white flex justify-center items-center">
          <Icon name={iconName} type={iconType} size={15} color={iconColor} />
        </View>
        <Text className="ml-4 text-[14px] text-[#32343E]">{title}</Text>
      </View>
      <Icon name="chevron-right" type="MaterialIcons" size={24} color="#747783" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
