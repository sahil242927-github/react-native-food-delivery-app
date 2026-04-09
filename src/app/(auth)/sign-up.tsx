import * as z from "zod";

import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import CustomButton from "@/components/CustomButton"; // Path to your button
import CustomInput from "@/components/CustomInput";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSignUp } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Minimum 8 characters required" })
  .regex(/[A-Z]/, { message: "Include at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Include at least one lowercase letter" })
  .regex(/\d/, { message: "Include at least one number" }) // Using \d shorthand
  .regex(/[@$!%*?&]/, { message: "Include at least one special character" });

const signUpSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name is required (min 2 characters)",
  }),
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: passwordSchema,
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    mutate: signup,
    isPending: isSigningUp,
    error: signUpError,
  } = useSignUp();

  const onSubmit = async (data: SignUpFormData) => {
    signup({ email: data.email, password: data.password, name: data.fullName });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full py-2 flex-center">
        {signUpError && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {signUpError.message}
          </Text>
        )}
      </View>

      <ScrollView
        contentContainerClassName="px-6 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Text className="h1-bold text-dark-100 mb-2">Create Account</Text>
        <Text className="paragraph-medium text-black-100 mb-8">
          Enter your details to join Kashrid Nexus.
        </Text>

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Full Name"
              placeholder="Sahil Khan"
              onChangeText={onChange}
              value={value}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Email Address"
              placeholder="sahil@example.com"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        {/* Updated Action Button using your CustomButton */}
        <CustomButton
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSigningUp || isSubmitting}
        />

        <View className="mt-8 flex-row justify-center">
          <Text className="body-medium text-black-100">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text className="body-medium text-primary font-quicksand-bold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
