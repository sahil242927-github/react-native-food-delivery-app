import "@/styles/global.css";

import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images, offers } from "@/constants";

import CartButton from "@/components/CartButton";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/clsx";

const Header = () => (
  <View className="flex-between flex-row w-full my-5 px-5">
    <View className="flex-start">
      <Text className="small-bold text-primary">Special Offers</Text>
      <TouchableOpacity className="flex-center flex-row ml-0.5 gap-x-1">
        <Text className="paragraph-bold text-dark-100">Special Offers</Text>
        <Image
          source={images.arrowDown}
          className="size-3"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
    <CartButton />
  </View>
);

export default function Index() {
  return (
    <SafeAreaView className="flex-1 ">
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isEven = item.id % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn("offer-card", {
                  "flex-row-reverse": !isEven,
                  "flex-row": isEven,
                })}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff22" }}
              >
                {({ pressed }) => (
                  <React.Fragment>
                    <View className={"h-full w-1/2"}>
                      <Image
                        source={item.image}
                        className={"size-full"}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info ",
                        isEven ? "mr-10" : "ml-10",
                      )}
                    >
                      <Text
                        style={{ opacity: pressed ? 0.5 : 1 }}
                        className="h1-bold text-white leading-tight"
                      >
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10 mt-4"
                        resizeMode="contain"
                        tintColor="#fff"
                      />
                    </View>
                  </React.Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="px-5 pb-28"
        ListHeaderComponent={Header}
      />
    </SafeAreaView>
  );
}
