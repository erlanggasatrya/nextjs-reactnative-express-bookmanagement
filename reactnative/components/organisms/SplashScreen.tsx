import { Image, SafeAreaView, View } from "react-native";

const SplashScreenComponent = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top-Left Corner Decoration */}
      <View className="absolute top-0 left-0 overflow-hidden">
        <Image
          source={require("../../assets/images/top-left.png")}
          style={{ width: 181, height: 181, top: -40 }}
          resizeMode="contain"
        />
      </View>

      {/* Top-Right Corner Decoration */}
      <View className="absolute top-0 right-0 overflow-hidden">
        <Image
          source={require("../../assets/images/top-right.png")}
          style={{ width: 120, height: 100, right: -40 }}
          resizeMode="contain"
        />
      </View>

      {/* Bottom-Right Corner Decoration */}
      <View className="absolute bottom-0 right-0 overflow-hidden">
        <Image
          source={require("../../assets/images/bottom-right.png")}
          style={{ width: 160, height: 160, bottom: -5 }}
          resizeMode="contain"
        />
      </View>

      {/* Bottom-Left Corner Decoration */}
      <View className="absolute bottom-0 left-0 overflow-hidden">
        <Image
          source={require("../../assets/images/bottom-left.png")}
          style={{ width: 120, height: 100, left: -40 }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 items-center justify-center min-h-screen">
        <Image
          source={require("../../assets/images/book-logo.png")}
          style={{ width: 180, height: 183 }}
          className="mb-4"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreenComponent;
