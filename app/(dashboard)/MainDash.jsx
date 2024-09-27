import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useStore from "../utils/store";
import Track from "../../components/Track";

export default function MainDash() {
  const [name, setName] = useState("");
  const { setIsLoading } = useStore();
  const [popularTracks, setPopularTracks] = useState([]);
  useEffect(() => {
    getName();
    getPopularSongs();
  }, []);

  const getName = async () => {
    const Getname = await SecureStorage.getItemAsync("name");
    if (Getname) {
      setName(Getname);
    }
  };

  const getPopularSongs = async () => {
    setIsLoading(true);
    if (await AsyncStorage.getItem("popularTracks")) {
      setPopularTracks(JSON.parse(await AsyncStorage.getItem("popularTracks")));
    } else {
      await AsyncStorage.removeItem("popularTracks");
      try {
        const Popular = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/api/spotify/popularTracks`
        );
        setPopularTracks(Popular.data.items);
        await AsyncStorage.setItem(
          "popularTracks",
          JSON.stringify(Popular?.data.items)
        );
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView className="bg-secondary h-full pt-10 px-2">
      <View className="px-3">
        <Text className="text-xl font-montSemi">Welcome {name}</Text>
        <Text className="font-montSemi text-primary mt-3 text-2xl">
          Popular Tracks
        </Text>
      </View>

      <ScrollView className="mb-16">
        <View className="flex flex-wrap flex-row">
          {popularTracks.map((e, i) => (
            <Track key={i} e={e} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
