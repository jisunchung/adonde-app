import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import axios from "axios";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
import * as Location from "expo-location";
// import CustomCallout from "../component/CustomCallout";

export default function ResultMap({ result }) {
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [data, setData] = useState(null);
  const [address, SetAddress] = useState("loading");
  const [lat, setLat] = useState(40.973149);
  const [long, setLong] = useState(128.3222456);
  const [cnt, setCnt] = useState(0);
  const [region, setRegion] = useState({
    latitude: 35.4966,
    longitude: 127.8095155,
    latitudeDelta: 7,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    console.log("result lenght", result[0]);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} initialRegion={region}>
        {/* <Marker
          title="You can also open this callout"
          description="by pressing on transparent area of custom callout"
          coordinate={{
            latitude: 34.973149,
            longitude: 128.3222456,
          }}
        /> */}
        {/* <Marker
          coordinate={{
            latitude: 34.973149,
            longitude: 128.3222456,
          }}
          calloutOffset={{ x: -8, y: 28 }}
          calloutAnchor={{ x: 0.5, y: 0.4 }}
        >
          <Callout
            alphaHitTest
            tooltip
            onPress={(_) => {
              //   Alert.alert("callout pressed");
            }}
            style={styles.customView}
          >
            <Text style={styles.calloutText}>경상남도 고성</Text>
            <CalloutSubview
              onPress={() => {
                console.log("calloutsubviewclick");
              }}
              style={[styles.calloutButton]}
            >
              <Text>Click me</Text>
            </CalloutSubview>
          </Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: 35.6867229,
            longitude: 127.9095155,
          }}
          calloutOffset={{ x: -8, y: 28 }}
          calloutAnchor={{ x: 0.5, y: 0.4 }}
        >
          <Callout
            alphaHitTest
            tooltip
            onPress={(_) => {
              //   Alert.alert("callout pressed");
            }}
            style={styles.customView}
          >
            <Text style={styles.calloutText}>경상남도 고성</Text>
            <CalloutSubview
              onPress={() => {
                console.log("calloutsubviewclick");
              }}
              style={[styles.calloutButton]}
            >
              <Text>Click me</Text>
            </CalloutSubview>
          </Callout>
        </Marker> */}
        {result.length != 0 ? (
          result.map((res) => (
            <Marker
              key={res.sido_sgg}
              coordinate={{
                latitude: Number(res.latitude),
                longitude: Number(res.longitude),
              }}
              title={res.sido_sgg}
            ></Marker>
          ))
        ) : (
          <></>
        )}
      </MapView>
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
    height: Dimensions.get("window").height,
  },
  customView: {
    width: 150,
    height: 80,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  calloutText: {
    color: "white",
    alignSelf: "center",
    paddingTop: 8,
  },
  calloutButton: {
    width: "auto",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
