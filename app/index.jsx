// app/home.js
import { router } from "expo-router/build";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-secondary items-center justify-center">
      <Text className="text-4xl text-primary font-montBold">LiLong</Text>
      <Text className="font-montSemi ">Where Music Connects</Text>
      <View>
        <Image
          source={require("../assets/mainImg.png")}
          className="h-[300] w-[300]"
        />
      </View>
      <TouchableOpacity
        onPress={async () => {
          const token = await SecureStore.getItemAsync("token");
          if (token) {
            router.push("(dashboard)/MainDash");
          } else {
            router.push("(Register)/Login");
          }
        }}
        className="mt-12 bg-primary rounded-lg px-10 py-1"
      >
        <Text className="text-white font-montSemi text-lg">Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
