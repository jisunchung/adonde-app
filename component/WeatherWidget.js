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
import axios from "axios";
import { TEMP_BASE_URL } from "../api";
import { Ionicons } from "@expo/vector-icons";

function WeatherWidget({ lat, long }) {
  const [weatherResult, SetWeatherResult] = useState({
    T1H: 10,
    REH: 50,
    SKY: 1,
  });
  const route = useRoute();

  const ComputeBaseDateAndTime = () => {
    var returnValue = {};
    var date = new Date();
    var hours = date.getHours();
    var min = date.getMinutes();
    if (min < 45) {
      hours--;
    }
    returnValue["time"] = hours + "30";
    console.log("time---------------", hours + "30");
    //yyyymmdd 형식으로 만들어서 return
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var base_date = year + month + day;
    console.log("date---------------", base_date);
    returnValue["date"] = base_date;
    return returnValue;
  };
  const getTemp = async (lat, long) => {
    var { date, time } = ComputeBaseDateAndTime();
    var { x, y } = dfs_xy_conv(lat, long);
    // console.log("getTemp var xy value --------------------", x, y);
    try {
      const res = await axios.get(`${TEMP_BASE_URL}`, {
        params: {
          base_date: date,
          base_time: time,
          nx: x,
          ny: y,
          serviceKey:
            "8bxbM4I+UnsyfG8sejCXK5P1HwSSFaACcpZlTlfDqJzhoOEhqU2wg2w24OoeVVanHP6V9PiX1gZHv3JYBICnuQ==",
          numOfRows: "50",
          pageNo: "1",
          dataType: "JSON",
        },
      });
      console.log("-----------------getTempResult--------------");
      console.log(res.config.params);
      console.log(res.data);
      var tempResult = res.data.response.body.items.item;
      var result = {};
      tempResult.map((item) => {
        if (item["category"] == "T1H") {
          result["T1H"] = item["fcstValue"];
        }
        if (item["category"] == "SKY") {
          result["SKY"] = item["fcstValue"];
        }
        if (item["category"] == "REH") {
          result["REH"] = item["fcstValue"];
        }
        // if (item["category"] == "PTY") {
        //   result["PTY"] = item["fcstValue"];
        // }
        // if (item["category"] == "PCP") {
        //   result["PCP"] = item["fcstValue"];
        // }
        // if (item["category"] == "POP") {
        //   result["POP"] = item["fcstValue"];
        // }
      });
      SetWeatherResult(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  function dfs_xy_conv(v1, v2) {
    var RE = 6371.00877; // 지구 반경(km)
    var GRID = 5.0; // 격자 간격(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)
    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)
    var XO = 43; // 기준점 X좌표(GRID)
    var YO = 136; // 기1준점 Y좌표(GRID)

    var DEGRAD = Math.PI / 180.0;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    var rs = {};

    var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    var theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    return rs;
  }
  useEffect(() => {
    console.log("component------", lat, long);
    getTemp(lat, long);
  }, []);

  return (
    <View style={styles.block}>
      <Text style={styles.text_weather}>온도 {weatherResult["T1H"]}°C</Text>
      <Text style={styles.text_weather}>습도 {weatherResult["REH"]}%</Text>
      {weatherResult["SKY"] == 1 ? (
        <Ionicons
          style={styles.text_weather_icon}
          name="sunny-outline"
          // size={24}
          color="black"
        />
      ) : null}
      {weatherResult["SKY"] == 3 ? (
        <Ionicons
          style={styles.text_weather_icon}
          name="md-partly-sunny-outline"
          // size={24}
          color="black"
        />
      ) : null}
      {weatherResult["SKY"] == 4 ? (
        <Ionicons
          style={styles.text_weather_icon}
          name="cloud-outline"
          // size={24}
          color="black"
        />
      ) : null}
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  block: {
    // paddingHorizontal: 40,
    // paddingVertical: 40,
    // width: screenWidth - 80,
    backgroundColor: "blue",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-evenly",
  },
  text_weather: {
    color: "white",
    margin: 5,
    padding: 5,
    fontSize: 16,
  },
  text_weather_icon: {
    color: "white",
    margin: 4,
    padding: 4,
    fontSize: 24,
  },
});

export default WeatherWidget;
