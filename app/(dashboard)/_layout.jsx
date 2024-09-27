import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Player from "../../components/Player";

export default function _layout() {
  return (
    <View className="flex-1">
      <Player />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#282C75",
          tabBarInactiveTintColor: "black",
          tabBarShowLabel: false, // Hide the tab labels
          tabBarStyle: {
            backgroundColor: "white", // Background color of the tab bar
            borderTopWidth: 0, // Optional: removes the border top
          },
        }}
      >
        <Tabs.Screen
          name="MainDash"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Entypo name="home" size={focused ? 30 : 24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Seach"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome
                name="search"
                size={focused ? 30 : 24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Playlists"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <SimpleLineIcons
                name="playlist"
                size={focused ? 30 : 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="PartySession"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name="people" size={focused ? 30 : 24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
