import SplashScreenComponent from "@/components/organisms/SplashScreen";
import {Stack } from "expo-router";

const SplashTest = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SplashScreenComponent />
    </>
  );
};

export default SplashTest;
