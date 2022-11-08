import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function Home({ navigation }) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>home</Text>
      <Button title="go start " onPress={() => navigation.navigate("Start")} />
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

export default Home;
