import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router/build";
import axios from "axios";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passType, setPassType] = useState(true);

  const onSubmit = async () => {
    if (!emailRegex.test(email))
      ToastAndroid.show("Invalid Email address", ToastAndroid.SHORT);
    else if (password.length < 6)
      ToastAndroid.show(
        "Password must be Atleast 6 characters",
        ToastAndroid.SHORT
      );
    else {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/login`,
          {
            email,
            password,
          }
        );

        if (response.data.message === "Login successful") {
          //   ToastAndroid.show(response.data.message);
          SecureStore.setItemAsync("token", response.data.token);
          SecureStore.setItemAsync("name", response.data.name);
          router.push("(dashboard)/MainDash");
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.error || "An error occurred"; // Provide a fallback message
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 px-7 py-44 bg-secondary items-center justify-center">
      <View
        className="flex-1 rounded-xl   items-center justify-center w-full"
        style={{ elevation: 5 }}
      >
        <Text className="font-montSemi text-xl text-primary">Login</Text>
        <View className="flex w-full px-8 items-center justify-center">
          <View className="w-full ">
            <Text className="mb-1 text-lg font-montSemi">Email</Text>
            <TextInput
              className="border rounded px-1.5 py0.5 font-montSemi text-lg border-slate-900"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View className="w-full mt-3 ">
            <Text className="mb-1 text-lg font-montSemi">Password </Text>
            <View className="flex flex-row justify-between border px-1.5 items-center rounded">
              <TextInput
                className="py0.5 font-montSemi text-lg w-[90%]"
                onChangeText={SetPassword}
                secureTextEntry={passType}
                value={password}
              />
              <TouchableOpacity onPress={() => setPassType(!passType)}>
                <Feather
                  name={passType ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            className="bg-primary rounded-lg px-10 py-1 my-10"
          >
            <Text className="font-montSemi text-lg text-white">Submit</Text>
          </TouchableOpacity>
          <View className="flex-row">
            <Text className="font-montSemi">Dont Have an Account? </Text>
            <TouchableOpacity onPress={() => router.push("SignUp")}>
              <Text className="font-montSemi underline text-primary">
                Sign-up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
