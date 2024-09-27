import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import useStore from "../utils/store";
import { Buffer } from "buffer";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function Seach() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchResults = async (query) => {
    if (query.length < 2) return; // Avoid unnecessary calls if input is empty
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/spotify/search?query=${query}`
      );
      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedFetchResults = debounce(fetchResults, 300);

  const handleChange = (text) => {
    setQuery(text);
    debouncedFetchResults(text);
  };

  const {
    isLoading,
    setIsLoading,
    sound,
    setSound,
    setNowPlaying,
    isPlaying,
    setIsplaying,
  } = useStore();

  const handlePlay = async (e) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        // Fetch audio track
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/tracks/get-track`,
          {
            name: e.name,
            artist: e.artists[0].name,
            year: e.album.release_date,
            img: e.album.images[0].url,
          },
          { responseType: "arraybuffer" } // Fetch the response as an arraybuffer
        );

        // Convert the arraybuffer to Base64 string
        const base64Audio = Buffer.from(response.data, "binary").toString(
          "base64"
        );

        if (sound) {
          setIsplaying(false);
          await sound.stopAsync(); // Stop the currently playing sound
          await sound.unloadAsync(); // Unload the current sound
          setSound(null); // Clear the sound state
        }
        const audioFileUri = `${FileSystem.documentDirectory}audio.mp3`;

        await FileSystem.writeAsStringAsync(audioFileUri, base64Audio, {
          encoding: FileSystem.EncodingType.Base64, // Indicate Base64 encoding
        });

        // Load the audio file and play it
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audioFileUri,
        });
        setSound(newSound);

        await newSound.playAsync();
        setIsplaying(true);
        setNowPlaying({
          img: e.album.images[0].url,
          name: e.name,
          artist: e.artists[0].name,
        });
      } catch (error) {
        console.error("Error fetching and playing audio:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please wait until the song finishes loading.");
    }
  };

  // Clean up sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View className="pt-10 h-full bg-secondary px-5">
      <Text className="font-montSemi text-lg text-primary">
        Search For your Desired Song
      </Text>
      <View className="border-0.5 rounded px-1 py-0.5 flex-row justify-between items-center top-5 bg-white mx-2">
        <TextInput
          value={query}
          onChangeText={handleChange}
          className="font-montSemi text-xl w-[90%]"
        />
        <Feather name="search" size={24} color="#282C75" />
      </View>

      <ScrollView className="mb-16 mt-8">
        <View className="flex flex-wrap flex-row">
          {searchResults.map((e, i) => (
            <View key={i} className="w-1/2 p-3">
              <TouchableOpacity onPress={() => handlePlay(e)}>
                <Image
                  className="w-full h-32" // Use full width of the container
                  source={{ uri: e.album.images[0].url }}
                  resizeMode="contain" // Use resizeMode to prevent distortion
                />
              </TouchableOpacity>

              <Text className="font-montReg text-center" numberOfLines={2}>
                {e?.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
