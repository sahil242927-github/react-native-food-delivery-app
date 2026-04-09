import { Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link } from "expo-router";
import React from "react";
import { useUser } from "@/services/auth";

function SignIn() {
  //const { data: users } = useGetAllUsers();
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  console.log("Current User:", user);

  return (
    <View className="gap-10 bg-white rounted-lg p-5 mt-5">
      <CustomInput label="Email" placeholder="Enter your email" />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />
      <CustomButton title="Sign In" />

      <View>
        <Text className="text-center text-gray-500">
          Don't have an account?
        </Text>
        <Link
          href="/sign-up"
          style={{ backgroundColor: "transparent" }}
          className="text-center base-bold text-primary mt-2"
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
}

export default SignIn;
