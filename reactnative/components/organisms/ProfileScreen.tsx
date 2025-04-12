import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import ProfileMenuItem from "../molecules/ProfileMenuItem";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";
import useAuthStore from "@/store/authStore";
import { env } from "@/configs/env.config";

const ProfileScreen: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  };

  const userProfile = `${env.BASE_URL}/${user?.profile?.replace(/\\/g, "/")}`;
  console.log(userProfile);

  return (
    <ScrollView className="flex-1 bg-white p-6 pt-16">
      {/* Profile Header */}
      <View className="flex-row items-center mb-8">
        <Image
          source={
            user?.profile
              ? { uri: userProfile }
              : require("../../assets/images/user-icon.png")
          }
          style={{ width: 100, height: 100 }}
          className="rounded-full"
        />
        <View className="ml-4">
          <Text className="text-xl text-[#32343E font-bold">
            {user?.name || "bootcamp13"}
          </Text>
          <Text className="text-[#A0A5BA] text-[12px]">
            {user?.phone_number || "081928"}
          </Text>
          <Text className="text-[#A0A5BA]">
            {user?.email || "bootcamp13@gmail.com"}
          </Text>
        </View>
      </View>

      {/* Profile Menu Items */}
      <View style={{gap: 32}}>
        {/* Edit Profile and Addresses */}
        <View>
          <ProfileMenuItem
            iconName="user"
            iconType="Feather"
            title="Edit Profile"
            onPress={() => router.push('/edit-profile')}
            iconColor="#FB6F3D"
            isFirst={true}
          />
          <View />
          <ProfileMenuItem
            iconName="map"
            iconType="Feather"
            title="Addresses"
            onPress={() => {}}
            iconColor="#413DFB"
            isLast={true}
          />
        </View>

        {/* Cart, Favourite, Notifications, Payment Method */}
        <View>
          <ProfileMenuItem
            iconName="shopping-bag"
            iconType="Feather"
            title="Cart"
            onPress={() => {}}
            iconColor="#369BFF"
            isFirst={true}
          />
          <View />
          <ProfileMenuItem
            iconName="heart"
            iconType="Feather"
            title="Favourite"
            onPress={() => {}}
            iconColor="#B33DFB"
          />
          <View />
          <ProfileMenuItem
            iconName="bell"
            iconType="Feather"
            title="Notifications"
            onPress={() => {}}
            iconColor="#FFAA2A"
          />
          <View />
          <ProfileMenuItem
            iconName="credit-card"
            iconType="Feather"
            title="Payment Method"
            onPress={() => {}}
            iconColor="#369BFF"
            isLast={true}
          />
        </View>

        {/* Log Out */}
        <View>
          <ProfileMenuItem
            iconName="log-out"
            iconType="Feather"
            title="Log Out"
            onPress={handleLogout}
            iconColor="#FB4A59"
            isFirst={true}
            isLast={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
