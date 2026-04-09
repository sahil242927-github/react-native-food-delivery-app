import { Image, Text, View } from "react-native";
import { Redirect, Tabs } from "expo-router";

import React from "react";
import { cn } from "@/lib/clsx";
import { images } from "@/constants";
import useAuthStore from "@/app/store/auth.store";

type TabIconProps = {
  icon: any;
  title: string;
  focused: boolean;
};

const TabBarIcon = ({ icon, title, focused }: TabIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#fe8c00" : "#5d5f6d"}
    />
    <Text className={cn(focused ? "text-primary" : "text-gray-500 ")}>
      {title}
    </Text>
  </View>
);

function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 50,
          height: 80,
          marginHorizontal: 20,

          position: "absolute",
          bottom: 20,
          backgroundColor: "#fff",
          shadowColor: "#1a1a1a",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.5,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.search} focused={focused} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.bag} focused={focused} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.user} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
