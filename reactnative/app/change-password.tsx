import ChangePasswordScreen from "@/components/organisms/ChangePasswordScreen";
import { Stack } from "expo-router";

const ChangePasswordPage = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChangePasswordScreen />
    </>
  );
};

export default ChangePasswordPage;
