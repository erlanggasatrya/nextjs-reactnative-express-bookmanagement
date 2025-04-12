import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import FormField from "@/components/molecules/FormField";
import CustomButton from "@/components/atoms/CustomButton";
import { changePasswordSchema } from "@/validation/validation";
import { changePassword } from "@/services/auth/api";
import { router } from "expo-router";
import useAuthStore from "@/store/authStore";

const ChangePasswordScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

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
    setLoading(true);
    try {
      const response = await changePassword(values);
      if (response.status) {
        router.back(); 
        alert("Password changed successfully!");
      } else {
        setFieldError(
          "currentPassword",
          response.message || "Failed to change password."
        );
      }
    } catch (error: any) {
      console.error("Change password error:", error);
      setFieldError("currentPassword", error.message || "An error occurred.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View className="flex-1 justify-center px-6 min-h-screen">
          <View className="items-center mb-8 mt-10">
            <Text className="text-[32px] font-bold text-center">
              Change Password
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
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
                  label="Current Password"
                  name="currentPassword"
                  inputProps={{
                    placeholder: "Your current password",
                    onChangeText: handleChange("currentPassword"),
                    onBlur: handleBlur("currentPassword"),
                    value: values.currentPassword,
                    secureTextEntry: true,
                  }}
                  touched={touched.currentPassword}
                  error={errors.currentPassword}
                />
                <FormField
                  label="New Password"
                  name="newPassword"
                  inputProps={{
                    placeholder: "Your new password",
                    onChangeText: handleChange("newPassword"),
                    onBlur: handleBlur("newPassword"),
                    value: values.newPassword,
                    secureTextEntry: true,
                  }}
                  touched={touched.newPassword}
                  error={errors.newPassword}
                />
                <FormField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  inputProps={{
                    placeholder: "Confirm your new password",
                    onChangeText: handleChange("confirmNewPassword"),
                    onBlur: handleBlur("confirmNewPassword"),
                    value: values.confirmNewPassword,
                    secureTextEntry: true,
                  }}
                  touched={touched.confirmNewPassword}
                  error={errors.confirmNewPassword}
                />

                <CustomButton
                  style={{ paddingVertical: 14 }}
                  variant="primary"
                  title="Change Password"
                  onPress={handleSubmit as any}
                  loading={isSubmitting || loading}
                  disabled={isSubmitting || loading}
                />
                <View className="mt-4">
                  <TouchableOpacity onPress={() => router.back()}>
                    <Text className="text-center text-blue-500">
                      Back to Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
