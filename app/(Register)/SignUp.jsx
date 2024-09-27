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
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passType, setPassType] = useState(true);
  const [name, setName] = useState("");

  const onSubmit = async () => {
    if (!emailRegex.test(email))
      ToastAndroid.show("Invalid Email Address", ToastAndroid.SHORT);
    else if (name.length < 4)
      ToastAndroid.show(
        "Display Name must be ateast 4 character",
        ToastAndroid.SHORT
      );
    else if (password.length < 4)
      ToastAndroid.show(
        "Password must be atleast 4 characters",
        ToastAndroid.SHORT
      );
    else if (password !== confirmPass) {
      ToastAndroid.show("Passwords Do Not Match!", ToastAndroid.SHORT);
    } else {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/auth/create-account`,
          {
            email,
            password,
            displayName: name,
          }
        );

        if (response.data.message === "Account created successfully") {
          SecureStore.setItemAsync("token", response.data.token);
          SecureStore.setItemAsync("name", response.data.name);
          router.push("(dashboard)/MainDash");
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show(error?.response?.data.error, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 px-7 py-36 bg-secondary items-center justify-center">
      <View
        className="flex-1 rounded-xl   items-center justify-center w-full"
        style={{ elevation: 5 }}
      >
        <Text className="font-montSemi text-xl text-primary">Sign-Up</Text>
        <View className="flex w-full px-8 items-center justify-center">
          <View className="w-full mt-3 ">
            <Text className="mb-1 text-lg font-montSemi">Display Name</Text>

            <TextInput
              className="py-0.5 font-montSemi text-lg border rounded px-1.5"
              onChangeText={setName}
              value={name}
            />
          </View>
          <View className="w-full ">
            <Text className="mb-1 text-lg font-montSemi">Email</Text>
            <TextInput
              className="border rounded px-1.5 py-0.5 font-montSemi text-lg border-slate-900"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View className="w-full">
            <Text className="mb-1 text-lg font-montSemi">Password </Text>
            <View className="flex flex-row justify-between border px-1.5 items-center rounded">
              <TextInput
                className="py-0.5 w-[90%] font-montSemi text-lg border-slate-900"
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
          <View className="w-full ">
            <Text className="mb-1 text-lg font-montSemi">Confirm Password</Text>

            <TextInput
              className="py-0.5 font-montSemi px-1.5 w-full border rounded text-lg border-slate-900"
              onChangeText={setConfirmPass}
              secureTextEntry={passType}
              value={confirmPass}
            />
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            className="bg-primary rounded-lg px-10 py-1 my-4"
          >
            <Text className="font-montSemi text-lg text-white">Submit</Text>
          </TouchableOpacity>
          <View className="flex-row">
            <Text className="font-montSemi">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("Login")}>
              <Text className="font-montSemi underline text-primary">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
