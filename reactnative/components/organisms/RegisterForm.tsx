import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Formik } from "formik";

import FormField from "../molecules/FormField";
import CustomButton from "../atoms/CustomButton";
import { registerSchema } from "@/validation/validation";
import { router } from "expo-router";
import useAuthStore from "@/store/authStore";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const register = useAuthStore((state) => state.register);
  const initialValues = {
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("phone_number", values.phoneNumber);
      formData.append("password", values.password);

      await register(formData);
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.status === false) {
        if (error.message.includes("Email")) {
          setFieldError("email", error.message);
        } else {
          setFieldError("phoneNumber", error.message);
        }
      } else {
        alert("An error occurred during registration.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 justify-center px-6 mb-10">
        <View className="items-center mb-8 mt-20">
          <Image
            source={require("../../assets/images/book-logo.png")}
            style={{ width: 79, height: 80 }}
            className="mb-4"
          />
          <Text className="text-[32px] font-bold text-center">
            Create Account
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
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
                label="E-mail"
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
                label="Name"
                name="name"
                inputProps={{
                  placeholder: "Your name",
                  onChangeText: handleChange("name"),
                  onBlur: handleBlur("name"),
                  value: values.name,
                  autoCapitalize: "words",
                }}
                touched={touched.name}
                error={errors.name}
              />
              <FormField
                label="Phone Number"
                name="phoneNumber"
                inputProps={{
                  placeholder: "Your phone number",
                  onChangeText: handleChange("phoneNumber"),
                  onBlur: handleBlur("phoneNumber"),
                  value: values.phoneNumber,
                  keyboardType: "phone-pad",
                }}
                touched={touched.phoneNumber}
                error={errors.phoneNumber}
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
                title="Sign Up"
                onPress={handleSubmit as any}
                loading={isSubmitting}
                disabled={isSubmitting}
              />

              <View className="mt-6 flex-row justify-center">
                <Text className="text-[#101010] font-medium">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={onSwitchToLogin}>
                  <Text className="text-[#845A87] font-semibold">Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
