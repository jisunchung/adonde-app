import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
  Modal,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../api";
import { async } from "@firebase/util";
//출발지 data 불러오기
import { START_POINT_DATA } from "../utils/cities";
function StartingPoint({ navigation }) {
  //지도 state
  const [ok, setOk] = useState(true);
  const [address, SetAddress] = useState("loading...");
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  //출발지 설정 state
  const [modalVisible, setModalVisible] = useState(false);
  const [sido, setSido] = useState("");
  const [sido_sgg, setSido_sgg] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  //지도, 현재위치, 주소
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

    console.log("location", location);
    setLocation(location[0]);

    SetAddress(location[0].region + ", " + location[0].city);
  };
  const updateRegion = (lat, long) => {
    const newRegion = { ...region };
    newRegion.latitude = lat;
    newRegion.longitude = long;
    setRegion(newRegion);
  };
  const checkMetropolitanCity = (sidoSigg) => {
    //특별시일 경우 *2 해서 return
    var pattern = /\s/g;
    if (sidoSigg.match(pattern)) {
      //특별시가 아님
      setSido_sgg(sidoSigg);
    } else {
      //특별시
      const tempCity = sidoSigg + " " + sidoSigg;
      setSido_sgg(tempCity);
    }
  };
  // 출발지에 따른 접근성 필터 상태 확인
  const changeAccItemStatus = async () => {
    console.log("sido_sigg", sido_sgg);

    setLoading(true);
    console.log("loading", loading);
    try {
      const express_res = await axios.post(`${BASE_URL}/express/findAny`, {
        sido_sgg,
      });
      const suburbs_res = await axios.post(`${BASE_URL}/suburbs/findAny`, {
        sido_sgg,
      });
      const train_res = await axios.post(`${BASE_URL}/train/findOne`, {
        sido_sgg,
      });

      //   console.log("express.data: ", express_res.data);
      //   console.log("sub.data: ", suburbs_res.data);
      //   console.log("train.data: ", train_res.data);

      //네비게이션 파라미터에 실어서 filter페이지로 보내기...
      await navigation.push("Filter", {
        origin: sido_sgg,
        express: express_res.data,
        suburbs: suburbs_res.data,
        train: train_res.data,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //현위치를 출발지로
  const CurrentLocationAsStart = async () => {
    console.log("현위치를 출발지로", region);

    if (location.isoCountryCode == "KR") {
      setSido_sgg("서울 서울");
    } else {
      alert("사용 가능한 범위를 벗어났습니다 :(");
    }
    // 주소 test Array [
    //   Object {
    //     "city": "의정부시",
    //     "country": "대한민국",
    //     "district": "의정부동",
    //     "isoCountryCode": "KR",
    //     "name": "의정부동 493-8",
    //     "postalCode": "11650",
    //     "region": "경기도",
    //     "street": "의정부동",
    //     "streetNumber": "493-8",
    //     "subregion": null,
    //     "timezone": "Asia/Seoul",
    //   },
    // ]
    // Object {
    //   "city": null,
    //   "country": "대한민국",
    //   "district": "평창읍",
    //   "isoCountryCode": "KR",
    //   "name": "하리 171-5",
    //   "postalCode": "25374",
    //   "region": "강원도",
    //   "street": "하리",
    //   "streetNumber": "171-5",
    //   "subregion": "평창군",
    //   "timezone": "Asia/Seoul",
    // },
    // Object {
    //   "city": "인천광역시",
    //   "country": "대한민국",
    //   "district": "만수동",
    //   "isoCountryCode": "KR",
    //   "name": "효성상아아파트",
    //   "postalCode": "21542",
    //   "region": "인천광역시",
    //   "street": "만수동",
    //   "streetNumber": "905-3",
    //   "subregion": null,
    //   "timezone": "Asia/Seoul",
    // },
    const add = await Location.reverseGeocodeAsync(
      { latitude: 37.4564330950855, longitude: 126.72226644218145 },
      { useGoogleMaps: false }
    );
    console.log("주소 test", add);
  };

  useEffect(() => {
    getAddress();
    // setSido("");
    // setSido_sgg("");
    checkMetropolitanCity(sido_sgg);
  }, [sido_sgg]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
          {" "}
          <Entypo name="location-pin" size={26} color="black" />
          출발지 설정
        </Text>
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
        <View style={styles.current_location_box}>
          <View style={styles.location_arrow_back}>
            <FontAwesome5 name="location-arrow" size={10} color="white" />
          </View>
          <Text style={styles.current_text}> {address}</Text>
        </View>
        {region.latitude != 0 ? (
          <Pressable
            onPress={() => CurrentLocationAsStart()}
            style={[styles.button, styles.buttonClose]}
          >
            <Text style={styles.textStyle}>현위치를 출발지로</Text>
          </Pressable>
        ) : null}
        {/* <SelectList
            setSelected={(val) => setSido(val)}
            data={data}
            save="value"
            // boxStyles={{ marginHorizontal: 80 }}
            placeholder="시도"
          />
          {data.map((name, index) => {
            if (name["key"] == sido) {
              return (
                <SelectList
                  key={index}
                  setSelected={(val) => setSido_sgg(val)}
                  data={name["options"]}
                  save="value"
                  //   boxStyles={{ marginHorizontal: 80 }}
                  placeholder="시군구"
                />
              );
            }
          })} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>출발지를 선택하세요!</Text>
              <SelectList
                setSelected={(val) => setSido(val)}
                data={START_POINT_DATA}
                save="value"
              />
              {START_POINT_DATA.map((name, index) => {
                if (name["key"] == sido) {
                  return (
                    <SelectList
                      key={index}
                      setSelected={(val) => setSido_sgg(val)}
                      data={name["options"]}
                      save="value"
                    />
                  );
                }
              })}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>선택완료</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => [setModalVisible(true), setSido(""), setSido_sgg("")]}
        >
          <Text style={styles.textStyle}>출발지 선택하기</Text>
        </Pressable>
        {/* <Text>{sido}</Text> */}
        {sido_sgg != " " ? (
          <Text style={{ alignSelf: "center", fontSize: "17" }}>
            출발지 : {sido_sgg}
          </Text>
        ) : null}
        {/* <Button
          title="submit"
          onPress={() =>
            sido_sgg == " "
              ? Alert.alert("출발지를 선택하세요")
              : changeAccItemStatus()
          }
        ></Button> */}

        <View style={{ marginTop: 20 }}>
          <Button
            textColor="#FFFFFF"
            buttonColor="#44AD5E"
            mode="contained-tonal"
            onPress={() =>
              sido_sgg == " "
                ? Alert.alert("출발지를 선택하세요")
                : changeAccItemStatus()
            }
          >
            Next
          </Button>
          <View style={{ marginTop: 10 }}>
            {loading && <ActivityIndicator size={"large"} color={"black"} />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // alignItems: "center",
  },
  scrollView: {
    // backgroundColor: "pink",
  },
  box: {
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  text: {
    alignSelf: "center",
    padding: 16,
    fontSize: 18,
  },
  map: {
    width: screenWidth - 40,
    height: 300,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  current_location_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  location_arrow_back: {
    backgroundColor: "#2E64FE",
    padding: 7,
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  current_text: {
    fontSize: 20,
    margin: 5,
    alignSelf: "center",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 200,
    margin: 8,
    alignSelf: "center",
  },
  buttonOpen: {
    backgroundColor: "#44AD5E",
  },
  buttonClose: {
    backgroundColor: "#44AD5E",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default StartingPoint;
