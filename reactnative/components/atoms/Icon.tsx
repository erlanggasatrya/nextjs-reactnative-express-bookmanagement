import React from "react";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface IconProps {
  name: string;
  size: number;
  color: string;
  type?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  color,
  type,
  className,
}) => {
  switch (type) {
    case "FontAwesome":
      return (
        <FontAwesome
          name={name}
          size={size}
          color={color}
          className={className}
        />
      );
    case "Feather":
      return (
        <Feather name={name} size={size} color={color} className={className} />
      );
    case "Ionicons":
      return (
        <Ionicons name={name} size={size} color={color} className={className} />
      );
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          className={className}
        />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={name}
          size={size}
          color={color}
          className={className}
        />
      );
    default:
      return (
        <View>
          <Text>Icon Not Found</Text>
        </View>
      );
  }
};
