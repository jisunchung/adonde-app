import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, ViewBase } from "react-native";
import axios from "axios";
import { OPEN_WEARHER_API_KEY } from "../api";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function WeatherWidget({ lat, long }) {
  const [weatherResult, SetWeatherResult] = useState({
    temp: null,
    temp_max: null,
    temp_min: null,
    hum: null,
    icon: null,
    weather: null,
  });

  const getTemp = async (lat, long) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPEN_WEARHER_API_KEY}&units=metric&lang=kr`;
    axios
      .get(url)
      .then((responseData) => {
        console.log(responseData.data);
        SetWeatherResult({
          temp: Math.round(responseData.data.main.temp),
          temp_max: Math.round(responseData.data.main.temp_max),
          temp_min: Math.round(responseData.data.main.temp_min),
          hum: responseData.data.main.humidity,
          icon: responseData.data.weather[0].icon,
          weather: responseData.data.weather[0].main,
        });
      })
      .catch((error) => console.log(error));
    console.log(weatherResult);
  };

  useEffect(() => {
    console.log("component------", lat, long);
    getTemp(lat, long);
  }, []);

  const iconURL = `http://openweathermap.org/img/wn/${weatherResult["icon"]}@2x.png`;
  return (
    <View style={styles.block}>
      <View>
        <Text style={styles.text_temp}>
          {/* <FontAwesome5 name="temperature-high" style={styles.temp_icon} /> */}
          {weatherResult["temp"]}°
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.text_temp_min_max}>
            최고:{weatherResult["temp_max"]}
          </Text>
          <Text style={styles.text_temp_min_max}>
            최저:{weatherResult["temp_min"]}
          </Text>
        </View>
      </View>

      <Text style={styles.text_hum}>
        {/* <Entypo name="water" style={styles.hum_icon} /> */}
        <Ionicons name="water" style={styles.hum_icon} />
        {weatherResult["hum"]}%
      </Text>

      <View>
        <Image
          style={styles.weather_icon}
          source={{
            url: iconURL,
          }}
        />
        <Text style={styles.text_weather}>{weatherResult["weather"]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#A9D0F5",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  text_temp: {
    color: "#6E6E6E",
    fontSize: 40,
    margin: 8,
    marginLeft: 15,
  },
  text_temp_min_max: {
    color: "#6E6E6E",
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 15,
  },
  text_hum: {
    color: "#6E6E6E",
    fontSize: 16,
    paddingBottom: 10,
    alignSelf: "flex-end",
  },
  text_weather: {
    color: "#6E6E6E",
    fontSize: 16,
    // marginLeft: 5,
  },
  temp_icon: {
    fontSize: 30,
    color: "#6E6E6E",
  },
  hum_icon: {
    fontSize: 20,
    color: "#6E6E6E",
  },
  weather_icon: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginBottom: 3,
  },
});

export default WeatherWidget;
