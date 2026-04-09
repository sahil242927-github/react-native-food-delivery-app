import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Redirect, Slot } from "expo-router";

import React from "react";
import { images } from "@/constants";
import useAuthStore from "@/app/store/auth.store";

function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    // This will keep the input fields visible when the keyboard is open on both iOS and Android.
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* keyboardShouldPersistTaps => Tapping outside the keyboard will dismiss the keyboard entirely */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="bg-white h-full"
      >
        <View
          className="w-full relative bg-white"
          style={{ height: Dimensions.get("screen").height / 2.5 }}
        >
          <Image
            source={images.loginGraphic}
            className="size-full"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-12 z-10"
            resizeMode="stretch"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthLayout;
