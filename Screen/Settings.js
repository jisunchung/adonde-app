import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Settings() {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>settingScreen</Text>
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

export default Settings;
