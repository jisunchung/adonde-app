import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
  TurboModuleRegistry,
} from "react-native";
import { useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import Slider from "@react-native-community/slider";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Filter({ navigation }) {
  const route = useRoute();
  const [theme, setTheme] = useState([]);
  const [population, setPopulation] = useState(0);
  const [distance, setDistance] = useState(0);

  const themeItems = [
    { key: "1", value: "산" },
    { key: "2", value: "계곡" },
    { key: "3", value: "바다" },
    { key: "4", value: "강" },
  ];

  const navPush = () => {
    //Result페이지로 result값을 넘겨준다

    navigation.push("Result", {
      FilterValue: {
        origin: route.params.origin,
        theme: theme,
        population: [0, population],
        distance: distance,
        access: [],
      },
    });
  };

  useEffect(() => {
    //filter 데이터를 처리해준다
    //테마 ? [] : ""
    if (theme.length == 0) {
      setTheme("");
    }

    //거리 == 0 ? "" : 거리값(int)
    if (distance == 0) {
      setDistance("");
    }
  }, [theme, distance]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.box}>
          <View style={styles.filter_type_box}>
            <Text style={styles.filter_type_text}>
              <FontAwesome5 name="map" size={24} color="black" /> 테마
            </Text>
            <MultipleSelectList
              placeholder="테마를 골라주세요"
              setSelected={(val) => setTheme(val)}
              data={themeItems}
              save="value"
              // onSelect={() => alert(selected)}
              label="테마"
            />
            {/* <Text>{theme}</Text> */}
          </View>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.filter_type_box}>
            <Text style={styles.filter_type_text}>
              <FontAwesome5 name="users" size={24} color="black" /> 인구수
            </Text>

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
            {population == 0 ? null : <Text>~ {population}(명)</Text>}
          </View>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.filter_type_box}>
            <Text style={styles.filter_type_text}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={24}
                color="black"
              />{" "}
              거리
            </Text>
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
            {distance == 0 ? null : <Text>~ {distance}(km)</Text>}
          </View>
        </View>
      </ScrollView>
      <View style={styles.submit_btn}>
        <Button
          textColor="#FFFFFF"
          buttonColor="#44AD5E"
          mode="contained-tonal"
          onPress={() => navPush()}
        >
          Subtmit
        </Button>
      </View>
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
  filter_type_text: {
    // alignSelf: "center",
    fontSize: 15,
    marginBottom: 10,
  },
  filter_type_box: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    // backgroundColor: "yellow",
  },
  box: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#CEF6CE",
    borderRadius: 20,
    margin: 20,
  },
  slider: {
    width: screenWidth - 80,
  },
  submit_btn: {
    alignSelf: "center",
    width: 200,
    margin: 40,
    // position: "absolute",
    // left: 20,
    // right: 20,
    // bottom: 20,
  },
});

export default Filter;
