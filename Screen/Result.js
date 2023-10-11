import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../api";
import { useRoute } from "@react-navigation/native";
import { Card, Icon, Overlay } from "react-native-elements";
import { ScrollView, Vibration, Animated } from "react-native";
import CardComp from "../component/Card";
import { Entypo } from "@expo/vector-icons";
import ResultMap from "./ResultMap";
import * as Shake from "expo-shake";
import AdCard from "../component/AdCard";
//redux
import { connect } from "react-redux";
import { SET_MAP_ICON } from "../redux/userSlice";

function Result({ navigation, MAP_ICON_DATA, SET_MAP_ICON }) {
  const [adOverlayVisible, setAdOverlayVisible] = useState(false);
  const [result, setResult] = useState([]);
  const [shake, setShake] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const route = useRoute();
  const [visible, setVisible] = useState(true);
  const [adList, setAdList] = useState([]);
  const [adAndResultList, setAdAndResultList] = useState([]);
  const [loadingText, setLoadingText] = useState("로딩중...");

  const returnSnackBox = () => {
    if (!shake) {
      return (
        <TouchableOpacity onPress={() => setShake(true)}>
          <View style={styles.snackBox_block}>
            <Text style={styles.snackBox_text}>
              클릭하거나 폰을 흔들어보세요!
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const getRandomArbitrary = (min, max) => {
    if (shake) {
      Vibration.vibrate();
      setTimeout(function () {
        setShake(false);
      }, 3500);
    }
    var rand;
    rand = Math.floor(Math.random() * (max - min) + min);
    return rand;
  };
  const getRandomNumber = useMemo(
    () => getRandomArbitrary(0, result.length),
    [shake]
  );

  const mixAdandCityResult = (cityResult, adList) => {
    var cityIdx = 0;
    var adIdx = 0;

    for (let i = 0; i < cityResult.length + cityResult.length / 4; i++) {
      if (i % 5 != 0 && cityIdx != cityResult.length) {
        adAndResultList[i] = cityResult[cityIdx];
        // console.log("cityIdx", cityIdx);
        cityIdx++;
      } else if (i % 5 != 0) {
        adAndResultList[i] = adList[adIdx % adList.length];
        // console.log("adidx", adIdx);
        adIdx++;
      } else {
        adAndResultList[i] = adList[adIdx % adList.length];
        // console.log("adidx", adIdx);
        adIdx++;
      }
    }
    // console.log("adAndResultList", adAndResultList);
  };
  const getAdlistAndCityResult = useMemo(
    () => mixAdandCityResult(result, adList),
    [result, adList]
  );
  useEffect(() => {
    const getAdList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/ad/orderByRand`);

        // console.log("getAdList:", res.data.data);
        // console.log("res data views: ", res.data.data);
        setAdList(res.data.data);
        console.log("Adlist length", res.data.data.length);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    const searchResult = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/search/`, {
          theme: route.params.FilterValue["theme"],
          population: route.params.FilterValue["population"],
          distance: route.params.FilterValue["distance"],
          transportation: route.params.FilterValue["access"],
          origin: route.params.FilterValue["origin"],
        });
        //   console.log("res.data:", res.data[2]);
        console.log("res.data length:", res.data.length);
        //   console.log("Random Num", getRandomArbitrary(0, res.data.length));
        setResult(res.data);
        if (res.data.length != 0) {
          getAdList();
        } else {
          setLoadingText("검색결과가 없습니다 :(");
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    console.log("--------------------------resultpage--------------------");

    //api 호출
    searchResult();

    //mapicon이 false인 상태에서 search페이지로 갔다가 다시 돌아오는 경우 초기화해줌
    SET_MAP_ICON(true);

    // shake기능
    Shake.addListener(() => {
      setShake(true);
    });
  }, []);
  //cardlist 형식으로 보여줌
  if (MAP_ICON_DATA) {
    return (
      <View style={styles.block}>
        <ScrollView>
          {adAndResultList.length == 0 ? (
            <Text style={styles.loading_text}>{loadingText}</Text>
          ) : (
            <View>
              {/* shake! */}
              {returnSnackBox()}
              {/* <Button title="shake" onPress={() => setShake(true)}></Button> */}

              <Modal animationType="slide" transparent={true} visible={shake}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <CardComp
                      key={result[getRandomNumber].sido_sgg}
                      name={result[getRandomNumber].sido_sgg}
                      img={result[getRandomNumber].image_src}
                      description={result[getRandomNumber].description}
                    ></CardComp>

                    <Button title="x" onPress={() => setShake(false)}></Button>
                  </View>
                </View>
              </Modal>

              <View>
                {adAndResultList.map((data, index) =>
                  data != undefined ? (
                    Object.keys(data).includes("id") ? (
                      <View key={index}>
                        <AdCard key={index} data={data} />
                      </View>
                    ) : (
                      <View key={data.sido_sgg}>
                        <CardComp
                          key={data.sido_sgg}
                          name={data.sido_sgg}
                          img={data.image_src}
                          description={data.description}
                        ></CardComp>
                      </View>
                    )
                  ) : (
                    <Text key={index}>undefined</Text>
                  )
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  //map에 마커로 표시해서 보여줌
  else {
    return (
      <SafeAreaView>
        <ResultMap result={result} />
      </SafeAreaView>
    );
  }
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "white",
  },
  loading_text: {
    marginTop: 100,
    fontSize: 30,
    alignSelf: "center",
  },
  //snackBox
  snackBox_block: {
    margin: 10,
    marginBottom: 5,
    width: screenWidth - 20,
    backgroundColor: "grey",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
  },
  snackBox_text: {
    alignSelf: "center",
    color: "white",
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    paddingTop: 15,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    MAP_ICON_DATA: state.user.mapIcon,
  };
};
const mapDispatchToProps = {
  SET_MAP_ICON,
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
