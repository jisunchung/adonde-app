import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../api";
import { useRoute } from "@react-navigation/native";
import { Card, Icon, Overlay } from "react-native-elements";
import { ScrollView, Vibration, Animated } from "react-native";
import CardComp from "../component/Card";
import { Entypo } from "@expo/vector-icons";
import ResultMap from "./ResultMap";
import { Snackbar } from "react-native-paper";
import * as Shake from "expo-shake";
import AdCard from "../component/AdCard";

function Result({ navigation }) {
  const [adOverlayVisible, setAdOverlayVisible] = useState(false);
  const [result, setResult] = useState([]);
  const [shake, setShake] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const route = useRoute();
  const [visible, setVisible] = React.useState(true);
  const [adList, setAdList] = useState([]);
  const [adAndResultList, setAdAndResultList] = useState([]);
  const [loadingText, setLoadingText] = useState("로딩중...");

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  //   const MoveAnim = useRef(new Animated.Value(0)).current;
  //   const [MoveAnim, setMoveAnim] = useState(new Animated.Value(0));

  //   const MoveUp = () => {
  //     console.log("moveup!");

  //     Animated.timing(MoveAnim, {
  //       toValue: 250,
  //       duration: 2000,
  //       useNativeDriver: true, // Add This line
  //     }).start();
  //   };
  const getRandomArbitrary = (min, max) => {
    var rand;
    rand = Math.floor(Math.random() * (max - min) + min);
    return rand;
  };
  const getRandomNumber = useMemo(
    () => getRandomArbitrary(0, result.length),
    [shake]
  );

  const mixAdandCityResult = (cityResult, adList) => {
    // console.log("mix data", cityResult.concat(adList));
    // adlist 5 result 10
    // result2개당 1개의 광고가 나옴
    // 1 2 3 4 (5) 5 6 7 8 (11) 9 10 (14)
    //
    // console.log("last city", cityResult[cityResult.length - 1].sido_sgg);
    var cityIdx = 0;
    var adIdx = 0;
    // for (let i = 0; i < cityResult.length + adList.length; i++) {
    //   // console.log(adList.length, cityResult.length);
    //   //
    //   if ((i + 1) % 3 != 0 && cityIdx <= cityResult.length) {
    //     adAndResultList[i] = cityResult[cityIdx];
    //     cityIdx++;
    //     console.log(i, "cityIdx", cityIdx, cityIdx);
    //   } else if ((i + 1) % 3 == 0 && adIdx < adList.length) {
    //     adAndResultList[i] = adList[adIdx];
    //     adIdx++;
    //     console.log(i, "adidx", adIdx);
    //   } else if (cityResult.length < adList.length) {
    //     break;
    //   } else {
    //     adAndResultList[i] = cityResult[cityIdx];
    //     cityIdx++;
    //     console.log(i, "else cityidx", cityIdx);
    //   }
    // }
    // console.log("last city", cityResult[cityResult.length - 1].sido_sgg);

    for (let i = 0; i < cityResult.length + cityResult.length / 4; i++) {
      if ((i + 1) % 5 != 0 && cityIdx != cityResult.length) {
        adAndResultList[i] = cityResult[cityIdx];
        console.log("cityIdx", cityIdx);
        cityIdx++;
      } else if ((i + 1) % 5 != 0) {
        adAndResultList[i] = adList[adIdx % adList.length];
        console.log("adidx", adIdx);
        adIdx++;
      } else {
        adAndResultList[i] = adList[adIdx % adList.length];
        console.log("adidx", adIdx);
        adIdx++;
      }
    }

    // console.log("adAndResultList", adAndResultList);

    return adList.length + cityResult.length;
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

    console.log("-------resultpage-----");
    console.log("result", route.params);
    // console.log("result, ad", result, adList);
    searchResult();

    Shake.addListener(() => {
      //   alert("shake!");
      setShake(true);
      //   Vibration.vibrate();
      //   MoveUp();
      //   alert(getRandomArbitrary(0, 100));
    });
    // setShake(true);
    // setRandomNum(getRandomArbitrary(0, result.length));
  }, []);
  //cardlist 형식으로 보여줌
  if (!route.params.mapIcon) {
    return (
      <ScrollView style={styles.block}>
        {adAndResultList.length == 0 ? (
          <Text style={styles.loading_text}>{loadingText}</Text>
        ) : (
          <View>
            <View>
              {/* <Button
                onPress={onToggleSnackBar}
                title={visible ? "Hide" : "Show"}
              ></Button>
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: "ok",
                  onPress: () => {
                    // Do something
                  },
                }}
              >
                핸드폰을 흔들어보세요!
              </Snackbar> */}
              {/* shake! */}

              <View>
                <Overlay overlayStyle={styles.overlay} isVisible={shake}>
                  <CardComp
                    key={result[getRandomNumber].sido_sgg}
                    name={result[getRandomNumber].sido_sgg}
                    img={result[getRandomNumber].image_src}
                    description={result[getRandomNumber].description}
                  ></CardComp>

                  <Button title="x" onPress={() => setShake(false)}></Button>
                </Overlay>
              </View>
              <Button title="shake" onPress={() => setShake(true)}></Button>

              {/* result */}
            </View>
            {/* {adList.length == 0 ? (
              <Text style={styles.loading_text}>광고 로딩중...</Text>
            ) : (
              adList.map((data) => (
                <View key={data.id}>
                  <Text>{getAdlistAndCityResult}</Text>
                  <AdCard data={data} />
                </View>
              ))
            )}
            {result.map((data) => (
              <View key={data.sido_sgg}>
                <CardComp
                  key={data.sido_sgg}
                  name={data.sido_sgg}
                  img={data.image_src}
                  description={data.description}
                ></CardComp>
              </View>
            ))} */}

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
        )}
      </ScrollView>
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

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  loading_text: {
    marginTop: 100,
    fontSize: 30,
    alignSelf: "center",
  },
  random_block: {
    // backgroundColor: "#ffffff",
    // opacity: 0.5,
  },
  overlay: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
    // opacity: 0.5,
  },
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default Result;
