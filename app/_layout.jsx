import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import Loading from "../components/Loading";

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while fonts are loading

export default function Layout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
    "Montserrat-Regular": require("../assets/fonts/mont/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/mont/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/mont/Montserrat-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Don't render anything until fonts are loaded
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Loading />
      <Stack
        screenOptions={{
          headerShown: false, // Adjust this based on your design needs
        }}
      />
    </View>
  );
}
