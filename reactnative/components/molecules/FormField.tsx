import React from "react";
import { View, Text } from "react-native";
import CustomInput from "../atoms/CustomInput";

interface FormFieldProps {
  label: string;
  name: string;
  touched?: boolean;
  error?: string;
  iconName?: string;
  iconType?: string;
  inputProps?: any;
  isPassword?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  touched,
  error,
  inputProps,
  iconName,
  iconType,
  isPassword,
}) => {
  return (
    <View className="mb-6">
      <Text className="text-[#9796A1] mb-1">{label}</Text>
      <CustomInput
        {...inputProps}
        name={name}
        iconName={iconName}
        iconType={iconType}
        isPassword={isPassword}
        className={`h-[65px] ${touched && error ? "border-[#F44336]" : ""}`}
      />
      {touched && error && (
        <Text className="text-red-500 text-[10px] text-right mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormField;
