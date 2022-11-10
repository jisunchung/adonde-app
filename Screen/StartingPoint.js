import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState } from "react";
// import PickerCascader from "react-native-picker-cascader";
import { Picker } from "@react-native-picker/picker";
import koDepartures from "../locales/ko.json";

function StartingPoint({ navigation }) {
  const [ok, setOk] = useState(true);
  const [address, SetAddress] = useState("loading...");
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLanguage, setSelectedLanguage] = useState();
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
    //address 요청
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    updateRegion(latitude, longitude);

    SetAddress(location[0].region + ", " + location[0].city);
  };
  const updateRegion = (lat, long) => {
    const newRegion = { ...region };
    newRegion.latitude = lat;
    newRegion.longitude = long;
    setRegion(newRegion);
  };

  useEffect(() => {
    getAddress();
    // console.log(koDepartures["originItems"]);
  }, []);
  return (
    <View style={styles.block}>
      <Text style={styles.text}>start</Text>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <Text>현재위치: {address}</Text>
      <Text>dropdown</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <Text>{selectedLanguage}</Text>
      <Button title="submit" onPress={() => navigation.navigate("Filter")} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 250,
  },
});

export default StartingPoint;
