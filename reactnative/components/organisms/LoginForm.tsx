import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import { loginSchema } from "../../validation/validation";
import FormField from "../molecules/FormField";
import CustomButton from "../atoms/CustomButton";
import Container from "../organisms/Container";
import { router } from "expo-router";
import useAuthStore from "@/store/authStore";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const login = useAuthStore((state) => state.login);
  const initialValues = { email: "", password: "" };

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
      await login(values);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.status === false) {
        setFieldError("email", error.message);
        setFieldError("password", error.message);
      } else {
        alert("An error occurred during login.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 min-h-screen">
      <View className="items-center mb-8">
        <Image
          source={require("../../assets/images/book-logo.png")}
          style={{ width: 79, height: 80 }}
          className="mb-4"
        />
        <Text className="text-[32px] font-bold text-center">
          Sign in to your
        </Text>
        <Text className="text-[32px] font-bold text-center">Account</Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
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
            <FormField
              label="Password"
              name="password"
              isPassword={true}
              inputProps={{
                placeholder: "Password",
                onChangeText: handleChange("password"),
                onBlur: handleBlur("password"),
                value: values.password,
              }}
              touched={touched.password}
              error={errors.password}
            />

            <TouchableOpacity
              className="mb-6 "
              onPress={() => router.push("/forgot-password")}
            >
              <Text className="text-[#101010] text-xs font-medium text-center underline underline-offset-1">
                Forgot Your Password?
              </Text>
            </TouchableOpacity>

            <CustomButton
              style={{ paddingVertical: 14 }}
              variant="primary"
              title="Log In"
              onPress={handleSubmit as any}
              loading={isSubmitting}
              disabled={isSubmitting}
            />

            <View className="mt-6 flex-row justify-center">
              <Text className="text-[#101010] font-medium">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={onSwitchToRegister}>
                <Text className="text-[#845A87] font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
