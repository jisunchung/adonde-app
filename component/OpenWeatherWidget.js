import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import axios from "axios";
import { OPEN_WEARHER_API_KEY } from "../api";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

function WeatherWidget({ lat, long }) {
  const [weatherResult, SetWeatherResult] = useState({
    temp: null,
    hum: null,
    icon: null,
  });

  const getTemp = async (lat, long) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPEN_WEARHER_API_KEY}&units=metric&lang=kr`;
    axios
      .get(url)
      .then((responseData) => {
        console.log(responseData.data.main);
        SetWeatherResult({
          temp: Math.round(responseData.data.main.temp),
          hum: responseData.data.main.humidity,
          icon: responseData.data.weather[0].icon,
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
      <Text style={styles.text_weather}>
        <FontAwesome5 name="temperature-high" style={styles.temp_icon} />
        {weatherResult["temp"]}°C
      </Text>
      <Text style={styles.text_weather}>
        <Entypo name="water" style={styles.hum_icon} /> {weatherResult["hum"]}%
      </Text>
      <Image
        style={styles.weather_icon}
        source={{
          url: iconURL,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#A9D0F5",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-evenly",
  },
  text_weather: {
    color: "#6E6E6E",
    margin: 5,
    padding: 5,
    fontSize: 16,
  },
  temp_icon: {
    fontSize: 20,
    color: "#6E6E6E",
  },
  hum_icon: {
    fontSize: 20,
    color: "#6E6E6E",
  },
  weather_icon: {
    width: 40,
    height: 40,
  },
});

export default WeatherWidget;
