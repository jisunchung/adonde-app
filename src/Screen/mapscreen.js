import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function mapscreen() {
  const [data, setData] = useState(null);
  const [address, SetAddress] = useState("loading");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getAddress = async () => {
    //허가 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    //유저 위치 요청
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // console.log("location", location);
    setLat(latitude);
    setLong(longitude);
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    SetAddress(location[0].region + location[0].city);
  };
  useEffect(() => {
    saveNote();
    getAddress();
  });

  const saveNote = async () => {
    const data = {
      sido_sgg: "경상남도 고성",
    };

    try {
      const response = await axios.post(
        `https://adonde-kr.herokuapp.com/city/findOne`,
        data
      );
      // console.log(response.data["sgg"], response.data);
      setData(response.data["description"]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.test}>{data}</Text> */}
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
        />
      </MapView>
      <Text>현위치</Text>
      <Text>{lat}</Text>
      <Text>{long}</Text>
      <Text>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "black",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  test: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 100,
    fontSize: 30,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 500,
  },
});
