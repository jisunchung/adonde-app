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
  Image,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
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

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [region, setRegion] = useState({
    latitude: route.params.lat,
    longitude: route.params.long,
  });
  const [mapViewRegion, setMapViewRegion] = useState({
    latitude: 35.9894573,
    longitude: 128.6607805,
    latitudeDelta: 7,
    longitudeDelta: LONGITUDE_DELTA,
  });

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
    <View style={styles.container}>
      <View style={styles.origin_view}>
        <FontAwesome5
          name="location-arrow"
          style={styles.arrow_icon}
          // color="white"
        />
        <Text style={styles.origin_text}>{route.params.origin}</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.box}>
          <View style={styles.filter_type_box}>
            <View style={styles.filter_icon_and_text_view}>
              <FontAwesome5 name="map" style={styles.filter_type_icon} />
              <Text style={styles.filter_type_text}>테마</Text>
            </View>
            <MultipleSelectList
              boxStyles={{ marginTop: 10 }}
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
            <View style={styles.filter_icon_and_text_view}>
              <FontAwesome5 name="users" style={styles.filter_type_icon} />
              <Text style={styles.filter_type_text}>
                인구수
                {population == 0 ? null : <Text>~ {population}(만명)</Text>}
              </Text>
            </View>

            <Slider
              style={styles.slider}
              value={population}
              onValueChange={(val) => setPopulation(val)}
              minimumValue={0}
              maximumValue={1000}
              minimumTrackTintColor="#44AD5E"
              maximumTrackTintColor="#FFFFFF"
              step={1}
              // thumbStyle={{ width: 20, height: 20, borderRadius: 50 }}
              // trackHeight={10}
            />
          </View>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.filter_type_box}>
            <View style={styles.filter_icon_and_text_view}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                style={styles.filter_type_icon}
              />
              <Text style={styles.filter_type_text}>
                거리 {distance == 0 ? null : <Text>~ {distance}(km)</Text>}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              value={distance}
              onValueChange={(val) => setDistance(val)}
              minimumValue={0}
              maximumValue={630}
              minimumTrackTintColor="#44AD5E"
              maximumTrackTintColor="#FFFFFF"
              step={10}
            />

            <MapView style={styles.map} region={mapViewRegion}>
              <Marker
                // image={
                //   "https://firebasestorage.googleapis.com/v0/b/adonde-app.appspot.com/o/images%2Feat.png?alt=media&token=6e954ae7-5fb9-4192-83ad-15cd021c85cd"
                // }
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title={route.params.origin}
                // pinColor=""
              />

              <Circle
                strokeWidth={1}
                strokeColor="#0086B3"
                fillColor="rgba(223, 241, 247, 0.47)"
                radius={distance * 1000}
                center={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />
            </MapView>
          </View>
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
        </View>
      </ScrollView>
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingVertical: 60,
    zIndex: 1,
    height: screenHeight,
  },

  origin_view: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 0,
    position: "absolute",
    flexDirection: "row",
  },
  arrow_icon: { fontSize: 20, marginRight: 10 },
  origin_text: { fontSize: 20 },
  filter_type_box: {
    borderRadius: 10,
    padding: 20,
  },
  filter_icon_and_text_view: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  filter_type_text: {
    fontSize: 17,
    // marginBottom: 10,
    alignSelf: "center",
  },
  filter_type_icon: { fontSize: 24, marginRight: 7 },

  box: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 60,
    backgroundColor: "#CEF6CE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // margin: 20,
  },
  slider: {
    width: screenWidth - 60,
  },
  map: {
    marginTop: 10,
    borderRadius: 10,
    width: screenWidth - 60,
    height: 300,
  },
  submit_btn: {
    alignSelf: "center",
    width: screenWidth - 40,
    marginBottom: 40,
  },
});

export default Filter;
