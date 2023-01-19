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
import { BASE_URL, TEMP_BASE_URL } from "../api";
import { Ionicons } from "@expo/vector-icons";

function Detail() {
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
  const [tempXY, setTempXY] = useState({});
  const [weatherResult, SetWeatherResult] = useState({});
  const route = useRoute();
  const cityDetails = async () => {
    var lat, long;
    try {
      const res = await axios.post(`${BASE_URL}/city/findOne`, {
        sido_sgg: route.params.sido_sgg,
      });
      //   console.log("city details :", res.data);
      setCityDetailResult(res.data);
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
      //도시 날씨를 불러와준다
      getTemp(lat, long);
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
      setBeaches(res.data["beaches"]);
      //   console.log("------------------------beaches", res.data["beaches"]);

      //   setPlace(Object.keys(res.data));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const ComputeBaseDateAndTime = () => {
    var returnValue = {};

    var date = new Date();
    var hours = date.getHours();
    returnValue["time"] = hours + "30";
    console.log("time---------------", hours + "30");
    //yyyymmdd
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
      console.log("-----------------temp--------------");
      //   console.log(res.data.response.body.items.item);
      var tempResult = res.data.response.body.items.item;
      var result = {};
      tempResult.map((item) => {
        if (item["category"] == "T1H") {
          result["T1H"] = item["fcstValue"];
        }
        if (item["category"] == "SKY") {
          result["SKY"] = item["fcstValue"];
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
    setTempXY(rs);
    return rs;
  }
  useEffect(() => {
    cityDetails();
    getPlace();
  }, []);
  const returnWeather = (
    <View>
      <Text>온도: {weatherResult["T1H"]}</Text>

      {weatherResult["SKY"] == 1 ? (
        <Ionicons name="sunny-outline" size={24} color="black" />
      ) : null}
      {weatherResult["SKY"] == 3 ? (
        <Ionicons name="md-partly-sunny-outline" size={24} color="black" />
      ) : null}
      {weatherResult["SKY"] == 4 ? (
        <Ionicons name="cloud-outline" size={24} color="black" />
      ) : null}
    </View>
  );

  const returnPlaces = Object.keys(place).map((place_type) => (
    // <ScrollView horizontal={true} style={styles.scrollView_horizontal}>
    <View style={styles.place_block} key={place_type}>
      {place[`${place_type}`].length != 0 ? (
        <Text style={styles.place_type_text} key={place_type}>
          {place_type}
        </Text>
      ) : null}

      {place[`${place_type}`].map((place_result, index) => (
        <TouchableOpacity
          key={index}
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
          {returnWeather}
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
