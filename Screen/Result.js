import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function Result({ navigation }) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>Result</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Result;
