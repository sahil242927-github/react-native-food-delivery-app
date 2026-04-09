import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { cn } from "@/lib/clsx";

interface CustomInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  error?: string; // Added error prop
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

function CustomInput({
  placeholder = "Enter text",
  label,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  value,
  error, // Destructured error
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-4">
      {label && <Text className="label mb-2">{label}</Text>}

      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#888"
        className={cn(
          "input",
          // Focus state vs Error state vs Default state
          isFocused ? "border-primary" : "border-gray-300",
          error && "border-danger",
        )}
      />

      {/* Conditional Error Message */}
      {error && (
        <Text className="text-danger small-bold mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
}

export default CustomInput;
