import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";

function Filter({ navigation }) {
  return (
    <View>
      <Text>filter</Text>
      <Button title="submit" onPress={() => navigation.navigate("Result")} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default Filter;
