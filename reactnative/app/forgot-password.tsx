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
import { forgotPasswordSchema } from "@/validation/validation";
import { forgotPassword } from "@/services/auth/api"; 
import { router } from "expo-router";

const ForgotPasswordScreen: React.FC = () => {
  const initialValues = { email: "" };

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
      const response = await forgotPassword(values.email);
      if (response.status) {
        router.push({
          pathname: "/verify-otp",
          params: { email: values.email },
        });
      } else {
        setFieldError(
          "email",
          response.message || "Failed to request password reset."
        );
      }
    } catch (error: any) {
      setFieldError("email", error.message || "An error occurred.");
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
            Forgot Password
          </Text>
          <Text className="text-center text-gray-500 mt-2">
            Enter your email to reset your password.
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
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
                label="Email"
                name="email"
                inputProps={{
                  placeholder: "Your email",
                  onChangeText: handleChange("email"),
                  onBlur: handleBlur("email"),
                  value: values.email,
                  keyboardType: "email-address",
                  autoCapitalize: "none",
                }}
                touched={touched.email}
                error={errors.email}
              />

              <CustomButton
                style={{ paddingVertical: 14 }}
                variant="primary"
                title="Send OTP"
                onPress={handleSubmit as any}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
              <View className="mt-4">
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-center text-blue-500">
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
