import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Linking, Dimensions, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { BASE_URL } from "../api";
import WeatherWidget from "../component/OpenWeatherWidget";

function Detail() {
  const [cityDetailResult, setCityDetailResult] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [place, setPlace] = useState({
    beaches: [],
    mountains: [],
    rivers: [],
    valleys: [],
  });

  const route = useRoute();

  const cityDetails = async () => {
    var lat, long;
    try {
      const res = await axios.post(`${BASE_URL}/city/findOne`, {
        sido_sgg: route.params.sido_sgg,
      });
      //   console.log("city details :", res.data);
      setCityDetailResult(res.data);
      //   console.log("citydetailresult", res.data);
      setRegion({
        ...region,
        latitude: Number(res.data["latitude"]),
        longitude: Number(res.data["longitude"]),
      });
      lat = res.data["latitude"];
      long = res.data["longitude"];
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const getPlace = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/place/findBySidoSggAndTheme`, {
        sido_sgg: route.params.sido_sgg,
      });
      //   console.log("city place :", res.data);
      //   console.log("palces ", Object.keys(res.data));
      setPlace({
        beaches: res.data["beaches"],
        mountains: res.data["mountains"],
        rivers: res.data["rivers"],
        valleys: res.data["valleys"],
      });

      //   console.log("------------------------beaches", res.data["beaches"]);

      //   setPlace(Object.keys(res.data));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    cityDetails();
    getPlace();
  }, []);

  const returnPlaces = Object.keys(place).map((place_type, index) => (
    <View style={styles.place_block} key={place_type}>
      {place[`${place_type}`].length != 0 ? (
        <Text style={styles.place_type_text} key={place_type}>
          {place_type}
        </Text>
      ) : null}
      <ScrollView horizontal={true} nestedScrollEnabled={true} key={index}>
        {place[`${place_type}`].map((place_result, index) => (
          <View style={styles.horizontal_view} key={index}>
            <TouchableOpacity
              style={styles.TouchableOpacity_place_block}
              key={index}
              onPress={() => {
                Linking.openURL(place_result["link"]);
              }}
            >
              <Text key={index} style={styles.place_name_text}>
                {place_result["name"]}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  ));

  if (cityDetailResult != null && region.latitude != 0) {
    return (
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <View style={styles.block}>
          <View style={styles.description_block}>
            <Text style={styles.text_title}>{route.params.sido_sgg}</Text>
            <WeatherWidget lat={region.latitude} long={region.longitude} />
            <Text style={styles.text_des}>
              {cityDetailResult["description"]}
            </Text>
            <Text style={styles.text_population}>
              인구수 : {cityDetailResult["population"]} (명)
            </Text>

            <Text
              style={styles.link}
              onPress={() => Linking.openURL(cityDetailResult["tourism_link"])}
            >
              {cityDetailResult["tourism_link"]}
            </Text>

            <Image
              style={styles.image}
              source={{
                uri: cityDetailResult["image_src"],
              }}
            />
            <MapView style={styles.map} region={region}>
              <Marker
                coordinate={{
                  latitude: Number(cityDetailResult["latitude"]),
                  longitude: Number(cityDetailResult["longitude"]),
                }}
              />
            </MapView>
            {returnPlaces}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.block}>
        <Text style={styles.loading_text}>loading...</Text>
      </View>
    );
  }
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#08844E",
    flex: 1,
  },
  loading_text: {
    color: "white",
    alignSelf: "center",
    fontSize: 30,
  },
  description_block: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  text_title: {
    // padding: 16,
    fontSize: 24,
    color: "grey",
    alignSelf: "center",
    marginBottom: 11,
  },
  text_des: {
    marginVertical: 10,
    fontSize: 16,
  },
  text_population: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: "flex-end",
    color: "grey",
  },
  image: {
    marginVertical: 20,
    width: screenWidth - 80,
    height: 300,
    borderRadius: 10,
  },

  link: {
    fontSize: 16,
    textDecorationLine: "underline",
    // color: "#FFBE59",
    color: "#5882FA",
    alignSelf: "center",
  },
  map: {
    borderRadius: 10,
    width: screenWidth - 80,
    height: 300,
  },
  horizontal_view: {
    flexDirection: "row",
    margin: 10,
    marginBottom: 15,
  },
  place_block: {
    backgroundColor: "powderblue",
    margin: 10,
    position: "relative",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  place_type_text: {
    fontSize: 16,
    color: "steelblue",
    fontWeight: "bold",
    margin: 8,
    alignSelf: "center",
  },
  TouchableOpacity_place_block: {
    padding: 5,
    backgroundColor: "#F4FA58",
    borderRadius: 5,
  },
  place_name_text: { color: "grey", fontSize: 14 },
});

export default Detail;
