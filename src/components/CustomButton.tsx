import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { cn } from "@/lib/clsx";

interface CustomButtonProps {
  title?: string;
  label?: string;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

function CustomButton({
  title = "Click Me",
  label,
  onPress,
  style,
  textStyle,
  leftIcon,
  isLoading,
}: CustomButtonProps) {
  return (
    <TouchableOpacity className={cn("custom-btn", style)} onPress={onPress}>
      {leftIcon}
      <View className={cn("flex-center flex-row", isLoading && "opacity-50")}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default CustomButton;
