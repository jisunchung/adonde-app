import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { OPEN_WEARHER_API_KEY } from "../api";

function WeatherWidget({ lat, long, navigation }) {
  const [weatherResult, SetWeatherResult] = useState({
    temp: null,
    hum: null,
    icon: null,
  });
  const route = useRoute();

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
        navigation.push("Detail", {
          loading: false,
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
      <Text style={styles.text_weather}>온도 {weatherResult["temp"]}°C</Text>
      <Text style={styles.text_weather}>습도 {weatherResult["hum"]}%</Text>
      <Image
        style={styles.text_weather_icon}
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
  text_weather_icon: {
    width: 40,
    height: 40,
  },
});

export default WeatherWidget;
