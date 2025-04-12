import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import BookIcon from "@/assets/images/svg/BookIcon";
import MyBookIcon from "@/assets/images/svg/MyBookIcon";
import ProfileIcon from "@/assets/images/svg/ProfileIcon";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#36338D",
        tabBarStyle: {
          paddingVertical: 8,
          height: 56,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Books",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <BookIcon fill={color} height={16} width={16} />
          ),
        }}
      />

      <Tabs.Screen
        name="mybooks"
        options={{
          title: "My Books",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MyBookIcon fill={color} height={16} width={16} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <ProfileIcon fill={color} height={16} width={16} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
