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

function Detail({}) {
  const [cityDetailResult, setCityDetailResult] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [beaches, setBeaches] = useState([]);
  const [mountains, setMountains] = useState([]);
  const [rivers, setRivers] = useState([]);
  const [valleys, setValleys] = useState([]);
  const [place, setPlace] = useState({
    beaches: [],
    mountains: [],
    rivers: [],
    valleys: [],
  });
  const route = useRoute();
  const cityDetails = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/city/findOne`, {
        sido_sgg: route.params.sido_sgg,
      });
      console.log("city details :", res.data);
      setCityDetailResult(res.data);
      setRegion({
        ...region,
        latitude: res.data["latitude"],
        longitude: res.data["longitude"],
      });
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
      console.log("city place :", res.data);
      console.log("palces ", Object.keys(res.data));
      setPlace({
        beaches: res.data["beaches"],
        mountains: res.data["mountains"],
        rivers: res.data["rivers"],
        valleys: res.data["valleys"],
      });
      setBeaches(res.data["beaches"]);
      console.log("------------------------beaches", res.data["beaches"]);

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

  const returnPlaces = Object.keys(place).map((place_type) => (
    // <ScrollView horizontal={true} style={styles.scrollView_horizontal}>
    <View style={styles.place_block}>
      {place[`${place_type}`].length != 0 ? (
        <Text style={styles.place_type_text}>{place_type}</Text>
      ) : null}

      {place[`${place_type}`].map((place_result, index) => (
        <TouchableOpacity
          style={styles.place}
          onPress={() => {
            Linking.openURL(place_result["link"]);
          }}
        >
          <Text key={index}>{place_result["name"]}</Text>
        </TouchableOpacity>
      ))}
    </View>
    // </ScrollView>
  ));
  if (cityDetailResult != null) {
    return (
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.text}>{route.params.sido_sgg}</Text>
          <Text style={styles.text}>{cityDetailResult["description"]}</Text>
          <Text style={styles.text}>
            인구수 : {cityDetailResult["population"]}
          </Text>
          <Text
            style={{ color: "blue" }}
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
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.block}>
        <Text style={styles.text}>loading...</Text>
      </View>
    );
  }
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  text: {
    // padding: 16,
    fontSize: 24,
  },
  image: {
    width: screenWidth - 40,
    height: 300,
  },
  link: {
    fontSize: 10,
  },
  map: {
    width: screenWidth - 40,
    height: 300,
  },
  scrollView_horizontal: {
    width: screenWidth - 40,
    // height: "100%",
    backgroundColor: "red",
  },
  place_block: {
    backgroundColor: "powderblue",
    margin: 10,
    // flexDirection: "row",
    position: "relative",
    alignItems: "flex-start",
    // justifyContent: "center",
    // width: screenWidth - 40,
    // height: "auto",
  },
  place_type_text: {
    margin: 5,
    alignSelf: "center",
    backgroundColor: "steelblue",
  },
  place: {
    // width: ,
    // backgroundColor: "skyblue",
    // padding: 20,
    // margin: 10,
    // flexDirection: "column",
    // flexWrap: "wrap",
    // borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    // alignSelf: "flex-start",
    // flexDirection: "row",
    marginHorizontal: "1%",
    marginBottom: 6,
    // minWidth: "48%",
    // textAlign: "center",
  },
});

export default Detail;
