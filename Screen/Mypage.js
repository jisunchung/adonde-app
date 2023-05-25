import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SimpleCard from "../component/SimpleCard";
import Detail from "./Details";
import MypageMain from "./MypageMain";
import Login from "./Login";

function Mypage() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="마이페이지" component={MypageMain} />
      <Stack.Screen name="mypage_detail" component={Detail} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Mypage;
