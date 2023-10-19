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
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../api";

//출발지 data 불러오기
import { START_POINT_DATA, current_location_formatting } from "../utils/cities";
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
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
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

  //현위치를 출발지로
  const CurrentLocationAsStart = async () => {
    console.log("현위치를 출발지로!");

    if (location.isoCountryCode == "KR") {
      // setSido_sgg("서울 서울");
      //현위치를 포멧팅 해줌

      setSido_sgg(
        current_location_formatting(
          location.city,
          location.region,
          location.subregion
        )
      );
    } else {
      alert("사용 가능한 범위를 벗어났습니다 :(");
      // formatting test
      // current_location_formatting("의정부시", "경기도", "null");
    }

    //주소 test
    const add = await Location.reverseGeocodeAsync(
      { latitude: 33.4996213, longitude: 126.5311884 },
      { useGoogleMaps: false }
    );
    // console.log("주소 test", add);
  };

  const nextButtonClick = async () => {
    setLoading(true);
    console.log("loading", loading);
    try {
      const res = await axios.post(`${BASE_URL}/city/findOne`, {
        sido_sgg,
      });
      console.log("origin region : ", res.data.latitude, res.data.longitude);
      //네비게이션 파라미터에 실어서 filter페이지로 보내기...
      await navigation.push("Filter", {
        origin: sido_sgg,
        lat: res.data.latitude,
        long: res.data.longitude,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
        <MapView style={[styles.map]} region={region}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
        <View
          style={{
            // backgroundColor: "red",
            // borderRadius: 20,
            height: screenHeight * 0.2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
                  boxStyles={styles.select_box_style}
                  dropdownStyles={styles.select_box_style}
                />
                {START_POINT_DATA.map((name, index) => {
                  if (name["key"] == sido) {
                    return (
                      <View style={styles.select_sgg_view} key={index}>
                        <SelectList
                          key={index}
                          setSelected={(val) => {
                            setSido_sgg(val);
                            setModalVisible(!modalVisible);
                          }}
                          data={name["options"]}
                          save="value"
                          boxStyles={styles.select_box_style}
                          dropdownStyles={styles.select_box_style}
                        />
                      </View>
                    );
                  }
                })}
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="close" style={styles.modal_close_icon} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.current_location_box}>
            <View style={styles.location_arrow_back}>
              <FontAwesome5
                name="location-arrow"
                style={{ fontSize: 10 }}
                color="white"
              />
            </View>
            <Text style={styles.current_text}> {address}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {region.latitude != 0 ? (
              <Pressable
                onPress={() => CurrentLocationAsStart()}
                style={styles.current_btn}
              >
                <Text style={styles.textStyle}>현위치를 출발지로</Text>
              </Pressable>
            ) : null}
            <TouchableOpacity
              style={styles.select_location_btn}
              onPress={() => [
                setModalVisible(true),
                setSido(""),
                setSido_sgg(""),
              ]}
            >
              <Text style={styles.select_location_text}>출발지 선택</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.next_btn_view}>
        <Button
          textColor="#FFFFFF"
          buttonColor="#44AD5E"
          mode="contained-tonal"
          onPress={() =>
            sido_sgg == " "
              ? Alert.alert("출발지를 선택하세요")
              : nextButtonClick()
          }
        >
          {sido_sgg != " " ? (
            <Text style={{ fontWeight: "500" }}>출발지 : {sido_sgg}</Text>
          ) : (
            <Text>Next</Text>
          )}
          {loading && (
            <ActivityIndicator style={styles.loading} color={"black"} />
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
//green
// const MODAL_BACK_COLOR = "#CEF6CE";
// const MODAL_SELECT_BACK_COLOR = "#F1FCF2";
//grey
const MODAL_BACK_COLOR = "#E6E6E6";
const MODAL_SELECT_BACK_COLOR = "#FFFFFF";

//blue
// const MODAL_BACK_COLOR = "#0086B3";
// const MODAL_SELECT_BACK_COLOR = "#E9EFFF";

// const MODAL_BACK_COLOR = "#F2FCF3";
// const MODAL_SELECT_BACK_COLOR = "#E9EFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  box: {
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  text: {
    alignSelf: "center",
    padding: 16,
    fontSize: 18,
  },
  map: {
    width: screenWidth,
    height: screenHeight * 0.58,
    // borderRadius: 10,
    // marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: MODAL_BACK_COLOR,
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
    marginBottom: 20,
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
    fontWeight: "bold",
  },
  current_btn: {
    borderRadius: 10,
    padding: 20,
    height: screenHeight * 0.072,
    backgroundColor: "#44AD5E",
  },

  select_location_btn: {
    borderRadius: 10,
    padding: 20,
    height: screenHeight * 0.072,
    marginLeft: 10,

    backgroundColor: "#44AD5E",
  },
  select_location_text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold",
  },

  select_sgg_view: {
    marginTop: 10,
  },
  select_box_style: {
    backgroundColor: MODAL_SELECT_BACK_COLOR,
    borderColor: MODAL_SELECT_BACK_COLOR,
    width: screenWidth / 2,
  },

  modal_close_icon: {
    color: "#022005",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#022005",
  },
  next_btn_view: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 40,
  },
  loading: { fontSize: 10, marginLeft: 10 },
});

export default StartingPoint;
