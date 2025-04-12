import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import FormField from "@/components/molecules/FormField";
import CustomButton from "@/components/atoms/CustomButton";
import { resetPasswordSchema } from "@/validation/validation";
import { resetPassword } from "@/services/auth/api";
import { router, useLocalSearchParams } from "expo-router";

const ResetPasswordScreen: React.FC = () => {
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  const initialValues = { newPassword: "", confirmPassword: "" };

  const onSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
      setFieldError,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    try {
      const response = await resetPassword(email, otp, values.newPassword);
      if (response.status) {
        router.replace("/"); 
        alert("Password reset successfully!");
      } else {
        setFieldError(
          "newPassword",
          response.message || "Failed to reset password."
        );
      }
    } catch (error: any) {
      setFieldError("newPassword", error.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      {/* Top-Left Corner Decoration */}
      <View className="absolute top-0 left-0 overflow-hidden">
        <Image
          source={require("../assets/images/top-left.png")}
          style={{ width: 181, height: 181, top: -40 }}
          resizeMode="contain"
        />
      </View>

      {/* Top-Right Corner Decoration */}
      <View className="absolute top-0 right-0 overflow-hidden">
        <Image
          source={require("../assets/images/top-right.png")}
          style={{ width: 120, height: 100, right: -40 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8 mt-20">
          <Image
            source={require("../assets/images/book-logo.png")}
            style={{ width: 79, height: 80 }}
            className="mb-4"
          />
          <Text className="text-[32px] font-bold text-center">
            Reset Password
          </Text>
          <Text className="text-center text-gray-500 mt-2">
            Enter your new password.
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <FormField
                label="New Password"
                name="newPassword"
                isPassword={true}
                inputProps={{
                  placeholder: "New Password",
                  onChangeText: handleChange("newPassword"),
                  onBlur: handleBlur("newPassword"),
                  value: values.newPassword,
                }}
                touched={touched.newPassword}
                error={errors.newPassword}
              />
              <FormField
                label="Confirm Password"
                name="confirmPassword"
                isPassword={true}
                inputProps={{
                  placeholder: "Confirm Password",
                  onChangeText: handleChange("confirmPassword"),
                  onBlur: handleBlur("confirmPassword"),
                  value: values.confirmPassword,
                }}
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
              />

              <CustomButton
                style={{ paddingVertical: 14 }}
                variant="primary"
                title="Reset Password"
                onPress={handleSubmit as any}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
              <View className="mt-4">
                <TouchableOpacity onPress={() => router.replace("/")}>
                  <Text className="text-center text-blue-500">Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
