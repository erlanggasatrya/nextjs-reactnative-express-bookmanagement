import EditProfileScreen from "@/components/organisms/EditProfileScreen";
import { Stack } from "expo-router";

const EditProfilePage = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditProfileScreen />
    </>
  );
};

export default EditProfilePage;
