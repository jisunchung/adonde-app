import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
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
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    cityDetails();
    getPlace();
  }, []);

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
  },
  text: {
    // padding: 16,
    fontSize: 24,
  },
  image: {
    width: 300,
    height: 300,
  },
  link: {
    fontSize: 10,
  },
  map: {
    width: screenWidth - 40,
    height: 300,
  },
});

export default Detail;
