import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import StartingPoint from "./StartingPoint";
import Filter from "./Filter";
const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Start" component={StartingPoint} />
      <Stack.Screen name="Filter" component={Filter} />
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

export default Main;
