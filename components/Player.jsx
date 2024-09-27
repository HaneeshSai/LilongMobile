import { View, Text, Image } from "react-native";
import React from "react";
import useStore from "../app/utils/store";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router/build";

export default function Player() {
  const { nowPlaying, sound, isPlaying, setIsplaying } = useStore();
  return (
    <View className="absolute w-full px-2 z-10 bottom-14">
      <View className="p-1 bg-white rounded" style={{ elevation: 7 }}>
        {nowPlaying ? (
          <View className="items-center w-full flex-row">
            <TouchableOpacity
              onPress={async () => {
                console.log(isPlaying);
                if (isPlaying) {
                  sound.pauseAsync();
                  setIsplaying(false);
                } else {
                  sound.playAsync();
                  setIsplaying(true);
                }
              }}
            >
              <Image
                source={{
                  uri: nowPlaying.img,
                }}
                className="w-12 rounded m-[2px] h-12"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("(extra)/TrackPage")}
              className="ml-2"
            >
              <Text
                numberOfLines={1}
                className="font-montSemi w-[90%] text-lg text-primary"
              >
                {nowPlaying.name}
              </Text>
              <Text numberOfLines={1} className="text-[11px] font-montSemi">
                {nowPlaying.artist}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-center my-4 font-montSemi ">
            No Recent Plays
          </Text>
        )}
      </View>
    </View>
  );
}
