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
import { verifyOTPSchema } from "@/validation/validation";
import { verifyOTP } from "@/services/auth/api";
import { router, useLocalSearchParams } from "expo-router";

const VerifyOTPScreen: React.FC = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const initialValues = { otp: "" };

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
      const response = await verifyOTP(email, values.otp);
      if (response.status) {
        router.push({
          pathname: "/reset-password",
          params: { email: email, otp: values.otp },
        });
      } else {
        setFieldError("otp", response.message || "Invalid OTP.");
      }
    } catch (error: any) {
      setFieldError("otp", error.message || "An error occurred.");
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
          <Text className="text-[32px] font-bold text-center">Verify OTP</Text>
          <Text className="text-center text-gray-500 mt-2">
            Enter the OTP sent to {email}
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={verifyOTPSchema}
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
                label="OTP"
                name="otp"
                inputProps={{
                  placeholder: "Enter OTP",
                  onChangeText: handleChange("otp"),
                  onBlur: handleBlur("otp"),
                  value: values.otp,
                  keyboardType: "number-pad",
                }}
                touched={touched.otp}
                error={errors.otp}
              />

              <CustomButton
                style={{ paddingVertical: 14 }}
                variant="primary"
                title="Verify OTP"
                onPress={handleSubmit as any}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
              <View className="mt-4">
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-center text-blue-500">Back</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;
