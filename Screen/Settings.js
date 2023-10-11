import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingMain from "./SettingMain";
import About from "./About";

function Settings() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="설정"
        component={SettingMain}
        options={{
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen name="About" component={About} />
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

export default Settings;
