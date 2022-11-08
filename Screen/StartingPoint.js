import React from "react";
import { StyleSheet, Text, View } from "react-native";

function StartingPoint() {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>start</Text>
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

export default StartingPoint;
