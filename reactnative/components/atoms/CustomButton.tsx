import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CustomButtonProps {
  variant?: "primary" | "secondary" | "disabled";
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  title,
  onPress,
  loading,
  disabled,
  style,
  textStyle,
}) => {
  const baseButtonStyle: ViewStyle = {
    paddingVertical: 4.5,
    borderRadius: 10,
    opacity: disabled || loading ? 0.5 : 1,
  };

  const baseTextStyle: TextStyle = {
    textAlign: "center",
    fontWeight: "600",
  };

  let buttonStyle: ViewStyle = {};
  let buttonTextStyle: TextStyle = {};

  switch (variant) {
    case "primary":
      buttonStyle = {
        ...baseButtonStyle,
        backgroundColor: "#36338D",
      };
      buttonTextStyle = {
        ...baseTextStyle,
        color: "white",
      };
      break;
    case "secondary":
      buttonStyle = {
        ...baseButtonStyle,
        borderWidth: 1,
        borderColor: "#36338D",
        backgroundColor: "transparent",
      };
      buttonTextStyle = {
        ...baseTextStyle,
        color: "#36338D",
      };
      break;
    case "disabled":
      buttonStyle = { ...baseButtonStyle, backgroundColor: "#cccccc" };
      buttonTextStyle = { ...baseTextStyle, color: "#666666" };
      break;
  }

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={buttonTextStyle.color} />
      ) : (
        <Text style={[buttonTextStyle, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
