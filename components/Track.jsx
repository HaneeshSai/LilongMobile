import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import useStore from "../app/utils/store";
import { Buffer } from "buffer";

export default function Track({ e }) {
  const {
    isLoading,
    setIsLoading,
    sound,
    setSound,
    setNowPlaying,
    isPlaying,
    setIsplaying,
  } = useStore();

  const handlePlay = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        // // Fetch audio track
        // const response = await axios.post(
        //   `${process.env.EXPO_PUBLIC_SERVER_URL}/tracks/get-track`,
        //   {
        //     name: e.track.name,
        //     artist: e.track.artists[0].name,
        //     year: e.track.album.release_date,
        //     img: e.track.album.images[0].url,
        //   },
        //   { responseType: "arraybuffer" } // Fetch the response as an arraybuffer
        // );

        // // Convert the arraybuffer to Base64 string
        // const base64Audio = Buffer.from(response.data, "binary").toString(
        //   "base64"
        // );

        // // Generate a local file path for the audio
        const audioFileUri = `${FileSystem.documentDirectory}audio.mp3`;

        // Stop and unload the current sound if it exists
        if (sound) {
          await sound.stopAsync(); // Stop the currently playing sound
          await sound.unloadAsync(); // Unload the current sound
          setSound(null); // Clear the sound state
        }

        // Write the base64 string to the file system
        // await FileSystem.writeAsStringAsync(audioFileUri, base64Audio, {
        //   encoding: FileSystem.EncodingType.Base64, // Indicate Base64 encoding
        // });

        // Load the audio file and play it
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audioFileUri,
        });
        setSound(newSound);

        await newSound.playAsync();
        setIsplaying(true);
        setNowPlaying({
          img: e.track.album.images[0].url,
          name: e.track.name,
          artist: e.track.artists[0].name,
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
    <View className="w-1/2 p-3">
      <TouchableOpacity onPress={handlePlay}>
        <Image
          className="w-full h-32 rounded" // Use full width of the container
          source={{ uri: e.track.album.images[0].url }}
          resizeMode="contain" // Use resizeMode to prevent distortion
        />
      </TouchableOpacity>

      <Text className="font-montReg text-center">{e.track?.name}</Text>
    </View>
  );
}
