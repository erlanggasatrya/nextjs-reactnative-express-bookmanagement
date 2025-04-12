import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import FormField from "@/components/molecules/FormField";
import CustomButton from "@/components/atoms/CustomButton";
import { editProfileSchema, editEmailSchema } from "@/validation/validation";
import { editUser, editEmail, getUserDetails } from "@/services/auth/api"; 
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useAuthStore from "@/store/authStore";
import { env } from "@/configs/env.config";

const EditProfileScreen: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    phoneNumber: "",
    profile: "",
    email: "", 
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const getUser = useAuthStore((state) => state.getUser);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setInitialValues({
          name: user.name || "",
          phoneNumber: user.phone_number || "",
          profile: user.profile || "",
          email: user.email || "",
        });
        setImage(
          user.profile
            ? `${env.BASE_URL}/${user.profile.replace(/\\/g, "/")}`
            : null
        );
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone_number", values.phoneNumber);

      if (image) {
        const localUri = image;
        const filename = localUri.split("/").pop() || "profile.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("profile", {
          uri: localUri,
          name: filename,
          type,
        } as any);
      }

      const profileResponse = await editUser(formData);
      if (!profileResponse.status) {
        setFieldError(
          "name",
          profileResponse.message || "Failed to update profile."
        );
        return; 
      }

      if (values.email !== user?.email) {
        const emailResponse = await editEmail({ email: values.email });
        if (!emailResponse.status) {
          setFieldError(
            "email",
            emailResponse.message || "Failed to update email."
          );
          return; 
        }
      }

      await getUser();
      router.replace("/(tabs)/profile");
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Edit profile error:", error);
      setFieldError("name", error.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View className="flex-1 justify-center px-6 min-h-screen">
          <View className="items-center mb-8 mt-10">
            <Text className="text-[32px] font-bold text-center">
              Edit Profile
            </Text>
          </View>

          <TouchableOpacity onPress={pickImage} className="items-center mb-8">
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../assets/images/user-icon.png")
              }
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text className="text-blue-500 mt-2">Change Profile Picture</Text>
          </TouchableOpacity>

          <Formik
            initialValues={initialValues}
            validationSchema={editProfileSchema} 
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
                  title="Save Changes"
                  onPress={handleSubmit as any}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
                <View className="mt-4">
                  <TouchableOpacity
                    onPress={() => router.push("/change-password")}
                  >
                    <Text className="text-center text-blue-500">
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </View>
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

export default EditProfileScreen;
