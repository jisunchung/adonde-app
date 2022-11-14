import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";

function Result({ navigation }) {
  const apiTest = async () => {
    try {
      const response = await axios.get(
        "https://adonde-kr.herokuapp.com/city/findAll",
        {}
      );
      //   console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  };
  useEffect(() => {
    apiTest();
  });
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
