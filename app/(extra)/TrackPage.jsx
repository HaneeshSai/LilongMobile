import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import useStore from "../utils/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TrackPage() {
  const { setIsLoading, nowPlaying, sound, isPlaying, setIsplaying } =
    useStore();
  const [value, setValue] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const getAudioStatus = async () => {
      const status = await sound.getStatusAsync();
      setDuration(status.durationMillis);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      });

      return sound;
    };

    getAudioStatus();
  }, [isPlaying, sound, position]);

  const seekTo = async (value) => {
    await sound.setPositionAsync(value);
  };

  function formatMilliseconds(ms) {
    const totalSeconds = Math.floor(ms / 1000); // Convert milliseconds to seconds
    const minutes = Math.floor(totalSeconds / 60); // Calculate minutes
    const seconds = totalSeconds % 60; // Calculate remaining seconds

    // Format minutes and seconds with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`; // Return formatted string
  }

  const addToPlayList = async () => {};

  return (
    <View className="bg-secondary py-10 h-full px-5">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="#282C75" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6 name="add" size={24} color="#282C75" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center pt-5 my-2">
        <Image
          source={{ uri: nowPlaying.img }}
          className="w-[270px] h-[270px] rounded"
        />
        <View className="w-full mt-2">
          <Text numberOfLines={1} className="text-xl text-center font-montSemi">
            {nowPlaying.name}
          </Text>
          <Text className="font-montSemi text-[15px] text-center">
            {nowPlaying.artist}
          </Text>
        </View>

        <View className="w-full flex-1 items-center">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={seekTo}
            minimumTrackTintColor="#282C75" // Spotify green for the minimum track
            maximumTrackTintColor="#000000" // Black for the maximum track
            thumbTintColor="#282C75" // Spotify green for the thumb
          />
          <View className="flex-row -mt-2 justify-between w-[90%] ">
            <Text className="font-montSemi text-[12px]">
              {formatMilliseconds(position)}
            </Text>
            <Text className="font-montSemi text-[12px]">
              {formatMilliseconds(duration)}
            </Text>
          </View>
          <View className="mt-2 flex-row w-[90%] justify-evenly items-center">
            <TouchableOpacity>
              <Entypo
                name="controller-jump-to-start"
                size={32}
                color="#282C75"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 bg-primary rounded-full"
              onPress={async () => {
                if (isPlaying) {
                  setIsplaying(false);
                  await sound.pauseAsync();
                } else {
                  setIsplaying(true);
                  await sound.playAsync();
                }
              }}
            >
              <Entypo
                name={isPlaying ? "controller-paus" : "controller-play"}
                style={{ left: !isPlaying ? 1.5 : 0 }}
                size={24}
                color="#E8E8E9"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="controller-next" size={32} color="#282C75" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
