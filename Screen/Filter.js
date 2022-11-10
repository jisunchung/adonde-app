import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import Slider from "@react-native-community/slider";

function Filter({ navigation }) {
  const [theme, setTheme] = useState([]);
  const [population, setPopulation] = useState(0);
  const [distance, setDistance] = useState(0);
  const [access, setAccess] = useState([]);
  const themeItems = [
    { key: "1", value: "산" },
    { key: "2", value: "계곡" },
    { key: "3", value: "바다" },
    { key: "4", value: "강" },
  ];
  const accessItems = [
    { key: "1", value: "직통 고속버스" },
    { key: "2", value: "직통 시외버스" },
    { key: "3", value: "직통 기차" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.box}>
          <Text>테마</Text>
          <MultipleSelectList
            setSelected={(val) => setTheme(val)}
            data={themeItems}
            save="value"
            // onSelect={() => alert(selected)}
            label="테마"
          />
          <Text>{theme}</Text>
          <Text>인구수</Text>
          <Slider
            style={styles.slider}
            value={population}
            onValueChange={(val) => setPopulation(val)}
            minimumValue={0}
            maximumValue={1000}
            minimumTrackTintColor="#44AD5E"
            maximumTrackTintColor="#FFFFFF"
            step={1}
          />
          <Text>{population} ~ 1000</Text>
          <Text>거리</Text>
          <Slider
            style={styles.slider}
            value={distance}
            onValueChange={(val) => setDistance(val)}
            minimumValue={0}
            maximumValue={500}
            minimumTrackTintColor="#44AD5E"
            maximumTrackTintColor="#FFFFFF"
            step={10}
          />
          <Text>{distance}km</Text>
          <Text>접근성</Text>
          <MultipleSelectList
            setSelected={(val) => setAccess(val)}
            data={accessItems}
            save="value"
            // onSelect={() => alert(selected)}
            label="접근성"
          />
          <Text>{access}</Text>
          <Button
            title="submit"
            onPress={() => navigation.navigate("Result")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: "pink",
  },
  box: {
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  slider: {
    width: screenWidth - 40,
  },
});

export default Filter;
