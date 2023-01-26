import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
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

function Result({ navigation }) {
  const [result, setResult] = useState([]);
  const [shake, setShake] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const route = useRoute();
  const [visible, setVisible] = React.useState(true);

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

  useEffect(() => {
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
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
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

    console.log("-------resultpage-----");
    console.log("result", route.params.FilterValue["access"]);
  }, []);
  //cardlist 형식으로 보여줌
  if (!route.params.mapIcon) {
    return (
      <ScrollView style={styles.block}>
        {/* <Entypo name="map" size={24} color="black" /> */}
        {result.length == 0 ? (
          <Text style={styles.loading_text}>로딩중...</Text>
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
            </View>
            {result.map((data) => (
              <View>
                <CardComp
                  key={data.sido_sgg}
                  name={data.sido_sgg}
                  img={data.image_src}
                  description={data.description}
                ></CardComp>
              </View>
            ))}
          </View>
        )}
        {/* {result.length == 0 ? (
            <Text>로딩중...</Text>
          ) : (
            result.map((data) => (
              <Card key={data.sido_sgg} styl>
                <Card.Title>{data.sido_sgg}</Card.Title>
                <Card.Divider />
                <Card.Image
                  source={{
                    uri: data.image_src,
                  }}
                />
                <Text style={{ marginBottom: 10 }}>{data.description}</Text>
                <Button
                  icon={<Icon name="code" color="#ffffff" />}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="DETAILS"
                />
              </Card>
            ))
          )} */}
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
