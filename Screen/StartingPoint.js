import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
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

import axios from "axios";
import { BASE_URL } from "../api";
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
  const data = [
    {
      key: "특별/광역시",
      value: "특별/광역시",
      disabled: false,
      options: [
        { key: "서울", value: "서울" },
        { key: "부산", value: "부산" },
        { key: "대구", value: "대구" },
        { key: "인천", value: "인천" },
        { key: "광주", value: "광주" },
        { key: "대전", value: "대전" },
        { key: "울산", value: "울산" },
        { key: "세종", value: "세종" },
      ],
    },
    {
      key: "경기도",
      value: "경기도",
      disabled: false,
      options: [
        { key: "수원", value: "경기도 수원" },
        { key: "성남", value: "경기도 성남" },
        { key: "의정부", value: "경기도 의정부" },
        { key: "안양", value: "경기도 안양" },
        { key: "부천", value: "경기도 부천" },
        { key: "광명", value: "경기도 광명" },
        { key: "평택", value: "경기도 평택" },
        { key: "동두천", value: "경기도 동두천" },
        { key: "안산", value: "경기도 안산" },
        { key: "고양", value: "경기도 고양" },
        { key: "과천", value: "경기도 과천" },
        { key: "구리", value: "경기도 구리" },
        { key: "남양주", value: "경기도 남양주" },
        { key: "오산", value: "경기도 오산" },
        { key: "시흥", value: "경기도 시흥" },
        { key: "군포", value: "경기도 군포" },
        { key: "의왕", value: "경기도 의왕" },
        { key: "하남", value: "경기도 하남" },
        { key: "용인", value: "경기도 용인" },
        { key: "파주", value: "경기도 파주" },
        { key: "이천", value: "경기도 이천" },
        { key: "안성", value: "경기도 안성" },
        { key: "김포", value: "경기도 김포" },
        { key: "화성", value: "경기도 화성" },
        { key: "광주", value: "경기도 광주" },
        { key: "양주", value: "경기도 양주" },
        { key: "포천", value: "경기도 포천" },
        { key: "여주", value: "경기도 여주" },
        { key: "연천", value: "경기도 연천" },
        { key: "가평", value: "경기도 가평" },
        { key: "양평", value: "경기도 양평" },
      ],
    },
    {
      key: "강원도",
      value: "강원도",
      disabled: false,
      options: [
        { key: "춘천", value: "강원도 춘천" },
        { key: "원주", value: "강원도 원주" },
        { key: "강릉", value: "강원도 강릉" },
        { key: "동해", value: "강원도 동해" },
        { key: "태백", value: "강원도 태백" },
        { key: "속초", value: "강원도 속초" },
        { key: "삼척", value: "강원도 삼척" },
        { key: "홍천", value: "강원도 홍천" },
        { key: "횡성", value: "강원도 횡성" },
        { key: "영월", value: "강원도 영월" },
        { key: "평창", value: "강원도 평창" },
        { key: "정선", value: "강원도 정선" },
        { key: "철원", value: "강원도 철원" },
        { key: "화천", value: "강원도 화천" },
        { key: "양구", value: "강원도 양구" },
        { key: "인제", value: "강원도 인제" },
        { key: "고성", value: "강원도 고성" },
        { key: "양양", value: "강원도 양양" },
      ],
    },
    {
      key: "충청북도",
      value: "충청북도",
      disabled: false,
      options: [
        { key: "청주", value: "충청북도 청주" },
        { key: "충주", value: "충청북도 충주" },
        { key: "제천", value: "충청북도 제천" },
        { key: "보은", value: "충청북도 보은" },
        { key: "옥천", value: "충청북도 옥천" },
        { key: "영동", value: "충청북도 영동" },
        { key: "증평", value: "충청북도 증평" },
        { key: "진천", value: "충청북도 진천" },
        { key: "괴산", value: "충청북도 괴산" },
        { key: "음성", value: "충청북도 음성" },
        { key: "단양", value: "충청북도 단양" },
      ],
    },
    {
      key: "충청남도",
      value: "충청남도",
      disabled: false,
      options: [
        { key: "당진", value: "충청남도 당진" },
        { key: "천안", value: "충청남도 천안" },
        { key: "공주", value: "충청남도 공주" },
        { key: "보령", value: "충청남도 보령" },
        { key: "아산", value: "충청남도 아산" },
        { key: "서산", value: "충청남도 서산" },
        { key: "논산", value: "충청남도 논산" },
        { key: "계룡", value: "충청남도 계룡" },
        { key: "금산", value: "충청남도 금산" },
        { key: "부여", value: "충청남도 부여" },
        { key: "서천", value: "충청남도 서천" },
        { key: "청양", value: "충청남도 청양" },
        { key: "홍성", value: "충청남도 홍성" },
        { key: "예산", value: "충청남도 예산" },
        { key: "태안", value: "충청남도 태안" },
      ],
    },
    {
      key: "전라남도",
      value: "전라남도",
      disabled: false,
      options: [
        { key: "목포", value: "전라남도 목포" },
        { key: "여수", value: "전라남도 여수" },
        { key: "순천", value: "전라남도 순천" },
        { key: "나주", value: "전라남도 나주" },
        { key: "광양", value: "전라남도 광양" },
        { key: "담양", value: "전라남도 담양" },
        { key: "곡성", value: "전라남도 곡성" },
        { key: "구례", value: "전라남도 구례" },
        { key: "고흥", value: "전라남도 고흥" },
        { key: "보성", value: "전라남도 보성" },
        { key: "화순", value: "전라남도 화순" },
        { key: "장흥", value: "전라남도 장흥" },
        { key: "강진", value: "전라남도 강진" },
        { key: "해남", value: "전라남도 해남" },
        { key: "영암", value: "전라남도 영암" },
        { key: "무안", value: "전라남도 무안" },
        { key: "함평", value: "전라남도 함평" },
        { key: "영광", value: "전라남도 영광" },
        { key: "장성", value: "전라남도 장성" },
        { key: "완도", value: "전라남도 완도" },
        { key: "진도", value: "전라남도 진도" },
        { key: "신안", value: "전라남도 신안" },
      ],
    },
    {
      key: "전라북도",
      value: "전라북도",
      disabled: false,
      options: [
        { key: "전주", value: "전라북도 전주" },
        { key: "군산", value: "전라북도 군산" },
        { key: "익산", value: "전라북도 익산" },
        { key: "정읍", value: "전라북도 정읍" },
        { key: "남원", value: "전라북도 남원" },
        { key: "김제", value: "전라북도 김제" },
        { key: "완주", value: "전라북도 완주" },
        { key: "진안", value: "전라북도 진안" },
        { key: "무주", value: "전라북도 무주" },
        { key: "장수", value: "전라북도 장수" },
        { key: "임실", value: "전라북도 임실" },
        { key: "순창", value: "전라북도 순창" },
        { key: "고창", value: "전라북도 고창" },
        { key: "부안", value: "전라북도 부안" },
      ],
    },
    {
      key: "경상북도",
      value: "경상북도",
      disabled: false,
      options: [
        { key: "포항", value: "경상북도 포항" },
        { key: "경주", value: "경상북도 경주" },
        { key: "김천", value: "경상북도 김천" },
        { key: "안동", value: "경상북도 안동" },
        { key: "구미", value: "경상북도 구미" },
        { key: "영주", value: "경상북도 영주" },
        { key: "영천", value: "경상북도 영천" },
        { key: "상주", value: "경상북도 상주" },
        { key: "문경", value: "경상북도 문경" },
        { key: "경산", value: "경상북도 경산" },
        { key: "군위", value: "경상북도 군위" },
        { key: "의성", value: "경상북도 의성" },
        { key: "청송", value: "경상북도 청송" },
        { key: "영양", value: "경상북도 영양" },
        { key: "영덕", value: "경상북도 영덕" },
        { key: "청도", value: "경상북도 청도" },
        { key: "고령", value: "경상북도 고령" },
        { key: "성주", value: "경상북도 성주" },
        { key: "칠곡", value: "경상북도 칠곡" },
        { key: "예천", value: "경상북도 예천" },
        { key: "봉화", value: "경상북도 봉화" },
        { key: "울진", value: "경상북도 울진" },
        { key: "울릉", value: "경상북도 울릉" },
      ],
    },
    {
      key: "경상남도",
      value: "경상남도",
      disabled: false,
      options: [
        { key: "창원", value: "경상남도 창원" },
        { key: "진주", value: "경상남도 진주" },
        { key: "통영", value: "경상남도 통영" },
        { key: "사천", value: "경상남도 사천" },
        { key: "김해", value: "경상남도 김해" },
        { key: "밀양", value: "경상남도 밀양" },
        { key: "거제", value: "경상남도 거제" },
        { key: "양산", value: "경상남도 양산" },
        { key: "의령", value: "경상남도 의령" },
        { key: "함안", value: "경상남도 함안" },
        { key: "창녕", value: "경상남도 창녕" },
        { key: "고성", value: "경상남도 고성" },
        { key: "남해", value: "경상남도 남해" },
        { key: "하동", value: "경상남도 하동" },
        { key: "산청", value: "경상남도 산청" },
        { key: "함양", value: "경상남도 함양" },
        { key: "거창", value: "경상남도 거창" },
        { key: "합천", value: "경상남도 합천" },
        { key: "마산", value: "경상남도 마산" },
        { key: "진해", value: "경상남도 진해" },
      ],
    },
    {
      key: "제주도",
      value: "제주도",
      disabled: false,
      options: [
        { key: "제주", value: "제주도 제주" },
        { key: "서귀포", value: "제주도 서귀포" },
      ],
    },
  ];
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

  useEffect(() => {
    getAddress();
    // setSido("");
    // setSido_sgg("");
    checkMetropolitanCity(sido_sgg);
  }, [sido_sgg]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.box}>
          <Text style={styles.text}>출발지 설정</Text>
          <MapView style={styles.map} region={region}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
          </MapView>
          <Text>
            <Ionicons name="md-pin" size={30} color={"green"} />
            현재위치: {address}
          </Text>
          <Pressable style={[styles.button, styles.buttonClose]}>
            <Text style={styles.textStyle}>현위치를 출발지로</Text>
          </Pressable>
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
                  data={data}
                  save="value"
                />
                {data.map((name, index) => {
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
            onPress={() => [
              setModalVisible(true),
              setSido(""),
              setSido_sgg(""),
            ]}
          >
            <Text style={styles.textStyle}>출발지 선택하기</Text>
          </Pressable>
          <Text>{sido}</Text>
          <Text>{sido_sgg}</Text>
          <Button
            title="submit"
            onPress={() =>
              sido_sgg == " "
                ? Alert.alert("출발지를 선택하세요")
                : changeAccItemStatus()
            }
          ></Button>
          {loading && <ActivityIndicator size={"large"} color={"black"} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: "pink",
  },
  box: {
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  text: {
    padding: 16,
    fontSize: 24,
  },
  map: {
    width: screenWidth - 40,
    height: 300,
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 200,
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
