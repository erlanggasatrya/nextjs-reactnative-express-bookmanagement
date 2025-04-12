import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "./Icon";

interface CustomInputProps extends TextInputProps {
  iconName?: string;
  iconType?: string;
  isPassword?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  iconName,
  iconType,
  className,
  style,
  isPassword,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className={`bg-[#FFFFFF] flex-row items-center border border-[#EEEEEE] rounded-[10px] px-5 py-[22px] h-12 drop-shadow-sm ${
        isFocused ? "border-gray-600" : "border-[#EEEEEE]"
      } ${className || ""}`}
    >
      <TextInput
        className={`flex-1 h-12 text-[17px] outline-none ${className || ""}`}
        {...props}
        placeholderTextColor="#C4C4C4"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isPassword && !showPassword}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "visibility" : "visibility-off"}
            type="MaterialIcons"
            size={24}
            color="#D0D2D1"
          />
        </TouchableOpacity>
      )}
      {!isPassword && iconName && (
        <Icon name={iconName} type={iconType} size={24} color="#9CA3AF" />
      )}
    </View>
  );
};

export default CustomInput;
