import { Icon } from "@/components/atoms/Icon";
import LoginForm from "@/components/organisms/LoginForm";
import RegisterForm from "@/components/organisms/RegisterForm";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const switchToRegister = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Back Button */}
      {!showLogin && (
        <TouchableOpacity
          className="absolute top-14 left-4 z-10 bg-[#101010] px-4 py-2 border rounded-[40px]"
          onPress={switchToLogin}
        >
          <View className="flex-row items-center">
            <Icon
              name="arrow-back"
              type="MaterialIcons"
              size={14}
              color="#FFFFFF"
            />
            <Text className="ml-2 text-[#FFFFFF] text-sm">Back</Text>
          </View>
        </TouchableOpacity>
      )}

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

      {showLogin ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </SafeAreaView>
  );
};

export default App;
